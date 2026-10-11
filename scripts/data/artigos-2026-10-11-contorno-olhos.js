// 2026-10-11 — contorno de olhos para homem. Estrutura tirada das sugestões do Google PT:
// "olheiras homem tratamento", "olheiras escuras / profundas / causas", "papos nos olhos ao acordar",
// "papos nos olhos causas / como tirar", "creme para papos e olheiras", "contorno de olhos com cafeína",
// "melhor contorno de olhos anti rugas", "como aplicar creme contorno de olhos", CeraVe.
// Produtos em scripts/data/produtos-2026-10-11-contorno-olhos.js (só características do fabricante).
const P = (slug, name) => '<a href="../../produto/' + slug + '/">' + name + "</a>";

module.exports = [
  {
    slug: "contorno-de-olhos-para-homem-olheiras-e-papos",
    category: "guias-de-compra",
    title: "Contorno de olhos para homem: olheiras, papos e rugas",
    h1: "Contorno de olhos para homem: o que resolve nas olheiras, nos papos e nas rugas",
    description: "Contorno de olhos para homem: o que faz (e não faz) às olheiras, como tirar os papos de manhã, rugas, como aplicar e qual escolher para cada caso.",
    schemaDescription: "Que contorno de olhos usar se és homem: olheiras, papos ao acordar e rugas, o que um creme consegue fazer e como aplicar.",
    image: "imagens/revista/homem-grisalho-maos-rosto.jpg",
    imageAlt: "Homem grisalho de barba a esfregar os olhos cansados com as mãos",
    readMinutes: 6,
    criteria: "Características conforme publicadas pelos fabricantes na Amazon.es; produtos escolhidos pelo que mais se procura em Portugal.",
    lede: "Olheiras e papos são das primeiras coisas que se notam numa cara cansada. Um contorno de olhos ajuda, mas não em tudo, e convém saber em quê antes de comprar.",
    subcopy: "Aqui está como perceber o que tens, o que um creme consegue fazer em cada caso, como aplicar e o que escolher.",
    heroActions: [["#o-que-tens", "Olheiras ou papos?"], ["../../loja/cuidados-de-rosto/", "Ver contornos de olhos"]],
    quick: [
      ["Um contorno tira as olheiras?", "Depende do tipo. Ajuda nas olheiras de cansaço e pele seca; nas de genética ou de sulco fundo, a diferença é pequena."],
      ["E os papos de manhã?", "Frio e cafeína ajudam a desinchar. Dormir mais, menos sal e menos álcool à noite ajudam mais."],
      ["Qual escolher?", "Para começar, um creme simples de contorno. Papos de manhã: cafeína ou roll-on frio. Rugas: um contorno anti-idade."],
      ["Como se aplica?", "Um grão de arroz para os dois olhos, com o dedo anelar, aos toques, no osso à volta do olho."]
    ],
    summary: [
      "Percebe primeiro se são olheiras escuras, fundas ou papos",
      "Papos de manhã: frio, cafeína e dormir mais",
      "Olheiras de genética mudam pouco com cremes",
      "Rugas: contorno anti-idade e protetor solar",
      "Aplica com o anelar, aos toques, sem esfregar",
      "Inchaço de um só olho ou com dor: médico"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de rosto",
      text: "Os contornos deste guia, os cremes de rosto e os protetores solares, cada um com o seu caso.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver contornos de olhos"], ["#como-aplicar", "Como aplicar"]]
    },
    sections: [
      {
        h2: "Porque a pele à volta dos olhos é diferente",
        html: "<p>A pele das pálpebras e por baixo dos olhos é das mais finas do corpo, tem poucas glândulas de gordura e mexe-se o dia inteiro, cada vez que pestanejas ou te ris. Por isso é a primeira a mostrar cansaço, secura e rugas, e a que mais reage a produtos agressivos.</p><p>Um <strong>contorno de olhos</strong> é um creme, gel ou sérum pensado para essa zona: textura mais leve, menos perfume e ingredientes escolhidos para não irritar os olhos. Não é obrigatório. Mas se o creme de rosto te faz arder os olhos, ou se queres tratar papos e olheiras, faz sentido ter um à parte.</p>"
      },
      {
        id: "o-que-tens",
        h2: "Olheiras ou papos: percebe o que tens",
        html: "<p>As pesquisas misturam tudo, mas são coisas diferentes e cada uma responde de forma diferente a um creme:</p><ul class=\"rich-list\"><li><strong>Olheiras escuras (castanhas)</strong>: excesso de pigmento por baixo dos olhos. Muitas vezes são de família e pioram com o sol.</li><li><strong>Olheiras azuladas ou arroxeadas</strong>: a pele é tão fina que se vêem os vasos por baixo. Notam-se mais com cansaço, frio ou nariz entupido.</li><li><strong>Olheiras fundas</strong>: não são cor, são sombra. Com a idade, o sulco entre a pálpebra e a face cava e faz sombra.</li><li><strong>Papos ao acordar</strong>: líquido acumulado durante a noite. Melhoram ao longo da manhã.</li><li><strong>Bolsas permanentes</strong>: gordura que avança com a idade. Estão lá todo o dia.</li></ul><p>Um teste rápido: puxa a pele por baixo do olho com cuidado. Se a cor se espalha e clareia, é sobretudo pele fina e vasos; se fica igual, é pigmento. Se a mancha quase desaparece quando olhas de frente para uma luz, é sobretudo sombra.</p>"
      },
      {
        h2: "Papos ao acordar: o que ajuda a desinchar",
        html: "<p>Os papos da manhã são os que mais respondem. O líquido acumula-se quando estás deitado, e piora com sal ao jantar, álcool, noites curtas e alergias. Muda primeiro os hábitos: dormir mais, uma almofada um pouco mais alta e menos sal e álcool à noite.</p><p>Depois, o frio e a cafeína ajudam a desinchar mais depressa. O " + P("the-ordinary-caffeine-solution", "The Ordinary Caffeine Solution 5% + EGCG") + " é um sérum leve com cafeína que a marca diz reduzir visivelmente o inchaço e as olheiras. Se preferes um gesto de dois segundos sem dedos, o " + P("loreal-men-expert-roll-on-olhos", "L'Oréal Men Expert Hydra Energetic Roll-On") + " tem uma esfera de efeito gelo, segundo a marca, para passar por baixo dos olhos de manhã.</p><p>As <strong>bolsas permanentes</strong>, de gordura, não saem com cremes. Se te incomodam, quem resolve é um dermatologista ou cirurgião plástico.</p>"
      },
      {
        h2: "Olheiras: o que um creme consegue (e o que não consegue)",
        html: "<p>Aqui é preciso ser honesto. As <strong>olheiras de genética e as fundas</strong> mudam pouco com cremes: um contorno pode melhorar o aspeto da pele, mas não apaga pigmento de família nem enche um sulco. As <strong>olheiras de cansaço e pele fina</strong> respondem melhor: hidratar torna a pele menos baça e a cor menos marcada.</p><p>Para a maioria, a nossa escolha é o " + P("cerave-contorno-olhos", "CeraVe Creme Reparador Contorno de Olhos") + ": a marca indica-o para olheiras e papos, com ácido hialurónico, niacinamida e ceramidas, e é simples o suficiente para usar todos os dias. Junta-lhe o mais importante para as olheiras castanhas: <a href=\"../../revista/protetor-solar-para-homem-qual-escolher/\">protetor solar</a> à volta dos olhos, porque o sol escurece o pigmento.</p><p><a href=\"../../loja/cuidados-de-rosto/\">Ver os contornos de olhos da nossa seleção</a>.</p>"
      },
      {
        h2: "Rugas e pés de galinha",
        html: "<p>As linhas no canto dos olhos aparecem de rir e de franzir os olhos ao sol. Um contorno anti-idade hidrata e suaviza o aspeto das rugas finas; não as apaga, e quem prometer isso está a exagerar.</p><p>Se queres um, o " + P("nivea-men-hyaluron-contorno-olhos", "NIVEA MEN Hyaluron Contorno de Olhos") + " é pensado pela marca para pele madura e cansada, com ácido hialurónico e absorção rápida. O que mais previne rugas novas continua a ser o protetor solar e uns óculos de sol, para não franzires os olhos.</p>"
      },
      {
        id: "como-aplicar",
        h2: "Como aplicar o contorno de olhos",
        html: "<ol class=\"rich-list\"><li><strong>Pouca quantidade</strong>: um grão de arroz para os dois olhos. A mais, acaba por entrar nos olhos.</li><li><strong>Usa o dedo anelar</strong>: é o que faz menos força.</li><li><strong>Aos toques, no osso</strong>: à volta do olho, por baixo e no canto exterior, sem chegar à linha das pestanas.</li><li><strong>Do canto interior para fora</strong>, sem esfregar nem puxar a pele.</li><li><strong>Ordem</strong>: depois de lavar a cara e antes do creme de rosto e do protetor solar.</li></ol>"
      },
      {
        h2: "Quando ir ao médico",
        html: "<p>Papos e olheiras são quase sempre uma questão de cansaço, idade ou genética. Mas fala com um médico se o inchaço é <strong>só num olho</strong>, aparece de repente, vem com <strong>dor, vermelhidão ou comichão</strong> que não passa, ou se os papos aparecem ao mesmo tempo que inchaço noutras partes do corpo. Olhos sempre inchados com comichão podem ser alergia, que tem tratamento próprio.</p>"
      },
      {
        h2: "Se tivéssemos de escolher apenas um",
        html: "<p>O " + P("cerave-contorno-olhos", "CeraVe Creme Reparador Contorno de Olhos") + ". Hidrata a pele mais fina da cara e ajuda no aspeto de olheiras e papos ligeiros, sem complicar. Se o teu problema é só acordar inchado, troca pelo " + P("the-ordinary-caffeine-solution", "sérum de cafeína") + ".</p>"
      }
    ],
    faq: [
      ["O contorno de olhos tira as olheiras?", "Ajuda nas olheiras de cansaço e pele seca. Nas de origem genética ou de sulco fundo, um creme muda pouco; o protetor solar evita que escureçam."],
      ["Como tirar os papos nos olhos de manhã?", "Frio e cafeína ajudam a desinchar. Dormir mais, menos sal e menos álcool à noite e uma almofada um pouco mais alta ajudam mais."],
      ["Porque tenho papos nos olhos ao acordar?", "O líquido acumula-se quando estás deitado. Sal, álcool, noites curtas e alergias pioram; ao longo da manhã costumam melhorar."],
      ["Os homens precisam de contorno de olhos?", "Não é obrigatório. Faz sentido se o creme de rosto arde nos olhos ou se queres tratar papos, olheiras ou rugas finas."],
      ["Como aplicar o creme de contorno de olhos?", "Um grão de arroz para os dois olhos, com o dedo anelar, aos toques no osso à volta do olho, sem esfregar."],
      ["Qual o melhor contorno de olhos anti-rugas?", "Um contorno com ácido hialurónico hidrata e suaviza o aspeto das rugas finas. Para prevenir rugas novas, protetor solar e óculos de sol."]
    ],
    faqCta: "Vê os contornos de olhos desta seleção em <a href=\"../../loja/cuidados-de-rosto/\">Cuidados de rosto</a>.",
    related: ["creme-de-rosto-para-homem-como-escolher", "protetor-solar-para-homem-qual-escolher", "barba-grisalha-assumir-ou-pintar"],
    finalCta: {
      h2: "Primeiro o sono, depois o creme",
      text: "Um contorno ajuda, mas os olhos mostram sobretudo como dormes. Escolhe pelo que tens e usa-o todos os dias.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver contornos de olhos"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]]
    }
  }
];
