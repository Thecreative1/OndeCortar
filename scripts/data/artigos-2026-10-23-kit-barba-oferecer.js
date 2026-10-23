// 2026-10-23 — reescrita de revista/melhor-kit-de-barba-para-oferecer/ (estava "Crawled - currently not indexed":
// quase igual a melhor-kit-de-barba-para-comecar… e o-que-vale-a-pena-num-kit…, os mesmos 3 produtos e a mesma estrutura).
// Ângulo próprio: escolher o kit pela barba de quem recebe + o que vem em cada caixa (os 6 kits da loja).
// Pesquisas do Google PT: "kit barba homem" (… presente, … gillette, … nivea), "kit de barba viking",
// "coffret barba homem", "kit de barba e cabelo", "kit de barbear completo", "kit de barbear para presente",
// "melhor kit de barba", "melhor kit barba masculino". Ignoradas marcas do Brasil (Boticário, Natura, Don Alcides).
// Factos dos produtos das páginas produto/{slug}/. Sem preços, avaliações, rankings ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const row = (slug, name, traz, ferramentas, para) =>
  "<tr><th scope=\"row\">" + p(slug, name) + "</th><td data-label=\"O que traz\">" + traz + "</td><td data-label=\"Ferramentas\">" + ferramentas + "</td><td data-label=\"Para quem\">" + para + "</td></tr>";

module.exports = [
  {
    slug: "melhor-kit-de-barba-para-oferecer",
    category: "presentes-e-kits",
    published: "2025-12-04",
    title: "Melhor kit de barba para oferecer: qual escolher para cada homem",
    h1: "Melhor kit de barba para oferecer",
    description: "Que kit de barba oferecer: escolhe pela barba de quem recebe, vê o que traz cada caixa (Viking, King C. Gillette, Cusmay, Oukzon) e o que evitar.",
    schemaDescription: "Como escolher um kit de barba para oferecer pela barba de quem recebe, com o que vem em cada caixa e o que confirmar antes de comprar.",
    image: "imagens/revista/produtos-barba-tabuleiro.jpg",
    imageAlt: "Produtos de barba arrumados num tabuleiro de madeira",
    readMinutes: 6,
    criteria: "Kits escolhidos pelo tipo de barba e de rotina de quem recebe; conteúdo das caixas conforme publicado pelas marcas na Amazon.es. Não testamos produtos.",
    lede: "Um kit de barba acerta quando serve a barba de quem o recebe. Uma caixa de 11 peças para alguém que faz a barba todos os dias fica na gaveta — e um aparador para quem deixa a barba crescer também.",
    subcopy: "Antes de olhar para marcas, responde a uma pergunta: como é a barba dele? Abaixo tens o kit certo para cada caso, o que vem em cada caixa e o que confirmar antes de encomendar.",
    heroActions: [["#pela-barba", "Escolher pela barba dele"], ["#o-que-traz", "Ver o que traz cada kit"]],
    quick: [
      ["Ele tem barba média ou comprida e nenhuma rotina?", "Um kit de cuidado com champô, óleo, bálsamo e escova: o Viking Revolution Sandalwood, ou o Oukzon 10 em 1, que traz também condicionador."],
      ["Tem barba curta, de poucos dias?", "Um kit com aparador, como o King C. Gillette Beard Trimmer Kit (três pentes). Óleos e bálsamos servem pouco a barba curta."],
      ["Faz a barba todos os dias?", "Um kit de barbear clássico: a King C. Gillette Rotina Clássica junta máquina de segurança, pincel, creme e amaciador."],
      ["E se ele não tem barba nenhuma?", "Não ofereças um kit de barba. Um pack de rosto, como o NIVEA MEN Cuidado Completo, acerta mais."]
    ],
    summary: [
      "Escolhe pela barba de quem recebe, não pelo número de peças",
      "Barba comprida: cuidado (óleo, bálsamo, escova)",
      "Barba curta: aparador",
      "Barba feita todos os dias: barbear clássico",
      "Sem barba: pack de rosto",
      "Confirma quem vende e em que língua vêm os rótulos"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Kits de barba",
      text: "Os seis kits deste guia e o que cada um faz bem, com as limitações de cada caixa.",
      actions: [["../../loja/kits-de-barba/", "Ver kits de barba"], ["../../loja/para-oferecer/", "Mais prendas para homem"]]
    },
    sections: [
      {
        id: "pela-barba",
        h2: "Primeiro: como é a barba de quem vai receber?",
        html: "<p>É a pergunta que decide o kit. Um kit de barba não é uma prenda genérica: os produtos servem um tipo de barba e uma rotina.</p><ul class=\"rich-list\"><li><strong>Barba média ou comprida</strong> — precisa de ser lavada, amaciada e penteada. Kit de cuidado.</li><li><strong>Barba curta ou de poucos dias</strong> — o que importa é manter o comprimento. Kit com aparador.</li><li><strong>Faz a barba todos os dias</strong> — kit de barbear, com lâmina, pincel e creme.</li><li><strong>Sem barba e sem interesse em ter</strong> — um kit de barba vai ficar fechado. Vê a secção sobre packs de rosto mais abaixo.</li></ul><p>Se não sabes, olha para fotografias recentes dele ou pergunta a alguém próximo. É mais fiável do que adivinhar pela idade.</p>"
      },
      {
        h2: "Barba média ou comprida, sem rotina: kit de cuidado",
        html: "<p>É o caso em que um kit faz mais sentido: quem deixa crescer a barba raramente tem champô de barba, óleo e escova em casa. Procura um kit com <strong>lavagem, óleo ou bálsamo e uma escova ou pente</strong>.</p><ul class=\"rich-list\"><li>O " + p("viking-sandalwood", "Viking Revolution Sandalwood") + " junta champô, condicionador, óleo, bálsamo e pente, com aroma a sândalo. Não traz ferramentas de corte — é um kit para tratar a barba, não para a aparar.</li><li>O " + p("oukzon-kit-barba-10-em-1", "Oukzon Kit de Barba 10 em 1") + " traz condicionador de barba, que muitos kits não incluem, além de champô, óleo, bálsamo, escova, pente, tesoura e pente modelador. É vendido por um vendedor terceiro e os rótulos vêm em alemão e inglês.</li></ul>" + amz("B07NRR2T4J", "viking-sandalwood")
      },
      {
        h2: "Quer o kit completo, com ferramentas para dar forma",
        html: "<p>Para quem está a começar e não tem nada, um kit com ferramentas evita comprar peça a peça.</p><ul class=\"rich-list\"><li>O " + p("viking-revolution-beard-grooming-kit", "Viking Revolution Beard Grooming Kit") + " junta escova, pente, bálsamo, óleo e tesoura numa caixa de apresentação. Quem já tem rotina montada pode repetir peças.</li><li>O " + p("cusmay-kit-barba-11-em-1", "Kit de Barba CUSMAY 11 em 1") + " é o que traz mais peças: champô, óleos, bálsamo, escova, pente de madeira, tesoura, navalha e bolsa de viagem, numa caixa de oferta. É uma marca menos conhecida, e há peças (como o rolo) que nem toda a gente vai usar.</li></ul><p>Entre os dois: o Viking é mais focado, o Cusmay mais completo no papel.</p>" + amz("B07B53Q3BX", "viking-revolution-beard-grooming-kit")
      },
      {
        h2: "Barba curta ou de poucos dias: kit com aparador",
        html: "<p>Óleos e bálsamos fazem pouco por uma barba de 3 mm. Aqui o que conta é <strong>manter o comprimento</strong> sem ir ao barbeiro todas as semanas.</p><p>O " + p("king-c-gillette-beard-trimmer-kit", "King C. Gillette Beard Trimmer Kit") + " é um aparador sem fios com três pentes intercambiáveis para vários comprimentos. É menos completo do que os kits com óleo e escova, e não substitui uma máquina de cortar cabelo — mas acerta em quem só quer manter a barba arrumada.</p><p>Se ele também corta o cabelo em casa, um aparador de barba não chega: vê as <a href=\"../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/\">melhores máquinas para cortar cabelo em casa</a>, que servem para cabelo e barba.</p>" + amz("B08B959QTP", "king-c-gillette-beard-trimmer-kit")
      },
      {
        h2: "Faz a barba todos os dias: kit de barbear clássico",
        html: "<p>Para quem rapa a cara, um kit de barbear é mais útil do que um kit de barba. A " + p("king-c-rotina", "King C. Gillette Rotina Clássica") + " junta <strong>máquina de segurança, pincel, creme e amaciador</strong> — peças que costumam ser compradas em separado.</p><p>Tem duas limitações: a rotina é mais lenta do que com gel ou máquina elétrica, e pede alguma prática. Acerta em quem gosta de rituais ou quer deixar as lâminas descartáveis. Se ele faz a barba à máquina elétrica e está satisfeito, vê antes <a href=\"../../revista/melhor-maquina-de-barbear-eletrica-qual-escolher/\">que máquina de barbear elétrica escolher</a>.</p>" + amz("B0FMQBG11X", "king-c-rotina")
      },
      {
        id: "o-que-traz",
        h2: "O que vem em cada kit, lado a lado",
        html: "<p>O conteúdo de cada caixa, segundo a ficha da marca na Amazon.es. Confirma na página do produto antes de comprar: as marcas mudam a composição dos kits de tempos a tempos.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Kit</th><th scope=\"col\">O que traz</th><th scope=\"col\">Ferramentas</th><th scope=\"col\">Para quem</th></tr></thead><tbody>" +
          row("viking-sandalwood", "Viking Revolution Sandalwood", "Champô, condicionador, óleo, bálsamo", "Pente", "Barba comprida, sem rotina") +
          row("oukzon-kit-barba-10-em-1", "Oukzon 10 em 1", "Champô e condicionador (60 ml cada), óleo, bálsamo", "Escova, pente, tesoura, pente modelador, saco", "Barba comprida; quer condicionador") +
          row("viking-revolution-beard-grooming-kit", "Viking Revolution Beard Grooming Kit", "Óleo, bálsamo", "Escova, pente, tesoura", "Primeiro kit, com ferramentas") +
          row("cusmay-kit-barba-11-em-1", "CUSMAY 11 em 1", "Champô, óleos, bálsamo", "Escova, pente de madeira, tesoura, navalha, bolsa", "Quem não tem nada e quer tudo numa caixa") +
          row("king-c-gillette-beard-trimmer-kit", "King C. Gillette Beard Trimmer Kit", "—", "Aparador sem fios, 3 pentes", "Barba curta") +
          row("king-c-rotina", "King C. Gillette Rotina Clássica", "Creme de barbear, amaciador", "Máquina de segurança, pincel", "Faz a barba todos os dias") +
          "</tbody></table></div>"
      },
      {
        h2: "Ele não tem barba? Oferece um pack de rosto",
        html: "<p>Um kit de barba para quem não tem barba é a prenda que fica fechada. Se a ideia é oferecer cuidado, um pack de rosto acerta mais:</p><ul class=\"rich-list\"><li>O " + p("nivea-men-pack-neceser", "NIVEA MEN Pack Cuidado Completo") + " junta creme facial (75 ml), creme em lata (150 ml), bálsamo after shave (100 ml) e desodorizante numa necessaire. São produtos de gama básica — quem já tem rotina de rosto não ganha muito.</li><li>O " + p("loreal-men-expert-power-age-rotina", "L'Oréal Men Expert Power Age Rotina") + " traz sérum e creme anti-idade numa necessaire, para quem começa a notar rugas. Não tem proteção solar.</li></ul><p>Mais ideias em <a href=\"../../revista/prendas-de-natal-para-homem/\">prendas de Natal para homem</a> e <a href=\"../../revista/o-que-oferecer-ao-pai/\">o que oferecer ao pai</a>.</p>" + amz("B0DK1N6LJY", "nivea-men-pack-neceser")
      },
      {
        h2: "Kit, coffret ou produto isolado?",
        html: "<p>\"Coffret\" é só o nome que as lojas dão à caixa de oferta: um coffret de barba é um kit numa embalagem pensada para oferecer. O que importa é o mesmo — o que vem lá dentro.</p><p>O kit ganha quando a pessoa <strong>ainda não tem rotina</strong>: recebe tudo o que precisa de uma vez. Um produto isolado ganha quando <strong>já tem rotina</strong>: um kit vai repetir o que ele já tem. Nesse caso, oferece uma versão melhor do que ele usa — uma <a href=\"../../produto/zilberhaar-escova/\">escova de barba de javali</a> a quem usa um pente de plástico, ou um <a href=\"../../produto/proraso-balsamo-barba/\">bálsamo de barba</a> a quem só usa óleo.</p>"
      },
      {
        h2: "O que confirmar antes de comprar",
        html: "<ul class=\"rich-list\"><li><strong>Quem vende.</strong> Na Amazon.es, o mesmo kit pode ser vendido pela Amazon ou por um vendedor terceiro, com prazos e devoluções diferentes. Para uma prenda, isto conta.</li><li><strong>A língua dos rótulos.</strong> Alguns kits vêm com instruções só em inglês, alemão ou espanhol. Não estraga o produto, mas é bom saber.</li><li><strong>O aroma.</strong> É o critério mais pessoal. Se não conheces os gostos dele, prefere aromas ligeiros ou sem perfume a madeiras intensas.</li><li><strong>Peças para encher a caixa.</strong> Rolos, espátulas e pentes frágeis aumentam o número de peças sem aumentar o uso. Conta as peças que ele vai mesmo usar.</li><li><strong>O prazo, se é para o Natal.</strong> Em dezembro as entregas para Portugal alargam. Confirma a data prevista antes de encomendar e vê o que <a href=\"../../loja/black-friday/\">vigiar na Black Friday</a> se ainda tens tempo.</li></ul>"
      },
      {
        h2: "Na dúvida: oferece uma barba feita por um barbeiro",
        html: "<p>Se não sabes como ele trata a barba, um corte e uma barba numa barbearia é uma prenda que não falha — e mostra-lhe o que pedir da próxima vez. Algumas barbearias vendem vales de oferta; pergunta diretamente. Encontra uma perto dele no <a href=\"../../#explorar\">mapa do OndeCortar</a> ou procura <a href=\"../../cidades/\">por cidade</a>.</p>"
      }
    ],
    faq: [
      ["Qual é o melhor kit de barba para oferecer?", "Depende da barba de quem recebe. Para barba comprida sem rotina, um kit de cuidado como o Viking Revolution Sandalwood; para barba curta, um kit com aparador; para quem faz a barba todos os dias, um kit de barbear clássico."],
      ["Um kit de barba é boa prenda para quem não tem barba?", "Não. Fica fechado. Para quem não tem barba, um pack de rosto ou um kit de barbear acertam mais."],
      ["O que deve ter um kit de barba?", "Para barba comprida: lavagem (champô), óleo ou bálsamo e uma escova ou pente. A tesoura e o pente modelador ajudam a dar forma. Peças extra só contam se ele as vai usar."],
      ["Qual é a diferença entre kit de barba e kit de barbear?", "O kit de barba trata a barba que fica (champô, óleo, bálsamo, escova). O kit de barbear serve para a rapar (lâmina, pincel, creme)."],
      ["O que é um coffret de barba?", "É um kit de barba numa caixa de oferta. Escolhe-se como qualquer kit: pelo que vem lá dentro e pela barba de quem recebe."],
      ["Há kits de barba e cabelo?", "Os kits de cuidado servem a barba. Para cortar cabelo e barba em casa, o que se oferece é uma máquina com pentes para os dois."]
    ],
    faqCta: "Ainda indeciso? Vê todos os <a href=\"../../loja/kits-de-barba/\">kits de barba da loja</a> ou as <a href=\"../../loja/para-oferecer/\">prendas para homem</a>.",
    related: ["prendas-de-natal-para-homem", "o-que-oferecer-ao-pai", "melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas"],
    finalCta: {
      h2: "Um kit que ele vai abrir e usar",
      text: "Escolhe pela barba dele, confirma o que vem na caixa e compra com tempo.",
      actions: [["../../loja/kits-de-barba/", "Ver kits de barba"], ["../../loja/para-oferecer/", "Prendas para homem"]]
    }
  }
];
