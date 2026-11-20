// 2026-11-20 — revista/como-disfarcar-a-calvicie-fibras-capilares/ (artigo novo; ronda "tabu" do radar de procura de
// 20/11; avaliado a pedido do utilizador ("as fibras capilares valem a pena?") e aprovado: "Sim, avança").
// Radar/Amazon.es (20/11): "fibras capilares hombre" 1 650 compras/mês nos 12 primeiros, "toppik fibras" 1 300; os mais
// vendidos são genéricos de vendedores chineses (não recomendados); Toppik castanho escuro vendido pela Amazon (100+);
// IMPERIO (vendedor IMPERIO Deutschland, 200+). Google PT (20/11): "fibras capilares" (wells, continente, primor, onde
// comprar, queratina, toppik), "fibras capilares toppik como usar", "disfarçar calvície" (masculina, pó, spray, produto,
// cortes), "cortes masculino para disfarçar calvície", "corte de cabelo para disfarçar entradas masculino", "corte para
// quem tem pouco cabelo (na frente, fino)", "calvície tem cura (homem, androgenética, precoce)". Trends: 429, por ver.
// Não compete com cortes-de-cabelo-masculino-qual-combina-comigo (tem "Cortes para quem tem entradas"): este fica nas
// fibras e no disfarçar, e liga a esse para os cortes; liga também a como-rapar-a-cabeca-em-casa-shaver-ou-maquina.
// Factos só das fichas na Amazon.es (20/11): Toppik B0009FHJRS (Amazon; fibras de queratina corada que se misturam com o
// cabelo; aderem por carga eletrostática; aplicar como saleiro ou com o aplicador em spray (vendido à parte); lavar,
// secar e pentear antes; só uso externo, evitar os olhos, não inalar, parar se irritar; 12 g, castanho escuro — a foto
// da ficha mostra o frasco preto); IMPERIO B01N0MERQ7 (vendedor IMPERIO Deutschland; algodão orgânico, sem queratina,
// a marca diz servir a pessoas alérgicas; 10 cores; 26 g; fixar com laca; a marca diz resistir a vento, água e suor;
// sai ao lavar). Tema de saúde: só disfarçar; tratar a queda é com o médico/dermatologista; sem minoxidil nem promessas.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const table = (cols, rows) =>
  "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr>" + cols.map((c) => "<th scope=\"col\">" + c + "</th>").join("") + "</tr></thead><tbody>" +
  rows.map((row) => "<tr><th scope=\"row\">" + row[0] + "</th>" + row.slice(1).map((c, i) => "<td data-label=\"" + cols[i + 1] + "\">" + c + "</td>").join("") + "</tr>").join("") +
  "</tbody></table></div>";

const TOP = "toppik-fibras-capilares-castanho-escuro";
const IMP = "imperio-fibras-capilares";

module.exports = [
  {
    slug: "como-disfarcar-a-calvicie-fibras-capilares",
    category: "guias-de-compra",
    published: "2026-11-20",
    title: "Como disfarçar a calvície: fibras capilares, corte certo ou rapar",
    h1: "Como disfarçar a calvície: fibras capilares, corte certo ou rapar",
    description: "Fibras capilares funcionam? Como disfarçar a calvície e as entradas: Toppik ou IMPERIO, como aplicar, que corte pedir ao barbeiro e quando rapar.",
    schemaDescription: "Como disfarçar a calvície no homem: se as fibras capilares funcionam e como se aplicam, Toppik ou IMPERIO, que cor escolher, que corte pedir ao barbeiro, quando faz sentido rapar e quando ir ao médico.",
    image: "imagens/revista/disfarcar-calvicie-entradas.jpg",
    imageAlt: "Barbeiro a cortar o cabelo de um cliente com a máquina, com os lados curtos e o topo penteado com pente",
    readMinutes: 7,
    criteria: "Características, modo de uso e avisos conforme publicados pela Toppik e pela IMPERIO nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Disfarçar não é tratar: a queda de cabelo avalia-se no médico ou no dermatologista. Não testamos produtos.",
    lede: "Há três maneiras de disfarçar a calvície, e quase sempre funcionam melhor juntas: um corte que não chame a atenção para as zonas com menos cabelo, fibras capilares para dar densidade onde o cabelo é fino, e, quando já não compensa, rapar. As fibras funcionam enquanto ainda há cabelo para se agarrarem; numa zona sem cabelo nenhum não fazem milagres.",
    subcopy: "Se as fibras capilares funcionam, qual escolher e como aplicar sem se notar, que corte pedir ao barbeiro e quando é melhor rapar. Sem promessas de cura.",
    heroActions: [["#fibras", "As fibras funcionam?"], ["#corte", "Que corte pedir"]],
    quick: [
      ["As fibras capilares funcionam?", "Disfarçam onde o cabelo é fino: agarram-se aos fios que existem e dão densidade. Numa zona totalmente careca não há onde se agarrarem."],
      ["Qual escolher?", "A Toppik, de queratina, vendida pela Amazon. Se és alérgico ou queres outra cor, a IMPERIO, de algodão, com 10 cores."],
      ["Que corte disfarça?", "Lados curtos e topo curto com textura. Cabelo comprido e penteado para trás realça as entradas."],
      ["E tratar a queda?", "É outra conversa, e é com o médico ou o dermatologista. Disfarçar não trata."]
    ],
    summary: [
      "Corte curto dos lados, textura em cima",
      "Fibras onde o cabelo é fino, não onde não há",
      "Cor igual ou um tom mais claro",
      "Laca leve para fixar; sai ao lavar",
      "Coroa e topo muito ralos: rapar pode ficar melhor",
      "Queda rápida ou às zonas: médico"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Fibras capilares Toppik",
      text: "Fibras de queratina que se agarram ao cabelo e dão densidade onde é fino. Vê para quem é e as limitações.",
      actions: [["../../produto/" + TOP + "/", "Ver a Toppik"], ["../../revista/cortes-de-cabelo-masculino-qual-combina-comigo/", "Cortes para entradas"]]
    },
    sections: [
      {
        id: "tres-caminhos",
        h2: "Corte, fibras ou rapar: o que escolher",
        html: "<p>Depende de quanto cabelo ainda tens e de onde falta:</p>" +
          table(["Situação", "O que costuma resultar", "A ter em conta"], [
            ["Entradas a começar", "Corte curto dos lados e topo com textura", "É o mais simples: muitas vezes chega o corte."],
            ["Cabelo fino no topo ou na coroa", "Corte curto + fibras capilares", "As fibras precisam de cabelo onde se agarrar."],
            ["Topo e coroa muito ralos", "Rapar, ou máquina muito curta", "Assumido e limpo fica melhor do que tapado."],
            ["Queda rápida, às zonas, ou muito cedo", "Médico ou dermatologista", "Primeiro perceber a causa; disfarçar vem depois."]
          ]) +
          "<p>O erro mais comum é deixar crescer o cabelo para tapar. Cabelo comprido sobre uma zona rala, sobretudo penteado para o lado ou para trás, chama mais a atenção do que a própria calvície.</p>"
      },
      {
        id: "fibras",
        h2: "Fibras capilares funcionam?",
        html: "<p>Funcionam para o que prometem: <strong>disfarçar</strong>. São fibras muito finas, coradas, que se agarram aos fios de cabelo que tens e os fazem parecer mais grossos, tapando o couro cabeludo que se via entre eles. Segundo a Toppik, as fibras de queratina agarram-se ao cabelo por carga eletrostática e misturam-se com ele.</p>" +
          "<ul class=\"rich-list\">" +
          "<li><strong>Onde resultam:</strong> cabelo fino no topo, na risca ou na coroa, e entradas onde ainda há algum cabelo.</li>" +
          "<li><strong>Onde não resultam:</strong> zonas completamente carecas. Sem cabelo, as fibras não têm onde se agarrar.</li>" +
          "<li><strong>Quanto duram:</strong> até à lavagem seguinte. Saem com o champô.</li>" +
          "<li><strong>Não tratam a queda.</strong> São cosmética, como um corretor para o cabelo.</li></ul>"
      },
      {
        id: "qual-escolher",
        h2: "Toppik ou IMPERIO: que fibras capilares escolher",
        html: "<p>Na Amazon.es, os mais vendidos são fibras genéricas de vendedores de que não sabemos nada, e não as recomendamos. Estas são as duas marcas que escolhemos:</p>" +
          "<h3>A nossa escolha: Toppik</h3>" +
          "<p>A " + p(TOP, "Toppik") + " é a marca que aparece nas pesquisas de fibras capilares em Portugal (\"fibras capilares toppik\", \"toppik como usar\"). As fibras são de queratina corada; aplicam-se como um saleiro ou com o aplicador em spray, que se vende à parte. Na Amazon.es, a versão vendida pela própria Amazon é o castanho escuro de 12 g (atenção: a foto da ficha mostra o frasco preto). Os avisos da marca: só uso externo, evitar os olhos e não inalar.</p>" +
          cta("B0009FHJRS", TOP) +
          "<h3>Sem queratina e com mais cores: IMPERIO</h3>" +
          "<p>As " + p(IMP, "fibras IMPERIO") + " são de algodão orgânico, sem queratina, e a marca diz que servem a pessoas alérgicas. Há 10 cores, do louro claro ao preto, incluindo branco e grisalho, e o frasco tem 26 g. A marca recomenda fixá-las com laca e diz que resistem ao vento, à água e ao suor, e que saem ao lavar. A limitação: na Amazon.es são vendidas por um vendedor externo.</p>" +
          cta("B01N0MERQ7", IMP)
      },
      {
        id: "como-aplicar",
        h2: "Como aplicar as fibras capilares sem se notar",
        html: "<ol class=\"rich-list\">" +
          "<li><strong>Cabelo lavado, seco e penteado</strong> como o usas no dia a dia. As fibras vão por cima, no fim.</li>" +
          "<li><strong>Escolhe a cor igual ou um tom mais claro</strong> do que o teu cabelo. Mais escura do que o cabelo, nota-se na raiz.</li>" +
          "<li><strong>Aplica aos poucos e com alguma distância</strong>, só nas zonas finas. Menos é mais: podes sempre pôr outra camada.</li>" +
          "<li><strong>Toca de leve com os dedos</strong> para as fibras assentarem, sem esfregar.</li>" +
          "<li><strong>Fixa com uma laca leve</strong>, se a marca o recomendar, como a IMPERIO.</li>" +
          "<li><strong>Limpa a testa e as orelhas</strong> de fibras soltas antes de sair.</li></ol>" +
          "<p>Cuidado com chuva forte, piscina e almofadas claras: as fibras saem com água e fricção. E sem inalar ao aplicar.</p>"
      },
      {
        id: "corte",
        h2: "Que corte pedir ao barbeiro para disfarçar a calvície",
        html: "<p>O corte faz mais do que qualquer produto. A regra geral: <strong>lados curtos e topo curto com textura</strong>. Lados curtos fazem o topo parecer mais cheio; um topo curto e desarrumado tapa melhor as zonas ralas do que cabelo comprido e liso.</p><ul class=\"rich-list\">" +
          "<li><strong>Com entradas:</strong> um crop texturizado, com franja curta para a frente. Penteado para trás realça as entradas.</li>" +
          "<li><strong>Com a coroa rala:</strong> topo curto, sem risca marcada nem redemoinho exposto.</li>" +
          "<li><strong>Com pouco cabelo em geral:</strong> um " + r("buzz-cut-corte-militar-que-numero-pedir", "buzz cut") + " ou um degradê curto. Quanto mais curto o cabelo, menos contraste com as zonas ralas.</li></ul>" +
          "<p>Explicamos os cortes em detalhe, com o que pedir, em " + r("cortes-de-cabelo-masculino-qual-combina-comigo", "cortes de cabelo masculino: qual combina contigo") + ". E um barbeiro que vê o teu cabelo ao vivo acerta melhor do que qualquer guia: encontra um perto de ti no <a href=\"../../cidades/\">diretório por cidade</a>.</p>"
      },
      {
        id: "rapar",
        h2: "Quando é melhor rapar",
        html: "<p>Quando o topo e a coroa estão muito ralos, tapar costuma dar mais trabalho e pior resultado do que assumir. Uma cabeça rapada, ou com a máquina muito curta, fica limpa e intencional. Barba curta e bem desenhada ajuda a equilibrar o rosto.</p>" +
          "<p>Se decidires rapar, explicamos como fazê-lo em casa, com shaver ou máquina, em " + r("como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "rapar a cabeça em casa: shaver ou máquina") + ".</p>"
      },
      {
        id: "tratar",
        h2: "Calvície tem cura? Quando ir ao médico",
        html: "<p>A calvície mais comum nos homens é genética e progressiva. Há tratamentos, mas são decisão médica: cada um tem indicações, efeitos e limites, e não cabe a um guia de barbearia escolhê-los. Vai ao médico ou ao dermatologista sobretudo se:</p><ul class=\"rich-list\">" +
          "<li>o cabelo cai muito depressa, ou de repente;</li>" +
          "<li>cai às zonas, em círculos;</li>" +
          "<li>há comichão, vermelhidão ou feridas no couro cabeludo;</li>" +
          "<li>começou muito cedo e queres saber as opções.</li></ul>" +
          "<p>As fibras, o corte e a máquina servem para te sentires bem com o cabelo que tens hoje, enquanto decides o resto.</p>"
      }
    ],
    faq: [
      ["As fibras capilares funcionam?", "Funcionam para disfarçar: agarram-se aos fios que tens e fazem o cabelo parecer mais denso. Não resultam em zonas sem cabelo nenhum e não tratam a queda."],
      ["Qual a melhor fibra capilar?", "Escolhemos a Toppik, de queratina, vendida pela Amazon em castanho escuro. Para quem é alérgico à queratina ou quer outra cor, a IMPERIO, de algodão, com 10 cores. Não testamos produtos."],
      ["Como se usam as fibras capilares Toppik?", "Com o cabelo lavado, seco e penteado, aplicam-se como um saleiro, ou com o aplicador em spray vendido à parte, só nas zonas mais finas. Depois toca-se de leve com os dedos. A marca pede para evitar os olhos e não inalar."],
      ["As fibras capilares saem com a chuva?", "Saem com água e com o champô. A IMPERIO diz que, fixadas com laca, resistem ao vento, à água e ao suor, mas chuva forte e piscina continuam a ser um risco."],
      ["Que cor de fibras capilares escolher?", "A mesma cor do teu cabelo ou um tom mais claro. Mais escura do que o cabelo nota-se."],
      ["Que corte disfarça a calvície?", "Lados curtos e topo curto com textura. Para entradas, um crop com franja curta; com pouco cabelo, um buzz cut ou degradê curto. Cabelo comprido e penteado para trás realça a calvície."],
      ["Calvície tem cura?", "A calvície mais comum nos homens é genética e progressiva. Há tratamentos, mas são decisão médica: fala com o médico ou o dermatologista."],
      ["Quando é melhor rapar o cabelo?", "Quando o topo e a coroa estão muito ralos e tapar já dá mais trabalho do que resultado. Rapado ou muito curto fica limpo e intencional."]
    ],
    faqCta: "Vê a <a href=\"../../produto/" + TOP + "/\">Toppik</a>, as <a href=\"../../produto/" + IMP + "/\">fibras IMPERIO</a> ou o guia para <a href=\"../../revista/como-rapar-a-cabeca-em-casa-shaver-ou-maquina/\">rapar a cabeça em casa</a>.",
    related: ["cortes-de-cabelo-masculino-qual-combina-comigo", "como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "cabelos-brancos-homem-como-disfarcar"],
    finalCta: {
      h2: "Corte curto, fibras onde faz falta",
      text: "Um bom corte resolve metade; as fibras tapam o resto onde o cabelo é fino. Quando já não compensa, rapar é uma escolha, não uma derrota.",
      actions: [["../../produto/" + TOP + "/", "Ver a Toppik"], ["../../cidades/", "Barbearias por cidade"]]
    }
  }
];
