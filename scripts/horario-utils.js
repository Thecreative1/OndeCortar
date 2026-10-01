"use strict";

// Conversão de horários entre três formatos:
//   - texto PT publicado em `horario` (ex.: "Seg-Sex 9h-13h e 15h-20h; Sáb 9h-13h")
//   - opening_hours do OpenStreetMap (ex.: "Mo-Fr 09:00-13:00,15:00-20:00; Sa 09:00-13:00")
//   - schema.org OpeningHoursSpecification (JSON-LD dos perfis)
// Representação interna: `week` = array de 7 dias (0 = segunda … 6 = domingo), cada um
// com uma lista de intervalos [["09:00","13:00"], …]; lista vazia = fechado.
// Tudo o que não se perceba com segurança devolve null — nunca adivinhar.

const PT_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const OSM_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function fold(text) {
  return String(text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// "9h", "9h30", "09:00", "9:30", "9" → "09:00"
function parseTime(raw) {
  const m = String(raw).trim().match(/^(\d{1,2})(?:(?:h|:)(\d{2})?|h)?$/i);
  if (!m) return null;
  const h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  if (h > 24 || min > 59) return null;
  return pad(h) + ":" + pad(min);
}

function validInterval(open, close) {
  return Boolean(open && close && open < close);
}

function emptyWeek() {
  return [[], [], [], [], [], [], []];
}

function weekHasHours(week) {
  return Array.isArray(week) && week.some((day) => day.length);
}

// ── PT ───────────────────────────────────────────────────────────────

const PT_DAY_INDEX = {
  seg: 0, segunda: 0, "segunda-feira": 0,
  ter: 1, terca: 1, "terca-feira": 1,
  qua: 2, quarta: 2, "quarta-feira": 2,
  qui: 3, quinta: 3, "quinta-feira": 3,
  sex: 4, sexta: 4, "sexta-feira": 4,
  sab: 5, sabado: 5,
  dom: 6, domingo: 6
};

function ptDayIndex(token) {
  const key = fold(token).replace(/\.$/, "").trim();
  return Object.prototype.hasOwnProperty.call(PT_DAY_INDEX, key) ? PT_DAY_INDEX[key] : null;
}

// "Seg-Sex", "Seg a Sáb", "Seg, Qua e Sex", "Sáb" → [0..6]
function parsePtDays(raw) {
  const days = new Set();
  const parts = fold(raw).split(/\s*,\s*|\s+e\s+/).filter(Boolean);
  if (!parts.length) return null;
  for (const part of parts) {
    const range = part.split(/\s*(?:-|–|\ba\b)\s*/).filter(Boolean);
    if (range.length === 1) {
      const d = ptDayIndex(range[0]);
      if (d === null) return null;
      days.add(d);
    } else if (range.length === 2) {
      const a = ptDayIndex(range[0]);
      const b = ptDayIndex(range[1]);
      if (a === null || b === null || b < a) return null;
      for (let d = a; d <= b; d++) days.add(d);
    } else {
      return null;
    }
  }
  return [...days].sort();
}

// "9h-13h e 15h-20h", "09:00 às 20:00", "9h-13h, 15h-19h" → [["09:00","13:00"], …]
function parsePtIntervals(raw) {
  const pieces = fold(raw).split(/\s*,\s*|\s+e\s+/).filter(Boolean);
  if (!pieces.length) return null;
  const intervals = [];
  for (const piece of pieces) {
    const m = piece.match(/^(\S+)\s*(?:-|–|as|ate)\s*(\S+)$/);
    if (!m) return null;
    const open = parseTime(m[1]);
    const close = parseTime(m[2]);
    if (!validInterval(open, close)) return null;
    intervals.push([open, close]);
  }
  return intervals;
}

// Texto PT → week, ou null se alguma parte não for inequívoca.
function parsePt(text) {
  const source = String(text || "").trim();
  if (!source) return null;
  const week = emptyWeek();
  // grupos separados por ";" ou por "," logo a seguir a uma hora ("Seg-Sex 9h-19h, Sáb 9h-13h")
  const groups = source.split(/\s*;\s*|(?<=\d|h)\s*,\s*(?=[A-Za-zÀ-ú])/).filter(Boolean);
  const pauses = [];
  for (const group of groups) {
    // "pausa 13h-15h" — corta esse intervalo em todos os dias que o atravessam
    const pause = fold(group).match(/^(?:pausa|almoco|fecha)\s+(\S+)\s*(?:-|–|as)\s*(\S+)$/);
    if (pause) {
      const open = parseTime(pause[1]);
      const close = parseTime(pause[2]);
      if (!validInterval(open, close)) return null;
      pauses.push([open, close]);
      continue;
    }
    // separa os dias do primeiro dígito: "Seg a Sab, 09:00 às 20:00" / "Seg-Sex 9h-20h"
    const m = group.match(/^([^\d]+?)[\s,:]+(\d[\s\S]*)$/);
    if (!m) {
      // "Dom fechado", "Encerrado ao domingo" — aceita só fecho explícito de dias conhecidos
      const closed = fold(group).match(/^(.+?)\s+(fechado|encerrado)$/);
      if (closed && parsePtDays(closed[1])) continue;
      return null;
    }
    const days = parsePtDays(m[1]);
    const intervals = parsePtIntervals(m[2]);
    if (!days || !intervals) return null;
    for (const d of days) {
      if (week[d].length) return null; // dia repetido com horários diferentes — ambíguo
      week[d] = intervals.slice();
    }
  }
  for (const [pStart, pEnd] of pauses) {
    for (let d = 0; d < 7; d++) {
      week[d] = week[d].flatMap(([open, close]) => (open < pStart && pEnd < close)
        ? [[open, pStart], [pEnd, close]]
        : [[open, close]]);
    }
  }
  return weekHasHours(week) ? week : null;
}

function formatPtTime(hhmm) {
  const [h, m] = hhmm.split(":");
  return Number(h) + "h" + (m === "00" ? "" : m);
}

// week → "Seg-Sex 9h-13h e 15h-20h; Sáb 9h-13h" (dias fechados omitidos, como nas fichas atuais)
function formatPt(week) {
  if (!weekHasHours(week)) return null;
  const key = (day) => day.map((i) => i.join("-")).join(",");
  const groups = [];
  for (let d = 0; d < 7; d++) {
    if (!week[d].length) continue;
    const last = groups[groups.length - 1];
    if (last && last.end === d - 1 && last.key === key(week[d])) {
      last.end = d;
    } else {
      groups.push({ start: d, end: d, key: key(week[d]), intervals: week[d] });
    }
  }
  return groups.map((g) => {
    const days = g.start === g.end ? PT_DAYS[g.start] : PT_DAYS[g.start] + "-" + PT_DAYS[g.end];
    const times = g.intervals.map((i) => formatPtTime(i[0]) + "-" + formatPtTime(i[1])).join(" e ");
    return days + " " + times;
  }).join("; ");
}

// ── OpenStreetMap ────────────────────────────────────────────────────

// Aceita a gramática simples ("Mo-Fr 09:00-19:00; Sa 09:00-13:00; Su off") e os desvios
// comuns de quem edita o OSM (vírgula ou espaço entre regras, "14h30", regra sem dias).
// Feriados (PH) são ignorados. Meses, semanas, "sunrise", comentários, texto livre → null.
function parseOsm(value) {
  return parseOsmStrict(value) || parsePt(value); // fallback: texto em português no próprio OSM ("seg-sab 9:00-21:30")
}

function parseOsmStrict(value) {
  let source = String(value || "").trim();
  if (!source || source === "24/7" || /["[\]]|\bweek\b|sunrise|sunset|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/.test(source)) {
    return null;
  }
  source = source
    .replace(/(\d)\s+(?=(Mo|Tu|We|Th|Fr|Sa|Su|PH)\b)/g, "$1; ")   // "19:30 Sa 09:00" → "19:30; Sa 09:00"
    .replace(/(\d)\s*,\s*(?=(Mo|Tu|We|Th|Fr|Sa|Su|PH)\b)/g, "$1; "); // "19:30, Sa 09:00" → "19:30; Sa 09:00" (sem partir "Fr,Sa")
  const week = emptyWeek();
  let anyRule = false;
  for (let rule of source.split(/\s*;\s*/).filter(Boolean)) {
    if (/^PH\b(?!\s*,)/.test(rule)) continue; // regra só de feriados
    rule = rule.replace(/\bPH\s*,\s*/g, "").replace(/\s*,\s*PH\b/g, "").trim(); // "Tu,Su,PH off" → "Tu,Su off"
    const m = rule.match(/^(?:([A-Za-z,\- ]+?)\s+)?(off|closed|[\d:h,\- ]+)$/);
    if (!m) return null;
    const days = new Set();
    const dayList = m[1] ? m[1].split(",").map((p) => p.trim()).filter(Boolean) : ["Mo-Su"];
    for (const part of dayList) {
      const range = part.split("-");
      const a = OSM_DAYS.indexOf(range[0]);
      const b = range[1] ? OSM_DAYS.indexOf(range[1]) : a;
      if (a < 0 || b < 0 || range.length > 2) return null;
      for (let i = 0; i <= (b - a + 7) % 7; i++) days.add((a + i) % 7); // "Sa-Th" dá a volta
    }
    anyRule = true;
    if (m[2] === "off" || m[2] === "closed") {
      days.forEach((d) => { week[d] = []; });
      continue;
    }
    const intervals = [];
    for (const piece of m[2].split(",").map((p) => p.trim()).filter(Boolean)) {
      const t = piece.replace(/h/g, ":").match(/^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/);
      if (!t) return null;
      const open = parseTime(t[1]);
      const close = parseTime(t[2]);
      if (!validInterval(open, close)) return null;
      intervals.push([open, close]);
    }
    days.forEach((d) => { week[d] = intervals.slice(); }); // regras seguintes sobrepõem-se, como no OSM
  }
  return anyRule && weekHasHours(week) ? week : null;
}

// ── Booksy (JSON-LD) e Fresha (workingHours) ─────────────────────────

// [{dayOfWeek:["Monday"], opens:"09:30", closes:"19:00"}, …]
function weekFromSchemaSpecs(specs) {
  if (!Array.isArray(specs) || !specs.length) return null;
  const week = emptyWeek();
  for (const spec of specs) {
    const days = [].concat(spec.dayOfWeek || []).map((d) => SCHEMA_DAYS.indexOf(String(d).replace(/^https?:\/\/schema\.org\//, "")));
    const open = parseTime(spec.opens);
    const close = parseTime(spec.closes);
    if (days.some((d) => d < 0)) return null;
    if (open === "00:00" && close === "00:00") continue; // convenção de "fechado"
    if (!validInterval(open, close)) return null;
    days.forEach((d) => week[d].push([open, close]));
  }
  week.forEach((day) => day.sort((x, y) => x[0].localeCompare(y[0])));
  return weekHasHours(week) ? week : null;
}

// "10:00 AM - 1:00 PM" → ["10:00","13:00"]
function parse12h(raw) {
  const m = String(raw).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return pad(h) + ":" + m[2];
}

// {days:[{dayName:"Monday", values:[{value:"Closed"}|{value:"10:00 AM - 1:00 PM"}]}]}
function weekFromFreshaWorkingHours(workingHours) {
  if (!workingHours || !Array.isArray(workingHours.days) || workingHours.days.length !== 7) return null;
  const week = emptyWeek();
  for (const day of workingHours.days) {
    const d = SCHEMA_DAYS.indexOf(day.dayName);
    if (d < 0 || !Array.isArray(day.values)) return null;
    for (const entry of day.values) {
      const value = String(entry && entry.value || "").trim();
      if (/^closed$/i.test(value)) continue;
      const parts = value.split(/\s*-\s*/);
      const open = parts.length === 2 ? parse12h(parts[0]) : null;
      const close = parts.length === 2 ? parse12h(parts[1]) : null;
      if (!validInterval(open, close)) return null;
      week[d].push([open, close]);
    }
  }
  return weekHasHours(week) ? week : null;
}

// ── schema.org ───────────────────────────────────────────────────────

// week → [{ "@type": "OpeningHoursSpecification", dayOfWeek: [...], opens, closes }]
function toSchemaSpecs(week) {
  if (!weekHasHours(week)) return null;
  const byInterval = new Map();
  week.forEach((intervals, d) => {
    intervals.forEach(([open, close]) => {
      const key = open + "-" + close;
      if (!byInterval.has(key)) byInterval.set(key, { open, close, days: [] });
      byInterval.get(key).days.push(SCHEMA_DAYS[d]);
    });
  });
  return [...byInterval.values()].map((s) => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": s.days,
    "opens": s.open,
    "closes": s.close
  }));
}

// week → ["Mo-Fr 09:00-13:00", …] (formato da propriedade schema.org openingHours, para microdados)
function toOpeningHoursStrings(week) {
  if (!weekHasHours(week)) return null;
  const out = [];
  const key = (day) => day.map((i) => i.join("-")).join(",");
  for (let d = 0; d < 7; d++) {
    if (!week[d].length) continue;
    let end = d;
    while (end + 1 < 7 && key(week[end + 1]) === key(week[d])) end++;
    const days = d === end ? OSM_DAYS[d] : OSM_DAYS[d] + "-" + OSM_DAYS[end];
    week[d].forEach(([open, close]) => out.push(days + " " + open + "-" + close));
    d = end;
  }
  return out;
}

module.exports = {
  parsePt,
  formatPt,
  parseOsm,
  weekFromSchemaSpecs,
  weekFromFreshaWorkingHours,
  toSchemaSpecs,
  toOpeningHoursStrings
};
