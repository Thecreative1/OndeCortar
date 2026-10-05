/**
 * apply-product-quick-decision.js — bloco "Compra esta se… / Evita esta se…"
 * no painel "Antes de comprar" das páginas de produto (produto/{slug}/).
 *
 * Idempotente (markers OC-QUICK-DECISION-START/END). Não inventa texto:
 *  - "Compra esta se…" = product.summary
 *  - "Evita esta se…"  = product.limits[0]
 * e muda o rótulo "Melhor para:" do painel para "Ideal para:".
 * Dados vêm de commerce-products-a/b.js.
 *
 * Reverter: remover o bloco entre os markers e voltar a "Melhor para:".
 *
 * Uso: node scripts/apply-product-quick-decision.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const START = "<!-- OC-QUICK-DECISION-START -->";
const END = "<!-- OC-QUICK-DECISION-END -->";

function loadProducts() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const file of ["commerce-products-a.js", "commerce-products-b.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), ctx);
  }
  return ctx.window.OndeCortarCommerce.products;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function capitalize(text) {
  const value = String(text || "").trim();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function block(product) {
  const buy = capitalize(product.summary);
  const avoid = capitalize(product.limits && product.limits[0]);
  if (!buy || !avoid) return "";
  return (
    START +
    '<dl class="oc-quick-decision">' +
      "<div><dt>Compra esta se…</dt><dd>" + escapeHtml(buy) + "</dd></div>" +
      '<div class="is-avoid"><dt>Evita esta se…</dt><dd>' + escapeHtml(avoid.replace(/\.?$/, ".")) + "</dd></div>" +
    "</dl>" +
    END
  );
}

const stats = { updated: 0, unchanged: 0, skipped: [] };

for (const product of loadProducts()) {
  const file = path.join(ROOT, "produto", product.slug, "index.html");
  if (!fs.existsSync(file)) {
    stats.skipped.push(product.slug + " (sem página)");
    continue;
  }
  const original = fs.readFileSync(file, "utf8");
  let html = original;
  const section = block(product);
  if (!section) {
    stats.skipped.push(product.slug + " (sem summary/limits)");
    continue;
  }

  if (html.includes(START)) {
    html = html.replace(new RegExp(START + "[\\s\\S]*?" + END), () => section);
  } else {
    const panelAt = html.indexOf('<div class="product-hero-panel">');
    const ulEnd = panelAt === -1 ? -1 : html.indexOf("</ul>", panelAt);
    if (ulEnd === -1) {
      stats.skipped.push(product.slug + " (painel não encontrado)");
      continue;
    }
    const insertAt = ulEnd + "</ul>".length;
    html = html.slice(0, insertAt) + section + html.slice(insertAt);
  }

  html = html.replace(
    /(<div class="product-hero-panel"><strong>Antes de comprar<\/strong><ul class="rich-list"><li>)Melhor para:/,
    "$1Ideal para:"
  );

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
    stats.updated += 1;
  } else {
    stats.unchanged += 1;
  }
}

console.log("Atualizadas:", stats.updated, "| Sem alterações:", stats.unchanged);
if (stats.skipped.length) console.log("Ignoradas:", stats.skipped.join(", "));
