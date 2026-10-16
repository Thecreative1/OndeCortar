// Recolha de preços (só leitura dos dados; escreve Barbeiros/precos-recolhidos.json):
//   node scripts/recolher-precos.js            → todas as fichas com Fresha / Booksy / buk.pt
//   node scripts/recolher-precos.js slug1 slug2 → só estas
// Lê os preços que as próprias barbearias publicam na página de marcações:
//   Fresha e Booksy → JSON-LD (hasOfferCatalog / makesOffer); buk.pt → lista de serviços.
// Noona e Treatwell carregam os preços por JS → ficam de fora.
// Não altera barbearias.limpo.js: o relatório é revisto e aplicado com aplicar-precos.js.
// Cada resultado traz `nome_pagina` e `nome_ok` — páginas que mudaram de dono ou listagens
// de várias barbearias não podem entrar (ver CLAUDE.md, "Horário").

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "Barbeiros", "precos-recolhidos.json");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const DELAY_MS = 1500;

function loadBarbearias() {
  const src = fs.readFileSync(path.join(ROOT, "Barbeiros", "barbearias.limpo.js"), "utf8");
  const sandbox = {};
  new Function("global", src.replace("const barbearias", "global.barbearias"))(sandbox);
  return sandbox.barbearias;
}

function norm(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

const STOP = new Set(["barbearia", "barbershop", "barber", "shop", "barbeiro", "barbearias", "the", "de", "do", "da", "dos", "das", "e", "o", "a", "studio", "salon", "men", "s"]);
function nameMatches(ours, theirs) {
  const a = norm(ours).split(" ").filter((w) => w && !STOP.has(w));
  const b = new Set(norm(theirs).split(" ").filter((w) => w && !STOP.has(w)));
  if (!a.length) return norm(theirs).includes(norm(ours));
  return a.filter((w) => b.has(w)).length / a.length >= 0.5;
}

function platformUrl(b) {
  const urls = [b.booking, b.website, b.google_maps].concat((b.fontes || []).map((f) => (typeof f === "string" ? f : f && f.url)))
    .filter(Boolean).map(String);
  for (const u of urls) {
    if (/fresha\.com\/.*\/(a|lvp)\//.test(u) || /fresha\.com\/(a|lvp)\//.test(u)) return { nome: "Fresha", url: u };
    if (/booksy\.com\/pt-pt\/\d+_/.test(u)) return { nome: "Booksy", url: u };
    if (/^https?:\/\/(www\.)?buk\.pt\/[^/?#]+/.test(u)) return { nome: "Buk", url: u };
  }
  return null;
}

function jsonLdBlocks(html) {
  const out = [];
  const re = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try { out.push(JSON.parse(m[1])); } catch (e) { /* ignora */ }
  }
  return out;
}

function flatten(node, acc) {
  if (Array.isArray(node)) node.forEach((n) => flatten(n, acc));
  else if (node && typeof node === "object") {
    acc.push(node);
    if (node["@graph"]) flatten(node["@graph"], acc);
  }
  return acc;
}

function isoMinutes(d) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(String(d || ""));
  return m ? (Number(m[1] || 0) * 60 + Number(m[2] || 0)) || null : null;
}

function parseSchema(html) {
  const nodes = flatten(jsonLdBlocks(html), []);
  const biz = nodes.find((n) => [].concat(n["@type"] || []).some((t) => /HairSalon|BeautySalon|HealthAndBeautyBusiness|LocalBusiness/.test(t)));
  if (!biz) return null;
  const offers = [];
  const seen = new Set();
  function addOffer(o) {
    if (!o || o["@type"] !== "Offer") return;
    const item = o.itemOffered || {};
    const nome = String(item.name || o.name || "").trim();
    const preco = Number(o.price);
    if (!nome || !(preco > 0) || (o.priceCurrency && o.priceCurrency !== "EUR")) return;
    const key = norm(nome) + "|" + preco;
    if (seen.has(key)) return;
    seen.add(key);
    const prop = [].concat(item.additionalProperty || []).find((p) => p && /duration/i.test(p.name));
    offers.push({ nome: nome, preco: preco, duracao_min: prop ? isoMinutes(prop.value) : null });
  }
  (function walk(n) {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!n || typeof n !== "object") return;
    if (n["@type"] === "Offer") addOffer(n);
    if (n.itemListElement) walk(n.itemListElement);
  })([].concat(biz.hasOfferCatalog || [], biz.makesOffer || []));
  return { nome_pagina: biz.name || "", servicos: offers };
}

function parseBuk(html) {
  const title = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || "";
  const offers = [];
  const re = /\{"id":\d+,"name":"((?:[^"\\]|\\.)*)","duration":(\d+),"currency":"EUR","price":([\d.]+)[^{}]*?"showOnBookingPage":(true|false),"showPriceOnBookingPage":(true|false)/g;
  let m;
  while ((m = re.exec(html))) {
    const preco = Number(m[3]);
    if (m[4] !== "true" || m[5] !== "true" || !(preco > 0)) continue;
    if (offers.some((o) => o.nome === JSON.parse('"' + m[1] + '"').trim() && o.preco === preco)) continue;
    offers.push({ nome: JSON.parse('"' + m[1] + '"').trim(), preco: preco, duracao_min: Number(m[2]) || null });
  }
  return { nome_pagina: title.replace(/\s*[|\-–].*$/, "").trim(), servicos: offers };
}

// ── Classificação dos serviços → "corte desde", "barba desde", "corte + barba desde".
// "desde" = preço mais baixo de um serviço de adulto desse tipo (honesto e verificável).
const EXCLUIR = /\bpai\b|filho|\bduo\b|2 pessoas|lavar|pentear|finaliz|crian|infantil|junior|júnior|kid|menino|bebe|bebé|estagi|aluno|formand|academia|estudante|senior|sénior|reformad|idos|militar|promo|desconto|oferta|vale|cart[aã]o|pack|mensal|subscri|membro|vip|domic|casamento|noivo|evento|senhora|mulher|feminin|madeix|color|pintur|descolora|alis|botox|queratin|permanente|progressiva|extens|pr[oó]tese|sobrancelh|depila|cera|limpeza|facial|massag|manicur|pedicur|unha|desenho|risco|tatu|lavagem|penteado|brushing|hidrata|tratamento|express|r[aá]pido|retoque|acabamento|pezinho|contorno/;
// "máquina", "navalha", "tesoura" e "pente" aparecem em serviços de corte E de barba
// ("Barba à máquina") — só contam como corte quando não há palavra de barba.
const CORTE = /corte|cabelo|haircut|degrad|fade|taper|buzz/;
const CORTE_FRACO = /tesoura|maquina|pente|classico|classic|social/;
const BARBA = /barba|beard|shave|bigode|barbear/;

function classify(servicos) {
  const pick = { corte: null, barba: null, corte_barba: null };
  servicos.forEach((s) => {
    const n = norm(s.nome);
    if (EXCLUIR.test(n) || /^\d+\s*(x\s*)?cortes?\b/.test(n) || /\b\d+\s*cortes\b/.test(n)) return;
    const b = BARBA.test(n), c = CORTE.test(n), cf = CORTE_FRACO.test(n);
    // "Corte de barba", "Corte barba", "Degrade barba" são só barba; corte+barba precisa de
    // "cabelo" ou de um "e / + / & / com" entre o corte e a barba.
    // (o norm() apaga "+" e "&", por isso esse caso vê-se no nome original)
    const partes = String(s.nome).split(/[+&\/]/);
    const combo = b && (/cabelo|haircut/.test(n) ||
      /\b(corte|degrad\w*|fade|taper)\s+(e|com|and)\s+(a\s+)?barba/.test(n) ||
      /\bbarba\s+(e|com)\s+(o\s+)?(corte|cabelo|degrad|fade)/.test(n) ||
      (partes.length > 1 && /corte|degrad|fade|taper/.test(norm(partes[0])) && /barba|beard/.test(norm(partes.slice(1).join(" ")))));
    const tipo = combo ? "corte_barba" : b ? "barba" : c || cf ? "corte" : null;
    if (!tipo) return;
    if (pick[tipo] === null || s.preco < pick[tipo]) pick[tipo] = s.preco;
  });
  return pick;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "pt-PT,pt;q=0.9" }, redirect: "follow" });
  return { status: res.status, url: res.url, html: res.status === 200 ? await res.text() : "" };
}

async function main() {
  const only = new Set(process.argv.slice(2));
  const hoje = new Date().toISOString().slice(0, 10);
  const alvo = loadBarbearias()
    .filter((b) => b.mostrar_no_mapa !== false && (!only.size || only.has(b.slug)))
    .map((b) => ({ b: b, fonte: platformUrl(b) }))
    .filter((x) => x.fonte);
  console.log("Fichas com plataforma:", alvo.length);
  const resultados = [];
  for (let i = 0; i < alvo.length; i++) {
    const { b, fonte } = alvo[i];
    const r = { slug: b.slug, nome: b.nome, city: b.city, fonte: { nome: fonte.nome, url: fonte.url, data: hoje } };
    try {
      const page = await fetchHtml(fonte.url);
      r.http = page.status;
      if (page.url !== fonte.url) r.url_final = page.url;
      if (page.html) {
        const parsed = fonte.nome === "Buk" ? parseBuk(page.html) : parseSchema(page.html);
        if (parsed) {
          r.nome_pagina = parsed.nome_pagina;
          r.nome_ok = nameMatches(b.nome, parsed.nome_pagina);
          r.servicos = parsed.servicos;
          Object.assign(r, classify(parsed.servicos));
        }
      }
    } catch (e) {
      r.erro = String(e.message || e);
    }
    resultados.push(r);
    const resumo = r.servicos ? r.servicos.length + " serviços · corte " + r.corte + " · barba " + r.barba + " · c+b " + r.corte_barba + (r.nome_ok ? "" : " · NOME? " + r.nome_pagina) : (r.erro || "http " + r.http);
    console.log("[" + (i + 1) + "/" + alvo.length + "] " + b.slug + " (" + fonte.nome + "): " + resumo);
    if (i < alvo.length - 1) await sleep(DELAY_MS);
  }
  let anterior = [];
  if (only.size && fs.existsSync(OUT)) anterior = JSON.parse(fs.readFileSync(OUT, "utf8")).resultados.filter((r) => !only.has(r.slug));
  const todos = anterior.concat(resultados).sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(OUT, JSON.stringify({ gerado: hoje, resultados: todos }, null, 2) + "\n");
  const comPreco = todos.filter((r) => r.nome_ok && (r.corte || r.barba || r.corte_barba));
  console.log("\nCom preços e nome confirmado:", comPreco.length, "de", todos.length, "→", path.relative(ROOT, OUT));
}

if (require.main === module) main();
module.exports = { classify: classify };
