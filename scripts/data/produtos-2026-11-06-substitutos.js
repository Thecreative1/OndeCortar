// 2026-11-06 — verificação de preço/vendedor/stock (12 dias sem pedidos na Amazon): 2 produtos
// "Currently unavailable" na Amazon.es, sem data de regresso. Substitutos confirmados na página
// da Amazon.es a 2026-11-06 (título, características, stock, vendido pela Amazon).
// Sem preços, avaliações ou alegações de teste.
//
// - King C. Gillette Beard Clipper (B0DWM37XCN) → King C. Gillette Beard Trimmer Kit (B08B959QTP),
//   produto que JÁ EXISTE na loja: textos copiados do catálogo (commerce-products-b.js).
//   Não passar esta entrada ao add-store-products.js — regenerava a página existente a partir
//   do modelo e apagava o que lhe foi acrescentado depois (detalhes, decisão rápida…).
// - Taylor Spicy Sandalwood (B0H9M3T9HR) → Taylor Mr Taylor's (B002QG0TWA), produto novo.
//   O Sandalwood original (B0821VZYZF, trocado a 2026-10-05) continua esgotado.
//
// Fica de fora o CeraVe contorno de olhos (B07C5T3DKW): sem botão de compra da Amazon, mas à
// venda por 5 farmácias; é a escolha principal do artigo do contorno de olhos e o único CeraVe
// de olhos vendido pela Amazon (Skin Renewing, B0FJLXQYDF) é para rugas, não para olheiras.
module.exports = [
  {
    slug: "king-c-gillette-beard-trimmer-kit", name: "King C. Gillette Beard Trimmer Kit", brand: "King C. Gillette", asin: "B08B959QTP",
    replaces: "king-c-gillette-beard-clipper", checkedOn: "6 de novembro de 2026", existing: true,
    image: "imagens/produtos/king-c-gillette-beard-trimmer-kit.jpg", alt: "King C. Gillette Beard Trimmer Kit com três pentes intercambiáveis",
    bestFor: "Kit para aparar",
    summary: "Indicado para quem quer um kit de barba com foco no aparar, sem excesso de peças.",
    useCase: "Faz sentido para manutenção regular em casa e para quem quer vários comprimentos disponíveis num aparador sem fios simples.",
    highlight: "Entra na seleção porque vai direto ao ponto: aparador, três pentes e uma rotina de barba sem ruído desnecessário.",
    strengths: ["aparador sem fios orientado para manutenção de barba", "três pentes intercambiáveis cobrem vários comprimentos", "lâminas afiadas ajudam a manter corte previsível"],
    limits: ["menos completo do que kits com óleo, bálsamo e escova", "não substitui uma máquina de cortar cabelo"],
    categories: ["kits-de-barba"],
    articles: ["melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas", "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo"]
  },
  {
    slug: "taylor-of-old-bond-street-mr-taylors", name: "Taylor of Old Bond Street Mr Taylor's", brand: "Taylor of Old Bond Street", asin: "B002QG0TWA",
    replaces: "taylor-of-old-bond-street-spicy-sandalwood", checkedOn: "6 de novembro de 2026",
    image: "imagens/produtos/taylor-mr-taylors.jpg", alt: "Creme de barbear Taylor of Old Bond Street Mr Taylor's em taça de 150 g",
    bestFor: "Creme em taça",
    summary: "Indicado para quem gosta de barbear clássico com pincel e quer um creme em taça de barbearia londrina, também para pele sensível.",
    useCase: "Faz sentido em barbear húmido com pincel, com navalha ou máquina de segurança: a taça de 150 g dá para fazer espuma antes de cada passagem e fecha bem para levar em viagem.",
    highlight: "Creme em taça de 150 g de uma casa de barbearia de Jermyn Street (desde 1854), com o aroma Mr Taylor's, que leva o nome da casa.",
    strengths: ["taça clássica de 150 g para usar com pincel", "a marca indica-o também para pele sensível", "marca histórica de barbearia londrina"],
    limits: ["precisa de pincel e de mais tempo do que um gel", "aroma marcado pode não agradar a quem prefere fórmulas sem perfume"],
    categories: ["cremes-e-espumas"],
    articles: ["creme-espuma-ou-gel-de-barbear-qual-escolher", "como-montar-uma-rotina-simples-de-barba-em-casa"],
    related: ["proraso-creme", "wilkinson-sword-pincel", "gillette-labs-gel"]
  }
];
