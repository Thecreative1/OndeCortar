#!/usr/bin/env node
/**
 * Idempotente — etiquetas de partilha (Facebook, WhatsApp, LinkedIn…) em loja/, revista/ e produto/:
 * - páginas que ainda usavam imagens/banner.jpg (1536×316, cortado pelo Facebook) passam a usar
 *   imagens/partilha/ondecortar-loja.jpg (loja) ou ondecortar-revista.jpg (revista), 1200×630;
 * - og:image:width/height (medidos no ficheiro), og:image:alt, og:site_name, og:locale e
 *   twitter:card/twitter:image quando faltam. Os artigos e os produtos mantêm a própria foto.
 * Não mexe em <title>, description, canonical nem JSON-LD.
 * Uso: node scripts/apply-share-tags.js  (corre também no fim de add-store-products.js e build-revista-articles.js)
 * Imagens: node scripts/gerar-imagens-partilha.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://ondecortar.pt/";
const BANNER = SITE + "imagens/banner.jpg";
const CARD = { loja: SITE + "imagens/partilha/ondecortar-loja.jpg", revista: SITE + "imagens/partilha/ondecortar-revista.jpg" };

// Dimensões de JPEG/PNG lidas do cabeçalho (sem dependências)
const dimsCache = new Map();
function dims(url) {
  if (dimsCache.has(url)) return dimsCache.get(url);
  const file = path.join(ROOT, url.replace(SITE, "").split("?")[0]);
  let out = null;
  if (fs.existsSync(file)) {
    const b = fs.readFileSync(file);
    if (b[0] === 0x89 && b[1] === 0x50) out = [b.readUInt32BE(16), b.readUInt32BE(20)];
    else if (b[0] === 0xff && b[1] === 0xd8) {
      for (let i = 2; i < b.length - 9;) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { out = [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; break; }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  }
  dimsCache.set(url, out);
  return out;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const meta = (attr, key, value) => '<meta ' + attr + '="' + key + '" content="' + esc(value) + '" />';

function walk(dir, out = []) {
  for (const f of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, f.name);
    if (f.isDirectory()) walk(rel, out);
    else if (f.name === "index.html") out.push(rel);
  }
  return out;
}

let changed = 0, cards = 0;
const missing = [];
for (const file of [...walk("loja"), ...walk("revista"), ...walk("produto")]) {
  const abs = path.join(ROOT, file);
  const original = fs.readFileSync(abs, "utf8");
  let html = original;
  const imgRe = /<meta property="og:image" content="([^"]*)"\s*\/?>/;
  const m = html.match(imgRe);
  if (!m) { missing.push(file); continue; }
  let img = m[1];
  // Banner antigo, ou foto de produto pequena numa página da loja (black-friday, top-escolhas,
  // para-oferecer): o Facebook mostra-a como miniatura — o cartão 1200×630 dá a pré-visualização grande
  const small = file.startsWith("loja/") && (!dims(img) || dims(img)[0] < 1200);
  if (img === BANNER || (small && img !== CARD.loja)) {
    html = html.split(img).join(file.startsWith("revista/") ? CARD.revista : CARD.loja);
    img = file.startsWith("revista/") ? CARD.revista : CARD.loja;
    cards++;
  }
  html = html.split(BANNER).join(img); // og:image, twitter:image e image do JSON-LD, se lá estiverem
  const title = unesc((html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || "OndeCortar.pt");
  const ALT_CARD = { [CARD.loja]: "Loja OndeCortar.pt: máquinas, aparadores e kits de barba", [CARD.revista]: "Revista OndeCortar.pt: guias práticos de barbearia" };
  const alt = ALT_CARD[img] || title.replace(/\s*\|\s*[^|]*$/, "");

  // Tira as etiquetas que este script gere e volta a pô-las a seguir ao og:image (valores sempre atuais)
  html = html.replace(/\s*<meta property="og:image:(?:width|height|alt)" content="[^"]*"\s*\/?>/g, "");
  const d = dims(img);
  const extra = [];
  if (d) extra.push(meta("property", "og:image:width", d[0]), meta("property", "og:image:height", d[1]));
  extra.push(meta("property", "og:image:alt", alt));
  if (!/property="og:site_name"/.test(html)) extra.push(meta("property", "og:site_name", "OndeCortar.pt"));
  if (!/property="og:locale"/.test(html)) extra.push(meta("property", "og:locale", "pt_PT"));
  if (!/name="twitter:card"/.test(html)) extra.push(meta("name", "twitter:card", "summary_large_image"));
  html = html.replace(imgRe, (tag) => tag.replace(/content="[^"]*"/, 'content="' + img + '"') + "\n  " + extra.join("\n  "));

  if (html !== original) { fs.writeFileSync(abs, html, "utf8"); changed++; }
}
console.log(JSON.stringify({ changed, bannerTrocado: cards, semOgImage: missing }));
