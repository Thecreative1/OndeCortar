// 2026-10-09 — 4 produtos novos escolhidos pela procura, não ao acaso:
// ranking de mais vendidos da Amazon.es (Beleza) e sugestões do Google em Portugal.
//   Panasonic ER-GN30   n.º 264 em Beleza, n.º 2 em aparadores faciais (55,9 mil avaliações)
//   Philips BG3480/15   n.º 94 em Beleza, n.º 1 em aparadores pessoais
//   Tesoura Candure     n.º 248 em Beleza, n.º 1 em tesouras de corte
//   GRIFEMA 200 ml      n.º 1 em equipamento de salão (n.º 295 em Beleza)
// Factos confirmados nas páginas da Amazon.es a 2026-10-09. Sem preços, avaliações ou
// alegações de teste (ver loja/como-escolhemos/).
module.exports = [
  {
    slug: "panasonic-er-gn30", name: "Panasonic ER-GN30 Aparador de Nariz e Orelhas", brand: "Panasonic", asin: "B0041R9NMO",
    image: "imagens/produtos/panasonic-er-gn30.jpg", alt: "Aparador de pelos do nariz e orelhas Panasonic ER-GN30 ao lado da caixa",
    bestFor: "Nariz, orelhas e sobrancelhas",
    summary: "Indicado para quem quer tirar os pelos do nariz e das orelhas, e acertar as sobrancelhas, sem pinça nem tesoura.",
    useCase: "Faz sentido como complemento ao aparador de barba: a lâmina curva de fio duplo corta pelos pequenos no nariz, nas orelhas e nas sobrancelhas, e lava-se debaixo da torneira.",
    highlight: "Aparador facial da Panasonic com lâmina de fio duplo em aço inoxidável hipoalergénico, que corta pelos dos lados e de cima, e se usa a seco ou molhado.",
    strengths: ["lâmina curva de fio duplo que corta dos lados e de cima", "lâminas hipoalergénicas em aço inoxidável", "à prova de água, lava-se sem tirar a cabeça (sistema Vortex)"],
    limits: ["funciona com uma pilha AA, não é recarregável", "só para pelos pequenos: não apara barba nem cabelo"],
    categories: ["trimmers-e-shavers", "para-casa"],
    articles: ["aparador-de-pelos-do-nariz-qual-escolher", "como-aparar-as-sobrancelhas-homem"],
    related: ["solati-aparador", "philips-oneblade-360-qp2724", "braun-aio7545-series-7"]
  },
  {
    slug: "philips-bodygroom-bg3480", name: "Philips Body Groomer Série 3000 BG3480/15", brand: "Philips", asin: "B0FJM3MZ9T",
    image: "imagens/produtos/philips-bg3480.jpg", alt: "Aparador corporal Philips Body Groomer Série 3000 BG3480/15 com dois pentes e a caixa",
    bestFor: "Pelos do corpo",
    summary: "Indicado para quem quer aparar ou rapar os pelos do corpo, incluindo zonas íntimas, com uma máquina pensada para pele sensível.",
    useCase: "Faz sentido como máquina separada da de barba: corta rente com a cabeça de barbear ou deixa 2 a 3 mm com os pentes, a seco ou no duche.",
    highlight: "Aparador corporal da Philips com sistema de proteção da pele (pontas arredondadas, lâmina hipoalergénica e protetor), 100% à prova de água e até 80 minutos de bateria.",
    strengths: ["sistema de proteção da pele, também para zonas íntimas", "100% à prova de água: usa-se a seco ou no duche", "até 80 minutos de bateria de lítio"],
    limits: ["carrega por USB-A e não traz adaptador de corrente", "pentes só de 2 e 3 mm"],
    categories: ["trimmers-e-shavers"],
    articles: ["aparador-corporal-masculino-qual-escolher", "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-oneblade-360-qp2724", "philips-oneblade-pro-360", "braun-series-5-aio5545"]
  },
  {
    slug: "candure-tesoura-cabeleireiro", name: "Tesoura de Cabeleireiro Candure 6,5\"", brand: "Candure", asin: "B00CP3EA5G",
    image: "imagens/produtos/candure-tesoura.jpg", alt: "Tesoura de cabeleireiro Candure de 6,5 polegadas em aço inoxidável com anéis amovíveis para os dedos",
    bestFor: "Corte à tesoura",
    summary: "Indicada para quem corta cabelo em casa e quer trabalhar o topo ou acertar pontas, e para barbeiros que querem uma tesoura de reserva.",
    useCase: "Faz sentido ao lado da máquina: a máquina faz as laterais e a tesoura trata do topo e dos acabamentos, com o cabelo húmido ou seco.",
    highlight: "Tesoura de 6,5 polegadas em aço inoxidável, com fio convexo e anéis amovíveis para ajustar aos dedos.",
    strengths: ["aço inoxidável, com fio convexo para um corte suave", "anéis amovíveis para ajustar aos dedos", "serve para cabelo húmido ou seco"],
    limits: ["vendida por um vendedor externo, não pela Amazon", "cortar à tesoura pede mais prática do que a máquina"],
    categories: ["acessorios-de-barbeiro", "para-casa"],
    articles: ["como-cortar-cabelo-masculino-com-tesoura-em-casa", "como-cortar-o-cabelo-em-casa-com-maquina"],
    related: ["remington-colourcut-hc5035", "ecence-capa-corte", "charlemagne-pente"]
  },
  {
    slug: "grifema-pulverizador-agua", name: "GRIFEMA Pulverizador de Água 200 ml", brand: "GRIFEMA", asin: "B0DXTLWVBL",
    image: "imagens/produtos/grifema-pulverizador.jpg", alt: "Pulverizador de água GRIFEMA de 200 ml, branco e transparente",
    bestFor: "Borrifar durante o corte",
    summary: "Indicado para barbeiros e para quem corta em casa e quer humedecer o cabelo de forma uniforme durante o corte.",
    useCase: "Faz sentido no posto de trabalho ou na casa de banho: a névoa fina humedece o cabelo sem o encharcar, para pentear e cortar à tesoura.",
    highlight: "Pulverizador reutilizável de 200 ml com névoa fina e uniforme, e abertura larga para encher sem derramar.",
    strengths: ["névoa fina e uniforme", "abertura larga para encher sem derramar", "reutilizável, leve e fácil de lavar"],
    limits: ["200 ml: é para borrifar, não para grandes volumes", "o fabricante recomenda água filtrada para a névoa se manter uniforme"],
    categories: ["acessorios-de-barbeiro", "para-barbeiros"],
    articles: ["como-cortar-cabelo-masculino-com-tesoura-em-casa", "o-que-um-barbeiro-precisa-no-posto-de-trabalho"],
    related: ["uraqt-capa", "eurostil-rolos", "barbicide-desinfetante-pulverizador"]
  }
];
