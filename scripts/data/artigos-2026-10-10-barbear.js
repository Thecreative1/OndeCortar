// 2026-10-10 — três guias para lacunas encontradas nas sugestões do Google PT:
//  - careca: "melhor shaver para careca", "melhor maquininha para careca", "melhor shaver para
//    raspar a cabeça", "careca com barba", "melhor barba para careca"
//  - máquina de barbear: "melhor máquina de barbear", "qual a melhor máquina de barbear elétrica",
//    "melhor máquina de barbear custo benefício"
//  - OneBlade: "qual oneblade comprar", "qual é melhor oneblade ou bodygroom", "oneblade como usar",
//    "oneblade lâminas", "oneblade recargas"
// Factos dos produtos das páginas produto/{slug}/ (fichas da Amazon.es); sem preços, avaliações,
// rankings ou testes inventados.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const CRIT = "Características conforme publicadas pelos fabricantes. Não testamos produtos; explicamos o método em «como escolhemos».";

module.exports = [
  {
    slug: "como-rapar-a-cabeca-em-casa-shaver-ou-maquina",
    category: "guias-de-compra",
    published: "2026-10-10",
    title: "Rapar a cabeça em casa: shaver ou máquina? Guia para carecas",
    h1: "Rapar a cabeça em casa: shaver ou máquina?",
    description: "Rapar a cabeça em casa sem cortes: shaver de cabeça ou máquina sem pente, qual escolher, a nossa escolha e como deixar a cabeça lisa e a barba a condizer.",
    schemaDescription: "Shaver de cabeça ou máquina sem pente: qual escolher para rapar a cabeça em casa, como o fazer sem cortes e que barba combina.",
    image: "imagens/revista/homem-careca-luz-quente.jpg",
    imageAlt: "Homem de cabeça rapada, de perfil, com luz quente de fim de tarde",
    readMinutes: 6,
    criteria: CRIT,
    lede: "Rapar a cabeça é a decisão mais libertadora que um homem pode tomar no espelho — e a mais fácil de estragar com a ferramenta errada. Lâmina de barbear e pressa dão cortes; a máquina do rosto deixa-te muito tempo às voltas na nuca.",
    subcopy: "A primeira pergunta não é que marca comprar. É se queres a cabeça lisa ou com sombra. A partir daí, a escolha faz-se sozinha.",
    heroActions: [["#produtos-recomendados", "Ver a nossa escolha"], ["#passo-a-passo", "Como rapar sem cortes"]],
    quick: [
      ["Shaver ou máquina?", "Shaver de cabeça se queres a cabeça lisa. Máquina sem pente se preferes uma sombra de cabelo, como uma barba de um dia."],
      ["Posso usar a máquina de barbear do rosto?", "Pode, mas a cabeça é pequena para a área: demora muito mais e chega mal à nuca. Um shaver de cabeça foi desenhado para as curvas da cabeça."],
      ["De quanto em quanto tempo?", "Para lisa, a cada um a três dias. Com sombra, uma vez por semana."],
      ["Que barba combina com careca?", "Curta a média e bem delineada. Equilibra a cabeça e dá forma ao rosto."]
    ],
    summary: [
      "Lisa: shaver de cabeça. Com sombra: máquina sem pente",
      "Cabeça flexível que segue a forma da cabeça",
      "À prova de água: rapa-se melhor no duche",
      "Cabelo comprido? Máquina primeiro, shaver depois",
      "Protetor solar na cabeça: a pele fica exposta",
      "Barba curta e bem delineada equilibra a careca"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para a cabeça rapada",
      text: "Shavers de cabeça e máquinas que vão aos 0,5 mm, com o que cada um faz bem e onde fica aquém.",
      actions: [["../../produto/philips-hs7980-head-shaver/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver shavers"]]
    },
    sections: [
      {
        h2: "Primeiro, decide: lisa ou com sombra",
        html: "<ul class=\"rich-list\"><li><strong>Lisa</strong> — a cabeça brilha, sem sombra de cabelo. Precisas de um <strong>shaver de cabeça</strong>: corta rente à pele, como uma máquina de barbear, mas com uma cabeça desenhada para a forma do crânio.</li><li><strong>Com sombra</strong> — fica uma penugem curta, como uma barba de um dia. Basta uma <strong>máquina de cortar cabelo sem pente</strong>, no comprimento mais baixo. É mais rápido e irrita menos.</li></ul><p>Muitos homens alternam: sombra durante a semana, lisa para uma ocasião. Se ainda não sabes, começa pela sombra — é reversível em três dias.</p>"
      },
      {
        h2: "Porque não a lâmina nem a máquina do rosto",
        html: "<p>A <strong>lâmina de barbear</strong> deixa a cabeça mais lisa do que tudo — e é por isso que dá mais cortes. A cabeça tem curvas, a nuca não se vê e uma lâmina não perdoa. Para quem a domina, ótimo; para quem está a começar, é o caminho mais curto para um penso no couro cabeludo.</p><p>A <strong>máquina de barbear do rosto</strong> funciona, mas foi feita para uma área pequena. Na cabeça demora muito mais e chega mal à nuca e atrás das orelhas. Um shaver de cabeça tem várias cabeças rotativas numa unidade larga e flexível, que segue a curva do crânio.</p>"
      },
      {
        h2: "O que procurar num shaver de cabeça",
        html: "<ul class=\"rich-list\"><li><strong>Cabeça flexível.</strong> Tem de rodar e acompanhar a forma da cabeça, não o contrário.</li><li><strong>Uma pega que se segure sem espelho.</strong> Na nuca trabalhas às cegas: a pega tem de encaixar bem na mão.</li><li><strong>À prova de água.</strong> No duche a pele está mais macia e os pelos vão pelo ralo.</li><li><strong>Bateria para várias sessões</strong> e carregamento rápido para os dias em que te esqueces.</li></ul>"
      },
      {
        id: "a-nossa-escolha",
        h2: "A nossa escolha: Philips Head Shaver Série 7000 Pro",
        html: "<p>Para a cabeça lisa, recomendamos o <a href=\"../../produto/philips-hs7980-head-shaver/\">Philips Série 7000 Pro (HS7980/15)</a>. Foi desenhado para o couro cabeludo: <strong>cabeça flexível a 360°</strong>, <strong>36 lâminas ComfortCut</strong> e um sensor <strong>PowerAdapt</strong> que ajusta a potência à densidade do cabelo. Dá até <strong>90 minutos de bateria</strong>, é à prova de água (IPX7) e vem com estojo.</p><p>O que tens de saber: rapa rente — não deixa comprimento. Se o cabelo estiver comprido, passa primeiro a máquina.</p>" + amz("B0FJS72Z6H", "philips-hs7980-head-shaver") + "<p>Preferes uma pega que encaixa na palma da mão? O <a href=\"../../produto/skull-shaver-pitbull-sx5/\">Skull Shaver Pitbull Silver Pro SX5</a> é de uma marca dedicada a shavers de cabeça, serve para cabeça e rosto e é resistente à água (IPX6). É vendido por um distribuidor, não pela Amazon.</p>"
      },
      {
        h2: "Se preferes sombra: máquina sem pente",
        html: "<p>Para a cabeça com sombra, uma boa máquina de cortar cabelo faz o trabalho. A <a href=\"../../produto/philips-hc5630-series-5000/\">Philips Series 5000 HC5630</a> desce até aos <strong>0,5 mm</strong> na roda de ajuste e trabalha até 90 minutos sem fio — e serve também para quem quer voltar a deixar crescer. Para os números, vê <a href=\"../../revista/buzz-cut-corte-militar-que-numero-pedir/\">buzz cut e que número pedir</a>.</p>" + amz("B07TPW789G", "philips-hc5630-series-5000")
      },
      {
        id: "passo-a-passo",
        h2: "Passo a passo: rapar a cabeça sem cortes",
        html: "<ol class=\"rich-list\"><li><strong>Cabelo comprido? Máquina primeiro.</strong> Um shaver não foi feito para cabelo de vários centímetros. Corta tudo curto com a máquina sem pente.</li><li><strong>Rapa no duche ou logo a seguir.</strong> A água quente amacia o cabelo e a pele.</li><li><strong>Movimentos circulares e lentos</strong>, contra o crescimento do cabelo, sem pressionar.</li><li><strong>Nuca e atrás das orelhas no fim</strong>, com a cabeça inclinada e a pele esticada com a mão livre.</li><li><strong>Passa a mão</strong> para encontrar zonas que escaparam — sentem-se melhor do que se veem.</li><li><strong>Hidrata</strong> com um creme sem perfume e, se fores sair, <strong>protetor solar</strong>: a pele da cabeça fica exposta ao sol.</li></ol>"
      },
      {
        h2: "Careca com barba: o que resulta",
        html: "<p>A barba é o que dá estrutura a um rosto com a cabeça rapada. Em geral, resulta melhor <strong>curta a média e bem delineada</strong>: linhas limpas no pescoço e nas bochechas, e um comprimento que não compita com a cabeça. Uma barba muito comprida e descuidada desequilibra; uma barba de três dias com a cabeça lisa cria contraste.</p><p>Para a manter, um aparador com muitos comprimentos, como o <a href=\"../../produto/braun-bt5525-series-5/\">Braun BT5525</a>, e o método em <a href=\"../../revista/como-aparar-a-barba-em-casa/\">como aparar a barba em casa</a>. Para a forma certa para o teu rosto, um barbeiro vê em minutos — encontra um no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.</p>"
      }
    ],
    faq: [
      ["Qual é o melhor shaver para careca?", "Um shaver de cabeça com cabeça flexível, pega fácil de segurar e corpo à prova de água. A nossa escolha é o Philips Série 7000 Pro (HS7980/15), com cabeça flexível a 360° e até 90 minutos de bateria."],
      ["É melhor rapar a cabeça com shaver ou com máquina?", "Com shaver se queres a cabeça lisa; com máquina sem pente se preferes uma sombra de cabelo. A máquina é mais rápida e irrita menos."],
      ["De quanto em quanto tempo se rapa a cabeça?", "Para a manter lisa, a cada um a três dias. Com sombra, uma vez por semana costuma chegar."],
      ["Que barba fica bem a um careca?", "Em geral, uma barba curta a média e bem delineada, que dá estrutura ao rosto sem competir com a cabeça."]
    ],
    faqCta: "Preferes que seja um barbeiro a fazer a primeira vez? Encontra um perto de ti no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["buzz-cut-corte-militar-que-numero-pedir", "como-aparar-a-barba-em-casa", "melhor-maquina-de-barbear-eletrica-qual-escolher"],
    finalCta: {
      h2: "Lisa ou com sombra, sem cortes",
      text: "Escolhe primeiro o acabamento; a ferramenta vem a seguir.",
      actions: [["../../produto/philips-hs7980-head-shaver/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver shavers"]]
    }
  },
  {
    slug: "melhor-maquina-de-barbear-eletrica-qual-escolher",
    category: "guias-de-compra",
    published: "2026-10-10",
    title: "Máquina de barbear elétrica: qual escolher, rotativa ou de lâminas?",
    h1: "Que máquina de barbear elétrica escolher: rotativa ou de lâminas?",
    description: "Rotativa ou de lâminas, a seco ou no duche: como escolher uma máquina de barbear elétrica, a nossa escolha para cada caso e quando faz sentido um OneBlade.",
    schemaDescription: "Rotativa ou de lâminas: como escolher uma máquina de barbear elétrica, o que procurar e a nossa escolha para cada caso.",
    image: "imagens/revista/barbear-espelho-casa-de-banho.jpg",
    imageAlt: "Homem a fazer a barba em frente a um espelho redondo na casa de banho",
    readMinutes: 6,
    criteria: CRIT,
    lede: "A máquina de barbear elétrica tem fama de barbear pior do que a lâmina. É meia verdade: barbeia um pouco menos rente — e em troca não corta, não pede espuma e faz-se em três minutos, até no carro.",
    subcopy: "A escolha certa começa numa pergunta que quase ninguém faz na loja: rotativa ou de lâminas? Aqui está a diferença, o que procurar e o que recomendamos.",
    heroActions: [["#rotativa-ou-laminas", "Rotativa ou de lâminas"], ["#produtos-recomendados", "Ver as escolhas"]],
    quick: [
      ["Rotativa ou de lâminas?", "Rotativa para quem barbeia em movimentos circulares e tem barba em várias direções. De lâminas (rede) para movimentos retos e barba densa."],
      ["Barbeia tão rente como a lâmina?", "Um pouco menos, mas sem cortes e sem espuma. Para a maioria das pessoas, a diferença não se vê ao fim do dia."],
      ["A seco ou no duche?", "As máquinas à prova de água fazem as duas coisas. Com pele sensível, muita gente prefere com gel, no duche."],
      ["E a pele irrita?", "Nas primeiras semanas pode irritar um pouco: dá-lhe duas ou três semanas antes de desistir."]
    ],
    summary: [
      "Máquina de barbear deixa rente; aparador deixa comprimento",
      "Rotativa: movimentos circulares, segue os contornos",
      "Lâminas de rede: movimentos retos, boa em barba densa",
      "Cabeça flexível e uso a seco e no duche",
      "Aparador de patilhas integrado faz falta",
      "Duas ou três semanas para a pele se habituar"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Máquinas de barbear",
      text: "Rotativas e de lâminas, com o que cada uma faz bem e para quem não é.",
      actions: [["../../produto/philips-s5465-series-5000/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver todas"]]
    },
    sections: [
      {
        h2: "Máquina de barbear não é aparador",
        html: "<p>Uma <strong>máquina de barbear</strong> corta rente à pele, como a lâmina: é para quem quer a cara lisa. Um <strong>aparador</strong> deixa comprimento: é para quem tem barba. Muita gente compra um a pensar no outro. Se tens dúvidas, a diferença está explicada em <a href=\"../../revista/trimmer-vs-shaver-diferencas-reais/\">trimmer ou shaver</a>.</p>"
      },
      {
        id: "rotativa-ou-laminas",
        h2: "Rotativa ou de lâminas: a diferença que interessa",
        html: "<ul class=\"rich-list\"><li><strong>Rotativa</strong> — três ou quatro cabeças circulares com lâminas que giram. Usa-se em <strong>pequenos círculos</strong>. As cabeças inclinam-se e seguem os contornos do queixo e do pescoço, e lidam bem com barba que cresce em várias direções.</li><li><strong>De lâminas (rede ou foil)</strong> — lâminas oscilantes por baixo de uma rede fina. Usa-se em <strong>movimentos retos</strong>, para cima e para baixo. Em geral, faz um barbear mais rente nas zonas planas e dá-se bem com barba densa.</li></ul><p>Não há uma melhor do que a outra: há a que encaixa na forma como barbeias. Se já usaste uma e gostaste, fica no mesmo tipo — a pele habitua-se.</p>"
      },
      {
        h2: "O que procurar",
        html: "<ul class=\"rich-list\"><li><strong>Cabeça flexível.</strong> Tem de seguir o rosto sem teres de pressionar — pressão é irritação.</li><li><strong>A seco e no duche.</strong> 100% à prova de água dá-te as duas opções e lava-se debaixo da torneira.</li><li><strong>Aparador de patilhas.</strong> Para bigode e patilhas, sem precisar de outra máquina.</li><li><strong>Bateria e carregamento rápido.</strong> Cinco minutos de carga para um barbear salvam muitas manhãs.</li><li><strong>Peças de substituição.</strong> As cabeças gastam-se; confirma que a marca as vende.</li></ul>"
      },
      {
        id: "a-nossa-escolha",
        h2: "A nossa escolha: Philips Série 5000 (rotativa)",
        html: "<p>Para a maioria, recomendamos a <a href=\"../../produto/philips-s5465-series-5000/\">Philips Série 5000 S5465/18</a>. Tem <strong>27 lâminas autoafiáveis</strong>, <strong>cabeças flexíveis a 360°</strong>, um <strong>aparador de encaixar</strong> para bigode e patilhas, é 100% à prova de água e dá até 50 minutos de bateria.</p><p>O que tens de saber: é rotativa. Se preferes movimentos retos, vê a seguinte. E não substitui um aparador para barba comprida.</p>" + amz("B0CFY7R1GX", "philips-s5465-series-5000")
      },
      {
        h2: "Se preferes lâminas: Braun Series 5",
        html: "<p>A <a href=\"../../produto/braun-series5-51-b1000s/\">Braun Series 5 51-B1000s</a> é de lâminas de rede, com <strong>3 lâminas flexíveis</strong> que se adaptam ao rosto e a tecnologia <strong>AutoSense</strong>, que ajusta a potência à densidade da barba. É 100% à prova de água e tem carregamento rápido de 5 minutos para um barbear.</p>" + amz("B0B3JBYXG8", "braun-series5-51-b1000s")
      },
      {
        h2: "Primeira máquina, sem gastar muito: Philips X3000",
        html: "<p>Se vens da lâmina e queres experimentar, a <a href=\"../../produto/philips-x3053-series-3000/\">Philips Série X3000 X3053/00</a> é uma rotativa de entrada com tecnologia <strong>SkinProtect</strong>, 27 lâminas PowerCut autoafiáveis e cabeças que fletem em quatro direções. Barbeia a seco ou no duche e tem aparador de patilhas. Carrega por USB-A e não traz adaptador de corrente.</p>" + amz("B0CHMN6377", "philips-x3053-series-3000")
      },
      {
        h2: "Pele sensível: como não desistir na primeira semana",
        html: "<ul class=\"rich-list\"><li><strong>Dá-lhe tempo.</strong> Nas primeiras duas ou três semanas a pele e a barba estão a habituar-se a um método novo.</li><li><strong>Não pressiones.</strong> Deixa a cabeça da máquina trabalhar.</li><li><strong>A seco, pele bem seca.</strong> No duche, com gel ou espuma.</li><li><strong>Limpa a máquina</strong> depois de cada uso.</li></ul><p>Mais em <a href=\"../../revista/como-reduzir-irritacao-ao-fazer-a-barba/\">como reduzir a irritação ao fazer a barba</a>.</p>"
      },
      {
        h2: "E o OneBlade?",
        html: "<p>O OneBlade não é uma máquina de barbear no sentido clássico: apara, faz contornos e rapa, mas não deixa a pele tão lisa como uma máquina de lâminas. É ótimo para quem anda sempre com barba de poucos dias. Está tudo em <a href=\"../../revista/qual-oneblade-comprar/\">qual OneBlade comprar</a>.</p>"
      }
    ],
    faq: [
      ["Qual é a melhor máquina de barbear elétrica?", "Depende de como barbeias. Para a maioria, uma rotativa com cabeças flexíveis, como a Philips Série 5000 S5465/18; para quem prefere movimentos retos e tem barba densa, uma de lâminas como a Braun Series 5."],
      ["Qual é a diferença entre máquina de barbear rotativa e de lâminas?", "A rotativa tem cabeças circulares e usa-se em pequenos círculos; a de lâminas tem uma rede fina e usa-se em movimentos retos. A rotativa segue melhor os contornos; a de lâminas costuma barbear mais rente nas zonas planas."],
      ["A máquina de barbear elétrica irrita a pele?", "Pode irritar nas primeiras semanas, enquanto a pele se habitua. Não pressionar e dar-lhe duas ou três semanas costuma resolver."],
      ["Posso usar a máquina de barbear no duche?", "Se for 100% à prova de água, sim — e com gel ou espuma costuma irritar menos."]
    ],
    faqCta: "Preferes um barbear clássico, feito por um profissional? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["trimmer-vs-shaver-diferencas-reais", "como-reduzir-irritacao-ao-fazer-a-barba", "qual-oneblade-comprar"],
    finalCta: {
      h2: "Escolhe o tipo, depois o modelo",
      text: "Rotativa se barbeias em círculos, de lâminas se barbeias a direito.",
      actions: [["../../produto/philips-s5465-series-5000/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver máquinas de barbear"]]
    }
  },
  {
    slug: "qual-oneblade-comprar",
    category: "guias-de-compra",
    published: "2026-10-10",
    title: "Qual OneBlade comprar? 360 ou Pro, e quando trocar a lâmina",
    h1: "Qual OneBlade comprar (e quando trocar a lâmina)",
    description: "OneBlade 360 ou Pro 360? Qual comprar, a diferença para o Bodygroom, como usar sem irritar e quando trocar a lâmina — com as lâminas originais certas.",
    schemaDescription: "OneBlade 360 ou Pro 360: qual comprar, a diferença para o Bodygroom, como usar e quando trocar a lâmina.",
    image: "imagens/revista/perfil-barba-preto-branco.jpg",
    imageAlt: "Perfil a preto e branco de um homem com barba curta",
    readMinutes: 5,
    criteria: CRIT,
    lede: "O OneBlade é o aparelho que mais gente compra sem saber bem para que serve. Não é uma máquina de barbear, não é um aparador clássico — e é precisamente por isso que resolve a barba de poucos dias melhor do que os dois.",
    subcopy: "Aqui está qual comprar, quando faz mais sentido um Bodygroom, como o usar sem irritar e o sinal de que a lâmina pede reforma.",
    heroActions: [["#qual-comprar", "Qual comprar"], ["#trocar-a-lamina", "Quando trocar a lâmina"]],
    quick: [
      ["OneBlade 360 ou Pro 360?", "O 360 para barba curta e de poucos dias. O Pro 360 se a tua barba varia de comprimento ou se também queres tratar do corpo."],
      ["OneBlade ou Bodygroom?", "OneBlade para o rosto (o Pro também faz corpo). Bodygroom para o corpo, incluindo zonas íntimas, com proteção da pele própria."],
      ["Quando trocar a lâmina?", "Quando começa a puxar, a deixar pelos ou a irritar. A Philips indica até 4 meses por lâmina."],
      ["As lâminas servem em todos?", "As lâminas originais OneBlade 360 encaixam em todos os OneBlade e OneBlade Pro."]
    ],
    summary: [
      "Apara, contorna e rapa — não deixa a pele lisa como uma máquina de lâminas",
      "360 para barba curta; Pro 360 para comprimentos variados e corpo",
      "Bodygroom para o corpo e zonas íntimas",
      "Contra o crescimento, sem pressionar",
      "Troca a lâmina quando puxa ou irrita",
      "Lâminas originais: encaixam em todos os modelos"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "OneBlade e lâminas",
      text: "Os dois OneBlade da loja e as lâminas originais de substituição.",
      actions: [["../../produto/philips-oneblade-360-qp2724/", "Ver o OneBlade 360"], ["../../produto/philips-oneblade-laminas-360/", "Ver as lâminas"]]
    },
    sections: [
      {
        h2: "O que é o OneBlade (e o que não é)",
        html: "<p>O OneBlade tem uma única lâmina com pontas arredondadas que corre de um lado para o outro muito depressa. Serve para três coisas: <strong>aparar</strong> com os pentes, <strong>fazer contornos</strong> com a ponta da lâmina e <strong>rapar</strong> sem pente.</p><p>O que não é: uma máquina de barbear rente. Rapa, mas não deixa a pele tão lisa como uma máquina de lâminas de rede. E não serve para cortar o cabelo. Se queres a cara lisa todos os dias, vê <a href=\"../../revista/melhor-maquina-de-barbear-eletrica-qual-escolher/\">que máquina de barbear escolher</a>.</p>"
      },
      {
        id: "qual-comprar",
        h2: "OneBlade 360 ou OneBlade Pro 360",
        html: "<p>O <a href=\"../../produto/philips-oneblade-360-qp2724/\">OneBlade 360 (QP2724)</a> é o ponto de partida: lâmina <strong>360 que se inclina em todas as direções</strong>, <strong>duas lâminas incluídas</strong> (até 4 meses cada, segundo a Philips), pentes curtos para barba de poucos dias e corpo 100% à prova de água. A bateria é de cerca de 45 minutos.</p>" + amz("B0DCFP3Z14", "philips-oneblade-360-qp2724") + "<p>O <a href=\"../../produto/philips-oneblade-pro-360/\">OneBlade Pro 360</a> acrescenta um <strong>pente de 20 comprimentos</strong> e serve para <strong>rosto e corpo</strong>. Faz sentido se a tua barba varia — curta numa semana, mais comprida na seguinte — ou se queres uma só ferramenta para tudo.</p><p><strong>A nossa regra:</strong> barba sempre curta, OneBlade 360. Barba que muda de comprimento ou corpo também, Pro 360.</p>"
      },
      {
        h2: "OneBlade ou Bodygroom?",
        html: "<p>É uma dúvida frequente. O OneBlade foi pensado para o rosto (o Pro estende-se ao corpo). Um aparador corporal como o <a href=\"../../produto/philips-bodygroom-bg3480/\">Philips Body Groomer Série 3000</a> foi pensado para o corpo, <strong>incluindo as zonas íntimas</strong>, com um sistema de proteção da pele próprio para isso. Se o corpo é a prioridade, o Bodygroom; se é a cara, o OneBlade. Mais em <a href=\"../../revista/aparador-corporal-masculino-qual-escolher/\">aparador corporal: qual escolher</a>.</p>"
      },
      {
        h2: "Como usar sem irritar",
        html: "<ol class=\"rich-list\"><li><strong>Aparar:</strong> encaixa o pente e passa contra o crescimento da barba, em movimentos lentos.</li><li><strong>Contornos:</strong> sem pente, usa a <strong>ponta</strong> da lâmina para as linhas do pescoço, das bochechas e do bigode.</li><li><strong>Rapar:</strong> sem pente, movimentos longos contra o crescimento, sem pressionar — deixa a lâmina flutuar.</li><li><strong>Lava</strong> debaixo da torneira no fim.</li></ol><p>Se a pele irrita, o mais comum é pressão a mais ou lâmina gasta. Vê <a href=\"../../revista/como-aparar-a-barba-em-casa/\">como aparar a barba em casa</a>.</p>"
      },
      {
        id: "trocar-a-lamina",
        h2: "Quando trocar a lâmina",
        html: "<p>A lâmina do OneBlade não se afia: gasta-se. Os sinais de que está na altura:</p><ul class=\"rich-list\"><li>começa a <strong>puxar</strong> os pelos em vez de os cortar;</li><li>precisas de <strong>passar várias vezes</strong> no mesmo sítio;</li><li>a pele <strong>irrita</strong> mais do que no início.</li></ul><p>A Philips indica até 4 meses por lâmina, mas depende da barba e do uso. As <a href=\"../../produto/philips-oneblade-laminas-360/\">lâminas originais OneBlade 360</a> vêm em pack de 3 e encaixam em todos os OneBlade e OneBlade Pro. Há lâminas «compatíveis» de outras marcas; nós recomendamos as originais, que a Philips indica para todos os modelos.</p>" + amz("B0CVXRFT15", "philips-oneblade-laminas-360")
      }
    ],
    faq: [
      ["Qual OneBlade devo comprar?", "O OneBlade 360 para barba curta e de poucos dias. O OneBlade Pro 360 se a tua barba varia de comprimento ou se também queres tratar do corpo, graças ao pente de 20 comprimentos."],
      ["Qual é melhor, OneBlade ou Bodygroom?", "Depende da zona: o OneBlade foi pensado para o rosto (o Pro também faz corpo); o Bodygroom para o corpo, incluindo zonas íntimas, com proteção da pele própria."],
      ["De quanto em quanto tempo se troca a lâmina do OneBlade?", "Quando começa a puxar, a deixar pelos ou a irritar. A Philips indica até 4 meses por lâmina, conforme a barba e o uso."],
      ["As lâminas OneBlade servem em todos os modelos?", "As lâminas originais OneBlade 360 encaixam em todos os OneBlade e OneBlade Pro."]
    ],
    faqCta: "Preferes que um barbeiro desenhe as linhas da barba da primeira vez? Encontra um no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["melhor-maquina-de-barbear-eletrica-qual-escolher", "aparador-corporal-masculino-qual-escolher", "como-aparar-a-barba-em-casa"],
    finalCta: {
      h2: "Um OneBlade, uma lâmina boa, e acabou",
      text: "Escolhe o modelo pela tua barba e troca a lâmina quando ela pedir.",
      actions: [["../../produto/philips-oneblade-360-qp2724/", "Ver o OneBlade 360"], ["../../produto/philips-oneblade-laminas-360/", "Ver as lâminas"]]
    }
  }
];
