// 2026-10-11 — creme de rosto para homem. Estrutura tirada das sugestões do Google PT:
// "creme rosto homem pele oleosa / seca / mista", "creme hidratante homem com protetor solar",
// "creme rosto homem 40 anos", "melhor creme antirrugas homem", "pode passar creme depois de fazer a barba",
// "como aplicar creme no rosto", marcas Nivea Men / L'Oréal Men Expert / CeraVe.
// Produtos em scripts/data/produtos-2026-10-11-rosto.js (só características do fabricante).
const P = (slug, name) => '<a href="../../produto/' + slug + '/">' + name + "</a>";

module.exports = [
  {
    slug: "creme-de-rosto-para-homem-como-escolher",
    category: "guias-de-compra",
    title: "Creme de rosto para homem: qual escolher pelo tipo de pele",
    h1: "Creme de rosto para homem: como escolher pelo tipo de pele",
    description: "Que creme de rosto usar se és homem: pele oleosa, seca ou sensível, com protetor solar ou a partir dos 40. Uma escolha clara para cada caso.",
    schemaDescription: "Como escolher um creme de rosto masculino pelo tipo de pele, porque o protetor solar conta mais do que o anti-rugas e como aplicar.",
    image: "imagens/revista/homem-creme-rosto-espelho.jpg",
    imageAlt: "Homem de barba ao espelho da casa de banho a aplicar um produto no rosto",
    readMinutes: 6,
    criteria: "Características conforme publicadas pelos fabricantes na Amazon.es; produtos escolhidos pelo que mais se procura em Portugal.",
    lede: "A maioria dos homens não precisa de uma rotina de dez passos. Precisa de um creme certo para a sua pele, posto de manhã, todos os dias.",
    subcopy: "Aqui está como perceber o teu tipo de pele, que creme escolher em cada caso e porque o protetor solar vale mais do que qualquer anti-rugas.",
    heroActions: [["#tipo-de-pele", "Descobrir o meu tipo de pele"], ["../../loja/cuidados-de-rosto/", "Ver cremes de rosto"]],
    quick: [
      ["Preciso mesmo de creme?", "Se a pele repuxa depois de lavar ou de fazer a barba, brilha a meio do dia ou fica vermelha com facilidade, sim. Um creme simples resolve a maior parte."],
      ["Qual escolher?", "Pele oleosa: gel leve. Pele seca ou sensível: creme sem álcool. Para a maioria, um hidratante com proteção solar de manhã é a melhor compra."],
      ["Posso pôr depois da barba?", "Podes e deves: espera um minuto com a pele seca e aplica um creme sem álcool. Ajuda a acalmar o ardor."],
      ["E a partir dos 40?", "Um hidratante pensado para a idade ajuda no aspeto, mas o que mais protege a pele é o FPS de todos os dias."]
    ],
    summary: [
      "Descobre o tipo de pele antes de comprar",
      "Pele oleosa ou mista: gel-creme leve",
      "Pele seca ou sensível: creme sem álcool",
      "De manhã, hidratante com proteção solar",
      "Depois da barba, espera um minuto e hidrata",
      "Uma quantidade do tamanho de uma ervilha chega"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Cuidados de rosto",
      text: "Os cinco cremes deste guia, um por tipo de pele, com o contexto de cada um.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver cremes de rosto"], ["#protecao-solar", "Porquê o FPS"]]
    },
    sections: [
      {
        h2: "Precisas mesmo de um creme de rosto?",
        html: "<p>Lavar a cara com sabão, fazer a barba e apanhar sol e vento todos os dias tira água à pele. Os sinais são fáceis de reconhecer: a pele <strong>repuxa</strong> depois do banho ou da barba, descama à volta do nariz e da barba, ou então faz o contrário e <strong>brilha</strong> a meio do dia. Um creme de rosto não é vaidade, é o passo que equilibra isso.</p><p>A nossa posição é simples: para a maioria dos homens chega <strong>um creme, de manhã, com proteção solar</strong>. Séruns, contornos de olhos e máscaras podem vir depois, se fizerem falta. Começar com cinco produtos é a forma mais rápida de desistir ao fim de duas semanas.</p>"
      },
      {
        id: "tipo-de-pele",
        h2: "Como saber o teu tipo de pele",
        html: "<p>Lava a cara com água morna e um sabão suave, seca com toques e não ponhas nada durante uma hora. Depois olha para o espelho:</p><ul class=\"rich-list\"><li><strong>Brilho em todo o rosto</strong>: pele oleosa.</li><li><strong>Brilho só na testa, no nariz e no queixo</strong> (a zona T): pele mista, a mais comum.</li><li><strong>Pele a repuxar, áspera ou a descamar</strong>: pele seca.</li><li><strong>Vermelhidão, ardor ou comichão</strong> com sabões, after-shaves ou com a barba: pele sensível, que pode ser também oleosa ou seca.</li></ul><p>Se nada disto acontece, tens pele normal e quase qualquer hidratante leve serve. A escolha que se segue parte deste teste.</p>"
      },
      {
        h2: "Pele oleosa ou mista: um gel leve, sem brilho",
        html: "<p>O erro mais comum de quem tem pele oleosa é não pôr creme nenhum. Pele sem hidratação pode compensar com mais oleosidade. O que resolve é uma textura leve, em gel, que hidrata sem deixar película.</p><p>Aqui a nossa escolha é o " + P("cerave-oil-control-gel", "CeraVe Oil Control Gel") + ": a marca indica-o para pele mista a oleosa e promete controlar o brilho, com ceramidas, niacinamida e ácido hialurónico. Não tem proteção solar, por isso de dia convém juntar um FPS. Se preferes uma marca de homem com textura parecida, o " + P("loreal-men-expert-hydra-energetic", "L'Oréal Men Expert Hydra Energetic") + " é um gel-creme de absorção rápida, segundo a marca.</p>"
      },
      {
        h2: "Pele seca, sensível ou irritada depois da barba",
        html: "<p>Se a pele arde depois da lâmina ou da máquina, o primeiro passo é o barbear: lâmina afiada, preparação com água quente e passar a favor do pelo (explicamos tudo em <a href=\"../../revista/como-reduzir-irritacao-ao-fazer-a-barba/\">como reduzir a irritação ao fazer a barba</a>). O segundo é o que pões a seguir. After-shaves com álcool podem arder em pele sensível; um creme sem álcool acalma sem esse efeito.</p><p>Para este caso escolhemos o " + P("nivea-men-sensitive-fp15", "NIVEA MEN Sensitive Hidratante Protetor FP15") + ": sem álcool, com camomila, provitamina B5 e vitamina E, e com um FPS 15 que já dá alguma proteção no dia a dia. Para dias de muito sol, o FPS 15 fica curto. Se a irritação não passa com nada, fala com um dermatologista: pode não ser só pele seca.</p><p>A dúvida <strong>«posso pôr creme depois de fazer a barba?»</strong> tem resposta curta: sim. Passa água fria, seca com toques, espera um minuto e aplica uma camada fina.</p>"
      },
      {
        id: "protecao-solar",
        h2: "Com proteção solar: o passo que mais compensa",
        html: "<p>O sol de todos os dias (no carro, na esplanada, a ir a pé para o trabalho) é uma das principais causas do envelhecimento da pele. Por isso um hidratante com FPS de manhã faz mais pela pele, a longo prazo, do que qualquer creme anti-rugas.</p><p>A nossa escolha é a " + P("cerave-hidratante-rosto-spf50", "CeraVe Loção Hidratante de Rosto SPF 50") + ": hidrata e protege no mesmo passo, sem perfume e não comedogénica, segundo a marca. É indicada para pele normal a seca. Com pele muito oleosa, usa o gel da secção anterior e um protetor solar próprio por cima. Na praia ou na montanha, a própria marca recomenda um protetor solar a sério.</p><p><a href=\"../../loja/cuidados-de-rosto/\">Ver os cinco cremes de rosto da nossa seleção</a>.</p>"
      },
      {
        h2: "A partir dos 40: anti-idade sem complicar",
        html: "<p>Com a idade, a pele tende a ficar mais seca e baça. Um hidratante pensado para essa fase ajuda no aspeto, e é isso que pedem as pesquisas por «creme rosto homem 40 anos». Convém ser honesto: nenhum creme apaga rugas. O que faz diferença é hidratar todos os dias e proteger do sol.</p><p>Se queres um creme específico, o " + P("loreal-men-expert-power-age", "L'Oréal Men Expert Power Age") + " é pensado pela marca para os primeiros sinais de idade, com ácido hialurónico, e vem num frasco de 100 ml que rende. Não tem FPS: de manhã, junta a proteção solar.</p>"
      },
      {
        id: "como-aplicar",
        h2: "Como aplicar (e quanto)",
        html: "<ol class=\"rich-list\"><li><strong>Pele limpa</strong>: depois do banho ou de lavar a cara.</li><li><strong>Quantidade de uma ervilha</strong> para o rosto todo. Mais não hidrata mais, só deixa brilho.</li><li><strong>Espalha do centro para fora</strong>: testa, faces, nariz, queixo e, no fim, o pescoço.</li><li><strong>Na barba</strong>, aplica na pele das faces e por baixo da barba, não nos pelos. Para o pelo, usa <a href=\"../../revista/oleo-de-barba-para-que-serve/\">óleo de barba</a>.</li><li><strong>À noite</strong> é opcional: se a pele repuxa, repete sem FPS.</li></ol>"
      },
      {
        h2: "Se tivéssemos de escolher apenas um",
        html: "<p>A " + P("cerave-hidratante-rosto-spf50", "CeraVe Loção Hidratante de Rosto SPF 50") + ". Hidrata e protege do sol no mesmo gesto, que é o que a maioria dos homens precisa e raramente faz. A exceção é a pele claramente oleosa: aí começa pelo " + P("cerave-oil-control-gel", "CeraVe Oil Control Gel") + " e junta um protetor solar.</p>"
      }
    ],
    faq: [
      ["Os homens precisam de creme hidratante no rosto?", "A maioria beneficia: lavar a cara, fazer a barba e o sol tiram água à pele. Um creme simples de manhã chega para quase todos."],
      ["Pode passar creme depois de fazer a barba?", "Sim. Passa água fria, seca com toques, espera um minuto e aplica uma camada fina de creme sem álcool."],
      ["Qual o melhor creme de rosto para homem com pele oleosa?", "Um gel-creme leve indicado para pele mista a oleosa, como o CeraVe Oil Control Gel, com um protetor solar por cima de dia."],
      ["Que creme de rosto usar aos 40 anos?", "Um hidratante pensado para os primeiros sinais de idade ajuda no aspeto, mas o que mais protege a pele é o FPS diário."],
      ["Um creme hidratante com protetor solar chega?", "No dia a dia, sim. Para praia, montanha ou muitas horas ao sol, usa um protetor solar próprio."]
    ],
    faqCta: "Vê os cinco cremes desta seleção em <a href=\"../../loja/cuidados-de-rosto/\">Cuidados de rosto</a>.",
    related: ["como-reduzir-irritacao-ao-fazer-a-barba", "after-shave-para-que-serve", "pelos-encravados-como-evitar"],
    finalCta: {
      h2: "Um creme, de manhã, todos os dias",
      text: "Escolhe pelo teu tipo de pele e mantém a rotina curta. É a constância que se nota.",
      actions: [["../../loja/cuidados-de-rosto/", "Ver cremes de rosto"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]]
    }
  }
];
