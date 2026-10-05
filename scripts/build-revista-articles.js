#!/usr/bin/env node
/**
 * Gera artigos novos da revista a partir de um ficheiro de dados e liga-os ao resto do site.
 *
 * Uso: node scripts/build-revista-articles.js scripts/data/artigos-2026-10.js
 *      node scripts/apply-revista-seo.js && node scripts/apply-revista-internal-links.js
 *      node scripts/apply-webp-images.js
 *
 * Modelo: revista/tipos-de-degrade-como-pedir-o-corte-certo/ (cabeçalho, rodapé, nav e CSS iguais).
 * Para cada artigo (idempotente):
 *  - (re)gera revista/{slug}/index.html (meta, Article + BreadcrumbList + FAQPage, conteúdo)
 *  - acrescenta a URL a sitemap-revista.xml
 *  - acrescenta o cartão ao hub revista/index.html (grelha do tema) + ItemList do hub
 *  - acrescenta o artigo à lista "Continuar a ler" da categoria e atualiza "N guias"
 * Nunca substitui conteúdo existente de outras páginas: só insere se ainda não estiver lá.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://ondecortar.pt/";
const TEMPLATE = "revista/tipos-de-degrade-como-pedir-o-corte-certo/index.html";
const TODAY = new Date().toISOString().slice(0, 10);
const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

// Tema do hub onde cada categoria aparece (id do h2 da secção) e rótulo do cartão
const HUB_TOPIC = {
  "maquinas-e-manutencao": { h2: "maquinas-h", label: "Máquinas · Guia prático" },
  "conteudo-pratico": { h2: "maquinas-h", label: "Cabelo · Passo a passo" },
  "cuidados-com-a-barba": { h2: "barba-h", label: "Barba · Passo a passo" },
  "estilo-e-tendencias": { h2: "cultura-h", label: "Cortes · Estilo" }
};

const input = process.argv[2];
if (!input) { console.error("Uso: node scripts/build-revista-articles.js dados.js"); process.exit(1); }
const articles = require(path.resolve(input));

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const write = (rel, text) => fs.writeFileSync(path.join(ROOT, rel), text, "utf8");
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ptDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return d + " de " + MONTHS[m - 1] + " de " + y; };

function categoryName(slug) {
  return read("revista/" + slug + "/index.html").match(/<h1[^>]*>([^<]+)<\/h1>/)[1].trim();
}

// Metadados de um artigo (novo: dos dados; existente: do próprio HTML)
function articleMeta(slug) {
  const fresh = articles.find((a) => a.slug === slug);
  if (fresh) return { slug, h1: fresh.h1, excerpt: fresh.schemaDescription, image: fresh.image, alt: fresh.imageAlt, cat: categoryName(fresh.category) };
  const rel = "revista/" + slug + "/index.html";
  if (!exists(rel)) throw new Error("Artigo relacionado inexistente: " + slug);
  const h = read(rel);
  const ld = JSON.parse(h.match(/<script type="application\/ld\+json"[^>]*>(\{"@context":"https:\/\/schema\.org","@type":\["Article"[\s\S]*?)<\/script>/)[1]);
  const crumbs = JSON.parse(h.match(/<script type="application\/ld\+json"[^>]*>(\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList"[\s\S]*?)<\/script>/)[1]);
  const hero = h.match(/<figure class="article-hero-media">[\s\S]*?<img src="\.\.\/\.\.\/([^"]+)" alt="([^"]*)"/);
  return {
    slug, h1: h.match(/<h1>([^<]+)<\/h1>/)[1].trim(), excerpt: ld.description,
    image: hero ? hero[1] : String(ld.image || "").replace(SITE, ""), alt: hero ? hero[2] : "",
    cat: crumbs.itemListElement[1] ? crumbs.itemListElement[1].name : "Revista"
  };
}

function relatedCard(meta) {
  const href = "../../revista/" + meta.slug + "/";
  return '<article class="article-card"><a class="article-thumb article-thumb--photo" href="' + href + '">' +
    '<img src="../../' + esc(meta.image) + '" alt="' + esc(meta.alt) + '" loading="lazy" /></a>' +
    '<div class="article-copy"><div class="meta-row"><span class="tag">' + esc(meta.cat) + "</span></div>" +
    "<h3>" + esc(meta.h1) + "</h3><p>" + esc(meta.excerpt) + "</p>" +
    '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + href + '">Ler guia</a></div></div></article>';
}

function buildMain(a) {
  const catName = categoryName(a.category);
  const pub = a.published || TODAY;
  const actions = (list, primaryFirst = true) => list.map(([href, label], i) =>
    '<a class="btn ' + (i === 0 && primaryFirst ? "btn-primary" : "btn-secondary") + '" href="' + href + '">' + esc(label) + "</a>").join("");
  return "<main>" +
    '<section class="section"><div class="container hero-card article-header article-header--media"><div class="article-header-copy">' +
      '<div class="breadcrumbs"><a href="../../revista/">Revista</a><span>/</span><a href="../../revista/' + a.category + '/">' + esc(catName) + "</a></div>" +
      '<span class="section-flag">Artigo da Revista</span><h1>' + esc(a.h1) + "</h1>" +
      '<div class="article-meta"><span class="article-author">Por <strong>Equipa OndeCortar.pt</strong></span>' +
        '<span>Publicado em <time datetime="' + pub + '">' + ptDate(pub) + "</time></span><span>Leitura estimada " + a.readMinutes + " min</span></div>" +
      "<p>" + esc(a.lede) + '</p><p class="article-subcopy">' + esc(a.subcopy) + "</p>" +
      '<div class="hero-actions">' + actions(a.heroActions) + "</div></div>" +
      '<figure class="article-hero-media"><img src="../../' + esc(a.image) + '" alt="' + esc(a.imageAlt) + '" loading="eager" fetchpriority="high" /></figure>' +
    "</div></section>" +
    '<section class="section" id="resposta-rapida"><div class="container"><div class="section-header"><div><span class="eyebrow">Resposta rápida</span>' +
      "<h2>O essencial, sem o detalhe todo</h2><p>Se queres uma leitura rápida antes de aprofundar, começa por aqui.</p></div></div>" +
      '<div class="quick-answer-grid">' + a.quick.map(([q, t]) => '<article class="quick-answer-card"><strong>' + esc(q) + "</strong><p>" + esc(t) + "</p></article>").join("") + "</div>" +
    "</div></section>" +
    '<section class="section"><div class="container article-support-grid">' +
      '<article class="callout-card article-support-card"><span class="eyebrow">Resumo prático</span><h3>O essencial deste guia</h3><ul class="rich-list">' +
        a.summary.map((s) => "<li>" + esc(s) + "</li>").join("") + "</ul></article>" +
      '<article class="callout-card article-support-card article-trust-card"><span class="eyebrow">Critério editorial</span><h3>Como revemos este guia</h3><ul class="rich-list">' +
        "<li>Publicado em " + ptDate(pub) + ".</li><li>Leitura estimada: " + a.readMinutes + " min.</li>" +
        "<li>" + esc(a.criteria || "Medidas e características conforme publicadas pelos fabricantes.") + "</li>" +
        "<li>Não recebemos comissões de barbearias — o directório é gratuito e independente.</li></ul></article>" +
      '<article class="callout-card article-support-card"><span class="eyebrow">' + esc(a.sideCard.eyebrow) + "</span><h3>" + esc(a.sideCard.title) + "</h3><p>" + esc(a.sideCard.text) + "</p>" +
        '<div class="card-actions">' + a.sideCard.actions.map(([href, label], i) =>
          '<a class="btn ' + (i === 0 ? "btn-primary" : "btn-soft") + ' btn-small" href="' + href + '">' + esc(label) + "</a>").join("") + "</div></article>" +
    "</div></section>" +
    '<section class="section"><div class="container article-body">' +
      a.sections.map((s) => '<article class="article-section"' + (s.id ? ' id="' + s.id + '"' : "") + "><h2>" + esc(s.h2) + "</h2>" + s.html + "</article>").join("") +
    "</div></section>" +
    '<section class="section" id="faq-artigo"><div class="container"><div class="faq-list-wrap"><h3>Perguntas frequentes</h3>' +
      a.faq.map(([q, t]) => '<div class="faq-item"><strong>' + esc(q) + "</strong><p>" + esc(t) + "</p></div>").join("") +
      '<p class="faq-store-cta">' + a.faqCta + "</p></div></div></section>" +
    '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>Artigos relacionados</h2>' +
      "<p>Se ainda há um ângulo por explorar, estas leituras cobrem o mesmo tema de forma diferente.</p></div></div>" +
      '<div class="article-grid">' + a.related.map((slug) => relatedCard(articleMeta(slug))).join("") + "</div></div></section>" +
    '<section class="section"><div class="container callout-card article-final-cta"><span class="eyebrow">Continuar</span><h2>' + esc(a.finalCta.h2) + "</h2>" +
      "<p>" + esc(a.finalCta.text) + '</p><div class="hero-actions">' + actions(a.finalCta.actions) + "</div></div></section>" +
    "</main>";
}

function buildPage(a) {
  const url = SITE + "revista/" + a.slug + "/";
  const pub = a.published || TODAY;
  const img = SITE + a.image;
  const catName = categoryName(a.category);
  const fullTitle = a.title + " | Revista OndeCortar";
  const article = {
    "@context": "https://schema.org", "@type": ["Article", "BlogPosting"], headline: a.h1, description: a.schemaDescription,
    image: img, mainEntityOfPage: url, datePublished: pub, dateModified: TODAY,
    author: { "@type": "Organization", name: "OndeCortar.pt", url: SITE },
    publisher: { "@type": "Organization", name: "OndeCortar.pt", url: SITE, logo: { "@type": "ImageObject", url: SITE + "imagens/logo-ondecortar-round.png" } }
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Revista", item: SITE + "revista/" },
    { "@type": "ListItem", position: 2, name: catName, item: SITE + "revista/" + a.category + "/" },
    { "@type": "ListItem", position: 3, name: a.h1, item: url }
  ] };
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(([q, t]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: t } })) };

  let html = read(TEMPLATE);
  const swap = (re, val, label) => { if (!re.test(html)) throw new Error("Modelo sem " + label); html = html.replace(re, () => val); };
  swap(/<title>[^<]*<\/title>/, "<title>" + esc(fullTitle) + "</title>", "title");
  swap(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + esc(a.description) + '" />', "description");
  swap(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="' + url + '" />', "canonical");
  swap(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + esc(fullTitle) + '" />', "og:title");
  swap(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + esc(a.description) + '" />', "og:description");
  swap(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="' + url + '" />', "og:url");
  swap(/<meta property="og:image" content="[^"]*" \/>/, '<meta property="og:image" content="' + img + '" />', "og:image");
  swap(/<meta property="article:published_time" content="[^"]*" \/>/, '<meta property="article:published_time" content="' + pub + '" />', "published_time");
  swap(/<meta property="article:modified_time" content="[^"]*" \/>/, '<meta property="article:modified_time" content="' + TODAY + '" />', "modified_time");
  swap(/(<script type="application\/ld\+json"[^>]*>[^<]*<\/script>\s*)+(?=<script defer src="\.\.\/\.\.\/oc-analytics\.js")/,
    [article, crumbs, faq].map((o) => '<script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(o) + "</script>").join("\n  ") + "\n  ", "json-ld");
  swap(/data-slug="[^"]*"/, 'data-slug="' + a.slug + '"', "data-slug");
  swap(/<main>[\s\S]*<\/main>/, buildMain(a), "main");
  const leftovers = ["tipos-de-degrade-como-pedir-o-corte-certo/\" />", "<h1>Tipos de degradê"];
  if (leftovers.some((s) => html.includes(s))) throw new Error(a.slug + ": ficaram restos do modelo");
  fs.mkdirSync(path.join(ROOT, "revista", a.slug), { recursive: true });
  write("revista/" + a.slug + "/index.html", html);
}

// ── Ligações ────────────────────────────────────────────────────────
function linkSitemap(a) {
  const url = SITE + "revista/" + a.slug + "/";
  let s = read("sitemap-revista.xml");
  if (s.includes("<loc>" + url + "</loc>")) return false;
  s = s.replace("</urlset>", "  <url>\n    <loc>" + url + "</loc>\n    <lastmod>" + TODAY + "</lastmod>\n  </url>\n</urlset>");
  write("sitemap-revista.xml", s);
  return true;
}

function linkHub(a) {
  let h = read("revista/index.html");
  const href = "../revista/" + a.slug + "/";
  let changed = false;
  const topic = HUB_TOPIC[a.category];
  if (topic && !h.includes('class="rev-read-link" href="' + href + '"')) {
    const at = h.indexOf('id="' + topic.h2 + '"');
    const grid = at === -1 ? -1 : h.indexOf('<div class="rev-grid">', at);
    if (grid === -1) throw new Error("Hub: grelha do tema " + topic.h2 + " não encontrada");
    const insertAt = grid + '<div class="rev-grid">'.length;
    const card = "\n\n            <article class=\"rev-article-card\">\n" +
      '              <a class="rev-article-thumb rev-article-thumb--photo" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="../' + esc(a.image) + '" alt="' + esc(a.imageAlt) + '" loading="lazy" />\n' +
      "              </a>\n              <div class=\"rev-article-body\">\n" +
      '                <span class="rev-article-cat">' + esc(topic.label) + "</span>\n" +
      '                <h3 class="rev-article-title"><a href="' + href + '" style="color:inherit;text-decoration:none">' + esc(a.h1) + "</a></h3>\n" +
      '                <p class="rev-article-excerpt">' + esc(a.schemaDescription) + "</p>\n" +
      '                <div class="rev-article-footer">\n                  <a class="rev-read-link" href="' + href + '">Ler guia</a>\n                </div>\n' +
      "              </div>\n            </article>";
    h = h.slice(0, insertAt) + card + h.slice(insertAt);
    changed = true;
  }
  // ItemList do hub
  const ldRe = /(<script type="application\/ld\+json">)(\{"@context":"https:\/\/schema\.org","@type":"ItemList"[\s\S]*?)(<\/script>)/;
  const m = h.match(ldRe);
  if (m) {
    const list = JSON.parse(m[2]);
    const url = SITE + "revista/" + a.slug + "/";
    if (!list.itemListElement.some((i) => i.url === url)) {
      list.itemListElement.push({ "@type": "ListItem", position: list.itemListElement.length + 1, url, name: a.h1 });
      h = h.replace(ldRe, (x, o, j, c) => o + JSON.stringify(list) + c);
      changed = true;
    }
  }
  if (changed) write("revista/index.html", h);
  return changed;
}

function linkCategory(a) {
  const rel = "revista/" + a.category + "/index.html";
  let h = read(rel);
  const href = "../../revista/" + a.slug + "/";
  if (h.includes('<a href="' + href + '">')) return false;
  const list = '<div class="magazine-story-list">';
  if (!h.includes(list)) throw new Error(rel + ": lista 'Continuar a ler' não encontrada");
  const item = '<article class="magazine-story-item"><div class="meta-row"><span class="tag">' + esc(categoryName(a.category)) + "</span></div>" +
    '<h3><a href="' + href + '">' + esc(a.h1) + "</a></h3><p>" + esc(a.schemaDescription) + "</p>" +
    '<div class="inline-actions"><a class="magazine-story-link" href="' + href + '">Ler guia</a></div></article>';
  h = h.replace(list, list + item);
  h = h.replace(/<li>(\d+) guias( para perceber o tema com clareza\.)<\/li>/, (x, n, rest) => "<li>" + (Number(n) + 1) + " guias" + rest + "</li>");
  write(rel, h);
  return true;
}

for (const a of articles) buildPage(a);
for (const a of articles) {
  const s = linkSitemap(a), hub = linkHub(a), cat = linkCategory(a);
  console.log(a.slug + " | página ok | sitemap " + (s ? "+" : "=") + " | hub " + (hub ? "+" : "=") + " | categoria " + (cat ? "+" : "="));
}
