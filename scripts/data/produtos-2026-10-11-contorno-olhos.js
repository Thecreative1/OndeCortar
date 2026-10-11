// 2026-10-11 — artigo contorno-de-olhos-para-homem-olheiras-e-papos (categoria Cuidados de rosto).
// Escolhidos pela procura (sugestões Google PT: olheiras, papos ao acordar, cafeína, anti-rugas, CeraVe)
// e pelo ranking de Beleza da Amazon.es. Os 4 confirmados na Amazon.es a 2026-10-11: em stock,
// vendidos e enviados pela Amazon. Descartados: ISDIN e Neutrogena (vendedores terceiros) e o roll-on
// L'Oréal B00B7G3IV4 (sem stock). Só características publicadas pelo fabricante.
const ARTICLE = "contorno-de-olhos-para-homem-olheiras-e-papos";

module.exports = [
  {
    slug: "cerave-contorno-olhos", name: "CeraVe Creme Reparador Contorno de Olhos", brand: "CeraVe", asin: "B07C5T3DKW",
    image: "imagens/produtos/cerave-contorno-olhos.jpg", alt: "Tubo do creme reparador de contorno de olhos CeraVe de 14 ml",
    bestFor: "Contorno para todos os dias",
    summary: "Indicado para quem quer um contorno de olhos simples para a pele fina e seca à volta dos olhos, com olheiras e papos ligeiros.",
    useCase: "Faz sentido de manhã e à noite: uma quantidade do tamanho de um grão de arroz para os dois olhos, aplicada com toques no osso à volta do olho.",
    highlight: "Creme para o contorno dos olhos com ácido hialurónico, niacinamida e ceramidas, em tubo de 14 ml.",
    strengths: ["a marca indica-o para olheiras e papos e para reparar a barreira da pele", "com ácido hialurónico, niacinamida e ceramidas", "para usar de manhã e/ou à noite"],
    limits: ["não muda olheiras de origem genética ou papos de gordura", "tubo de 14 ml: rende, mas é pequeno"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE, "creme-de-rosto-para-homem-como-escolher"],
    related: ["the-ordinary-caffeine-solution", "nivea-men-hyaluron-contorno-olhos", "loreal-men-expert-roll-on-olhos"]
  },
  {
    slug: "the-ordinary-caffeine-solution", name: "The Ordinary Caffeine Solution 5% + EGCG", brand: "The Ordinary", asin: "B09N6Z61GL",
    image: "imagens/produtos/the-ordinary-caffeine-solution.jpg", alt: "Frasco conta-gotas de sérum The Ordinary Caffeine Solution 5% + EGCG de 30 ml",
    bestFor: "Papos e olhos cansados",
    summary: "Indicado para quem acorda com os olhos inchados e quer um sérum leve com cafeína para usar de manhã.",
    useCase: "Faz sentido de manhã (e à noite, se quiseres): umas gotas espalhadas com toques à volta dos olhos, antes do creme de rosto.",
    highlight: "Sérum aquoso para o contorno dos olhos com cafeína a 5% e EGCG, com ácido hialurónico, em frasco conta-gotas de 30 ml.",
    strengths: ["a marca diz que reduz visivelmente o inchaço e as olheiras", "sérum aquoso, leve, para todo o tipo de pele", "frasco de 30 ml, o dobro dos contornos em creme"],
    limits: ["a marca pede um teste numa pequena zona antes do primeiro uso", "é um sérum: em pele muito seca, junta um creme por cima"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["loreal-men-expert-roll-on-olhos", "cerave-contorno-olhos", "nivea-men-hyaluron-contorno-olhos"]
  },
  {
    slug: "nivea-men-hyaluron-contorno-olhos", name: "NIVEA MEN Hyaluron Contorno de Olhos", brand: "NIVEA MEN", asin: "B08RQCYYWY",
    image: "imagens/produtos/nivea-men-hyaluron-contorno-olhos.jpg", alt: "Embalagem e tubo do creme NIVEA MEN Hyaluron Contorno de Olhos de 15 ml",
    bestFor: "Rugas, a partir dos 40",
    summary: "Indicado para quem começa a ver rugas à volta dos olhos e quer um contorno anti-idade de uma marca de homem.",
    useCase: "Faz sentido à noite, ou de manhã e à noite: uma pequena quantidade com toques nos pés de galinha e por baixo dos olhos.",
    highlight: "Creme anti-idade para o contorno dos olhos com ácido hialurónico, pensado para pele madura e cansada, em 15 ml.",
    strengths: ["a marca diz que reduz visivelmente as rugas do contorno dos olhos", "com ácido hialurónico e hidratação de 24 horas, segundo a marca", "absorção rápida, sem sensação gordurosa"],
    limits: ["suaviza o aspeto das rugas, não as apaga", "de dia, a pele à volta dos olhos também precisa de protetor solar"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["cerave-contorno-olhos", "loreal-men-expert-power-age", "the-ordinary-caffeine-solution"]
  },
  {
    slug: "loreal-men-expert-roll-on-olhos", name: "L'Oréal Men Expert Hydra Energetic Roll-On Olhos", brand: "L'Oréal Paris", asin: "B00I989OSO",
    image: "imagens/produtos/loreal-men-expert-roll-on-olhos.jpg", alt: "Roll-on para os olhos L'Oréal Men Expert Hydra Energetic de 10 ml",
    bestFor: "Manhãs de noite curta",
    summary: "Indicado para quem quer um gesto rápido de manhã depois de uma noite mal dormida, sem pôr creme com os dedos.",
    useCase: "Faz sentido de manhã: passa-se a esfera por baixo dos olhos, do canto interior para fora, e deixa-se secar.",
    highlight: "Roll-on para o contorno dos olhos com extrato de guaraná e vitamina C e esfera de efeito gelo, em 10 ml.",
    strengths: ["esfera de efeito gelo, segundo a marca, para olhos inchados de manhã", "aplica-se sem dedos, em poucos segundos", "com extrato de guaraná e vitamina C"],
    limits: ["10 ml: dura menos do que um tubo de creme", "o efeito frio alivia o inchaço da manhã; não trata olheiras escuras"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["the-ordinary-caffeine-solution", "loreal-men-expert-hydra-energetic", "cerave-contorno-olhos"]
  }
];
