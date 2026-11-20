#!/usr/bin/env node
/**
 * Radar de procura — "primeiro ver o que se procura, depois adaptar a loja" (regra do utilizador, 2026-11-20).
 *
 * Recolhe o que as pessoas escrevem no Google PT e na Amazon.es à volta das sementes de
 * scripts/data/radar-sementes.js, tira o ruído (Brasil, temas fora do nicho), cruza com o que o
 * site já cobre (títulos de produto/, revista/ e loja/) e ordena as LACUNAS por força.
 *
 *   node scripts/radar-procura.js            ronda normal (~4 min)
 *   node scripts/radar-procura.js --fundo    + variações a–z no Google (cauda longa, ~12 min)
 *   node scripts/radar-procura.js --so-google | --so-amazon
 *
 * Saída (fora do git — o repositório é publicado no site): radar/AAAA-MM-DD/relatorio.md e dados.json.
 * Força = soma de (11 − posição) em cada lista de sugestões onde o termo aparece; termos que aparecem
 * no Google PT E na Amazon.es (depois de traduzidos) valem a dobrar — procura e intenção de compra.
 *
 * O radar só dá pistas. Antes de criar produto ou artigo: ver no browser o volume na Amazon.es
 * ("comprados el mes pasado", vendedor, stock) e comparar no Google Trends PT — ver "Radar de procura"
 * no CLAUDE.md e scripts/radar/amazon-volume.js.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const S = require("./data/radar-sementes.js");
const args = process.argv.slice(2);
const FUNDO = args.includes("--fundo");
const SO_GOOGLE = args.includes("--so-google");
const SO_AMAZON = args.includes("--so-amazon");
const PAUSA_MS = 350;

const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function get(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "pt-PT,pt;q=0.9" }, timeout: 15000 }, (res) => {
      let d = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve({ status: res.statusCode, body: d }));
    });
    req.on("error", () => resolve({ status: 0, body: "" }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 0, body: "" }); });
  });
}

async function googlePt(q) {
  const r = await get("https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-PT&gl=pt&q=" + encodeURIComponent(q));
  try { return JSON.parse(r.body)[1] || []; } catch (e) { return null; }
}
async function amazonEs(q) {
  const r = await get("https://completion.amazon.es/api/2017/suggestions?mid=A1RKKUPIHCS9HS&alias=aps&limit=11&prefix=" + encodeURIComponent(q));
  try { return (JSON.parse(r.body).suggestions || []).map((s) => s.value); } catch (e) { return null; }
}

// --- o que o site já cobre -------------------------------------------------------------------
function cobertura() {
  const textos = [];
  for (const dir of ["produto", "revista", "loja"]) {
    for (const s of fs.readdirSync(path.join(ROOT, dir))) {
      const f = path.join(ROOT, dir, s, "index.html");
      if (!fs.existsSync(f)) continue;
      const h = fs.readFileSync(f, "utf8");
      const title = (h.match(/<title>([^<]*)/) || [])[1] || "";
      const h1 = (h.match(/<h1[^>]*>([^<]*)/) || [])[1] || "";
      textos.push({ url: dir + "/" + s + "/", txt: norm(title + " " + h1 + " " + s.replace(/-/g, " ")) });
    }
  }
  return textos;
}
const tokenSet = (t) => new Set(t.split(" ").map((w) => w.replace(/(es|s)$/, "")));

// termo coberto = todos os seus tokens com significado aparecem num mesmo título/slug
function cobertoPor(termoPt, textos) {
  const toks = norm(termoPt).split(" ").filter((w) => w.length > 2 && !S.PALAVRAS_VAZIAS.includes(w)).map((w) => w.replace(/(es|s)$/, ""));
  if (!toks.length) return null;
  for (const t of textos) {
    const set = tokenSet(t.txt);
    const tem = (w) => set.has(w) || [...set].some((x) => x.length > 4 && (x.startsWith(w) || w.startsWith(x)));
    const comSinonimos = (w) => tem(w) || S.SINONIMOS.some((g) => g.some((s) => s.replace(/(es|s)$/, "") === w) && g.some((s) => tem(s.replace(/(es|s)$/, ""))));
    if (toks.every(comSinonimos)) return t.url;
  }
  return null;
}

const relevante = (t) => S.NICHO.some((w) => t.includes(w)) && !S.RUIDO.some((w) => t.includes(w));
function esParaPt(t) {
  let out = " " + t + " ";
  for (const [es, pt] of S.ES_PT) out = out.replace(new RegExp(" " + es + " ", "g"), " " + pt + " ");
  return out.trim().replace(/\s+/g, " ");
}

// respostas do dia em cache (radar/cache-AAAA-MM-DD.json): repetir a ronda no mesmo dia não volta a pedir
const CACHE_FILE = path.join(ROOT, "radar", "cache-" + new Date().toISOString().slice(0, 10) + ".json");
const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")) : {};

async function recolher(fonte, sementes, fn, extra) {
  const mapa = new Map(); // termo -> {forca, fontes:Set, sementes:Set}
  let pedidos = 0, falhas = 0;
  for (const semente of sementes) {
    const consultas = [semente, ...extra.map((x) => (x.endsWith(" ") ? x + semente : semente + " " + x))];
    for (const q of consultas) {
      const chave = fonte + "|" + q;
      let lista = cache[chave];
      if (!lista) {
        lista = await fn(q);
        pedidos++;
        if (lista === null) { falhas++; await sleep(PAUSA_MS * 4); continue; }
        cache[chave] = lista;
        await sleep(PAUSA_MS);
      }
      lista.slice(0, 10).forEach((termo, i) => {
        const n = norm(termo);
        if (!n || !relevante(n)) return;
        const e = mapa.get(n) || { termo: n, forca: 0, fontes: new Set(), sementes: new Set() };
        e.forca += 11 - (i + 1);
        e.fontes.add(fonte);
        e.sementes.add(semente);
        mapa.set(n, e);
      });
    }
    process.stdout.write(".");
  }
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
  process.stdout.write(" " + fonte + ": " + pedidos + " pedidos, " + falhas + " falhas\n");
  return mapa;
}

(async () => {
  const hoje = new Date().toISOString().slice(0, 10);
  const textos = cobertura();
  const letras = FUNDO ? "abcdefghijlmnopqrstuvz".split("") : [];
  const google = SO_AMAZON ? new Map() : await recolher("google-pt", S.GOOGLE_PT, googlePt, [...S.MODIFICADORES_PT, ...letras]);
  const amazon = SO_GOOGLE ? new Map() : await recolher("amazon-es", S.AMAZON_ES, amazonEs, [..."abcdefghijlmnoprstv".split("")]);

  // juntar: termos da Amazon traduzidos para PT para cruzar com o Google e com a cobertura
  const todos = new Map();
  for (const e of google.values()) todos.set(e.termo, { ...e, pt: e.termo, es: null });
  for (const e of amazon.values()) {
    const pt = esParaPt(e.termo);
    const ja = todos.get(pt);
    if (ja) { ja.forca = (ja.forca + e.forca) * 2; e.fontes.forEach((f) => ja.fontes.add(f)); ja.es = e.termo; }
    else todos.set("es:" + e.termo, { ...e, pt, es: e.termo });
  }
  const linhas = [...todos.values()].map((e) => ({
    termo: e.es && !google.has(e.pt) ? e.es : e.termo,
    pt: e.pt, forca: e.forca, fontes: [...e.fontes].sort(), sementes: [...e.sementes],
    cobertoPor: cobertoPor(e.pt, textos),
    saude: S.SAUDE.some((w) => e.pt.includes(w)),
    marca: S.MARCAS.find((m) => e.pt.includes(m)) || null
  })).sort((a, b) => b.forca - a.forca);

  // agrupar lacunas pela "cabeça" (2 primeiras palavras com significado), para ver nichos e não frases soltas
  const lacunas = linhas.filter((l) => !l.cobertoPor);
  const grupos = new Map();
  for (const l of lacunas) {
    const cab = norm(l.pt).split(" ").filter((w) => w.length > 2 && !S.PALAVRAS_VAZIAS.includes(w)).slice(0, 2).join(" ") || l.pt;
    const g = grupos.get(cab) || { cabeca: cab, forca: 0, termos: [], fontes: new Set(), saude: false };
    g.forca += l.forca; g.termos.push(l); l.fontes.forEach((f) => g.fontes.add(f)); g.saude = g.saude || l.saude;
    grupos.set(cab, g);
  }
  // nicho cuja "cabeça" já tem página = variantes de algo que temos (ideias de produto dentro de uma categoria);
  // cabeça sem página = nicho novo. O ⚕ do grupo só conta se a própria cabeça for de saúde.
  for (const g of grupos.values()) {
    g.cobertoPor = cobertoPor(g.cabeca, textos);
    g.saude = S.SAUDE.some((w) => g.cabeca.includes(w));
  }
  const todosGrupos = [...grupos.values()].sort((a, b) => b.forca - a.forca);
  const nichos = todosGrupos.filter((g) => !g.cobertoPor);
  const variantes = todosGrupos.filter((g) => g.cobertoPor);

  const dir = path.join(ROOT, "radar", hoje);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "dados.json"), JSON.stringify({ data: hoje, fundo: FUNDO, linhas }, null, 1));

  const md = [];
  md.push("# Radar de procura — " + hoje, "");
  md.push("Termos relevantes: " + linhas.length + " · já cobertos pelo site: " + (linhas.length - lacunas.length) + " · lacunas: " + lacunas.length + (FUNDO ? " · ronda funda (a–z)" : ""), "");
  md.push("Força = soma de (11 − posição) nas listas de sugestões; ×2 quando o termo aparece no Google PT e na Amazon.es. ⚕ = saúde (cuidado: só factos do fabricante, nada de conselhos). Só pistas: confirmar volume na Amazon.es e no Trends antes de decidir.", "");
  md.push("## Nichos por cobrir (lacunas agrupadas)", "");
  md.push("| # | Nicho | Força | Fontes | Exemplos |", "|---|---|---|---|---|");
  nichos.slice(0, 40).forEach((g, i) => md.push("| " + (i + 1) + " | " + g.cabeca + (g.saude ? " ⚕" : "") + " | " + g.forca + " | " + [...g.fontes].join(", ") + " | " + g.termos.slice(0, 4).map((t) => t.termo).join("; ") + " |"));
  md.push("", "## Variantes por cobrir de nichos que já temos", "");
  md.push("O nicho tem página, mas estas variantes (marca, tipo, uso) não aparecem em nenhum título: ideias de produto dentro da categoria, ou secções para um artigo novo (os que vendem não se mexem).", "");
  md.push("| Nicho | Página atual | Força | Variantes |", "|---|---|---|---|");
  variantes.slice(0, 25).forEach((g) => md.push("| " + g.cabeca + " | " + g.cobertoPor + " | " + g.forca + " | " + g.termos.slice(0, 6).map((t) => t.termo).join("; ") + " |"));
  md.push("", "## Nas duas fontes (Google PT + Amazon.es) e por cobrir", "");
  lacunas.filter((l) => l.fontes.length > 1).slice(0, 30).forEach((l) => md.push("- **" + l.pt + "** (" + l.forca + ")" + (l.es ? " — Amazon: " + l.es : "")));
  md.push("", "## Marcas procuradas e por cobrir", "");
  lacunas.filter((l) => l.marca).slice(0, 25).forEach((l) => md.push("- " + l.termo + " (" + l.forca + ", " + l.fontes.join("+") + ")"));
  md.push("", "## Já cobertos (para confirmar que a página responde)", "");
  linhas.filter((l) => l.cobertoPor).slice(0, 25).forEach((l) => md.push("- " + l.termo + " → " + l.cobertoPor + " (" + l.forca + ")"));
  fs.writeFileSync(path.join(dir, "relatorio.md"), md.join("\n") + "\n");

  console.log("\nNichos NOVOS (sem página, top 20):");
  nichos.slice(0, 20).forEach((g, i) => console.log(String(i + 1).padStart(2) + ". " + g.cabeca + (g.saude ? " ⚕" : "") + " — " + g.forca + " [" + [...g.fontes].join("+") + "] " + g.termos.slice(0, 3).map((t) => t.termo).join(" | ")));
  console.log("\nVariantes de nichos que já temos (top 10):");
  variantes.slice(0, 10).forEach((g) => console.log("   " + g.cabeca + " → " + g.cobertoPor + " — " + g.forca + ": " + g.termos.slice(0, 3).map((t) => t.termo).join(" | ")));
  console.log("\nRelatório: radar/" + hoje + "/relatorio.md");
})();
