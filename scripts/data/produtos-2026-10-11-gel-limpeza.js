// 2026-10-11 — artigo gel-de-limpeza-para-homem-como-lavar-a-cara (categoria Cuidados de rosto).
// Escolhidos pela procura (sugestões Google PT: pele oleosa / acne / mista / seca / sensível, CeraVe,
// Effaclar, Nivea Men) e pelo ranking de Beleza da Amazon.es. Os 5 confirmados na Amazon.es a 2026-10-11:
// em stock, vendidos e enviados pela Amazon. Gel espumante: o ASIN inicial (B0DVLG7GD1) era a recarga em saco;
// trocado a 2026-10-11 pelo frasco com doseador B07C5XD33D (n.º 65 em Beleza, vendido pela Amazon). Descartados: NIVEA MEN Menmalist rosto e barba (vendedor
// terceiro), Bulldog Sensitive (sem stock), L'Oréal Men Pure Charcoal (n.º 66 mil). Só dados do fabricante.
const ARTICLE = "gel-de-limpeza-para-homem-como-lavar-a-cara";

module.exports = [
  {
    slug: "cerave-gel-limpeza-espumante", name: "CeraVe Gel de Limpeza Espumante", brand: "CeraVe", asin: "B07C5XD33D",
    image: "imagens/produtos/cerave-gel-limpeza-espumante.jpg", alt: "Embalagem do gel de limpeza espumante CeraVe para pele normal a oleosa",
    bestFor: "Pele normal a oleosa",
    summary: "Indicado para quem tem a pele normal, mista ou oleosa e quer um gel de limpeza que tire a oleosidade sem a deixar a repuxar.",
    useCase: "Faz sentido de manhã e à noite: massaja na cara molhada com água morna, deixa 30 segundos e passa por água, como indica a marca.",
    highlight: "Gel de limpeza espumante para rosto e corpo com ceramidas, ácido hialurónico e niacinamida, sem perfume e não comedogénico.",
    strengths: ["a marca indica-o para pele normal a oleosa e diz que tira o excesso de oleosidade", "com ceramidas, ácido hialurónico e niacinamida", "sem perfume, não comedogénico; serve também para o corpo"],
    limits: ["em pele seca pode deixar a pele a repuxar: aí, o hidratante", "não é um tratamento para acne"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["cerave-gel-limpeza-hidratante", "cerave-blemish-control", "cerave-oil-control-gel"]
  },
  {
    slug: "cerave-gel-limpeza-hidratante", name: "CeraVe Gel de Limpeza Hidratante", brand: "CeraVe", asin: "B07HF9GT4L",
    image: "imagens/produtos/cerave-gel-limpeza-hidratante.jpg", alt: "Embalagem do gel de limpeza hidratante CeraVe para pele normal a seca",
    bestFor: "Pele seca ou sensível",
    summary: "Indicado para quem fica com a pele a repuxar depois de lavar a cara e quer uma limpeza suave.",
    useCase: "Faz sentido à noite (e de manhã, se precisares): na pele molhada, 30 segundos de massagem e água morna.",
    highlight: "Gel de limpeza suave para rosto e corpo com ácido hialurónico e três ceramidas, sem perfume e não comedogénico.",
    strengths: ["a marca indica-o para pele normal a seca e diz que limpa sem alterar a barreira da pele", "com ácido hialurónico e ceramidas", "sem perfume e não comedogénico"],
    limits: ["em pele muito oleosa pode parecer que não limpa o suficiente", "não faz espuma abundante: é suposto"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["cerave-gel-limpeza-espumante", "nivea-men-sensitive-fp15", "cerave-hidratante-rosto-spf50"]
  },
  {
    slug: "cerave-blemish-control", name: "CeraVe Blemish Control Gel de Limpeza", brand: "CeraVe", asin: "B0B7RQ46LD",
    image: "imagens/produtos/cerave-blemish-control.jpg", alt: "Embalagem do gel de limpeza CeraVe Blemish Control com ácido salicílico",
    bestFor: "Acne e pontos negros",
    summary: "Indicado para quem tem borbulhas, pontos negros e poros entupidos e quer um gel de limpeza com ácido salicílico.",
    useCase: "Faz sentido uma vez por dia no início (à noite) e, se a pele tolerar, duas; de manhã, protetor solar.",
    highlight: "Gel de limpeza para pele com tendência acneica, com ácido salicílico, argila, niacinamida e ceramidas, sem perfume.",
    strengths: ["a marca diz que reduz imperfeições e pontos negros e esfolia", "com ácido salicílico, argila e niacinamida", "sem perfume, não comedogénico e hipoalergénico, segundo a marca"],
    limits: ["a marca avisa que pode aumentar a sensibilidade ao sol: usa protetor solar", "acne que não melhora é assunto para dermatologista"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["la-roche-posay-effaclar-gel", "cerave-gel-limpeza-espumante", "neutrogena-hydro-boost-niacinamida"]
  },
  {
    slug: "la-roche-posay-effaclar-gel", name: "La Roche-Posay Effaclar Gel Purificante Micro-Esfoliante", brand: "La Roche-Posay", asin: "B0866V21WT",
    image: "imagens/produtos/la-roche-posay-effaclar-gel.jpg", alt: "Embalagem do gel purificante micro-esfoliante La Roche-Posay Effaclar com ácido salicílico",
    bestFor: "Pele oleosa com imperfeições",
    summary: "Indicado para quem tem pele oleosa com borbulhas e marcas persistentes e procura a linha Effaclar.",
    useCase: "Faz sentido à noite: faz espuma nas mãos com água, massaja na cara molhada e passa por água.",
    highlight: "Gel de limpeza purificante e micro-esfoliante com ácido salicílico, para pele oleosa com imperfeições.",
    strengths: ["a marca diz que reduz o sebo, desobstrui os poros e trata imperfeições persistentes", "com ácido salicílico, que esfolia suavemente", "reduz borbulhas, pontos negros e marcas, segundo a marca"],
    limits: ["esfoliante: em pele sensível começa com poucas vezes por semana", "não juntar com outros ácidos ou retinol na mesma noite"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["cerave-blemish-control", "la-roche-posay-anthelios-oil-control", "cerave-oil-control-gel"]
  },
  {
    slug: "nivea-men-hydrocare-gel-limpeza", name: "NIVEA MEN Hydrocare Gel de Limpeza Facial", brand: "NIVEA MEN", asin: "B0FLY75G45",
    image: "imagens/produtos/nivea-men-hydrocare-gel-limpeza.jpg", alt: "Tubo do gel de limpeza facial NIVEA MEN Hydrocare de 100 ml",
    bestFor: "Marca de homem, dia a dia",
    summary: "Indicado para quem quer um gel de limpeza de uma marca de homem, com sensação de frescura, para todos os dias.",
    useCase: "Faz sentido de manhã, no duche ou no lavatório, antes de fazer a barba ou de pôr creme.",
    highlight: "Gel de limpeza facial para homem com aloé vera e provitamina B5, em tubo de 100 ml.",
    strengths: ["a marca promete frescura imediata e limpeza sem secar", "com aloé vera e provitamina B5", "para todos os tipos de pele, segundo a marca"],
    limits: ["tubo de 100 ml: dura menos do que os frascos maiores", "para acne, um gel com ácido salicílico faz mais"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["cerave-gel-limpeza-espumante", "loreal-men-expert-hydra-energetic", "nivea-men-sensitive-fp15"]
  }
];
