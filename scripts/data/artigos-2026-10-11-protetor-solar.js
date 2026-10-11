// 2026-10-11 — protetor solar para homem. Estrutura tirada das sugestões do Google PT:
// "melhor protetor solar para homem", "protetor solar homem pele oleosa", "protetor solar para homem com barba",
// "passar protetor solar na barba", "protetor solar para careca", "usar protetor solar todos os dias faz mal",
// "precisa usar protetor solar no inverno", "fps 30 ou 50", stick / spray / desporto, ISDIN, La Roche-Posay.
// Produtos em scripts/data/produtos-2026-10-11-protetor-solar.js (só características do fabricante).
const P = (slug, name) => '<a href="../../produto/' + slug + '/">' + name + "</a>";

module.exports = [
  {
    slug: "protetor-solar-para-homem-qual-escolher",
    category: "guias-de-compra",
    title: "Protetor solar para homem: qual usar no rosto, barba e cabeça",
    h1: "Protetor solar para homem: qual usar no rosto, na barba e na cabeça",
    description: "Protetor solar para homem: FPS 30 ou 50, pele oleosa sem brilho, como passar na barba e na cabeça rapada, e porque usar todos os dias.",
    schemaDescription: "Que protetor solar usar se és homem: no rosto todos os dias, com pele oleosa, na barba, na cabeça rapada e no desporto.",
    image: "imagens/revista/homem-perfil-sol-forte.jpg",
    imageAlt: "Grande plano do rosto de um homem com sol forte na pele",
    readMinutes: 6,
    criteria: "Características conforme publicadas pelos fabricantes na Amazon.es; produtos escolhidos pelo que mais se procura em Portugal.",
    lede: "A maioria dos homens só se lembra do protetor solar na praia. O sol que mais marca a pele é o de todos os dias: no carro, na esplanada, a caminho do trabalho.",
    subcopy: "Aqui está que FPS escolher, como evitar o brilho que faz tanta gente desistir e o que usar na barba, na cabeça rapada e no desporto.",
    heroActions: [["#pele-oleosa", "Protetor sem brilho"], ["../../loja/cuidados-de-rosto/", "Ver protetores solares"]],
    quick: [
      ["Todos os dias?", "Sim, no rosto, nas orelhas e no pescoço. Também no inverno e com o céu nublado: parte da radiação passa as nuvens."],
      ["FPS 30 ou 50?", "Para o dia a dia, FPS 50. A diferença em percentagem parece pequena, mas quase ninguém põe a quantidade que o FPS pressupõe."],
      ["E se a pele brilha?", "Escolhe um fluido de acabamento mate. A textura é o que decide se continuas a usar."],
      ["Cabeça rapada?", "É das zonas que mais sol apanha. Um spray próprio para o couro cabeludo é o mais prático."]
    ],
    summary: [
      "FPS 50 no rosto todos os dias, também no inverno",
      "Pele oleosa: fluido de acabamento mate",
      "Na barba: espalha na pele por baixo, não no pelo",
      "Cabeça rapada: spray próprio para o couro cabeludo",
      "Ao sol, reaplica a cada duas horas",
      "Quantidade para o rosto: o comprimento de dois dedos"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de rosto",
      text: "Os protetores deste guia e os cremes de rosto, cada um com o seu caso de uso.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver protetores solares"], ["#como-aplicar", "Como aplicar"]]
    },
    sections: [
      {
        h2: "Porque usar protetor solar todos os dias",
        html: "<p>A exposição ao sol é a principal causa evitável do envelhecimento da pele (manchas, rugas, pele mais grossa e baça) e um fator de risco para o cancro de pele. Não é preciso estar na praia: meia hora por dia a conduzir ou na esplanada, todos os dias do ano, soma muito mais do que duas semanas de férias.</p><p>A dúvida <strong>«usar protetor solar todos os dias faz mal?»</strong> aparece muito nas pesquisas. Para a pele, não: é um dos hábitos mais simples e mais úteis. E <strong>no inverno também</strong>: parte da radiação ultravioleta atravessa as nuvens, e o sol baixo bate em cheio na cara.</p><p>A nossa posição: <strong>FPS 50 no rosto, todas as manhãs</strong>, como lavar os dentes. O resto deste guia é para escolher um que não te faça desistir.</p>"
      },
      {
        h2: "FPS 30 ou 50: qual escolher",
        html: "<p>No papel, a diferença parece pequena: o FPS 30 filtra cerca de 97% dos raios UVB e o FPS 50 cerca de 98%. Na prática, o número só vale se puseres a quantidade com que é medido, e quase ninguém põe. Com metade da dose, a proteção real fica bem abaixo do que diz o rótulo. Por isso, para o rosto, escolhe <strong>FPS 50</strong>: compensa a camada mais fina que todos pomos.</p><p>Confirma também que diz <strong>UVA</strong> além de UVB. O UVB queima; o UVA passa vidros e nuvens e é o que mais envelhece a pele.</p>"
      },
      {
        id: "pele-oleosa",
        h2: "Pele oleosa: o protetor que não brilha",
        html: "<p>A razão número um por que os homens largam o protetor solar é a cara a brilhar ao meio-dia. A solução não é deixar de o usar; é trocar a textura. Fluidos e géis de acabamento mate ficam quase invisíveis.</p><p>A nossa escolha para o dia a dia é o " + P("isdin-fusion-water-magic-spf50", "ISDIN Fusion Water Magic SPF 50") + ": fase aquosa, absorção imediata e acabamento mate segundo a marca, que o indica para pele oleosa. Se a tua pele brilha mesmo muito, ou tem tendência a borbulhas, o " + P("la-roche-posay-anthelios-oil-control", "La Roche-Posay Anthelios UVMune 400 Oil Control SPF 50+") + " é formulado para pele oleosa e sensível.</p><p>Com <strong>pele seca</strong>, o caminho é o contrário: um hidratante que já traga proteção, como a " + P("cerave-hidratante-rosto-spf50", "CeraVe Loção Hidratante de Rosto SPF 50") + ", que vimos no <a href=\"../../revista/creme-de-rosto-para-homem-como-escolher/\">guia dos cremes de rosto</a>.</p><p><a href=\"../../loja/cuidados-de-rosto/\">Ver os protetores e cremes da nossa seleção</a>.</p>"
      },
      {
        id: "barba",
        h2: "Como passar protetor solar na barba",
        html: "<p>A barba faz alguma sombra, mas não protege a pele: a pele por baixo, as maçãs do rosto e a linha da barba apanham sol na mesma. Uma barba curta ou de poucos dias quase não tapa nada.</p><ul class=\"rich-list\"><li><strong>Escolhe um fluido</strong>: espalha-se melhor entre os pelos do que um creme espesso.</li><li><strong>Aplica com as pontas dos dedos, contra o sentido do pelo</strong>, para chegar à pele.</li><li><strong>Não te esqueças das zonas sem barba</strong>: nariz, testa, orelhas e nuca, onde a pele está mais exposta.</li><li><strong>Depois de fazer a barba</strong>, espera uns minutos com a pele seca antes de aplicar, para arder menos.</li></ul>"
      },
      {
        id: "cabeca",
        h2: "Cabeça rapada ou pouco cabelo",
        html: "<p>O topo da cabeça é das zonas que mais sol apanha e das que menos gente protege. Quem rapa a cabeça (vê o nosso guia sobre <a href=\"../../revista/como-rapar-a-cabeca-em-casa-shaver-ou-maquina/\">como rapar a cabeça em casa</a>) precisa de proteção ali todos os dias de sol.</p><p>Um creme na cabeça inteira é pouco prático e brilha. O formato mais simples é um spray: o " + P("isdin-scalp-hair-spray-spf50", "ISDIN Scalp & Hair Spray SPF 50") + " é feito para o couro cabeludo e o cabelo, com acabamento transparente e não gorduroso segundo a marca, e aplica-se também com a cabeça húmida. Um boné ou chapéu continua a ser a melhor proteção nas horas de mais calor.</p>"
      },
      {
        h2: "Desporto e trabalho ao ar livre",
        html: "<p>Quem corre, pedala, joga golfe ou trabalha na rua sua e esfrega a cara, e o protetor vai-se embora. Aqui conta a resistência à água e ao suor e, sobretudo, a facilidade de reaplicar.</p><p>Para isso escolhemos um stick: o " + P("heliocare-360-sport-stick", "Heliocare 360º Sport Transparent Stick SPF 50+") + " é transparente, resistente à água e ao suor segundo a marca, e cabe no bolso. Passa-se no nariz, nas maçãs do rosto, nas orelhas e na linha da barba sem sujar as mãos. É para reaplicar e zonas pequenas; a primeira camada da manhã continua a ser o fluido.</p>"
      },
      {
        id: "como-aplicar",
        h2: "Como aplicar e quando reaplicar",
        html: "<ol class=\"rich-list\"><li><strong>Quantidade</strong>: para o rosto e pescoço, uma linha de produto do comprimento de dois dedos. Parece muito; é o que dá o FPS do rótulo.</li><li><strong>Último passo da manhã</strong>: depois de lavar a cara e do creme de rosto, se usas.</li><li><strong>Não esqueças</strong> as orelhas, a nuca, o pescoço e, se for o caso, a cabeça.</li><li><strong>Ao sol, reaplica a cada duas horas</strong>, e sempre depois de nadar ou suar muito.</li><li><strong>Na praia</strong>, usa também um protetor de corpo e procura sombra nas horas de mais calor.</li></ol>"
      },
      {
        h2: "Se tivéssemos de escolher apenas um",
        html: "<p>O " + P("isdin-fusion-water-magic-spf50", "ISDIN Fusion Water Magic SPF 50") + ". É leve, não brilha e serve na maioria das peles, por isso é o que tem mais hipóteses de passar a fazer parte da manhã. Com pele seca, troca pela " + P("cerave-hidratante-rosto-spf50", "CeraVe SPF 50") + "; com a cabeça rapada, junta o spray.</p>"
      }
    ],
    faq: [
      ["Qual o melhor protetor solar para homem?", "Para o rosto, um FPS 50 leve que não brilhe, para usar todos os dias. Com pele oleosa, um fluido de acabamento mate; com pele seca, um hidratante com FPS 50."],
      ["Usar protetor solar todos os dias faz mal?", "Não. Proteger o rosto todos os dias é um dos hábitos mais úteis para a pele, também no inverno."],
      ["Preciso de protetor solar no inverno?", "No rosto, sim: parte da radiação ultravioleta atravessa as nuvens e o sol baixo bate em cheio na cara."],
      ["FPS 30 ou 50: qual escolher?", "Para o rosto, FPS 50. Quase ninguém aplica a quantidade com que o FPS é medido, e o 50 compensa essa camada mais fina."],
      ["Como passar protetor solar na barba?", "Usa um fluido e aplica com as pontas dos dedos contra o sentido do pelo, para chegar à pele. Não esqueças nariz, orelhas e nuca."],
      ["Que protetor solar usar na careca?", "Um spray próprio para o couro cabeludo, transparente e não gorduroso, reaplicado ao sol. Um boné continua a ajudar."]
    ],
    faqCta: "Vê os protetores e cremes desta seleção em <a href=\"../../loja/cuidados-de-rosto/\">Cuidados de rosto</a>.",
    related: ["creme-de-rosto-para-homem-como-escolher", "como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "como-reduzir-irritacao-ao-fazer-a-barba"],
    finalCta: {
      h2: "Um protetor que gostes de usar",
      text: "O melhor protetor solar é o que pões todas as manhãs. Escolhe pela pele e pela textura.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver protetores solares"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]]
    }
  }
];
