// 2026-11-17 — revista/como-aparar-pelos-intimos-masculinos/ (artigo novo, a pedido do utilizador).
// Não mexe em aparador-corporal-masculino-qual-escolher (regra de 2/11; pos. 5,7 e cliques): a procura sobre a zona
// íntima ganha artigo próprio, que liga a esse guia e a pelos-encravados-como-evitar.
// Dados que justificam o artigo (17/11): Search Console 90 dias — "melhor aparador de pelos íntimos masculino" 36 impr.
// pos. 17,7; "aparador corporal masculino" 50 impr.; "melhor aparador corporal masculino" 8 cliques/89 impr.
// Pesquisas do Google PT (17/11): "aparador (de) pelos íntimos masculino" (… que não machuca, à prova d'água, philips,
// philips oneblade, gillette), "melhor aparador de pelos íntimos masculino", "como aparar os pelos íntimos masculinos",
// "depilação íntima masculina como fazer" (… em casa, com lâmina, cera, laser), "depilar testículos" (máquina, cera,
// creme, laser), "oneblade intimate" (vale a pena, review, lâmina, qp1924), "pelos encravados virilha" (como tratar,
// o que fazer, pomada). Ignorados: Shopee, Neres, Kemei, "custo benefício" (Brasil).
// Factos dos fabricantes: ficha da Philips OneBlade Intimate QP1924/30 na Amazon.es (17/11); Philips Body Groomer
// BG3480 e OneBlade 360 pelo catálogo da loja (commerce-products-b.js) e pelo manual citado em laminas-oneblade.
// Sem preços, avaliações nem "testámos". Conselhos de pele gerais; o que for lesão ou dor remete para o médico.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const metodoRow = (metodo, dura, emCasa, notas) =>
  "<tr><th scope=\"row\">" + metodo + "</th><td data-label=\"Quanto dura\">" + dura + "</td><td data-label=\"Em casa?\">" + emCasa + "</td><td data-label=\"A ter em conta\">" + notas + "</td></tr>";
const maqRow = (nome, paraQuem, comprimento, notas) =>
  "<tr><th scope=\"row\">" + nome + "</th><td data-label=\"Para quem\">" + paraQuem + "</td><td data-label=\"Comprimentos\">" + comprimento + "</td><td data-label=\"A ter em conta\">" + notas + "</td></tr>";

module.exports = [
  {
    slug: "como-aparar-pelos-intimos-masculinos",
    category: "guias-de-compra",
    published: "2026-11-17",
    title: "Como aparar os pelos íntimos masculinos sem cortes nem irritação",
    h1: "Como aparar os pelos íntimos masculinos sem cortes nem irritação",
    description: "Aparar, rapar, creme, cera ou laser? Que aparador de pelos íntimos escolher, como aparar passo a passo e como evitar irritação e pelos encravados.",
    schemaDescription: "Como aparar e rapar os pelos íntimos masculinos em casa: que método escolher, que aparador não magoa, o passo a passo, e como evitar irritação e pelos encravados.",
    image: "imagens/revista/aparar-pelos-intimos-masculinos.jpg",
    imageAlt: "Duas toalhas de banho dobradas, uma vermelha e outra azul, sobre uma mesa branca",
    readMinutes: 7,
    criteria: "Características dos produtos conforme publicadas pela Philips na Amazon.es, consultadas a 17 de novembro de 2026. Conselhos gerais de cuidado da pele; dor, feridas ou irritação que não passa são para o médico. Não testamos produtos.",
    lede: "Para a maioria dos homens, a resposta é aparar, não rapar: um aparador corporal com pente curto, pele esticada e passagens lentas. É rápido, não corta e quase não dá pelos encravados. Rapar rente fica para quem quer mesmo a pele lisa e aceita mais cuidados.",
    subcopy: "Primeiro o método, depois a máquina certa, o passo a passo e o que fazer para a pele não reagir. Sem rodeios e sem promessas.",
    heroActions: [["#metodo", "Aparar, rapar ou depilar?"], ["#que-aparador", "Que aparador escolher"]],
    quick: [
      ["Aparar ou rapar?", "Aparar, para a maioria. Deixa 2 a 3 mm, não corta a pele e é o que menos irrita. Rapar rente pede mais cuidado e dá mais pelos encravados."],
      ["Que máquina uso?", "Um aparador corporal, separado do rosto. A máquina do cabelo e a lâmina da barba não foram feitas para pele tão fina."],
      ["Qual escolhemos?", "O Philips Body Groomer BG3480 para o corpo todo, ou o OneBlade Intimate se é sobretudo para a zona íntima e as axilas."],
      ["E se a pele reagir?", "Irritação ligeira passa em poucos dias. Borbulhas que inflamam, dor ou feridas são para o médico."]
    ],
    summary: [
      "Aparar com pente é o mais seguro e o que menos irrita",
      "Usa uma máquina só para o corpo, não a do rosto nem a do cabelo",
      "Pele sempre esticada e passagens lentas, sem pressionar",
      "Na pele mais fina, deixa o pente posto",
      "Rapar rente: a favor do pelo e com espuma, nunca a seco",
      "Depois: água fria e hidratante sem perfume"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "OneBlade Intimate",
      text: "A versão do OneBlade que a Philips fez para a zona íntima, com lâmina de pontas arredondadas. Vê o que faz bem e as limitações.",
      actions: [["../../produto/philips-oneblade-intimate-qp1924/", "Ver o OneBlade Intimate"], ["../../revista/aparador-corporal-masculino-qual-escolher/", "Aparadores para o corpo"]]
    },
    sections: [
      {
        id: "metodo",
        h2: "Aparar, rapar, creme, cera ou laser: o que escolher",
        html: "<p>Antes da máquina, decide o resultado que queres. A maior parte das dúvidas sobre depilação íntima masculina resolve-se aqui: quanto mais rente, mais cuidado e mais hipóteses de a pele reagir.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Método</th><th scope=\"col\">Quanto dura</th><th scope=\"col\">Em casa?</th><th scope=\"col\">A ter em conta</th></tr></thead><tbody>" +
          metodoRow("Aparar com pente", "Alguns dias a 1 semana", "Sim", "O mais seguro: a lâmina não toca na pele. Fica um pelo curto, não pele lisa.") +
          metodoRow("Rapar com máquina", "1 a 3 dias", "Sim", "Quase liso, com menos cortes do que a lâmina. Pode irritar se passares muitas vezes no mesmo sítio.") +
          metodoRow("Rapar com lâmina", "1 a 2 dias", "Sim, com cuidado", "O mais rente, e também o que dá mais cortes, irritação e pelos encravados.") +
          metodoRow("Creme depilatório", "Alguns dias", "Sim, com cuidado", "Lê sempre as instruções: nem todos servem para a zona íntima, e muitos não servem para a pele dos genitais. Testa numa zona pequena.") +
          metodoRow("Cera", "3 a 4 semanas", "Melhor num profissional", "Dói, sobretudo nas primeiras vezes, e feita em casa nesta zona é fácil correr mal.") +
          metodoRow("Laser", "Redução duradoura", "Não, em clínica", "Várias sessões e o maior investimento. Conversa antes com a clínica sobre o teu tipo de pele e de pelo.") +
          "</tbody></table></div>" +
          "<p><strong>A nossa sugestão: começa por aparar.</strong> Se ao fim de umas semanas quiseres mais rente, passa a rapar com máquina só nas zonas de pele firme. A lâmina, a cera e o laser ficam para quem já sabe que quer pele lisa.</p>"
      },
      {
        id: "que-aparador",
        h2: "Que aparador de pelos íntimos escolher",
        html: "<p>Quem procura um aparador para a zona íntima pede quase sempre a mesma coisa: que não magoe, que se possa usar no duche e que seja de uma marca conhecida. Na prática, isso traduz-se em quatro pontos:</p><ul class=\"rich-list\">" +
          "<li><strong>Proteção da pele:</strong> pontas arredondadas e um protetor entre a lâmina e a pele. É isto que faz um aparador \"não magoar\", mais do que a potência.</li>" +
          "<li><strong>Pente curto:</strong> 2 ou 3 mm chegam. Pentes de 10 ou 20 mm são para a barba, não para aqui.</li>" +
          "<li><strong>À prova de água:</strong> para usar no duche e lavar debaixo da torneira.</li>" +
          "<li><strong>Só para o corpo:</strong> por higiene, a máquina da zona íntima não deve ser a do rosto. A própria Philips recomenda lâminas separadas para o rosto e o corpo no OneBlade.</li></ul>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Máquina</th><th scope=\"col\">Para quem</th><th scope=\"col\">Comprimentos</th><th scope=\"col\">A ter em conta</th></tr></thead><tbody>" +
          maqRow(p("philips-bodygroom-bg3480", "Philips Body Groomer BG3480"), "Corpo todo: peito, axilas, zona íntima e pernas", "Pentes de 2 e 3 mm, ou rapar sem pente", "Até 80 minutos de bateria. Carrega por USB-A, sem adaptador.") +
          maqRow(p("philips-oneblade-intimate-qp1924", "Philips OneBlade Intimate QP1924"), "Sobretudo zona íntima e axilas", "Pente de 3 mm, ou rapar sem pente", "Lâmina SkinProtect de pontas arredondadas. Só um pente; 30 minutos de bateria.") +
          maqRow(p("philips-oneblade-360-qp2724", "Philips OneBlade 360"), "Quem já tem um e quer usá-lo também no corpo", "Pentes do rosto", "Usa uma lâmina só para o corpo e, nas zonas sensíveis, a guarda de pele, segundo o manual.") +
          "</tbody></table></div>" +
          "<p><strong>Se vais tratar do corpo todo, escolhe o " + p("philips-bodygroom-bg3480", "Body Groomer BG3480") + ".</strong> Foi pensado para o corpo, tem dois pentes curtos e a bateria dá para várias sessões. É a mesma escolha do nosso " + r("aparador-corporal-masculino-qual-escolher", "guia de aparadores corporais") + ".</p>" +
          cta("B0FJM3MZ9T", "philips-bodygroom-bg3480") +
          "<p><strong>Se é sobretudo para a zona íntima, o " + p("philips-oneblade-intimate-qp1924", "OneBlade Intimate") + " é a opção mais específica.</strong> Segundo a Philips, a lâmina SkinProtect tem bordas e pontas arredondadas para as zonas sensíveis, corta nos dois sentidos para chegar às zonas difíceis e é 100% à prova de água (IPX7). Traz 2 lâminas, que a marca diz durarem até 4 meses cada. As limitações: só tem um pente, de 3 mm, e na Amazon.es é vendido por um vendedor externo, não pela própria Amazon.</p>" +
          cta("B0DFYN8174", "philips-oneblade-intimate-qp1924") +
          "<p>Vale a pena o Intimate se já tens um OneBlade? Em parte. A Philips vende a lâmina SkinProtect em separado (QP229) e ela encaixa nos OneBlade normais; explicamos tudo em " + r("laminas-oneblade-qual-comprar-e-quanto-duram", "lâminas OneBlade: qual comprar") + ". O Intimate faz sentido para quem quer uma máquina só para esta zona, sem andar a trocar lâminas.</p>"
      },
      {
        id: "passo-a-passo",
        h2: "Como aparar os pelos íntimos, passo a passo",
        html: "<p>Reserva dez minutos sem pressa. A pressa, mais do que a máquina, é o que provoca cortes.</p><ol class=\"rich-list\">" +
          "<li><strong>Começa com a pele seca e o pelo seco</strong>, ou no duche se a máquina for à prova de água. Nunca com creme ou espuma se fores aparar com pente: o pente prende.</li>" +
          "<li><strong>Se o pelo está muito comprido, corta primeiro com uma tesoura</strong> de pontas redondas, longe da pele. A máquina trabalha melhor e não puxa.</li>" +
          "<li><strong>Encaixa o pente de 3 mm.</strong> Na primeira vez, usa o mais comprido que tiveres: depois podes descer, voltar atrás não dá.</li>" +
          "<li><strong>Estica a pele com a mão livre</strong> em cada passagem. É a regra mais importante nesta zona, onde a pele tem pregas e é fina.</li>" +
          "<li><strong>Passagens curtas e lentas, sem pressionar.</strong> Começa pela zona púbica, onde a pele é mais firme, e depois as virilhas.</li>" +
          "<li><strong>No escroto, deixa sempre o pente posto</strong> e vai muito devagar, com a pele bem esticada. Se não te sentires seguro, aparar mais comprido é perfeitamente aceitável.</li>" +
          "<li><strong>No fim, passa por água fria</strong> e seca com uma toalha limpa, sem esfregar.</li></ol>" +
          "<p>Com que frequência? Para manter curto, uma vez por semana ou de duas em duas semanas chega. Aparar todos os dias não traz vantagem e cansa a pele.</p>"
      },
      {
        id: "rapar",
        h2: "Se queres rapar rente: com máquina ou com lâmina",
        html: "<p>Rapar dá a pele lisa, mas pede mais cuidado. Faz sempre depois de aparar: a lâmina num pelo comprido puxa e corta.</p><ul class=\"rich-list\">" +
          "<li><strong>Com máquina (sem pente):</strong> é o caminho mais seguro para ir rente. No Body Groomer usa a cabeça de barbear; no OneBlade, a lâmina sem pente, e nas zonas sensíveis a guarda de pele. Passa poucas vezes no mesmo sítio.</li>" +
          "<li><strong>Com lâmina:</strong> só com a pele molhada e com espuma ou gel, nunca a seco. Lâmina nova, a favor do crescimento do pelo e sem voltar a passar várias vezes. Evita o escroto com lâmina: é onde acontecem quase todos os cortes.</li>" +
          "<li><strong>Depois:</strong> água fria e um hidratante sem perfume nem álcool. Nada de after-shave com álcool nesta zona.</li></ul>" +
          "<p>Se a pele fica sempre vermelha ou com borbulhas depois de rapar, o mais provável é que rapar não seja para ti. Voltar a aparar com pente resolve a maioria dos casos.</p>"
      },
      {
        id: "depois",
        h2: "Irritação e pelos encravados na virilha",
        html: "<p>Alguma vermelhidão no primeiro dia é normal, sobretudo nas primeiras vezes. Pelos encravados são outra história: aparecem quando o pelo cortado muito rente volta a crescer para dentro da pele, e a virilha é das zonas onde isso acontece mais.</p><ul class=\"rich-list\">" +
          "<li><strong>Para prevenir:</strong> aparar em vez de rapar, roupa interior que não aperte nos dias a seguir, e pele limpa e hidratada.</li>" +
          "<li><strong>Se já aparecerem:</strong> não espremas nem tires com pinças. Deixa a zona em paz uns dias e não voltes a rapar até passar.</li>" +
          "<li><strong>Vai ao médico</strong> se tiveres dor, inchaço, pus, febre, feridas que não saram ou se aparecer algo que não tinhas antes. Não é uma questão de estética.</li></ul>" +
          "<p>Explicamos tudo, com mais detalhe, em " + r("pelos-encravados-como-evitar", "pelos encravados: porque aparecem e como evitar") + ".</p>"
      },
      {
        id: "erros",
        h2: "Os erros mais comuns",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Usar a máquina do cabelo.</strong> As lâminas são agressivas e os pentes são compridos: não foi feita para esta pele.</li>" +
          "<li><strong>Usar a mesma máquina do rosto.</strong> Por higiene, o corpo tem a sua máquina, ou pelo menos a sua lâmina.</li>" +
          "<li><strong>Tirar o pente cedo demais.</strong> Apara tudo primeiro; só depois, e só onde a pele é firme, vai mais rente.</li>" +
          "<li><strong>Não esticar a pele.</strong> É aqui que a pele fica presa e acontecem os cortes.</li>" +
          "<li><strong>Rapar a seco com lâmina.</strong> Irritação garantida.</li>" +
          "<li><strong>Lâmina gasta.</strong> Começa a puxar em vez de cortar e irrita mais. Troca-a quando deixar de cortar como no início.</li>" +
          "<li><strong>Fazer à pressa antes de sair.</strong> Se a pele reagir, não há tempo para acalmar.</li></ul>"
      }
    ],
    faq: [
      ["Como aparar os pelos íntimos masculinos?", "Com um aparador corporal e o pente de 3 mm, a pele seca e esticada com a mão livre, em passagens curtas e lentas, sem pressionar. No escroto, deixa sempre o pente posto. No fim, água fria e uma toalha limpa."],
      ["Qual é o melhor aparador de pelos íntimos masculino?", "Para o corpo todo, escolhemos o Philips Body Groomer BG3480. Se é sobretudo para a zona íntima e as axilas, o Philips OneBlade Intimate QP1924 tem uma lâmina de pontas arredondadas feita para isso. As duas escolhas são pelas características publicadas pela Philips; não testamos produtos."],
      ["Que aparador não magoa?", "O que mais conta é a proteção da pele: pontas arredondadas e um protetor entre a lâmina e a pele, como no Body Groomer e no OneBlade Intimate. Mesmo assim, pele esticada, pente posto e passagens lentas fazem mais diferença do que a máquina."],
      ["Posso usar a máquina de cortar o cabelo na zona íntima?", "Não é boa ideia. As lâminas são mais agressivas e os pentes mais compridos do que esta zona precisa, e a pele fina prende com facilidade. Um aparador corporal é mais seguro."],
      ["É melhor aparar ou rapar?", "Para a maioria, aparar. Não corta a pele, irrita menos e dá menos pelos encravados. Rapar rente fica para quem quer a pele lisa e aceita mais cuidados."],
      ["O OneBlade Intimate vale a pena?", "Para quem quer uma máquina só para a zona íntima e as axilas, sim: a lâmina SkinProtect foi feita para isso, segundo a Philips. Se já tens um OneBlade, podes comprar só a lâmina SkinProtect (QP229). As limitações: só um pente, de 3 mm, e na Amazon.es é vendido por um vendedor externo."],
      ["Posso aparar os pelos íntimos no duche?", "Sim, se a máquina for à prova de água, como o Body Groomer BG3480 e o OneBlade Intimate. Ainda assim, para o OneBlade Intimate, a Philips diz que os melhores resultados são a seco."],
      ["Com que frequência devo aparar?", "Para manter curto, uma vez por semana ou de duas em duas semanas chega. Rapar rente pede mais vezes, e cansa mais a pele."],
      ["Como evitar pelos encravados na virilha?", "Aparar em vez de rapar, não usar roupa interior apertada nos dias a seguir e manter a pele limpa e hidratada. Se aparecerem, não os espremas. Dor, pus ou inchaço são para o médico."]
    ],
    faqCta: "Vê o <a href=\"../../produto/philips-oneblade-intimate-qp1924/\">OneBlade Intimate</a>, o <a href=\"../../produto/philips-bodygroom-bg3480/\">Body Groomer BG3480</a> ou o guia de <a href=\"../../revista/aparador-corporal-masculino-qual-escolher/\">aparadores corporais</a>.",
    related: ["aparador-corporal-masculino-qual-escolher", "pelos-encravados-como-evitar", "laminas-oneblade-qual-comprar-e-quanto-duram"],
    finalCta: {
      h2: "Pente posto, pele esticada, sem pressa",
      text: "Aparar com um aparador corporal resolve a maioria dos casos. Rapar rente é uma escolha, não uma obrigação, e a pele agradece se fores devagar.",
      actions: [["../../produto/philips-oneblade-intimate-qp1924/", "Ver o OneBlade Intimate"], ["../../revista/aparador-corporal-masculino-qual-escolher/", "Aparadores para o corpo"]]
    }
  }
];
