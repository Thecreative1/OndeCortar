// 2026-10-10 — guia de presentes inclusivo. Pesquisas confirmadas nas sugestões do Google PT:
// "presente para namorado" (… homem, … aniversário, … diferente, … simples),
// "presente de natal para o meu namorado", "ideias de presente para o meu namorado",
// "presente para marido" (… criativo, … ideias). Linguagem neutra sobre quem oferece.
// Factos dos produtos das páginas produto/{slug}/; sem preços, avaliações, rankings ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "presentes-para-namorado-ideias",
    category: "presentes-e-kits",
    published: "2026-10-10",
    title: "Presentes para o namorado: ideias que ele vai mesmo usar",
    h1: "Presentes para o namorado que ele vai mesmo usar",
    description: "Ideias de presente para o namorado ou o marido, no aniversário ou no Natal: kits de barba, máquinas e pequenos extras por tipo de homem — e o que evitar.",
    schemaDescription: "Ideias de presente para o namorado ou o marido, por tipo de homem: barba, cabelo, barbear clássico, tudo-em-um e pequenos extras.",
    image: "imagens/revista/mao-presente-folhas.jpg",
    imageAlt: "Mão a segurar um presente embrulhado em papel branco, com folhas verdes ao fundo",
    readMinutes: 6,
    criteria: "Ideias organizadas por tipo de uso; características conforme publicadas pelos fabricantes. Não testamos produtos.",
    lede: "O problema dos presentes para homem não é a falta de ideias. É oferecer coisas que vão para a gaveta: o terceiro perfume, a carteira igual à que ele já tem, o gadget que ninguém pediu.",
    subcopy: "Seja para o namorado, o marido ou aquele amigo de sempre, há um sítio onde quase nunca se falha: a casa de banho dele. Aqui estão ideias por tipo de homem — e o que não oferecer.",
    heroActions: [["#por-perfil", "Ver ideias por perfil"], ["#produtos-recomendados", "Ver os presentes"]],
    quick: [
      ["Qual é o presente mais seguro?", "Um kit de barba com caixa, se ele tem barba e não tem rotina. Junta o essencial e já vem pronto a oferecer."],
      ["E se ele já tem tudo?", "Melhora o que ele usa todos os dias: um aparador melhor do que o que tem, ou um ritual de barbear clássico."],
      ["E se não sei se tem barba ou máquina?", "Um tudo-em-um que trata barba, cabelo e contornos — ou um vale numa boa barbearia."],
      ["Presentes pequenos?", "Um aparador de nariz e orelhas, um bálsamo de barba ou uma escova: coisas úteis que ninguém compra para si."]
    ],
    summary: [
      "Antes de comprar, espreita o que ele já usa",
      "Barba sem rotina: kit com caixa",
      "Barba já tratada: aparador melhor",
      "Gosta de rituais: barbear clássico",
      "Prático: um tudo-em-um",
      "Na dúvida: um corte numa boa barbearia"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para oferecer",
      text: "Kits e presentes de barbearia, com o que cada um faz bem e para quem não é.",
      actions: [["../../loja/para-oferecer/", "Ver presentes"], ["../../loja/kits-de-barba/", "Ver kits de barba"]]
    },
    sections: [
      {
        h2: "Primeiro, espreita a casa de banho dele",
        html: "<p>Não é preciso perguntar nada — e estraga a surpresa. Basta reparar no que lá está:</p><ul class=\"rich-list\"><li><strong>Uma máquina velha</strong>, a perder força, ou um aparador com o pente partido? Substituí-la é um presente que ele vai usar todas as semanas.</li><li><strong>Barba, mas nada para a tratar?</strong> Um kit resolve: óleo, bálsamo e escova.</li><li><strong>Uma lâmina descartável e espuma de lata?</strong> Há aí um ritual de barbear à espera de ser descoberto.</li><li><strong>Uma prateleira cheia?</strong> Então não acrescentes — melhora uma peça que ele usa todos os dias.</li></ul><p>A regra é simples: um bom presente de barbearia é algo que ele <strong>usa</strong>, não algo que ele <strong>guarda</strong>.</p>"
      },
      {
        id: "por-perfil",
        h2: "O que tem barba e não tem rotina",
        html: "<p>É o presente mais fácil de acertar. O <a href=\"../../produto/viking-revolution-beard-grooming-kit/\">Viking Revolution Beard Grooming Kit</a> junta <strong>escova, pente, bálsamo, óleo e tesoura</strong> numa caixa de apresentação — tudo o que faz falta para começar, sem ter de escolher peça a peça.</p><p><strong>Quando não oferecer:</strong> se ele já tem uma rotina montada, vai repetir peças. Aí, vê a ideia seguinte.</p>" + amz("B07B53Q3BX", "viking-revolution-beard-grooming-kit")
      },
      {
        h2: "O que já tem a barba bem tratada",
        html: "<p>Ele já sabe o que faz — o presente é dar-lhe uma ferramenta melhor. O <a href=\"../../produto/braun-bt5525-series-5/\">Braun Beard Trimmer Series 5 BT5525</a> tem <strong>40 comprimentos em intervalos de 0,5 mm com bloqueio</strong>, até 120 minutos de bateria e é 100% à prova de água.</p><p><strong>Quando não oferecer:</strong> se ele comprou um aparador recente. E não serve para cortar o cabelo todo.</p>" + amz("B0DQWPZVY3", "braun-bt5525-series-5")
      },
      {
        h2: "O que corta o cabelo em casa",
        html: "<p>Se ele corta o cabelo sozinho — ou se és tu que lhe cortas —, uma máquina melhor poupa tempo e idas à barbearia. A <a href=\"../../produto/philips-hc5630-series-5000/\">Philips Series 5000 HC5630</a> tem <strong>28 comprimentos numa roda</strong>, de 0,5 a 28 mm, lâminas autoafiáveis e até 90 minutos sem fio.</p><p>Para completar, uma <a href=\"../../produto/candure-tesoura-cabeleireiro/\">tesoura de cabeleireiro</a> para o topo. Vê <a href=\"../../revista/como-cortar-cabelo-masculino-com-tesoura-em-casa/\">como cortar à tesoura em casa</a>.</p><p><strong>Quando não oferecer:</strong> se ele corta todos os dias numa barbearia — aí compensa uma máquina profissional.</p>" + amz("B07TPW789G", "philips-hc5630-series-5000")
      },
      {
        h2: "O que gosta de rituais",
        html: "<p>Para o homem que aprecia as coisas feitas com calma, o barbear clássico é um presente com história. O <a href=\"../../produto/king-c-rotina/\">conjunto King C. Gillette de barbear clássico</a> junta <strong>máquina de segurança, pincel, creme e amaciador</strong> — o essencial para começar, já com boa apresentação.</p><p>Se ele já barbeia à moda antiga, o <a href=\"../../produto/taylor-of-old-bond-street-spicy-sandalwood/\">creme Taylor of Old Bond Street Spicy Sandalwood</a>, em taça clássica de 150 g, é um extra de barbearia londrina.</p><p><strong>Quando não oferecer:</strong> a quem quer despachar a barba em dois minutos de manhã.</p>" + amz("B0FMQBG11X", "king-c-rotina")
      },
      {
        h2: "O prático, que quer uma máquina para tudo",
        html: "<p>Se não sabes bem o que ele usa, ou se ele detesta gavetas cheias, um tudo-em-um é a aposta segura. O <a href=\"../../produto/braun-aio7545-series-7/\">Braun Series 7 AIO7545</a> é um kit <strong>12 em 1 para barba, cabelo, orelhas, nariz e corpo</strong>, com até 120 minutos de bateria e 100% à prova de água.</p><p>Mais simples e para rosto e corpo, o <a href=\"../../produto/philips-oneblade-pro-360/\">Philips OneBlade Pro 360</a> apara, contorna e mantém com a mesma ferramenta.</p><p><strong>Quando não oferecer:</strong> a quem já tem máquinas dedicadas para cada coisa — vai ficar com acessórios repetidos.</p>" + amz("B0DQWLG36G", "braun-aio7545-series-7")
      },
      {
        h2: "Pequenos presentes que ninguém compra para si",
        html: "<ul class=\"rich-list\"><li><strong><a href=\"../../produto/panasonic-er-gn30/\">Aparador de nariz e orelhas Panasonic ER-GN30</a></strong> — útil, discreto e sem conversas embaraçosas. Lâmina protegida e lavável.</li><li><strong><a href=\"../../produto/proraso-balsamo-barba/\">Bálsamo de barba Proraso</a></strong> — amacia a barba e acalma a pele, de uma marca de barbearia desde 1948.</li><li><strong><a href=\"../../produto/zilberhaar-escova/\">Escova de javali ZilberHaar</a></strong> — para barbas médias a densas, distribui o óleo e o bálsamo por igual.</li></ul><p>Ficam bem sozinhos ou ao lado de um presente maior.</p>"
      },
      {
        id: "por-idade",
        h2: "Presentes para homem por idade",
        html: "<p>A idade não manda no presente — o que ele usa é que manda. Mas há padrões que ajudam a decidir:</p><ul class=\"rich-list\"><li><strong>20 e poucos:</strong> muitas vezes a barba ainda está a crescer. Um kit de barba com óleo e escova, ou um <a href=\"../../produto/philips-oneblade-360-qp2724/\">OneBlade</a> para a barba de poucos dias.</li><li><strong>30:</strong> já sabe o estilo que quer. Um aparador melhor, como o <a href=\"../../produto/braun-bt5525-series-5/\">Braun BT5525</a>, ou uma máquina de cortar cabelo se corta em casa.</li><li><strong>40:</strong> menos tempo, mais exigência. Um tudo-em-um que resolve tudo numa máquina, como o <a href=\"../../produto/braun-aio7545-series-7/\">Braun Series 7</a>, ou uma <a href=\"../../produto/philips-s5465-series-5000/\">máquina de barbear elétrica</a> para quem faz a barba todos os dias.</li><li><strong>50 e 60:</strong> rituais e conforto. Um conjunto de barbear clássico, um <a href=\"../../produto/panasonic-er-gn30/\">aparador de nariz e orelhas</a> — útil e sem conversas embaraçosas — e, se a barba está grisalha, um bálsamo que a amacie.</li><li><strong>Se rapa a cabeça:</strong> um <a href=\"../../produto/philips-hs7980-head-shaver/\">shaver de cabeça</a> poupa-lhe tempo todas as semanas.</li></ul><p>Para o amigo ou o colega, com orçamento mais curto, os presentes pequenos acima funcionam em qualquer idade.</p>"
      },
      {
        h2: "O que não oferecer",
        html: "<ul class=\"rich-list\"><li><strong>Uma máquina igual à que ele já tem.</strong> Espreita a marca e o modelo antes.</li><li><strong>Kits enormes com peças que ninguém usa.</strong> Rolos, pentes repetidos, navalhas para quem nunca usou navalha.</li><li><strong>Aromas fortes às cegas.</strong> Bálsamos e cremes têm cheiro; se não sabes do que ele gosta, escolhe uma ferramenta.</li><li><strong>Coisas para \"mudar\" o estilo dele.</strong> Um bom presente melhora o que ele já faz, não o que tu achas que ele devia fazer.</li></ul><p>Antes de comprar, confirma na Amazon.es o prazo de entrega e a política de devoluções — sobretudo perto do Natal.</p>"
      },
      {
        h2: "Na dúvida: oferece um corte",
        html: "<p>Se nada disto encaixa, há um presente que funciona sempre: <strong>um corte ou uma barba numa boa barbearia</strong>. Algumas vendem vales de oferta — pergunta diretamente. Encontra uma perto dele no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a> ou procura <a href=\"../../cidades/\">por cidade</a>.</p>"
      }
    ],
    faq: [
      ["Que presente dar a um homem de 40 ou 50 anos?", "Algo que lhe poupe tempo ou que torne a rotina mais confortável: um aparador tudo-em-um, uma máquina de barbear elétrica, um conjunto de barbear clássico ou um aparador de nariz e orelhas."],
      ["Qual é um bom presente para o namorado?", "Algo que ele use todos os dias. Se tem barba sem rotina, um kit de barba com caixa; se já trata da barba, um aparador melhor; se corta o cabelo em casa, uma máquina com muitos comprimentos."],
      ["O que oferecer ao namorado no Natal?", "Um kit de barba, um aparador ou máquina melhor do que a que ele tem, ou um conjunto de barbear clássico. Para algo pequeno, um aparador de nariz e orelhas ou um bálsamo de barba."],
      ["Que presente dar a um homem que já tem tudo?", "Melhora uma peça que ele usa todos os dias — um aparador mais completo — ou oferece uma experiência, como um corte numa boa barbearia."],
      ["Um kit de barba é um bom presente?", "Sim, se ele tem barba e ainda não tem rotina. Se já tem os produtos de que gosta, é melhor oferecer uma ferramenta, como um aparador."]
    ],
    faqCta: "Preferes oferecer uma experiência? Encontra uma barbearia perto dele no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["melhor-kit-de-barba-para-oferecer", "como-montar-uma-rotina-simples-de-barba-em-casa", "aparador-corporal-masculino-qual-escolher"],
    finalCta: {
      h2: "Um presente que ele usa, não que ele guarda",
      text: "Espreita a casa de banho dele, escolhe pelo perfil e acerta à primeira.",
      actions: [["../../loja/para-oferecer/", "Ver presentes"], ["../../loja/kits-de-barba/", "Ver kits de barba"]]
    }
  }
];
