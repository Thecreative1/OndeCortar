// 2026-10-10 — máquinas de barbear elétricas, shavers de cabeça e lâminas OneBlade.
// Escolhidos pela procura (lacunas: "melhor máquina de barbear", "melhor shaver para careca",
// "oneblade lâminas") e pelo ranking da Amazon.es a 2026-10-10:
//   Philips S5465/18   n.º 1 em máquinas de barbear rotativas (vendido pela Amazon)
//   Philips X3053/00   n.º 2 em máquinas de barbear rotativas (vendido pela Amazon)
//   Braun Series 5     n.º 4 em aparadores de barba (vendido pela Amazon)
//   Philips HS7980/15  n.º 3 em máquinas de barbear rotativas (vendido pela Amazon)
//   Skull Shaver SX5   n.º 13 em máquinas de barbear rotativas (vendido por distribuidor)
//   OneBlade 360 x3    n.º 3 em máquinas de barbear elétricas (vendido pela Amazon)
// Factos das fichas da Amazon.es; sem preços, avaliações ou testes.
module.exports = [
  {
    slug: "philips-s5465-series-5000", name: "Philips Série 5000 S5465/18", brand: "Philips", asin: "B0CFY7R1GX",
    image: "imagens/produtos/philips-s5465.jpg", alt: "Máquina de barbear elétrica Philips Série 5000 S5465/18 azul com aparador, bolsa e caixa",
    bestFor: "Barbear rotativo",
    summary: "Indicada para quem quer fazer a barba todos os dias com uma máquina elétrica rotativa, a seco ou no duche, e aparar bigode e patilhas.",
    useCase: "Faz sentido como máquina de barbear principal: cabeças que giram 360° acompanham o rosto e o aparador de encaixar trata do bigode e das patilhas.",
    highlight: "Máquina de barbear rotativa da Philips com 27 lâminas autoafiáveis, cabeças flexíveis a 360°, aparador de encaixar e até 50 minutos de bateria.",
    strengths: ["27 lâminas autoafiáveis e cabeças flexíveis a 360°", "aparador de encaixar para bigode e patilhas", "100% à prova de água, com até 50 minutos de bateria"],
    limits: ["rotativa: quem prefere lâminas de rede deve ver a Braun Series 5", "não substitui um aparador para barba comprida"],
    categories: ["trimmers-e-shavers"],
    articles: ["melhor-maquina-de-barbear-eletrica-qual-escolher", "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-x3053-series-3000", "braun-series5-51-b1000s", "philips-oneblade-360-qp2724"]
  },
  {
    slug: "philips-x3053-series-3000", name: "Philips Série X3000 X3053/00", brand: "Philips", asin: "B0CHMN6377",
    image: "imagens/produtos/philips-x3053.jpg", alt: "Máquina de barbear elétrica Philips Série X3000 X3053/00 com tampa protetora e cabo USB",
    bestFor: "Primeira máquina de barbear",
    summary: "Indicada para quem quer experimentar uma máquina de barbear elétrica rotativa sem gastar numa gama alta, também para pele sensível.",
    useCase: "Faz sentido para passar da lâmina à máquina elétrica: barbeia a seco ou no duche e tem aparador para as patilhas.",
    highlight: "Máquina de barbear rotativa de entrada da Philips com tecnologia SkinProtect, 27 lâminas PowerCut autoafiáveis e cabeças que fletem em quatro direções.",
    strengths: ["tecnologia SkinProtect e 27 lâminas PowerCut autoafiáveis", "cabeças que fletem em quatro direções", "a seco ou no duche, com aparador de patilhas"],
    limits: ["carrega por USB-A e não traz adaptador de corrente", "menos funções do que a Série 5000"],
    categories: ["trimmers-e-shavers"],
    articles: ["melhor-maquina-de-barbear-eletrica-qual-escolher", "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-s5465-series-5000", "braun-series5-51-b1000s", "philips-oneblade-360-qp2724"]
  },
  {
    slug: "braun-series5-51-b1000s", name: "Braun Series 5 51-B1000s", brand: "Braun", asin: "B0B3JBYXG8",
    image: "imagens/produtos/braun-series5-51b1000s.jpg", alt: "Máquina de barbear elétrica de lâminas Braun Series 5 51-B1000s azul ao lado da caixa",
    bestFor: "Barbear com lâminas de rede",
    summary: "Indicada para quem prefere uma máquina de barbear de lâminas de rede (foil) e tem barba densa ou dura.",
    useCase: "Faz sentido para o barbear diário a seco ou no duche: as 3 lâminas flexíveis seguem o rosto e o AutoSense ajusta a potência à barba.",
    highlight: "Máquina de barbear de lâminas da Braun com 3 lâminas flexíveis, tecnologia AutoSense que adapta a potência à densidade da barba e limpeza EasyClean.",
    strengths: ["3 lâminas flexíveis que acompanham o rosto", "AutoSense adapta a potência à densidade da barba", "100% à prova de água, com carregamento rápido de 5 minutos"],
    limits: ["de lâminas de rede: quem prefere cabeças rotativas deve ver a Philips Série 5000", "não substitui um aparador para barba comprida"],
    categories: ["trimmers-e-shavers"],
    articles: ["melhor-maquina-de-barbear-eletrica-qual-escolher", "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-s5465-series-5000", "philips-x3053-series-3000", "braun-bt5525-series-5"]
  },
  {
    slug: "philips-hs7980-head-shaver", name: "Philips Head Shaver Série 7000 Pro HS7980/15", brand: "Philips", asin: "B0FJS72Z6H",
    image: "imagens/produtos/philips-hs7980.jpg", alt: "Shaver de cabeça Philips Série 7000 Pro HS7980/15 com estojo, base e caixa",
    bestFor: "Cabeça rapada",
    summary: "Indicado para quem rapa a cabeça e quer um acabamento rente com uma máquina pensada para o couro cabeludo.",
    useCase: "Faz sentido para manter a cabeça rapada em casa: a cabeça flexível a 360° acompanha a forma da cabeça e o sensor PowerAdapt ajusta a potência.",
    highlight: "Shaver de cabeça da Philips com cabeça flexível a 360°, 36 lâminas ComfortCut, sensor PowerAdapt e até 90 minutos de bateria.",
    strengths: ["cabeça flexível a 360° e 36 lâminas ComfortCut", "sensor PowerAdapt que ajusta a potência", "até 90 minutos de bateria, à prova de água IPX7, com estojo"],
    limits: ["feito para rapar rente: não deixa comprimento", "para cabelo comprido, passa primeiro a máquina"],
    categories: ["trimmers-e-shavers", "para-casa"],
    articles: ["como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "buzz-cut-corte-militar-que-numero-pedir"],
    related: ["skull-shaver-pitbull-sx5", "philips-hc5630-series-5000", "philips-s5465-series-5000"]
  },
  {
    slug: "skull-shaver-pitbull-sx5", name: "Skull Shaver Pitbull Silver Pro SX5", brand: "Skull Shaver", asin: "B0DT1Q3QTF",
    image: "imagens/produtos/skull-shaver-pitbull-sx5.jpg", alt: "Shaver de cabeça Skull Shaver Pitbull Silver Pro SX5 preto e prateado",
    bestFor: "Rapar a cabeça e o rosto",
    summary: "Indicado para quem rapa a cabeça com frequência e quer um shaver com pega de palma da mão, que também serve para o rosto.",
    useCase: "Faz sentido para quem rapa a cabeça com frequência: a pega ergonómica encaixa na mão e ajuda a chegar às zonas difíceis; usa-se a seco ou no duche.",
    highlight: "Shaver de cabeça e rosto da Skull Shaver com pega ergonómica patenteada, resistência à água IPX6 e bateria de iões de lítio.",
    strengths: ["pega ergonómica que encaixa na palma da mão", "resistente à água (IPX6), a seco ou no duche", "serve para cabeça e rosto"],
    limits: ["vendido por um distribuidor, não pela Amazon", "feito para rapar rente: não deixa comprimento"],
    categories: ["trimmers-e-shavers"],
    articles: ["como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "buzz-cut-corte-militar-que-numero-pedir"],
    related: ["philips-hs7980-head-shaver", "philips-hc5630-series-5000", "wahl-gold-travel-shaver"]
  },
  {
    slug: "philips-oneblade-laminas-360", name: "Lâminas Philips OneBlade 360 (3 unidades)", brand: "Philips", asin: "B0CVXRFT15",
    image: "imagens/produtos/oneblade-laminas-3.jpg", alt: "Três lâminas de substituição Philips OneBlade 360 ao lado da embalagem QP430",
    bestFor: "Lâminas de substituição",
    summary: "Indicadas para quem já tem um OneBlade e quer trocar a lâmina quando deixa de cortar como no início.",
    useCase: "Faz sentido ter em casa: são as lâminas originais 360, encaixam em todos os OneBlade e OneBlade Pro.",
    highlight: "Pack de 3 lâminas originais Philips OneBlade 360 em aço inoxidável, compatíveis com todos os OneBlade e OneBlade Pro.",
    strengths: ["lâminas originais, compatíveis com todos os OneBlade e Pro", "lâmina 360 que se inclina em todas as direções", "3 lâminas que, segundo a Philips, duram até 12 meses no total"],
    limits: ["só servem no OneBlade", "a duração depende do uso e da barba"],
    categories: ["trimmers-e-shavers", "manutencao-de-maquinas"],
    articles: ["qual-oneblade-comprar", "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-oneblade-360-qp2724", "philips-oneblade-pro-360", "shave-factory-clippercare"]
  }
];
