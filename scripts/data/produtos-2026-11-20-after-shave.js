// 2026-11-20 — after shaves para revista/after-shave-para-que-serve/ (o artigo, de 5/10, dizia "qual escolher" mas não
// recomendava nenhum; GoatCounter 30/9–20/11: 9 visitas, 0 cliques Amazon, por isso não conta como "artigo que funciona").
// Último nicho da 1.ª ronda do radar de procura (20/11), pedido pelo utilizador ("faz agora o after shave").
// Radar/Amazon.es: "after shave hombre" 2 850 compras/mês nos 12 primeiros (NIVEA MEN Sensitive bálsamo 1 000+,
// Hyaluron 700+, Proraso refrescante 200+). Google PT: nivea (sensitive, bálsamo), old spice, denim, gillette, proraso,
// bandido, brut; continente, mercadona, wells, primor; "bálsamo after shave", "sem álcool", "pele sensível".
// Old Spice Original: só vendedores externos e ficha sem informação → Old Spice Captain (Amazon). Denim: só anúncios
// estrangeiros, fora. Proraso B0085UECY2: a Amazon chama-lhe "bálsamo", mas a embalagem diz loção (lozione dopobarba).
// Só dados das fichas na Amazon.es (20/11). Sem preços nem avaliações.
const ART = "after-shave-para-que-serve";
module.exports = [
  {
    slug: "nivea-men-sensitive-balsamo-after-shave", name: "NIVEA MEN Sensitive bálsamo after shave (100 ml)", brand: "NIVEA MEN", asin: "B00XAFFABQ",
    image: "imagens/produtos/nivea-men-sensitive-balsamo-after-shave.jpg", alt: "Caixa e frasco de 100 ml do bálsamo after shave NIVEA MEN Sensitive, 0% álcool",
    bestFor: "Pele sensível, sem álcool",
    summary: "Indicado para quem sai do barbear com a pele vermelha ou a arder e quer um after shave que não arda.",
    useCase: "Aplica-se logo a seguir ao barbear, na pele limpa e seca, em pouca quantidade. É um bálsamo sem álcool, com camomila, provitamina B5 e vitamina E, que a marca diz absorver depressa sem deixar a pele oleosa.",
    highlight: "Bálsamo after shave da NIVEA MEN com 0% álcool, para pele sensível: alivia a irritação, o ardor, a vermelhidão e a secura depois do barbear, com camomila, provitamina B5 e vitamina E, segundo a marca.",
    strengths: ["0% álcool: não arde em pele sensível ou com pequenos cortes", "camomila, provitamina B5 e vitamina E", "fórmula leve, que a marca diz não ser oleosa"],
    limits: ["é um bálsamo: quem gosta da sensação fresca e do perfume de uma loção vai achá-lo discreto", "frasco de 100 ml; para quem barbeia todos os dias acaba depressa"],
    categories: ["cremes-e-espumas"],
    articles: [ART, "como-reduzir-irritacao-ao-fazer-a-barba"],
    related: ["nivea-men-hyaluron-balsamo-after-shave", "proraso-pre-barba", "gillette-pro-gel-pele-sensivel"]
  },
  {
    slug: "nivea-men-hyaluron-balsamo-after-shave", name: "NIVEA MEN Hyaluron bálsamo after shave antirrugas (100 ml)", brand: "NIVEA MEN", asin: "B08SJNWL1P",
    image: "imagens/produtos/nivea-men-hyaluron-balsamo-after-shave.jpg", alt: "Caixa e frasco de 100 ml do bálsamo after shave NIVEA MEN Antiedad Hyaluron",
    bestFor: "After shave e antirrugas",
    summary: "Indicado para quem quer juntar o after shave e um cuidado antirrugas num só produto.",
    useCase: "Aplica-se depois do barbear, como um bálsamo. A marca diz que hidrata durante 24 horas e que o ácido hialurónico ajuda a combater os sinais de envelhecimento, sobretudo em pele madura.",
    highlight: "Bálsamo after shave da NIVEA MEN com ácido hialurónico: acalma a pele depois do barbear, hidrata durante 24 horas e ajuda a combater os sinais de envelhecimento, segundo a marca.",
    strengths: ["junta after shave e cuidado antirrugas", "hidratação durante 24 horas, segundo a marca", "para todo o tipo de pele, sobretudo madura"],
    limits: ["tem álcool na fórmula (é o 2.º ingrediente): em pele muito sensível ou com cortes pode arder — aí, o Sensitive", "não substitui um creme antirrugas completo"],
    categories: ["cremes-e-espumas"],
    articles: [ART],
    related: ["nivea-men-sensitive-balsamo-after-shave", "loreal-men-expert-power-age", "proraso-after-shave-balsamo-refrescante"]
  },
  {
    slug: "proraso-after-shave-balsamo-refrescante", name: "Proraso after shave refrescante, eucalipto e mentol (loção, 100 ml)", brand: "Proraso", asin: "B0085UECY2",
    image: "imagens/produtos/proraso-after-shave-balsamo-refrescante.jpg", alt: "Frasco verde e caixa da loção after shave Proraso refrescante com eucalipto e mentol, 100 ml",
    bestFor: "Sensação fresca de barbearia",
    summary: "Indicado para quem gosta da sensação fresca de barbearia depois do barbear, e já usa ou quer usar Proraso.",
    useCase: "Aplica-se depois do barbear, com as mãos, no rosto e no pescoço. Leva eucalipto, mentol e água de hamamélis, que refresca e tonifica. A Amazon chama-lhe bálsamo, mas a embalagem diz loção.",
    highlight: "After shave da Proraso, marca de barbearia desde 1948: eucalipto, mentol e água de hamamélis para refrescar, tonificar e acalmar depois do barbear, sem parabenos, ftalatos nem silicones, segundo a marca.",
    strengths: ["sensação fresca de eucalipto e mentol", "da Proraso, a mesma marca do pré-barba e do creme de barbear da loja", "sem parabenos, ftalatos, silicones nem óleos minerais, segundo a marca"],
    limits: ["é uma loção refrescante: em pele muito sensível o Sensitive da NIVEA é mais seguro", "o nome na Amazon diz bálsamo, mas a embalagem é de loção"],
    categories: ["cremes-e-espumas"],
    articles: [ART],
    related: ["proraso-pre-barba", "proraso-creme", "nivea-men-sensitive-balsamo-after-shave"]
  },
  {
    slug: "old-spice-captain-after-shave", name: "Old Spice Captain loção after shave (100 ml)", brand: "Old Spice", asin: "B07NLQ5X38",
    image: "imagens/produtos/old-spice-captain-after-shave.jpg", alt: "Embalagem vermelha da loção after shave Old Spice Captain",
    bestFor: "Loção clássica com perfume",
    summary: "Indicado para quem quer a loção after shave clássica, com perfume que fica, e não tem a pele sensível.",
    useCase: "Aplica-se depois do barbear, na pele limpa e seca. A marca diz que tem propriedades antissépticas para pequenos cortes e que a fragância dura o dia todo.",
    highlight: "Loção after shave da Old Spice: acalma, estimula e refresca a pele, com propriedades antissépticas para os pequenos cortes do barbear e uma fragância que a marca diz durar o dia todo.",
    strengths: ["loção clássica, com perfume marcado", "propriedades antissépticas para pequenos cortes, segundo a marca", "vendida pela Amazon"],
    limits: ["é uma loção: em pele sensível ou irritada pode arder — aí, um bálsamo sem álcool", "o perfume é forte; quem já usa perfume pode preferir algo neutro"],
    categories: ["cremes-e-espumas"],
    articles: [ART],
    related: ["proraso-after-shave-balsamo-refrescante", "nivea-men-sensitive-balsamo-after-shave", "proraso-creme"]
  }
];
