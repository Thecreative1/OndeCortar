// 2026-10-11 — artigo protetor-solar-para-homem-qual-escolher (categoria Cuidados de rosto).
// Escolhidos pela procura (sugestões Google PT: pele oleosa, barba, careca, desporto, todos os dias,
// ISDIN Fusion Water, La Roche-Posay Anthelios Oil Control) e pelo ranking de Beleza da Amazon.es.
// Os 4 novos confirmados na Amazon.es a 2026-10-11: em stock, vendidos e enviados pela Amazon.
// Descartados: sprays para careca Beardburys e Better Be Bold (n.º 20–30 mil em Beleza, vendedores terceiros).
// O CeraVe SPF 50 já existia: volta a entrar só para a página dele ligar também a este guia.
const ROSTO = require("./produtos-2026-10-11-rosto.js");
const ARTICLE = "protetor-solar-para-homem-qual-escolher";
const cerave = ROSTO.find((p) => p.slug === "cerave-hidratante-rosto-spf50");

module.exports = [
  {
    slug: "isdin-fusion-water-magic-spf50", name: "ISDIN Fusion Water Magic SPF 50", brand: "ISDIN", asin: "B00Z72U6JQ",
    image: "imagens/produtos/isdin-fusion-water-magic.jpg", alt: "Frasco do protetor solar facial ISDIN Fusion Water Magic SPF 50 de 50 ml",
    bestFor: "Rosto, todos os dias",
    summary: "Indicado para quem quer um protetor solar de rosto para todos os dias que não brilhe nem pese, também com pele oleosa.",
    useCase: "Faz sentido como último passo da manhã: depois de lavar a cara (e do creme, se usas), no rosto, nas orelhas e no pescoço.",
    highlight: "Protetor solar facial SPF 50 de textura ligeira e fase aquosa, com acabamento mate segundo a marca, em 50 ml.",
    strengths: ["proteção SPF 50 contra UVA e UVB", "textura fluida de absorção imediata e acabamento mate, segundo a marca", "a marca indica-o para pele oleosa e diz que não irrita os olhos"],
    limits: ["não substitui reaplicar ao fim de umas horas ao sol", "frasco de 50 ml: para corpo e cabeça é preciso outro formato"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE, "creme-de-rosto-para-homem-como-escolher"],
    related: ["la-roche-posay-anthelios-oil-control", "cerave-hidratante-rosto-spf50", "heliocare-360-sport-stick"]
  },
  {
    slug: "la-roche-posay-anthelios-oil-control", name: "La Roche-Posay Anthelios UVMune 400 Oil Control SPF 50+", brand: "La Roche-Posay", asin: "B0BWSJGBHW",
    image: "imagens/produtos/la-roche-posay-anthelios-oil-control.jpg", alt: "Frasco do protetor solar La Roche-Posay Anthelios UVMune 400 Oil Control SPF 50+ de 50 ml",
    bestFor: "Pele muito oleosa",
    summary: "Indicado para quem tem a pele a brilhar a meio da manhã e desistiu do protetor solar por causa disso.",
    useCase: "Faz sentido de manhã em pele oleosa ou com tendência a borbulhas, como único produto ou por cima de um gel hidratante leve.",
    highlight: "Fluido solar SPF 50+ de largo espectro (UVA, UVB e IR-A) para pele sensível e oleosa, em 50 ml.",
    strengths: ["SPF 50+ de largo espectro, segundo a marca", "formulado para pele oleosa e sensível", "fluido, para aplicar sem deixar camada pesada"],
    limits: ["a marca pede para reaplicar com regularidade ao sol", "50 ml: pensado para o rosto, não para o corpo"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["isdin-fusion-water-magic-spf50", "cerave-oil-control-gel", "heliocare-360-sport-stick"]
  },
  {
    slug: "heliocare-360-sport-stick", name: "Heliocare 360º Sport Transparent Stick SPF 50+", brand: "Heliocare (Cantabria Labs)", asin: "B09DPVVDGK",
    image: "imagens/produtos/heliocare-360-sport-stick.jpg", alt: "Stick de protetor solar Heliocare 360 Sport Transparent Stick SPF 50+ de 25 g",
    bestFor: "Desporto e bolso",
    summary: "Indicado para quem corre, pedala ou trabalha ao ar livre e quer reaplicar no rosto sem sujar as mãos.",
    useCase: "Faz sentido no bolso ou no saco de desporto: passa-se no nariz, nas maçãs do rosto, nas orelhas e na linha da barba a meio do dia.",
    highlight: "Stick solar transparente SPF 50+ para o rosto, resistente à água e ao suor segundo a marca, em 25 g.",
    strengths: ["formato stick transparente, sem sujar as mãos", "resistente à água e ao suor, segundo a marca", "cabe num bolso para reaplicar ao longo do dia"],
    limits: ["25 g não chega para o corpo nem para a cabeça toda", "é para reaplicar e zonas pequenas, não para a primeira camada no rosto inteiro"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE],
    related: ["isdin-fusion-water-magic-spf50", "isdin-scalp-hair-spray-spf50", "la-roche-posay-anthelios-oil-control"]
  },
  {
    slug: "isdin-scalp-hair-spray-spf50", name: "ISDIN Scalp & Hair Spray SPF 50", brand: "ISDIN", asin: "B0GSBMFSFL",
    image: "imagens/produtos/isdin-scalp-hair-spray.jpg", alt: "Spray de protetor solar ISDIN Scalp & Hair SPF 50 para o couro cabeludo e o cabelo",
    bestFor: "Cabeça rapada",
    summary: "Indicado para quem tem a cabeça rapada ou pouco cabelo e quer proteger o couro cabeludo sem ficar com a cabeça a brilhar.",
    useCase: "Faz sentido antes de sair ao sol: pulveriza-se na cabeça, também com o couro cabeludo húmido, e repete-se depois de nadar ou suar muito.",
    highlight: "Spray solar SPF 50 para o couro cabeludo e o cabelo, transparente e não gorduroso segundo a marca.",
    strengths: ["feito para o couro cabeludo e o cabelo, com SPF 50", "acabamento transparente e não gorduroso, segundo a marca", "tecnologia Wet Skin: aplica-se também com a pele húmida"],
    limits: ["é para a cabeça: o rosto pede um protetor facial", "como qualquer protetor, tem de se repetir ao fim de umas horas ao sol"],
    categories: ["cuidados-de-rosto"],
    articles: [ARTICLE, "como-rapar-a-cabeca-em-casa-shaver-ou-maquina"],
    related: ["heliocare-360-sport-stick", "isdin-fusion-water-magic-spf50", "la-roche-posay-anthelios-oil-control"]
  },
  { ...cerave, articles: [...cerave.articles, ARTICLE] }
];
