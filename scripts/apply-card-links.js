/**
 * apply-card-links.js — imagem e nome dos cartões de produto passam a levar à página do produto.
 *
 * Antes só o botão "Ver detalhes/Ver produto" ligava ao produto; clicar na foto ou no nome
 * não fazia nada (é onde as pessoas clicam primeiro).
 *
 * Em loja/, produto/ e revista/, para cada <article> que tem uma <img> e um link interno
 * produto/{slug}/ (idempotente — salta cartões que já têm oc-card-media-link):
 *  - envolve a primeira <picture>/<img> em <a class="oc-card-media-link" ... tabindex="-1" aria-hidden="true">
 *    (display: contents no CSS: não mexe nas grelhas; fora do teclado/leitor de ecrã para não duplicar)
 *  - envolve o texto do nome (h3, ou strong nos cartões da revista) em <a class="oc-card-title-link">
 * Links da Amazon não são tocados.
 *
 * Uso: node scripts/apply-card-links.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function walk(dir, out = []) {
  for (const f of fs.readdirSync(path.join(ROOT, dir))) {
    const rel = path.posix.join(dir, f);
    if (fs.statSync(path.join(ROOT, rel)).isDirectory()) walk(rel, out);
    else if (f === "index.html") out.push(rel);
  }
  return out;
}

function linkCard(body) {
  if (body.includes("oc-card-media-link")) return null;
  const product = body.match(/href="((?:\.\.\/)*produto\/[a-z0-9-]+\/)"/);
  if (!product || !/<img\b/.test(body)) return null;
  const href = product[1];

  // Imagem: a primeira <picture>…</picture> ou <img …> que ainda não esteja dentro de um <a>
  const media = body.match(/<picture\b[^>]*>[\s\S]*?<\/picture>|<img\b[^>]*>/);
  if (!media) return null;
  const before = body.slice(0, media.index);
  if ((before.match(/<a\b/g) || []).length > (before.match(/<\/a>/g) || []).length) return null; // já dentro de link
  let out = before +
    '<a class="oc-card-media-link" href="' + href + '" tabindex="-1" aria-hidden="true">' + media[0] + "</a>" +
    body.slice(media.index + media[0].length);

  // Nome: <h3 …>texto</h3> (cartões da loja/produto) ou <strong>texto</strong> (cartões da revista)
  const title = out.match(/(<h3\b[^>]*>)([^<]+)(<\/h3>)/) || out.match(/(<strong>)([^<]+)(<\/strong>)/);
  if (title) {
    out = out.replace(title[0], title[1] + '<a class="oc-card-title-link" href="' + href + '">' + title[2] + "</a>" + title[3]);
  }
  return out;
}

let files = 0;
let cards = 0;
for (const file of [...walk("loja"), ...walk("produto"), ...walk("revista")]) {
  const abs = path.join(ROOT, file);
  const html = fs.readFileSync(abs, "utf8");
  let changed = 0;
  const next = html.replace(/(<article class="[^"]*"[^>]*>)([\s\S]*?)(<\/article>)/g, (whole, open, body, close) => {
    const linked = linkCard(body);
    if (linked === null) return whole;
    changed += 1;
    return open + linked + close;
  });
  if (changed) {
    fs.writeFileSync(abs, next, "utf8");
    files += 1;
    cards += changed;
  }
}
console.log("Cartões ligados:", cards, "em", files, "ficheiros");
