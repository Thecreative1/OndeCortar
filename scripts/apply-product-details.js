#!/usr/bin/env node
/**
 * Idempotente — enriquece páginas de produto com dados verificados (2026-10-11).
 *
 * Uso: node scripts/apply-product-details.js scripts/data/detalhes-produtos-*.js [mais ficheiros]
 *      (sem argumentos: aplica todos os scripts/data/detalhes-produtos-*.js)
 *
 * Cada entrada { slug, title, description, porque[], paraQuem?, ficha[[rótulo, valor]], fonte,
 * versao?, comoUsar[], faq[[pergunta, resposta]] } faz, em produto/{slug}/index.html:
 *  - <title>, meta description, og:title/og:description e a description do JSON-LD Product;
 *  - "Porque recomendamos" (ao lado da foto) passa a ter o texto completo (porque[]);
 *  - "Para quem é" deixa de repetir a frase do topo (paraQuem, se existir);
 *  - secção nova entre o cabeçalho e "Para quem é" (markers OC-PRODUCT-DETAILS-START/END):
 *    ficha rápida, "Qual versão é esta", como usar e perguntas frequentes;
 *  - JSON-LD FAQPage com as mesmas perguntas (script data-oc-faq="product").
 * Links: {{slug|texto}} em porque/paraQuem/versao/comoUsar vira link para produto/{slug}/
 *   (nas FAQ fica só o texto, para a página e o schema dizerem o mesmo).
 * Regras: só factos publicados pela marca (Amazon.es); sem preços, avaliações nem "testámos".
 * add-store-products.js regenera as páginas sem isto → correr este script depois dele.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://ondecortar.pt/";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let files = process.argv.slice(2);
if (!files.length) {
  const dir = path.join(ROOT, "scripts", "data");
  files = fs.readdirSync(dir).filter((f) => /^detalhes-produtos-.*\.js$/.test(f)).map((f) => path.join(dir, f));
}
const entries = files.flatMap((f) => require(path.resolve(f)));

// {{slug|texto}} → link para outro produto da seleção (falha se a página não existir)
const LINK_RE = /\{\{([a-z0-9-]+)\|([^}]+)\}\}/g;
function rich(text) {
  return esc(text).replace(LINK_RE, (m, slug, label) => {
    if (!fs.existsSync(path.join(ROOT, "produto", slug, "index.html"))) throw new Error("Link para produto inexistente: " + slug);
    return '<a href="../../produto/' + slug + '/">' + label + "</a>";
  });
}
const plain = (text) => String(text).replace(LINK_RE, "$2");

function swap(html, re, value, label, slug) {
  if (!re.test(html)) throw new Error(slug + ": não encontrei " + label);
  return html.replace(re, () => value);
}

function detailsSection(d) {
  const ficha = '<table class="oc-pd-table"><tbody>' +
    d.ficha.map(([k, v]) => "<tr><th scope=\"row\">" + esc(k) + "</th><td>" + esc(v) + "</td></tr>").join("") +
    "</tbody></table>" +
    '<p class="oc-pd-note">' + esc(d.fonte) + "</p>";
  const versao = d.versao ? "<h2>Qual versão é esta</h2><p>" + rich(d.versao) + "</p>" : "";
  const uso = "<h2>Como usar</h2><ol class=\"rich-list\">" + d.comoUsar.map((s) => "<li>" + rich(s) + "</li>").join("") + "</ol>";
  const faq = '<div class="faq-list-wrap oc-pd-faq"><h3>Perguntas frequentes</h3>' +
    d.faq.map(([q, a]) => '<div class="faq-item"><strong>' + esc(plain(q)) + "</strong><p>" + esc(plain(a)) + "</p></div>").join("") + "</div>";
  return "<!-- OC-PRODUCT-DETAILS-START -->" +
    '<section class="section oc-product-details" id="detalhes"><div class="container">' +
    '<div class="oc-pd-grid"><div class="oc-pd-col"><h2>Ficha rápida</h2>' + ficha + "</div>" +
    '<div class="oc-pd-col">' + versao + uso + "</div></div>" + faq +
    "</div></section><!-- OC-PRODUCT-DETAILS-END -->";
}

const stats = { updated: 0, unchanged: 0 };
for (const d of entries) {
  const rel = "produto/" + d.slug + "/index.html";
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) throw new Error("Página inexistente: " + rel);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  if (LINK_RE.test(d.title + d.description)) throw new Error(d.slug + ": marcação de link no título/description");
  LINK_RE.lastIndex = 0;
  if (d.description.length > 160) throw new Error(d.slug + ": description com " + d.description.length + " caracteres (máx. 160)");

  const title = d.title + " | OndeCortar";
  html = swap(html, /<title>[^<]*<\/title>/, "<title>" + esc(title) + "</title>", "title", d.slug);
  html = swap(html, /<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + esc(d.description) + '" />', "description", d.slug);
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + esc(title) + '" />', "og:title", d.slug);
  html = swap(html, /<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + esc(d.description) + '" />', "og:description", d.slug);

  // JSON-LD Product (já não existe desde 2026-10-16; só atualiza páginas antigas que o tenham)
  html = html.replace(/(<script type="application\/ld\+json"[^>]*>)(\{"@context":"https:\/\/schema\.org","@type":"Product"[\s\S]*?)(<\/script>)/, (m, o, json, c) => {
    const ld = JSON.parse(json);
    ld.description = d.description;
    return o + JSON.stringify(ld) + c;
  });

  // JSON-LD FAQPage (mesmas perguntas da página)
  const faqLd = '<script type="application/ld+json" data-oc-faq="product">' + JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: d.faq.map(([q, a]) => ({ "@type": "Question", name: plain(q), acceptedAnswer: { "@type": "Answer", text: plain(a) } }))
  }) + "</script>";
  if (html.includes('data-oc-faq="product"')) {
    html = html.replace(/<script type="application\/ld\+json" data-oc-faq="product">[\s\S]*?<\/script>/, () => faqLd);
  } else {
    html = swap(html, /(\s*)<script defer src="\.\.\/\.\.\/oc-analytics\.js"><\/script>/, "\n  " + faqLd + "\n  <script defer src=\"../../oc-analytics.js\"></script>", "oc-analytics", d.slug);
  }

  // "Porque recomendamos" ao lado da foto
  const porque = d.porque.map((p) => "<p>" + rich(p) + "</p>").join("");
  html = swap(html, /<div class="store-note"><strong>Porque recomendamos<\/strong>[\s\S]*?<\/div>/, '<div class="store-note"><strong>Porque recomendamos</strong>' + porque + "</div>", "Porque recomendamos", d.slug);

  // "Para quem é" sem repetir a frase do topo
  if (d.paraQuem) {
    html = swap(html, /<div class="product-highlight"><h3>Para quem é<\/h3><p>[\s\S]*?<\/p>/, '<div class="product-highlight"><h3>Para quem é</h3><p>' + rich(d.paraQuem) + "</p>", "Para quem é", d.slug);
  }

  // Secção de detalhes
  const section = detailsSection(d);
  if (html.includes("OC-PRODUCT-DETAILS-START")) {
    html = html.replace(/<!-- OC-PRODUCT-DETAILS-START -->[\s\S]*?<!-- OC-PRODUCT-DETAILS-END -->/, () => section);
  } else {
    html = swap(html, /<section class="section"><div class="container split-grid">/, section + '<section class="section"><div class="container split-grid">', "split-grid", d.slug);
  }

  if (html === before) { stats.unchanged++; continue; }
  fs.writeFileSync(file, html, "utf8");
  stats.updated++;
}
console.log(JSON.stringify({ ...stats, total: entries.length }));
