/**
 * apply-product-replacements.js — troca produtos indisponíveis na Amazon.es pelos
 * substitutos definidos num ficheiro de dados (campo `replaces`).
 *
 * Uso: node scripts/apply-product-replacements.js scripts/data/produtos-2026-10-substitutos.js
 *
 * O que faz (idempotente — numa segunda corrida já não encontra o produto antigo):
 *  1. Em loja/, produto/ e revista/, cada cartão/linha que aponta para produto/{antigo}/
 *     passa a mostrar o substituto (link, ASIN, nome, imagem local, alt e textos),
 *     mantendo o rótulo contextual do cartão (ex.: "Melhor escolha").
 *     Formatos: product-card, loja-feat-card, kit-card--secondary, shop-mini-card
 *     (<a> e <article>), comparison-row, oc-decision-col e o ItemList JSON-LD da loja.
 *  2. A página antiga produto/{antigo}/ NÃO é apagada (mesmo URL, sem 404): ganha um
 *     aviso "Indisponível na Amazon.es" com link para o substituto e os botões Amazon
 *     passam a apontar para o substituto, com texto explícito (markers OC-UNAVAILABLE).
 *
 * Correr depois: add-store-products.js (páginas novas), apply-product-quick-decision.js,
 * gerar-webp.py e apply-webp-images.js.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const CHECKED_ON = "5 de outubro de 2026";
const LINK_ATTRS = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';

const input = process.argv[2];
if (!input) {
  console.error("Uso: node scripts/apply-product-replacements.js dados.js");
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cap = (s) => { const t = String(s || "").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
const amazonHref = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=" + TAG + "&amp;language=pt_PT";
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function loadExisting() {
  const ctx = { window: { OndeCortarCommerce: {} } };
  vm.createContext(ctx);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx));
  return new Map(ctx.window.OndeCortarCommerce.products.map((p) => [p.slug, p]));
}

const existing = loadExisting();
const pairs = require(path.resolve(input)).filter((p) => p.replaces).map((fresh) => {
  const old = existing.get(fresh.replaces);
  if (!old) throw new Error("Produto antigo inexistente: " + fresh.replaces);
  return { old, oldAsin: (old.amazon.match(/\/dp\/([A-Z0-9]{10})/) || [])[1], fresh };
});

function walk(dir, out = []) {
  for (const f of fs.readdirSync(path.join(ROOT, dir))) {
    const rel = path.posix.join(dir, f);
    if (fs.statSync(path.join(ROOT, rel)).isDirectory()) walk(rel, out);
    else if (f === "index.html") out.push(rel);
  }
  return out;
}

// Imagem: substitui o <picture> (ou <img>) por um <img> local do substituto,
// mantendo a classe e o loading; o apply-webp-images.js volta a pôr o <picture>.
function swapImage(html, fresh, root) {
  const re = /(?:<picture[^>]*>\s*<source[^>]*>\s*)?<img\b([^>]*?)\s*\/?>(?:\s*<\/picture>)?/;
  return html.replace(re, (whole, attrs) => {
    const cls = (attrs.match(/\sclass="[^"]*"/) || [""])[0];
    const lazy = /loading="lazy"/.test(attrs) ? ' loading="lazy"' : "";
    return "<img" + cls + ' src="' + root + esc(fresh.image) + '" alt="' + esc(fresh.alt) + '"' + lazy + " />";
  });
}

function swapCommon(html, pair, root) {
  const { old, oldAsin, fresh } = pair;
  html = html.split("produto/" + old.slug + "/").join("produto/" + fresh.slug + "/");
  html = html.replace(new RegExp('href="https://www\\.amazon\\.es/dp/' + oldAsin + '[^"]*"', "g"), 'href="' + amazonHref(fresh.asin) + '"');
  html = html.split(esc(old.name)).join(esc(fresh.name));
  html = swapImage(html, fresh, root);
  return html;
}

// Textos por tipo de elemento (o rótulo contextual mantém-se, exceto se for o bestFor antigo)
function swapTexts(html, pair) {
  const { old, fresh } = pair;
  const line = (orig, value) => (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(orig.trim()) ? cap(value) : value);
  html = html.replace(/(<span class="(?:tag|loja-feat-badge|kit-badge)">)([^<]*)(<\/span>)/g, (m, a, t, b) =>
    t.trim() === old.bestFor ? a + esc(fresh.bestFor) + b : m);
  html = html.replace(/(<p class="product-highlight-line">)([^<]*)(<\/p>)/, (m, a, t, b) => a + esc(line(t, fresh.strengths[0])) + b);
  html = html.replace(/(<p class="kit-sec-highlight">)([^<]*)(<\/p>)/, (m, a, t, b) => a + esc(cap(fresh.strengths[0])) + b);
  html = html.replace(/(<p class="loja-feat-why">)([^<]*)(<\/p>)/, (m, a, t, b) => a + esc(fresh.highlight) + b);
  html = html.replace(/(<dt>Para quem é<\/dt><dd>)([^<]*)(<\/dd>)/, (m, a, t, b) => a + esc(fresh.summary) + b);
  html = html.replace(/(<dt>Ponto forte<\/dt><dd>)([^<]*)(<\/dd>)/, (m, a, t, b) => a + esc(fresh.strengths[0]) + b);
  html = html.replace(/(<dt>Menos indicado<\/dt><dd>)([^<]*)(<\/dd>)/, (m, a, t, b) => a + esc(fresh.limits[0]) + b);
  // <p> sem classe (shop-mini-card, comparison-row, cartões inline da revista) = resumo
  html = html.replace(/(<p>)([^<]*)(<\/p>)/, (m, a, t, b) => (t.trim() === old.summary.trim() ? a + esc(fresh.summary) + b : m));
  return html;
}

// Devolve [início, fim] do elemento que envolve a posição i, ou null
function enclosing(html, i) {
  const candidates = [];
  const art = html.lastIndexOf("<article", i);
  if (art !== -1) {
    const end = html.indexOf("</article>", i);
    const between = html.slice(art + 8, i);
    if (end !== -1 && !between.includes("</article>") && !between.includes("<article")) candidates.push([art, end + 10]);
  }
  const mini = html.lastIndexOf('<a class="shop-mini-card"', i);
  if (mini !== -1 && !html.slice(mini, i).includes("</a>")) candidates.push([mini, html.indexOf("</a>", i) + 4]);
  const row = html.lastIndexOf('<div class="comparison-row">', i);
  if (row !== -1) {
    const close = html.slice(i).match(/<\/a>\s*<\/div>/);
    if (close && !html.slice(row + 28, i).includes("comparison-row")) candidates.push([row, i + close.index + close[0].length]);
  }
  if (!candidates.length) return null;
  return candidates.sort((x, y) => y[0] - x[0])[0]; // o mais interior
}

const report = { cards: 0, jsonld: 0, unknown: [], oldPages: 0 };
const files = [...walk("loja"), ...walk("produto"), ...walk("revista")];

for (const file of files) {
  const abs = path.join(ROOT, file);
  const original = fs.readFileSync(abs, "utf8");
  let html = original;
  const root = "../".repeat(file.split("/").length - 1);
  const ownSlug = file.startsWith("produto/") ? file.split("/")[1] : null;

  for (const pair of pairs) {
    if (ownSlug === pair.old.slug) continue;
    // ItemList JSON-LD (loja/index.html)
    html = html.replace(
      new RegExp('"url":"https://ondecortar\\.pt/produto/' + pair.old.slug + '/","name":"' + escapeRe(pair.old.name) + '"', "g"),
      () => { report.jsonld += 1; return '"url":"https://ondecortar.pt/produto/' + pair.fresh.slug + '/","name":"' + pair.fresh.name + '"'; }
    );
    let guard = 0;
    let i;
    while ((i = html.indexOf("produto/" + pair.old.slug + "/")) !== -1 && guard++ < 50) {
      const span = enclosing(html, i);
      if (!span) {
        report.unknown.push(file + " → " + pair.old.slug);
        break;
      }
      const [a, b] = span;
      const swapped = swapTexts(swapCommon(html.slice(a, b), pair, root), pair);
      html = html.slice(0, a) + swapped + html.slice(b);
      report.cards += 1;
    }
  }
  // Links Amazon do produto antigo noutros formatos (ex.: amazon.es/Nome-Produto/dp/ASIN)
  // (na página antiga, os links do próprio produto são tratados mais abaixo)
  {
    for (const pair of pairs.filter((p) => p.old.slug !== ownSlug)) {
      html = html.replace(new RegExp('href="https://www\\.amazon\\.es/[^"]*dp/' + pair.oldAsin + '[^"]*"', "g"), () => {
        report.links = (report.links || 0) + 1;
        return 'href="' + amazonHref(pair.fresh.asin) + '"';
      });
    }
  }
  if (html !== original) fs.writeFileSync(abs, html, "utf8");
}

// Páginas antigas: aviso + botões Amazon para o substituto
for (const { old, oldAsin, fresh } of pairs) {
  const file = path.join(ROOT, "produto", old.slug, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const oldHref = new RegExp('href="https://www\\.amazon\\.es/[^"]*dp/' + oldAsin + '[^"]*"([^>]*)>[^<]*</a>', "g");
  html = html.replace(oldHref, (m, attrs) => 'href="' + amazonHref(fresh.asin) + '"' + attrs + ">Ver alternativa na Amazon.es</a>");
  if (html.includes("<!-- OC-UNAVAILABLE-START -->")) {
    if (html !== before) fs.writeFileSync(file, html, "utf8");
    continue;
  }
  const note = "<!-- OC-UNAVAILABLE-START -->" +
    '<div class="oc-unavailable-note" role="note"><strong>Indisponível na Amazon.es</strong>' +
    "<p>Este produto deixou de estar disponível na Amazon.es (confirmado a " + CHECKED_ON + "). " +
    'A alternativa que recomendamos é o <a href="../../produto/' + fresh.slug + '/">' + esc(fresh.name) + "</a>.</p></div>" +
    "<!-- OC-UNAVAILABLE-END -->";
  html = html.replace(/(<h1>[^<]*<\/h1><p>[^<]*<\/p>)/, (m) => m + note);
  html = html.replace(
    "<p>O preço e o stock mudam com frequência. Confirma diretamente na Amazon.es antes de decidir.</p>",
    "<p>Este produto está indisponível na Amazon.es. O botão abaixo leva à alternativa que recomendamos: " + esc(fresh.name) + ".</p>"
  );
  if (!html.includes("OC-UNAVAILABLE-START")) throw new Error(old.slug + ": não encontrei onde pôr o aviso");
  fs.writeFileSync(file, html, "utf8");
  report.oldPages += 1;
}

console.log("Cartões trocados:", report.cards, "| Links Amazon longos:", report.links || 0, "| JSON-LD:", report.jsonld, "| Páginas antigas com aviso:", report.oldPages);
if (report.unknown.length) console.log("Sem formato reconhecido (rever à mão):\n  " + report.unknown.join("\n  "));
