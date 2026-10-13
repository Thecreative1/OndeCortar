#!/usr/bin/env node
/**
 * apply-home-links.js — idempotente.
 *
 * Os links internos para a homepage apontavam para "index.html" (ex.: ../../index.html#mapa).
 * O Google tratava /index.html como página própria (813 impressões em out/2026), apesar do
 * canonical "/". Este script passa-os para a pasta (../../#mapa, ./#explorar, #mapa na própria
 * homepage), como já faziam os perfis. O ficheiro /index.html continua a existir — nenhum URL muda.
 *
 * Toca em todos os .html do site e nos literais href="../../index.html…" dos scripts e ficheiros
 * de dados que geram páginas (para não voltarem). Correr depois de colar HTML de páginas antigas.
 *
 *   node scripts/apply-home-links.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP = new Set([".git", "node_modules", "test-results", ".claude", ".impeccable", "playwright-report"]);
// Renderer antigo da loja (não se corre — ver CLAUDE.md); fica como está
const SKIP_FILES = new Set(["commerce.js", "commerce-articles.js", path.join("scripts", "sync-commerce-static.js")]);

function walk(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    if (SKIP.has(d.name)) return;
    const full = path.join(dir, d.name);
    if (d.isDirectory()) walk(full, out);
    else if (/\.(html|js)$/.test(d.name)) out.push(full);
  });
  return out;
}

const HTML_LINK = /href="((?:\.\.\/)*)index\.html(#[^"]*)?"/g;
// Nos scripts só os literais com ../ (os outros "index.html" são caminhos de ficheiros a ler/escrever)
// (também com aspas escapadas, como nos ficheiros de dados: href=\"../../index.html#explorar\")
const BS = String.fromCharCode(92);
const JS_LINK = new RegExp("href=(" + BS + BS + "?)\"((?:\\.\\./)+)index\\.html(#[^\"" + BS + BS + "]*)?" + BS + "1\"", "g");

let files = 0;
let links = 0;
walk(ROOT, []).forEach((file) => {
  const rel = path.relative(ROOT, file);
  if (SKIP_FILES.has(rel) || rel === path.join("scripts", "apply-home-links.js")) return;
  const isHtml = file.endsWith(".html");
  const isRootHome = rel === "index.html";
  const text = fs.readFileSync(file, "utf8");
  let count = 0;
  const next = isHtml ? text.replace(HTML_LINK, (_, up, hash) => {
    count += 1;
    if (up) return 'href="' + up + (hash || "") + '"';
    if (isRootHome && hash) return 'href="' + hash + '"';
    return 'href="./' + (hash || "") + '"';
  }) : text.replace(JS_LINK, (_, q, up, hash) => {
    count += 1;
    return "href=" + q + '"' + up + (hash || "") + q + '"';
  });
  if (count) {
    fs.writeFileSync(file, next, "utf8");
    files += 1;
    links += count;
  }
});
console.log(JSON.stringify({ files, links }));
