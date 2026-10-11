// 2026-10-11 — sérum para homem. Estrutura tirada das sugestões do Google PT:
// "sérum para que serve rosto", "sérum ou creme qual o melhor", "sérum antes ou depois do creme hidratante",
// "como usar sérum no rosto / retinol / vitamina C", "melhor sérum para homem", "sérum vitamina c",
// "sérum niacinamida (the ordinary) para que serve", "sérum ácido hialurónico", "sérum pele oleosa",
// "sérum manchas", "sérum poros", "melhor sérum anti rugas".
// Produtos em scripts/data/produtos-2026-10-11-serum.js (só características do fabricante).
const P = (slug, name) => '<a href="../../produto/' + slug + '/">' + name + "</a>";

module.exports = [
  {
    slug: "serum-para-homem-para-que-serve",
    category: "guias-de-compra",
    title: "Sérum para homem: para que serve e qual escolher",
    h1: "Sérum para homem: para que serve e qual escolher",
    description: "Sérum facial para homem: para que serve, se vem antes ou depois do creme e qual escolher (ácido hialurónico, niacinamida, vitamina C ou retinol).",
    schemaDescription: "O que é um sérum, quando vale a pena, a ordem certa com o creme e que ingrediente escolher para pele oleosa, manchas ou rugas.",
    image: "imagens/revista/frascos-serum-mesa.jpg",
    imageAlt: "Dois frascos de vidro âmbar com tampa preta sobre um pano de linho claro",
    readMinutes: 6,
    criteria: "Características conforme publicadas pelos fabricantes na Amazon.es; produtos escolhidos pelo que mais se procura em Portugal.",
    lede: "O sérum é o produto que mais se vende e o que menos falta faz a quem está a começar. Serve para tratar um problema concreto, não para substituir o creme.",
    subcopy: "Aqui está para que serve, a ordem certa com o creme, que ingrediente escolher para cada problema e o que não misturar.",
    heroActions: [["#qual-escolher", "Que sérum para o meu caso"], ["../../loja/cuidados-de-rosto/", "Ver séruns"]],
    quick: [
      ["Para que serve um sérum?", "Leva uma dose maior de um ingrediente ativo para um problema concreto: hidratação, poros, manchas ou rugas."],
      ["Sérum ou creme?", "Primeiro o creme e o protetor solar. O sérum é um passo extra, quando há um problema que o creme não resolve."],
      ["Antes ou depois do creme?", "Antes. Do mais leve para o mais espesso: lavar, sérum, creme e, de manhã, protetor solar."],
      ["Qual escolher?", "Pele que repuxa: ácido hialurónico. Poros e brilho: niacinamida. Manchas: vitamina C. Rugas: retinol, à noite."]
    ],
    summary: [
      "Primeiro creme e protetor solar; o sérum vem depois",
      "Escolhe pelo problema, não pela moda",
      "Ordem: lavar, sérum, creme, protetor solar",
      "Vitamina C de manhã, retinol à noite",
      "Um sérum de cada vez, durante algumas semanas",
      "Retinol pede protetor solar todos os dias"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de rosto",
      text: "Os séruns deste guia, com cremes, protetores solares e contornos de olhos.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver séruns"], ["#ordem", "A ordem certa"]]
    },
    sections: [
      {
        h2: "O que é um sérum e em que difere de um creme",
        html: "<p>Um <strong>sérum</strong> é uma fórmula leve, quase sempre líquida ou em gel, com uma concentração maior de um ingrediente ativo. O <strong>creme</strong> hidrata e protege a superfície da pele; o sérum vai atrás de um problema concreto: pele desidratada, poros, manchas ou rugas.</p><p>A nossa posição: o sérum é o terceiro produto, não o primeiro. Se ainda não usas um <a href=\"../../revista/creme-de-rosto-para-homem-como-escolher/\">creme de rosto</a> e <a href=\"../../revista/protetor-solar-para-homem-qual-escolher/\">protetor solar</a> todas as manhãs, começa por aí. Um sérum caro numa pele sem proteção solar é dinheiro que o sol desfaz.</p>"
      },
      {
        id: "ordem",
        h2: "Antes ou depois do creme: a ordem certa",
        html: "<p>A regra é aplicar do mais leve para o mais espesso, para cada produto chegar à pele:</p><ol class=\"rich-list\"><li><strong>Lavar a cara</strong> e secar com toques.</li><li><strong>Sérum</strong>: umas gotas no rosto, espalhadas com as mãos.</li><li><strong>Contorno de olhos</strong>, se usas.</li><li><strong>Creme de rosto</strong>.</li><li><strong>De manhã, protetor solar</strong> no fim.</li></ol><p>Espera meio minuto entre o sérum e o creme para não fazer bolinhas. Com a barba, aplica na pele das faces e por baixo da barba, como o creme.</p>"
      },
      {
        id: "qual-escolher",
        h2: "Pele que repuxa: ácido hialurónico",
        html: "<p>É o sérum mais simples e o mais difícil de correr mal. O ácido hialurónico segura água na pele e deixa-a menos repuxada, sobretudo depois do banho ou da barba. Serve para quase toda a gente e de manhã e à noite.</p><p>A nossa escolha para começar é o " + P("the-ordinary-hyaluronic-acid-b5", "The Ordinary Hyaluronic Acid 2% + B5") + ", com ceramidas e provitamina B5, segundo a marca. Aplica-se com a pele ainda húmida e com um creme por cima, para a água não se perder.</p>"
      },
      {
        h2: "Pele oleosa e poros: niacinamida",
        html: "<p>A niacinamida é uma forma de vitamina B3 que se usa para o brilho, a textura irregular e o aspeto dos poros. É das mais procuradas e das mais bem toleradas.</p><p>O " + P("neutrogena-hydro-boost-niacinamida", "Neutrogena Hydro Boost Sérum 10% Niacinamida") + " junta-a com ácido hialurónico, sem perfume, e a marca diz que reduz visivelmente o aspeto dos poros. Convém ser honesto: os poros não fecham nem desaparecem, o que melhora é o aspeto. Com pele muito oleosa, junta um <a href=\"../../produto/cerave-oil-control-gel/\">gel hidratante leve</a> por cima.</p><p><a href=\"../../loja/cuidados-de-rosto/\">Ver os séruns da nossa seleção</a>.</p>"
      },
      {
        h2: "Manchas e pele baça: vitamina C",
        html: "<p>A vitamina C usa-se para manchas do sol, marcas de borbulhas e pele sem brilho. Faz mais sentido de manhã, por baixo do protetor solar: sem ele, as manchas voltam.</p><p>O mais vendido é o " + P("garnier-vitamina-c-serum", "Garnier Vitamina C Sérum Antimanchas") + ", que junta um derivado de vitamina C com niacinamida e ácido salicílico. Se preferes uma marca de homem, o " + P("loreal-men-expert-serum-vitamina-c", "L'Oréal Men Expert Hydra Energetic Sérum Vitamina C") + " tem vitamina C pura a 10% e é pensado para pele baça e com ar cansado, segundo a marca.</p>"
      },
      {
        h2: "Rugas: retinol (só à noite)",
        html: "<p>Os retinoides são os ingredientes com mais estudos para rugas finas e textura. Também são os que mais irritam no início: vermelhidão, descamação e pele sensível nas primeiras semanas são comuns.</p><p>Para começar, o " + P("the-ordinary-granactive-retinoid", "The Ordinary Granactive Retinoid 2% Emulsion") + " é apresentado pela marca como uma alternativa mais suave ao retinol, sem perfume e com esqualano. Usa-o só à noite, duas ou três vezes por semana no início, e aumenta devagar. O retinol deixa a pele mais sensível ao sol: o protetor solar de manhã deixa de ser opcional.</p>"
      },
      {
        h2: "O que não misturar",
        html: "<ul class=\"rich-list\"><li><strong>Retinol e vitamina C</strong>: não na mesma altura. Vitamina C de manhã, retinol à noite.</li><li><strong>Retinol e ácidos esfoliantes</strong> (como o ácido salicílico) na mesma noite: aumentam o risco de irritação. Alterna as noites.</li><li><strong>Vários séruns novos ao mesmo tempo</strong>: se a pele reagir, não sabes qual foi. Introduz um de cada vez e dá-lhe quatro a seis semanas.</li><li><strong>Niacinamida e vitamina C</strong> podem usar-se juntas; a ideia de que se anulam já não se aplica às fórmulas atuais.</li></ul>"
      },
      {
        h2: "Se tivéssemos de escolher apenas um",
        html: "<p>O " + P("the-ordinary-hyaluronic-acid-b5", "The Ordinary Hyaluronic Acid 2% + B5") + ". É o que serve a mais gente, o que menos irrita e o que se nota mais depressa numa pele que repuxa. Se a tua queixa principal são os poros, troca pelo " + P("neutrogena-hydro-boost-niacinamida", "sérum de niacinamida") + "; se são manchas, pela vitamina C, sempre com protetor solar.</p>"
      }
    ],
    faq: [
      ["Para que serve um sérum no rosto?", "Para tratar um problema concreto com uma dose maior de um ingrediente ativo: hidratação, poros, manchas ou rugas. Não substitui o creme."],
      ["O sérum vai antes ou depois do creme?", "Antes. A ordem é lavar a cara, sérum, contorno de olhos, creme e, de manhã, protetor solar."],
      ["Sérum ou creme: qual é melhor?", "Não se substituem. Primeiro creme e protetor solar; o sérum é um passo extra para um problema que o creme não resolve."],
      ["Qual o melhor sérum para homem?", "Depende do problema: ácido hialurónico para pele que repuxa, niacinamida para poros e brilho, vitamina C para manchas e retinol para rugas."],
      ["Para que serve a niacinamida?", "É uma forma de vitamina B3 usada para o brilho, a textura irregular e o aspeto dos poros. Costuma ser bem tolerada."],
      ["Como usar sérum de retinol?", "Só à noite, duas ou três vezes por semana no início, numa pele seca, antes do creme. De manhã, protetor solar sempre."]
    ],
    faqCta: "Vê os séruns desta seleção em <a href=\"../../loja/cuidados-de-rosto/\">Cuidados de rosto</a>.",
    related: ["creme-de-rosto-para-homem-como-escolher", "protetor-solar-para-homem-qual-escolher", "contorno-de-olhos-para-homem-olheiras-e-papos"],
    finalCta: {
      h2: "Um problema, um sérum",
      text: "Escolhe pelo que queres resolver, usa-o algumas semanas e mantém o creme e o protetor solar.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver séruns"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]]
    }
  }
];
