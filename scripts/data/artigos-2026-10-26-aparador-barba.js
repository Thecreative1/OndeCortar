// 2026-10-26 — revista/melhor-aparador-de-barba/ (guia de compra novo).
// Escolhido pela análise de nichos de 26/10: "aparador de barba" tem tanta procura de compra no Google PT como
// "máquina de cortar cabelo" e a revista não tinha guia de compra (só como aparar, trimmer vs shaver, OneBlade).
// Pesquisas do Google PT: "melhor aparador de barba" (… profissional, … do mercado, … Portugal, … masculino,
// … elétrico), "qual o melhor aparador de barba", "qual melhor marca de aparador de barba", "aparador de barba e
// cabelo" (… multifunções 8 em 1, … sem fio), "aparador de barba profissional", "aparador de barba philips"
// (series 3000/5000/7000, oneblade, multigroom), "aparador de barba braun" (séries 3/5/7/9), "… remington",
// "… com pente ajustável", "… vários pentes", "… sem fio", "… barato", "… bom e barato", "como limpar /
// lubrificar aparador de barba", "aparador de barba ou barbeador"; lojas: Worten, Rádio Popular, Lidl.
// Ignoradas marcas e lojas do Brasil (Mondial, Kemei, Mercado Livre) e "regulagem", "bivolt".
// Amazon.es (26/10): os mais comprados são os tudo em um (Philips MG3930, Braun AIO7545) e o OneBlade 360;
// dos aparadores só de barba, Philips Série 7000 BT7670 (acrescentado à loja hoje), BT3619 e Braun BT5525.
// Factos dos produtos das páginas produto/{slug}/ e de commerce-products-a/b.js. Sem preços, avaliações ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const row = (slug, name, tipo, comprimentos, bateria, agua) =>
  "<tr><th scope=\"row\">" + p(slug, name) + "</th><td data-label=\"Tipo\">" + tipo + "</td><td data-label=\"Comprimentos\">" + comprimentos + "</td><td data-label=\"Bateria\">" + bateria + "</td><td data-label=\"Água\">" + agua + "</td></tr>";

module.exports = [
  {
    slug: "melhor-aparador-de-barba",
    category: "guias-de-compra",
    published: "2026-10-26",
    title: "Melhor aparador de barba: qual comprar e para quem",
    h1: "Melhor aparador de barba: qual escolher para a tua barba",
    description: "Qual o melhor aparador de barba? Philips, Braun, OneBlade e opções baratas: só barba ou barba e cabelo, pentes e água, e para quem é cada um.",
    schemaDescription: "Como escolher um aparador de barba: só barba ou tudo em um, comprimentos, pentes e bateria, com 8 modelos da Philips, Braun e Cecotec e para quem é cada um.",
    image: "imagens/revista/aparador-pente-barba.jpg",
    imageAlt: "Aparador com pente guia a aparar uma barba, em grande plano a preto e branco",
    readMinutes: 8,
    criteria: "Aparadores escolhidos pela procura em Portugal e pelas características publicadas pelos fabricantes na Amazon.es. Não testamos produtos.",
    lede: "O melhor aparador de barba é o que serve a barba que tens e o que queres fazer com ela. Para manter a barba curta a média, um aparador só de barba com muitos comprimentos chega; se também cortas o cabelo, um tudo em um poupa um aparelho.",
    subcopy: "Primeiro a resposta rápida, depois os 8 que escolhemos e, mais abaixo, o que ver antes de comprar: pentes, comprimentos, bateria e água.",
    heroActions: [["#produtos-recomendados", "Ver os 8 aparadores"], ["#antes-de-comprar", "O que ver antes de comprar"]],
    quick: [
      ["Só aparas a barba, curta a média?", "Um aparador só de barba com muitos comprimentos: o Philips Série 5000 BT5765 (40 posições de 0,2 mm) ou o Braun Series 5 BT5525 (40 comprimentos e até 120 minutos de bateria)."],
      ["Gostas de contornos bem marcados?", "O Philips Série 7000 BT7670: o mesmo que o 5000, mais uma cabeça larga em T e um aparador de precisão para as linhas."],
      ["Também cortas o cabelo ou aparas nariz e orelhas?", "Um tudo em um: o Philips Série 3000 MG3930 (7 acessórios) para começar, ou o Braun Series 7 AIO7545 (12 em 1) se queres o mais completo."],
      ["Andas entre barba de poucos dias e cara rapada?", "O Philips OneBlade 360: apara, faz contornos e barbeia com a mesma lâmina."]
    ],
    summary: [
      "Só barba: escolhe pelos comprimentos e pelo pente",
      "Barba e cabelo: um tudo em um poupa um aparelho",
      "Contornos definidos: cabeça larga ou de precisão",
      "Barba de poucos dias e cara rapada: OneBlade",
      "Bateria de lítio e corpo à prova de água facilitam a vida",
      "Orçamento curto: perde-se bateria e afinação, não o essencial"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Trimmers e shavers",
      text: "Os aparadores deste guia, com o que cada um faz bem e as limitações de cada modelo.",
      actions: [["../../loja/trimmers-e-shavers/", "Ver trimmers e shavers"], ["../../revista/como-aparar-a-barba-em-casa/", "Como aparar a barba em casa"]]
    },
    sections: [
      {
        id: "so-barba-ou-tudo-em-um",
        h2: "Só barba ou barba e cabelo (tudo em um)?",
        html: "<p>É a primeira decisão, e muda o modelo. Há dois tipos de aparador:</p><ul class=\"rich-list\">" +
          "<li><strong>Aparador só de barba</strong> — um aparelho, um pente com muitos comprimentos e, às vezes, uma cabeça para contornos. Faz uma coisa e afina-a ao pormenor. É o caso do " + p("philips-bt5765-series-5000", "Philips Série 5000 BT5765") + ", do " + p("philips-bt7670-series-7000", "Philips Série 7000 BT7670") + " e do " + p("braun-bt5525-series-5", "Braun Series 5 BT5525") + ".</li>" +
          "<li><strong>Tudo em um (multifunções)</strong> — o mesmo corpo com várias cabeças e pentes: barba, cabelo curto, nariz, orelhas e, nalguns, corpo. É o tipo mais comprado na Amazon.es, e percebe-se porquê: substitui dois ou três aparelhos. O " + p("philips-mg3930-series-3000", "Philips Série 3000 MG3930") + " traz 7 acessórios; o " + p("braun-aio7545-series-7", "Braun Series 7 AIO7545") + " vai aos 12.</li></ul>" +
          "<p>A regra simples: <strong>se só tratas da barba, o aparador de barba afina melhor</strong> (mais comprimentos, passos mais pequenos). <strong>Se também cortas o cabelo curto ou aparas nariz e orelhas, o tudo em um compensa.</strong> O que nenhum dos dois faz bem é cortar cabelo comprido: os pentes dos tudo em um ficam pelos 16 a 21 mm. Para isso, vê as " + r("melhores-maquinas-para-cortar-cabelo-em-casa", "melhores máquinas para cortar cabelo em casa") + ".</p>" +
          "<p>Comparámos os dois tipos em mais detalhe em " + r("aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais", "aparador multifunções ou máquina profissional") + ".</p>"
      },
      {
        id: "so-barba",
        h2: "Aparador só de barba: os três que valem a pena",
        html: "<ul class=\"rich-list\">" +
          "<li>O " + p("philips-bt5765-series-5000", "Philips Série 5000 BT5765") + " é o ponto de equilíbrio: uma roda com 40 posições em intervalos de 0,2 mm, pentes de 0,4 a 20 mm, um sensor que aumenta a potência em barbas densas e um sistema que recolhe boa parte dos pelos cortados. As lâminas não precisam de óleo e o corpo é 100% à prova de água.</li>" +
          "<li>O " + p("philips-bt7670-series-7000", "Philips Série 7000 BT7670") + " é o mesmo aparador com duas peças a mais: uma <strong>cabeça larga em T</strong> e um <strong>aparador de precisão de encaixe</strong>, para quem gosta de linhas bem marcadas no pescoço e nas bochechas. Se não fazes contornos ao pormenor, o 5000 chega.</li>" +
          "<li>O " + p("braun-bt5525-series-5", "Braun Series 5 BT5525") + " é a alternativa da Braun: 40 comprimentos em intervalos de 0,5 mm, com bloqueio para o pente não mudar a meio, e bateria de lítio até 120 minutos. É o que escolhíamos para quem apara a barba muitas vezes e não quer pensar na carga.</li></ul>" +
          "<p>Nos dois Philips, os pentes chegam aos 20 mm: servem barba curta a média. Numa barba comprida, a forma faz-se com tesoura e pente, e o aparador fica para os contornos e o pescoço.</p>" +
          amz("B0F71KRBPP", "philips-bt5765-series-5000")
      },
      {
        id: "tudo-em-um",
        h2: "Tudo em um: barba, cabelo curto, nariz e orelhas",
        html: "<ul class=\"rich-list\">" +
          "<li>O " + p("philips-mg3930-series-3000", "Philips Série 3000 MG3930 (7 em 1)") + " é dos tudo em um mais comprados na Amazon.es: 7 acessórios para barba, cabelo, nariz e orelhas, 10 comprimentos de 0,5 a 16 mm e lâminas que não precisam de óleo. Tem duas limitações: cerca de 60 minutos de bateria e carga por USB-A, sem transformador na caixa.</li>" +
          "<li>O " + p("philips-mg7931-series-7000", "Philips Multigroom Série 7000 MG7931") + " sobe para 16 acessórios e acrescenta um pente de precisão de 1 a 3 mm em passos de 0,2 mm, para barba muito curta. Até 120 minutos de bateria, segundo a Philips.</li>" +
          "<li>O " + p("braun-aio7545-series-7", "Braun Series 7 AIO7545") + " é o mais completo da Braun: 12 em 1, cabeça de precisão para linhas, 14 comprimentos de barba (3 a 21 mm), bateria de lítio até 120 minutos e pega para usar no duche. Traz mais acessórios do que muita gente vai usar.</li></ul>" +
          amz("B0F79XWF8H", "philips-mg3930-series-3000")
      },
      {
        id: "oneblade",
        h2: "Barba de poucos dias e cara rapada: o OneBlade",
        html: "<p>O " + p("philips-oneblade-360-qp2724", "Philips OneBlade 360") + " fica entre o aparador e a máquina de barbear: apara, faz contornos e barbeia rente com a mesma lâmina, que se inclina para acompanhar o rosto. Faz sentido para quem anda entre barba de poucos dias e cara rapada, a seco ou no duche.</p>" +
          "<p>Tem dois custos a contar: a bateria Ni-MH dura cerca de 45 minutos, e a lâmina gasta-se. Vêm duas na caixa, cada uma para até 4 meses, segundo a Philips; depois compram-se lâminas de substituição. Que versão escolher (360, Pro, Face + Body) explicamos em " + r("qual-oneblade-comprar", "qual OneBlade comprar") + ".</p>" +
          amz("B0DCFP3Z14", "philips-oneblade-360-qp2724")
      },
      {
        id: "comparar",
        h2: "Os 8 aparadores lado a lado",
        html: "<p>As características publicadas pelos fabricantes na Amazon.es. Onde a marca não indica o valor, fica um traço.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Aparador</th><th scope=\"col\">Tipo</th><th scope=\"col\">Comprimentos</th><th scope=\"col\">Bateria</th><th scope=\"col\">Água</th></tr></thead><tbody>" +
          row("philips-bt5765-series-5000", "Philips Série 5000 BT5765", "Só barba", "40 posições, pentes de 0,4 a 20 mm", "—", "100% à prova de água") +
          row("philips-bt7670-series-7000", "Philips Série 7000 BT7670", "Só barba, com cabeça larga", "40 posições, pentes de 0,4 a 20 mm", "—", "100% resistente à água") +
          row("braun-bt5525-series-5", "Braun Series 5 BT5525", "Só barba", "40 comprimentos, passos de 0,5 mm", "Até 120 min (lítio)", "100% à prova de água") +
          row("philips-bt3619-series-3000", "Philips Série 3000 BT3619", "Só barba", "20 comprimentos, 0,5 a 10 mm", "—", "100% à prova de água") +
          row("philips-mg3930-series-3000", "Philips Série 3000 MG3930", "Tudo em um (7)", "10 comprimentos, 0,5 a 16 mm", "Cerca de 60 min (USB)", "—") +
          row("braun-aio7545-series-7", "Braun Series 7 AIO7545", "Tudo em um (12)", "14 comprimentos de barba, 3 a 21 mm", "Até 120 min (lítio)", "100% à prova de água") +
          row("philips-oneblade-360-qp2724", "Philips OneBlade 360", "Aparar e barbear", "—", "Cerca de 45 min (Ni-MH)", "100% à prova de água") +
          row("cecotec-bamba-precisioncare-pro-5em1", "Cecotec Pro 5 em 1", "Tudo em um (5)", "—", "Cerca de 60 min, com ou sem fio", "IPX7") +
          "</tbody></table></div>"
      },
      {
        id: "antes-de-comprar",
        h2: "O que ver antes de comprar: pentes, comprimentos, bateria e água",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Comprimentos e passos.</strong> Mais posições só ajudam se usas mais do que um comprimento. Para uma barba mais curta nas bochechas e mais comprida no queixo, passos de 0,2 a 0,5 mm fazem diferença; para manter tudo igual, 10 ou 20 posições chegam.</li>" +
          "<li><strong>Pente ajustável ou vários pentes.</strong> Uma roda que move o pente é mais rápida e não se perde. Pentes soltos, como os do " + p("king-c-gillette-beard-trimmer-kit", "King C. Gillette Beard Trimmer Kit") + ", funcionam, mas trocam-se a meio e perdem-se na gaveta.</li>" +
          "<li><strong>Bloqueio do comprimento.</strong> O Braun BT5525 tem: evita que o pente mude quando o apertas contra a cara.</li>" +
          "<li><strong>Bateria.</strong> As de lítio duram mais por carga e costumam envelhecer melhor do que as Ni-MH. Entre 40 e 60 minutos chega para várias semanas de retoques; 120 minutos é conforto.</li>" +
          "<li><strong>Sem fio, com fio ou os dois.</strong> Quase todos são sem fio. Alguns, como o Cecotec Pro 5 em 1 e o " + p("remington-mb320c", "Remington MB320C") + ", também trabalham ligados à corrente: útil se te esqueces de carregar.</li>" +
          "<li><strong>À prova de água.</strong> Dá para usar no duche e lavar a cabeça na torneira. Quase todos os modelos deste guia são.</li>" +
          "<li><strong>Lâminas sem óleo.</strong> Muitos modelos atuais têm lâminas que não precisam de lubrificação. Nos outros, uma gota de óleo de vez em quando prolonga a vida da lâmina.</li></ul>"
      },
      {
        id: "profissional",
        h2: "Aparador de barba profissional: vale a pena em casa?",
        html: "<p>\"Profissional\" é das palavras mais pesquisadas com aparador de barba, mas nas lojas online é muitas vezes só parte do nome. O que um barbeiro precisa — um motor para trabalhar o dia inteiro, lâminas que se trocam, peças de substituição — pesa pouco para quem apara a barba uma ou duas vezes por semana.</p>" +
          "<p>Em casa, o que se sente é outra coisa: <strong>passos de comprimento pequenos, um pente que não mexe e uma bateria que não acaba a meio</strong>. Os aparadores só de barba da Philips e da Braun deste guia têm isso. Se trabalhas numa barbearia, vê antes " + r("o-que-um-barbeiro-precisa-no-posto-de-trabalho", "o que um barbeiro precisa no posto de trabalho") + " e a <a href=\"../../loja/para-barbeiros/\">seleção para barbeiros</a>.</p>"
      },
      {
        id: "marcas",
        h2: "Melhores marcas: Philips, Braun, Panasonic, Remington e as mais baratas",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Philips</strong> — a gama mais larga: aparadores de barba (Séries 3000, 5000 e 7000), tudo em um (Multigroom) e o OneBlade. Muitos modelos com lâminas que não precisam de óleo.</li>" +
          "<li><strong>Braun</strong> — aparadores de barba com roda e bloqueio (Series 5 e 7) e os tudo em um AIO, com baterias de lítio longas.</li>" +
          "<li><strong>Panasonic</strong> — menos modelos e mais diretos: o " + p("panasonic-er-gb43", "Panasonic ER-GB43") + " é um aparador de barba lavável com 20 ajustes, para quem só quer isso.</li>" +
          "<li><strong>Remington</strong> — clássicos simples: o " + p("remington-mb320c", "Remington MB320C") + " tem lâminas de cerâmica, 9 comprimentos de 1,5 a 18 mm numa roda com janela e trabalha com ou sem fio. A bateria é curta, cerca de 40 minutos.</li>" +
          "<li><strong>Cecotec e marcas mais baratas</strong> — o " + p("cecotec-bamba-precisioncare-pro-5em1", "Cecotec Bamba PrecisionCare Pro 5 em 1") + " é à prova de água (IPX7), funciona com ou sem fio e tem ecrã de bateria. Há muitas marcas sem nome conhecido a vender barato na Amazon, mas raramente dizem que lâmina e que bateria trazem; ficaram fora deste guia.</li></ul>" +
          "<p>Muitas pesquisas juntam o nome de uma loja: Worten, Rádio Popular, Lidl. A Worten e a Rádio Popular vendem muitos destes modelos; o Lidl tem marca própria. Seja onde for, compara a referência exata (BT5765, AIO7545…): o mesmo nome comercial tem várias versões.</p>"
      },
      {
        id: "barato",
        h2: "Aparador de barba barato: o que se perde",
        html: "<p>Um aparador barato apara a barba. O que se perde, normalmente, é <strong>bateria</strong> (menos minutos por carga), <strong>afinação</strong> (menos comprimentos, passos maiores) e <strong>pentes</strong> mais frágeis. Para uma barba curta mantida sempre no mesmo comprimento, nada disto é grave.</p>" +
          "<p>Os mais em conta deste guia: o " + p("philips-bt3619-series-3000", "Philips Série 3000 BT3619") + ", só para barba, com 20 comprimentos de 0,5 a 10 mm e lâminas sem óleo (o pente não passa dos 10 mm), e o " + p("cecotec-bamba-precisioncare-pro-5em1", "Cecotec Pro 5 em 1") + ", tudo em um à prova de água, com cerca de 60 minutos de bateria. Para retoques entre idas ao barbeiro, o " + p("solati-aparador", "Solati Aparador Masculino") + " é leve e prático, mas não serve de aparelho principal.</p>" +
          amz("B0F725KDWK", "philips-bt3619-series-3000")
      },
      {
        id: "aparador-ou-maquina-de-barbear",
        h2: "Aparador ou máquina de barbear?",
        html: "<p>O aparador deixa a barba num comprimento; a máquina de barbear deixa a pele rente. Se gostas de barba de três dias, o aparador chega; se rapas a cara todos os dias, precisas de uma máquina de barbear, ou do OneBlade, que faz um pouco dos dois. As diferenças estão em " + r("trimmer-vs-shaver-diferencas-reais", "trimmer vs shaver") + " e, para escolher uma máquina, em " + r("melhor-maquina-de-barbear-eletrica-qual-escolher", "que máquina de barbear elétrica escolher") + ".</p>"
      },
      {
        id: "limpar",
        h2: "Limpar e cuidar do aparador",
        html: "<p>Depois de cada uso, tira o pente e sacode ou escova os pelos. Nos modelos à prova de água, passa a cabeça por água corrente e deixa secar sem o pente. Nos que têm lâminas que precisam de óleo, uma gota de vez em quando evita que puxem. O passo a passo está em " + r("como-limpar-uma-maquina-de-cortar-cabelo", "como limpar uma máquina de cortar cabelo") + " e vale igual para aparadores.</p>" +
          "<p>Se é a primeira vez que aparas a barba sozinho, vê " + r("como-aparar-a-barba-em-casa", "como aparar a barba em casa") + ": pescoço, bochechas e bigode, passo a passo. E se preferires que seja um barbeiro a desenhar a linha da primeira vez, encontra um no <a href=\"../../#explorar\">mapa do OndeCortar</a>.</p>"
      }
    ],
    faq: [
      ["Qual é o melhor aparador de barba?", "Para a maioria das barbas curtas a médias, um aparador só de barba com muitos comprimentos, como o Philips Série 5000 BT5765 ou o Braun Series 5 BT5525. Se também cortas o cabelo ou aparas nariz e orelhas, um tudo em um como o Philips MG3930."],
      ["Qual é a melhor marca de aparador de barba?", "A Philips e a Braun têm as gamas mais completas e são as mais procuradas. A Panasonic e a Remington têm aparadores mais simples. Mais importante do que a marca é o modelo: comprimentos, bateria e se é à prova de água."],
      ["Um aparador de barba serve para cortar o cabelo?", "Um aparador só de barba não: os pentes ficam pelos 10 a 20 mm. Os tudo em um, como o Philips MG3930 e o Braun AIO7545, trazem pentes para cabelo curto, até 16 a 21 mm. Para cabelo mais comprido, uma máquina de cortar cabelo."],
      ["Vale a pena um aparador de barba profissional para casa?", "Raramente. Em casa conta mais ter passos pequenos de comprimento, um pente que não mexe e boa bateria do que um motor pensado para trabalhar o dia inteiro."],
      ["O aparador de barba precisa de óleo?", "Depende das lâminas. Os Philips Série 3000, 5000 e 7000, o MG3930 e o Remington MB320C têm lâminas que não precisam de óleo. Nos outros, uma gota de vez em quando ajuda."],
      ["O OneBlade é um aparador de barba?", "É um aparelho híbrido: apara, faz contornos e barbeia. Serve bem a barba curta e a cara rapada; para afinar uma barba média ao milímetro, um aparador com roda de comprimentos é mais preciso."]
    ],
    faqCta: "Vê todos os <a href=\"../../loja/trimmers-e-shavers/\">trimmers e shavers da loja</a> ou o passo a passo de <a href=\"../../revista/como-aparar-a-barba-em-casa/\">como aparar a barba em casa</a>.",
    related: ["como-aparar-a-barba-em-casa", "qual-oneblade-comprar", "trimmer-vs-shaver-diferencas-reais"],
    finalCta: {
      h2: "Um aparador para a barba que tens",
      text: "Decide primeiro se é só para a barba ou também para o cabelo; depois escolhe pelos comprimentos e pela bateria.",
      actions: [["../../loja/trimmers-e-shavers/", "Ver trimmers e shavers"], ["../../#explorar", "Encontrar uma barbearia"]]
    }
  }
];
