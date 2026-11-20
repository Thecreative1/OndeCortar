// 2026-11-20 — cremes depilatórios para homem, para revista/creme-depilatorio-homem-como-usar/. Ronda "tabu" do radar de
// procura (20/11, radar/2026-11-20/relatorio.md), aprovada pelo utilizador. Amazon.es "comprados el mes pasado" (20/11):
// Veet Men kit zonas íntimas 1 000+ (no ASIN B09TCK867L, sem botão de compra a 20/11 → usado o B0H2FM9YMG, pack de 2
// kits, Amazon, em stock), No Hair Crew íntima 400+ (vendedor Trebeo), Veet Men pele sensível 400 ml 200+ (Amazon).
// Só dados das fichas na Amazon.es (20/11). A ficha do kit Veet contradiz-se nos genitais: dito nas limitações.
const ART = "creme-depilatorio-homem-como-usar";
module.exports = [
  {
    slug: "no-hair-crew-creme-intimo", name: "No Hair Crew creme depilatório íntimo para homem (100 ml)", brand: "No Hair Crew", asin: "B07F84MRMV",
    image: "imagens/produtos/no-hair-crew-creme-intimo.jpg", alt: "Caixa e tubo de 100 ml do creme depilatório íntimo No Hair Crew, feito para homem, com algas calmantes",
    bestFor: "Zona íntima",
    summary: "Indicado para quem quer tirar o pelo da zona íntima sem lâmina e sem cortes, com um creme feito para ela.",
    useCase: "A marca indica-o para o púbis, as virilhas, os testículos e os glúteos, com 4 a 8 minutos de atuação. Teste de pele numa zona pequena 24 horas antes de cada uso e 72 horas entre aplicações.",
    highlight: "Creme depilatório feito para a zona íntima masculina: púbis, virilhas, testículos e glúteos em 4 a 8 minutos, com ureia e extrato de algas calmante, testado dermatologicamente, segundo a marca.",
    strengths: ["feito para a zona íntima masculina, incluindo os testículos, segundo a marca", "avisos de segurança claros: teste de 24 h, 72 h entre aplicações, onde não usar", "sem lâmina: sem cortes, e a marca diz que dá menos pelos encravados do que barbear"],
    limits: ["na Amazon.es é vendido por um vendedor externo, não pela Amazon", "não serve para a cara, a cabeça, os mamilos, a zona perianal nem mucosas; como todos os cremes depilatórios, pode irritar se ficar tempo de mais"],
    categories: ["cremes-e-espumas"],
    articles: [ART, "como-aparar-pelos-intimos-masculinos"],
    related: ["veet-men-kit-zonas-intimas", "philips-oneblade-intimate-qp1924", "philips-bodygroom-bg3480"]
  },
  {
    slug: "veet-men-kit-zonas-intimas", name: "Veet Men kit para zonas íntimas (creme + bálsamo, pack de 2)", brand: "Veet", asin: "B0H2FM9YMG",
    image: "imagens/produtos/veet-men-kit-zonas-intimas.jpg", alt: "Duas caixas do kit Veet Men Total Pro para zonas íntimas com creme depilatório de 100 ml e bálsamo de 50 ml",
    bestFor: "Zona íntima, com bálsamo",
    summary: "Indicado para quem quer um kit com creme e bálsamo pós-depilação, da marca mais conhecida, vendido pela Amazon.",
    useCase: "Segundo a ficha, o creme serve para as virilhas, o púbis, a base do pénis, o escroto e os glúteos, e também para o corpo; depois aplica-se o bálsamo como um hidratante. Lê o folheto da caixa e faz o teste de pele antes.",
    highlight: "Kit da Veet Men com creme depilatório de 100 ml e bálsamo pós-depilação de 50 ml com aloé vera, testados dermatologicamente; pack de 2 kits, vendido pela Amazon.",
    strengths: ["creme e bálsamo pós-depilação no mesmo kit", "vendido e enviado pela Amazon", "da Veet Men, que aparece nas pesquisas de creme depilatório de homem em Portugal"],
    limits: ["a ficha da Amazon contradiz-se: indica o escroto, mas os avisos dizem para não usar nos genitais — segue o folheto da caixa", "pack de 2 kits: mais quantidade do que precisas para experimentar"],
    categories: ["cremes-e-espumas"],
    articles: [ART],
    related: ["no-hair-crew-creme-intimo", "veet-men-creme-depilatorio-corpo", "philips-bodygroom-bg3480"]
  },
  {
    slug: "veet-men-creme-depilatorio-corpo", name: "Veet Men creme depilatório para o corpo, pele sensível (400 ml)", brand: "Veet", asin: "B07DDPBBWH",
    image: "imagens/produtos/veet-men-creme-depilatorio-corpo.jpg", alt: "Frasco de 400 ml com doseador do creme depilatório Veet Men Total Pro para pele sensível",
    bestFor: "Peito, costas e pernas",
    summary: "Indicado para quem quer tirar o pelo do peito, das costas, dos braços ou das pernas sem lâmina, em pele sensível.",
    useCase: "Para costas, peito, braços, pernas e axilas: 5 a 10 minutos de atuação, com o resultado a durar até 7 dias, segundo a Veet. O frasco de 400 ml com doseador dá para zonas grandes.",
    highlight: "Creme depilatório da Veet Men para pele sensível: costas, peito, braços, pernas e axilas em 5 a 10 minutos, resultado até 7 dias e hidratação até 24 horas, segundo a marca; frasco de 400 ml com doseador.",
    strengths: ["para zonas grandes: costas e peito", "resultado até 7 dias, segundo a marca", "vendido pela Amazon, frasco de 400 ml com doseador"],
    limits: ["não é para a zona íntima nem para a cara", "como todos os cremes depilatórios, faz o teste de pele antes e não passes do tempo indicado"],
    categories: ["cremes-e-espumas"],
    articles: [ART],
    related: ["veet-men-kit-zonas-intimas", "philips-bodygroom-bg3480", "no-hair-crew-creme-intimo"]
  }
];
