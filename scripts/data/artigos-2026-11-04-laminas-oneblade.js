// 2026-11-04 — revista/laminas-oneblade-qual-comprar-e-quanto-duram/ (artigo novo, a pedido do utilizador).
// Não mexe em qual-oneblade-comprar (regra de 2/11): a procura sobre lâminas ganha artigo próprio, que liga a esse guia.
// Pesquisas do Google PT (4/11): "laminas oneblade" (… 360, pro, intimate, original, philips), "lamina oneblade quanto
// dura" / "quanto tempo dura lamina oneblade" / "lamina one blade dura quanto tempo", "quando trocar lamina oneblade",
// "como saber quando trocar lamina oneblade", "como trocar lamina oneblade", "como limpar lamina oneblade", "recarga
// oneblade" (… original, 360, intimo), "lamina oneblade corpo", "laminas qp2724", "lamina oneblade qp1424 10",
// "lamina oneblade qp2510", "qp430 50 vs qp430 60", "qp420 vs qp430", "onde comprar laminas oneblade", "lamina one blade
// continente / worten / auchan / amazon / kuantokusta".
// Amazon.es (4/11): os packs mais comprados são QP430/60 e QP450/50; vendidos pela Amazon: QP420/60, QP430/60, QP440/50,
// QP450/50, QP225/50, QP229/50, QP624/50. A QP620/50 vinha de vendedor terceiro e está descontinuada: fora da lista.
// Factos da Philips, consultados a 4/11:
//   philips.pt/c-p/QP410_50, QP420_50, QP430_50, QP440_50 (360), QP225_50 (1st Shave), QP229_50 (Intimate SkinProtect),
//   QP624_50 (360 + kit corporal), QP220_50 e QP620_50 ("A Philips deixou de produzir este artigo"), philips.es/c-p/QP430_60;
//   duração: "até 4 meses", "com base em 2 sessões de barbear completas por semana";
//   manual philips.co.uk/c-u/at_book_618014/UserManual_PhilipsOneBlade (símbolo de substituição, troca, lâminas separadas);
//   philips.co.uk/c-e/mens-grooming/shaving/shaving-tips/how-to-clean-the-philips-oneblade.html (limpeza, sem sabão);
//   usa.philips.com/c-f/XC000019637 (troca com e sem patilha).
// Continente Online (4/11): QP430/50, QP410/50 e Intimate QP219. Sem preços, avaliações nem testes.
// As contas de duração por frequência são nossas (~35 sessões por lâmina = 4 meses × 2 por semana) e dizem-no no texto.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const amz = (asin, text) => "<a href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">" + text + "</a>";
// Na tabela os links não têm sublinhado por omissão: sem isto, não parecem links
const amzT = (asin, text) => "<a href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\" style=\"text-decoration:underline;font-weight:700\">" + text + "</a>";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const laminaRow = (nome, codigo, paraQuem, onde) =>
  "<tr><th scope=\"row\">" + nome + "</th><td data-label=\"Código\">" + codigo + "</td><td data-label=\"Para quem\">" + paraQuem + "</td><td data-label=\"Na Amazon.es\">" + onde + "</td></tr>";
const duracaoRow = (freq, uma, tres, cinco) =>
  "<tr><th scope=\"row\">" + freq + "</th><td data-label=\"1 lâmina\">" + uma + "</td><td data-label=\"Pack de 3\">" + tres + "</td><td data-label=\"Pack de 5\">" + cinco + "</td></tr>";

module.exports = [
  {
    slug: "laminas-oneblade-qual-comprar-e-quanto-duram",
    category: "guias-de-compra",
    published: "2026-11-04",
    title: "Lâminas OneBlade: qual comprar, quanto duram e como trocar",
    h1: "Lâminas OneBlade: qual comprar, quanto duram e como trocar",
    description: "Lâminas Philips OneBlade: 360, antifricção ou Intimate? Que pack comprar, quanto dura cada lâmina, como trocar e limpar, e como reconhecer as originais.",
    schemaDescription: "Que lâmina OneBlade comprar (360, 1st Shave, SkinProtect ou kit corporal), quanto dura cada pack, como a trocar e limpar, e como distinguir as originais das compatíveis.",
    image: "imagens/revista/laminas-oneblade-aparador-philips.jpg",
    imageAlt: "Lâmina de um aparador em grande plano, sobre fundo escuro",
    readMinutes: 7,
    criteria: "Factos publicados pela Philips e pela Amazon.es, consultados a 4 de novembro de 2026. As contas de duração por frequência de uso são nossas. Não testamos produtos.",
    lede: "Para a maioria, a escolha é simples: a lâmina OneBlade 360 em pack de 3. Serve em todas as máquinas OneBlade e, pelas contas da Philips, dá para até 12 meses. A antifricção e a SkinProtect só fazem sentido para pele sensível e zonas íntimas.",
    subcopy: "Primeiro a lâmina e o pack certos, depois quanto duram de verdade, como as trocar e limpar, e como distinguir as originais das compatíveis.",
    heroActions: [["#qual-lamina", "Ver que lâmina comprar"], ["#quanto-dura", "Quanto dura cada pack"]],
    quick: [
      ["Que lâmina compro?", "A OneBlade 360 em pack de 3 (QP430), se usas a máquina no rosto. Encaixa em todas as máquinas OneBlade e OneBlade Pro."],
      ["Quanto dura?", "Até 4 meses, segundo a Philips, com 2 sessões completas por semana. A usar todos os dias, pelas nossas contas, são cerca de 5 semanas."],
      ["Quando troco?", "Quando o símbolo de substituição estiver todo visível na lâmina, ou antes, se começar a puxar, a deixar pelos ou a irritar."],
      ["Tenho pele sensível ou é para as zonas íntimas?", "Pele sensível: a 1st Shave antifricção (QP225). Zonas íntimas e axilas: a SkinProtect (QP229)."]
    ],
    summary: [
      "Rosto: lâmina 360, em pack de 3 para a maioria",
      "Pele sensível: 1st Shave antifricção",
      "Zonas íntimas e axilas: SkinProtect",
      "Uma lâmina dura até 4 meses a 2 usos por semana",
      "A Philips recomenda lâminas separadas para o rosto e o corpo",
      "Na limpeza: água, sem sabão e sem toalha na lâmina"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Lâminas OneBlade 360",
      text: "O pack de 3 da nossa seleção, com o que faz bem e as limitações. Se ainda não tens máquina, vê primeiro o guia.",
      actions: [["../../produto/philips-oneblade-laminas-360/", "Ver o pack de 3"], ["../../revista/qual-oneblade-comprar/", "Qual OneBlade comprar"]]
    },
    sections: [
      {
        id: "qual-lamina",
        h2: "Que lâmina OneBlade comprar?",
        html: "<p>Nas páginas da Philips em Portugal encontrámos quatro opções atuais. A diferença está na zona onde a vais usar, não em ser mais ou menos \"premium\". Todas são de aço inoxidável e, segundo a marca, duram o mesmo.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Lâmina</th><th scope=\"col\">Código</th><th scope=\"col\">Para quem</th><th scope=\"col\">Na Amazon.es</th></tr></thead><tbody>" +
          laminaRow("OneBlade 360", "QP410 (1), QP420 (2), QP430 (3), QP440 (4), QP450 (5)", "Rosto: barba curta, contornos e barbear. A lâmina inclina-se em todas as direções para seguir as curvas do rosto.", "Ver pack de " + amzT("B0CHZ43H7B", "2") + " · " + amzT("B0CVXRFT15", "3") + " · " + amzT("B0CVXSK4D3", "4") + " · " + amzT("B0GMHCMVCP", "5")) +
          laminaRow("OneBlade 1st Shave", "QP225 (2)", "Pele sensível e primeiro barbear. Tem uma camada de microesferas de vidro que ajuda a deslizar e a reduzir o ardor.", amzT("B0FB9M1GWY", "Ver pack de 2")) +
          laminaRow("OneBlade Intimate SkinProtect", "QP229 (2)", "Zonas íntimas e axilas. Tem um protetor de pele e não chega tão perto.", amzT("B0DFYNWF5J", "Ver pack de 2")) +
          laminaRow("OneBlade 360 com kit corporal", "QP624 (2 + kit)", "Quem usa a máquina também no corpo. Traz 2 lâminas 360 e 1 kit corporal.", amzT("B0D1YNBT6L", "Ver pack de 2 + kit")) +
          "</tbody></table></div>" +
          "<p><strong>Se só comprares uma, compra o " + p("philips-oneblade-laminas-360", "pack de 3 lâminas 360") + ".</strong> Dá para um ano à conta da Philips, serve em qualquer máquina OneBlade e evita voltares à compra daqui a poucos meses. O pack de 2 faz sentido para experimentar ou se usas pouco; os de 4 e 5 só para quem faz a barba quase todos os dias. Compara sempre o preço por lâmina: um pack maior nem sempre sai mais barato.</p>" +
          cta("B0CVXRFT15", "philips-oneblade-laminas-360") +
          "<p>Cuidado com a palavra \"original\". Nos títulos da Amazon.es quer dizer \"da Philips\", como em \"OneBlade Original 360\". Mas a Philips também chama Original à lâmina sem 360, e a página portuguesa diz que já não produz a QP220/50 nem a QP620/50. Ainda aparecem à venda, sobretudo por vendedores terceiros. Se estás a comprar hoje, fica-te pela 360.</p>"
      },
      {
        id: "codigos",
        h2: "Os códigos QP: que lâminas servem na tua máquina?",
        html: "<p>É aqui que muita gente se perde, porque a máquina e a lâmina têm códigos parecidos. A regra é simples:</p><ul class=\"rich-list\">" +
          "<li><strong>QP com 3 algarismos é a lâmina</strong>: QP430, QP225, QP624.</li>" +
          "<li><strong>QP com 4 algarismos é a máquina</strong>: QP2724, QP2510, QP1424, QP6551.</li></ul>" +
          "<p>Por isso, quem procura \"lâminas QP2724\" ou \"lâminas QP1424\" está à procura de uma lâmina que encaixe nessa máquina, e não há uma lâmina com esse código. A Philips indica que as lâminas servem nas máquinas <strong>OneBlade (QP14xx, QP25xx, QP26xx, QP27xx e QP28xx) e OneBlade Pro (QP65xx e QP66xx)</strong>. Se não souberes o código da tua máquina, procura-o na caixa ou no manual.</p>" +
          "<p>E o número depois da barra? Nas páginas da Philips, a QP430/50 da loja portuguesa e a QP430/60 da loja espanhola são descritas da mesma forma: a mesma lâmina 360. Não encontrámos nenhuma diferença publicada entre as duas, por isso o que conta é o QP430, não o /50 ou /60.</p>"
      },
      {
        id: "quanto-dura",
        h2: "Quanto tempo dura uma lâmina OneBlade?",
        html: "<p><strong>Até 4 meses, segundo a Philips</strong>, mas o número vem com uma condição que passa despercebida: \"com base em 2 sessões de barbear completas por semana\". A própria marca acrescenta que depende do uso e da espessura do pelo. Dá cerca de 35 sessões por lâmina.</p>" +
          "<p>Se usas mais vezes, a lâmina dura menos. Fizemos as contas com essas 35 sessões:</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Quantas vezes por semana</th><th scope=\"col\">1 lâmina</th><th scope=\"col\">Pack de 3</th><th scope=\"col\">Pack de 5</th></tr></thead><tbody>" +
          duracaoRow("2 vezes (a conta da Philips)", "4 meses", "12 meses", "20 meses") +
          duracaoRow("3 vezes", "2,5 meses", "8 meses", "13 meses") +
          duracaoRow("4 vezes", "2 meses", "6 meses", "10 meses") +
          duracaoRow("Todos os dias", "5 semanas", "3,5 meses", "6 meses") +
          "</tbody></table></div>" +
          "<p>Estas contas são nossas, não da Philips, e assumem que a lâmina se gasta sempre ao mesmo ritmo. Servem para escolher o pack, não como data de validade. Quem manda é o estado da lâmina.</p>"
      },
      {
        id: "quando-trocar",
        h2: "Como saber quando trocar a lâmina",
        html: "<p>A lâmina tem um indicador de desgaste. <strong>Com o uso, vai aparecendo um símbolo (uma seta, a que a Philips chama ícone de ejeção); quando está todo visível, é altura de trocar.</strong> Os pentes e a guarda de pele podem tapá-lo, por isso tira-os para veres. Em lâminas mais antigas, a Philips fala antes de uma mancha verde que se forma ao centro. Os modelos com app também podem avisar.</p>" +
          "<p>Não precisas de esperar pelo símbolo se a lâmina der sinais antes:</p><ul class=\"rich-list\">" +
          "<li>Começa a puxar em vez de cortar.</li>" +
          "<li>Deixa pelos para trás e obriga a passar mais vezes.</li>" +
          "<li>Irrita uma pele que antes não irritava.</li>" +
          "<li>Tem algum dano visível. Neste caso, a Philips manda trocar logo.</li></ul>" +
          "<p>E mesmo que a uses pouco, o manual recomenda trocar a lâmina pelo menos de 4 em 4 meses.</p>"
      },
      {
        id: "como-trocar",
        h2: "Como trocar a lâmina do OneBlade",
        html: "<p>Demora segundos, mas depende de a tua máquina ter ou não uma patilha para soltar a lâmina. A lâmina tem as pontas afiadas: segura-a sempre pelos lados.</p><ol class=\"rich-list\">" +
          "<li><strong>Desliga a máquina</strong> e tira o pente ou a guarda, se estiverem postos.</li>" +
          "<li><strong>Solta a lâmina usada.</strong> Com patilha: empurra-a para cima e levanta a lâmina pelos lados curtos. Sem patilha: pressiona os dois lados da lâmina e levanta-a.</li>" +
          "<li><strong>Tira a lâmina nova da embalagem</strong> com cuidado, sem usar objetos afiados.</li>" +
          "<li><strong>Encaixa-a na máquina</strong> e pressiona até ouvires um clique. Se não houver clique, não está bem presa.</li></ol>" +
          "<p>A lâmina usada vai para o lixo comum, segundo o manual da Philips.</p>"
      },
      {
        id: "como-limpar",
        h2: "Como limpar a lâmina sem a estragar",
        html: "<p>A Philips recomenda limpar depois de cada uso. Leva menos de um minuto e é o que mais ajuda a manter o corte:</p><ol class=\"rich-list\">" +
          "<li><strong>Sopra os pelos</strong> da lâmina e dos pentes. Não batas com a máquina no lavatório nem uses pinças.</li>" +
          "<li><strong>Liga a máquina e passa-a por água fria ou morna</strong>, até sair toda a espuma ou gel. Com a máquina desligada da corrente.</li>" +
          "<li><strong>Desliga-a e deixa secar ao ar</strong>, com os acessórios à parte. O corpo podes secar com uma toalha; a lâmina não.</li></ol>" +
          "<p><strong>Três coisas a evitar:</strong> sabão, porque a Philips diz que pode gastar o revestimento antifricção; toalhas ou papel na lâmina; e guardar ou pôr a carregar a máquina ainda molhada.</p>"
      },
      {
        id: "originais",
        h2: "Lâminas originais ou compatíveis?",
        html: "<p>Na Amazon.es, ao lado das da Philips, aparecem lâminas de outras marcas \"compatíveis\" com o OneBlade, normalmente mais baratas. <strong>Não as testámos, por isso não as recomendamos nem dizemos que são más.</strong> Mas há duas coisas a saber: os 4 meses e a proteção da pele que a Philips publica dizem respeito às lâminas dela, e o manual da marca manda usar só consumíveis originais.</p>" +
          "<p>Para saberes o que estás a comprar:</p><ul class=\"rich-list\">" +
          "<li><strong>Lê o título todo.</strong> \"Compatible con\", \"apto para\" ou \"para OneBlade\" sem a marca Philips à frente costumam querer dizer que não é da Philips.</li>" +
          "<li><strong>Procura o código.</strong> As da Philips têm QP e três algarismos, como QP430, no título e na embalagem.</li>" +
          "<li><strong>Vê quem vende.</strong> A 4 de novembro de 2026, os packs da tabela acima eram vendidos pela própria Amazon. Confirma à data da compra, porque muda.</li>" +
          "<li><strong>Desconfia dos kits com muitas peças.</strong> Lâminas com pentes e estojos juntos a preço baixo são, em regra, de outras marcas.</li></ul>"
      },
      {
        id: "corpo",
        h2: "Lâmina para o corpo e para as zonas íntimas",
        html: "<p>A máquina serve para o corpo, mas <strong>a Philips recomenda lâminas separadas para o rosto e para o corpo, por higiene.</strong> Quem usa nas duas zonas precisa de duas lâminas em uso, e convém contar com isso ao escolher o pack. O " + amz("B0D1YNBT6L", "QP624 com kit corporal") + " é o caminho mais direto.</p>" +
          "<p>Segundo o manual, o peito, a barriga e as pernas podem ser feitos com a lâmina sem acessórios; nas zonas sensíveis, como as axilas e as virilhas, deve usar-se a guarda de pele. Para as zonas íntimas, a " + amz("B0DFYNWF5J", "SkinProtect QP229") + " foi feita de propósito, com um protetor que a marca diz adaptar-se às curvas sem chegar tão perto.</p>" +
          "<p>Se o que procuras é sobretudo para o corpo, uma máquina própria pode compensar mais do que estar a trocar de lâmina. Vê " + r("aparador-corporal-masculino-qual-escolher", "aparador corporal masculino: qual escolher") + ".</p>"
      },
      {
        id: "onde-comprar",
        h2: "Onde comprar lâminas OneBlade em Portugal",
        html: "<p>A 4 de novembro de 2026 encontrámo-las em três sítios:</p><ul class=\"rich-list\">" +
          "<li><strong>Amazon.es</strong> — a maior escolha de packs, incluindo os de 4 e 5. Tens os links na tabela acima.</li>" +
          "<li><strong>Loja online da Philips</strong> — tem a 360, a 1st Shave, a SkinProtect e o kit corporal, com página portuguesa.</li>" +
          "<li><strong>Continente Online</strong> — menos opções: QP410/50 e QP430/50, e a Intimate QP219.</li></ul>" +
          "<p>Os preços e o stock mudam com frequência, por isso não os pomos aqui. Compara o preço por lâmina, não o preço do pack, e conta com os portes. Sim, os links da Amazon são de afiliado, e é por isso que vale a pena dizer que não são a única opção.</p>" +
          "<p>Ainda não tens máquina, ou queres mudar? Vê " + r("qual-oneblade-comprar", "qual OneBlade comprar") + ". E se estás indeciso entre o OneBlade e outro tipo de máquina, a diferença está em " + r("trimmer-vs-shaver-diferencas-reais", "trimmer vs shaver") + ".</p>"
      }
    ],
    faq: [
      ["Quanto tempo dura uma lâmina OneBlade?", "Até 4 meses, segundo a Philips, com 2 sessões de barbear completas por semana. Se usares mais vezes ou tiveres pelo mais espesso, dura menos. A usar todos os dias, pelas nossas contas, são cerca de 5 semanas."],
      ["Como sei quando trocar a lâmina do OneBlade?", "Com o uso, vai aparecendo um símbolo na lâmina; quando estiver todo visível, troca-a. Também é altura de trocar se começar a puxar, a deixar pelos ou a irritar, ou se tiver algum dano."],
      ["As lâminas servem em todos os OneBlade?", "A Philips indica que servem nas máquinas OneBlade (QP14xx, QP25xx, QP26xx, QP27xx e QP28xx) e OneBlade Pro (QP65xx e QP66xx). Confirma o código da tua máquina na caixa ou no manual."],
      ["Que lâminas servem na QP2724?", "QP2724 é o código da máquina, não da lâmina. Serve-lhe a lâmina OneBlade 360, como a QP420 (2 lâminas) ou a QP430 (3 lâminas)."],
      ["Qual é a diferença entre a lâmina 360 e a normal?", "A lâmina 360 inclina-se em todas as direções para seguir as curvas do rosto. A Philips já não produz algumas das lâminas sem 360, como a QP220/50, por isso, se estás a comprar hoje, a 360 é o caminho mais simples."],
      ["As lâminas compatíveis valem a pena?", "Não as testámos, por isso não as recomendamos nem dizemos que são más. A duração de 4 meses e a proteção da pele publicadas pela Philips dizem respeito às lâminas dela, e o manual da marca manda usar só consumíveis originais."],
      ["Posso usar a mesma lâmina no rosto e no corpo?", "A Philips recomenda lâminas separadas para o rosto e para o corpo, por higiene. Quem usa nas duas zonas pode optar pelo QP624, com 2 lâminas 360 e 1 kit corporal."],
      ["Como se limpa a lâmina do OneBlade?", "Sopra os pelos, liga a máquina e passa-a por água fria ou morna, desliga-a e deixa secar ao ar. Não uses sabão, que pode gastar o revestimento antifricção, nem toalhas ou papel na lâmina."],
      ["Onde comprar lâminas OneBlade em Portugal?", "A 4 de novembro de 2026 encontrámo-las na Amazon.es, na loja online da Philips e no Continente Online. A Amazon.es tinha a maior escolha de packs."]
    ],
    faqCta: "Vê o <a href=\"../../produto/philips-oneblade-laminas-360/\">pack de 3 lâminas 360</a> ou o guia <a href=\"../../revista/qual-oneblade-comprar/\">qual OneBlade comprar</a>.",
    related: ["qual-oneblade-comprar", "trimmer-vs-shaver-diferencas-reais", "melhor-aparador-de-barba"],
    finalCta: {
      h2: "A lâmina certa, sem complicar",
      text: "Para o rosto, a 360 em pack de 3 resolve a maioria dos casos. Troca-a quando o símbolo estiver completo ou quando começar a puxar, e limpa-a só com água.",
      actions: [["../../produto/philips-oneblade-laminas-360/", "Ver o pack de 3"], ["../../revista/qual-oneblade-comprar/", "Qual OneBlade comprar"]]
    }
  }
];
