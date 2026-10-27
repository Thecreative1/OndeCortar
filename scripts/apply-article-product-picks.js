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
  "melhor-aparador-de-barba": {
    title: "Os 8 melhores aparadores de barba",
    items: [
      ["philips-bt5765-series-5000", "Melhor no geral", "40 comprimentos em passos de 0,2 mm e pentes de 0,4 a 20 mm."],
      ["philips-bt7670-series-7000", "Contornos definidos", "O mesmo que o 5000, com cabeça larga em T e aparador de precisão."],
      ["braun-bt5525-series-5", "Mais bateria", "Até 120 minutos sem fio e bloqueio do comprimento."],
      ["philips-bt3619-series-3000", "Para começar", "20 comprimentos de 0,5 a 10 mm e lâminas que não precisam de óleo."],
      ["philips-mg3930-series-3000", "Barba e cabelo", "7 acessórios para barba, cabelo curto, nariz e orelhas."],
      ["braun-aio7545-series-7", "Tudo em um completo", "12 em 1, cabeça de precisão e até 120 minutos de bateria."],
      ["philips-oneblade-360-qp2724", "Aparar e barbear", "Apara, faz contornos e barbeia com a mesma lâmina."],
      ["cecotec-bamba-precisioncare-pro-5em1", "Mais em conta", "5 em 1, à prova de água, com ou sem fio."]
    ]
  },
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
      ["philips-bt3619-series-3000", "Para começar", "20 posições de comprimento para acertar a barba aos poucos."],
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
      ["philips-bt3619-series-3000", "Mais simples", "20 posições de comprimento para manter a barba alinhada."],
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
  "melhor-kit-de-barba-para-oferecer": {
    title: "Os kits pela barba de quem recebe",
    items: [
      ["viking-sandalwood", "Barba comprida", "Champô, condicionador, óleo, bálsamo e pente, com aroma a sândalo."],
      ["oukzon-kit-barba-10-em-1", "Com condicionador", "Champô e condicionador de barba, óleo, bálsamo e ferramentas para dar forma."],
      ["viking-revolution-beard-grooming-kit", "Primeiro kit", "Escova, pente, bálsamo, óleo e tesoura numa caixa de apresentação."],
      ["cusmay-kit-barba-11-em-1", "Tudo numa caixa", "11 peças, de champô e óleos a tesoura, navalha e bolsa de viagem."],
      ["king-c-gillette-beard-trimmer-kit", "Barba curta", "Aparador sem fios com três pentes para vários comprimentos."],
      ["king-c-rotina", "Faz a barba todos os dias", "Máquina de segurança, pincel, creme e amaciador num conjunto clássico."]
    ]
  },
  "o-que-oferecer-ao-pai": {
    title: "As prendas pela forma como ele faz a barba",
    items: [
      ["braun-series5-51-b1000s", "Máquina de rede", "3 lâminas flexíveis e AutoSense, 100% à prova de água."],
      ["philips-s5465-series-5000", "Máquina rotativa", "27 lâminas autoafiáveis e cabeças flexíveis a 360°, a seco ou no duche."],
      ["remington-mb320c", "Barba ou bigode", "Lâminas de cerâmica sem óleo e janela que mostra o comprimento."],
      ["panasonic-er-gn30", "Prenda pequena", "Aparador de nariz e orelhas com lâmina de fio duplo, lavável."],
      ["king-c-rotina", "Faz a barba à lâmina", "Máquina de segurança, pincel, creme e amaciador num conjunto clássico."],
      ["nivea-men-pack-hyaluron", "Pai que tem tudo", "Creme de dia FPS 15, contorno de olhos e after shave numa caixa."]
    ]
  },
  "prendas-de-natal-para-homem": {
    title: "As prendas por pessoa",
    items: [
      ["braun-series5-51-b1000s", "Para o pai", "Máquina de barbear de lâminas de rede, 3 lâminas flexíveis e AutoSense."],
      ["braun-bt5525-series-5", "Marido ou namorado", "40 comprimentos em intervalos de 0,5 mm com bloqueio, 100% à prova de água."],
      ["philips-oneblade-360-qp2724", "18 a 25 anos", "Apara, contorna e rapa com a mesma lâmina; pentes de 1, 3 e 5 mm."],
      ["cusmay-kit-barba-11-em-1", "Barba sem rotina", "Kit 11 em 1 numa caixa de oferta, com óleos, bálsamo e ferramentas."],
      ["king-c-rotina", "Original", "Máquina de segurança, pincel, creme e amaciador num conjunto clássico."],
      ["proraso-balsamo-barba", "Amigo secreto", "Bálsamo de barba de uma marca italiana de barbearia desde 1948."]
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
  "como-rapar-a-cabeca-em-casa-shaver-ou-maquina": {
    title: "Para a cabeça rapada",
    items: [
      ["philips-hs7980-head-shaver", "A nossa escolha", "Cabeça flexível a 360°, 36 lâminas ComfortCut e até 90 minutos de bateria."],
      ["skull-shaver-pitbull-sx5", "Pega na palma da mão", "Shaver de cabeça e rosto, resistente à água (IPX6)."],
      ["philips-hc5630-series-5000", "Para cabeça com sombra", "Máquina que desce aos 0,5 mm, com 90 minutos sem fio."],
      ["braun-bt5525-series-5", "Para a barba", "40 comprimentos em intervalos de 0,5 mm, para a barba a condizer."]
    ]
  },
  "melhor-maquina-de-barbear-eletrica-qual-escolher": {
    title: "As máquinas que recomendamos",
    items: [
      ["philips-s5465-series-5000", "A nossa escolha", "Rotativa com 27 lâminas autoafiáveis, cabeças a 360° e aparador de encaixar."],
      ["braun-series5-51-b1000s", "De lâminas", "3 lâminas flexíveis e AutoSense, que ajusta a potência à barba."],
      ["braun-series-3-310s", "Lâminas, para começar", "2 redes e aparador central, 100% à prova de água."],
      ["philips-x3053-series-3000", "Primeira máquina", "Rotativa de entrada com SkinProtect, a seco ou no duche."],
      ["philips-oneblade-360-qp2724", "Barba de poucos dias", "Apara, contorna e rapa com a lâmina 360."]
    ]
  },
  "qual-oneblade-comprar": {
    title: "OneBlade e lâminas",
    items: [
      ["philips-oneblade-360-qp2724", "A nossa escolha", "Lâmina 360 e duas lâminas incluídas, para barba curta e de poucos dias."],
      ["philips-oneblade-pro-360", "Comprimentos variados", "Pente de 20 comprimentos, para rosto e corpo."],
      ["philips-oneblade-laminas-360", "Lâminas originais", "Pack de 3, encaixam em todos os OneBlade e OneBlade Pro."],
      ["philips-bodygroom-bg3480", "Para o corpo", "Proteção da pele própria para o corpo e zonas íntimas."]
    ]
  },
  // Atenção: este artigo é o MODELO de build-revista-articles.js — só blocos dentro do <main>,
  // nunca barra fixa (ficaria fora do <main> e passaria para os artigos gerados)
  "tipos-de-degrade-como-pedir-o-corte-certo": {
    title: "Máquinas para degradê",
    items: [
      ["wahl-super-taper", "Clássica de barbearia", "Motor estável para uso contínuo e corte previsível sessão após sessão."],
      ["fagaci-profissional", "Fade e taper", "Para mais precisão em fades, linhas e acabamentos."],
      ["babylisspro-chromfx-clipper", "Sem fios", "Clipper sem fios com base de carga e lâminas de aço japonês."],
      ["wahl-gold-travel-shaver", "Acabamento à pele", "Shaver de folha compacto para acabamentos e contornos rentes."]
    ]
  },
  "pelos-encravados-como-evitar": {
    title: "Para cortar sem encravar",
    items: [
      ["philips-bodygroom-bg3480", "Corpo e virilha", "Pentes de 2 e 3 mm e proteção da pele, também para zonas íntimas."],
      ["braun-bt5525-series-5", "Barba aparada", "40 comprimentos em intervalos de 0,5 mm, para deixar um ou dois milímetros."],
      ["philips-oneblade-360-qp2724", "Barba de poucos dias", "Apara com pente curto e faz contornos sem rapar rente."],
      ["proraso-pre-barba", "Se rapas", "Pré-barba para pele sensível: amolece os pelos antes da lâmina."]
    ]
  },
  "como-abrir-uma-barbearia-em-portugal": {
    title: "Para equipar o primeiro posto",
    items: [
      ["wahl-super-taper", "Máquina de corte", "Motor estável para uso contínuo e corte previsível sessão após sessão."],
      ["grifema-pulverizador-300ml", "Borrifador", "Névoa contínua, uso a 360° e bocal de 0,3 mm, em 300 ml."],
      ["uraqt-capa", "Capa", "Para proteger o cliente durante o corte e manter o serviço limpo."],
      ["barbicide-desinfetante-pulverizador", "Desinfeção", "Desinfetante concentrado, com pulverizador para superfícies."]
    ]
  },
  "barba-grisalha-assumir-ou-pintar": {
    title: "Para a barba grisalha",
    items: [
      ["braun-bt5525-series-5", "Aparar curta", "40 comprimentos em intervalos de 0,5 mm, com bloqueio."],
      ["proraso-balsamo-barba", "Amaciar", "Amacia e condiciona a barba, de uma marca de barbearia desde 1948."],
      ["zilberhaar-escova", "Escovar", "Cerdas de javali que distribuem o óleo ou o bálsamo por igual."],
      ["viking-revolution-beard-oil", "Hidratar", "Óleo com argão e jojoba para reduzir o aspeto seco e áspero."]
    ]
  },
  "fazer-a-barba-antes-ou-depois-do-banho": {
    title: "Para cada método",
    items: [
      ["proraso-pre-barba", "Lâmina", "Pré-barba para pele sensível: amolece os pelos antes da lâmina."],
      ["proraso-creme", "Creme", "Boa cobertura e deslize para navalha ou máquina de segurança."],
      ["philips-s5465-series-5000", "Máquina", "Rotativa 100% à prova de água: a seco antes do banho ou no duche."],
      ["braun-bt5525-series-5", "Aparador", "40 comprimentos, para aparar a barba seca e penteada."]
    ]
  },
  "after-shave-para-que-serve": {
    title: "Preparar a pele antes da lâmina",
    items: [
      ["proraso-pre-barba", "Pré-barba", "Para pele sensível: amolece os pelos antes do barbear."],
      ["proraso-creme", "Creme de barbear", "Boa cobertura e deslize para navalha ou máquina de segurança."],
      ["nivea-men-sensitive-fp15", "Depois da barba", "Creme sem álcool para pele sensível, com FPS 15: alternativa ao after-shave que arde."]
    ]
  },
  "creme-de-rosto-para-homem-como-escolher": {
    title: "Um creme para cada tipo de pele",
    items: [
      ["cerave-hidratante-rosto-spf50", "A nossa escolha", "Hidrata e protege do sol (SPF 50) no mesmo passo; para pele normal a seca."],
      ["cerave-oil-control-gel", "Pele oleosa ou mista", "Gel-creme leve que a marca indica para controlar o brilho."],
      ["nivea-men-sensitive-fp15", "Pele sensível e pós-barba", "Sem álcool, com camomila e FPS 15."],
      ["loreal-men-expert-hydra-energetic", "Primeiro creme", "Gel-creme de absorção rápida, para o dia a dia e depois da barba."],
      ["loreal-men-expert-power-age", "A partir dos 40", "Com ácido hialurónico, em frasco de 100 ml; junta FPS de dia."]
    ]
  },
  "protetor-solar-para-homem-qual-escolher": {
    title: "Um protetor para cada caso",
    items: [
      ["isdin-fusion-water-magic-spf50", "A nossa escolha", "SPF 50 leve e de acabamento mate, para o rosto todos os dias."],
      ["la-roche-posay-anthelios-oil-control", "Pele muito oleosa", "SPF 50+ formulado para pele oleosa e sensível."],
      ["cerave-hidratante-rosto-spf50", "Pele seca", "Hidrata e protege (SPF 50) no mesmo passo."],
      ["isdin-scalp-hair-spray-spf50", "Cabeça rapada", "Spray SPF 50 para o couro cabeludo, transparente e não gorduroso."],
      ["heliocare-360-sport-stick", "Desporto e bolso", "Stick SPF 50+ resistente à água e ao suor, para reaplicar."]
    ]
  },
  "contorno-de-olhos-para-homem-olheiras-e-papos": {
    title: "Um contorno para cada caso",
    items: [
      ["cerave-contorno-olhos", "A nossa escolha", "Creme simples para olheiras e papos ligeiros, com ácido hialurónico e ceramidas."],
      ["the-ordinary-caffeine-solution", "Papos de manhã", "Sérum leve com cafeína a 5% para desinchar."],
      ["loreal-men-expert-roll-on-olhos", "Noite curta", "Roll-on de efeito gelo, para aplicar sem dedos."],
      ["nivea-men-hyaluron-contorno-olhos", "Rugas, a partir dos 40", "Contorno anti-idade com ácido hialurónico."]
    ]
  },
  "serum-para-homem-para-que-serve": {
    title: "Um sérum para cada problema",
    items: [
      ["the-ordinary-hyaluronic-acid-b5", "A nossa escolha", "Ácido hialurónico com ceramidas: hidrata e quase não irrita."],
      ["neutrogena-hydro-boost-niacinamida", "Poros e brilho", "10% de niacinamida com ácido hialurónico, sem perfume."],
      ["garnier-vitamina-c-serum", "Manchas", "Vitamina C, niacinamida e ácido salicílico; de manhã, com FPS."],
      ["loreal-men-expert-serum-vitamina-c", "Vitamina C de homem", "Vitamina C pura a 10% para pele baça."],
      ["the-ordinary-granactive-retinoid", "Rugas, à noite", "Retinoide a 2% em emulsão, para começar devagar."]
    ]
  },
  "pomada-cera-ou-gel-cabelo-homem": {
    title: "Um produto para cada corte",
    items: [
      ["american-crew-matte-clay", "Efeito seco", "Argila mate de fixação média a alta, para cabelo curto com textura."],
      ["uppercut-deluxe-matt-pomade", "Pomada mate", "À base de água, sai à primeira lavagem; fixação média sem brilho."],
      ["american-crew-pomade", "Com brilho", "Fixação média e brilho alto, para risca ou penteado para trás."],
      ["american-crew-fiber", "Cabelo grosso", "Fixação forte com pouco brilho, para cabelo que desfaz o penteado."],
      ["giorgi-line-gel-extra-forte", "Gel", "Fixação extra forte para o dia inteiro, com o efeito molhado do gel."],
      ["cantu-creme-caracois", "Caracóis", "Creme sem enxaguar para definir os caracóis, em vez de cera."]
    ]
  },
  "cabelo-encaracolado-homem-corte-e-cuidados": {
    title: "Cremes para caracóis",
    items: [
      ["cantu-creme-caracois", "Caracóis secos ou com frizz", "Manteiga de karité e coco, sem sulfatos nem silicones; frasco de 340 g."],
      ["tigi-catwalk-curls-rock", "Ondas e caracóis definidos", "Define os caracóis e controla o frizz com humidade, segundo a marca; 150 ml."]
    ]
  },
  "gel-de-limpeza-para-homem-como-lavar-a-cara": {
    title: "Um gel de limpeza para cada pele",
    items: [
      ["cerave-gel-limpeza-espumante", "A nossa escolha", "Pele normal a oleosa; sem perfume, também para o corpo."],
      ["cerave-gel-limpeza-hidratante", "Pele seca ou sensível", "Limpeza suave com ceramidas e ácido hialurónico."],
      ["cerave-blemish-control", "Acne e pontos negros", "Ácido salicílico, argila e niacinamida."],
      ["la-roche-posay-effaclar-gel", "Pele oleosa com imperfeições", "Gel purificante micro-esfoliante com ácido salicílico."],
      ["nivea-men-hydrocare-gel-limpeza", "Marca de homem", "Aloé vera e provitamina B5, sensação de frescura."]
    ]
  }
};

// Barra fixa mobile nos guias de compra: produto + id da secção depois da qual aparece
const STICKY = {
  "melhor-aparador-de-barba": {
    product: "philips-bt5765-series-5000",
    label: "A nossa escolha",
    after: "so-barba-ou-tudo-em-um"
  },
  "gel-de-limpeza-para-homem-como-lavar-a-cara": {
    product: "cerave-gel-limpeza-espumante",
    label: "A nossa escolha",
    after: "qual-escolher"
  },
  "serum-para-homem-para-que-serve": {
    product: "the-ordinary-hyaluronic-acid-b5",
    label: "A nossa escolha",
    after: "qual-escolher"
  },
  "contorno-de-olhos-para-homem-olheiras-e-papos": {
    product: "cerave-contorno-olhos",
    label: "A nossa escolha",
    after: "o-que-tens"
  },
  "protetor-solar-para-homem-qual-escolher": {
    product: "isdin-fusion-water-magic-spf50",
    label: "A nossa escolha",
    after: "pele-oleosa"
  },
  "creme-de-rosto-para-homem-como-escolher": {
    product: "cerave-hidratante-rosto-spf50",
    label: "A nossa escolha",
    after: "tipo-de-pele"
  },
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
  "barba-grisalha-assumir-ou-pintar": {
    product: "braun-bt5525-series-5",
    label: "Para aparar curta",
    after: "produtos-recomendados"
  },
  "pelos-encravados-como-evitar": {
    product: "philips-bodygroom-bg3480",
    label: "Aparar em vez de rapar",
    after: "produtos-recomendados"
  },
  "como-rapar-a-cabeca-em-casa-shaver-ou-maquina": {
    product: "philips-hs7980-head-shaver",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "melhor-maquina-de-barbear-eletrica-qual-escolher": {
    product: "philips-s5465-series-5000",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "qual-oneblade-comprar": {
    product: "philips-oneblade-360-qp2724",
    label: "A nossa escolha",
    after: "produtos-recomendados"
  },
  "melhor-kit-de-barba-para-oferecer": {
    product: "viking-sandalwood",
    label: "O kit mais seguro",
    after: "produtos-recomendados"
  },
  "o-que-oferecer-ao-pai": {
    product: "braun-series5-51-b1000s",
    label: "A prenda mais segura",
    after: "produtos-recomendados"
  },
  "prendas-de-natal-para-homem": {
    product: "cusmay-kit-barba-11-em-1",
    label: "A prenda mais fácil",
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
      "<p>Escolhas editoriais com base nas características publicadas pelos fabricantes. Preço e disponibilidade confirmam-se na Amazon.es. Como Afiliado da Amazon, o OndeCortar.pt obtém rendimentos com as compras elegíveis, sem custo extra para ti.</p></div></div>" +
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
