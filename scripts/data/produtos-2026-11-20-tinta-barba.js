// 2026-11-20 — tinta e champô para os brancos da barba (Just For Men), para o artigo novo
// revista/tinta-para-barba-como-pintar-a-barba-branca/. Pedido pelo utilizador ("avança") depois do estudo de nicho
// de 20/11: Trends PT "just for men" 3,4 (12 meses) contra "aparador de barba" 1,1; Google PT "tinta para barba"
// (+ Continente, Mercadona, Pingo Doce), "just for men control gx", "control gx funciona"; Amazon.es "comprados el mes
// pasado": Control GX barba 900+, Retoque 200+, M40 100+. Os 3 em stock e vendidos pela Amazon a 20/11.
// Escolhido o M40 com pincel em vez do gel M35 (600+): a ficha do M35 mistura cores e fala de pack de 3.
// Só dados das fichas da Just For Men na Amazon.es (20/11). Sem preços nem avaliações.
const ART = "tinta-para-barba-como-pintar-a-barba-branca";
module.exports = [
  {
    slug: "just-for-men-control-gx-barba", name: "Just For Men Control GX Barba (champô, 118 ml)", brand: "Just For Men", asin: "B0BKB7WSD7",
    image: "imagens/produtos/just-for-men-control-gx-barba.jpg", alt: "Bisnaga e caixa do champô Just For Men Control GX Barba, redutor de brancos para a barba, 118 ml",
    bestFor: "Disfarçar os brancos aos poucos",
    summary: "Indicado para quem nunca pintou a barba e quer menos brancos sem que ninguém repare na mudança.",
    useCase: "Usa-se em vez do champô de barba habitual: lavas, deixas atuar um pouco e enxaguas. Os brancos escurecem a cada lavagem, por isso o resultado é gradual e fica algum grisalho.",
    highlight: "Champô colorante da Just For Men só para a barba: reduz os brancos gradualmente a cada lavagem, com um resultado subtil, e deixa a barba mais macia e com mais volume, segundo a marca.",
    strengths: ["escurece aos poucos, sem o ar de barba pintada de um dia para o outro", "usa-se como um champô, sem misturas nem tempos de espera longos", "deixa algum grisalho, para quem não quer tapar tudo"],
    limits: ["não serve para quem quer a barba escura no próprio dia: o efeito acumula-se com as lavagens", "a marca não o recomenda em barba aclarada, descolorada, com madeixas, pintada de loiro ou com hena; como colorante, pode dar alergia"],
    categories: ["oleos-e-balms"],
    articles: [ART, "barba-grisalha-assumir-ou-pintar"],
    related: ["just-for-men-bigode-barba-m40", "just-for-men-retoque-instantaneo-barba", "viking-revolution-beard-oil"]
  },
  {
    slug: "just-for-men-bigode-barba-m40", name: "Just For Men Bigode e Barba M40 (tinta em gel com pincel)", brand: "Just For Men", asin: "B0BZDSM71F",
    image: "imagens/produtos/just-for-men-barba-bigode-m40.jpg", alt: "Caixa da tinta Just For Men Bigode e Barba M-40, castanho escuro médio, com o pincel de aplicação",
    bestFor: "Tapar os brancos todos",
    summary: "Indicado para quem quer tapar os brancos da barba e do bigode de uma vez, em casa, em 5 minutos.",
    useCase: "Misturas a cor com o ativador na bandeja, aplicas com o pincel, esperas 5 minutos e lavas. A cor dura até o pelo voltar a crescer. Escolhe um tom mais claro do que a tua barba parece: o M40 é castanho escuro médio, e há do M25 (castanho claro) ao M55 (preto) na mesma página.",
    highlight: "Tinta em gel da Just For Men para barba, bigode e patilhas: 5 minutos, sem amoníaco, com biotina, óleo de coco e aloé vera, e na caixa a cor, o ativador, a bandeja, o pincel e as luvas.",
    strengths: ["tapa os brancos de uma vez, em 5 minutos", "traz tudo na caixa: cor, ativador, bandeja, pincel e luvas", "várias cores, do castanho claro ao preto, na mesma página"],
    limits: ["teste de alergia 48 horas antes de cada uso, mesmo para quem já usou: compra-se dois dias antes", "não é para menores de 16, sobrancelhas ou pestanas, pele irritada, quem reagiu a hena negra ou tem vitiligo; a cor errada nota-se"],
    categories: ["oleos-e-balms"],
    articles: [ART, "barba-grisalha-assumir-ou-pintar"],
    related: ["just-for-men-control-gx-barba", "just-for-men-retoque-instantaneo-barba", "proraso-balsamo-barba"]
  },
  {
    slug: "just-for-men-retoque-instantaneo-barba", name: "Just For Men Retoque Instantâneo (barba e sobrancelhas)", brand: "Just For Men", asin: "B0CB45W2SG",
    image: "imagens/produtos/just-for-men-retoque-canas-barba.jpg", alt: "Embalagem do Just For Men Retoque Instantâneo para barba e sobrancelhas, com escova aplicadora, castanho médio",
    bestFor: "Um dia ou disfarçar falhas",
    summary: "Indicado para cobrir os brancos ou as falhas da barba só por um dia, num evento ou para experimentar uma cor antes de pintar.",
    useCase: "Aplica-se com a escova, como uma máscara de pestanas, diretamente nos brancos ou nas zonas com menos pelo. Ao fim de 5 minutos está pronto e aguenta o dia; sai ao lavar com sabão ou gel de barba e água morna.",
    highlight: "Cor temporária da Just For Men para barba e sobrancelhas: cobre os brancos, preenche as zonas com menos pelo, dura o dia e sai ao lavar. Há 3 tons.",
    strengths: ["temporário: sai ao lavar, sem compromisso", "disfarça também as falhas da barba", "serve para as sobrancelhas, ao contrário da tinta em gel"],
    limits: ["dura só um dia: para todos os dias, a tinta ou o champô gradual dão menos trabalho", "só 3 tons; pode irritar a pele, e aí deve deixar de ser usado"],
    categories: ["oleos-e-balms"],
    articles: [ART, "barba-falhada-o-que-fazer"],
    related: ["just-for-men-control-gx-barba", "just-for-men-bigode-barba-m40", "viking-revolution-beard-oil"]
  }
];
