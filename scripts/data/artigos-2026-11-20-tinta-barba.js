// 2026-11-20 — revista/tinta-para-barba-como-pintar-a-barba-branca/ (artigo novo, pedido pelo utilizador:
// "um BOM artigo, com as palavras e os truques de SEO"). Não mexe em barba-grisalha-assumir-ou-pintar (10/10, estilo:
// assumir ou pintar); este responde ao "como pintar e com quê" e liga a esse.
// Procura (Google PT, 20/11): "tinta para barba" (+ continente, mercadona, pingo doce, homem, preta, castanho escuro,
// natural, e bigode, just for men), "pintar a barba" (de preto, de grisalho, faz mal, com tinta de cabelo, sem manchar
// o rosto), "como pintar a barba" (grisalha, sem dar alergia, de forma natural, sem manchar a pele), "qual a melhor
// tinta para barba" (e bigode, para barba branca, de preto), "just for men" (control gx, barba, como aplicar, quanto
// dura, ingredientes), "control gx" (funciona, como usar, opiniões), "como escurecer a barba" (branca, sem pintar,
// sem tinta, com café), "disfarçar barba branca", "barba branca aos 30". Trends PT 12 meses: "just for men" 3,4 contra
// "aparador de barba" 1,1. Amazon.es "comprados el mes pasado": Control GX barba 900+, gel M35 600+, Retoque 200+, M40 100+.
// Factos só das fichas da Just For Men na Amazon.es (20/11): Control GX barba B0BKB7WSD7 (reduz os brancos aos poucos
// a cada lavagem, resultado subtil; lavar, deixar atuar um pouco, enxaguar; não usar em barba aclarada, descolorada,
// com madeixas, pintada de loiro ou com hena; a caixa avisa que os colorantes podem dar alergia); Bigode e Barba M40
// B0BZDSM71F (gel, misturar, aplicar com pincel, 5 min, lavar; dura até o pelo voltar a crescer; sem amoníaco; teste
// de alergia 48 h antes de CADA uso, mesmo para quem já usou; não para menores de 16; risco com "hena negra"; vitiligo;
// peróxido de hidrogénio, resorcinol e fenilenodiaminas; não usar em sobrancelhas nem pestanas; luvas, pincel,
// bandeja na caixa; cores M25 a M55); Retoque Instantâneo B0CB45W2SG (barba e sobrancelhas, aplicar com escova,
// 5 min, dura o dia, sai com sabão ou gel de barba e água morna; disfarça zonas com menos pelo; 3 tons).
// Sem preços, avaliações nem "testámos".
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const row = (cells) => "<tr><th scope=\"row\">" + cells[0] + "</th>" + cells.slice(1).map((c, i) => "<td data-label=\"" + ["Resultado", "Quanto dura", "A ter em conta"][i] + "\">" + c + "</td>").join("") + "</tr>";
const corRow = (codigo, cor, paraQuem) =>
  "<tr><th scope=\"row\">" + codigo + "</th><td data-label=\"Cor\">" + cor + "</td><td data-label=\"Para quem\">" + paraQuem + "</td></tr>";

const GX = "just-for-men-control-gx-barba";
const M40 = "just-for-men-bigode-barba-m40";
const RET = "just-for-men-retoque-instantaneo-barba";

module.exports = [
  {
    slug: "tinta-para-barba-como-pintar-a-barba-branca",
    category: "cuidados-com-a-barba",
    published: "2026-11-20",
    title: "Tinta para barba: como pintar a barba branca sem ficar artificial",
    h1: "Tinta para barba: como pintar a barba branca sem ficar artificial",
    description: "Just For Men, Control GX ou retoque? Qual a melhor tinta para barba, que cor escolher, como pintar sem manchar a pele e o teste de alergia de 48 horas.",
    schemaDescription: "Como pintar a barba branca em casa: tinta, champô gradual ou retoque, qual a melhor tinta para barba, que cor escolher, o passo a passo sem manchar a pele, se pintar a barba faz mal e quanto dura.",
    image: "imagens/revista/tinta-para-barba.jpg",
    imageAlt: "Homem de meia-idade com barba aparada e grisalha, de casaco claro, a olhar para a câmara",
    readMinutes: 8,
    criteria: "Características e avisos de segurança conforme publicados pela Just For Men nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Conselhos gerais; uma reação na pele é para o médico. Não testamos produtos.",
    lede: "Para a maioria dos homens, o melhor primeiro passo não é a tinta: é um champô que escurece os brancos aos poucos, como o Just For Men Control GX. Fica natural porque não pinta tudo de uma vez. Se queres tapar os brancos todos, a tinta própria para barba resolve em 5 minutos, com um tom mais claro do que pensas e o teste de alergia feito dois dias antes.",
    subcopy: "Tinta, champô gradual ou retoque de um dia; a cor certa; o passo a passo sem manchar a pele; e o que diz a marca sobre alergias. Sem promessas e sem marcas que não analisámos.",
    heroActions: [["#qual-escolher", "Tinta, champô ou retoque?"], ["#passo-a-passo", "Como pintar, passo a passo"]],
    quick: [
      ["Qual é a melhor tinta para barba?", "Para quem nunca pintou, o champô Control GX: escurece aos poucos e ninguém nota a mudança. Para tapar tudo, a tinta em gel Just For Men Bigode e Barba."],
      ["Que cor escolho?", "Um tom mais claro do que a tua barba parece. Mais escuro do que o natural é o que dá o ar artificial."],
      ["Pintar a barba faz mal?", "Pode dar alergia. A Just For Men pede um teste 48 horas antes de cada uso, mesmo que já tenhas usado. Não uses em pele irritada."],
      ["Quanto dura?", "A tinta dura até o pelo voltar a crescer: os brancos na raiz começam a ver-se em poucos dias. O retoque dura só o dia."]
    ],
    summary: [
      "Champô gradual para começar; tinta para tapar tudo",
      "Escolhe um tom mais claro do que a tua barba",
      "Teste de alergia 48 horas antes, sempre",
      "Apara a barba antes de pintar",
      "Creme gordo no contorno para não manchar a pele",
      "Respeita os 5 minutos: mais tempo é mais escuro"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Control GX para a barba",
      text: "O champô da Just For Men que reduz os brancos a cada lavagem, com um resultado subtil. Vê para quem é e as limitações.",
      actions: [["../../produto/" + GX + "/", "Ver o Control GX"], ["../../revista/barba-grisalha-assumir-ou-pintar/", "Assumir ou pintar?"]]
    },
    sections: [
      {
        id: "qual-escolher",
        h2: "Tinta, champô gradual ou retoque: o que escolher",
        html: "<p>Há três maneiras de disfarçar os brancos da barba em casa, e a escolha depende de quanto queres esconder e de quanto tempo queres que dure. É a primeira decisão, antes da marca e da cor.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Tipo</th><th scope=\"col\">Resultado</th><th scope=\"col\">Quanto dura</th><th scope=\"col\">A ter em conta</th></tr></thead><tbody>" +
          row(["Champô gradual<br>(" + p(GX, "Control GX") + ")", "Os brancos escurecem aos poucos, a cada lavagem. Fica algum grisalho.", "Enquanto o fores usando", "O mais natural e o mais fácil. Não serve para barba descolorada, com madeixas ou com hena."]) +
          row(["Tinta em gel<br>(" + p(M40, "Bigode e Barba") + ")", "Tapa os brancos de uma vez, em 5 minutos.", "Até o pelo voltar a crescer", "Teste de alergia 48 horas antes de cada uso. A cor errada nota-se."]) +
          row(["Retoque de um dia<br>(" + p(RET, "Retoque Instantâneo") + ")", "Pinta por cima do pelo e disfarça falhas.", "Um dia: sai ao lavar", "Bom para um evento ou para experimentar uma cor. Não é para todos os dias."]) +
          "</tbody></table></div>" +
          "<p><strong>A nossa sugestão: começa pelo champô gradual.</strong> Ninguém repara numa barba que escurece devagar, e nunca ficas com o ar de \"barba pintada\" que é o maior medo de quem pinta pela primeira vez. Se ao fim de umas semanas quiseres tapar mais, passa à tinta. O retoque fica para as ocasiões.</p>"
      },
      {
        id: "melhor-tinta",
        h2: "Qual a melhor tinta para barba",
        html: "<p>A Just For Men é a marca que mais aparece quando se procura tinta para barba em Portugal, e é também a que domina os resultados de tinta para barba na Amazon.es. Faz as três soluções acima, o que ajuda a começar por uma e passar a outra sem mudar de marca. Estas são as nossas escolhas, pelas características que a marca publica:</p>" +
          "<h3>Para quem nunca pintou: Just For Men Control GX Barba</h3>" +
          "<p>O " + p(GX, "Control GX para barba") + " é um champô colorante: lavas a barba com ele, deixas atuar um pouco e enxaguas. Segundo a Just For Men, reduz os brancos gradualmente a cada lavagem, com um resultado subtil, e deixa a barba mais macia e com mais volume. É a resposta mais honesta à pergunta \"o Control GX funciona?\": funciona aos poucos, não de um dia para o outro, e é isso que o torna discreto. A marca não o recomenda em barba aclarada, descolorada, com madeixas, pintada de loiro ou com hena.</p>" +
          cta("B0BKB7WSD7", GX) +
          "<h3>Para tapar os brancos todos: Just For Men Bigode e Barba (gel com pincel)</h3>" +
          "<p>A " + p(M40, "tinta em gel Just For Men Bigode e Barba") + " é a solução clássica: misturas a cor com o ativador, aplicas com o pincel, esperas 5 minutos e lavas. A marca diz que a cor dura até o pelo voltar a crescer, que não tem amoníaco e que a fórmula leva biotina, óleo de coco e aloé vera. Na caixa vêm a cor, o ativador, a bandeja para misturar, o pincel, luvas e as instruções. Há várias cores, do M25 (castanho claro) ao M55 (preto), todas na mesma página da Amazon.es.</p>" +
          cta("B0BZDSM71F", M40) +
          "<h3>Para um dia ou para disfarçar falhas: Retoque Instantâneo</h3>" +
          "<p>O " + p(RET, "Retoque Instantâneo da Just For Men") + " não é uma tinta permanente: aplica-se com uma escova, como uma máscara de pestanas, cobre os brancos e preenche as zonas com menos pelo. Fica o dia todo e sai ao lavar com sabão ou gel de barba e água morna. Serve também para as sobrancelhas, ao contrário da tinta em gel. Bom para um casamento, uma entrevista, ou para veres como ficas com a barba mais escura antes de pintar a sério. Se o teu problema são falhas e não brancos, lê também " + r("barba-falhada-o-que-fazer", "barba falhada: o que fazer") + ".</p>" +
          cta("B0CB45W2SG", RET)
      },
      {
        id: "cor",
        h2: "Que cor escolher (e porque mais clara é melhor)",
        html: "<p>A cor errada é a principal razão por que uma barba pintada parece pintada. A regra que mais ajuda: <strong>escolhe um tom mais claro do que a tua barba parece</strong>. A barba tem pelos de várias cores (escuros, ruivos, brancos) e, vista de perto, é quase sempre mais clara do que o cabelo. Uma cor escura e uniforme é o que denuncia a tinta.</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Código</th><th scope=\"col\">Cor</th><th scope=\"col\">Para quem</th></tr></thead><tbody>" +
          corRow("M25", "Castanho claro", "Barba clara ou alourada") +
          corRow("M35", "Castanho médio","Barba castanha média") +
          corRow("M40", "Castanho escuro médio", "A escolha mais segura para a maioria das barbas escuras em Portugal") +
          corRow("M45", "Moreno (castanho muito escuro)", "Barba muito escura") +
          corRow("M55", "Preto", "Só para barba realmente preta") +
          "</tbody></table></div>" +
          "<ul class=\"rich-list\">" +
          "<li><strong>Na dúvida entre duas, a mais clara.</strong> Escurecer na vez seguinte é fácil; clarear uma barba pintada de escuro não é.</li>" +
          "<li><strong>Pintar a barba de preto</strong> só resulta se a tua barba era mesmo preta. Em barbas castanhas escuras, o preto fica duro, sobretudo à luz do dia.</li>" +
          "<li><strong>Queres manter algum grisalho?</strong> É o caso para o champô gradual, que escurece sem tapar tudo: fica um grisalho mais discreto, em vez de nenhum.</li>" +
          "<li><strong>Barba e cabelo:</strong> não precisam de ter exatamente a mesma cor. Uma barba ligeiramente mais clara do que o cabelo é o natural.</li></ul>"
      },
      {
        id: "passo-a-passo",
        h2: "Como pintar a barba em casa, passo a passo",
        html: "<p>O passo a passo da tinta em gel, segundo as instruções da Just For Men, com o que acrescentamos para o resultado ficar natural. Lê sempre o folheto da caixa: manda o que lá está.</p><ol class=\"rich-list\">" +
          "<li><strong>Dois dias antes: o teste de alergia.</strong> A marca pede o teste 48 horas antes de cada uso, mesmo que já tenhas usado este ou outro produto. Por isso diz para comprares a tinta dois dias antes do dia em que a queres usar.</li>" +
          "<li><strong>Apara a barba primeiro.</strong> Pintar e aparar depois desperdiça tinta e pode deixar zonas mais claras. Com a barba no comprimento final, a cor fica uniforme. Se precisas de ajuda, vê " + r("como-aparar-a-barba-em-casa", "como aparar a barba em casa") + ".</li>" +
          "<li><strong>Barba limpa e seca</strong>, sem óleo nem bálsamo, que impedem a cor de pegar por igual.</li>" +
          "<li><strong>Protege a pele do contorno</strong> com um creme gordo (vaselina, por exemplo) nas bochechas, no pescoço e à volta dos lábios, sem tocar no pelo.</li>" +
          "<li><strong>Calça as luvas e mistura</strong> a cor com o ativador na bandeja, nas quantidades do folheto.</li>" +
          "<li><strong>Aplica com o pincel no sentido do pelo</strong>, a começar pelas zonas com mais brancos. A cor é para o pelo, não para a pele.</li>" +
          "<li><strong>Espera 5 minutos e não mais.</strong> Deixar mais tempo dá uma cor mais escura, e é assim que se chega ao ar artificial. Na primeira vez podes até tirar um pouco antes.</li>" +
          "<li><strong>Lava bem com água</strong> até a água sair limpa, e depois hidrata com " + r("oleo-de-barba-para-que-serve", "óleo de barba") + " ou bálsamo.</li></ol>" +
          "<p>Com o Control GX é mais simples: lavas a barba com ele em vez do champô habitual, deixas atuar um pouco e enxaguas. O efeito vai-se acumulando com as lavagens.</p>"
      },
      {
        id: "sem-manchar",
        h2: "Como pintar a barba sem manchar a pele",
        html: "<p>As manchas na pele são a queixa mais comum de quem pinta a barba pela primeira vez. Quase todas se evitam assim:</p><ul class=\"rich-list\">" +
          "<li><strong>Creme gordo no contorno</strong> antes de começar: a tinta não pega na pele protegida.</li>" +
          "<li><strong>Pouca tinta no pincel</strong> e mais passagens, em vez de muita de uma vez.</li>" +
          "<li><strong>Limpa logo qualquer pingo</strong> na pele com um disco de algodão húmido e sabão, antes dos 5 minutos acabarem.</li>" +
          "<li><strong>Atenção às linhas</strong> das bochechas e do pescoço: pinta para dentro do contorno, não para fora.</li>" +
          "<li><strong>Se a pele ficar com cor</strong>, lava com água e sabão. Nunca esfregues a pele com força nem uses produtos agressivos: irritas a pele e não ganhas nada.</li></ul>"
      },
      {
        id: "faz-mal",
        h2: "Pintar a barba faz mal? Alergias e cuidados",
        html: "<p>A tinta de barba não faz mal à maioria das pessoas, mas pode dar alergia, e a pele do rosto é sensível. Os avisos que a Just For Men publica para a tinta em gel são claros:</p><ul class=\"rich-list\">" +
          "<li><strong>Teste de alergia 48 horas antes de cada uso</strong>, mesmo que já tenhas pintado antes.</li>" +
          "<li><strong>Não pintes</strong> se tiveres a pele irritada ou com feridas, se já tiveste uma reação a uma tinta, ou se já reagiste a uma tatuagem temporária de \"hena negra\".</li>" +
          "<li><strong>Não é para menores de 16 anos</strong>, nem para pestanas ou sobrancelhas.</li>" +
          "<li><strong>Quem tem vitiligo</strong> ou casos de despigmentação da pele na família não deve usar: a marca avisa que uma reação pode levar à perda de cor da pele.</li>" +
          "<li><strong>Para imediatamente</strong> se sentires comichão forte, ardor ou notares a pele a mudar de cor, e lava com água.</li></ul>" +
          "<p>A tinta em gel contém peróxido de hidrogénio, resorcinol e fenilenodiaminas, segundo a ficha. O champô Control GX também é um colorante, e a caixa avisa que os colorantes podem provocar reações alérgicas. O retoque de um dia é o mais leve: sai ao lavar. Qualquer reação que não passe, inchaço ou feridas são para o médico, não para resolver em casa.</p>"
      },
      {
        id: "tinta-de-cabelo",
        h2: "Posso pintar a barba com tinta de cabelo?",
        html: "<p>Não é boa ideia. A tinta para barba é feita para um pelo mais grosso do que o da cabeça e para a pele do rosto, e atua em minutos; a de cabelo foi pensada para outro pelo, outros tempos e outra pele. Se a caixa não diz que serve para a barba, não a uses na cara. O resultado costuma ser uma cor que não pega por igual e uma pele mais irritada.</p>"
      },
      {
        id: "quanto-dura",
        h2: "Quanto tempo dura a tinta na barba",
        html: "<ul class=\"rich-list\">" +
          "<li><strong>Tinta em gel:</strong> a Just For Men diz que dura até o pelo voltar a crescer. Como a barba cresce depressa, os brancos na raiz começam a notar-se ao fim de poucos dias a duas semanas, sobretudo numa barba curta. Daí a vantagem de uma cor mais clara: a diferença na raiz vê-se menos.</li>" +
          "<li><strong>Champô gradual:</strong> mantém-se enquanto o usares. Se paras, os brancos voltam aos poucos, à medida que a barba cresce.</li>" +
          "<li><strong>Retoque:</strong> um dia. Sai na lavagem seguinte.</li></ul>"
      },
      {
        id: "sem-pintar",
        h2: "Como escurecer a barba sem pintar",
        html: "<p>É uma das pesquisas mais comuns, e a resposta honesta é curta. As receitas caseiras que se encontram, como café ou chá, dão no máximo um tom ligeiro e passageiro, e podem manchar a pele. O que funciona sem tinta permanente é o retoque de um dia, que sai ao lavar.</p>" +
          "<p>E há a hipótese de não esconder nada: uma barba grisalha curta, com linhas limpas, parece uma escolha e não descuido. Explicamos como em " + r("barba-grisalha-assumir-ou-pintar", "barba grisalha: assumir ou pintar") + ".</p>"
      },
      {
        id: "barbearia",
        h2: "Ou pede ao teu barbeiro",
        html: "<p>Muitas barbearias fazem coloração ou camuflagem de brancos na barba. A vantagem é a cor certa à primeira, escolhida por quem vê a tua barba ao vivo, e a aplicação feita sem manchas. Se nunca pintaste e tens medo de errar no tom, é um bom começo: depois podes manter em casa com o mesmo tom.</p>" +
          "<p>Pergunta quando marcares, porque nem todas fazem. Encontras barbearias perto de ti no <a href=\"../../cidades/\">diretório por cidade</a> ou no <a href=\"../../#mapa\">mapa do OndeCortar</a>.</p>"
      }
    ],
    faq: [
      ["Qual é a melhor tinta para barba?", "Para quem nunca pintou, o champô Just For Men Control GX Barba, que escurece os brancos aos poucos e fica natural. Para tapar os brancos todos de uma vez, a tinta em gel Just For Men Bigode e Barba, com pincel. As escolhas são pelas características publicadas pela marca; não testamos produtos."],
      ["Pintar a barba faz mal?", "Pode dar alergia. A Just For Men pede um teste de alergia 48 horas antes de cada uso, mesmo para quem já usou, e diz para não pintar com a pele irritada, depois de uma reação a tinta ou a uma tatuagem de hena negra, nem em menores de 16 anos."],
      ["O Control GX funciona?", "Funciona aos poucos: segundo a marca, reduz os brancos da barba a cada lavagem, com um resultado subtil. Não é para quem quer a barba escura no próprio dia, e não deve ser usado em barba descolorada, com madeixas ou com hena."],
      ["Como se usa o Control GX na barba?", "Lavas a barba com ele em vez do champô habitual, deixas atuar um pouco e enxaguas. O efeito vai aparecendo com as lavagens. Segue a frequência indicada na caixa."],
      ["Quanto tempo dura a tinta Just For Men na barba?", "A marca diz que dura até o pelo voltar a crescer. Na prática, os brancos na raiz começam a ver-se ao fim de poucos dias a duas semanas, porque a barba cresce depressa."],
      ["Que cor de tinta para barba devo escolher?", "Um tom mais claro do que a tua barba parece. A barba é quase sempre mais clara do que o cabelo, e uma cor escura e uniforme é o que denuncia a tinta. Na dúvida entre duas, escolhe a mais clara."],
      ["Como pintar a barba sem manchar a pele?", "Põe um creme gordo, como vaselina, na pele do contorno antes de começar, usa pouca tinta no pincel e limpa logo qualquer pingo com algodão húmido e sabão. Respeita os 5 minutos."],
      ["Posso pintar a barba com tinta de cabelo?", "Não é recomendável. A tinta para barba é feita para o pelo grosso e a pele do rosto. Se a caixa não diz que serve para a barba, não a uses na cara."],
      ["Como escurecer a barba sem pintar?", "Sem tinta permanente, a opção é um retoque de um dia, como o Just For Men Retoque Instantâneo, que sai ao lavar. Receitas caseiras como café dão, no máximo, um tom ligeiro e passageiro."]
    ],
    faqCta: "Vê o <a href=\"../../produto/" + GX + "/\">Control GX</a>, a <a href=\"../../produto/" + M40 + "/\">tinta Bigode e Barba</a> ou o <a href=\"../../produto/" + RET + "/\">Retoque Instantâneo</a>.",
    related: ["barba-grisalha-assumir-ou-pintar", "barba-falhada-o-que-fazer", "oleo-de-barba-para-que-serve"],
    finalCta: {
      h2: "Mais claro, mais devagar, sem pressa",
      text: "Um champô gradual ou uma tinta um tom abaixo do que pensas, com o teste de alergia feito a tempo, é tudo o que separa uma barba pintada de uma barba que parece tua.",
      actions: [["../../produto/" + GX + "/", "Ver o Control GX"], ["../../cidades/", "Barbearias por cidade"]]
    }
  }
];
