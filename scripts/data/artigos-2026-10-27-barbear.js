// 2026-10-27 — revista/melhor-maquina-de-barbear-eletrica-qual-escolher/ reescrito (antes em
// artigos-2026-10-10-barbear.js, que já não deve ser corrido para este artigo).
// Porquê: no Search Console (90 dias) a página tinha ~33 impressões e 0 cliques; a pesquisa principal é
// "qual a melhor máquina de barbear elétrica" (pos. 7,4) e o título respondia a "rotativa ou lâminas".
// Nas pesquisas "melhor(es) máquina(s) de barbear" a Google hesitava entre esta página e o guia das máquinas
// de cortar (pos. 17–41, 0 cliques). Este artigo não vai atrás de "máquina de cortar cabelo e barba" (é do
// guia das máquinas).
// Pesquisas do Google PT (349 sugestões, 27/10): qual a melhor máquina de barbear (elétrica, do mercado, para
// homem, custo benefício, profissional, 2026, deco), braun ou philips, melhor marca, linear ou rotativa,
// rotativa, lâminas, a seco e húmida, à prova de água, pele sensível, que não irrita, foliculite, que não
// belisca, para idosos, para adolescentes, para jovens, ou gillette, ou lâmina, ou aparador, Braun Series 3
// (300s, ProSkin) / 5 / 7 / 9, Philips 3000 / 5000 / 7000 / 9000, cabeças e lâminas de substituição, como usar,
// pode ir no avião / mala de mão. Ignoradas marcas e lojas do Brasil (Mondial, Dragão, Philco, Kemei, R$).
// Amazon.es (27/10, comprados no mês passado): Philips X3000 800+, Philips Série 5000 700+, Braun Series 3
// 300S 400+ (sem vendedor principal: só terceiros) → entrou a 310S B0F9X78DHC (100+, vendida e enviada pela
// Amazon, mesma máquina, 100% à prova de água), Philips Série 7000 300+, Braun Series 5 51-B1000s 200+.
// Factos dos produtos das páginas produto/{slug}/ (fichas da Amazon.es); sem preços, avaliações ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const row = (slug, name, tipo, laminas, agua, extra) =>
  "<tr><th scope=\"row\">" + p(slug, name) + "</th><td data-label=\"Tipo\">" + tipo + "</td><td data-label=\"Cabeça\">" + laminas + "</td><td data-label=\"Água\">" + agua + "</td><td data-label=\"A saber\">" + extra + "</td></tr>";
const CRIT = "Características conforme publicadas pelos fabricantes na Amazon.es. Não testamos produtos; explicamos o método em «como escolhemos».";

module.exports = [
  {
    slug: "melhor-maquina-de-barbear-eletrica-qual-escolher",
    category: "guias-de-compra",
    published: "2026-10-10",
    title: "Qual a melhor máquina de barbear elétrica? Philips ou Braun",
    h1: "Qual a melhor máquina de barbear elétrica: rotativa ou de lâminas?",
    description: "Qual a melhor máquina de barbear elétrica? Philips ou Braun, rotativa ou lâminas, pele sensível, idosos e primeira máquina: a nossa escolha para cada caso.",
    schemaDescription: "Como escolher uma máquina de barbear elétrica: rotativa (Philips) ou de lâminas (Braun), pele sensível, primeira máquina, idosos e quando faz sentido um OneBlade.",
    image: "imagens/revista/barbear-espelho-casa-de-banho.jpg",
    imageAlt: "Homem a fazer a barba em frente a um espelho redondo na casa de banho",
    readMinutes: 8,
    criteria: CRIT,
    lede: "Para a maioria das pessoas, a melhor máquina de barbear elétrica é uma rotativa com cabeças flexíveis, como a Philips Série 5000. Se barbeias em movimentos retos e tens barba densa, uma de lâminas, como a Braun Series 5. O resto é afinar pelo orçamento e pela pele.",
    subcopy: "Primeiro a resposta rápida, depois Philips ou Braun, as máquinas que escolhemos e, mais abaixo, pele sensível, para quem é cada uma e o que ver depois de comprar.",
    heroActions: [["#produtos-recomendados", "Ver as máquinas"], ["#philips-ou-braun", "Philips ou Braun"]],
    quick: [
      ["Queres uma máquina para quase tudo?", "A Philips Série 5000 S5465/18: rotativa, 27 lâminas autoafiáveis, cabeças flexíveis a 360°, aparador de encaixar e 100% à prova de água."],
      ["Barbeias a direito e tens barba densa?", "Uma de lâminas da Braun: a Series 5 51-B1000s, com AutoSense, que ajusta a potência à barba, ou a Series 3 310S para gastar menos."],
      ["É a tua primeira máquina, ou é para um adolescente?", "A Philips Série X3000 X3053/00: rotativa de entrada com SkinProtect, a seco ou no duche."],
      ["Andas sempre com barba de poucos dias?", "O Philips OneBlade 360: apara, faz contornos e rapa, sem deixar a pele tão lisa como uma máquina de barbear."]
    ],
    summary: [
      "Philips é rotativa; Braun é de lâminas de rede",
      "Rotativa: círculos, segue o queixo e o pescoço",
      "Lâminas: movimentos retos, rente nas zonas planas",
      "Pele sensível: cabeça flexível, sem pressionar, 2–3 semanas",
      "A seco e no duche: 100% à prova de água",
      "As cabeças gastam-se: conta com a troca"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Máquinas de barbear",
      text: "Rotativas e de lâminas, com o que cada uma faz bem e para quem não é.",
      actions: [["../../produto/philips-s5465-series-5000/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver todas"]]
    },
    sections: [
      {
        id: "philips-ou-braun",
        h2: "Philips ou Braun: rotativa ou de lâminas",
        html: "<p>É a pergunta que mais se faz, e a resposta é mais simples do que parece: nas máquinas de barbear, <strong>a Philips faz rotativas e a Braun faz de lâminas</strong> (rede ou foil). Escolher a marca é, quase sempre, escolher o tipo.</p><ul class=\"rich-list\">" +
          "<li><strong>Rotativa (Philips)</strong> — três cabeças circulares com lâminas que giram. Usa-se em <strong>pequenos círculos</strong>. As cabeças inclinam-se e seguem o queixo e o pescoço, e lidam bem com barba que cresce em várias direções.</li>" +
          "<li><strong>De lâminas (Braun)</strong> — lâminas que oscilam por baixo de uma rede fina. Usa-se em <strong>movimentos retos</strong>, para cima e para baixo. Em geral barbeia mais rente nas zonas planas (bochechas) e dá-se bem com barba densa.</li></ul>" +
          "<p>Não há um tipo melhor do que o outro: há o que encaixa na forma como barbeias. Se já usaste um e gostaste, fica no mesmo — a pele já está habituada. Se nunca usaste nenhum, a rotativa costuma ser mais fácil de começar, porque perdoa mais o ângulo.</p>"
      },
      {
        id: "a-nossa-escolha",
        h2: "A nossa escolha: Philips Série 5000 (rotativa)",
        html: "<p>Para a maioria, recomendamos a " + p("philips-s5465-series-5000", "Philips Série 5000 S5465/18") + ". Tem <strong>27 lâminas autoafiáveis</strong>, <strong>cabeças flexíveis a 360°</strong>, um <strong>aparador de encaixar</strong> para bigode e patilhas, é 100% à prova de água e dá até 50 minutos de bateria. É, a par da X3000, das máquinas de barbear mais compradas na Amazon.es.</p>" +
          "<p>O que tens de saber: é rotativa. Se preferes movimentos retos, vê a Braun a seguir. E não substitui um aparador para barba comprida.</p>" +
          amz("B0CFY7R1GX", "philips-s5465-series-5000")
      },
      {
        id: "laminas",
        h2: "Se preferes lâminas: Braun Series 5 ou Series 3",
        html: "<ul class=\"rich-list\">" +
          "<li>A " + p("braun-series5-51-b1000s", "Braun Series 5 51-B1000s") + " tem <strong>3 lâminas flexíveis</strong> que se adaptam ao rosto e a tecnologia <strong>AutoSense</strong>, que ajusta a potência à densidade da barba. É 100% à prova de água e tem carregamento rápido de 5 minutos para um barbear.</li>" +
          "<li>A " + p("braun-series-3-310s", "Braun Series 3 310S") + " é a porta de entrada da Braun nas lâminas: <strong>2 redes de barbear e 1 aparador central</strong> para os pelos mais compridos, 3 lâminas flexíveis que seguem o rosto e uma cabeça estreita para zonas difíceis, como debaixo do nariz. É 100% à prova de água, com cabeça lavável, e tem carga rápida de 5 minutos para um barbear. A bateria é curta: até 30 minutos.</li></ul>" +
          "<p>A regra: se tens barba densa ou barbeias todos os dias, a Series 5 compensa pelo AutoSense, que ajusta a potência à barba. Se queres experimentar as lâminas sem gastar tanto, ou barbeias só alguns dias por semana, a Series 3 chega — conta com carregar mais vezes.</p>" +
          amz("B0B3JBYXG8", "braun-series5-51-b1000s")
      },
      {
        id: "primeira-maquina",
        h2: "Primeira máquina, sem gastar muito: Philips X3000",
        html: "<p>Se vens da lâmina e queres experimentar, a " + p("philips-x3053-series-3000", "Philips Série X3000 X3053/00") + " é uma rotativa de entrada com tecnologia <strong>SkinProtect</strong>, 27 lâminas PowerCut autoafiáveis e cabeças que fletem em quatro direções. Barbeia a seco ou no duche e tem aparador de patilhas. Das máquinas deste guia, é a mais comprada na Amazon.es.</p>" +
          "<p>O que perdes face à Série 5000: menos funções, e carrega por USB-A sem adaptador de corrente na caixa.</p>" +
          amz("B0CHMN6377", "philips-x3053-series-3000")
      },
      {
        id: "comparar",
        h2: "As máquinas lado a lado",
        html: "<p>As características publicadas pelos fabricantes na Amazon.es. Onde a marca não indica o valor, fica um traço.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Máquina</th><th scope=\"col\">Tipo</th><th scope=\"col\">Cabeça</th><th scope=\"col\">Água</th><th scope=\"col\">A saber</th></tr></thead><tbody>" +
          row("philips-s5465-series-5000", "Philips Série 5000 S5465/18", "Rotativa", "27 lâminas autoafiáveis, flexível a 360°", "100% à prova de água", "Até 50 min de bateria; aparador de encaixar") +
          row("philips-x3053-series-3000", "Philips Série X3000 X3053/00", "Rotativa", "27 lâminas PowerCut, flete em 4 direções", "A seco ou no duche", "Carrega por USB-A, sem adaptador") +
          row("braun-series5-51-b1000s", "Braun Series 5 51-B1000s", "Lâminas de rede", "3 lâminas flexíveis, AutoSense", "100% à prova de água", "Carga rápida de 5 min para um barbear") +
          row("braun-series-3-310s", "Braun Series 3 310S", "Lâminas de rede", "2 redes e aparador central, 3 lâminas flexíveis", "100% à prova de água", "Até 30 min de bateria; carga rápida de 5 min") +
          row("philips-oneblade-360-qp2724", "Philips OneBlade 360", "Híbrido: apara e rapa", "Lâmina 360 que se inclina", "100% à prova de água", "Cerca de 45 min (Ni-MH); a lâmina troca-se") +
          "</tbody></table></div>"
      },
      {
        id: "pele-sensivel",
        h2: "Pele sensível, irritação e foliculite",
        html: "<p>\"Que não irrita\", \"que não belisca\" e \"para foliculite\" estão entre as pesquisas mais feitas. Nenhuma máquina garante pele sem irritação, mas há escolhas e hábitos que ajudam:</p><ul class=\"rich-list\">" +
          "<li><strong>Cabeça flexível.</strong> Tem de seguir o rosto sem teres de pressionar — pressão é irritação. As três máquinas principais deste guia têm.</li>" +
          "<li><strong>Dá-lhe duas ou três semanas.</strong> Ao trocar de lâmina para máquina (ou de rotativa para lâminas), a pele e a barba estão a habituar-se. Muita gente desiste na primeira semana.</li>" +
          "<li><strong>A seco, pele bem seca; no duche, com gel ou espuma.</strong> Com pele sensível, muita gente prefere molhado. Só nas máquinas 100% à prova de água.</li>" +
          "<li><strong>Cabeças gastas puxam.</strong> Se começou a irritar ao fim de muito tempo, pode ser a cabeça a pedir troca (ver mais abaixo).</li></ul>" +
          "<p><strong>Foliculite e pelos encravados:</strong> uma máquina elétrica não corta o pelo abaixo da superfície da pele, como a lâmina pode fazer, e muita gente com pelos encravados nota menos borbulhas. Se a foliculite persistir, fala com um dermatologista. Mais em " + r("pelos-encravados-como-evitar", "pelos encravados: como evitar") + " e " + r("como-reduzir-irritacao-ao-fazer-a-barba", "como reduzir a irritação ao fazer a barba") + ".</p>"
      },
      {
        id: "para-quem",
        h2: "Para idosos, adolescentes e quem vem da lâmina",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Idosos.</strong> A pele fica mais fina e as mãos menos firmes: conta mais uma cabeça flexível, que não exige ângulo, e uma pega que se segure bem do que o número de lâminas. Uma rotativa como a Série 5000 é a escolha mais tranquila; o aparador de encaixar trata das patilhas sem outro aparelho.</li>" +
          "<li><strong>Adolescentes e primeira barba.</strong> Barba fina e pouca prática: uma máquina de entrada como a Philips X3000 chega, sem risco de cortes. Se a barba ainda é rala e só se apara de vez em quando, o " + p("philips-oneblade-360-qp2724", "OneBlade 360") + " também serve.</li>" +
          "<li><strong>Quem vem da lâmina.</strong> A máquina barbeia um pouco menos rente, mas não corta, não pede espuma e faz-se em três minutos. Começa com a barba de um dia, não de três.</li></ul>"
      },
      {
        id: "gilete-ou-aparador",
        h2: "Máquina de barbear, gilete ou aparador?",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Gilete (lâmina manual)</strong> — é o barbear mais rente, mas pede espuma, tempo e cuidado, e é onde aparecem cortes e pelos encravados. Se gostas do ritual, vê " + r("navalha-classica-ou-maquina-de-seguranca-diferencas-reais", "navalha clássica ou máquina de segurança") + ".</li>" +
          "<li><strong>Máquina de barbear</strong> — deixa a pele lisa, sem cortes, a seco ou no duche. É para quem rapa a cara todos os dias ou quase.</li>" +
          "<li><strong>Aparador</strong> — deixa comprimento: é para quem tem barba. Se é isso que procuras, vê o " + r("melhor-aparador-de-barba", "melhor aparador de barba") + "; as diferenças estão em " + r("trimmer-vs-shaver-diferencas-reais", "trimmer ou shaver") + ".</li></ul>" +
          "<p>E se procuras uma máquina para cortar o cabelo, o guia certo é o das " + r("melhores-maquinas-para-cortar-cabelo-em-casa", "melhores máquinas para cortar cabelo em casa") + ". Para a cabeça rapada, um shaver de cabeça — vê " + r("como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "como rapar a cabeça em casa") + ".</p>"
      },
      {
        id: "depois-de-comprar",
        h2: "Depois de comprar: usar, limpar e trocar as cabeças",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Como usar.</strong> Rotativa em pequenos círculos; de lâminas em movimentos retos, contra o crescimento do pelo. Estica a pele com a mão livre no pescoço e não carregues: a cabeça faz o trabalho.</li>" +
          "<li><strong>Limpar.</strong> Nas 100% à prova de água, abre a cabeça e passa por água corrente depois de cada uso; deixa secar aberta.</li>" +
          "<li><strong>Trocar as cabeças.</strong> As lâminas gastam-se e começam a puxar. A Philips indica trocar as cabeças das rotativas a cada dois anos; a Braun, a rede e as lâminas a cada 18 meses. Antes de comprar, confirma que a marca vende as cabeças de substituição do teu modelo.</li>" +
          "<li><strong>Viajar.</strong> A máquina pode ir na bagagem de mão. Aparelhos com bateria de lítio devem ir, de preferência, na cabine; confirma as regras da companhia.</li></ul>"
      },
      {
        id: "marcas",
        h2: "Gamas e marcas: Series 3, 5, 7, 9 e Série 1000 a 9000",
        html: "<p>As duas marcas numeram as gamas da mais simples para a mais completa: na Braun, Series 3, 5, 7 e 9; na Philips, Séries 1000, 3000, 5000, 7000 e 9000 (a X3000 é uma 3000). Subir de gama acrescenta, em geral, mais lâminas, cabeças mais flexíveis, mais bateria e estação de limpeza — conforto, não um barbear de outra categoria.</p>" +
          "<p>Para quem barbeia todos os dias, o ponto de equilíbrio está no meio: <strong>Philips Série 5000 ou Braun Series 5</strong>. As gamas de topo (Philips 7000/9000, Braun Series 7/9) fazem sentido para barbas muito densas ou como prenda. Muitas pesquisas juntam o nome de uma loja (Worten, Continente, Lidl): compara sempre a referência exata (S5465, 51-B1000s…), porque o mesmo nome comercial tem várias versões.</p>"
      },
      {
        id: "oneblade",
        h2: "E o OneBlade?",
        html: "<p>O OneBlade não é uma máquina de barbear no sentido clássico: apara, faz contornos e rapa, mas não deixa a pele tão lisa como uma máquina de lâminas. É ótimo para quem anda sempre com barba de poucos dias. A lâmina gasta-se e troca-se. Está tudo em " + r("qual-oneblade-comprar", "qual OneBlade comprar") + ".</p>"
      }
    ],
    faq: [
      ["Qual é a melhor máquina de barbear elétrica?", "Para a maioria, uma rotativa com cabeças flexíveis, como a Philips Série 5000 S5465/18. Para quem barbeia em movimentos retos e tem barba densa, uma de lâminas como a Braun Series 5 51-B1000s."],
      ["Braun ou Philips: qual é melhor?", "Depende do tipo de barbear: as máquinas de barbear da Philips são rotativas (movimentos circulares, seguem os contornos) e as da Braun são de lâminas de rede (movimentos retos, mais rente nas zonas planas). Escolhe pelo tipo que preferes."],
      ["Qual é a diferença entre máquina de barbear rotativa e de lâminas?", "A rotativa tem cabeças circulares e usa-se em pequenos círculos; a de lâminas tem uma rede fina e usa-se em movimentos retos. A rotativa segue melhor os contornos; a de lâminas costuma barbear mais rente nas zonas planas."],
      ["A máquina de barbear elétrica irrita a pele?", "Pode irritar nas primeiras duas ou três semanas, enquanto a pele se habitua. Cabeça flexível, não pressionar e, com pele sensível, barbear no duche com gel costumam ajudar."],
      ["Posso usar a máquina de barbear no duche?", "Se for 100% à prova de água, sim — e com gel ou espuma costuma irritar menos. Confirma na ficha do modelo."],
      ["Qual é a melhor máquina de barbear para idosos?", "Uma com cabeça flexível, que não exige ângulo, e pega fácil de segurar, como uma rotativa da Philips Série 5000. Conta mais o conforto do que o número de lâminas."],
      ["A máquina de barbear pode ir no avião?", "Sim, na bagagem de mão. Com bateria de lítio, de preferência na cabine; confirma as regras da companhia."],
      ["De quanto em quanto tempo se trocam as cabeças?", "A Philips indica a cada dois anos nas rotativas; a Braun, a rede e as lâminas a cada 18 meses. Se a máquina começa a puxar ou a irritar, é sinal de troca."]
    ],
    faqCta: "Preferes um barbear clássico, feito por um profissional? Encontra uma barbearia no <a href=\"../../#explorar\">mapa do OndeCortar</a>.",
    related: ["trimmer-vs-shaver-diferencas-reais", "como-reduzir-irritacao-ao-fazer-a-barba", "qual-oneblade-comprar"],
    finalCta: {
      h2: "Escolhe o tipo, depois o modelo",
      text: "Rotativa (Philips) se barbeias em círculos, de lâminas (Braun) se barbeias a direito.",
      actions: [["../../produto/philips-s5465-series-5000/", "Ver a nossa escolha"], ["../../loja/trimmers-e-shavers/", "Ver máquinas de barbear"]]
    }
  }
];
