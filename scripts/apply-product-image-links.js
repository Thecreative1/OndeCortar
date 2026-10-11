#!/usr/bin/env node
/**
 * Idempotente — nas páginas de produto (produto/{slug}/), a foto do produto passa a levar à
 * Amazon.es (o mesmo link do botão "Ver preço na Amazon.es") e ganha por baixo uma linha
 * discreta "Ver na Amazon.es ↗". Decisão de 2026-10-11: menos um passo para quem toca na foto,
 * sem rótulo por cima da imagem.
 *
 * - Links com rel="sponsored nofollow noopener noreferrer" e target="_blank", como o botão.
 * - tabindex="-1" + aria-hidden: o botão continua a ser o caminho acessível (sem link duplicado
 *   para leitores de ecrã e teclado).
 * - data-oc-click="product-foto": o oc-analytics.js conta estes cliques no GoatCounter em
 *   amazon/product-foto/<slug>, separados do botão (amazon/product/<slug>).
 * - Ignora as páginas de produtos substituídos (OC-UNAVAILABLE-START): aí o botão leva a outro
 *   produto e a foto é a do produto antigo.
 *
 * Uso: node scripts/apply-product-image-links.js   (correr depois de add-store-products.js)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "produto");
const ATTRS = 'target="_blank" rel="sponsored nofollow noopener noreferrer" tabindex="-1" aria-hidden="true" data-oc-click="product-foto"';

const stats = { updated: 0, unchanged: 0, skippedReplaced: 0, skippedNoLink: 0 };

for (const slug of fs.readdirSync(DIR)) {
  const file = path.join(DIR, slug, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  if (html.includes("OC-UNAVAILABLE-START")) { stats.skippedReplaced++; continue; }

  // Link do botão principal do cabeçalho
  const hero = html.match(/<div class="hero-actions"><a class="btn btn-primary" href="(https:\/\/www\.amazon\.es\/[^"]+)"/);
  if (!hero) { stats.skippedNoLink++; continue; }
  const href = hero[1];

  const stageRe = /<div class="product-stage">([\s\S]*?)<\/div>/;
  const m = html.match(stageRe);
  if (!m) { stats.skippedNoLink++; continue; }

  // Conteúdo original da foto (sem os links, se já tiverem sido aplicados)
  let inner = m[1];
  const linked = inner.match(/^<a class="oc-stage-link"[^>]*>([\s\S]*?)<\/a><a class="oc-stage-caption"[^>]*>[^<]*<\/a>$/);
  if (linked) inner = linked[1];

  const block = '<div class="product-stage"><a class="oc-stage-link" href="' + href + '" ' + ATTRS + ">" + inner + "</a>" +
    '<a class="oc-stage-caption" href="' + href + '" ' + ATTRS + ">Ver na Amazon.es ↗</a></div>";
  const out = html.replace(stageRe, () => block);
  if (out === html) { stats.unchanged++; continue; }
  fs.writeFileSync(file, out, "utf8");
  stats.updated++;
}

console.log(JSON.stringify(stats));
