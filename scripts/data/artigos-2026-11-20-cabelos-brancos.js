// 2026-11-20 — revista/cabelos-brancos-homem-como-disfarcar/ (artigo novo; 2.º nicho do radar de procura de 20/11,
// pedido pelo utilizador: "faz agora o Control GX para o cabelo").
// Radar (20/11): Amazon.es "control gx champu pelo" 7 100 compras/mês nos 12 primeiros; só o Control GX champô
// anticanas 3 000+, o 2 em 1 2 000+. Trends PT 12 meses: "cabelos brancos" 43,6 contra 1,1 de "aparador de barba".
// Google PT (20/11): "cabelos brancos homem" (shampoo, disfarçar, pintar, escurecer, diminuir, cobrir, esconder),
// "control gx shampoo" (funciona, continente, como usar, opiniões, wells, onde comprar, mulher, auchan), "tinta cabelo
// homem" (continente, mercadona, castanho escuro, grisalho, l'oréal, preto, grecin), "cabelo grisalho homem" (jovem,
// pintar, shampoo, deixar, corte, penteados), "cabelos brancos" (causas, o que fazer, falta de vitamina, amarelados o que
// fazer), "como esconder cabelos brancos sem pintar", "existe shampoo que escurece os cabelos brancos", "cabelos brancos
// aos 30 anos é normal". Não há outro artigo sobre o cabelo; liga ao da tinta de barba e ao da barba grisalha.
// Factos só das fichas na Amazon.es (20/11): Control GX champô B09697WX16 (reduz os brancos aos poucos a cada uso, em
// vez do champô habitual, cabelo molhado, massajar o couro cabeludo, enxaguar ao fim de 1 minuto; queratina; sem
// amoníaco nem peróxido); Control GX 2 em 1 B0968Z4QSF (champô e condicionador, mesmo modo de uso, pode usar-se todos
// os dias; sem amoníaco nem peróxido; entre os ingredientes há uma fenilenodiamina e aminofenóis); tinta em gel série H
// (H45 B089BNVYKS: misturar, aplicar e fazer espuma, 5 min, lavar; até 8 semanas sem desbotar com as lavagens;
// queratina, azeite e vitamina E; sem amoníaco; cores H25 a H55 — as fichas da série H estão mal escritas, citam packs
// de 3 e o champô de barba: não usar esses dados); L'Oréal Professionnel Silver B0918DMMPM (neutraliza os tons
// amarelados do cabelo branco ou grisalho com micropigmentos violeta; aplicar no cabelo molhado, emulsionar, enxaguar).
// Teste de alergia: a Just For Men pede 48 h antes de cada uso nas tintas em gel (aviso da ficha da M40); para a série H,
// remeter para o folheto. Sem preços, avaliações nem "testámos". Causas dos brancos: só o geral, médico para o resto.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const table = (cols, rows) =>
  "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr>" + cols.map((c) => "<th scope=\"col\">" + c + "</th>").join("") + "</tr></thead><tbody>" +
  rows.map((row) => "<tr><th scope=\"row\">" + row[0] + "</th>" + row.slice(1).map((c, i) => "<td data-label=\"" + cols[i + 1] + "\">" + c + "</td>").join("") + "</tr>").join("") +
  "</tbody></table></div>";

const GX = "just-for-men-control-gx-cabelo";
const GX2 = "just-for-men-control-gx-2em1";
const H45 = "just-for-men-tinta-cabelo-h45";
const SILVER = "loreal-professionnel-silver-champo";

module.exports = [
  {
    slug: "cabelos-brancos-homem-como-disfarcar",
    category: "guias-de-compra",
    published: "2026-11-20",
    title: "Cabelos brancos no homem: como disfarçar, escurecer ou assumir",
    h1: "Cabelos brancos no homem: como disfarçar, escurecer ou assumir",
    description: "Champô Control GX, tinta ou assumir o grisalho? Como disfarçar os cabelos brancos no homem, se o Control GX funciona, como se usa e que cor escolher.",
    schemaDescription: "Como disfarçar os cabelos brancos no homem: champô que escurece aos poucos (Control GX), tinta em gel ou assumir o grisalho; se o Control GX funciona e como se usa, que cor de tinta escolher e como tirar o amarelado do cabelo branco.",
    image: "imagens/revista/cabelos-brancos-homem.jpg",
    imageAlt: "Homem de meia-idade com o cabelo grisalho curto e pera branca, ao ar livre junto a um rio",
    readMinutes: 8,
    criteria: "Características, modo de uso e avisos conforme publicados pela Just For Men e pela L'Oréal Professionnel nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Conselhos gerais; causas médicas e reações na pele são para o médico. Não testamos produtos.",
    lede: "Sim, existe um champô que escurece os cabelos brancos: o Just For Men Control GX, que se usa em vez do champô habitual e reduz o branco aos poucos, a cada lavagem. É o caminho mais discreto, porque ninguém repara numa mudança gradual. Para tapar tudo de uma vez há a tinta em gel, em 5 minutos. E assumir o grisalho também é uma escolha, desde que o cabelo esteja cuidado.",
    subcopy: "Os três caminhos, se o Control GX funciona e como se usa, que cor de tinta escolher, como tirar o tom amarelado do cabelo branco e quando os brancos são assunto para o médico.",
    heroActions: [["#tres-caminhos", "Disfarçar, cobrir ou assumir?"], ["#control-gx", "O Control GX funciona?"]],
    quick: [
      ["Existe champô que escurece os brancos?", "Sim. O Just For Men Control GX usa-se em vez do champô habitual e, segundo a marca, reduz os cabelos brancos aos poucos, a cada lavagem."],
      ["O Control GX funciona?", "Funciona aos poucos, não de um dia para o outro: é por isso que fica natural. Não tem amoníaco nem peróxido, segundo a marca."],
      ["E para tapar tudo?", "Uma tinta em gel própria para homem, como a Just For Men da série H: 5 minutos e, segundo a marca, dura até 8 semanas."],
      ["Quero assumir o grisalho", "Corte curto e arrumado e um champô roxo, como o L'Oréal Professionnel Silver, para tirar o tom amarelado."]
    ],
    summary: [
      "Champô gradual: o mais discreto e o mais fácil",
      "Tinta: tapa tudo, mas a raiz volta a notar-se",
      "Escolhe sempre um tom mais claro do que o teu",
      "Teste de alergia antes de qualquer colorante",
      "Grisalho assumido: corte curto e champô roxo",
      "Brancos muito cedo e de repente: fala com o médico"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Control GX para o cabelo",
      text: "O champô da Just For Men que reduz os cabelos brancos aos poucos, sem amoníaco nem peróxido. Vê para quem é e as limitações.",
      actions: [["../../produto/" + GX + "/", "Ver o Control GX"], ["../../revista/tinta-para-barba-como-pintar-a-barba-branca/", "Brancos na barba"]]
    },
    sections: [
      {
        id: "tres-caminhos",
        h2: "Disfarçar aos poucos, cobrir ou assumir: o que escolher",
        html: "<p>Antes da marca e da cor, decide o que queres que os outros vejam. Há três caminhos, e nenhum é o certo para todos:</p>" +
          table(["Caminho", "Como fica", "Quanto dura", "A ter em conta"], [
            ["Champô gradual<br>(" + p(GX, "Control GX") + ")", "Os brancos escurecem aos poucos; fica um grisalho mais discreto", "Enquanto o usares", "O mais natural e o mais fácil: substitui o champô"],
            ["Tinta em gel<br>(" + p(H45, "Just For Men, série H") + ")", "Tapa os brancos de uma vez", "Até 8 semanas, segundo a marca", "A raiz branca volta a ver-se; teste de alergia antes"],
            ["Assumir o grisalho", "Cabelo grisalho, curto e cuidado", "—", "Pede um bom corte e, se amarelar, um " + p(SILVER, "champô roxo") + "."]
          ]) +
          "<p><strong>A nossa sugestão: começa pelo champô gradual.</strong> É reversível (se paras, o branco volta aos poucos), ninguém repara na mudança e não há misturas nem tempos de espera. Se ao fim de umas semanas quiseres tapar mais, passa à tinta.</p>"
      },
      {
        id: "control-gx",
        h2: "Control GX: funciona? Como se usa",
        html: "<p>É a pergunta mais pesquisada sobre o tema, e a resposta honesta é: <strong>funciona aos poucos</strong>. O " + p(GX, "Just For Men Control GX") + " é um champô colorante: segundo a marca, reduz os cabelos brancos gradualmente a cada uso, sem mudanças repentinas, até ao resultado que queres. É isso que o torna discreto, e é também a razão por que não serve a quem quer o cabelo escuro amanhã.</p>" +
          "<h3>Como se usa</h3><ol class=\"rich-list\">" +
          "<li>Usa-o <strong>em vez do teu champô habitual</strong>, com o cabelo já molhado.</li>" +
          "<li>Massaja o couro cabeludo com a ponta dos dedos até fazer espuma.</li>" +
          "<li>Ao fim de cerca de 1 minuto, enxagua bem.</li>" +
          "<li>Repete nas lavagens seguintes: o efeito vai-se acumulando. Quando chegares ao tom que queres, continua a usá-lo para o manter.</li></ol>" +
          "<p>Segundo a Just For Men, não tem amoníaco nem peróxido e leva queratina. É vendido para homem; a marca não indica outro uso.</p>" +
          cta("B09697WX16", GX) +
          "<h3>Control GX 2 em 1: champô e condicionador</h3>" +
          "<p>O " + p(GX2, "Control GX 2 em 1") + " junta champô e condicionador e usa-se da mesma forma. A marca diz que se pode usar todos os dias. É a escolha para quem já usa condicionador e não quer dois frascos.</p>" +
          cta("B0968Z4QSF", GX2) +
          "<p><strong>Barba e cabelo são produtos diferentes.</strong> Há um " + r("tinta-para-barba-como-pintar-a-barba-branca", "Control GX próprio para a barba") + ", feito para o pelo mais grosso. Usa cada um na sua zona.</p>"
      },
      {
        id: "tinta",
        h2: "Tinta para cabelo de homem: tapar os brancos de uma vez",
        html: "<p>Se queres tapar os brancos todos, a solução é uma tinta pensada para homem, de aplicação rápida. A " + p(H45, "tinta em gel Just For Men da série H") + " é para o cabelo (a série M é para a barba): misturas, aplicas e fazes espuma, esperas 5 minutos e lavas. Segundo a marca, não tem amoníaco, leva queratina, azeite e vitamina E e dura até 8 semanas sem desbotar com as lavagens.</p>" +
          cta("B089BNVYKS", H45) +
          "<ul class=\"rich-list\">" +
          "<li><strong>Teste de alergia primeiro.</strong> Nas suas tintas em gel, a Just For Men pede um teste 48 horas antes de cada aplicação, mesmo para quem já usou. Segue sempre o folheto da caixa.</li>" +
          "<li><strong>Os avisos da marca para as tintas em gel</strong> incluem não as usar em menores de 16 anos, com a pele irritada ou se já reagiste a uma tinta ou a uma tatuagem de hena negra.</li>" +
          "<li><strong>A raiz volta.</strong> O cabelo cresce e os brancos aparecem na raiz. Com uma cor um pouco mais clara, a diferença nota-se menos.</li></ul>"
      },
      {
        id: "que-cor",
        h2: "Que cor escolher",
        html: "<p>Tal como na barba, <strong>escolhe um tom mais claro do que o teu cabelo parece</strong>. Uma cor escura e uniforme, sobretudo à volta das têmporas, é o que denuncia a tinta. As cores da série H:</p>" +
          table(["Código", "Cor", "Para quem"], [
            ["H25", "Castanho claro", "Cabelo claro ou alourado"],
            ["H30", "Castanho médio", "Cabelo castanho médio"],
            ["H35", "Castanho escuro", "Cabelo castanho escuro"],
            ["H40", "Castanho escuro médio", "Entre o castanho escuro e o moreno"],
            ["H45", "Moreno", "Cabelo muito escuro"],
            ["H55", "Preto", "Só para cabelo realmente preto"]
          ]) +
          "<p>Na dúvida entre duas cores, escolhe a mais clara. Para quem procura <strong>tinta para cabelo grisalho</strong>, ou seja, escurecer sem perder todo o branco, o caminho é o champô gradual e não a tinta.</p>"
      },
      {
        id: "sem-pintar",
        h2: "Como esconder os cabelos brancos sem pintar",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Champô gradual:</strong> é a forma mais próxima de \"não pintar\". Não há mistura nem espera, e o resultado é discreto.</li>" +
          "<li><strong>O corte certo:</strong> com o cabelo curto dos lados, os brancos das têmporas quase desaparecem. Um " + r("tipos-de-degrade-como-pedir-o-corte-certo", "degradê") + " bem feito disfarça mais do que se pensa.</li>" +
          "<li><strong>Receitas caseiras</strong> (chá preto, café, ervas) dão no máximo um tom ligeiro e passageiro, e podem manchar a pele e as toalhas.</li></ul>"
      },
      {
        id: "assumir",
        h2: "Assumir o grisalho: corte e cuidados",
        html: "<p>Cada vez mais homens deixam o grisalho à vista, e resulta quando parece uma escolha. O que mais pesa:</p><ul class=\"rich-list\">" +
          "<li><strong>Corte curto e arrumado,</strong> sobretudo dos lados. Cabelo grisalho comprido e sem forma é o que dá ar descuidado.</li>" +
          "<li><strong>Barba a condizer:</strong> curta e com linhas limpas. Ver " + r("barba-grisalha-assumir-ou-pintar", "barba grisalha: assumir ou pintar") + ".</li>" +
          "<li><strong>Sem tom amarelado:</strong> o cabelo branco pode ganhar um tom amarelado com o sol, o fumo e alguns produtos. Um champô roxo, como o " + p(SILVER, "L'Oréal Professionnel Silver") + ", neutraliza esses tons com micropigmentos violeta, segundo a marca. Usa-se no cabelo molhado, como um champô normal, de vez em quando.</li></ul>" +
          cta("B0918DMMPM", SILVER) +
          "<p>Um barbeiro que conheça o teu cabelo é o melhor aliado aqui: encontra uma barbearia perto de ti no <a href=\"../../cidades/\">diretório por cidade</a>. Muitas fazem também coloração ou camuflagem de brancos, se preferires não o fazer em casa.</p>"
      },
      {
        id: "porque",
        h2: "Cabelos brancos aos 30: é normal?",
        html: "<p>Na maioria dos casos, sim. O cabelo ganha cor com o pigmento que o folículo produz, e com os anos produz cada vez menos. Quando começa e a que ritmo depende sobretudo da genética: há quem tenha brancos aos 25 e quem não os tenha aos 50.</p>" +
          "<p>Se os brancos aparecem muito cedo, muito de repente, ou com outros sinais (cansaço, queda de cabelo, alterações na pele), fala com o médico. Há causas que só ele pode avaliar, e não vale a pena tentar resolvê-las com vitaminas por conta própria.</p>"
      },
      {
        id: "onde-comprar",
        h2: "Continente, Wells ou online?",
        html: "<p>As pesquisas mostram que muita gente procura o Control GX no Continente, no Wells e no Auchan, e as tintas para homem no Continente e no Mercadona. O produto é o mesmo; confirma sempre o nome e a versão (cabelo ou barba, champô ou 2 em 1) e, nas tintas, o código da cor.</p>"
      }
    ],
    faq: [
      ["Existe champô que escurece os cabelos brancos?", "Sim. O Just For Men Control GX é um champô colorante que, segundo a marca, reduz os cabelos brancos aos poucos, a cada lavagem, sem amoníaco nem peróxido. Usa-se em vez do champô habitual."],
      ["O Control GX funciona?", "Funciona de forma gradual: os brancos vão escurecendo a cada lavagem, e o efeito mantém-se enquanto o usas. Não é para quem quer o cabelo escuro de um dia para o outro."],
      ["Como se usa o Control GX?", "Em vez do champô habitual, com o cabelo molhado: massaja o couro cabeludo até fazer espuma e enxagua ao fim de cerca de 1 minuto. Repete nas lavagens seguintes até ao tom que queres."],
      ["O Control GX da barba serve no cabelo?", "São produtos diferentes: há um Control GX para o cabelo e outro para a barba, feito para o pelo mais grosso. Usa cada um na sua zona."],
      ["Qual o melhor champô para cabelos brancos de homem?", "Para escurecer aos poucos, o Just For Men Control GX, ou o Control GX 2 em 1 se queres champô e condicionador num só. Para assumir o grisalho e tirar o tom amarelado, um champô roxo como o L'Oréal Professionnel Silver. Não testamos produtos."],
      ["Que cor de tinta de cabelo devo escolher?", "Um tom mais claro do que o teu cabelo parece. Na série H da Just For Men vai do H25 (castanho claro) ao H55 (preto). Na dúvida entre duas, a mais clara."],
      ["Quanto dura a tinta Just For Men no cabelo?", "Segundo a marca, até 8 semanas, sem desbotar com as lavagens. Os brancos voltam a notar-se na raiz à medida que o cabelo cresce."],
      ["Como tirar o amarelado do cabelo branco?", "Com um champô roxo, como o L'Oréal Professionnel Silver, que neutraliza os tons amarelados com micropigmentos violeta, segundo a marca. Evitar o fumo e proteger o cabelo do sol também ajuda."],
      ["Ter cabelos brancos aos 30 é normal?", "Na maioria dos casos, sim: depende sobretudo da genética. Se aparecem muito cedo, de repente ou com outros sintomas, fala com o médico."]
    ],
    faqCta: "Vê o <a href=\"../../produto/" + GX + "/\">Control GX</a>, o <a href=\"../../produto/" + GX2 + "/\">Control GX 2 em 1</a>, a <a href=\"../../produto/" + H45 + "/\">tinta da série H</a> ou o <a href=\"../../produto/" + SILVER + "/\">champô Silver</a>.",
    related: ["tinta-para-barba-como-pintar-a-barba-branca", "barba-grisalha-assumir-ou-pintar", "tipos-de-degrade-como-pedir-o-corte-certo"],
    finalCta: {
      h2: "Devagar e mais claro, ou assumido e bem cortado",
      text: "Um champô que escurece aos poucos ou um grisalho com bom corte: as duas resultam. O que não resulta é uma cor escura de mais, feita à pressa.",
      actions: [["../../produto/" + GX + "/", "Ver o Control GX"], ["../../cidades/", "Barbearias por cidade"]]
    }
  }
];
