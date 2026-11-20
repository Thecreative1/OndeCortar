// 2026-11-20 — revista/creme-depilatorio-homem-como-usar/ (artigo novo; ronda "tabu" do radar de procura de 20/11,
// pedida pelo utilizador: "algo que o pessoal tenha vergonha mas se compre"; recomendado e aprovado: "Sim, avança").
// Radar (20/11, radar/2026-11-20/relatorio.md): "crema depilatoria intima hombre" 2 150 compras/mês nos 12 primeiros da
// Amazon.es (Veet Men kit zonas íntimas 1 000+, No Hair Crew íntima 400+), "crema depilatoria hombre" 1 350.
// Google PT (20/11): "creme depilatório homem" (mercadona, pingo doce, continente, lidl, intimo, como usar, veet, zonas
// íntimas), "creme depilatório íntimo masculino" (funciona, veet, pele sensível, como usar, qual o melhor), "veet men"
// (total pro, zona íntima, continente, pele sensível), "creme depilatório faz mal" (para a pele, íntimo, masculino),
// "creme depilatório queima / queimadura / pode queimar", "é melhor creme depilatório ou lâmina", "quanto tempo dura
// depilação com creme depilatório". Ignorados: Boticário, Pague Menos, Mercado Livre (Brasil).
// Liga a como-aparar-pelos-intimos-masculinos (17/11), que fala de creme depilatório sem produto para recomendar; não o altera.
// Factos só das fichas na Amazon.es (20/11):
// - No Hair Crew crema depilatoria íntima 100 ml B07F84MRMV (vendedor Trebeo): púbis, virilhas, testículos e glúteos;
//   4–8 min; ureia e extrato de algas; teste em pequena zona 24 h antes de cada uso; ardor → retirar e enxaguar, se
//   persistir médico; não na cara, cabeça, mamilos, zona perianal, mucosas; não em pele ferida/irritada/queimada;
//   24 h antes e depois sem sol, natação, desodorizantes ou produtos com álcool/perfume; 72 h entre aplicações;
//   contém tioglicolato e um agente alcalino; fabricado em Espanha, vegano.
// - Veet Men kit zonas íntimas (creme 100 ml + bálsamo pós-depilação 50 ml), B0H2FM9YMG = pack de 2 kits, Amazon:
//   ficha diz virilhas, púbis, base do pénis, escroto, glúteos, peito, costas, braços, pernas e axilas; bálsamo com
//   aloé vera; testado dermatologicamente. ATENÇÃO: na ficha do mesmo kit (B09TCK867L) os avisos dizem "não usar nos
//   genitais" — contradição dita no artigo; seguir o folheto da caixa.
// - Veet Men creme depilatório pele sensível 400 ml com doseador B07DDPBBWH (Amazon): costas, peito, braços, pernas,
//   axilas; 5–10 min; resultado até 7 dias; hidratação até 24 h; testado dermatologicamente. Não é para a zona íntima.
// Tema sensível (pele): só factos das marcas + conselhos gerais; ardor, queimadura ou reação que não passa → médico.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const table = (cols, rows) =>
  "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr>" + cols.map((c) => "<th scope=\"col\">" + c + "</th>").join("") + "</tr></thead><tbody>" +
  rows.map((row) => "<tr><th scope=\"row\">" + row[0] + "</th>" + row.slice(1).map((c, i) => "<td data-label=\"" + cols[i + 1] + "\">" + c + "</td>").join("") + "</tr>").join("") +
  "</tbody></table></div>";

const NHC = "no-hair-crew-creme-intimo";
const VKIT = "veet-men-kit-zonas-intimas";
const VCORPO = "veet-men-creme-depilatorio-corpo";

module.exports = [
  {
    slug: "creme-depilatorio-homem-como-usar",
    category: "guias-de-compra",
    published: "2026-11-20",
    title: "Creme depilatório para homem: zona íntima, como usar e sem queimar",
    h1: "Creme depilatório para homem: zona íntima, como usar e sem queimar",
    description: "Veet Men ou No Hair Crew? Que creme depilatório usar na zona íntima e no corpo, como usar passo a passo, quanto tempo deixar e como evitar queimaduras.",
    schemaDescription: "Creme depilatório para homem: qual usar na zona íntima e no corpo, o passo a passo, quanto tempo deixar, quanto tempo dura, se é melhor do que a lâmina, onde não usar e como evitar irritação e queimaduras.",
    image: "imagens/revista/creme-depilatorio-homem.jpg",
    imageAlt: "Tubo de creme e dois boiões num nicho de duche com vapor",
    readMinutes: 7,
    criteria: "Características, tempos e avisos de segurança conforme publicados pela No Hair Crew e pela Veet nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Conselhos gerais; ardor, queimadura ou reação que não passa são para o médico. Não testamos produtos.",
    lede: "O creme depilatório tira o pelo até à raiz da pele sem lâmina, sem cortes e com o resultado a durar mais do que o barbear. Na zona íntima, usa só um creme feito para ela, faz o teste de pele no dia anterior e não passes do tempo indicado: é assim que se evitam as queimaduras de que toda a gente fala. A nossa escolha para a zona íntima é o No Hair Crew; para o peito e as costas, o Veet Men para pele sensível.",
    subcopy: "Que creme usar em cada zona, o passo a passo, quanto tempo deixar, onde nunca o pôr e o que fazer se arder. Só com o que as marcas publicam.",
    heroActions: [["#qual-escolher", "Que creme escolher"], ["#como-usar", "Como usar, passo a passo"]],
    quick: [
      ["Pode usar-se na zona íntima?", "Só um creme feito para ela. O No Hair Crew íntimo indica púbis, virilhas, testículos e glúteos. Os cremes de corpo não servem para aqui."],
      ["Quanto tempo deixar?", "O que diz a embalagem, e nunca mais: 4 a 8 minutos no No Hair Crew íntimo, 5 a 10 no Veet Men de corpo."],
      ["Creme depilatório queima?", "Pode irritar ou queimar se ficar tempo de mais, em pele ferida ou sem teste. Faz sempre o teste de pele 24 horas antes."],
      ["Quanto tempo dura?", "Mais do que o barbear, porque tira o pelo rente à pele. A Veet fala em até 7 dias no corpo."]
    ],
    summary: [
      "Zona íntima: só creme feito para a zona íntima",
      "Teste de pele 24 horas antes, sempre",
      "Cronometra: nunca passes do tempo máximo",
      "Nada de cara, mucosas nem zona perianal",
      "Sem sol, piscina nem perfumes 24 h antes e depois",
      "Arde? Retira logo e enxagua com água"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Creme íntimo No Hair Crew",
      text: "Feito para a zona íntima masculina, com os avisos de segurança mais claros dos que vimos. Vê para quem é e as limitações.",
      actions: [["../../produto/" + NHC + "/", "Ver o No Hair Crew"], ["../../revista/como-aparar-pelos-intimos-masculinos/", "Aparar em vez de depilar"]]
    },
    sections: [
      {
        id: "qual-escolher",
        h2: "Que creme depilatório escolher",
        html: "<p>A primeira regra é a zona: um creme para o corpo não é um creme para a zona íntima. A pele é diferente, e os cremes também. Estes são os três que escolhemos:</p>" +
          table(["Creme", "Para que zona", "Tempo", "A ter em conta"], [
            [p(NHC, "No Hair Crew íntimo"), "Púbis, virilhas, testículos e glúteos", "4 a 8 min", "Teste 24 h antes; 72 h entre aplicações. Vendido por um vendedor externo."],
            [p(VKIT, "Veet Men kit zonas íntimas"), "Zona íntima e corpo, segundo a ficha", "Ver folheto", "Traz bálsamo pós-depilação. A ficha contradiz-se nos genitais: segue o folheto."],
            [p(VCORPO, "Veet Men pele sensível"), "Peito, costas, braços, pernas e axilas", "5 a 10 min", "Não é para a zona íntima. Dura até 7 dias, segundo a marca."]
          ]) +
          "<h3>Para a zona íntima: No Hair Crew</h3>" +
          "<p>O " + p(NHC, "No Hair Crew íntimo") + " foi feito para a zona íntima masculina: a marca indica-o para o púbis, as virilhas, os testículos e os glúteos, com 4 a 8 minutos de atuação, ureia e extrato de algas para acalmar a pele. É o que tem os avisos de segurança mais completos dos que vimos: teste de pele 24 horas antes de cada uso, 72 horas entre aplicações e uma lista clara de onde não usar. A limitação: na Amazon.es é vendido por um vendedor externo, não pela Amazon.</p>" +
          cta("B07F84MRMV", NHC) +
          "<h3>A alternativa: Veet Men kit para zonas íntimas</h3>" +
          "<p>O " + p(VKIT, "kit Veet Men para zonas íntimas") + " junta o creme e um bálsamo pós-depilação com aloé vera, e é vendido pela Amazon (em pack de 2 kits). Segundo a ficha, serve para as virilhas, o púbis, a base do pénis, o escroto e os glúteos, além do peito, das costas e das pernas. <strong>Um aviso honesto:</strong> na mesma ficha, as precauções de uso dizem para não usar nos genitais. Com informação contraditória, lê o folheto da caixa antes de usar e faz o teste de pele: é o folheto que conta.</p>" +
          cta("B0H2FM9YMG", VKIT) +
          "<h3>Para o peito, as costas e as pernas: Veet Men pele sensível</h3>" +
          "<p>O " + p(VCORPO, "Veet Men para pele sensível") + " é para o corpo: costas, peito, braços, pernas e axilas, com 5 a 10 minutos de atuação. A Veet diz que o resultado dura até 7 dias e que hidrata a pele até 24 horas. Vem num frasco de 400 ml com doseador, útil para as costas e o peito, que pedem mais creme. Não é para a zona íntima.</p>" +
          cta("B07DDPBBWH", VCORPO)
      },
      {
        id: "como-usar",
        h2: "Como usar o creme depilatório, passo a passo",
        html: "<p>Lê sempre o folheto da embalagem: os tempos e as zonas mudam de creme para creme. Este é o passo a passo geral, com os avisos que as marcas publicam:</p><ol class=\"rich-list\">" +
          "<li><strong>No dia anterior, o teste de pele.</strong> Aplica um pouco numa zona pequena da área que queres depilar, com o tempo indicado. Se em 24 horas não houver reação, podes avançar. O No Hair Crew pede este teste antes de cada uso.</li>" +
          "<li><strong>Pele limpa, seca e sem feridas.</strong> Nada de cortes, borbulhas, irritação ou pele queimada pelo sol. Se o pelo está muito comprido, apara-o primeiro: gastas menos creme e o resultado é mais uniforme.</li>" +
          "<li><strong>Espalha uma camada uniforme</strong>, sem esfregar, a cobrir bem o pelo.</li>" +
          "<li><strong>Cronometra.</strong> Usa o tempo mínimo da embalagem na primeira vez, e nunca passes do máximo. É aqui que acontecem as queimaduras.</li>" +
          "<li><strong>Retira com a espátula ou um pano húmido,</strong> num movimento suave. Se o pelo não sai, não insistas com mais tempo: da próxima vez, ajusta.</li>" +
          "<li><strong>Enxagua bem com água morna</strong> e seca sem esfregar. Se o creme vier com bálsamo, aplica-o a seguir.</li>" +
          "<li><strong>Nas 24 horas seguintes:</strong> sem sol, piscina, desodorizantes nem produtos com álcool ou perfume na zona, como avisa o No Hair Crew.</li></ol>"
      },
      {
        id: "queima",
        h2: "Creme depilatório queima? Como evitar",
        html: "<p>Os cremes depilatórios dissolvem o pelo com químicos: o No Hair Crew, por exemplo, indica que contém tioglicolato e um agente alcalino. É por isso que funcionam, e é também por isso que podem irritar ou queimar a pele se ficarem tempo de mais ou forem usados onde não devem.</p><ul class=\"rich-list\">" +
          "<li><strong>Faz o teste de pele 24 horas antes.</strong></li>" +
          "<li><strong>Respeita o tempo máximo.</strong> Mais tempo não tira mais pelo; tira pele.</li>" +
          "<li><strong>Espera entre aplicações:</strong> o No Hair Crew pede 72 horas.</li>" +
          "<li><strong>Se arder ou picar durante o uso,</strong> retira logo o creme e enxagua com bastante água. Se a pele continuar vermelha, a arder ou com bolhas, vai ao médico.</li>" +
          "<li><strong>Nunca em pele que já reagiu</strong> a um creme depilatório.</li></ul>"
      },
      {
        id: "onde-nao",
        h2: "Onde não usar creme depilatório",
        html: "<p>Os avisos das marcas convergem. Não uses creme depilatório:</p><ul class=\"rich-list\">" +
          "<li><strong>na cara e na barba</strong> (nem os cremes de corpo, nem os íntimos);</li>" +
          "<li><strong>na cabeça;</strong></li>" +
          "<li><strong>nos mamilos;</strong></li>" +
          "<li><strong>na zona perianal e nas mucosas;</strong></li>" +
          "<li><strong>em pele ferida, irritada, gretada ou queimada pelo sol.</strong></li></ul>" +
          "<p>Para a barba, o caminho é a lâmina ou a máquina. Para quem quer só encurtar o pelo da zona íntima, aparar com um aparador corporal é mais suave: explicamos em " + r("como-aparar-pelos-intimos-masculinos", "como aparar os pelos íntimos masculinos") + ".</p>"
      },
      {
        id: "creme-ou-lamina",
        h2: "É melhor creme depilatório ou lâmina?",
        html: table(["Método", "Quanto dura", "Riscos", "Para quem"], [
          ["Creme depilatório", "Alguns dias (até 7 no corpo, segundo a Veet)", "Irritação ou queimadura se mal usado", "Quem quer pele lisa sem lâmina e sem cortes"],
          ["Lâmina", "1 a 2 dias", "Cortes, irritação e pelos encravados", "Quem quer o mais rente e rápido, em zonas firmes"],
          ["Aparador corporal", "Alguns dias (pelo curto, não liso)", "Quase nenhum", "Quem quer pouco pelo sem risco para a pele"]
        ]) +
          "<p>O creme ganha à lâmina na duração e nos cortes, e o No Hair Crew diz que dá menos pelos encravados do que barbear. Perde na irritação química, que a lâmina não tem. Se a tua pele reage a tudo, o aparador é o mais seguro. Vê o nosso " + r("aparador-corporal-masculino-qual-escolher", "guia de aparadores corporais") + " e, sobre pelos encravados, " + r("pelos-encravados-como-evitar", "como os evitar") + ".</p>"
      },
      {
        id: "onde-comprar",
        h2: "Mercadona, Continente ou online?",
        html: "<p>Muita gente procura creme depilatório de homem no Mercadona, no Continente, no Pingo Doce e no Lidl, e há bons cremes de supermercado. A regra é a mesma: confirma no rótulo para que zona é, e se a embalagem não diz zona íntima, não o uses lá. Online encontras os cremes feitos para a zona íntima masculina, que nem sempre há no supermercado, e compras sem passar pela caixa com eles na mão.</p>"
      }
    ],
    faq: [
      ["Qual o melhor creme depilatório íntimo masculino?", "Escolhemos o No Hair Crew íntimo, feito para o púbis, as virilhas, os testículos e os glúteos e com os avisos de segurança mais completos dos que vimos. A alternativa é o kit Veet Men para zonas íntimas, com bálsamo. Não testamos produtos."],
      ["Pode usar-se creme depilatório nos testículos?", "Só um creme que o indique: o No Hair Crew íntimo indica os testículos. A ficha do kit Veet Men diz que serve para o escroto, mas os avisos da mesma ficha dizem para não usar nos genitais: segue o folheto da caixa. Faz sempre o teste de pele 24 horas antes."],
      ["Quanto tempo devo deixar o creme depilatório?", "O tempo da embalagem e nunca mais: 4 a 8 minutos no No Hair Crew íntimo, 5 a 10 no Veet Men de corpo. Na primeira vez, usa o tempo mínimo."],
      ["Creme depilatório queima?", "Pode irritar ou queimar se ficar tempo de mais, se a pele estiver ferida ou se não fizeres o teste de pele. Se arder durante o uso, retira e enxagua com bastante água; se continuar, vai ao médico."],
      ["Creme depilatório faz mal?", "Usado como indica a marca, na zona certa e com teste de pele, não é suposto. Os cremes têm químicos que dissolvem o pelo, por isso não se usam em pele ferida, na cara, em mucosas nem na zona perianal."],
      ["Quanto tempo dura a depilação com creme?", "Mais do que o barbear, porque tira o pelo rente à pele: a Veet fala em até 7 dias no corpo. Entre aplicações, o No Hair Crew pede pelo menos 72 horas."],
      ["É melhor creme depilatório ou lâmina?", "O creme dura mais e não corta; a lâmina é mais rápida e não tem químicos. Para quem tem pele muito sensível, aparar com um aparador corporal é o mais seguro."],
      ["Posso usar creme depilatório na barba?", "Não. Os avisos das marcas excluem a cara. Para a barba, usa lâmina ou máquina."]
    ],
    faqCta: "Vê o <a href=\"../../produto/" + NHC + "/\">No Hair Crew íntimo</a>, o <a href=\"../../produto/" + VKIT + "/\">kit Veet Men para zonas íntimas</a> ou o <a href=\"../../produto/" + VCORPO + "/\">Veet Men para o corpo</a>.",
    related: ["como-aparar-pelos-intimos-masculinos", "aparador-corporal-masculino-qual-escolher", "pelos-encravados-como-evitar"],
    finalCta: {
      h2: "Teste no dia anterior, relógio na mão",
      text: "O creme certo para a zona, o teste de pele a tempo e nunca mais minutos do que a embalagem diz: é isso que separa uma pele lisa de uma pele queimada.",
      actions: [["../../produto/" + NHC + "/", "Ver o No Hair Crew"], ["../../revista/como-aparar-pelos-intimos-masculinos/", "Aparar em vez de depilar"]]
    }
  }
];
