#!/usr/bin/env node
/**
 * Gera loja/black-friday/index.html (página sazonal) a partir do modelo loja/para-oferecer/.
 * Uso: node scripts/build-black-friday-page.js
 * Para o ano seguinte: atualizar EVENT (datas confirmadas pela Amazon) e as listas WATCH.
 * Sem preços nem descontos inventados: só a seleção e links para a Amazon.es.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TAG = "ondecortar27-21";
const SLUG = "black-friday";
const URL = "https://ondecortar.pt/loja/" + SLUG + "/";

const EVENT = {
  year: 2026,
  blackFriday: "sexta-feira, 27 de novembro de 2026",
  cyberMonday: "segunda-feira, 30 de novembro de 2026",
  // Fonte: aboutamazon.es — Semana de Black Friday 2025 de 20/11 a 1/12
  previous: "Em 2025, a Semana de Black Friday da Amazon.es durou de 20 de novembro a 1 de dezembro."
};

const WATCH = [
  {
    id: "maquinas", title: "Máquinas de cortar cabelo", intro: "As máquinas que recomendamos para cortar em casa — boas candidatas a esperar pela Black Friday se não tens pressa.",
    items: [
      ["philips-hc5630-series-5000", "Melhor para cortar em casa", "28 comprimentos numa roda, lâminas autoafiáveis e 90 minutos sem fio."],
      ["remington-hc5811-genius", "Kit completo", "Lâminas de cerâmica, 10 pentes até 40 mm e mala de alumínio com capa e tesoura."],
      ["wahl-rapid-clip", "Melhor sem fios", "Até 120 minutos de bateria e 10 pentes de 3 a 28 mm."],
      ["babylisspro-chromfx-clipper", "Profissional e fades", "Lâmina de aço japonês de 45 mm, até 2 horas sem fio e base de carga."]
    ]
  },
  {
    id: "barba", title: "Barba e aparadores", intro: "Aparadores e multifunções para a rotina da barba — os mais procurados como prenda.",
    items: [
      ["philips-oneblade-360-qp2724", "Melhor para a barba", "Apara, faz contornos e barbeia com a lâmina 360. À prova de água."],
      ["braun-aio7545-series-7", "Tudo em um topo de gama", "12 em 1 para barba, cabelo e corpo, com até 120 minutos de bateria."],
      ["philips-mg3930-series-3000", "Tudo em um económico", "7 acessórios para barba, cabelo, nariz e orelhas, com carga USB."],
      ["remington-mb320c", "Aparador simples", "Lâminas de cerâmica e 9 comprimentos de 1,5 a 18 mm, com ou sem fio."]
    ]
  },
  {
    id: "prendas", title: "Kits e prendas", intro: "Conjuntos fáceis de oferecer, para quem começa ou quer renovar a rotina de barba.",
    items: [
      ["viking-sandalwood", "Kit de barba", "Champô, condicionador, óleo, bálsamo e pente, com aroma a sândalo e boa apresentação."],
      ["king-c-rotina", "Rotina clássica", "Kit King C. Gillette com máquina, pincel, creme e amaciador."],
      ["proraso-creme", "Barbear clássico", "Creme de barbear italiano, um clássico de barbearia."],
      ["braun-series-5-aio5545", "Cabelo, barba e corpo", "Um só aparelho com acessórios para cabeça, barba e corpo."]
    ]
  }
];

const TIPS = [
  ["Decide antes de começar", "Escolhe já o modelo que queres. Durante a Black Friday há centenas de ofertas e é fácil acabar a comprar o que não precisas."],
  ["Confirma o preço dos últimos meses", "Um desconto só é real se o preço estiver abaixo do habitual. Ferramentas de histórico de preços ajudam a ver se a subida antes do desconto foi artificial."],
  ["Confirma o modelo exato", "Marcas como Philips e Braun têm versões com nomes quase iguais e acessórios diferentes. Compara o número de modelo (ex.: HC5630/15) antes de comprar."],
  ["Vê quem vende e envia", "Prefere artigos vendidos ou enviados pela Amazon: a devolução e a garantia são mais simples."]
];

const ctx = { window: { OndeCortarCommerce: {} } };
vm.createContext(ctx);
["commerce-products-a.js", "commerce-products-b.js"].forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx));
const products = new Map(ctx.window.OndeCortarCommerce.products.map((p) => [p.slug, p]));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const amazon = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=" + TAG + "&amp;language=pt_PT";
const LINK = 'target="_blank" rel="sponsored nofollow noopener noreferrer"';

function card([slug, badge, why]) {
  const p = products.get(slug);
  if (!p) throw new Error("Produto inexistente: " + slug);
  const asin = p.amazon.match(/\/dp\/([A-Z0-9]{10})/)[1];
  const img = /^https?:/.test(p.image) ? p.image : "../../" + p.image;
  return '<article class="loja-feat-card"><a class="oc-card-media-link" href="../../produto/' + slug + '/" tabindex="-1" aria-hidden="true"><img class="loja-feat-img" src="' + esc(img) + '" alt="' + esc(p.alt) + '" loading="lazy" /></a>' +
    '<div class="loja-feat-body"><span class="loja-feat-badge">' + esc(badge) + '</span><h3 class="loja-feat-name"><a class="oc-card-title-link" href="../../produto/' + slug + '/">' + esc(p.name) + '</a></h3>' +
    '<p class="loja-feat-why">' + esc(why) + '</p><div class="loja-feat-actions">' +
    '<a class="btn btn-primary btn-small" href="' + amazon(asin) + '" ' + LINK + '>Ver preço na Amazon.es</a>' +
    '<a class="btn btn-secondary btn-small" href="../../produto/' + slug + '/">Ver detalhes</a></div></div></article>';
}

const title = "Black Friday " + EVENT.year + ": máquinas, aparadores e kits de barba a vigiar";
const description = "A nossa lista para a Black Friday " + EVENT.year + " na Amazon.es: máquinas de cortar cabelo, aparadores de barba e kits para oferecer, com dicas para confirmar se o desconto é real.";
const bfUrl = "https://www.amazon.es/blackfriday?tag=" + TAG;

const main = '<main>' +
  '<section class="section"><div class="container hero-card category-hero-card"><div class="hero-grid"><div class="hero-copy">' +
  '<div class="breadcrumbs"><a href="../../loja/">Loja</a><span>/</span><span>Black Friday ' + EVENT.year + '</span></div>' +
  '<span class="eyebrow">Black Friday ' + EVENT.year + '</span><h1>Black Friday ' + EVENT.year + ' para cabelo e barba</h1>' +
  '<p>Uma lista curta do que vale a pena vigiar na Amazon.es — os mesmos produtos que recomendamos o ano todo, para comprares com calma quando o preço baixar.</p>' +
  '<div class="hero-actions"><a class="btn btn-primary" href="#' + WATCH[0].id + '">Ver a lista</a>' +
  '<a class="btn btn-secondary" href="' + bfUrl + '" ' + LINK + '>Ofertas na Amazon.es</a></div></div>' +
  '<div class="hero-side"><div class="store-note"><strong>Datas a apontar</strong><ul class="rich-list">' +
  '<li>Black Friday: ' + esc(EVENT.blackFriday) + '</li><li>Cyber Monday: ' + esc(EVENT.cyberMonday) + '</li>' +
  '<li>' + esc(EVENT.previous) + ' Confirma as datas deste ano na Amazon.es.</li></ul></div></div></div></div></section>' +
  WATCH.map((g, i) => '<section class="section' + (i % 2 === 0 ? ' loja-feat-panel' : '') + '" id="' + g.id + '"><div class="container"><div class="section-header section-header--compact"><div>' +
    '<span class="eyebrow">A vigiar</span><h2>' + esc(g.title) + '</h2><p>' + esc(g.intro) + '</p></div></div>' +
    '<div class="loja-feat-grid">' + g.items.map(card).join("") + '</div></div></section>').join("") +
  '<section class="section" id="dicas"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Antes de comprar</span>' +
  '<h2>Como saber se o desconto é mesmo bom</h2></div></div><div class="quick-answer-grid">' +
  TIPS.map(([t, d]) => '<article class="quick-answer-card"><strong>' + esc(t) + '</strong><p>' + esc(d) + '</p></article>').join("") + '</div></div></section>' +
  '<section class="section"><div class="container callout-card article-category-bridge"><span class="eyebrow">Ainda a decidir?</span><h2>Compara antes de a Black Friday começar</h2>' +
  '<p>Se ainda não sabes que máquina escolher, a tabela comparativa e o guia das 8 melhores ajudam a decidir já — assim só tens de esperar pelo preço.</p>' +
  '<div class="hero-actions"><a class="btn btn-primary" href="../maquinas-de-cortar/#comparar">Comparar as máquinas</a>' +
  '<a class="btn btn-secondary" href="../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/#melhores-maquinas">Ver as 8 melhores</a></div></div></section>' +
  '<section class="section"><div class="container"><div class="disclosure"><strong>Transparência:</strong> Alguns links desta página são afiliados. Como Afiliado da Amazon, o OndeCortar.pt obtém rendimentos com as compras elegíveis feitas através deles, sem custo extra para ti. Não mostramos preços porque mudam várias vezes por dia — confirma-os sempre na Amazon.es.</div></div></section>' +
  '</main>';

const itemList = {
  "@context": "https://schema.org", "@type": "ItemList", name: title,
  itemListElement: WATCH.flatMap((g) => g.items.map((i) => i[0])).map((slug, i) => ({
    "@type": "ListItem", position: i + 1, url: "https://ondecortar.pt/produto/" + slug + "/", name: products.get(slug).name
  }))
};
const crumbs = {
  "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Loja", item: "https://ondecortar.pt/loja/" },
    { "@type": "ListItem", position: 2, name: "Black Friday " + EVENT.year, item: URL }
  ]
};

let html = fs.readFileSync(path.join(ROOT, "loja/para-oferecer/index.html"), "utf8");
const swap = (re, val, label) => { if (!re.test(html)) throw new Error("Modelo sem " + label); html = html.replace(re, () => val); };
swap(/<title>[\s\S]*?<meta property="og:image"[^>]*\/>/,
  '<title>' + esc(title) + ' | OndeCortar</title>\n' +
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
  '<script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(itemList) + '</script>\n' +
  '  <script type="application/ld+json" data-ondecortar-ld="true">' + JSON.stringify(crumbs) + '</script>\n  ', "json-ld");
swap(/data-page="category" data-slug="[^"]*"/, 'data-page="category" data-slug="' + SLUG + '"', "body");
swap(/<main>[\s\S]*<\/main>/, main, "main");

fs.mkdirSync(path.join(ROOT, "loja", SLUG), { recursive: true });
fs.writeFileSync(path.join(ROOT, "loja", SLUG, "index.html"), html, "utf8");

let sitemap = fs.readFileSync(path.join(ROOT, "sitemap-loja.xml"), "utf8");
if (!sitemap.includes(URL)) {
  sitemap = sitemap.replace("</urlset>", "  <url>\n    <loc>" + URL + "</loc>\n    <lastmod>" + new Date().toISOString().slice(0, 10) + "</lastmod>\n  </url>\n</urlset>");
  fs.writeFileSync(path.join(ROOT, "sitemap-loja.xml"), sitemap, "utf8");
}
console.log("loja/" + SLUG + "/ gerada (" + WATCH.reduce((n, g) => n + g.items.length, 0) + " produtos)");
