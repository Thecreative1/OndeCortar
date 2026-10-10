// 2026-10-10 — pelos encravados. Pesquisas confirmadas nas sugestões do Google PT:
// "pelos encravados" (… virilha, … axila, … pernas, … braços), "como evitar pelos encravados
// após a depilação", "como tratar pelos encravados na virilha", "melhor esfoliante para pelos
// encravados", "qual pomada para pelos encravados". Sem conselhos médicos nem recomendações de
// pomadas: inflamação, infeção ou casos repetidos → médico/dermatologista.
// Factos dos produtos das páginas produto/{slug}/; sem preços, avaliações, rankings ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "pelos-encravados-como-evitar",
    category: "cuidados-com-a-barba",
    published: "2026-10-10",
    title: "Pelos encravados: porque aparecem e como evitar (barba, virilha, axilas)",
    h1: "Pelos encravados: porque aparecem e como evitar",
    description: "Porque aparecem pelos encravados no pescoço, na virilha e nas axilas, como os evitar ao barbear e aparar, o que não fazer e quando ir ao médico.",
    schemaDescription: "Porque aparecem pelos encravados na barba e no corpo, como os evitar ao barbear e aparar, e quando ir ao médico.",
    image: "imagens/revista/espuma-pescoco-barbeiro.jpg",
    imageAlt: "Barbeiro a aplicar espuma de barbear no pescoço de um cliente com barba, a preto e branco",
    readMinutes: 5,
    criteria: "Prevenção e cuidados gerais; diagnóstico e tratamento remetidos para o médico. Características dos produtos conforme publicadas pelos fabricantes.",
    lede: "Aquela borbulha no pescoço que aparece dois dias depois de fazer a barba quase sempre tem o mesmo culpado: um pelo que, em vez de sair, voltou para dentro da pele. Na virilha e nas axilas é igual — e dói mais.",
    subcopy: "A boa notícia é que a maioria se evita com uma mudança simples na forma como cortas. Aqui está porque acontece, o que fazer e o que nunca fazer.",
    heroActions: [["#como-evitar", "Como evitar"], ["#produtos-recomendados", "O que usar"]],
    quick: [
      ["Porque aparecem?", "O pelo cortado muito rente fica com a ponta afiada e, ao crescer, curva e volta a entrar na pele. É mais comum em pelo grosso ou encaracolado."],
      ["Qual é a forma mais simples de evitar?", "Não rapar tão rente: aparar e deixar um ou dois milímetros, ou barbear a favor do crescimento."],
      ["Posso espremer ou arrancar?", "Não. Espremer e escavar com pinça é o que transforma um pelo encravado numa inflamação."],
      ["Quando ir ao médico?", "Se houver dor, pus, vermelhidão que alastra, febre ou se aparecem sempre: médico ou dermatologista."]
    ],
    summary: [
      "Pelo cortado rente curva e volta a entrar na pele",
      "Aparar com 1–2 mm em vez de rapar resolve muitos casos",
      "A rapar: pele preparada, lâmina boa, a favor do crescimento",
      "Esfoliar com suavidade entre barbeados",
      "Nunca espremer nem escavar com pinça",
      "Dor, pus ou casos repetidos: médico"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Aparar em vez de rapar",
      text: "Aparadores para barba e corpo que deixam um ou dois milímetros — a forma mais simples de evitar pelos encravados.",
      actions: [["../../produto/philips-bodygroom-bg3480/", "Aparador corporal"], ["../../loja/trimmers-e-shavers/", "Ver aparadores"]]
    },
    sections: [
      {
        h2: "Porque é que os pelos encravam",
        html: "<p>Quando cortas um pelo muito rente — com lâmina, sobretudo contra o crescimento —, a ponta fica cortada em bico e, às vezes, por baixo do nível da pele. Ao crescer, em vez de sair, o pelo <strong>curva e volta a entrar</strong>. A pele reage como a qualquer corpo estranho: vermelhidão, um alto, por vezes uma pequena borbulha.</p><p>Acontece mais a quem tem <strong>pelo grosso ou encaracolado</strong> e nas zonas onde o pelo cresce em várias direções: o <strong>pescoço</strong>, a <strong>virilha</strong> e as <strong>axilas</strong>. Na barba, quando é repetido, tem até nome próprio — e vale a pena falar com um dermatologista.</p>"
      },
      {
        id: "como-evitar",
        h2: "Como evitar: a mudança que resolve mais casos",
        html: "<p><strong>Não cortes tão rente.</strong> Deixar um ou dois milímetros de pelo é, para muita gente, a diferença entre ter e não ter pelos encravados. A ponta fica acima da pele e o pelo cresce para fora.</p><ul class=\"rich-list\"><li><strong>Na barba:</strong> se a cara lisa não é obrigatória, uma barba de poucos dias aparada com pente resolve. Um aparador com muitos comprimentos, como o <a href=\"../../produto/braun-bt5525-series-5/\">Braun BT5525</a>, ou um <a href=\"../../produto/philips-oneblade-360-qp2724/\">OneBlade</a> com pente curto.</li><li><strong>No corpo:</strong> aparar em vez de rapar. Um aparador corporal com pentes de 2 e 3 mm, como o <a href=\"../../produto/philips-bodygroom-bg3480/\">Philips Body Groomer Série 3000</a>, foi pensado para estas zonas, incluindo as íntimas.</li></ul>" + amz("B0FJM3MZ9T", "philips-bodygroom-bg3480")
      },
      {
        h2: "Se preferes rapar: como reduzir o risco",
        html: "<ol class=\"rich-list\"><li><strong>Prepara a pele</strong> com água quente — no fim do duche é o ideal — e um pré-barba que amacie o pelo, como o <a href=\"../../produto/proraso-pre-barba/\">Proraso Pré-Barba para pele sensível</a>.</li><li><strong>Lâmina afiada.</strong> Uma lâmina gasta puxa e corta de forma irregular.</li><li><strong>A favor do crescimento</strong> na primeira passagem. Contra o crescimento rapa mais rente — e é aí que o pelo encrava.</li><li><strong>Sem esticar demasiado a pele</strong>: quando a soltas, o pelo cortado recolhe para baixo da superfície.</li><li><strong>Água fria e hidratante</strong> no fim, sem álcool se a pele é sensível.</li></ol><p>Mais em <a href=\"../../revista/como-reduzir-irritacao-ao-fazer-a-barba/\">como reduzir a irritação ao fazer a barba</a>.</p>"
      },
      {
        h2: "Virilha e axilas",
        html: "<p>São as zonas onde os pelos encravados mais incomodam, porque a pele é fina, há fricção da roupa e o pelo cresce em várias direções. Três cuidados fazem diferença:</p><ul class=\"rich-list\"><li><strong>Aparar em vez de rapar</strong>, com pente encaixado — está tudo no guia do <a href=\"../../revista/aparador-corporal-masculino-qual-escolher/\">aparador corporal</a>.</li><li><strong>Roupa interior que não aperte</strong> nos dias a seguir.</li><li><strong>Esfoliar com suavidade</strong> duas ou três vezes por semana, para soltar a pele que prende a ponta do pelo — sem esfregar com força sobre zonas já irritadas.</li></ul>"
      },
      {
        h2: "O que nunca fazer",
        html: "<ul class=\"rich-list\"><li><strong>Espremer.</strong> Empurra a inflamação para dentro.</li><li><strong>Escavar com pinça ou agulha.</strong> Abre a pele e convida a infeção.</li><li><strong>Rapar por cima de uma zona inflamada.</strong> Dá-lhe uns dias de descanso.</li><li><strong>Insistir no mesmo método</strong> se os pelos encravam sempre: muda a forma de cortar.</li></ul>"
      },
      {
        h2: "Quando ir ao médico",
        html: "<p>A maioria dos pelos encravados resolve-se sozinha em poucos dias. Fala com um médico ou dermatologista se houver <strong>dor forte, pus, vermelhidão que alastra, febre</strong>, se as borbulhas deixarem <strong>manchas ou cicatrizes</strong>, ou se aparecem <strong>sempre</strong> que cortas. Existem tratamentos — mas são uma decisão para um profissional de saúde, não para uma loja.</p>"
      }
    ],
    faq: [
      ["Porque é que aparecem pelos encravados?", "Porque o pelo cortado muito rente fica com a ponta em bico e, ao crescer, curva e volta a entrar na pele. É mais comum em pelo grosso ou encaracolado e em zonas como o pescoço, a virilha e as axilas."],
      ["Como evitar pelos encravados na virilha?", "Aparar em vez de rapar, com um aparador corporal e pente de 2 ou 3 mm, usar roupa interior que não aperte e esfoliar com suavidade algumas vezes por semana."],
      ["Posso tirar um pelo encravado com uma pinça?", "Não é recomendável escavar a pele com pinça ou agulha nem espremer: aumenta a inflamação e o risco de infeção. Se não passar ou inflamar, fala com um médico."],
      ["Fazer a barba com máquina evita pelos encravados?", "Ajuda, porque não corta tão rente como a lâmina. Deixar um ou dois milímetros com um aparador é ainda mais eficaz para quem tem pelos encravados com frequência."]
    ],
    faqCta: "Preferes que um barbeiro trate da barba? Um bom barbeiro sabe barbear a favor do crescimento — encontra um no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["como-reduzir-irritacao-ao-fazer-a-barba", "aparador-corporal-masculino-qual-escolher", "melhor-maquina-de-barbear-eletrica-qual-escolher"],
    finalCta: {
      h2: "Um ou dois milímetros fazem a diferença",
      text: "Aparar em vez de rapar é a forma mais simples de acabar com os pelos encravados.",
      actions: [["../../produto/philips-bodygroom-bg3480/", "Ver aparador corporal"], ["../../loja/trimmers-e-shavers/", "Ver aparadores"]]
    }
  }
];
