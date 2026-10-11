// 2026-10-11 — gel de limpeza para homem. Estrutura tirada das sugestões do Google PT:
// "melhor gel de limpeza para pele oleosa e com acne / mista / seca", "gel de limpeza pele sensível",
// "gel de limpeza facial para que serve", "gel de limpeza cerave", "effaclar", "nivea men",
// "lavar a cara com água fria ou quente", "deve-se lavar a cara de manhã", "lavar a cara com sabonete",
// "sabão azul e branco", "limpeza de pele homem com barba", "pontos negros homem".
// Produtos em scripts/data/produtos-2026-10-11-gel-limpeza.js (só características do fabricante).
const P = (slug, name) => '<a href="../../produto/' + slug + '/">' + name + "</a>";

module.exports = [
  {
    slug: "gel-de-limpeza-para-homem-como-lavar-a-cara",
    category: "guias-de-compra",
    title: "Gel de limpeza para homem: como lavar a cara e qual escolher",
    h1: "Gel de limpeza para homem: como lavar a cara e qual escolher",
    description: "Gel de limpeza facial para homem: porque não o sabonete, qual escolher para pele oleosa, seca ou com acne, água fria ou quente e como lavar com barba.",
    schemaDescription: "Para que serve um gel de limpeza, qual escolher para cada tipo de pele e como lavar a cara bem, com ou sem barba.",
    image: "imagens/revista/homem-lavar-cara-lavatorio.jpg",
    imageAlt: "Homem com degradê a passar água pela cara num lavatório",
    readMinutes: 5,
    criteria: "Características conforme publicadas pelos fabricantes na Amazon.es; produtos escolhidos pelo que mais se procura em Portugal.",
    lede: "Antes de qualquer creme ou sérum vem o passo que quase todos os homens fazem mal: lavar a cara. Sabonete de mãos e água a ferver são os erros mais comuns.",
    subcopy: "Aqui está para que serve um gel de limpeza, qual escolher para a tua pele e como lavar a cara bem, com ou sem barba.",
    heroActions: [["#como-lavar", "Como lavar a cara"], ["../../loja/cuidados-de-rosto/", "Ver géis de limpeza"]],
    quick: [
      ["Porque não o sabonete?", "Os sabonetes de mãos e o sabão azul e branco costumam ser mais agressivos e deixam a pele a repuxar. Um gel de rosto limpa sem tirar tudo."],
      ["Água fria ou quente?", "Morna. A água quente seca a pele e a fria não dissolve bem a oleosidade."],
      ["Quantas vezes por dia?", "À noite, sempre. De manhã, se tens pele oleosa ou se não lavas no duche; com pele seca, basta água."],
      ["Qual escolher?", "Pele oleosa ou mista: gel espumante. Seca ou sensível: gel hidratante. Acne e pontos negros: com ácido salicílico."]
    ],
    summary: [
      "Gel de rosto, não sabonete de mãos",
      "Água morna, nunca a ferver",
      "30 segundos de massagem chegam",
      "À noite sempre; de manhã conforme a pele",
      "Com barba, lava também a pele por baixo",
      "Seca com toques, sem esfregar"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de rosto",
      text: "Os géis de limpeza deste guia, com cremes, protetores solares, séruns e contornos de olhos.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver géis de limpeza"], ["#como-lavar", "Como lavar a cara"]]
    },
    sections: [
      {
        h2: "Para que serve um gel de limpeza (e porque não o sabonete)",
        html: "<p>Ao fim do dia, a pele tem oleosidade, suor, poluição, restos de protetor solar e, se fizeste a barba, de espuma. Um <strong>gel de limpeza</strong> tira isso sem levar também a proteção natural da pele. É o primeiro passo de qualquer rotina: um creme posto numa pele mal lavada funciona pior.</p><p>O sabonete de mãos, o gel de banho e o <strong>sabão azul e branco</strong> limpam, mas costumam ser mais agressivos para a cara: deixam a pele a repuxar e, em quem tem pele oleosa, podem levar a pele a produzir ainda mais oleosidade. A nossa posição: um gel próprio para o rosto é a compra mais barata e mais útil da rotina.</p>"
      },
      {
        id: "qual-escolher",
        h2: "Pele normal, mista ou oleosa: gel espumante",
        html: "<p>Se a tua pele brilha a meio do dia ou tem a zona T oleosa, um gel que faz espuma tira melhor o excesso de oleosidade. A nossa escolha é o " + P("cerave-gel-limpeza-espumante", "CeraVe Gel de Limpeza Espumante") + ": a marca indica-o para pele normal a oleosa, com ceramidas, ácido hialurónico e niacinamida, sem perfume. Serve também para o corpo, o que simplifica o duche.</p><p>Se preferes uma marca de homem, o " + P("nivea-men-hydrocare-gel-limpeza", "NIVEA MEN Hydrocare Gel de Limpeza") + " tem aloé vera e provitamina B5 e a marca promete limpar sem secar.</p>"
      },
      {
        h2: "Pele seca ou sensível: gel hidratante",
        html: "<p>Se a pele fica a repuxar depois de lavar, ou arde com facilidade, o problema pode ser o próprio gel. Troca por um de limpeza suave, que quase não faz espuma. O " + P("cerave-gel-limpeza-hidratante", "CeraVe Gel de Limpeza Hidratante") + " é indicado pela marca para pele normal a seca e diz limpar sem alterar a barreira da pele.</p><p>Com pele seca, de manhã muitas vezes basta passar água morna; o gel fica para a noite.</p>"
      },
      {
        h2: "Acne e pontos negros: ácido salicílico",
        html: "<p>O ácido salicílico esfolia por dentro dos poros e ajuda nos pontos negros e nas borbulhas. Para isso, o mais vendido é o " + P("cerave-blemish-control", "CeraVe Blemish Control") + ", com ácido salicílico, argila e niacinamida. Para quem já conhece a linha Effaclar, o " + P("la-roche-posay-effaclar-gel", "La Roche-Posay Effaclar Gel Purificante Micro-Esfoliante") + " faz um papel parecido.</p><p>Começa com uma vez por dia, à noite, e vê como a pele reage. Os dois podem deixar a pele mais sensível ao sol, por isso o <a href=\"../../revista/protetor-solar-para-homem-qual-escolher/\">protetor solar</a> de manhã é obrigatório. Acne que não melhora em algumas semanas é assunto para dermatologista.</p><p><a href=\"../../loja/cuidados-de-rosto/\">Ver os géis de limpeza da nossa seleção</a>.</p>"
      },
      {
        id: "como-lavar",
        h2: "Como lavar a cara (bem)",
        html: "<ol class=\"rich-list\"><li><strong>Água morna</strong>: a quente seca a pele, a fria não dissolve a oleosidade.</li><li><strong>Pouca quantidade</strong>: o tamanho de uma avelã chega para a cara toda.</li><li><strong>Massaja 30 segundos</strong> com movimentos circulares, sem esfregar com força. Não te esqueças da linha do cabelo, das abas do nariz e do maxilar.</li><li><strong>Passa bem por água</strong>: restos de gel irritam.</li><li><strong>Seca com toques</strong>, com uma toalha limpa só para a cara.</li><li><strong>Hidrata a seguir</strong>, com a pele ainda ligeiramente húmida: <a href=\"../../revista/creme-de-rosto-para-homem-como-escolher/\">creme de rosto</a> e, de manhã, protetor solar.</li></ol><p><strong>De manhã ou à noite?</strong> À noite, sempre: é quando há mais para tirar. De manhã depende: pele oleosa agradece o gel; pele seca ou sensível pode ficar só com água.</p>"
      },
      {
        id: "barba",
        h2: "Com barba: a pele por baixo também conta",
        html: "<p>A barba retém oleosidade, pele morta e restos de comida, e a pele por baixo é das que mais descama. Ao lavar a cara, espalha o gel também na barba, com as pontas dos dedos a chegar à pele, e passa bem por água. Se fazes a barba, lava a cara antes: a pele limpa e os pelos amolecidos com água morna deixam a lâmina deslizar melhor.</p><p>Para o pelo da barba em si, um champô de barba e um <a href=\"../../revista/oleo-de-barba-para-que-serve/\">óleo de barba</a> fazem o resto.</p>"
      },
      {
        h2: "Erros comuns",
        html: "<ul class=\"rich-list\"><li><strong>Lavar demasiadas vezes</strong>: mais de duas vezes por dia tira a proteção natural e a pele reage.</li><li><strong>Água muito quente</strong> no duche a bater na cara.</li><li><strong>Esfregar com a toalha</strong> ou com esponjas ásperas.</li><li><strong>Esfoliar todos os dias</strong>: uma ou duas vezes por semana chega, e não no mesmo dia que outros ácidos ou retinol.</li><li><strong>Não hidratar depois</strong>: a limpeza tira água à pele; o creme devolve-a.</li></ul>"
      },
      {
        h2: "Se tivéssemos de escolher apenas um",
        html: "<p>O " + P("cerave-gel-limpeza-espumante", "CeraVe Gel de Limpeza Espumante") + ". Serve à maioria das peles, não tem perfume e dá para rosto e corpo. Se a tua pele repuxa, troca pelo " + P("cerave-gel-limpeza-hidratante", "hidratante") + "; se tens borbulhas e pontos negros, pelo " + P("cerave-blemish-control", "Blemish Control") + ".</p>"
      }
    ],
    faq: [
      ["Para que serve um gel de limpeza facial?", "Para tirar oleosidade, suor, poluição e restos de protetor solar sem levar a proteção natural da pele. É o primeiro passo da rotina."],
      ["Posso lavar a cara com sabonete ou sabão azul e branco?", "Podes, mas costumam ser mais agressivos para a cara e deixar a pele a repuxar. Um gel próprio para o rosto limpa de forma mais suave."],
      ["Lavar a cara com água fria ou quente?", "Morna. A água quente seca a pele e a fria não dissolve bem a oleosidade."],
      ["Deve-se lavar a cara de manhã?", "Com pele oleosa, sim. Com pele seca ou sensível, de manhã pode bastar água; o gel fica para a noite."],
      ["Qual o melhor gel de limpeza para pele oleosa e com acne?", "Um gel com ácido salicílico, como o CeraVe Blemish Control ou o La Roche-Posay Effaclar, com protetor solar de manhã."],
      ["Como lavar a cara com barba?", "Espalha o gel também na barba, com as pontas dos dedos a chegar à pele, e passa bem por água. Seca com toques."]
    ],
    faqCta: "Vê os géis de limpeza desta seleção em <a href=\"../../loja/cuidados-de-rosto/\">Cuidados de rosto</a>.",
    related: ["creme-de-rosto-para-homem-como-escolher", "serum-para-homem-para-que-serve", "pelos-encravados-como-evitar"],
    finalCta: {
      h2: "Primeiro lavar bem, depois o resto",
      text: "Um gel certo para a tua pele, água morna e 30 segundos. O creme e o sérum funcionam melhor a seguir.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver géis de limpeza"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]]
    }
  }
];
