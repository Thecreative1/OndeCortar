#!/usr/bin/env node
/**
 * Avisa o Bing (e os outros motores IndexNow: Yandex, Seznam, Naver…) de páginas novas ou alteradas.
 * O ChatGPT e o Copilot usam o índice do Bing. A Google NÃO usa IndexNow (para a Google: Search Console).
 *
 * Uso:
 *   node scripts/indexnow.js                 # simulação: URLs dos sitemaps com <lastmod> nos últimos 2 dias
 *   node scripts/indexnow.js --days 7        # janela maior
 *   node scripts/indexnow.js --url https://ondecortar.pt/revista/x/ --url …   # URLs concretos
 *   node scripts/indexnow.js --send          # envia de verdade (até 10 000 URLs por pedido)
 *   node scripts/indexnow.js --send --wait   # antes de enviar, espera que o site publicado já tenha
 *                                            # o sitemap.xml igual ao local (deploy do GitHub Pages)
 *
 * Chave: ficheiro {KEY}.txt na raiz do site (tem de estar publicado antes do 1.º envio).
 * Os <lastmod> dos sitemaps são exatos (ver CLAUDE.md, "SEO — regras da Google"), por isso a janela
 * de dias apanha só o que mudou de facto. Não reenviar a mesma lista várias vezes: 429 = demasiados pedidos.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HOST = "ondecortar.pt";
const SITE = "https://" + HOST + "/";
const KEY = "02daf1105e257bfad18c75fa0af5d57b";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAPS = ["sitemap-pages.xml", "sitemap-barbearias.xml", "sitemap-cidades.xml", "sitemap-revista.xml", "sitemap-loja.xml"];

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const explicit = args.flatMap((a, i) => (a === "--url" && args[i + 1] ? [args[i + 1]] : []));
const days = Number(val("--days", "2"));

function recentUrls() {
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const out = new Set();
  for (const file of SITEMAPS) {
    const xml = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)) {
      if (m[2] >= since) out.add(m[1]);
    }
  }
  return [...out];
}

async function waitForDeploy() {
  const local = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").replace(/\r\n/g, "\n").trim();
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(SITE + "sitemap.xml?ts=" + Date.now(), { cache: "no-store" });
      const live = (await res.text()).replace(/\r\n/g, "\n").trim();
      const key = await fetch(SITE + KEY + ".txt?ts=" + Date.now()).then((r) => (r.ok ? r.text() : ""));
      if (live === local && key.trim() === KEY) { console.log("Site publicado já tem o sitemap atual e a chave."); return true; }
    } catch (e) { /* tenta outra vez */ }
    await new Promise((r) => setTimeout(r, 15000));
  }
  console.log("O site publicado ainda não tem o sitemap atual (10 min). Não envio.");
  return false;
}

(async () => {
  const urls = (explicit.length ? explicit : recentUrls()).filter((u) => u.startsWith(SITE)).slice(0, 10000);
  console.log(urls.length + " URL(s)" + (explicit.length ? "" : " com lastmod nos últimos " + days + " dia(s)") + ":");
  urls.slice(0, 15).forEach((u) => console.log("  " + u));
  if (urls.length > 15) console.log("  …");
  if (!urls.length) return;
  if (!has("--send")) { console.log("\nSimulação. Para enviar: --send"); return; }
  if (has("--wait") && !(await waitForDeploy())) process.exit(0);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: SITE + KEY + ".txt", urlList: urls })
  });
  const meaning = { 200: "recebido", 202: "recebido, chave a validar", 400: "formato inválido", 403: "chave inválida ou ficheiro da chave em falta", 422: "URLs não pertencem ao host", 429: "demasiados pedidos" };
  console.log("IndexNow: HTTP " + res.status + " — " + (meaning[res.status] || (await res.text()).slice(0, 200)));
  if (res.status >= 400) process.exitCode = 1;
})();
