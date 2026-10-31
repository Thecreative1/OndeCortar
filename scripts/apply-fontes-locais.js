#!/usr/bin/env node
/**
 * Idempotente — troca o Google Fonts pelas fontes do próprio site (fonts/*.woff2) nas páginas
 * manuais: homepage, Sobre, FAQ, Registar, Privacidade, 404 e obrigado. Perfis e cidades são
 * tratados pelo build (scripts/fontes-locais.js). Cada página declara as mesmas famílias e pesos
 * que pedia ao Google, para o aspeto ficar igual. A loja e a revista já usavam fontes locais
 * (@font-face em commerce.css).
 *
 * Uso: node scripts/apply-fontes-locais.js
 */
const fs = require("fs");
const path = require("path");
const { fontStyleTag } = require("./fontes-locais.js");

const ROOT = path.resolve(__dirname, "..");
const BS = ["Big Shoulders Display", "700 800"];

const PAGES = {
  "index.html": ["", [BS, ["Bricolage Grotesque", "400 800"], ["Instrument Serif", "400"], ["Instrument Serif", "400", "italic"], ["Manrope", "300 800"]]],
  "sobre/index.html": ["../", [BS, ["Geist", "400 700"]]],
  "faq.html": ["", [BS, ["Geist", "400 700"]]],
  "privacidade.html": ["", [BS, ["Geist", "400 700"]]],
  "registar.html": ["", [BS, ["Geist", "400 800"]]],
  // a 404 é servida em qualquer caminho: URL absoluto
  "404.html": ["/", [["Playfair Display", "600 700"], ["Plus Jakarta Sans", "400 800"]]],
  "obrigado.html": ["", [["Big Shoulders Display", "800"], ["Plus Jakarta Sans", "400 800"]]],
};

const GOOGLE = /[ \t]*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"\s*\/?>\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin\s*\/?>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*" rel="stylesheet"\s*\/?>/;
const LOCAL = /<style id="oc-fonts">[^<]*<\/style>/;

let changed = 0;
for (const [file, [prefix, faces]] of Object.entries(PAGES)) {
  const abs = path.join(ROOT, file);
  const original = fs.readFileSync(abs, "utf8");
  const tag = fontStyleTag(prefix, faces);
  let html = original;
  if (LOCAL.test(html)) html = html.replace(LOCAL, tag);
  else if (GOOGLE.test(html)) html = html.replace(GOOGLE, "  " + tag);
  else throw new Error(file + ": nem Google Fonts nem oc-fonts encontrados");
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) throw new Error(file + ": ainda tem Google Fonts");
  if (html !== original) { fs.writeFileSync(abs, html, "utf8"); changed++; }
}
console.log(JSON.stringify({ changed, pages: Object.keys(PAGES).length }));
