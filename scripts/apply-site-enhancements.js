/**
 * apply-site-enhancements.js — alterações idempotentes às páginas manuais
 * (loja/, produto/, revista/ e páginas de raiz).
 *
 * ⚠️ Este script NÃO substitui conteúdo existente (lição do sync destrutivo):
 * cada passo insere por âncora/marcador e verifica primeiro se já foi aplicado.
 * Pode correr-se as vezes que forem precisas.
 *
 * Passos:
 *  1. inject-analytics — <script defer src="{root}oc-analytics.js"> antes de </head>
 *  2. strip-offers     — remove o bloco "offers" do JSON-LD Product (sem preço
 *                        verificado via PA-API, o Offer é inválido para a Google)
 *  3. sticky-cta       — barra fixa mobile nas páginas de produto (marker OC-STICKY-CTA)
 *  4. category-all     — secção "Todas as opções desta categoria" nas categorias
 *                        da loja (markers OC-CATEGORY-ALL-START/END)
 *  5. fix-cat-counts   — contagens reais de produtos nos cards de loja/index.html
 *  6. swap-cat-thumbs  — thumbnails de CATEGORIA em loja/index.html passam a
 *                        imagens locais (não mexe em imagens de produtos concretos)
 *  7. footer-sobre     — link "Sobre" no footer das páginas comerciais
 *  8. decision-tables  — bloco "Escolhe em 30 segundos" nos guias de compra
 *                        (markers OC-DECISION-TABLE-START/END)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function write(file, contents) {
  fs.writeFileSync(path.join(ROOT, file), contents, "utf8");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function walkHtml(dir) {
  const results = [];
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return results;
  fs.readdirSync(abs, { withFileTypes: true }).forEach((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkHtml(rel));
    } else if (entry.name.endsWith(".html")) {
      results.push(rel.split(path.sep).join("/"));
    }
  });
  return results;
}

function loadProducts() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => {
    vm.runInContext(read(file), context, { filename: file });
  });
  return context.window.OndeCortarCommerce.products || [];
}

function rootPrefixFor(file) {
  const match = read(file).match(/data-root="([^"]*)"/);
  if (match) return match[1];
  const depth = file.split("/").length - 1;
  return "../".repeat(depth);
}

// ── 1. Analytics em todas as páginas manuais ─────────────────────
function injectAnalytics(file, stats) {
  let html = read(file);
  if (html.includes("oc-analytics.js")) return;
  if (!html.includes("</head>")) return;
  const root = rootPrefixFor(file);
  html = html.replace("</head>", '  <script defer src="' + root + 'oc-analytics.js"></script>\n</head>');
  write(file, html);
  stats.analytics += 1;
}

// ── 2. Remover "offers" do JSON-LD Product ───────────────────────
function stripOffers(file, stats) {
  let html = read(file);
  let changed = false;
  html = html.replace(/(<script type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (full, open, body, close) => {
    try {
      const data = JSON.parse(body.trim());
      if (data && data["@type"] === "Product" && data.offers) {
        delete data.offers;
        changed = true;
        return open + JSON.stringify(data) + close;
      }
    } catch (error) { /* JSON não parseável — não tocar */ }
    return full;
  });
  if (changed) {
    write(file, html);
    stats.offers += 1;
  }
}

// ── 3. Sticky CTA mobile nas páginas de produto ──────────────────
function injectStickyCta(file, stats) {
  let html = read(file);
  if (html.includes("OC-STICKY-CTA")) return;
  if (!/data-page="product"/.test(html)) return;
  const nameMatch = html.match(/<h1>([^<]+)<\/h1>/);
  const hrefMatch = html.match(/href="(https:\/\/www\.amazon\.es[^"]+)"/);
  if (!nameMatch || !hrefMatch) return;
  const block =
    "\n  <!-- OC-STICKY-CTA -->\n" +
    '  <div class="oc-sticky-cta" id="ocStickyCta" hidden>\n' +
    '    <span class="oc-sticky-cta-name">' + escapeHtml(nameMatch[1]) + "</span>\n" +
    '    <a class="btn btn-primary btn-small" href="' + hrefMatch[1] + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a>\n' +
    "  </div>\n" +
    "  <script>(function(){var bar=document.getElementById(\"ocStickyCta\");if(!bar)return;var mq=window.matchMedia(\"(max-width: 760px)\");function sync(){bar.hidden=!(mq.matches&&window.scrollY>window.innerHeight*0.6);}window.addEventListener(\"scroll\",sync,{passive:true});window.addEventListener(\"resize\",sync);sync();})();</script>\n";
  html = html.replace("</body>", block + "</body>");
  write(file, html);
  stats.sticky += 1;
}

// ── 4. "Todas as opções desta categoria" ─────────────────────────
function categoryCard(product, root) {
  const localImage = /^imagens\//.test(product.image || "");
  const image = localImage
    ? '<img src="' + root + escapeHtml(product.image) + '" alt="' + escapeHtml(product.alt || product.name) + '" loading="lazy" />'
    : "";
  const amazon = String(product.amazon || "");
  const amazonHref = amazon + (amazon.includes("language=pt_PT") ? "" : "&language=pt_PT");
  const highlight = (product.strengths && product.strengths[0]) || product.summary || "";
  return (
    '<article class="product-card product-card--dense">' +
      image +
      '<div class="product-copy">' +
        '<div class="meta-row"><span class="tag">' + escapeHtml(product.bestFor || "Recomendação") + "</span></div>" +
        '<h3 class="product-card-title">' + escapeHtml(product.name) + "</h3>" +
        '<p class="product-highlight-line">' + escapeHtml(highlight) + "</p>" +
        '<div class="card-actions">' +
          '<a class="btn btn-secondary btn-small" href="' + root + "produto/" + escapeHtml(product.slug) + '/">Ver produto</a>' +
          '<a class="btn btn-primary btn-small" href="' + escapeHtml(amazonHref).replace(/&amp;amp;/g, "&amp;") + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço na Amazon.es</a>' +
        "</div>" +
      "</div>" +
    "</article>"
  );
}

function injectCategoryAll(file, products, stats) {
  let html = read(file);
  const slugMatch = html.match(/data-page="category" data-slug="([a-z0-9-]+)"/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  const root = rootPrefixFor(file);
  const inCategory = products.filter((product) => Array.isArray(product.categories) && product.categories.includes(slug));
  if (!inCategory.length) return;

  const section =
    "<!-- OC-CATEGORY-ALL-START -->" +
    '<section class="section oc-category-all" id="todas-as-opcoes"><div class="container">' +
      '<div class="section-header"><div><span class="eyebrow">Catálogo completo</span>' +
      "<h2>Todas as opções desta categoria</h2>" +
      "<p>A seleção completa (" + inCategory.length + " produtos), cada um com o seu contexto de uso. Preço e disponibilidade confirmam-se na Amazon.es.</p></div></div>" +
      '<div class="related-grid">' + inCategory.map((product) => categoryCard(product, root)).join("") + "</div>" +
    "</div></section>" +
    "<!-- OC-CATEGORY-ALL-END -->";

  if (html.includes("OC-CATEGORY-ALL-START")) {
    html = html.replace(/<!-- OC-CATEGORY-ALL-START -->[\s\S]*?<!-- OC-CATEGORY-ALL-END -->/, section);
  } else {
    const anchor = '<section class="section" id="faq-categoria"';
    if (html.includes(anchor)) {
      html = html.replace(anchor, section + anchor);
    } else {
      html = html.replace("</main>", section + "</main>");
    }
  }
  write(file, html);
  stats.categoryAll += 1;
}

// ── 5. Contagens reais nos cards de loja/index.html ──────────────
function fixCategoryCounts(products, stats) {
  const file = "loja/index.html";
  let html = read(file);
  const counts = {};
  products.forEach((product) => {
    (product.categories || []).forEach((category) => {
      counts[category] = (counts[category] || 0) + 1;
    });
  });
  let changed = false;
  html = html.replace(/(<article class="loja-cat-card">[\s\S]*?<\/article>)/g, (card) => {
    const hrefMatch = card.match(/href="\.\.\/loja\/([a-z0-9-]+)\/"/);
    if (!hrefMatch || !(hrefMatch[1] in counts)) return card;
    const real = counts[hrefMatch[1]];
    const updated = card.replace(/<span class="loja-cat-count">\d+ produtos?<\/span>/,
      '<span class="loja-cat-count">' + real + (real === 1 ? " produto" : " produtos") + "</span>");
    if (updated !== card) changed = true;
    return updated;
  });
  if (changed) {
    write(file, html);
    stats.counts = 1;
  }
}

// ── 6. Thumbnails de categoria com imagens locais ────────────────
const CATEGORY_THUMB_SWAPS = [
  {
    from: /<img class="loja-cat-thumb" src="https:\/\/m\.media-amazon\.com[^"]*" alt="Wahl Color Pro[^"]*"/,
    to: '<img class="loja-cat-thumb" src="../imagens/produtos/WahlSuperTaper.jpg" alt="Máquina Wahl Super Taper Profissional"'
  },
  {
    from: /<img class="loja-cat-thumb" src="https:\/\/m\.media-amazon\.com[^"]*" alt="Philips OneBlade[^"]*"/,
    to: '<img class="loja-cat-thumb" src="../imagens/produtos/philips-bt5515.jpg" alt="Aparador Philips BT5515 para barba"'
  },
  {
    from: /<img class="loja-cat-thumb" src="https:\/\/m\.media-amazon\.com[^"]*" alt="Viking Revolution Beard Grooming Kit[^"]*"/,
    to: '<img class="loja-cat-thumb" src="../imagens/produtos/viking-barba-kit.jpg" alt="Kit Viking Revolution para cuidado da barba"'
  },
  {
    from: /<img class="loja-cat-thumb" src="https:\/\/m\.media-amazon\.com[^"]*" alt="Wahl Clipper Oil[^"]*"/,
    to: '<img class="loja-cat-thumb" src="../imagens/produtos/beardburys-spray.jpg" alt="Spray Beardburys 5 em 1 para limpeza e manutenção de máquinas"'
  },
  {
    from: /<img class="loja-cat-thumb" src="https:\/\/m\.media-amazon\.com[^"]*" alt="Viking Revolution Beard Oil[^"]*"/,
    to: '<img class="loja-cat-thumb" src="../imagens/produtos/VikingRevolution.jpg" alt="Kit Viking Revolution com óleo de barba"'
  }
];

function swapCategoryThumbs(stats) {
  const file = "loja/index.html";
  let html = read(file);
  let swapped = 0;
  CATEGORY_THUMB_SWAPS.forEach((swap) => {
    if (swap.from.test(html)) {
      html = html.replace(swap.from, swap.to);
      swapped += 1;
    }
  });
  if (swapped) {
    write(file, html);
    stats.thumbs = swapped;
  }
}

// ── 7. Link "Sobre" no footer das páginas comerciais ─────────────
function injectFooterSobre(file, stats) {
  let html = read(file);
  const root = rootPrefixFor(file);
  const sobreLink = '<a href="' + root + 'sobre/">Sobre</a>';
  if (html.includes(sobreLink)) return;
  const footerStart = html.indexOf("<footer");
  if (footerStart === -1) return;
  const faqLink = '<a href="' + root + 'faq.html">FAQ</a>';
  const faqInFooter = html.indexOf(faqLink, footerStart);
  if (faqInFooter === -1) return;
  html = html.slice(0, faqInFooter) + sobreLink + html.slice(faqInFooter);
  write(file, html);
  stats.footer += 1;
}

// ── 8. "Escolhe em 30 segundos" nos guias de compra ──────────────
// Rótulos por tipo de utilização (nunca por preço — os preços confirmam-se
// na Amazon). Produtos = os mesmos que o artigo já recomenda.
const DECISION_TABLES = {
  "melhores-maquinas-para-cortar-cabelo-em-casa": [
    ["hatteker-completa", "Opção essencial"],
    ["braun-series-5-aio5545", "Escolha equilibrada"],
    ["wahl-super-taper", "Uso intensivo"]
  ],
  "como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa": [
    ["hatteker-completa", "Opção essencial"],
    ["braun-series-5-aio5545", "Escolha equilibrada"],
    ["wahl-super-taper", "Uso intensivo"]
  ],
  "trimmer-vs-shaver-diferencas-reais": [
    ["solati-aparador", "Retoques pontuais"],
    ["philips-bt3238", "Barba regular"],
    ["braun-series-5-aio5545", "Tudo num só aparelho"]
  ],
  "melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas": [
    ["kit-xikezan", "Base mais completa"],
    ["viking-sandalwood", "Qualidade de produto"],
    ["king-c-rotina", "Barbear clássico"]
  ],
  "creme-espuma-ou-gel-de-barbear-qual-escolher": [
    ["gillette-labs-gel", "Rotina rápida"],
    ["proraso-creme", "Barbear clássico"],
    ["proraso-pre-barba", "Preparação anti-irritação"]
  ],
  "navalha-classica-ou-maquina-de-seguranca-diferencas-reais": [
    ["king-c-dupla", "Começar no clássico"],
    ["asipro-navalha", "Navalha tradicional"],
    ["derby-premium", "Lâminas de reposição"]
  ]
};

function decisionColumn(product, tierLabel, root) {
  const amazon = String(product.amazon || "");
  const amazonHref = amazon + (amazon.includes("language=pt_PT") ? "" : "&language=pt_PT");
  return (
    '<article class="oc-decision-col">' +
      '<span class="tag">' + escapeHtml(tierLabel) + "</span>" +
      "<h3>" + escapeHtml(product.name) + "</h3>" +
      "<dl>" +
        "<div><dt>Para quem é</dt><dd>" + escapeHtml(product.summary || "") + "</dd></div>" +
        "<div><dt>Ponto forte</dt><dd>" + escapeHtml((product.strengths && product.strengths[0]) || "") + "</dd></div>" +
        "<div><dt>Menos indicado</dt><dd>" + escapeHtml((product.limits && product.limits[0]) || "") + "</dd></div>" +
      "</dl>" +
      '<div class="card-actions">' +
        '<a class="btn btn-primary btn-small" href="' + escapeHtml(amazonHref) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Confirmar preço na Amazon.es</a>' +
        '<a class="btn btn-secondary btn-small" href="' + root + "produto/" + escapeHtml(product.slug) + '/">Ver detalhes</a>' +
      "</div>" +
    "</article>"
  );
}

function injectDecisionTable(file, products, stats) {
  let html = read(file);
  const slugMatch = html.match(/data-page="article" data-slug="([a-z0-9-]+)"/);
  if (!slugMatch || !DECISION_TABLES[slugMatch[1]]) return;
  const root = rootPrefixFor(file);
  const productMap = new Map(products.map((product) => [product.slug, product]));
  const columns = DECISION_TABLES[slugMatch[1]]
    .map(([slug, label]) => {
      const product = productMap.get(slug);
      return product ? decisionColumn(product, label, root) : "";
    })
    .filter(Boolean);
  if (columns.length < 2) return;

  const section =
    "<!-- OC-DECISION-TABLE-START -->" +
    '<section class="section oc-decision-table" id="escolhe-em-30-segundos"><div class="container">' +
      '<div class="section-header section-header--compact"><div><span class="eyebrow">Escolhe em 30 segundos</span>' +
      "<h2>Três opções, três perfis</h2>" +
      "<p>Comparação editorial, com base nas características e no tipo de utilização de cada opção. Preço e disponibilidade confirmam-se na Amazon.es.</p></div></div>" +
      '<div class="oc-decision-grid">' + columns.join("") + "</div>" +
    "</div></section>" +
    "<!-- OC-DECISION-TABLE-END -->";

  if (html.includes("OC-DECISION-TABLE-START")) {
    html = html.replace(/<!-- OC-DECISION-TABLE-START -->[\s\S]*?<!-- OC-DECISION-TABLE-END -->/, section);
  } else {
    const anchor = '<section class="section"><div class="container article-support-grid">';
    if (html.includes(anchor)) {
      html = html.replace(anchor, section + anchor);
    } else {
      const fallback = '<section class="section"><div class="container article-body">';
      if (!html.includes(fallback)) return;
      html = html.replace(fallback, section + fallback);
    }
  }
  write(file, html);
  stats.decisionTables += 1;
}

// ── main ─────────────────────────────────────────────────────────
function main() {
  const products = loadProducts();
  const stats = { analytics: 0, offers: 0, sticky: 0, categoryAll: 0, counts: 0, thumbs: 0, footer: 0, decisionTables: 0 };

  const commercePages = [...walkHtml("loja"), ...walkHtml("produto"), ...walkHtml("revista")];
  const rootPages = ["faq.html", "registar.html", "privacidade.html", "obrigado.html", "404.html"]
    .filter((file) => fs.existsSync(path.join(ROOT, file)));

  [...commercePages, ...rootPages].forEach((file) => injectAnalytics(file, stats));
  walkHtml("produto").forEach((file) => {
    stripOffers(file, stats);
    injectStickyCta(file, stats);
  });
  walkHtml("loja").forEach((file) => injectCategoryAll(file, products, stats));
  walkHtml("revista").forEach((file) => injectDecisionTable(file, products, stats));
  fixCategoryCounts(products, stats);
  swapCategoryThumbs(stats);
  commercePages.forEach((file) => injectFooterSobre(file, stats));

  console.log(JSON.stringify(stats, null, 2));
}

main();
