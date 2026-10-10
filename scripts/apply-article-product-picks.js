/**
 * apply-article-product-picks.js — idempotente.
 *
 *  1. article-picks — bloco "Da nossa seleção" (2–4 produtos com foto, "Ver preço na
 *     Amazon.es" e "Ver detalhes") nos artigos práticos da revista que só ligavam a
 *     categorias da loja. Inserido logo a seguir à "Resposta rápida", antes do
 *     article-support-grid (markers OC-ARTICLE-PICKS-START/END).
 *  2. article-sticky — barra fixa mobile "Ver na Amazon.es" em guias de compra
 *     (marker OC-ARTICLE-STICKY), visível depois de passar a lista de escolhas.
 *
 * Nome, link Amazon e imagem vêm da página do produto publicada (produto/{slug}/),
 * que é a fonte verificada — não do catálogo commerce-products-*.js, que pode estar
 * desatualizado. As notas de cada produto só repetem factos que estão na página do
 * produto. Só toca nos artigos listados abaixo; não corre outros passos.
 *
 *   node scripts/apply-article-product-picks.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const write = (file, contents) => fs.writeFileSync(path.join(ROOT, file), contents, "utf8");
const exists = (file) => fs.existsSync(path.join(ROOT, file));

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// [slug do produto, etiqueta, nota]
const PICKS = {
  "como-cortar-o-cabelo-em-casa-com-maquina": {
    title: "O que usar para cortar em casa",
    items: [
      ["philips-hc5630-series-5000", "Melhor no geral", "28 comprimentos (0,5–28 mm) numa roda: desces meio número sem trocar de pente."],
      ["remington-colourcut-hc5035", "Para o primeiro corte", "9 pentes coloridos de 1,5 a 25 mm, para não confundir o 2 com o 3."],
      ["ecence-capa-corte", "Capa", "Impermeável e fácil de limpar depois de cada corte."],
      ["wahl-clipper-oil", "Manutenção", "Óleo para lubrificar a lâmina no fim, como no último passo deste guia."]
    ]
  },
  "numeros-da-maquina-de-cortar-cabelo": {
    title: "Máquinas com os milímetros marcados",
    items: [
      ["philips-hc5630-series-5000", "Roda de ajuste", "28 comprimentos entre 0,5 e 28 mm, marcados na própria máquina."],
      ["remington-colourcut-hc5035", "Pentes coloridos", "9 pentes de 1,5 a 25 mm, cada um com a sua cor."],
      ["wahl-rapid-clip", "Sem fios", "10 pentes de 3 a 28 mm e até 120 minutos sem fio."]
    ]
  },
  "buzz-cut-corte-militar-que-numero-pedir": {
    title: "Para manter o buzz cut em casa",
    items: [
      ["philips-hc5630-series-5000", "Melhor no geral", "Do 0,5 aos 28 mm na mesma roda: serve o buzz cut curto e o mais comprido."],
      ["wahl-rapid-clip", "Sem fios", "Até 120 minutos sem fio e 10 pentes de 3 a 28 mm."],
      ["remington-hc5811-genius", "Kit completo", "Lâminas de cerâmica autoafiáveis, com fio ou bateria."]
    ]
  },
  "como-aparar-a-barba-em-casa": {
    title: "O que usar para aparar a barba",
    items: [
      ["philips-bt3238", "Para começar", "20 posições de comprimento para acertar a barba aos poucos."],
      ["braun-bt5525-series-5", "Mais afinação", "40 comprimentos em intervalos de 0,5 mm, com bloqueio."],
      ["philips-oneblade-360-qp2724", "Contornos", "Lâmina 360 que acompanha o contorno do rosto no pescoço e no bigode."],
      ["viking-revolution-beard-oil", "Acabamento", "Óleo com argão e jojoba para o passo final."]
    ]
  },
  "oleo-de-barba-para-que-serve": {
    title: "Óleo ou bálsamo: por onde começar",
    items: [
      ["viking-revolution-beard-oil", "Óleo", "Mistura de argão e jojoba para suavizar a barba no dia a dia."],
      // american-crew-beard-balm não: o ASIN é um sérum/óleo, não um bálsamo (visto 2026-10-09)
      ["honest-amish-beard-balm", "Bálsamo", "Leave-in pensado para conforto e controlo, quando a barba já é média ou comprida."],
      ["zilberhaar-escova", "Pentear", "Cerdas de javali que distribuem o óleo ou o bálsamo de forma uniforme."]
    ]
  },
  "caspa-na-barba-o-que-fazer": {
    title: "Para a rotina de hidratar e escovar",
    items: [
      ["viking-revolution-beard-oil", "Hidratar", "Óleo com argão e jojoba, para o passo de hidratar desta rotina."],
      ["honest-amish-beard-balm", "Bálsamo", "Leave-in para conforto e controlo, quando a barba já é média."],
      ["zilberhaar-escova", "Escovar", "Cerdas de javali que distribuem o óleo ou o bálsamo de forma uniforme."]
    ]
  },
  "barba-falhada-o-que-fazer": {
    title: "Para aparar sem mostrar as falhas",
    items: [
      ["braun-bt5525-series-5", "Muitos comprimentos", "40 comprimentos em intervalos de 0,5 mm para encontrar a altura certa."],
      ["philips-bt3238", "Mais simples", "20 posições de comprimento para manter a barba alinhada."],
      ["viking-revolution-beard-oil", "Óleo", "Para a secura das primeiras semanas. Não faz crescer barba."]
    ]
  },
  "como-aparar-as-sobrancelhas-homem": {
    title: "Aparadores para detalhes do rosto",
    items: [
      ["braun-aio7545-series-7", "Cabeça de precisão", "12 em 1, com cabeça de precisão para linhas."],
      ["solati-aparador", "Pequeno e leve", "Formato leve e preciso para contornos e acabamentos."]
    ]
  },
  "aparador-de-pelos-do-nariz-qual-escolher": {
    title: "Os três que recomendamos",
    items: [
      ["panasonic-er-gn30", "A nossa escolha", "Dedicado ao nariz e às orelhas: lâmina curva de fio duplo, lava-se debaixo da torneira."],
      ["philips-mg3930-series-3000", "Tudo num só", "7 acessórios para barba, cabelo, nariz e orelhas, para quem ainda não tem aparador."],
      ["cecotec-bamba-precisioncare-pro-5em1", "À prova de água", "5 em 1 para cabelo, barba, nariz/orelhas e corpo, à prova de água (IPX7)."]
    ]
  },
  "como-cortar-cabelo-masculino-com-tesoura-em-casa": {
    title: "O que precisas para cortar à tesoura",
    items: [
      ["candure-tesoura-cabeleireiro", "A tesoura", "6,5 polegadas em aço inoxidável, fio convexo e anéis ajustáveis aos dedos."],
      ["grifema-pulverizador-agua", "O pulverizador", "Névoa fina para manter o cabelo húmido enquanto cortas, sem o encharcar."],
      ["charlemagne-pente", "O pente", "Carbono antiestático e leve, para a tesoura sobre o pente."],
      ["ecence-capa-corte", "A capa", "Impermeável e fácil de limpar depois de cada corte."]
    ]
  },
  "aparador-corporal-masculino-qual-escolher": {
    title: "Os três que recomendamos",
    items: [
      ["philips-bodygroom-bg3480", "A nossa escolha", "Só para o corpo: Triple Protect, pentes de 2 e 3 mm e 100% à prova de água."],
      ["philips-oneblade-pro-360", "Rosto e corpo", "Uma só ferramenta para aparar, contornar e manter rosto e corpo."],
      ["braun-series-5-aio5545", "Tudo em um", "Cabelo, barba e corpo com o mesmo aparelho, trocando de cabeça."]
    ]
  },
  "borrifador-para-barbearia-qual-escolher": {
    title: "Para o posto de trabalho",
    items: [
      ["grifema-pulverizador-300ml", "A nossa escolha", "Névoa contínua, uso a 360° e bocal de 0,3 mm, em 300 ml para o dia todo."],
      ["grifema-pulverizador-agua", "Compacto", "200 ml com névoa fina, para levar ou para cortes ao domicílio."],
      ["barbicide-desinfetante-pulverizador", "Desinfeção", "O pulverizador do desinfetante, separado do da água."],
      ["uraqt-capa", "Capa", "Para proteger o cliente durante o corte e manter o serviço limpo."]
    ]
  },
  "pelos-nas-orelhas-porque-crescem-e-como-tirar": {
    title: "O que usar nas orelhas",
    items: [
      ["panasonic-er-gn30", "A nossa escolha", "Nariz e orelhas com a mesma cabeça: lâmina protegida de fio duplo, lavável."],
      ["philips-mg3930-series-3000", "Tudo num só", "7 acessórios para barba, cabelo, nariz e orelhas, para quem ainda não tem aparador."],
      ["braun-aio7545-series-7", "Kit completo", "12 em 1 para barba, cabelo, orelhas, nariz e corpo."]
    ]
  },
  "presentes-para-namorado-ideias": {
    title: "Os presentes por perfil",
    items: [
      ["viking-revolution-beard-grooming-kit", "Barba sem rotina", "Escova, pente, bálsamo, óleo e tesoura numa caixa de apresentação."],
      ["braun-bt5525-series-5", "Barba já tratada", "40 comprimentos em intervalos de 0,5 mm com bloqueio, 100% à prova de água."],
      ["philips-hc5630-series-5000", "Corta o cabelo em casa", "28 comprimentos numa roda, lâminas autoafiáveis e 90 minutos sem fio."],
      ["king-c-rotina", "Gosta de rituais", "Máquina de segurança, pincel, creme e amaciador num conjunto clássico."],
      ["braun-aio7545-series-7", "Prático", "12 em 1 para barba, cabelo, orelhas, nariz e corpo."],
      ["panasonic-er-gn30", "Presente pequeno", "Aparador de nariz e orelhas com lâmina protegida e lavável."]
    ]
  },
  "after-shave-para-que-serve": {
    title: "Preparar a pele antes da lâmina",
    items: [
      ["proraso-pre-barba", "Pré-barba", "Para pele sensível: amolece os pelos antes do barbear."],
      ["proraso-creme", "Creme de barbear", "Boa cobertura e deslize para navalha ou máquina de segurança."]
    ]
  }
};

// Barra fixa mobile nos guias de compra: produto + id da secção depois da qual aparece
const STICKY = {
  "melhores-maquinas-para-cortar-cabelo-em-casa": {
    product: "philips-hc5630-series-5000",
    label: "Melhor no geral",
    after: "melhores-maquinas"
  },
  "como-cortar-cabelo-masculino-com-tesoura-em-casa": {
    product: "candure-tesoura-cabeleireiro",
    label: "A tesoura que recomendamos",
    after: "produtos-recomendados"
  },
  "presentes-para-namorado-ideias": {
    product: "viking-revolution-beard-grooming-kit",
    label: "O presente mais fácil",
    after: "produtos-recomendados"
  },
  "pelos-nas-orelhas-porque-crescem-e-como-tirar": {
    product: "panasonic-er-gn30",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "borrifador-para-barbearia-qual-escolher": {
    product: "grifema-pulverizador-300ml",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "aparador-corporal-masculino-qual-escolher": {
    product: "philips-bodygroom-bg3480",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "aparador-de-pelos-do-nariz-qual-escolher": {
    product: "panasonic-er-gn30",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  }
};

const productCache = new Map();
function loadProduct(slug) {
  if (productCache.has(slug)) return productCache.get(slug);
  const file = "produto/" + slug + "/index.html";
  if (!exists(file)) throw new Error("Sem página de produto: " + file);
  const html = read(file);
  const name = (html.match(/<h1>([^<]+)<\/h1>/) || [])[1];
  const amazon = (html.match(/href="(https:\/\/www\.amazon\.es\/[^"]+)"/) || [])[1];
  const img = html.match(/<img src="\.\.\/\.\.\/(imagens\/produtos\/[^"]+)" alt="([^"]*)"/);
  if (!name || !amazon || !img) throw new Error("Dados incompletos em " + file);
  const product = { slug, name, amazon, image: img[1], alt: img[2], text: html.replace(/<[^>]+>/g, " ") };
  productCache.set(slug, product);
  return product;
}

function pictureHtml(product, root) {
  const webp = product.image.replace(/\.jpe?g$/i, ".webp");
  const img = '<img src="' + root + product.image + '" alt="' + product.alt + '" loading="lazy" width="96" height="96" />';
  if (webp === product.image || !exists(webp)) return img;
  return '<picture style="display:contents"><source srcset="' + root + webp + '" type="image/webp" style="display:none">' + img + "</picture>";
}

function pickItem(product, tag, note, root) {
  const detail = root + "produto/" + product.slug + "/";
  return (
    '<li class="oc-top-pick">' +
      pictureHtml(product, root) +
      '<div class="oc-top-pick-copy"><span class="tag">' + escapeHtml(tag) + "</span>" +
        '<h3><a href="' + detail + '">' + product.name + "</a></h3>" +
        "<p>" + escapeHtml(note) + "</p></div>" +
      '<div class="oc-top-pick-actions">' +
        '<a class="btn btn-primary btn-small" href="' + product.amazon + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço na Amazon.es</a>' +
        '<a class="btn btn-secondary btn-small" href="' + detail + '">Ver detalhes</a>' +
      "</div>" +
    "</li>"
  );
}

function applyPicks(articleSlug, config, stats) {
  const file = "revista/" + articleSlug + "/index.html";
  let html = read(file);
  const root = "../../";
  const items = config.items.map(([slug, tag, note]) => pickItem(loadProduct(slug), tag, note, root));
  const section =
    "<!-- OC-ARTICLE-PICKS-START -->" +
    '<section class="section oc-top-picks oc-top-picks--unranked oc-article-picks" id="produtos-recomendados"><div class="container">' +
      '<div class="section-header section-header--compact"><div><span class="eyebrow">Da nossa seleção</span>' +
      "<h2>" + escapeHtml(config.title) + "</h2>" +
      "<p>Escolhas editoriais com base nas características publicadas pelos fabricantes. Preço e disponibilidade confirmam-se na Amazon.es.</p></div></div>" +
      '<ul class="oc-top-picks-list">' + items.join("") + "</ul>" +
    "</div></section>" +
    "<!-- OC-ARTICLE-PICKS-END -->";

  if (html.includes("OC-ARTICLE-PICKS-START")) {
    html = html.replace(/<!-- OC-ARTICLE-PICKS-START -->[\s\S]*?<!-- OC-ARTICLE-PICKS-END -->/, section);
  } else {
    const anchor = '<section class="section"><div class="container article-support-grid">';
    if (html.split(anchor).length !== 2) throw new Error("Âncora em falta ou repetida em " + file);
    html = html.replace(anchor, section + anchor);
  }
  write(file, html);
  stats.picks += 1;
}

function applySticky(articleSlug, config, stats) {
  const file = "revista/" + articleSlug + "/index.html";
  let html = read(file);
  // remove a versão anterior (idempotente: volta a gerar a partir dos dados atuais)
  html = html.replace(/\n  <!-- OC-ARTICLE-STICKY -->[\s\S]*?<\/script>\n(?=<\/body>)/, "");
  if (!html.includes('id="' + config.after + '"')) throw new Error("Secção #" + config.after + " em falta em " + file);
  const product = loadProduct(config.product);
  const block =
    "\n  <!-- OC-ARTICLE-STICKY -->\n" +
    '  <div class="oc-sticky-cta" id="ocStickyCta" data-oc-sticky hidden>\n' +
    '    <span class="oc-sticky-cta-name"><small>' + escapeHtml(config.label) + "</small>" + product.name + "</span>\n" +
    '    <a class="btn btn-primary btn-small" href="' + product.amazon + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a>\n' +
    "  </div>\n" +
    '  <script>(function(){var bar=document.getElementById("ocStickyCta"),sec=document.getElementById("' + config.after + '");if(!bar||!sec)return;var mq=window.matchMedia("(max-width: 760px)");function sync(){bar.hidden=!(mq.matches&&sec.getBoundingClientRect().bottom<0);}window.addEventListener("scroll",sync,{passive:true});window.addEventListener("resize",sync);sync();})();</script>\n';
  html = html.replace("</body>", block + "</body>");
  write(file, html);
  stats.sticky += 1;
}

function main() {
  const stats = { picks: 0, sticky: 0 };
  Object.entries(PICKS).forEach(([slug, config]) => applyPicks(slug, config, stats));
  Object.entries(STICKY).forEach(([slug, config]) => applySticky(slug, config, stats));
  console.log(JSON.stringify(stats));
}

main();
