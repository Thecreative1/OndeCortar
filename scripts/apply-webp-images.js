#!/usr/bin/env node
"use strict";

// Idempotente — envolve as <img> de fotos (.jpg/.jpeg) que têm um .webp ao lado num
// <picture style="display:contents"> com <source type="image/webp">.
// O <img src="….jpg"> fica intacto: é o fallback, o que o Google Imagens indexa e o que
// as regras de CSS continuam a apanhar (display:contents faz o <picture> não ter caixa).
// Seletores de filho direto ("x > img") não apanham a <img> dentro do <picture> — em
// commerce.css só havia .product-card--dense > img, já com a variante "> picture > img".
// Gerar primeiro os .webp com: python scripts/gerar-webp.py
//
// Ignora: páginas geradas pelo build (barbearias/, cidades/), <img> dentro de <script>,
// <img> com srcset e <img> que já estão dentro de um <picture>.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "test-results", "barbearias", "cidades", "scripts", "tests"]);

function listHtml(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function scriptRanges(html) {
  const ranges = [];
  const re = /<script\b[\s\S]*?<\/script>/gi;
  let m;
  while ((m = re.exec(html))) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}

function processFile(file) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = scriptRanges(html);
  let changed = 0;
  const out = html.replace(/<img\b[^>]*>/gi, (tag, offset) => {
    if (scripts.some(([a, b]) => offset >= a && offset < b)) return tag;
    if (/\bsrcset=/i.test(tag)) return tag;
    const before = html.slice(0, offset);
    if (before.lastIndexOf("<picture") > before.lastIndexOf("</picture>")) return tag;
    const src = (tag.match(/\bsrc="([^"]+)"/i) || [])[1];
    if (!src || !/\.jpe?g$/i.test(src) || /^(https?:)?\/\//i.test(src)) return tag;
    const webpSrc = src.replace(/\.jpe?g$/i, ".webp");
    const webpPath = webpSrc.startsWith("/")
      ? path.join(ROOT, webpSrc)
      : path.resolve(path.dirname(file), webpSrc);
    if (!fs.existsSync(webpPath)) return tag;
    changed++;
    // <source> com display:none: dentro de um <picture> sem caixa, o <source> passaria a ser
    // item de grid/flex do pai e empurrava a <img> (não afeta a escolha do WebP pelo browser).
    return '<picture style="display:contents"><source srcset="' + webpSrc + '" type="image/webp" style="display:none">' + tag + "</picture>";
  });
  if (changed) fs.writeFileSync(file, out, "utf8");
  return changed;
}

let files = 0;
let images = 0;
for (const file of listHtml(ROOT, [])) {
  const n = processFile(file);
  if (n) {
    files++;
    images += n;
  }
}
console.log(JSON.stringify({ filesChanged: files, imagesWrapped: images }));
