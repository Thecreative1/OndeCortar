/**
 * apply-revista-conversion.js — blocos de decisão na revista e ponte loja → revista.
 *
 * Idempotente (cada bloco tem markers próprios e é substituído se já existir):
 *  1. OC-ARTICLE-COMPARE — tabela compacta "Melhor para | Produto | Destaque | Ação"
 *     perto do início dos guias de compra SEM o bloco "Escolhe em 30 segundos".
 *     Usa os mesmos produtos dos cartões "Opções por tipo de uso" do artigo
 *     (rótulo do cartão → "Melhor para"; strengths[0] → "Destaque").
 *  2. OC-SINGLE-PICK — "Se tivéssemos de escolher apenas um", só onde o próprio
 *     artigo já indica uma preferência (texto do motivo citado do artigo).
 *  3. OC-LOJA-GUIAS — painel "Guias para escolher" em loja/index.html.
 *
 * Não inventa preços, testes nem avaliações; links Amazon com a tag e rel atuais.
 * Uso: node scripts/apply-revista-conversion.js && node scripts/apply-webp-images.js
 * (o segundo volta a pôr as imagens .webp nos blocos regenerados)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const LINK_ATTRS = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';
const ANCHOR = '<section class="section"><div class="container article-support-grid">';

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cap = (s) => { const t = String(s || "").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const write = (rel, text) => fs.writeFileSync(path.join(ROOT, rel), text, "utf8");

function loadProducts() {
  const ctx = { window: { OndeCortarCommerce: {} } };
  vm.createContext(ctx);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(read(f), ctx));
  return new Map(ctx.window.OndeCortarCommerce.products.map((p) => [p.slug, p]));
}
const products = loadProducts();
const amazonHref = (p) => {
  const asin = (p.amazon.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
  return "https://www.amazon.es/dp/" + asin + "?tag=" + TAG + "&amp;language=pt_PT";
};

// ── 1. Tabelas compactas ────────────────────────────────────────────
const COMPARE_ARTICLES = [
  "melhor-kit-de-barba-para-oferecer",
  "aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais",
  "escova-de-barba-ou-pente-qual-usar-no-dia-a-dia",
  "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo",
  "7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata"
];

function inlineCards(html) {
  return [...html.matchAll(/<article class="shop-mini-card article-inline-card">([\s\S]*?)<\/article>/g)].map((m) => ({
    label: (m[1].match(/<span class="tag">([^<]*)<\/span>/) || [])[1],
    slug: (m[1].match(/produto\/([a-z0-9-]+)\//) || [])[1]
  })).filter((c) => c.label && products.has(c.slug));
}

function compareBlock(cards) {
  const rows = cards.map(({ label, slug }) => {
    const p = products.get(slug);
    return "<tr>" +
      '<td data-label="Melhor para">' + label + "</td>" +
      '<th scope="row"><a class="oc-compare-product" href="../../produto/' + slug + '/">' +
        '<img src="../../' + esc(p.image) + '" alt="" width="48" height="48" loading="lazy" /><span>' + esc(p.name) + "</span></a></th>" +
      '<td data-label="Destaque">' + esc(cap(p.strengths[0])) + "</td>" +
      '<td class="oc-compare-cta"><a class="btn btn-primary btn-small" href="' + amazonHref(p) + '" ' + LINK_ATTRS + ">Ver preço na Amazon</a></td>" +
      "</tr>";
  }).join("");
  return "<!-- OC-ARTICLE-COMPARE-START -->" +
    '<section class="section oc-compare oc-article-compare" id="comparar-opcoes"><div class="container">' +
    '<div class="section-header section-header--compact"><div><span class="eyebrow">Comparação rápida</span>' +
    "<h2>As opções deste guia, lado a lado</h2>" +
    "<p>Os mesmos produtos que analisamos mais abaixo, resumidos. Preço e disponibilidade confirmam-se na Amazon.es.</p></div></div>" +
    '<div class="oc-compare-wrap"><table class="oc-compare-table"><thead><tr>' +
    '<th scope="col">Melhor para</th><th scope="col">Produto</th><th scope="col">Destaque</th><th scope="col"><span class="sr-only">Ação</span></th>' +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
    "</div></section><!-- OC-ARTICLE-COMPARE-END -->";
}

// ── 2. "Se tivéssemos de escolher apenas um" ───────────────────────
// `why` resume o que o próprio artigo já diz (ver "Resposta rápida" de cada um).
const SINGLE_PICKS = {
  "melhores-maquinas-para-cortar-cabelo-em-casa": {
    slug: "philips-hc5630-series-5000",
    why: "É a escolha mais segura para a maioria das pessoas que vai cortar em casa: 28 comprimentos numa roda de ajuste, lâminas autoafiáveis e até 90 minutos sem fio."
  },
  "navalha-classica-ou-maquina-de-seguranca-diferencas-reais": {
    slug: "king-c-dupla",
    why: "Para quem está a entrar no barbear clássico, a máquina de segurança é mais previsível e mais fácil de repetir do que a navalha. Esta junta construção em metal sólido e compatibilidade com lâminas de duplo gume standard."
  },
  "trimmer-vs-shaver-diferencas-reais": {
    slug: "braun-series-5-aio5545",
    why: "Se queres manter a barba e tratar do resto com um só aparelho e um só orçamento, um multifunções de qualidade compensa mais do que dois aparelhos medianos. Este cobre cabelo, barba e corpo."
  }
};

function pickBlock({ slug, why }) {
  const p = products.get(slug);
  if (!p) throw new Error("Produto inexistente: " + slug);
  return "<!-- OC-SINGLE-PICK-START -->" +
    '<section class="section oc-single-pick" id="se-so-um"><div class="container">' +
    '<div class="callout-card oc-single-pick-card">' +
    '<img class="oc-single-pick-img" src="../../' + esc(p.image) + '" alt="' + esc(p.alt) + '" loading="lazy" />' +
    '<div class="oc-single-pick-copy"><span class="eyebrow">Se tivéssemos de escolher apenas um</span>' +
    "<h2>" + esc(p.name) + "</h2><p>" + esc(why) + "</p>" +
    '<p class="oc-single-pick-note">Escolha editorial com base neste guia e nas características publicadas pelo fabricante.</p>' +
    '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + amazonHref(p) + '" ' + LINK_ATTRS + ">Ver preço na Amazon.es</a>" +
    '<a class="btn btn-secondary btn-small" href="../../produto/' + slug + '/">Ver detalhes</a></div></div>' +
    "</div></div></section><!-- OC-SINGLE-PICK-END -->";
}

function upsert(html, start, end, block, insertBefore) {
  const re = new RegExp("<!-- " + start + " -->[\\s\\S]*?<!-- " + end + " -->");
  if (re.test(html)) return html.replace(re, () => block);
  if (!html.includes(insertBefore)) return null;
  return html.replace(insertBefore, () => block + insertBefore);
}

const report = [];

for (const slug of COMPARE_ARTICLES) {
  const rel = "revista/" + slug + "/index.html";
  let html = read(rel);
  if (html.includes("OC-DECISION-TABLE-START")) { report.push("SALTADO (tem decisão) " + slug); continue; }
  const cards = inlineCards(html);
  if (cards.length < 2) { report.push("SALTADO (sem cartões) " + slug); continue; }
  const next = upsert(html, "OC-ARTICLE-COMPARE-START", "OC-ARTICLE-COMPARE-END", compareBlock(cards), ANCHOR);
  if (!next) { report.push("SEM ÂNCORA " + slug); continue; }
  if (next !== html) write(rel, next);
  report.push("tabela " + slug + " (" + cards.length + ")");
}

for (const [slug, pick] of Object.entries(SINGLE_PICKS)) {
  const rel = "revista/" + slug + "/index.html";
  const html = read(rel);
  // Logo a seguir à "Resposta rápida" (antes do bloco de decisão, se existir)
  const before = html.includes("<!-- OC-DECISION-TABLE-START -->") ? "<!-- OC-DECISION-TABLE-START -->" : ANCHOR;
  const next = upsert(html, "OC-SINGLE-PICK-START", "OC-SINGLE-PICK-END", pickBlock(pick), before);
  if (!next) { report.push("SEM ÂNCORA " + slug); continue; }
  if (next !== html) write(rel, next);
  report.push("escolha " + slug + " → " + pick.slug);
}

// ── 3. Loja → Revista ──────────────────────────────────────────────
const GUIDES = [
  "melhores-maquinas-para-cortar-cabelo-em-casa",
  "trimmer-vs-shaver-diferencas-reais",
  "melhor-kit-de-barba-para-oferecer",
  "como-limpar-uma-maquina-de-cortar-cabelo"
];
{
  const rel = "loja/index.html";
  const html = read(rel);
  const links = GUIDES.map((g) => {
    const title = read("revista/" + g + "/index.html").match(/<h1[^>]*>([^<]+)<\/h1>/)[1].trim();
    return '<a class="store-guide-link" href="../revista/' + g + '/"><strong>' + esc(title) + "</strong><span>Ler guia</span></a>";
  }).join("");
  const block = "<!-- OC-LOJA-GUIAS-START -->" +
    '<section class="section" id="guias"><div class="container"><div class="store-guide-panel"><div class="store-guide-header"><div>' +
    '<span class="eyebrow">Revista OndeCortar</span><h2>Antes de comprar, lê o guia</h2>' +
    "<p>Comparações e explicações curtas para perceber o que precisas antes de abrir a Amazon.</p></div>" +
    '<a class="btn btn-secondary btn-small" href="../revista/">Ver revista</a></div>' +
    '<div class="store-guide-row">' + links + "</div></div></div></section>" +
    "<!-- OC-LOJA-GUIAS-END -->";
  const next = upsert(html, "OC-LOJA-GUIAS-START", "OC-LOJA-GUIAS-END", block, "<!-- ── 6. TRANSPARÊNCIA");
  if (!next) throw new Error("loja/index.html: âncora da transparência não encontrada");
  if (next !== html) write(rel, next);
  report.push("guias loja/index.html (" + GUIDES.length + ")");
}

console.log(report.join("\n"));
