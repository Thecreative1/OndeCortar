// 2026-10-10 — dois guias curtos de barba. Pesquisas confirmadas nas sugestões do Google PT:
//  - "barba grisalha" (… charme, … envelhece, … desenhada, … degradê, como escurecer …,
//    como pintar …, melhor shampoo para …, melhor tinta para …)
//  - "fazer a barba antes ou depois do banho", "fazer a barba depois de comer",
//    "fazer a barba na digestão faz mal"
// Sem recomendar tintas concretas (não verificadas); factos dos produtos das páginas produto/.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "barba-grisalha-assumir-ou-pintar",
    category: "cuidados-com-a-barba",
    published: "2026-10-10",
    title: "Barba grisalha: assumir ou pintar, e como a usar a teu favor",
    h1: "Barba grisalha: assumir ou pintar?",
    description: "Barba grisalha envelhece ou dá charme? Como a usar a teu favor, cortes e linhas que resultam, cuidados para não ficar áspera e o que saber antes de a pintar.",
    schemaDescription: "Barba grisalha: assumir ou pintar, como a aparar para resultar, cuidados e o que saber antes de a pintar.",
    image: "imagens/revista/barba-grisalha-retrato.jpg",
    imageAlt: "Retrato de um homem com barba grisalha curta sobre fundo escuro",
    readMinutes: 5,
    criteria: "Orientações gerais de estilo e cuidado; para tintas, seguir sempre as instruções e o teste de alergia indicados pelo fabricante.",
    lede: "Em muitos homens, os primeiros pelos brancos aparecem na barba antes do cabelo — no queixo, junto ao bigode, ou numa faixa de cada lado. E com eles chega a pergunta: isto envelhece ou dá charme?",
    subcopy: "Depende menos da cor e mais do cuidado. Uma barba grisalha aparada e com linhas limpas parece uma escolha; uma barba grisalha desleixada parece cansaço. Aqui está como fazer da primeira a tua.",
    heroActions: [["#a-teu-favor", "Como a usar a teu favor"], ["#pintar", "Se quiseres pintar"]],
    quick: [
      ["Barba grisalha envelhece?", "Desleixada, sim. Curta, com linhas limpas e bem tratada, tende a dar um ar mais seguro do que velho."],
      ["Porque fica grisalha antes do cabelo?", "É muito comum. Depende sobretudo da genética e da idade; não há nada de errado nisso."],
      ["Como a manter bonita?", "Comprimento curto a médio, linhas do pescoço e das bochechas definidas, e hidratação: o pelo branco tende a ficar mais áspero."],
      ["Posso pintar?", "Pode, com tintas próprias para barba e o teste de alergia que o fabricante indica. Um tom um pouco mais claro do que o original parece mais natural."]
    ],
    summary: [
      "O cuidado pesa mais do que a cor",
      "Curta a média e com linhas limpas",
      "Grisalho em degradê: deixa o contraste natural",
      "Hidratar e escovar: o pelo branco fica mais áspero",
      "Amarelado? Lava com regularidade e evita fumo",
      "A pintar: tinta de barba, teste de alergia, tom mais claro"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para a barba grisalha",
      text: "Aparador com muitos comprimentos, bálsamo e escova: o essencial para uma barba grisalha arrumada.",
      actions: [["../../produto/braun-bt5525-series-5/", "Ver aparador"], ["../../loja/oleos-e-balms/", "Óleos e bálsamos"]]
    },
    sections: [
      {
        h2: "Porque é que a barba fica grisalha",
        html: "<p>O pelo ganha cor com a melanina que o folículo produz. Com os anos, os folículos produzem cada vez menos, e o pelo nasce grisalho ou branco. Quando começa e a que ritmo depende sobretudo da <strong>genética</strong> — é por isso que há quem tenha a barba grisalha aos 30 e o cabelo escuro aos 50.</p><p>É também por isso que a barba fica muitas vezes «às manchas»: o queixo e o bigode primeiro, as bochechas depois. Não é sinal de nada, além de que o tempo passa.</p>"
      },
      {
        id: "a-teu-favor",
        h2: "Como usar a barba grisalha a teu favor",
        html: "<ul class=\"rich-list\"><li><strong>Comprimento curto a médio.</strong> Uma barba grisalha comprida e cheia pode pesar; curta, fica limpa e intencional.</li><li><strong>Linhas definidas.</strong> Pescoço, bochechas e bigode bem marcados fazem mais pela imagem do que a cor. Está tudo em <a href=\"../../revista/como-aparar-a-barba-em-casa/\">como aparar a barba em casa</a>.</li><li><strong>Deixa o degradê natural.</strong> Se o grisalho está no queixo e o resto ainda é escuro, esse contraste resulta — não precisas de o esconder.</li><li><strong>O cabelo a condizer.</strong> Um corte limpo, com o grisalho curto e arrumado, liga tudo. Vê <a href=\"../../revista/cortes-de-cabelo-masculino-qual-combina-comigo/\">que corte combina contigo</a>.</li></ul><p>Um aparador com muitos comprimentos facilita encontrar a altura certa: o <a href=\"../../produto/braun-bt5525-series-5/\">Braun BT5525</a> tem 40 comprimentos em intervalos de 0,5 mm, com bloqueio.</p>" + amz("B0DQWPZVY3", "braun-bt5525-series-5")
      },
      {
        h2: "Cuidados: macia e sem tom amarelado",
        html: "<p>Muitos homens notam que os pelos brancos são <strong>mais ásperos e secos</strong> do que os escuros. A resposta é a mesma de qualquer barba, só com mais constância:</p><ul class=\"rich-list\"><li><strong>Lava</strong> a barba duas a três vezes por semana com um champô suave.</li><li><strong>Hidrata</strong> com óleo ou bálsamo — o <a href=\"../../produto/proraso-balsamo-barba/\">bálsamo Proraso</a> amacia e condiciona a barba.</li><li><strong>Escova</strong> no sentido do crescimento, para distribuir o produto e alinhar os pelos — vê <a href=\"../../revista/escova-de-barba-ou-pente-qual-usar-no-dia-a-dia/\">escova ou pente</a>.</li></ul><p>Se o grisalho ganha um tom amarelado, as causas mais comuns são fumo, sujidade acumulada e alguns produtos. Lavar com regularidade resolve muitos casos; há também champôs matizadores, de tom violeta, que algumas pessoas usam para neutralizar o amarelo.</p>"
      },
      {
        id: "pintar",
        h2: "Se quiseres pintar: o que saber antes",
        html: "<ul class=\"rich-list\"><li><strong>Usa tinta própria para barba.</strong> Os pelos e a pele do rosto não são iguais ao couro cabeludo.</li><li><strong>Faz o teste de alergia</strong> que o fabricante indica, normalmente com antecedência. A pele do rosto reage mais.</li><li><strong>Escolhe um tom mais claro</strong> do que o teu cabelo. Uma barba demasiado escura sobre um rosto mais velho é o que denuncia a tinta.</li><li><strong>Experimenta pintar só parte</strong> — há quem prefira suavizar o grisalho em vez de o tapar todo, para um resultado mais natural.</li></ul><p>Se tiveres dúvidas ou pele sensível, pede ao teu barbeiro: algumas barbearias fazem coloração de barba — pergunta antes de marcar.</p>"
      }
    ],
    faq: [
      ["A barba grisalha envelhece?", "Depende do cuidado: desleixada, tende a envelhecer; curta, com linhas limpas e bem tratada, costuma dar um ar mais seguro."],
      ["Porque é que a barba fica grisalha antes do cabelo?", "É muito comum e depende sobretudo da genética e da idade. Os folículos da barba podem perder a cor mais cedo do que os do cabelo."],
      ["Como deixar a barba grisalha mais macia?", "Lavar com um champô suave, hidratar com óleo ou bálsamo e escovar no sentido do crescimento. O pelo branco tende a ser mais áspero e beneficia de mais hidratação."],
      ["Como pintar a barba grisalha?", "Com uma tinta própria para barba, depois do teste de alergia indicado pelo fabricante, e num tom um pouco mais claro do que o cabelo para um resultado natural."]
    ],
    faqCta: "Preferes que seja um profissional a aparar ou pintar? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["como-aparar-a-barba-em-casa", "oleo-de-barba-para-que-serve", "cortes-de-cabelo-masculino-qual-combina-comigo"],
    finalCta: {
      h2: "Grisalha, mas por escolha",
      text: "Curta, com linhas limpas e bem hidratada: é isso que separa charme de desleixo.",
      actions: [["../../produto/braun-bt5525-series-5/", "Ver aparador"], ["../../loja/oleos-e-balms/", "Óleos e bálsamos"]]
    }
  },
  {
    slug: "fazer-a-barba-antes-ou-depois-do-banho",
    category: "cuidados-com-a-barba",
    published: "2026-10-10",
    title: "Fazer a barba antes ou depois do banho? Depende da lâmina",
    h1: "Fazer a barba antes ou depois do banho?",
    description: "Antes ou depois do banho? Depende de como barbeias: lâmina, máquina elétrica a seco ou no duche, ou aparador. A resposta para cada caso, e o mito da digestão.",
    schemaDescription: "Antes ou depois do banho: a resposta depende de usares lâmina, máquina elétrica ou aparador.",
    image: "imagens/revista/espelho-barbear-casa-de-banho.jpg",
    imageAlt: "Espelho de barbear extensível na parede de uma casa de banho, a preto e branco",
    readMinutes: 3,
    criteria: "Orientações gerais de barbear; características dos produtos conforme publicadas pelos fabricantes.",
    lede: "É das perguntas mais simples sobre barbear e das que mais respostas erradas tem. A verdade é que não há uma resposta: há uma por cada ferramenta.",
    subcopy: "Lâmina, máquina elétrica ou aparador — cada um quer a pele num estado diferente. Aqui está qual, em trinta segundos de leitura cada.",
    heroActions: [["#por-ferramenta", "Ver por ferramenta"], ["#produtos-recomendados", "O que usar"]],
    quick: [
      ["Com lâmina?", "Depois do banho — ou no fim dele. O vapor e a água quente amaciam o pelo e a lâmina corta com menos esforço."],
      ["Com máquina elétrica a seco?", "Antes do banho, com a pele bem seca: o pelo está direito e a máquina desliza melhor."],
      ["Com máquina à prova de água?", "No duche, com gel ou espuma — é a opção que costuma irritar menos."],
      ["Com aparador?", "Antes do banho, com a barba seca e penteada: molhada parece mais comprida e acabas por cortar demais."]
    ],
    summary: [
      "Lâmina: depois do banho, pelo amaciado",
      "Máquina a seco: antes do banho, pele seca",
      "Máquina à prova de água: no duche, com gel",
      "Aparador: barba seca e penteada",
      "Água fria e hidratante no fim",
      "Depois de comer? Não há razão para esperar"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para cada método",
      text: "Pré-barba, creme, máquina de barbear e aparador — com o que cada um faz bem.",
      actions: [["../../loja/cremes-e-espumas/", "Cremes e espumas"], ["../../loja/trimmers-e-shavers/", "Máquinas e aparadores"]]
    },
    sections: [
      {
        id: "por-ferramenta",
        h2: "Com lâmina: depois do banho",
        html: "<p>O pelo da barba amolece com água quente. Depois de alguns minutos de duche, fica mais fácil de cortar e a pele está mais macia — a lâmina desliza com menos esforço e puxa menos. Se não tomas banho antes, molha a cara com água quente durante um minuto ou usa uma toalha quente.</p><p>Um pré-barba ajuda a quem tem pele sensível: o <a href=\"../../produto/proraso-pre-barba/\">Proraso Pré-Barba</a> amolece os pelos antes da lâmina. Depois, um creme com bom deslize, como o <a href=\"../../produto/proraso-creme/\">creme de barbear Proraso</a>.</p>" + amz("B003VS5O3Q", "proraso-pre-barba")
      },
      {
        h2: "Com máquina elétrica: depende do modelo",
        html: "<ul class=\"rich-list\"><li><strong>A seco:</strong> antes do banho. A pele seca e o pelo direito deixam a máquina deslizar e cortar melhor; o vapor do banho deixa a pele húmida e o barbear a seco perde eficácia.</li><li><strong>À prova de água, com gel ou espuma:</strong> no duche. É a opção preferida de quem tem pele sensível.</li></ul><p>Uma máquina como a <a href=\"../../produto/philips-s5465-series-5000/\">Philips Série 5000</a> faz as duas coisas: é 100% à prova de água. Vê <a href=\"../../revista/melhor-maquina-de-barbear-eletrica-qual-escolher/\">que máquina de barbear escolher</a>.</p>"
      },
      {
        h2: "Com aparador: barba seca",
        html: "<p>Para aparar o comprimento, a barba deve estar <strong>lavada, seca e penteada</strong>. Molhada, parece mais comprida do que é — e acabas por tirar mais do que querias. Está tudo em <a href=\"../../revista/como-aparar-a-barba-em-casa/\">como aparar a barba em casa</a>.</p>"
      },
      {
        h2: "E depois de comer? O mito da digestão",
        html: "<p>Há quem diga que fazer a barba depois de comer faz mal. Não há razão conhecida para isso: barbear é um gesto à superfície da pele e não interfere com a digestão. Faz a barba quando te der jeito.</p>"
      }
    ],
    faq: [
      ["É melhor fazer a barba antes ou depois do banho?", "Com lâmina, depois do banho, quando o pelo está amaciado. Com máquina elétrica a seco, antes, com a pele seca. Com máquina à prova de água, no duche, com gel."],
      ["Posso fazer a barba no duche?", "Sim, com lâmina ou com uma máquina elétrica à prova de água. Com gel ou espuma costuma irritar menos."],
      ["Deve-se aparar a barba molhada ou seca?", "Seca e penteada. Molhada parece mais comprida e é fácil cortar demais."],
      ["Faz mal fazer a barba depois de comer?", "Não há razão conhecida para isso: barbear não interfere com a digestão."]
    ],
    faqCta: "Preferes um barbear à moda antiga, com toalha quente? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["como-reduzir-irritacao-ao-fazer-a-barba", "creme-espuma-ou-gel-de-barbear-qual-escolher", "melhor-maquina-de-barbear-eletrica-qual-escolher"],
    finalCta: {
      h2: "Cada ferramenta, o seu momento",
      text: "Lâmina depois do banho, máquina a seco antes, aparador com a barba seca.",
      actions: [["../../loja/cremes-e-espumas/", "Cremes e espumas"], ["../../loja/trimmers-e-shavers/", "Máquinas e aparadores"]]
    }
  }
];
