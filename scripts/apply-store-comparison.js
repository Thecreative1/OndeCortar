#!/usr/bin/env node
/**
 * Insere/atualiza a tabela "Comparar num relance" numa página de categoria da loja.
 * Uso: node scripts/apply-store-comparison.js scripts/data/comparacao-maquinas.js
 * Idempotente (markers OC-COMPARE-START/END). Nome, imagem e ASIN vêm de commerce-products-a/b.js.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const spec = require(path.resolve(process.argv[2] || "scripts/data/comparacao-maquinas.js"));

const ctx = { window: { OndeCortarCommerce: {} } };
vm.createContext(ctx);
["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx));
const products = new Map(ctx.window.OndeCortarCommerce.products.map((p) => [p.slug, p]));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rows = spec.rows.map((r) => {
  const p = products.get(r.slug);
  if (!p) throw new Error("Produto inexistente: " + r.slug);
  const asin = (p.amazon.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
  if (!asin) throw new Error("Sem ASIN: " + r.slug);
  const img = /^https?:/.test(p.image) ? p.image : "../../" + p.image;
  return '<tr>' +
    '<th scope="row"><a class="oc-compare-product" href="../../produto/' + r.slug + '/"><img src="' + esc(img) + '" alt="" width="48" height="48" loading="lazy" /><span>' + esc(p.name) + '</span></a></th>' +
    '<td data-label="Melhor para">' + esc(r.bestFor) + '</td>' +
    '<td data-label="Alimentação">' + esc(r.power) + '</td>' +
    '<td data-label="Autonomia">' + esc(r.runtime) + '</td>' +
    '<td data-label="Comprimentos">' + esc(r.lengths) + '</td>' +
    '<td class="oc-compare-cta"><a class="btn btn-primary btn-small" href="https://www.amazon.es/dp/' + asin + '?tag=' + TAG + '&amp;language=pt_PT" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço na Amazon</a></td>' +
    '</tr>';
}).join("");

const block = '<!-- OC-COMPARE-START --><section class="section oc-compare" id="comparar"><div class="container">' +
  '<div class="section-header section-header--compact"><div><span class="eyebrow">Comparação rápida</span><h2>' + esc(spec.title) + '</h2><p>' + esc(spec.intro) + '</p></div></div>' +
  '<div class="oc-compare-wrap"><table class="oc-compare-table"><thead><tr><th scope="col">Máquina</th><th scope="col">Melhor para</th><th scope="col">Alimentação</th><th scope="col">Autonomia</th><th scope="col">Comprimentos</th><th scope="col"><span class="sr-only">Comprar</span></th></tr></thead>' +
  '<tbody>' + rows + '</tbody></table>' +
  '<button type="button" class="btn btn-secondary oc-compare-more" hidden>Ver as ' + spec.rows.length + ' máquinas</button></div>' +
  // No telemóvel mostra só 6 linhas até o visitante pedir o resto (sem JS aparecem todas)
  '<script>(function(){var w=document.currentScript.parentNode.querySelector(".oc-compare-wrap"),b=w.querySelector(".oc-compare-more");if(!window.matchMedia("(max-width: 760px)").matches)return;w.classList.add("is-collapsed");b.hidden=false;b.addEventListener("click",function(){w.classList.remove("is-collapsed");b.hidden=true;});})();</script>' +
  '</div></section><!-- OC-COMPARE-END -->';

const file = path.join(ROOT, spec.page);
let html = fs.readFileSync(file, "utf8");
if (html.includes("<!-- OC-COMPARE-START -->")) {
  html = html.replace(/<!-- OC-COMPARE-START -->[\s\S]*?<!-- OC-COMPARE-END -->/, () => block);
} else {
  if (!html.includes(spec.anchor)) throw new Error("Âncora não encontrada em " + spec.page);
  html = html.replace(spec.anchor, () => block + spec.anchor);
}
fs.writeFileSync(file, html, "utf8");
console.log(spec.page + ": tabela com " + spec.rows.length + " linhas");
