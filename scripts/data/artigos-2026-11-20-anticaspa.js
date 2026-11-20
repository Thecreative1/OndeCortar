// 2026-11-20 — revista/champo-anticaspa-homem-qual-escolher/ (artigo novo; 3.º nicho do radar de procura de 20/11,
// pedido pelo utilizador: "faz agora o champô anticaspa").
// Radar (20/11): Amazon.es "champu anticaspa hombre" 12 950 compras/mês nos 12 primeiros (o maior volume da ronda):
// Vichy Dercos cabelo oleoso 6 000+, H&S Classic 2 000+, Vichy Dercos sensível/seco 1 000+, H&S Clinical Strength 100+.
// Google PT (20/11): "shampoo anticaspa homem" (mercadona, melhor, e condicionador), "melhor shampoo anticaspa"
// (masculino, supermercado, barato), "shampoo anticaspa" (dercos, farmácia, continente, pingo doce), "caspa homem"
// (tratamento, muita caspa), "caspa o que fazer" (eliminar, acabar, persistente, seca, seborreica), "como acabar com a
// caspa" (de vez, no couro cabeludo, de forma natural), "vichy dercos anticaspa ds", "head and shoulders continente",
// "como saber se é caspa ou dermatite seborreica", "shampoo caspa e queda de cabelo". Ignorados: Natura, Bio Extratus,
// Pague Menos (Brasil). Já existe caspa-na-barba-o-que-fazer (barba): não se mexe, este liga a ele.
// Factos só das fichas na Amazon.es (20/11): Vichy Dercos anticaspa DS cabelo oleoso B00WN2BY7G e sensível/seco
// B01BPHAD1W (dupla ação contra a caspa persistente e o seu reaparecimento; alivia a comichão; previne o reaparecimento
// até 6 semanas depois; usar 4 semanas como champô habitual; homem e mulher; rótulo: Selenium DS e Salicylic Acid;
// ácido salicílico na lista de ingredientes); H&S Classic B0CRHL62XJ (uso diário; até 100% de proteção contra a caspa
// visível com uso regular, clinicamente testado; todo o tipo de cabelo; piroctona olamina; 2 frascos de 1 l com
// doseador); H&S Clinical Strength B0DVCFK9C5 (1% de sulfureto de selénio; caspa persistente e comichão; suave para uso
// diário; mentol; evitar os olhos e a pele ferida). Tema de saúde: só factos das marcas e conselhos gerais; dermatite,
// vermelhidão, feridas ou queda de cabelo remetem para o médico/dermatologista. Sem preços, avaliações nem "testámos".
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const table = (cols, rows) =>
  "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr>" + cols.map((c) => "<th scope=\"col\">" + c + "</th>").join("") + "</tr></thead><tbody>" +
  rows.map((row) => "<tr><th scope=\"row\">" + row[0] + "</th>" + row.slice(1).map((c, i) => "<td data-label=\"" + cols[i + 1] + "\">" + c + "</td>").join("") + "</tr>").join("") +
  "</tbody></table></div>";

const VO = "vichy-dercos-anticaspa-oleoso";
const VS = "vichy-dercos-anticaspa-seco";
const HC = "hs-classic-anticaspa";
const HCS = "hs-clinical-strength-anticaspa";

module.exports = [
  {
    slug: "champo-anticaspa-homem-qual-escolher",
    category: "guias-de-compra",
    published: "2026-11-20",
    title: "Champô anticaspa para homem: qual escolher e como acabar com a caspa",
    h1: "Champô anticaspa para homem: qual escolher e como acabar com a caspa",
    description: "Vichy Dercos ou Head & Shoulders? Que champô anticaspa escolher para caspa oleosa, seca ou persistente, como usar e quando a caspa é assunto para o médico.",
    schemaDescription: "Que champô anticaspa escolher para homem: caspa oleosa, seca ou persistente, Vichy Dercos ou Head & Shoulders, como usar para a caspa não voltar, caspa ou dermatite seborreica e quando ir ao dermatologista.",
    image: "imagens/revista/champo-anticaspa-homem.jpg",
    imageAlt: "Homem no duche, de perfil, a ler o rótulo de um frasco de champô",
    readMinutes: 7,
    criteria: "Características, ingredientes ativos e modo de uso conforme publicados pela Vichy e pela Head & Shoulders nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Informação geral, não substitui o dermatologista. Não testamos produtos.",
    lede: "Para a maioria dos homens, a caspa resolve-se com um champô anticaspa usado como champô normal durante algumas semanas. Se o cabelo é oleoso e a caspa não larga, a nossa escolha é o Vichy Dercos anticaspa, o mais comprado quando se procura anticaspa para homem na Amazon.es. Para todos os dias e sem complicar, o Head & Shoulders Classic. E se a caspa vem com vermelhidão, crostas ou não melhora, é assunto para o dermatologista.",
    subcopy: "Que champô escolher para caspa oleosa, seca ou persistente, como o usar para ela não voltar, e como distinguir a caspa de uma dermatite. Só com o que as marcas publicam.",
    heroActions: [["#qual-escolher", "Que champô escolher"], ["#como-usar", "Como usar"]],
    quick: [
      ["Qual o melhor champô anticaspa para homem?", "Para caspa persistente e cabelo oleoso, o Vichy Dercos anticaspa. Para uso diário, o Head & Shoulders Classic. Não testamos produtos: a escolha é pelo que as marcas publicam."],
      ["A minha caspa é seca ou oleosa?", "Escamas pequenas e brancas que caem nos ombros: seca. Escamas maiores, amareladas e presas ao couro cabeludo, com cabelo oleoso: oleosa."],
      ["Quanto tempo até resultar?", "A Vichy indica usar o Dercos durante 4 semanas como champô habitual. Se não melhorar, fala com um dermatologista."],
      ["É caspa ou dermatite?", "Vermelhidão, crostas, comichão forte ou escamas também nas sobrancelhas, no nariz ou na barba pedem uma consulta."]
    ],
    summary: [
      "Caspa oleosa e persistente: Vichy Dercos (oleoso)",
      "Couro cabeludo seco ou sensível: Vichy Dercos (seco)",
      "Para todos os dias: Head & Shoulders Classic",
      "Comichão forte: H&S Clinical Strength (selénio)",
      "Massaja o couro cabeludo, não só o cabelo",
      "4 semanas sem melhorar: dermatologista"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de cabelo",
      text: "Champôs anticaspa, champôs para os cabelos brancos e para o grisalho, escolhidos pelo que as marcas publicam.",
      actions: [["../../loja/cuidados-de-cabelo/", "Ver a categoria"], ["../../revista/caspa-na-barba-o-que-fazer/", "Caspa na barba"]]
    },
    sections: [
      {
        id: "qual-escolher",
        h2: "Que champô anticaspa escolher",
        html: "<p>Não há um champô anticaspa melhor para toda a gente: depende do tipo de caspa, do cabelo e de quanto ela insiste. Estes são os quatro que escolhemos, um para cada caso:</p>" +
          table(["Champô", "Para quem", "Ativo indicado pela marca", "Como se usa"], [
            [p(VO, "Vichy Dercos anticaspa (oleoso)"), "Caspa persistente, cabelo normal a oleoso", "Selénio DS e ácido salicílico", "Como champô habitual, durante 4 semanas"],
            [p(VS, "Vichy Dercos anticaspa (seco)"), "Caspa com couro cabeludo seco ou sensível", "Selénio DS e ácido salicílico", "Como champô habitual, durante 4 semanas"],
            [p(HC, "Head & Shoulders Classic"), "Uso diário, todo o tipo de cabelo", "Piroctona olamina", "Todos os dias"],
            [p(HCS, "H&S Clinical Strength"), "Caspa persistente com comichão", "1% de sulfureto de selénio", "Todos os dias, longe dos olhos"]
          ]) +
          "<h3>A nossa escolha: Vichy Dercos anticaspa</h3>" +
          "<p>O " + p(VO, "Vichy Dercos anticaspa") + " é o mais comprado quando se procura champô anticaspa para homem na Amazon.es, e o Dercos aparece muito nas pesquisas em Portugal. Segundo a Vichy, tem dupla ação contra a caspa persistente e o seu reaparecimento, alivia a comichão e previne que a caspa volte até 6 semanas depois do tratamento. Usa-se como champô habitual durante 4 semanas. A versão mais vendida é para cabelo normal a oleoso.</p>" +
          cta("B00WN2BY7G", VO) +
          "<p>Se o teu couro cabeludo é seco ou sensível e repuxa depois de lavar, a mesma fórmula existe em " + p(VS, "versão para cabelo seco") + ".</p>" +
          cta("B01BPHAD1W", VS) +
          "<h3>Para todos os dias: Head & Shoulders Classic</h3>" +
          "<p>O " + p(HC, "Head & Shoulders Classic") + " é o anticaspa de supermercado e foi feito para uso diário. A marca diz que dá até 100% de proteção contra a caspa visível com uso regular, num teste clínico, e que serve para todo o tipo de cabelo. O ativo é a piroctona olamina. Na Amazon.es vende-se em 2 frascos de 1 litro com doseador.</p>" +
          cta("B0CRHL62XJ", HC) +
          "<h3>Caspa que não larga e comichão: H&S Clinical Strength</h3>" +
          "<p>O " + p(HCS, "H&S Clinical Strength") + " é a versão mais forte da marca: leva 1% de sulfureto de selénio e foi feito para caspa persistente e couro cabeludo com comichão. A marca diz que é suave para uso diário e que se deve evitar o contacto com os olhos e com pele ferida.</p>" +
          cta("B0DVCFK9C5", HCS)
      },
      {
        id: "seca-ou-oleosa",
        h2: "Caspa seca ou oleosa: como saber",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Caspa seca:</strong> escamas pequenas e brancas que caem nos ombros, couro cabeludo que repuxa, piora no inverno e com água muito quente. Pede um champô suave para couro cabeludo seco.</li>" +
          "<li><strong>Caspa oleosa:</strong> escamas maiores, amareladas, presas ao couro cabeludo, cabelo que fica oleoso depressa e às vezes comichão. É muito comum nos homens e costuma ser a que mais insiste.</li></ul>" +
          "<p>Na dúvida, começa pelo champô para cabelo normal a oleoso: é o que serve à maioria.</p>"
      },
      {
        id: "como-usar",
        h2: "Como usar o champô anticaspa para a caspa não voltar",
        html: "<ol class=\"rich-list\">" +
          "<li><strong>Usa-o como champô principal</strong>, não de vez em quando. A Vichy indica 4 semanas de uso como champô habitual; o Head & Shoulders é para todos os dias.</li>" +
          "<li><strong>Massaja o couro cabeludo</strong> com a ponta dos dedos, não só o cabelo. É no couro cabeludo que a caspa se forma.</li>" +
          "<li><strong>Segue o tempo de atuação da embalagem</strong> antes de enxaguar, e enxagua bem.</li>" +
          "<li><strong>Água morna, não quente.</strong> A água muito quente seca o couro cabeludo.</li>" +
          "<li><strong>Depois do tratamento,</strong> muita gente mantém o anticaspa uma ou duas vezes por semana, alternado com o champô normal. A caspa tende a voltar quando se para de vez.</li></ol>"
      },
      {
        id: "dermatite",
        h2: "Caspa ou dermatite seborreica?",
        html: "<p>A caspa comum é uma descamação do couro cabeludo, sem inflamação. Há sinais que mostram que pode ser outra coisa, como dermatite seborreica ou psoríase, e que merecem uma consulta no dermatologista:</p><ul class=\"rich-list\">" +
          "<li>vermelhidão, crostas ou feridas no couro cabeludo;</li>" +
          "<li>escamas também nas sobrancelhas, à volta do nariz, atrás das orelhas ou na barba;</li>" +
          "<li>comichão forte que não deixa dormir;</li>" +
          "<li>nenhuma melhoria ao fim de 4 semanas com um champô anticaspa.</li></ul>" +
          "<p>Se a descamação está sobretudo na barba, lê " + r("caspa-na-barba-o-que-fazer", "caspa na barba: porque aparece e o que fazer") + ".</p>"
      },
      {
        id: "caspa-e-queda",
        h2: "Caspa e queda de cabelo estão ligadas?",
        html: "<p>É uma pesquisa muito comum, e a resposta tem de ser cuidadosa: os champôs anticaspa tratam a caspa, não a queda de cabelo. Se estás a perder cabelo de forma contínua, ou de repente, ou às zonas, isso é para o médico ou o dermatologista avaliar, com ou sem caspa. Não tentes resolver a queda só com champôs.</p>"
      },
      {
        id: "de-vez",
        h2: "Dá para acabar com a caspa de vez?",
        html: "<p>Na maioria dos casos, a caspa controla-se, mas tende a voltar quando se deixa o tratamento. É por isso que a Vichy fala em prevenir o reaparecimento até 6 semanas depois, e que o Head & Shoulders é pensado para uso diário. O que ajuda: lavar o cabelo com regularidade (a oleosidade acumulada piora a caspa oleosa), água morna, enxaguar bem os produtos de penteado e não coçar.</p>" +
          "<p>Os remédios caseiros que circulam (vinagre, bicarbonato, óleos) não têm a mesma base dos champôs com ativos anticaspa, e alguns irritam o couro cabeludo.</p>"
      },
      {
        id: "onde-comprar",
        h2: "Farmácia, supermercado ou online?",
        html: "<p>O Head & Shoulders vende-se nos supermercados (Continente, Pingo Doce, Mercadona); o Vichy Dercos, sobretudo em farmácias e parafarmácias. Online são os mesmos produtos, muitas vezes em formatos maiores ou com recarga. Confirma sempre a versão (cabelo oleoso, seco ou sensível) antes de comprar.</p>" +
          "<p>E se és cliente de uma barbearia, o teu barbeiro vê o teu couro cabeludo de perto a cada corte: vale a pena perguntar-lhe. Encontras barbearias perto de ti no <a href=\"../../cidades/\">diretório por cidade</a>.</p>"
      }
    ],
    faq: [
      ["Qual o melhor champô anticaspa para homem?", "Para caspa persistente e cabelo oleoso, escolhemos o Vichy Dercos anticaspa, o mais comprado quando se procura anticaspa para homem na Amazon.es. Para uso diário, o Head & Shoulders Classic. Para caspa com comichão forte, o H&S Clinical Strength, com 1% de sulfureto de selénio. Não testamos produtos."],
      ["O Vichy Dercos anticaspa funciona?", "Segundo a Vichy, tem dupla ação contra a caspa persistente e o seu reaparecimento, alivia a comichão e previne que a caspa volte até 6 semanas depois. Usa-se durante 4 semanas como champô habitual."],
      ["Como saber se a caspa é seca ou oleosa?", "Escamas pequenas e brancas que caem nos ombros e couro cabeludo a repuxar: seca. Escamas maiores, amareladas e presas, com cabelo oleoso: oleosa, muito comum nos homens."],
      ["Quantas vezes devo usar o champô anticaspa?", "A Vichy indica usar o Dercos como champô habitual durante 4 semanas; o Head & Shoulders Classic é para todos os dias. Depois, muita gente mantém o anticaspa uma ou duas vezes por semana."],
      ["Como acabar com a caspa de vez?", "A caspa controla-se, mas tende a voltar quando se para o tratamento. Lavar com regularidade, água morna, massajar o couro cabeludo e manter o anticaspa de vez em quando ajudam a que não volte."],
      ["Como saber se é caspa ou dermatite seborreica?", "Vermelhidão, crostas, comichão forte ou escamas também nas sobrancelhas, no nariz ou na barba podem ser dermatite seborreica. Nesses casos, ou se não melhorar em 4 semanas, vai ao dermatologista."],
      ["O champô anticaspa trata a queda de cabelo?", "Não. Os champôs anticaspa tratam a caspa. A queda de cabelo contínua ou repentina deve ser avaliada por um médico ou dermatologista."],
      ["Posso usar Head & Shoulders todos os dias?", "Sim: a marca apresenta o Classic e o Clinical Strength como champôs para uso diário."]
    ],
    faqCta: "Vê o <a href=\"../../produto/" + VO + "/\">Vichy Dercos (oleoso)</a>, o <a href=\"../../produto/" + VS + "/\">Vichy Dercos (seco)</a>, o <a href=\"../../produto/" + HC + "/\">H&amp;S Classic</a> ou o <a href=\"../../produto/" + HCS + "/\">H&amp;S Clinical Strength</a>.",
    related: ["caspa-na-barba-o-que-fazer", "cabelos-brancos-homem-como-disfarcar", "pomada-cera-ou-gel-cabelo-homem"],
    finalCta: {
      h2: "O champô certo, todos os dias, durante semanas",
      text: "Escolhe pelo tipo de caspa, usa-o como champô principal e massaja o couro cabeludo. Se em 4 semanas não melhorar, o passo seguinte é o dermatologista, não outro champô.",
      actions: [["../../produto/" + VO + "/", "Ver o Vichy Dercos"], ["../../loja/cuidados-de-cabelo/", "Cuidados de cabelo"]]
    }
  }
];
