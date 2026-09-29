#!/usr/bin/env node
/**
 * Adiciona produtos novos à loja sem passar pelo sync (que é destrutivo).
 *
 * Uso: node scripts/add-store-products.js caminho/para/produtos.js
 *
 * O ficheiro de entrada exporta um array com { slug, name, brand, asin, image, alt,
 * bestFor, summary, useCase, highlight, strengths[], limits[], categories[], articles[], related[] }.
 *
 * Idempotente:
 * - (re)gera produto/{slug}/index.html a partir do modelo produto/wahl-super-taper/
 * - junta o cartão ao bloco OC-CATEGORY-ALL de cada categoria (se ainda lá não estiver)
 * - junta a URL a sitemap-loja.xml e a entrada a commerce-products-b.js (se faltarem)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const TEMPLATE_SLUG = "wahl-super-taper";
const TODAY = new Date().toISOString().slice(0, 10);

const input = process.argv[2];
if (!input) {
  console.error("Uso: node scripts/add-store-products.js produtos.js");
  process.exit(1);
}
const newProducts = require(path.resolve(input));

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const write = (rel, text) => fs.writeFileSync(path.join(ROOT, rel), text, "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const amazonUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=" + TAG + "&language=pt_PT";
const LINK_ATTRS = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';

function loadExisting() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => vm.runInContext(read(file), context));
  const map = new Map();
  (context.window.OndeCortarCommerce.products || []).forEach((p) => {
    const asin = (String(p.amazon).match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
    map.set(p.slug, { ...p, asin, amazonHref: p.amazon });
  });
  return map;
}

const existing = loadExisting();
const all = new Map(existing);
newProducts.forEach((p) => all.set(p.slug, { ...p, amazonHref: amazonUrl(p.asin) }));

function hrefFor(p) {
  const raw = p.asin ? amazonUrl(p.asin) : p.amazonHref;
  return esc(raw.includes("language=") ? raw : raw + "&language=pt_PT");
}

function categoryName(slug) {
  const m = read("loja/" + slug + "/index.html").match(/<h1[^>]*>([^<]+)<\/h1>/);
  return m ? m[1].trim() : slug;
}

function articleTitle(slug) {
  const file = "revista/" + slug + "/index.html";
  if (!fs.existsSync(path.join(ROOT, file))) throw new Error("Artigo inexistente: " + slug);
  return read(file).match(/<h1[^>]*>([^<]+)<\/h1>/)[1].trim();
}

const imgSrc = (src) => (/^https?:\/\//.test(src) ? src : "../../" + src);

function card(p) {
  const line = (p.strengths && p.strengths[0]) || p.summary;
  return '<article class="product-card product-card--dense">' +
    '<img src="' + esc(imgSrc(p.image)) + '" alt="' + esc(p.alt) + '" loading="lazy" />' +
    '<div class="product-copy"><div class="meta-row"><span class="tag">' + esc(p.bestFor) + '</span></div>' +
    '<h3 class="product-card-title">' + esc(p.name) + '</h3>' +
    '<p class="product-highlight-line">' + esc(line) + '</p>' +
    '<div class="card-actions"><a class="btn btn-secondary btn-small" href="../../produto/' + esc(p.slug) + '/">Ver produto</a>' +
    '<a class="btn btn-primary btn-small" href="' + hrefFor(p) + '" ' + LINK_ATTRS + '>Ver preço na Amazon.es</a></div></div></article>';
}

function pageHead(p, cats) {
  const url = "https://ondecortar.pt/produto/" + p.slug + "/";
  const title = p.name + " | Recomendação OndeCortar";
  const product = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.summary,
    image: "https://ondecortar.pt/" + p.image, url, brand: { "@type": "Brand", name: p.brand },
    category: cats.map((c) => c.name).join(", ")
  };
  const crumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Loja", item: "https://ondecortar.pt/loja/" },
      { "@type": "ListItem", position: 2, name: cats[0].name, item: "https://ondecortar.pt/loja/" + cats[0].slug + "/" },
      { "@type": "ListItem", position: 3, name: p.name, item: url }
    ]
  };
  return {
    meta: '<title>' + esc(title) + '</title>\n' +
      '  <meta name="description" content="' + esc(p.summary) + '" />\n' +
      '  <link rel="canonical" href="' + url + '" />\n' +
      '  <link rel="icon" href="../../favicon.ico" type="image/x-icon" />\n' +
      '  <link rel="apple-touch-icon" href="../../apple-touch-icon.png" />\n' +
      '  <meta property="og:title" content="' + esc(title) + '" />\n' +
      '  <meta property="og:description" content="' + esc(p.summary) + '" />\n' +
      '  <meta property="og:url" content="' + url + '" />\n' +
      '  <meta property="og:type" content="product" />\n' +
      '  <meta property="og:image" content="https://ondecortar.pt/' + esc(p.image) + '" />',
    ld: '<script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(product) + '</script>\n' +
      '  <script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(crumbs) + '</script>'
  };
}

function pageMain(p, cats) {
  const href = hrefFor(p);
  const cat = cats[0];
  const li = (items) => items.map((x) => "<li>" + esc(x) + "</li>").join("");
  const related = (p.related || []).map((slug) => {
    const r = all.get(slug);
    if (!r) throw new Error(p.slug + ": produto relacionado inexistente " + slug);
    return card(r);
  }).join("");
  const guides = (p.articles || []).map((slug) =>
    '<a class="store-guide-link" href="../../revista/' + slug + '/"><strong>' + esc(articleTitle(slug)) + '</strong><span>Ler guia</span></a>'
  ).join("");
  return '<main><section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy">' +
    '<div class="breadcrumbs"><a href="../../loja/">Loja</a><span>/</span><a href="../../loja/' + cat.slug + '/">' + esc(cat.name) + '</a><span>/</span><span>' + esc(p.name) + '</span></div>' +
    '<span class="section-flag">Recomendação OndeCortar</span><span class="eyebrow">' + esc(p.bestFor) + '</span>' +
    '<h1>' + esc(p.name) + '</h1><p>' + esc(p.summary) + '</p>' +
    '<div class="hero-actions"><a class="btn btn-primary" href="' + href + '" ' + LINK_ATTRS + '>Ver preço na Amazon.es</a>' +
    '<a class="btn btn-secondary" href="../../loja/' + cat.slug + '/">Ver ' + esc(cat.name.toLowerCase()) + '</a></div>' +
    '<div class="product-hero-panel"><strong>Antes de comprar</strong><ul class="rich-list">' +
    '<li>Melhor para: ' + esc(p.bestFor) + '</li><li>Ponto forte: ' + esc(p.strengths[0]) + '</li><li>Mais a favor: ' + esc(p.strengths[1]) + '</li></ul>' +
    '<div class="card-actions"><a class="btn btn-secondary btn-small" href="#relacionados">Ver alternativas</a></div></div></div>' +
    '<div class="hero-side"><div class="product-stage"><img src="../../' + esc(p.image) + '" alt="' + esc(p.alt) + '" /></div>' +
    '<div class="store-note"><strong>Porque recomendamos</strong><p>' + esc(p.highlight) + '</p></div></div></div></div></section>' +
    '<section class="section"><div class="container split-grid"><div class="stack">' +
    '<div class="product-highlight"><h3>Para quem é</h3><p>' + esc(p.summary) + '</p></div>' +
    '<div class="product-highlight"><h3>Onde faz sentido</h3><p>' + esc(p.useCase) + '</p></div>' +
    '<div class="product-highlight"><h3>Pontos fortes</h3><ul class="rich-list">' + li(p.strengths) + '</ul></div>' +
    '<div class="product-highlight"><h3>Limitações</h3><ul class="rich-list">' + li(p.limits) + '</ul></div></div>' +
    '<div class="stack"><div class="buy-box"><span class="price-hint">Loja afiliada</span><h3>Confirmar preço e disponibilidade</h3>' +
    '<p>O preço e o stock mudam com frequência. Confirma diretamente na Amazon.es antes de decidir.</p>' +
    '<div class="card-actions"><a class="btn btn-primary" href="' + href + '" ' + LINK_ATTRS + '>Ver preço na Amazon.es</a>' +
    '<a class="btn btn-secondary" href="../../loja/' + cat.slug + '/">Voltar a ' + esc(cat.name.toLowerCase()) + '</a></div></div>' +
    '<div class="disclosure"><strong>Transparência:</strong> Alguns links da loja são afiliados. Como Afiliado da Amazon, o OndeCortar.pt obtém rendimentos com as compras elegíveis feitas através deles, sem custo extra para ti.</div></div></div></section>' +
    '<section class="section"><div class="container"><div class="store-guide-panel"><div class="store-guide-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>Artigos relacionados</h2>' +
    '<p>Leituras sobre o mesmo tema para quem quer perceber mais antes de seguir em frente.</p></div><a class="btn btn-secondary btn-small" href="../../revista/">Ver revista</a></div>' +
    '<div class="store-guide-row">' + guides + '</div></div></div></section>' +
    '<section class="section" id="relacionados"><div class="container"><div class="section-header"><div><span class="eyebrow">Comparar alternativas</span>' +
    '<h2>Outras opções que vale a pena ver</h2><p>Se este produto está perto do que procuras mas ainda não fecha a decisão, estas alternativas ajudam a afinar a escolha.</p></div></div>' +
    '<div class="related-grid">' + related + '</div></div></section></main>';
}

function replaceOnce(html, re, value, label) {
  if (!re.test(html)) throw new Error("Modelo sem bloco esperado: " + label);
  return html.replace(re, () => value);
}

const template = read("produto/" + TEMPLATE_SLUG + "/index.html");

newProducts.forEach((p) => {
  const cats = p.categories.map((slug) => ({ slug, name: categoryName(slug) }));
  const head = pageHead(p, cats);
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<meta property="og:image"[^>]*\/>/, head.meta, "meta");
  html = replaceOnce(html, /<script type="application\/ld\+json"[\s\S]*<\/script>(?=\s*<script defer src="\.\.\/\.\.\/oc-analytics\.js")/, head.ld, "json-ld");
  html = replaceOnce(html, /data-slug="[^"]*"/, 'data-slug="' + p.slug + '"', "data-slug");
  html = replaceOnce(html, /<main>[\s\S]*<\/main>/, pageMain(p, cats), "main");
  html = replaceOnce(html, /<span class="oc-sticky-cta-name">[^<]*<\/span>\s*<a class="btn btn-primary btn-small" href="[^"]*"/,
    '<span class="oc-sticky-cta-name">' + esc(p.name) + '</span>\n    <a class="btn btn-primary btn-small" href="' + hrefFor(p) + '"', "sticky");
  const leftovers = ['data-slug="' + TEMPLATE_SLUG + '"', "/produto/" + TEMPLATE_SLUG + '/" />', "<h1>Wahl Super Taper</h1>", 'oc-sticky-cta-name">Wahl Super Taper'];
  if (p.slug !== TEMPLATE_SLUG && leftovers.some((s) => html.includes(s))) throw new Error(p.slug + ": ficaram restos do modelo");
  fs.mkdirSync(path.join(ROOT, "produto", p.slug), { recursive: true });
  write("produto/" + p.slug + "/index.html", html);
  console.log("página  produto/" + p.slug + "/");
});

// Cartões nos catálogos das categorias (novos no topo da grelha)
const byCategory = {};
newProducts.forEach((p) => p.categories.forEach((c) => (byCategory[c] = byCategory[c] || []).push(p)));
Object.entries(byCategory).forEach(([slug, prods]) => {
  const rel = "loja/" + slug + "/index.html";
  let html = read(rel);
  const start = html.indexOf("<!-- OC-CATEGORY-ALL-START -->");
  const end = html.indexOf("<!-- OC-CATEGORY-ALL-END -->");
  if (start < 0 || end < 0) throw new Error(rel + ": sem markers OC-CATEGORY-ALL");
  let block = html.slice(start, end);
  const fresh = prods.filter((p) => !block.includes("produto/" + p.slug + "/"));
  if (!fresh.length) return;
  block = block.replace('<div class="related-grid">', '<div class="related-grid">' + fresh.map(card).join(""));
  const count = (block.match(/<article class="product-card/g) || []).length;
  block = block.replace(/A seleção completa \(\d+ produtos?\)/, "A seleção completa (" + count + " produtos)");
  write(rel, html.slice(0, start) + block + html.slice(end));
  console.log("catálogo " + rel + " +" + fresh.length + " (" + count + ")");
});

// Sitemap
let sitemap = read("sitemap-loja.xml");
const urls = newProducts.filter((p) => !sitemap.includes("/produto/" + p.slug + "/"))
  .map((p) => "  <url>\n    <loc>https://ondecortar.pt/produto/" + p.slug + "/</loc>\n    <lastmod>" + TODAY + "</lastmod>\n  </url>\n").join("");
if (urls) write("sitemap-loja.xml", sitemap.replace("</urlset>", urls + "</urlset>"));

// Dados (usados pelo build dos perfis e pelos scripts de afiliados)
let data = read("commerce-products-b.js");
const entries = newProducts.filter((p) => !existing.has(p.slug)).map((p) => "    " + JSON.stringify({
  slug: p.slug, name: p.name, image: p.image, alt: p.alt, amazon: "https://www.amazon.es/dp/" + p.asin + "?tag=" + TAG,
  summary: p.summary, useCase: p.useCase, highlight: p.highlight, bestFor: p.bestFor,
  strengths: p.strengths, limits: p.limits, categories: p.categories, articles: p.articles
}).replace(/"(\w+)":/g, "$1: ") + ",\n").join("");
if (entries) {
  const at = data.lastIndexOf("]);");
  write("commerce-products-b.js", data.slice(0, at).replace(/\s*$/, "") + ",\n" + entries.replace(/,\n$/, "\n") + "  " + data.slice(at));
}
console.log("sitemap +" + (urls.match(/<url>/g) || []).length + ", dados +" + (entries.match(/slug:/g) || []).length);
