// 2026-11-18 — auditoria de stock da loja (133 ASINs vistos na Amazon.es a 18/11).
// Troca aprovada pelo utilizador ("troca só o artigo esgotado"): só o Gillette Labs Gel.
//
// - Gillette Labs Gel de Barbear (B0BFRGVVDM), "No disponible" sem data de regresso →
//   Gillette Pro Gel de barbear para peles sensíveis, 200 ml, embalagem de 2 (B0DK3W5R29),
//   produto novo, vendido pela Amazon e em stock a 18/11. Textos a partir das características
//   publicadas pela Gillette na Amazon.es. Sem preços, avaliações ou alegações de teste.
//
// Ficam de fora de propósito (decisão do utilizador a 18/11): Braun AIO5545/MGK5445 (1 unidade,
// vendedor terceiro), poste WDZD dourado (ASIN abre um poste preto), La Roche-Posay Anthelios
// Oil Control e CeraVe contorno de olhos (só outros vendedores) e o cartão do Syprin na página
// do Beardburys. Ver a auditoria antes de mexer neles.
module.exports = [
  {
    slug: "gillette-pro-gel-pele-sensivel", name: "Gillette Pro Gel de Barbear Pele Sensível", brand: "Gillette", asin: "B0DK3W5R29",
    replaces: "gillette-labs-gel", checkedOn: "18 de novembro de 2026",
    image: "imagens/produtos/gillette-pro-gel-pele-sensivel.jpg", alt: "Gel de barbear Gillette Pro para peles sensíveis, embalagem de 200 ml",
    bestFor: "Pele sensível, sem pincel",
    summary: "Indicado para quem quer barbear rápido com um gel que faz espuma na mão e tem a pele a reagir com facilidade.",
    useCase: "Faz sentido nas manhãs com pouco tempo: aplica-se direto na cara, transforma-se em espuma e dispensa pincel e taça. Vem em embalagem de 2 frascos de 200 ml.",
    highlight: "Entra na seleção porque a Gillette o faz para pele sensível: protege da irritação, hidrata o pelo e refresca a pele a cada barbear.",
    strengths: ["gel que se transforma logo em espuma, sem pincel", "a marca indica-o para pele sensível e para proteger da irritação", "embalagem de 2 frascos de 200 ml dá reposição para muito tempo"],
    limits: ["vende-se em embalagem de 2 frascos: é muito gel para quem só quer experimentar", "não dá a experiência de um creme com pincel"],
    categories: ["cremes-e-espumas"],
    needs: ["para-barba", "para-casa"],
    articles: ["como-reduzir-irritacao-ao-fazer-a-barba", "creme-espuma-ou-gel-de-barbear-qual-escolher"],
    related: ["proraso-pre-barba", "proraso-creme", "taylor-of-old-bond-street-mr-taylors"]
  }
];
