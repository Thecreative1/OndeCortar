#!/usr/bin/env node
/**
 * Gera loja/top-escolhas/index.html ("As nossas principais escolhas") a partir do
 * modelo loja/para-oferecer/ (mesmo cabeçalho, rodapé e commerce.css da loja).
 *
 * Uso: node scripts/build-top-escolhas-page.js && node scripts/apply-webp-images.js
 *
 * Só produtos que a loja já destaca (secções "Mais procurados" e "Em destaque" de
 * loja/index.html). Textos vêm de commerce-products-a/b.js (highlight, strengths,
 * limits) — diferentes dos cartões da /loja/, para não duplicar conteúdo.
 * Sem preços, avaliações nem alegações de teste. Idempotente.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const SLUG = "top-escolhas";
const URL = "https://ondecortar.pt/loja/" + SLUG + "/";
const REVIEWED = "outubro de 2026";

// [slug, melhor utilização, artigo da revista (opcional; senão o 1.º de product.articles)]
const GROUPS = [
  {
    id: "cabelo", title: "Para cortar o cabelo",
    intro: "Máquinas para manter o corte em casa, do primeiro corte ao uso semanal.",
    items: [
      ["philips-hc5630-series-5000", "Melhor para cortar em casa", "melhores-maquinas-para-cortar-cabelo-em-casa"],
      ["remington-colourcut-hc5035", "Melhor para começar", "7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata"],
      ["wahl-rapid-clip", "Melhor sem fios", "melhores-maquinas-para-cortar-cabelo-em-casa"],
      ["braun-series-5-aio5545", "Cabelo, barba e corpo num só aparelho", "trimmer-vs-shaver-diferencas-reais"]
    ]
  },
  {
    id: "barba", title: "Para a barba, o barbear e a manutenção",
    intro: "Aparar, barbear à clássica, começar uma rotina de barba e manter a máquina em bom estado.",
    items: [
      ["philips-oneblade-360-qp2724", "Melhor para a barba", "trimmer-vs-shaver-diferencas-reais"],
      ["king-c-dupla", "Melhor para barbear à clássica", "navalha-classica-ou-maquina-de-seguranca-diferencas-reais"],
      ["viking-sandalwood", "Melhor kit para começar", "melhor-kit-de-barba-para-oferecer"],
      ["shave-factory-clippercare", "Essencial de manutenção", "como-limpar-uma-maquina-de-cortar-cabelo"]
    ]
  }
];

const ctx = { window: { OndeCortarCommerce: {} } };
vm.createContext(ctx);
["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx));
const products = new Map(ctx.window.OndeCortarCommerce.products.map((p) => [p.slug, p]));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cap = (s) => { const t = String(s || "").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
const amazon = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=" + TAG + "&amp;language=pt_PT";
const LINK = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';

function articleTitle(slug) {
  const file = path.join(ROOT, "revista", slug, "index.html");
  if (!fs.existsSync(file)) throw new Error("Artigo inexistente: " + slug);
  return fs.readFileSync(file, "utf8").match(/<h1[^>]*>([^<]+)<\/h1>/)[1].trim();
}

function card([slug, bestUse, article]) {
  const p = products.get(slug);
  if (!p) throw new Error("Produto inexistente: " + slug);
  const asin = p.amazon.match(/\/dp\/([A-Z0-9]{10})/)[1];
  const img = /^https?:/.test(p.image) ? p.image : "../../" + p.image;
  const guide = article || (p.articles || [])[0];
  return '<article class="loja-feat-card oc-top-card">' +
    '<img class="loja-feat-img" src="' + esc(img) + '" alt="' + esc(p.alt) + '" loading="lazy" />' +
    '<div class="loja-feat-body">' +
      '<span class="loja-feat-badge">' + esc(bestUse) + "</span>" +
      '<h3 class="loja-feat-name">' + esc(p.name) + "</h3>" +
      '<p class="loja-feat-why">' + esc(p.highlight) + "</p>" +
      '<div class="oc-top-strengths"><strong>Pontos fortes</strong><ul class="rich-list">' +
        p.strengths.slice(0, 3).map((s) => "<li>" + esc(cap(s)) + "</li>").join("") + "</ul></div>" +
      '<div class="loja-feat-avoid"><strong>Principal limitação</strong> ' + esc(cap(p.limits[0])) + ".</div>" +
      '<div class="loja-feat-actions">' +
        '<a class="btn btn-primary btn-small" href="' + amazon(asin) + '" ' + LINK + ">Ver preço na Amazon.es</a>" +
        '<a class="btn btn-secondary btn-small" href="../../produto/' + slug + '/">Ver análise</a></div>' +
      (guide ? '<a class="oc-top-guide" href="../../revista/' + guide + '/">Ler o guia: ' + esc(articleTitle(guide)) + "</a>" : "") +
    "</div></article>";
}

const title = "As nossas principais escolhas: máquinas, aparadores e barba";
const description = "Os 8 produtos que mais recomendamos no OndeCortar.pt — para cortar o cabelo em casa, tratar da barba e manter a máquina — com pontos fortes, limitações e link para a Amazon.es.";
const all = GROUPS.flatMap((g) => g.items);

const main = "<main>" +
  '<section class="section"><div class="container hero-card category-hero-card"><div class="hero-grid"><div class="hero-copy">' +
  '<div class="breadcrumbs"><a href="../../loja/">Loja</a><span>/</span><span>Principais escolhas</span></div>' +
  '<span class="eyebrow">Seleção revista em ' + REVIEWED + "</span><h1>As nossas principais escolhas</h1>" +
  "<p>Só os produtos que mais recomendamos no site, um por tipo de uso. Cada um com o motivo da escolha, os pontos fortes e a principal limitação, para decidires sem abrir dez separadores.</p>" +
  '<div class="hero-actions"><a class="btn btn-primary" href="#' + GROUPS[0].id + '">Ver as escolhas</a>' +
  '<a class="btn btn-secondary" href="../como-escolhemos/">Como escolhemos</a></div></div>' +
  '<div class="hero-side"><div class="store-note"><strong>Nesta página</strong><ul class="rich-list">' +
  GROUPS.map((g) => '<li><a href="#' + g.id + '">' + esc(g.title) + "</a> (" + g.items.length + ")</li>").join("") +
  "<li>Preço e disponibilidade confirmam-se sempre na Amazon.es.</li></ul></div></div></div></div></section>" +
  GROUPS.map((g, i) => '<section class="section' + (i % 2 === 0 ? ' loja-feat-panel' : '') + '" id="' + g.id + '"><div class="container"><div class="section-header section-header--compact"><div>' +
    '<span class="eyebrow">Principais escolhas</span><h2>' + esc(g.title) + "</h2><p>" + esc(g.intro) + "</p></div></div>" +
    '<div class="loja-feat-grid">' + g.items.map(card).join("") + "</div></div></section>").join("") +
  '<section class="section"><div class="container callout-card article-category-bridge"><span class="eyebrow">Queres comparar mais opções?</span>' +
  "<h2>Vê a seleção completa por categoria</h2>" +
  "<p>Se nenhuma destas encaixa no que precisas, cada categoria da loja tem a seleção completa com o contexto de uso de cada produto.</p>" +
  '<div class="hero-actions"><a class="btn btn-primary" href="../maquinas-de-cortar/#comparar">Comparar máquinas de cortar</a>' +
  '<a class="btn btn-secondary" href="../#categorias">Ver todas as categorias</a></div></div></section>' +
  '<section class="section"><div class="container"><div class="disclosure"><strong>Transparência:</strong> Alguns links desta página são afiliados. Como Afiliado da Amazon, o OndeCortar.pt obtém rendimentos com as compras elegíveis feitas através deles, sem custo extra para ti. Não mostramos preços porque mudam com frequência — confirma-os na Amazon.es. <a href="../como-escolhemos/">Como escolhemos os produtos</a>.</div></div></section>' +
  "</main>";

const itemList = {
  "@context": "https://schema.org", "@type": "ItemList", name: "As nossas principais escolhas",
  itemListElement: all.map(([slug], i) => ({
    "@type": "ListItem", position: i + 1, url: "https://ondecortar.pt/produto/" + slug + "/", name: products.get(slug).name
  }))
};
const crumbs = {
  "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Loja", item: "https://ondecortar.pt/loja/" },
    { "@type": "ListItem", position: 2, name: "Principais escolhas", item: URL }
  ]
};

let html = fs.readFileSync(path.join(ROOT, "loja/para-oferecer/index.html"), "utf8");
const swap = (re, val, label) => { if (!re.test(html)) throw new Error("Modelo sem " + label); html = html.replace(re, () => val); };
swap(/<title>[\s\S]*?<meta property="og:image"[^>]*\/>/,
  "<title>" + esc(title) + " | OndeCortar</title>\n" +
  '  <meta name="description" content="' + esc(description) + '" />\n' +
  '  <link rel="canonical" href="' + URL + '" />\n' +
  '  <link rel="icon" href="../../favicon.ico" type="image/x-icon" />\n' +
  '  <link rel="apple-touch-icon" href="../../apple-touch-icon.png" />\n' +
  '  <meta property="og:title" content="' + esc(title) + '" />\n' +
  '  <meta property="og:description" content="' + esc(description) + '" />\n' +
  '  <meta property="og:url" content="' + URL + '" />\n' +
  '  <meta property="og:type" content="website" />\n' +
  '  <meta property="og:image" content="https://ondecortar.pt/imagens/produtos/philips-hc5630.jpg" />', "meta");
swap(/(<script type="application\/ld\+json"[^>]*>[^<]*<\/script>\s*)+(?=<script defer src="\.\.\/\.\.\/oc-analytics\.js")/,
  '<script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(itemList) + "</script>\n" +
  '  <script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(crumbs) + "</script>\n  ", "json-ld");
swap(/data-page="category" data-slug="[^"]*"/, 'data-page="category" data-slug="' + SLUG + '"', "body");
swap(/<main>[\s\S]*<\/main>/, main, "main");

fs.mkdirSync(path.join(ROOT, "loja", SLUG), { recursive: true });
fs.writeFileSync(path.join(ROOT, "loja", SLUG, "index.html"), html, "utf8");

let sitemap = fs.readFileSync(path.join(ROOT, "sitemap-loja.xml"), "utf8");
if (!sitemap.includes(URL)) {
  sitemap = sitemap.replace("</urlset>", "  <url>\n    <loc>" + URL + "</loc>\n    <lastmod>" + new Date().toISOString().slice(0, 10) + "</lastmod>\n  </url>\n</urlset>");
  fs.writeFileSync(path.join(ROOT, "sitemap-loja.xml"), sitemap, "utf8");
}
console.log("loja/" + SLUG + "/ gerada (" + all.length + " produtos)");
