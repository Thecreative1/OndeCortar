// Aplica melhorias de afiliado diretamente nos HTML estáticos de loja/, produto/ e revista/.
//
// Contexto: várias páginas geradas (loja/index.html, loja/kits-de-barba/, revista/index.html
// e a maioria dos artigos da revista) foram enriquecidas à mão DEPOIS do último sync, pelo que
// correr scripts/sync-commerce-static.js destruiria esse conteúdo. Este script aplica as
// melhorias de conversão sem regenerar as páginas. É idempotente — pode correr-se várias vezes.
//
// O que faz:
//   1. CTA "Ver preço" -> "Ver preço na Amazon.es" nos botões de afiliado.
//   2. Insere a faixa de preço (product.priceRange) junto ao título nos cartões de produto,
//      no hero e na buy-box das páginas de produto.
//   3. Acrescenta CTA direto para a Amazon nos cartões de produto dos artigos da revista
//      que só tinham o link interno "Ver produto".
//   4. Acrescenta ?tag=ondecortarp0c-21 a URLs amazon.es sem tag (ex.: JSON-LD offers.url).

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortarp0c-21";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadProducts() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  });
  return context.window.OndeCortarCommerce.products || [];
}

function amazonPtHref(rawUrl) {
  const url = new URL(rawUrl);
  if (!url.searchParams.get("tag")) url.searchParams.set("tag", TAG);
  url.searchParams.set("language", "pt_PT");
  return escapeHtml(url.toString());
}

function listPages(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  const out = [];
  (function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") out.push(full);
    }
  })(base);
  return out;
}

function main() {
  const products = loadProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const stats = { files: 0, cta: 0, price: 0, articleCta: 0, tags: 0 };

  const pages = [...listPages("loja"), ...listPages("produto"), ...listPages("revista")];

  for (const file of pages) {
    const original = fs.readFileSync(file, "utf8");
    let html = original;
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");

    // 1. CTA dos botões de afiliado
    html = html.replace(
      /( rel="sponsored nofollow noopener noreferrer">)Ver preço(<\/a>)/g,
      (m, a, b) => { stats.cta++; return a + "Ver preço na Amazon.es" + b; }
    );

    // 2. Faixa de preço junto aos títulos de cartões (só quando ainda não existe)
    for (const product of products) {
      if (!product.priceRange) continue;
      const name = escapeHtml(product.name);
      const span = '<span class="product-price-range">' + escapeHtml(product.priceRange) + "</span>";
      for (const cls of ["product-card-title", "loja-feat-name", "loja-quick-name"]) {
        const target = '<h3 class="' + cls + '">' + name + "</h3>";
        const re = new RegExp(escapeRegExp(target) + '(?!<span class="product-price-range">)', "g");
        html = html.replace(re, () => { stats.price++; return target + span; });
      }
    }

    // 2b. Hero e buy-box das páginas de produto (slug vem do caminho)
    const productMatch = rel.match(/^produto\/([^/]+)\/index\.html$/);
    if (productMatch) {
      const product = bySlug.get(decodeURIComponent(productMatch[1]));
      if (product && product.priceRange) {
        const span = '<span class="product-price-range">' + escapeHtml(product.priceRange) + "</span>";
        const h1 = "<h1>" + escapeHtml(product.name) + "</h1>";
        const h1Re = new RegExp(escapeRegExp(h1) + '(?!<span class="product-price-range">)');
        html = html.replace(h1Re, () => { stats.price++; return h1 + span; });
        const buyBox = "<h3>Confirmar preço e disponibilidade</h3>";
        const buyBoxRe = new RegExp(escapeRegExp(buyBox) + '(?!<span class="product-price-range">)');
        html = html.replace(buyBoxRe, () => { stats.price++; return buyBox + span; });
      }
    }

    // 3. CTA Amazon nos cartões que só têm "Ver produto"
    html = html.replace(
      /<div class="card-actions"><a class="btn btn-secondary btn-small" href="([^"]*\/produto\/([a-z0-9-]+)\/)">Ver produto<\/a><\/div>/g,
      (match, internalHref, slug) => {
        const product = bySlug.get(slug);
        if (!product || !product.amazon) return match;
        stats.articleCta++;
        return (
          '<div class="card-actions">' +
          '<a class="btn btn-primary btn-small" href="' + amazonPtHref(product.amazon) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço na Amazon.es</a>' +
          '<a class="btn btn-secondary btn-small" href="' + internalHref + '">Ver produto</a>' +
          "</div>"
        );
      }
    );

    // 4. URLs amazon.es sem query string ganham a tag (apanha o JSON-LD offers.url)
    html = html.replace(/(https:\/\/www\.amazon\.es\/[^"?\s<]+)(")/g, (m, url, quote) => {
      stats.tags++;
      return url + "?tag=" + TAG + quote;
    });

    if (html !== original) {
      fs.writeFileSync(file, html, "utf8");
      stats.files++;
    }
  }

  console.log(JSON.stringify(stats, null, 2));
}

main();
