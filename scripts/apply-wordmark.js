#!/usr/bin/env node
/**
 * Idempotente — logótipo em texto igual em todo o site (2026-10-18): "OndeCortar" + ".pt" dourado em <sup>,
 * como nos perfis (`.oc-topnav__brand`) e na homepage.
 *  - Páginas escuras manuais (Sobre, FAQ, Registar, Privacidade): mesmo aspeto dos perfis (Big Shoulders,
 *    .pt #E3A863, sem o logótipo redondo nem a legenda) — bloco <style id="oc-wordmark"> antes de </head>.
 *  - Loja, revista e produtos: mantêm a identidade clara e o logótipo redondo; o .pt fica num dourado
 *    escuro (#8A5714, contraste ≥ 4,5:1 no creme) — regras no fim de commerce.css (OC-WORDMARK-START/END).
 *  - Páginas de cidade: geradas pelo build (renderHeader/renderFooter + renderBaseStyles), não por este script.
 * O texto do link continua "OndeCortar.pt" (o <sup> não muda o textContent).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OLD = "<strong>OndeCortar.pt</strong>";
const NEW = "<strong>OndeCortar<sup>.pt</sup></strong>";

const DARK_PAGES = ["sobre/index.html", "faq.html", "registar.html", "privacidade.html"];
const LIGHT_DIRS = ["loja", "revista", "produto"];

const DARK_STYLE = `<style id="oc-wordmark">
  .brand-text strong, .footer-brand strong { font-family: 'Big Shoulders Display', 'Arial Narrow', sans-serif; font-weight: 700; font-size: 22px; line-height: 1; letter-spacing: -0.01em; color: #ECE7DD; }
  .brand-text strong sup, .footer-brand strong sup { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #E3A863; vertical-align: super; margin-left: 2px; }
  .site-header .brand img, .footer-brand img, .brand-text > span { display: none; }
</style>`;

const LIGHT_CSS = `/* OC-WORDMARK-START — logótipo "OndeCortar" + ".pt" dourado (scripts/apply-wordmark.js) */
.brand-text strong sup,
.footer-brand strong sup {
  font-size: 0.6em;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8A5714;
  vertical-align: super;
  margin-left: 1px;
}
/* OC-WORDMARK-END */`;

function htmlFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

let changed = 0;
function update(file, fn) {
  const before = fs.readFileSync(file, "utf8");
  const after = fn(before);
  if (after !== before) { fs.writeFileSync(file, after); changed++; }
}

for (const rel of DARK_PAGES) {
  update(path.join(ROOT, rel), (h) => {
    h = h.split(OLD).join(NEW);
    if (!h.includes('<style id="oc-wordmark">')) h = h.replace("</head>", DARK_STYLE + "\n</head>");
    return h;
  });
}
for (const dir of LIGHT_DIRS) {
  for (const f of htmlFiles(path.join(ROOT, dir))) update(f, (h) => h.split(OLD).join(NEW));
}
update(path.join(ROOT, "commerce.css"), (c) => {
  const re = /\/\* OC-WORDMARK-START[\s\S]*?OC-WORDMARK-END \*\//;
  return re.test(c) ? c.replace(re, LIGHT_CSS) : c.trimEnd() + "\n\n" + LIGHT_CSS + "\n";
});
console.log("Ficheiros alterados: " + changed);
