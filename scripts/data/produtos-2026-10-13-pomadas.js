// 2026-10-13 — categoria nova loja/pomadas-e-ceras/ e artigos pomada-cera-ou-gel-cabelo-homem e
// cabelo-encaracolado-homem-corte-e-cuidados (até aqui sem produtos: a loja não tinha styling).
// Escolhidos pela procura: sugestões Google PT ("pomada cabelo homem efeito seco/matte", "melhor pomada",
// "cera Reuzel/Uppercut/Bandido", "gel fixador", "creme caracóis homem") e mais vendidos da Amazon.es em
// Argilas (n.º 1 American Crew Matte Clay), Ceras (n.º 1 Got2b Beach Matt), Pomadas (n.º 2 Uppercut Matt),
// Géis e Cremes. Confirmados na Amazon.es a 2026-10-13: todos em stock; vendidos pela Amazon, exceto Uppercut
// (Solretail, enviado pela Amazon). Fotos verificadas (nenhuma é recarga nem pack). Só dados do fabricante
// (ficha e rótulo). Fiber: a Amazon lista 52 ml e 76,5 ml na mesma ficha — não indicar tamanho.
// Bandido: o nome diz "Matte Wax" mas a ficha fala em "aspeto húmido" — dito nas limitações.
const POMADA = "pomada-cera-ou-gel-cabelo-homem";
const CARACOIS = "cabelo-encaracolado-homem-corte-e-cuidados";

module.exports = [
  {
    slug: "american-crew-matte-clay", name: "American Crew Matte Clay", brand: "American Crew", asin: "B07R4CNDRM",
    image: "imagens/produtos/american-crew-matte-clay.jpg", alt: "Lata de argila para o cabelo American Crew Matte Clay com acabamento mate",
    bestFor: "Efeito seco (matte)",
    summary: "Indicada para quem quer cabelo curto ou médio com textura e ar natural, sem brilho, e uma fixação que aguente o dia.",
    useCase: "Faz sentido em cortes curtos com o topo despenteado: uma ervilha aquecida nas mãos, em cabelo seco ou húmido, do fundo para as pontas.",
    highlight: "Argila de caulim com fixação média a alta e acabamento mate, para cabelo curto a médio; sai com água, segundo a marca.",
    strengths: ["fixação média a alta com acabamento mate, segundo o rótulo", "argila de caulim; a marca diz que sai com água e não deixa o cabelo oleoso", "a marca indica-a para cabelo curto ou de comprimento médio"],
    limits: ["não dá brilho: para um penteado polido, uma pomada", "em cabelo comprido ou encaracolado tende a pesar"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["uppercut-deluxe-matt-pomade", "got2b-beach-matt", "american-crew-fiber"]
  },
  {
    slug: "got2b-beach-matt", name: "Got2b Beach Matt", brand: "Got2b", asin: "B07YBH5WHW",
    image: "imagens/produtos/got2b-beach-matt.jpg", alt: "Frasco de pasta mate para o cabelo Got2b Beach Matt de 100 ml",
    bestFor: "Cera matte para começar",
    summary: "Indicada para quem quer experimentar um efeito seco sem gastar muito: pasta mate de fixação média, para um ar despenteado.",
    useCase: "Faz sentido para o dia a dia em cabelo curto a médio: esfrega nas mãos e molda mecha a mecha, como indica a marca.",
    highlight: "Pasta mate de fixação média (nível 3 de 6 no rótulo), não pegajosa, em frasco de 100 ml.",
    strengths: ["acabamento mate e fixação média, segundo a marca", "não pegajosa e sem resíduos, diz a marca", "100 ml: dura mais do que as latas pequenas"],
    limits: ["fixação média: cabelo grosso e rebelde pede mais", "pensada para o ar despenteado, não para riscas ou penteados para trás"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["american-crew-matte-clay", "bandido-matte-wax", "uppercut-deluxe-matt-pomade"]
  },
  {
    slug: "uppercut-deluxe-matt-pomade", name: "Uppercut Deluxe Matt Pomade", brand: "Uppercut Deluxe", asin: "B01M352FBP",
    image: "imagens/produtos/uppercut-deluxe-matt-pomade.jpg", alt: "Lata de pomada mate Uppercut Deluxe Matt Pomade de 100 g",
    bestFor: "Pomada mate à base de água",
    summary: "Indicada para quem quer o controlo de uma pomada sem o brilho, e uma pomada à base de água que sai à primeira lavagem.",
    useCase: "Faz sentido em cortes curtos a médios, clássicos ou modernos, lisos ou ondulados: pouca quantidade, com o cabelo seco ou ligeiramente húmido.",
    highlight: "Pomada mate à base de água com fixação média e textura de creme, 100 g; a marca diz que sai facilmente com água.",
    strengths: ["acabamento mate com fixação média, segundo a marca", "à base de água: lava-se sem resíduo de cera", "a marca indica-a para cabelo curto a médio, liso, ondulado ou encaracolado"],
    limits: ["vendida por um vendedor terceiro (enviada pela Amazon)", "perfume a crème brûlée, segundo a marca: nem todos gostam"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["american-crew-matte-clay", "american-crew-pomade", "got2b-beach-matt"]
  },
  {
    slug: "american-crew-pomade", name: "American Crew Pomade", brand: "American Crew", asin: "B0012XAQTE",
    image: "imagens/produtos/american-crew-pomade.jpg", alt: "Lata de pomada para o cabelo American Crew Pomade com fixação média e brilho alto",
    bestFor: "Penteado polido com brilho",
    summary: "Indicada para penteados para trás, riscas e cortes clássicos, em que se quer o cabelo arrumado e com brilho.",
    useCase: "Faz sentido para o penteado de risca ou para trás: aquece nas mãos, aplica e acaba com um pente.",
    highlight: "Pomada de fixação média e brilho alto, segundo o rótulo, em lata de 50 g.",
    strengths: ["fixação média com brilho alto, segundo o rótulo", "deixa remodelar ao longo do dia", "lata de 50 g, fácil de levar"],
    limits: ["brilho alto: quem quer ar natural deve escolher uma argila", "lata pequena: com uso diário acaba depressa"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["uppercut-deluxe-matt-pomade", "american-crew-fiber", "giorgi-line-gel-extra-forte"]
  },
  {
    slug: "american-crew-fiber", name: "American Crew Fiber", brand: "American Crew", asin: "B000FZXGDS",
    image: "imagens/produtos/american-crew-fiber.jpg", alt: "Lata de pasta para o cabelo American Crew Fiber com fixação forte e pouco brilho",
    bestFor: "Cabelo grosso, fixação forte",
    summary: "Indicada para cabelo grosso e rebelde que desfaz o penteado a meio do dia: fixação forte e pouco brilho.",
    useCase: "Faz sentido em cabelo curto a médio que não fica no sítio: aquece uma pequena quantidade nas palmas e trabalha da raiz às pontas.",
    highlight: "Pasta de fixação forte e flexível com pouco brilho, segundo o rótulo, com lanolina e cera de abelha.",
    strengths: ["fixação forte e flexível com pouco brilho, segundo o rótulo", "com lanolina e cera de abelha, diz a marca", "dá textura e ar de mais densidade, segundo a marca"],
    limits: ["com cera de abelha e lanolina, pode precisar de duas lavagens", "em cabelo fino pode pesar: aí, uma argila"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["american-crew-matte-clay", "american-crew-pomade", "bandido-matte-wax"]
  },
  {
    slug: "bandido-matte-wax", name: "Bandido Matte Wax", brand: "Bandido", asin: "B07BSCMQFN",
    image: "imagens/produtos/bandido-matte-wax.jpg", alt: "Lata verde de cera para o cabelo Bandido Matte Wax de 150 ml",
    bestFor: "Lata grande de barbearia",
    summary: "Indicada para quem usa cera todos os dias e quer a lata grande de 150 ml de uma marca que se vê nas barbearias.",
    useCase: "Faz sentido para uso diário em cabelo curto a médio: uma pequena quantidade entre os dedos, trabalhada no cabelo até à forma que queres.",
    highlight: "Cera de modelagem Bandido em lata de 150 ml, para qualquer tipo de cabelo, segundo a marca.",
    strengths: ["lata de 150 ml, das maiores desta seleção", "a marca diz que serve para qualquer tipo de cabelo", "vendida e enviada pela Amazon"],
    limits: ["o nome diz \"matte\", mas a ficha fala em aspeto húmido: conta com algum brilho", "a marca não indica o nível de fixação"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["got2b-beach-matt", "american-crew-fiber", "american-crew-matte-clay"]
  },
  {
    slug: "giorgi-line-gel-extra-forte", name: "Giorgi Line Gel Fixador Extra Forte", brand: "Giorgi Line", asin: "B09WHMN5MG",
    image: "imagens/produtos/giorgi-line-gel-extra-forte.jpg", alt: "Tubo amarelo de gel fixador Giorgi Line Extra Forte de 170 ml",
    bestFor: "Gel, fixação o dia todo",
    summary: "Indicado para quem quer o penteado no sítio o dia inteiro, sem mexer, e não se importa com o efeito molhado do gel.",
    useCase: "Faz sentido em penteados que têm de aguentar trabalho, vento ou capacete: aplica em cabelo húmido ou seco e molda com os dedos ou o pente.",
    highlight: "Gel fixador extra forte (nível 3), tubo de 170 ml; a marca promete até 48 horas e uma textura não oleosa.",
    strengths: ["fixação extra forte, até 48 horas segundo a marca", "textura não oleosa e sem resíduos visíveis, diz a marca", "tubo de 170 ml para uso diário"],
    limits: ["como todos os géis, deixa o cabelo rígido: não dá para remodelar", "para ar natural e sem brilho, uma argila"],
    categories: ["pomadas-e-ceras"],
    articles: [POMADA],
    related: ["american-crew-pomade", "american-crew-fiber", "american-crew-matte-clay"]
  },
  {
    slug: "cantu-creme-caracois", name: "Cantu Coconut Curling Cream", brand: "Cantu", asin: "B01LTIAU6A",
    image: "imagens/produtos/cantu-creme-caracois.jpg", alt: "Frasco laranja de creme para caracóis Cantu Coconut Curling Cream com manteiga de karité, 340 g",
    bestFor: "Caracóis secos ou com frizz",
    summary: "Indicado para cabelo encaracolado que fica seco e com frizz: um creme sem enxaguar que define os caracóis sem os desfazer.",
    useCase: "Faz sentido depois do banho: com o cabelo ainda húmido, espalha pelos caracóis com os dedos e deixa secar sem mexer.",
    highlight: "Creme de caracóis com manteiga de karité e coco, sem sulfatos, silicones, parabenos nem óleo mineral, em frasco de 340 g.",
    strengths: ["a marca diz que define os caracóis sem pesar e hidrata", "manteiga de karité e coco; sem sulfatos, silicones nem parabenos", "frasco de 340 g: dura meses"],
    limits: ["em cabelo só ondulado ou fino pode pesar: começa com pouco", "é um creme, não fixa: para caracóis muito definidos junta um gel"],
    categories: ["pomadas-e-ceras"],
    articles: [CARACOIS, POMADA],
    related: ["tigi-catwalk-curls-rock", "uppercut-deluxe-matt-pomade", "american-crew-matte-clay"]
  },
  {
    slug: "tigi-catwalk-curls-rock", name: "TIGI Catwalk Curls Rock Amplifier", brand: "TIGI", asin: "B0007506U2",
    image: "imagens/produtos/tigi-catwalk-curls-rock.jpg", alt: "Frasco do creme para caracóis TIGI Catwalk Curls Rock Amplifier de 150 ml",
    bestFor: "Ondas e caracóis definidos",
    summary: "Indicado para quem tem ondas ou caracóis e quer que fiquem definidos e com menos frizz, também com humidade.",
    useCase: "Faz sentido com o cabelo seco à toalha: aplica, molda as secções com os dedos e deixa secar (ou usa difusor), como indica a marca.",
    highlight: "Creme para caracóis com provitamina B5, óleo de jojoba e vitamina E, que a marca diz transformar ondas em caracóis definidos; 150 ml.",
    strengths: ["a marca diz que define os caracóis e controla o frizz, mesmo com humidade", "com provitamina B5, óleo de jojoba e vitamina E", "textura leve, segundo a marca"],
    limits: ["frasco de 150 ml: rende menos do que o Cantu", "cheiro frutado, segundo a marca"],
    categories: ["pomadas-e-ceras"],
    articles: [CARACOIS, POMADA],
    related: ["cantu-creme-caracois", "uppercut-deluxe-matt-pomade", "got2b-beach-matt"]
  }
];
