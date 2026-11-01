// 2026-11-01 — duas máquinas de barbear de gama alta para o guia revista/melhor-maquina-de-barbear-eletrica-qual-escolher/.
// Escolhidas pela procura: Google Trends PT ("braun series" 11,6 → 24,8 em 12 meses) e sugestões do Google PT
// ("philips shaver 7000 vs 5000", "philips serie 9000 ou braun serie 9", "braun series 9 pro+…"). Amazon.es:
// S7887 "300+ comprados no mês passado"; Braun 9625S n.º 8 nas máquinas de lâminas. As duas vendidas e enviadas
// pela Amazon, em stock (confirmado a 2026-11-01). A 9510s (B0C5JS7JYK) ficou de fora: a oferta principal era
// de "Amazon Segunda mano".
// Só dados da ficha do fabricante na Amazon.es. Sem preços nem avaliações.
const GUIA = "melhor-maquina-de-barbear-eletrica-qual-escolher";

module.exports = [
  {
    slug: "philips-s7887-series-7000", name: "Philips Série 7000 S7887/35", brand: "Philips", asin: "B0BWKBKD9S",
    image: "imagens/produtos/philips-s7887.jpg", alt: "Máquina de barbear elétrica rotativa Philips Série 7000 S7887/35 cinzenta com estojo e base de carga",
    bestFor: "Rotativa de gama alta",
    summary: "Indicada para quem faz a barba todos os dias e quer subir da gama média: tem mais lâminas e um sensor que ajusta a potência à barba.",
    useCase: "Faz sentido como máquina principal, a seco ou no duche, também com barba de até 3 dias: as cabeças giram 360° e seguem o rosto sem teres de pressionar.",
    highlight: "Máquina de barbear rotativa da Philips com tecnologia SkinIQ, 45 lâminas autoafiáveis, cabeças flexíveis a 360° e um sensor que ajusta a potência à densidade da barba, segundo a marca.",
    strengths: ["45 lâminas autoafiáveis, contra 27 da Série 5000", "sensor Power Adapt: lê a densidade da barba 250 vezes por segundo e ajusta a potência, segundo a marca", "100% à prova de água, com até 60 minutos de bateria e carga rápida de 5 minutos para um barbear"],
    limits: ["queres aparador na caixa: a lista não o inclui, e a Série 5000 traz um de encaixar para bigode e patilhas", "carrega por cabo USB-A e não traz adaptador de corrente"],
    categories: ["trimmers-e-shavers"],
    articles: [GUIA, "trimmer-vs-shaver-diferencas-reais"],
    related: ["philips-s5465-series-5000", "braun-series-9-pro-9625s", "philips-x3053-series-3000"]
  },
  {
    slug: "braun-series-9-pro-9625s", name: "Braun Series 9 Pro+ 9625S", brand: "Braun", asin: "B08F7SSPWF",
    image: "imagens/produtos/braun-series9-pro-9625s.jpg", alt: "Máquina de barbear elétrica de lâminas Braun Series 9 Pro+ 9625S cinzenta com estojo de carga PowerCase",
    bestFor: "Lâminas, gama de topo",
    summary: "Indicada para quem prefere lâminas de rede, barbeia todos os dias e tem barba dura ou densa: é a gama mais alta da Braun, por isso só compensa com uso diário.",
    useCase: "Faz sentido como máquina principal, a seco ou no duche: o aparador integrado trata do bigode e das patilhas, e o estojo PowerCase carrega-a fora de casa.",
    highlight: "Máquina de barbear de lâminas da Braun com 5 elementos de corte, aparador integrado, cabeça flexível a 40° e sensores que leem a barba 300 vezes por segundo, segundo a marca.",
    strengths: ["5 elementos de corte, incluindo 2 aparadores para os pelos difíceis", "Pro SensoAdapt: lê a densidade da barba 300 vezes por segundo e ajusta a potência, segundo a marca", "100% à prova de água, até 60 minutos de bateria e estojo PowerCase para carregar em viagem"],
    limits: ["não barbeias todos os dias: para a maioria, a Series 5 chega, e esta só compensa com barba densa e uso diário", "a tabela da Braun dá a esta versão PowerCase e base de carga, sem centro de limpeza, apesar do título da Amazon: se o queres, vê a 9665CCE"],
    categories: ["trimmers-e-shavers"],
    articles: [GUIA, "trimmer-vs-shaver-diferencas-reais"],
    related: ["braun-series5-51-b1000s", "philips-s7887-series-7000", "braun-series-3-310s"]
  }
];
