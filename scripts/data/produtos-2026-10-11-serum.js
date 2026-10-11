// 2026-10-11 — artigo serum-para-homem-para-que-serve (categoria Cuidados de rosto).
// Escolhidos pela procura (sugestões Google PT: para que serve, antes ou depois do creme, vitamina C,
// niacinamida, ácido hialurónico, retinol, pele oleosa/poros, manchas) e pelo ranking de Beleza da
// Amazon.es. Os 5 confirmados na Amazon.es a 2026-10-11: em stock, vendidos e enviados pela Amazon.
// Descartados: The Ordinary Niacinamide 10% + Zinc (não está à venda na Amazon.es) e L'Oréal Men Expert
// Power Age sérum (vendedor terceiro). Só características publicadas pelo fabricante.
const ARTICLE = "serum-para-homem-para-que-serve";

module.exports = [
  {
    slug: "the-ordinary-hyaluronic-acid-b5", name: "The Ordinary Hyaluronic Acid 2% + B5", brand: "The Ordinary", asin: "B01MYEZPC8",
    image: "imagens/produtos/the-ordinary-hyaluronic-acid.jpg", alt: "Frasco conta-gotas de sérum The Ordinary Hyaluronic Acid 2% + B5 com ceramidas",
    bestFor: "Hidratar, para começar",
    summary: "Indicado para quem quer começar pelo sérum mais simples: hidratação para pele que repuxa, sem riscos de irritação.",
    useCase: "Faz sentido de manhã e à noite: umas gotas na pele limpa e ainda húmida, antes do creme de rosto.",
    highlight: "Sérum hidratante com ácido hialurónico em vários tamanhos, provitamina B5 e ceramidas.",
    strengths: ["a marca promete hidratação imediata e duradoura", "com ceramidas e provitamina B5 para a barreira da pele", "serve todos os tipos de pele, de manhã e à noite"],
    limits: ["hidrata, mas não trata manchas nem poros", "em pele seca, precisa de um creme por cima"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["neutrogena-hydro-boost-niacinamida", "garnier-vitamina-c-serum", "the-ordinary-granactive-retinoid"]
  },
  {
    slug: "neutrogena-hydro-boost-niacinamida", name: "Neutrogena Hydro Boost Sérum 10% Niacinamida", brand: "Neutrogena", asin: "B0DR8X7HCB",
    image: "imagens/produtos/neutrogena-hydro-boost-niacinamida.jpg", alt: "Frasco do sérum Neutrogena Hydro Boost com 10% de niacinamida, 30 ml",
    bestFor: "Pele oleosa e poros",
    summary: "Indicado para quem tem poros visíveis e textura irregular e quer um sérum que hidrata sem pesar.",
    useCase: "Faz sentido de manhã ou à noite, depois de lavar a cara: algumas gotas espalhadas antes do creme ou do protetor solar.",
    highlight: "Sérum com 10% de niacinamida e ácido hialurónico, sem perfume, em 30 ml.",
    strengths: ["a marca diz que reduz visivelmente o aspeto dos poros", "10% de niacinamida para a textura e o tom", "sem perfume e para todos os tipos de pele"],
    limits: ["não substitui o creme em pele seca", "poros não fecham: o que melhora é o aspeto"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["the-ordinary-hyaluronic-acid-b5", "cerave-oil-control-gel", "la-roche-posay-anthelios-oil-control"]
  },
  {
    slug: "garnier-vitamina-c-serum", name: "Garnier Vitamina C Sérum Antimanchas", brand: "Garnier", asin: "B09BD7L35V",
    image: "imagens/produtos/garnier-vitamina-c-serum.jpg", alt: "Frasco do sérum antimanchas Garnier com vitamina C, 30 ml",
    bestFor: "Manchas e pele baça",
    summary: "Indicado para quem tem manchas do sol ou marcas de borbulhas e quer uma pele com o tom mais uniforme.",
    useCase: "Faz sentido de manhã, sempre seguido de protetor solar: sem proteção, as manchas voltam.",
    highlight: "Sérum antimanchas com derivado de vitamina C, niacinamida e ácido salicílico, de textura leve, em 30 ml.",
    strengths: ["a marca diz que reduz visivelmente as manchas escuras e dá luminosidade", "junta vitamina C, niacinamida e ácido salicílico", "textura leve, de absorção rápida"],
    limits: ["a marca pede para evitar o contorno dos olhos", "sem protetor solar todos os dias, as manchas voltam"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["loreal-men-expert-serum-vitamina-c", "isdin-fusion-water-magic-spf50", "the-ordinary-hyaluronic-acid-b5"]
  },
  {
    slug: "loreal-men-expert-serum-vitamina-c", name: "L'Oréal Men Expert Hydra Energetic Sérum Vitamina C", brand: "L'Oréal Paris", asin: "B0CVL89BTY",
    image: "imagens/produtos/loreal-men-expert-serum-vitamina-c.jpg", alt: "Frasco do sérum L'Oréal Men Expert Hydra Energetic com 10% de vitamina C, 30 ml",
    bestFor: "Vitamina C, marca de homem",
    summary: "Indicado para quem tem a pele baça e com ar cansado e prefere um sérum de uma marca de homem.",
    useCase: "Faz sentido de manhã e à noite antes do creme: três gotas na palma, esfrega as mãos e aplica no rosto, como indica a marca.",
    highlight: "Sérum com vitamina C pura a 10%, pensado para a pele dos homens, em 30 ml.",
    strengths: ["vitamina C pura a 10%, segundo a marca", "a marca promete pele mais luminosa e poros menos visíveis", "modo de aplicação simples, com as mãos"],
    limits: ["de dia, precisa de protetor solar por cima", "para manchas marcadas, o Garnier junta mais ativos"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["garnier-vitamina-c-serum", "loreal-men-expert-hydra-energetic", "the-ordinary-hyaluronic-acid-b5"]
  },
  {
    slug: "the-ordinary-granactive-retinoid", name: "The Ordinary Granactive Retinoid 2% Emulsion", brand: "The Ordinary", asin: "B071HHSMTT",
    image: "imagens/produtos/the-ordinary-granactive-retinoid.jpg", alt: "Frasco conta-gotas de The Ordinary Granactive Retinoid 2% Emulsion",
    bestFor: "Rugas, à noite",
    summary: "Indicado para quem quer começar um retinoide para as rugas finas, com uma fórmula pensada para ser mais suave.",
    useCase: "Faz sentido só à noite, duas ou três vezes por semana no início: umas gotas na pele seca, antes do creme de rosto.",
    highlight: "Emulsão com retinoide (Granactive Retinoid) a 2%, com esqualano e bisabolol, sem perfume.",
    strengths: ["a marca apresenta-o como alternativa mais suave ao retinol", "reduz o aspeto de linhas finas e rugas, segundo a marca", "sem perfume, com esqualano para hidratar"],
    limits: ["só à noite, e com protetor solar todos os dias", "começa devagar: pode irritar nas primeiras semanas"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["the-ordinary-hyaluronic-acid-b5", "loreal-men-expert-power-age", "nivea-men-hyaluron-contorno-olhos"]
  }
];
