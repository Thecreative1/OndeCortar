// 2026-11-26 — produtos sem botão de compra na Amazon.es antes da Black Friday (troca aprovada
// pelo utilizador: "troca os dois").
//
// - Gillette Pro Gel pele sensível (B0DK3W5R29), o substituto de 18/11 do Gillette Labs Gel, passou
//   a abrir a página do GilletteLabs (B0BFRGVVDM): "Não disponível, sem previsão", sem botão; 15 páginas.
//   → NIVEA MEN Sensitive Gel de Barbear, 6 x 200 ml (B09GZ6ZB8H), vendido e enviado pela Amazon,
//   em stock e com 100+ compras no mês passado a 26/11. Textos a partir das características
//   publicadas pela NIVEA na Amazon.es. Sem preços, avaliações ou alegações de teste.
//   Visto e posto de lado: Gillette Classic Gel B0BWFL2BPZ (título diz 6 x 200 ml, a variação diz
//   6 x 33,33 ml e o preço por 100 ml dá 200 ml no total — dados incoerentes); NIVEA 200 ml avulso
//   B001HBJ4CG (vendedor terceiro); Gillette Series B0BSTQV8MZ (envio em 1–2 meses).
//
// O pack L'Oréal Men Expert Power Age Rotina não passa por aqui: é a mesma necessaire com nova
// fórmula noutro ASIN (B0BZJQ3LQT → B0GQVGR5MM), por isso troca-se só o ASIN e a foto.
module.exports = [
  {
    slug: "nivea-men-sensitive-gel-barbear", name: "NIVEA MEN Sensitive Gel de Barbear", brand: "NIVEA MEN", asin: "B09GZ6ZB8H",
    replaces: "gillette-pro-gel-pele-sensivel", checkedOn: "26 de novembro de 2026",
    image: "imagens/produtos/nivea-men-sensitive-gel-barbear.jpg", alt: "Embalagem de 6 frascos de 200 ml de gel de barbear NIVEA MEN Sensitive",
    bestFor: "Pele sensível, sem pincel",
    summary: "Indicado para quem tem a pele a reagir ao barbear e quer um gel sem álcool, de perfume neutro, que faz espuma na mão.",
    useCase: "Faz sentido para quem faz a barba à lâmina várias vezes por semana: aplica-se direto na cara, transforma-se em espuma e dispensa pincel e taça. Vem em embalagem de 6 frascos de 200 ml.",
    highlight: "Entra na seleção porque a NIVEA o faz para pele sensível: sem álcool, com perfume neutro e com camomila, hamamélis e vitamina E, segundo a marca.",
    strengths: ["gel sem álcool e de perfume neutro, feito para pele sensível", "com camomila, hamamélis e vitamina E, segundo a marca", "faz espuma na mão e dispensa pincel e taça"],
    limits: ["vende-se em embalagem de 6 frascos de 200 ml: é muito gel para quem só quer experimentar", "não dá a experiência de um creme com pincel"],
    categories: ["cremes-e-espumas"],
    needs: ["para-barba", "para-casa"],
    articles: ["como-reduzir-irritacao-ao-fazer-a-barba", "creme-espuma-ou-gel-de-barbear-qual-escolher"],
    related: ["nivea-men-sensitive-balsamo-after-shave", "proraso-pre-barba", "proraso-creme"]
  }
];
