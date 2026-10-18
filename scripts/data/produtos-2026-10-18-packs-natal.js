// 2026-10-18 — packs de oferta para o Natal (guia revista/prendas-de-natal-para-homem/).
// Escolhidos pela procura: sugestões Google PT ("prendas de natal para homem", "kit barba", "prenda para
// pai/marido natal") e pesquisas da Amazon.es "estuche regalo hombre afeitado", "regalo hombre cuidado
// facial", "kit barba regalo" (L'Oréal Power Age Rutina "1 mil+ comprados el mes pasado"; NIVEA Neceser e
// Oukzon "100+"; NIVEA Hyaluron "50+"). Confirmados na Amazon.es a 2026-10-18: títulos e fotos batem com o
// ASIN, todos em stock; vendidos pela Amazon, exceto Oukzon (vendido pela própria Oukzon).
// Só dados da ficha do fabricante. Sem preços nem avaliações.
const NATAL = "prendas-de-natal-para-homem";

module.exports = [
  {
    slug: "loreal-men-expert-power-age-rotina", name: "L'Oréal Men Expert Power Age Rotina (sérum + creme)", brand: "L'Oréal Men Expert", asin: "B0BZJQ3LQT",
    image: "imagens/produtos/loreal-men-expert-power-age-rotina.jpg", alt: "Necessaire de oferta L'Oréal Men Expert Power Age com sérum de ácido hialurónico e creme anti-idade",
    bestFor: "Prenda de rosto anti-idade",
    summary: "Indicada para oferecer a quem começa a notar rugas e pele baça e ainda não tem rotina: dois passos, sérum e creme, numa necessaire.",
    useCase: "Faz sentido como prenda para homens a partir dos 30–40 anos: de manhã, umas gotas de sérum e depois o creme.",
    highlight: "Necessaire de oferta com sérum anti-idade com dois tipos de ácido hialurónico e creme hidratante anti-idade Power Age, segundo a marca.",
    strengths: ["rotina em dois passos já montada: sérum e creme da mesma linha", "sérum com ácido hialurónico de dois pesos moleculares, segundo a marca", "vem numa necessaire, pronta a oferecer"],
    limits: ["não tem proteção solar: de dia, junta um FPS", "para pele oleosa com tendência a borbulhas há opções mais leves"],
    categories: ["cuidados-de-rosto", "para-oferecer"],
    articles: [NATAL, "serum-para-homem-para-que-serve", "creme-de-rosto-para-homem-como-escolher"],
    related: ["loreal-men-expert-power-age", "nivea-men-pack-hyaluron", "nivea-men-pack-neceser"]
  },
  {
    slug: "nivea-men-pack-neceser", name: "NIVEA MEN Pack Cuidado Completo (necessaire)", brand: "NIVEA MEN", asin: "B0DK1N6LJY",
    image: "imagens/produtos/nivea-men-pack-neceser.jpg", alt: "Necessaire azul NIVEA MEN Cuidado Completo com creme, desodorizante roll-on, creme hidratante e bálsamo after shave",
    bestFor: "Prenda clássica e segura",
    summary: "Indicada para quem quer uma prenda simples e certa para o pai, o avô ou o amigo secreto: o básico do dia a dia numa necessaire.",
    useCase: "Faz sentido para quem usa poucos produtos: creme de rosto, after shave depois da barba, creme de lata para mãos e corpo e desodorizante.",
    highlight: "Necessaire com creme facial hidratante (75 ml), NIVEA MEN Creme em lata (150 ml), bálsamo after shave (100 ml) e desodorizante roll-on, segundo a ficha.",
    strengths: ["quatro produtos de uso diário numa necessaire reutilizável", "bálsamo after shave para acalmar a pele depois da barba", "creme facial com aloé vera e provitamina B5, segundo a marca"],
    limits: ["produtos de gama básica: quem já tem rotina de rosto não ganha muito", "o desodorizante e o creme têm perfume NIVEA MEN"],
    categories: ["para-oferecer", "cuidados-de-rosto"],
    articles: [NATAL, "after-shave-para-que-serve"],
    related: ["nivea-men-pack-hyaluron", "loreal-men-expert-power-age-rotina", "nivea-men-sensitive-fp15"]
  },
  {
    slug: "nivea-men-pack-hyaluron", name: "NIVEA MEN Pack Rotina Anti-idade Hyaluron", brand: "NIVEA MEN", asin: "B0FBBS86WS",
    image: "imagens/produtos/nivea-men-pack-hyaluron.jpg", alt: "Caixa de oferta NIVEA MEN Hyaluron com creme de dia SPF 15, contorno de olhos e bálsamo after shave",
    bestFor: "Rotina anti-idade completa",
    summary: "Indicada para oferecer a um homem com mais de 35 anos que faz a barba: creme de dia com FPS, contorno de olhos e after shave da mesma linha.",
    useCase: "Faz sentido para uma rotina de manhã completa: after shave depois da barba, contorno de olhos e creme de dia com FPS 15.",
    highlight: "Caixa com creme de dia anti-idade SPF 15 (50 ml), contorno de olhos Hyaluron (15 ml) e bálsamo after shave anti-idade (100 ml), segundo a ficha.",
    strengths: ["o creme de dia já tem FPS 15", "inclui contorno de olhos, que raramente se compra sozinho", "a marca indica-o para homens com mais de 35 anos"],
    limits: ["FPS 15 é baixo para dias de sol forte ou praia", "para quem não faz a barba, o after shave sobra"],
    categories: ["cuidados-de-rosto", "para-oferecer"],
    articles: [NATAL, "contorno-de-olhos-para-homem-olheiras-e-papos", "creme-de-rosto-para-homem-como-escolher"],
    related: ["nivea-men-hyaluron-contorno-olhos", "loreal-men-expert-power-age-rotina", "nivea-men-pack-neceser"]
  },
  {
    slug: "oukzon-kit-barba-10-em-1", name: "Oukzon Kit de Barba 10 em 1", brand: "Oukzon", asin: "B08GYDSD72",
    image: "imagens/produtos/oukzon-kit-barba-10-em-1.jpg", alt: "Kit de barba Oukzon com condicionador, óleo, champô, bálsamo, escova, tesoura, pentes e saco de pano",
    bestFor: "Kit de barba com condicionador",
    summary: "Indicado para oferecer a quem tem barba e não tem rotina: junta lavagem, condicionador, óleo e bálsamo com as ferramentas para dar forma.",
    useCase: "Faz sentido como primeira rotina de barba: champô e condicionador no duche, óleo ou bálsamo depois, escova e pente para alinhar.",
    highlight: "Kit 10 em 1 com condicionador de barba (60 ml), champô (60 ml), óleo, bálsamo, escova, pente, tesoura, pente modelador e saco de pano, segundo a ficha.",
    strengths: ["inclui condicionador de barba, que muitos kits não trazem", "óleo e bálsamo com jojoba e óleo de árvore do chá, segundo a marca", "pente modelador para acertar contornos"],
    limits: ["vendido por um vendedor terceiro (a própria Oukzon), não pela Amazon", "rótulos em alemão e inglês"],
    categories: ["kits-de-barba", "para-oferecer"],
    articles: [NATAL, "melhor-kit-de-barba-para-oferecer"],
    related: ["cusmay-kit-barba-11-em-1", "viking-revolution-beard-grooming-kit", "proraso-balsamo-barba"]
  }
];
