// 2026-11-20 — champôs anticaspa para revista/champo-anticaspa-homem-qual-escolher/. 3.º nicho do radar de procura
// (20/11), pedido pelo utilizador. Amazon.es "comprados el mes pasado" (20/11): Vichy Dercos oleoso 6 000+, H&S Classic
// 2 000+, Vichy Dercos seco 1 000+, H&S Clinical Strength 100+. Os 4 vendidos pela Amazon e em stock a 20/11.
// Categoria nova loja/cuidados-de-cabelo/ (criada a 20/11; também recebe os 4 produtos dos cabelos brancos).
// Só dados das fichas na Amazon.es (20/11). Tema de saúde: sem promessas de cura; dermatite e queda → médico.
const ART = "champo-anticaspa-homem-qual-escolher";
module.exports = [
  {
    slug: "vichy-dercos-anticaspa-oleoso", name: "Vichy Dercos champô anticaspa, cabelo normal a oleoso (390 ml)", brand: "Vichy", asin: "B00WN2BY7G",
    image: "imagens/produtos/vichy-dercos-anticaspa-oleoso.jpg", alt: "Frasco com doseador do champô Vichy Dercos anticaspa DS para cabelo normal a oleoso, com selénio DS e ácido salicílico",
    bestFor: "Caspa persistente, cabelo oleoso",
    summary: "Indicado para quem tem caspa que não larga, cabelo normal a oleoso e comichão.",
    useCase: "Usa-se como champô habitual durante 4 semanas, massajando o couro cabeludo. Segundo a Vichy, previne que a caspa volte até 6 semanas depois.",
    highlight: "Champô anticaspa da Vichy com selénio DS e ácido salicílico: dupla ação contra a caspa persistente e o seu reaparecimento, alivia a comichão e previne que a caspa volte até 6 semanas depois, segundo a marca.",
    strengths: ["contra a caspa persistente e o seu reaparecimento, segundo a marca", "alivia a comichão", "o mais comprado quando se procura anticaspa para homem na Amazon.es"],
    limits: ["é para cabelo normal a oleoso: com couro cabeludo seco ou sensível há a versão própria", "vermelhidão, crostas ou nenhuma melhoria em 4 semanas são para o dermatologista, não para outro champô"],
    categories: ["cuidados-de-cabelo"],
    articles: [ART],
    related: ["vichy-dercos-anticaspa-seco", "hs-clinical-strength-anticaspa", "hs-classic-anticaspa"]
  },
  {
    slug: "vichy-dercos-anticaspa-seco", name: "Vichy Dercos champô anticaspa, couro cabeludo seco ou sensível (390 ml)", brand: "Vichy", asin: "B01BPHAD1W",
    image: "imagens/produtos/vichy-dercos-anticaspa-seco.jpg", alt: "Frasco com doseador do champô Vichy Dercos anticaspa DS para couro cabeludo seco e sensível",
    bestFor: "Caspa com couro cabeludo seco",
    summary: "Indicado para quem tem caspa e um couro cabeludo seco ou sensível, que repuxa depois de lavar.",
    useCase: "Usa-se como champô habitual durante 4 semanas, com água morna e massajando o couro cabeludo. A mesma dupla ação da versão para cabelo oleoso, segundo a Vichy.",
    highlight: "Versão do Vichy Dercos anticaspa para cabelo seco e couro cabeludo sensível: dupla ação contra a caspa persistente e o reaparecimento, alivia a comichão e previne que a caspa volte até 6 semanas depois, segundo a marca.",
    strengths: ["para couro cabeludo seco ou sensível", "contra a caspa persistente e o reaparecimento, segundo a marca", "alivia a comichão"],
    limits: ["para cabelo oleoso, a versão própria faz mais sentido", "se a pele está vermelha ou com crostas, pode não ser caspa: dermatologista"],
    categories: ["cuidados-de-cabelo"],
    articles: [ART],
    related: ["vichy-dercos-anticaspa-oleoso", "hs-classic-anticaspa", "hs-clinical-strength-anticaspa"]
  },
  {
    slug: "hs-classic-anticaspa", name: "Head & Shoulders Classic champô anticaspa (2 × 1 l)", brand: "Head & Shoulders", asin: "B0CRHL62XJ",
    image: "imagens/produtos/hs-classic-anticaspa.jpg", alt: "Dois frascos de 1 litro com doseador do champô anticaspa Head & Shoulders Classic",
    bestFor: "Anticaspa para todos os dias",
    summary: "Indicado para quem quer um anticaspa simples, para usar todos os dias, em qualquer tipo de cabelo.",
    useCase: "Usa-se todos os dias, como champô normal. A marca diz que, com uso regular, dá até 100% de proteção contra a caspa visível, num teste clínico.",
    highlight: "Champô anticaspa Head & Shoulders Classic com piroctona olamina, para uso diário em todo o tipo de cabelo e couro cabeludo; até 100% de proteção contra a caspa visível com uso regular, clinicamente testado, segundo a marca. Pack de 2 frascos de 1 l com doseador.",
    strengths: ["para uso diário, em todo o tipo de cabelo", "até 100% de proteção contra a caspa visível com uso regular, segundo a marca", "2 frascos de 1 litro com doseador"],
    limits: ["para caspa muito persistente ou com comichão forte há opções mais fortes", "formato grande: 2 litros de uma vez"],
    categories: ["cuidados-de-cabelo"],
    articles: [ART],
    related: ["hs-clinical-strength-anticaspa", "vichy-dercos-anticaspa-oleoso", "vichy-dercos-anticaspa-seco"]
  },
  {
    slug: "hs-clinical-strength-anticaspa", name: "Head & Shoulders Clinical Strength champô anticaspa (400 ml)", brand: "Head & Shoulders", asin: "B0DVCFK9C5",
    image: "imagens/produtos/hs-clinical-strength-anticaspa.jpg", alt: "Frasco de 400 ml do champô Head & Shoulders Clinical Strength Cooling Itch Rescue",
    bestFor: "Caspa persistente com comichão",
    summary: "Indicado para quem tem caspa que não larga e o couro cabeludo com comichão.",
    useCase: "Usa-se como champô, todos os dias se preciso: a marca diz que é suave para uso diário. Evitar o contacto com os olhos e com pele ferida.",
    highlight: "A versão mais forte da Head & Shoulders: 1% de sulfureto de selénio contra a caspa persistente e o couro cabeludo com comichão, suave para uso diário e com mentol, segundo a marca.",
    strengths: ["1% de sulfureto de selénio, a proteção máxima da marca", "pensado para a comichão causada pela caspa", "suave para uso diário, segundo a marca"],
    limits: ["evitar os olhos e a pele ferida, como avisa a marca", "comichão forte que não passa pode não ser só caspa: dermatologista"],
    categories: ["cuidados-de-cabelo"],
    articles: [ART],
    related: ["hs-classic-anticaspa", "vichy-dercos-anticaspa-oleoso", "vichy-dercos-anticaspa-seco"]
  }
];
