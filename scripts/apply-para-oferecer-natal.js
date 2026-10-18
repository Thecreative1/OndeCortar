#!/usr/bin/env node
/**
 * loja/para-oferecer/ como página de prendas (época de Natal) — idempotente.
 *
 * Uso: node scripts/apply-para-oferecer-natal.js
 *      node scripts/apply-webp-images.js
 *
 * Reescreve o <head> (title, description, og, CollectionPage, FAQPage) e o conteúdo à volta do
 * catálogo: tudo entre <main> e OC-CATEGORY-ALL-START (hero, destaques, por pessoa, por tipo, guias)
 * e entre OC-CATEGORY-ALL-END e o aviso de afiliado (FAQ e CTA final). O catálogo e o aviso ficam.
 * Produtos (nome, imagem, alt, link Amazon) lidos de commerce-products-a/b.js.
 * Depois do Natal: trocar SEASON (flag, hero e nota) — o title e a description não falam do Natal
 * de propósito, para não mudar a página para o Google duas vezes por ano.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const REL = "loja/para-oferecer/index.html";
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const LINK_ATTRS = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';

const ctx = { window: { OndeCortarCommerce: {} } };
vm.createContext(ctx);
["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(read(f), ctx));
const PRODUCTS = new Map((ctx.window.OndeCortarCommerce.products || []).map((p) => [p.slug, p]));
function product(slug) {
  const p = PRODUCTS.get(slug);
  if (!p) throw new Error("Produto inexistente no catálogo: " + slug);
  if (!fs.existsSync(path.join(ROOT, "produto", slug, "index.html"))) throw new Error("Sem página: produto/" + slug);
  const amazon = String(p.amazon).replace(/&(?!amp;)/g, "&amp;");
  return { slug, name: p.name, image: p.image, alt: p.alt || p.name, amazon: amazon.includes("language=") ? amazon : amazon + "&amp;language=pt_PT" };
}

const TITLE = "Prendas para homem: kits de barba e packs para oferecer | OndeCortar";
const DESCRIPTION = "Prendas para homem que ele vai usar: kits de barba, aparadores, máquinas de barbear e packs de rosto, escolhidos por pessoa — pai, marido, jovem ou amigo secreto.";

const SEASON = {
  flag: "Especial Natal",
  lede: "Prendas de Natal escolhidas pelo que ele vai usar todas as manhãs: kits de barba, aparadores, máquinas de barbear e packs de rosto. Escolhe pela pessoa e vê os detalhes antes de ir à Amazon.es.",
  noteTitle: "Compra a tempo do Natal",
  noteText: "Em dezembro as entregas para Portugal demoram mais. Confirma a data prevista e quem vende na página da Amazon.es antes de encomendar."
};

// Destaques: múltiplo de 4 (grelha de 4 colunas)
const TOP = [
  ["cusmay-kit-barba-11-em-1", "Kit de barba mais completo", "11 peças numa caixa de oferta: champô, óleos, bálsamo e ferramentas"],
  ["oukzon-kit-barba-10-em-1", "Kit com condicionador", "Lavagem, condicionador, óleo e bálsamo com escova, pentes e tesoura"],
  ["king-c-rotina", "Barbear clássico", "Máquina de segurança, pincel, creme e amaciador num só conjunto"],
  ["braun-bt5525-series-5", "Para quem já tem barba", "40 comprimentos em intervalos de 0,5 mm com bloqueio"],
  ["philips-oneblade-360-qp2724", "Barba de poucos dias", "Apara, contorna e rapa com a mesma lâmina; usa-se no duche"],
  ["panasonic-er-gn30", "Prenda pequena e útil", "Aparador de nariz e orelhas, lavável debaixo da torneira"],
  ["loreal-men-expert-power-age-rotina", "Pack de rosto", "Sérum e creme anti-idade com ácido hialurónico numa necessaire"],
  ["nivea-men-pack-neceser", "Pack do dia a dia", "Creme de rosto, creme em lata, after shave e desodorizante"]
];

const PEOPLE = [
  { who: "Para o pai", text: "Uma máquina de barbear nova, do mesmo tipo da que ele usa, e um aparador de nariz e orelhas para juntar.",
    items: ["braun-series5-51-b1000s", "panasonic-er-gn30"], guide: ["../../revista/o-que-oferecer-ao-pai/", "O que oferecer ao pai"] },
  { who: "Para o marido ou o namorado", text: "Se já trata da barba, um aparador melhor; se também apara o corpo, um OneBlade Pro.",
    items: ["braun-bt5525-series-5", "philips-oneblade-pro-360"], guide: ["../../revista/presentes-para-namorado-ideias/", "Presentes para o namorado"] },
  { who: "Para um rapaz de 18 a 25 anos", text: "O primeiro aparador a sério ou um produto de cabelo para o penteado de todos os dias.",
    items: ["philips-oneblade-360-qp2724", "american-crew-matte-clay"], guide: ["../../revista/prendas-de-natal-para-homem/", "Prendas de Natal para homem"] },
  { who: "Para o amigo secreto", text: "Pequeno, útil e que ninguém compra para si. Confirma o preço do dia se há um valor combinado.",
    items: ["proraso-balsamo-barba", "viking-revolution-beard-oil"], guide: ["../../revista/prendas-de-natal-para-homem/#amigo-secreto", "Mais prendas pequenas"] }
];

const TYPES = [
  ["../../loja/kits-de-barba/", "Kits de barba", "Caixas prontas a oferecer"],
  ["../../loja/trimmers-e-shavers/", "Aparadores e máquinas de barbear", "Para a barba de todos os dias"],
  ["../../loja/cuidados-de-rosto/", "Cuidados de rosto", "Packs e cremes para ele"],
  ["../../loja/cremes-e-espumas/", "Barbear clássico", "Cremes, pincéis e rituais"]
];

const GUIDES = [
  ["../../revista/prendas-de-natal-para-homem/", "Prendas de Natal para homem que ele vai mesmo usar", "Ler guia"],
  ["../../revista/o-que-oferecer-ao-pai/", "O que oferecer ao pai: prendas que ele vai mesmo usar", "Ler guia"],
  ["../../revista/melhor-kit-de-barba-para-oferecer/", "Melhor kit de barba para oferecer", "Ler guia"]
];

const FAQ = [
  ["Que prenda oferecer a um homem no Natal?", "Algo que ele use todos os dias: um kit de barba se tem barba e não tem rotina, um aparador ou máquina de barbear melhor do que a que tem, ou um pack de cuidado de rosto."],
  ["É melhor oferecer um kit ou uma máquina?", "Se não sabes o que ele usa, um kit de barba é mais seguro: explica-se sozinho e já vem pronto a oferecer. Se sabes que a máquina dele está velha, uma máquina nova do mesmo tipo é a prenda que mais se nota."],
  ["Que prenda dar ao pai?", "Uma máquina de barbear elétrica nova, do mesmo tipo da que ele usa (rede ou rotativa), e um aparador de nariz e orelhas para juntar."],
  ["O que oferecer no amigo secreto a um homem?", "Algo pequeno e útil, como um bálsamo ou óleo de barba. Se há um valor combinado, confirma o preço do dia na Amazon.es antes de escolher."],
  ["As prendas chegam a tempo do Natal?", "Depende do vendedor e da data da encomenda. Na página do produto da Amazon.es aparece a data de entrega prevista para Portugal; em dezembro, encomenda com margem."],
  ["E se ele não gostar da prenda?", "As devoluções seguem a política da Amazon.es e do vendedor indicada na página do produto. A Amazon costuma alargar o prazo de devolução das compras de Natal; confirma as datas deste ano antes de comprar."]
];

// ── HTML ─────────────────────────────────────────────────────────────
function topCard([slug, tag, line]) {
  const p = product(slug);
  return '<article class="product-card product-card--dense"><a class="oc-card-media-link" href="../../produto/' + slug + '/" tabindex="-1" aria-hidden="true">' +
    '<img src="../../' + esc(p.image) + '" alt="' + esc(p.alt) + '" loading="lazy" /></a><div class="product-copy"><div class="meta-row"><span class="tag">' + esc(tag) + "</span></div>" +
    '<h3 class="product-card-title"><a class="oc-card-title-link" href="../../produto/' + slug + '/">' + esc(p.name) + "</a></h3>" +
    '<p class="product-highlight-line">' + esc(line) + "</p>" +
    '<div class="card-actions"><a class="btn btn-secondary btn-small" href="../../produto/' + slug + '/">Ver produto</a>' +
    '<a class="btn btn-primary btn-small" href="' + p.amazon + '" ' + LINK_ATTRS + ">Ver preço na Amazon.es</a></div></div></article>";
}

function personCard(c) {
  const rows = c.items.map((slug) => {
    const p = product(slug);
    return '<li class="oc-gift-item"><a class="oc-gift-thumb" href="../../produto/' + slug + '/" tabindex="-1" aria-hidden="true"><img src="../../' + esc(p.image) + '" alt="" loading="lazy" /></a>' +
      '<div><a class="oc-gift-name" href="../../produto/' + slug + '/">' + esc(p.name) + "</a>" +
      '<a class="oc-gift-amazon" href="' + p.amazon + '" ' + LINK_ATTRS + ">Ver preço na Amazon.es</a></div></li>";
  }).join("");
  return '<article class="oc-gift-card"><h3>' + esc(c.who) + "</h3><p>" + esc(c.text) + '</p><ul class="oc-gift-list">' + rows + "</ul>" +
    '<a class="oc-gift-guide" href="' + c.guide[0] + '">' + esc(c.guide[1]) + " →</a></article>";
}

function heroMini(slug, text) {
  const p = product(slug);
  return '<a class="shop-mini-card" href="../../produto/' + slug + '/"><img src="../../' + esc(p.image) + '" alt="' + esc(p.alt) + '" loading="lazy" />' +
    "<div><strong>" + esc(p.name) + "</strong><p>" + esc(text) + '</p><span class="tag">Ver produto</span></div></a>';
}

function buildTop() {
  return "<main>" +
    '<section class="section"><div class="container hero-card category-hero-card"><div class="hero-grid"><div class="hero-copy">' +
      '<div class="breadcrumbs"><a href="../../loja/">Loja</a><span>/</span><span>Para oferecer</span></div>' +
      '<span class="section-flag">' + esc(SEASON.flag) + "</span><h1>Prendas para homem que ele vai mesmo usar</h1>" +
      "<p>" + esc(SEASON.lede) + "</p>" +
      '<div class="hero-actions"><a class="btn btn-primary" href="#por-pessoa">Escolher por pessoa</a><a class="btn btn-soft" href="#top-escolhas">Ver as mais fáceis de acertar</a></div></div>' +
      '<div class="hero-side"><div class="shop-mini-grid">' +
        heroMini("cusmay-kit-barba-11-em-1", "Para quem tem barba e ainda não tem rotina: tudo numa caixa de oferta.") +
        heroMini("loreal-men-expert-power-age-rotina", "Para quem começa a cuidar da pele: sérum e creme numa necessaire.") +
      '</div><div class="store-note"><strong>' + esc(SEASON.noteTitle) + "</strong><p>" + esc(SEASON.noteText) + "</p></div></div>" +
    "</div></div></section>" +
    '<section class="section" id="top-escolhas"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">As mais fáceis de acertar</span>' +
      "<h2>Oito prendas que quase nunca falham</h2><p>Coisas que se usam todos os dias e que já vêm prontas a oferecer. Em cada uma, vê para quem é antes de comprar.</p></div></div>" +
      '<div class="product-grid product-grid--dense product-grid--category-top">' + TOP.map(topCard).join("") + "</div></div></section>" +
    '<section class="section" id="por-pessoa"><div class="container"><div class="section-header"><div><span class="eyebrow">Escolhe por pessoa</span>' +
      "<h2>Para quem é a prenda?</h2><p>Duas ideias para cada pessoa e um guia com mais opções.</p></div></div>" +
      '<div class="oc-gift-grid">' + PEOPLE.map(personCard).join("") + "</div></div></section>" +
    '<section class="section"><div class="container"><div class="store-guide-panel"><div class="store-guide-header"><div><span class="eyebrow">Por tipo de prenda</span>' +
      "<h2>Já sabes o que procuras?</h2><p>Cada categoria tem a seleção completa, com o que cada produto faz bem e para quem não é.</p></div></div>" +
      '<div class="store-guide-row">' + TYPES.map(([href, t, s]) => '<a class="store-guide-link" href="' + href + '"><strong>' + esc(t) + "</strong><span>" + esc(s) + "</span></a>").join("") + "</div></div></div></section>" +
    '<section class="section"><div class="container"><div class="store-guide-panel"><div class="store-guide-header"><div><span class="eyebrow">Revista OndeCortar</span>' +
      "<h2>Guias para acertar na prenda</h2><p>Ideias por pessoa, por idade e o que não oferecer.</p></div>" +
      '<a class="btn btn-secondary btn-small" href="../../revista/presentes-e-kits/">Ver mais guias</a></div>' +
      '<div class="store-guide-row">' + GUIDES.map(([href, t, s]) => '<a class="store-guide-link" href="' + href + '"><strong>' + esc(t) + "</strong><span>" + esc(s) + "</span></a>").join("") + "</div></div></div></section>" +
    "\n<!-- OC-CATEGORY-ALL-START -->";
}

function buildBottom() {
  return "<!-- OC-CATEGORY-ALL-END -->" +
    '<section class="section" id="faq-categoria"><div class="container"><div class="faq-list-wrap"><h3>Perguntas frequentes</h3>' +
      FAQ.map(([q, a]) => '<div class="faq-item"><strong>' + esc(q) + "</strong><p>" + esc(a) + "</p></div>").join("") + "</div></div></section>" +
    '<section class="section"><div class="container callout-card"><span class="eyebrow">Outra ideia</span><h2>Na dúvida, oferece um corte</h2>' +
      "<p>Um corte e uma barba numa boa barbearia é uma prenda que quase todos apreciam. Algumas barbearias vendem vales de oferta — pergunta diretamente.</p>" +
      '<div class="hero-actions"><a class="btn btn-primary" href="../../#explorar">Encontrar uma barbearia</a><a class="btn btn-soft" href="../../cidades/">Ver por cidade</a></div></div></section>';
}

// ── Aplicar ──────────────────────────────────────────────────────────
let html = read(REL);
const swap = (re, val, label) => { if (!re.test(html)) throw new Error("Não encontrei " + label); html = html.replace(re, () => val); };

swap(/<title>[^<]*<\/title>/, "<title>" + esc(TITLE) + "</title>", "title");
swap(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + esc(DESCRIPTION) + '" />', "description");
swap(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + esc(TITLE) + '" />', "og:title");
swap(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + esc(DESCRIPTION) + '" />', "og:description");
swap(/<meta property="og:image" content="[^"]*" \/>/, '<meta property="og:image" content="https://ondecortar.pt/' + product("cusmay-kit-barba-11-em-1").image + '" />', "og:image");

const ld = (o) => '<script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(o) + "</script>";
swap(/<script type="application\/ld\+json" data-ondecortar-ld="true">\{"@context":"https:\/\/schema\.org","@type":"CollectionPage"[^<]*<\/script>/,
  ld({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Prendas para homem", description: DESCRIPTION, url: "https://ondecortar.pt/loja/para-oferecer/" }), "CollectionPage");
swap(/<script type="application\/ld\+json" data-ondecortar-ld="true">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[^<]*<\/script>/,
  ld({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }), "FAQPage");

swap(/<main>[\s\S]*?\n?<!-- OC-CATEGORY-ALL-START -->/, buildTop(), "conteúdo antes do catálogo");
swap(/<!-- OC-CATEGORY-ALL-END -->[\s\S]*?(?=<section class="section"><div class="container"><div class="disclosure">)/, buildBottom(), "conteúdo depois do catálogo");
if (!/Como Afiliado da Amazon/.test(html)) throw new Error("Aviso de afiliado desapareceu");

fs.writeFileSync(path.join(ROOT, REL), html, "utf8");
console.log("ok: " + REL + " | destaques " + TOP.length + " | pessoas " + PEOPLE.length + " | faq " + FAQ.length);
