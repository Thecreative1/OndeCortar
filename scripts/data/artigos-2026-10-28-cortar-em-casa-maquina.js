// 2026-10-28 — reescrita de revista/como-cortar-o-cabelo-em-casa-com-maquina/ (publicado a 5/10, rastreado a 10/10,
// "Crawled - currently not indexed": passo a passo genérico, igual ao de outros sites).
// Ângulo próprio a partir das pesquisas do Google PT: "como cortar o cabelo sozinho com máquina", "como cortar o
// próprio cabelo com máquina", "como cortar o cabelo atrás sozinho", "como cortar o cabelo do meu filho com máquina"
// (… de 1 ano, de 2 anos, autista), "como fazer degradê com máquina simples", "degradê sozinho em casa",
// "cortar cabelo com máquina estraga o cabelo", "cortar cabelo na máquina engrossa os fios",
// "como usar os pentes da máquina de cortar cabelo". Ignoradas marcas do Brasil (Mondial, Kemei).
// Números dos pentes iguais aos de revista/numeros-da-maquina-de-cortar-cabelo/ (1 ≈ 3 mm, 2 ≈ 6 mm…).
// Factos dos produtos das páginas produto/{slug}/. Sem preços, avaliações nem testes.
const row = (corte, lados, topo, nota) =>
  "<tr><th scope=\"row\">" + corte + "</th><td data-label=\"Lados e nuca\">" + lados + "</td><td data-label=\"Topo\">" + topo + "</td><td data-label=\"Nota\">" + nota + "</td></tr>";

module.exports = [
  {
    slug: "como-cortar-o-cabelo-em-casa-com-maquina",
    category: "conteudo-pratico",
    published: "2026-10-05",
    title: "Como cortar o cabelo em casa com máquina, sozinho ou a alguém",
    h1: "Como cortar o cabelo em casa com máquina, passo a passo",
    description: "Cortar o cabelo com máquina em casa: que número usar em cada corte, como fazer a nuca sozinho, um degradê simples e como cortar o cabelo a uma criança.",
    schemaDescription: "Como cortar o cabelo em casa com máquina: números para cada corte, passo a passo, a nuca quando cortas sozinho, um degradê simples e o corte de uma criança.",
    image: "imagens/revista/cortar-cabelo-maquina-espelho.jpg",
    imageAlt: "Homem a cortar o cabelo de outro com máquina, em frente a um espelho antigo",
    readMinutes: 9,
    criteria: "Método escrito para cortes curtos de manutenção; números dos pentes conforme a tabela da revista; características das máquinas conforme publicadas pelos fabricantes na Amazon.es. Não testamos produtos.",
    lede: "Cortar o cabelo em casa com máquina não exige talento — exige ordem. Os cortes que correm mal falham quase sempre no mesmo sítio: começam curtos demais, com pressa, e na nuca que ninguém vê.",
    subcopy: "Primeiro escolhe os números do corte que queres. Depois segue o passo a passo — e, se vais cortar sozinho ou cortar o cabelo a uma criança, lê as secções próprias antes de ligar a máquina.",
    heroActions: [["#numeros", "Que número para cada corte"], ["#sozinho", "Cortar sozinho"]],
    quick: [
      ["Que número usar para começar?", "Um acima do que queres. Se o objetivo é um 2 nas laterais (cerca de 6 mm), faz primeiro tudo com o 3 e só depois desce."],
      ["Dá para cortar sozinho?", "Sim, um corte curto com um ou dois números. A nuca é a parte difícil: grava-a com o telemóvel ou usa dois espelhos, e passa-a sempre com pente."],
      ["E um degradê?", "Um degradê baixo com dois ou três pentes faz-se em casa. Um degradê à pele é trabalho para barbeiro."],
      ["Cortar com máquina estraga ou engrossa o cabelo?", "Não. A máquina corta como a tesoura e não mexe na raiz. O cabelo parece mais grosso a crescer porque a ponta cortada fica romba."]
    ],
    summary: [
      "Escolhe os números antes de começar e começa um acima",
      "Cabelo limpo e seco, pente encaixado até ao clique",
      "Laterais e nuca primeiro, de baixo para cima, contra o crescimento",
      "Sozinho: nuca sempre com pente, vista no telemóvel ou com dois espelhos",
      "Degradê simples: 1, 2 e 3 em faixas, a subir",
      "Criança: sessão curta, pente comprido, nunca sem pente junto das orelhas"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "O que precisas para cortar em casa",
      text: "Máquinas com os comprimentos bem marcados, com e sem fio, capa e manutenção — escolhidas para quem corta em casa.",
      actions: [["../../loja/para-casa/", "Ver seleção para casa"], ["../../loja/maquinas-de-cortar/#comparar", "Comparar máquinas"]]
    },
    sections: [
      {
        id: "numeros",
        h2: "Que número usar em cada corte",
        html: "<p>Decide o corte antes de ligar a máquina. Os números abaixo são um ponto de partida para cortes curtos de manutenção; em cada caso, <strong>começa um número acima</strong> e desce só se quiseres mais curto. Quanto mede cada pente está na <a href=\"../../revista/numeros-da-maquina-de-cortar-cabelo/\">tabela dos números da máquina</a> (o 1 tem cerca de 3 mm, o 2 cerca de 6 mm, o 3 cerca de 9 mm, o 4 cerca de 12 mm).</p>" +
          "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr><th scope=\"col\">Corte</th><th scope=\"col\">Lados e nuca</th><th scope=\"col\">Topo</th><th scope=\"col\">Nota</th></tr></thead><tbody>" +
          row("Rapado", "Sem pente (0)", "Sem pente (0)", "Para pele lisa, vê <a href=\"../../revista/como-rapar-a-cabeca-em-casa-shaver-ou-maquina/\">como rapar a cabeça</a>") +
          row("Buzz cut", "O mesmo número em toda a cabeça", "Do 1 ao 4", "O mais fácil de fazer sozinho") +
          row("Corte militar", "1 ou 2, a subir alto", "3 ou 4", "Mais contraste do que o buzz cut; ver o <a href=\"../../revista/buzz-cut-corte-militar-que-numero-pedir/\">guia do corte militar</a>") +
          row("Curto clássico", "2", "3 ou 4", "Pede uma transição na zona de junção (passo 3)") +
          row("Topo mais comprido", "2 ou 3", "Tesoura", "Ver <a href=\"../../revista/como-cortar-cabelo-masculino-com-tesoura-em-casa/\">como cortar o topo à tesoura</a>") +
          row("Degradê baixo", "1 em baixo, 2 a meio, 3 em cima", "Tesoura ou 4 e mais", "Ver a secção do degradê simples") +
          "</tbody></table></div>" +
          "<p>As máquinas domésticas costumam marcar os milímetros no próprio pente ou numa roda, em vez do número. Se a tua tem <strong>alavanca</strong> ao lado da lâmina, ela dá comprimentos intermédios sem trocar de pente — útil para suavizar transições.</p>"
      },
      {
        h2: "O que precisas antes de começar",
        html: "<ul class=\"rich-list\"><li><strong>Máquina com pentes</strong> — com os comprimentos bem marcados. Uma máquina sem fio é mais fácil de rodar na nuca quando cortas sozinho.</li><li><strong>Dois espelhos</strong> (um à frente e outro de mão para ver a nuca), o telemóvel para filmar a parte de trás, ou alguém que ajude.</li><li><strong>Capa ou toalha</strong> e um sítio fácil de varrer.</li><li><strong>Pente</strong> e, se quiseres trabalhar o topo, tesoura.</li><li><strong>Aparador ou máquina sem pente</strong> para os contornos à volta das orelhas e na nuca.</li></ul><p>O cabelo deve estar <strong>limpo e completamente seco</strong>. Molhado parece mais comprido do que é e a máquina prende.</p>"
      },
      {
        h2: "Como usar os pentes da máquina",
        html: "<p>A maioria dos erros em casa é do pente, não da mão.</p><ul class=\"rich-list\"><li><strong>Encaixa até ao clique</strong> e puxa ligeiramente para confirmar que não sai. Um pente meio solto salta a meio de uma passagem — e o que fica por baixo é um 0.</li><li><strong>O número é a altura</strong> que fica: o pente afasta a lâmina da pele. Quanto maior o número, mais cabelo fica.</li><li><strong>Pente encostado à cabeça</strong> em toda a passagem, contra o sentido do crescimento.</li><li><strong>Confirma o pente antes de cada passagem</strong> quando trocas de número. É o hábito que evita o pior erro do corte em casa.</li></ul>"
      },
      {
        id: "passo-a-passo",
        h2: "Passo 1: laterais e nuca com um número acima",
        html: "<p>Encaixa o pente um número acima do comprimento final — se queres um 2, começa com o 3. Começa pela patilha e sobe pela lateral, contra o sentido do crescimento, com o pente sempre encostado à cabeça. Faz passagens sobrepostas e lentas: é melhor passar duas vezes no mesmo sítio do que deixar falhas.</p><p>Repete do outro lado e na nuca. Só quando tudo estiver uniforme é que trocas para o número final e repetes.</p>"
      },
      {
        h2: "Passo 2: o topo",
        html: "<p>Se queres o mesmo comprimento em toda a cabeça, passa a máquina com o mesmo número no topo, da testa para trás. Se queres o topo mais comprido, usa um pente maior (por exemplo, 2 dos lados e 4 em cima) ou apara à tesoura, segurando o cabelo entre os dedos.</p>"
      },
      {
        h2: "Passo 3: uma transição simples",
        html: "<p>Quando as laterais ficam mais curtas do que o topo, há uma «marca» na zona onde os dois comprimentos se encontram. Para a suavizar, usa o número intermédio só nessa faixa — por exemplo, um 3 entre um 2 e um 4 — com um movimento curto em que afastas a máquina da cabeça no fim da passagem.</p>"
      },
      {
        h2: "Passo 4: contornos das orelhas e da nuca",
        html: "<p>Com o aparador, ou com a máquina sem pente, limpa à volta das orelhas dobrando-as ligeiramente para a frente. Na nuca, segue a linha natural do cabelo: tira só os pelos soltos abaixo dela. Subir a linha para «ficar mais limpo» é o erro mais comum e demora semanas a crescer.</p><p>No fim, passa a mão pelo cabelo no sentido contrário e revê ao espelho de frente e de lado — as falhas veem-se melhor com a luz a bater de lado.</p>"
      },
      {
        h2: "Passo 5: limpar e guardar a máquina",
        html: "<p>Retira o pente, sacode os pelos e escova a lâmina. Uma gota de <a href=\"../../produto/wahl-clipper-oil/\">óleo para máquinas</a> nos dentes mantém o corte suave no próximo uso. O passo a passo da manutenção está em <a href=\"../../revista/como-limpar-uma-maquina-de-cortar-cabelo/\">como limpar uma máquina de cortar cabelo</a>.</p>"
      },
      {
        id: "sozinho",
        h2: "Cortar o cabelo sozinho: a nuca sem a ver",
        html: "<p>Os lados e o topo fazem-se ao espelho como se faz a barba. A parte de trás é outra conversa: vês tudo ao contrário, ou não vês nada. Três regras tornam-na segura.</p><ul class=\"rich-list\"><li><strong>Na nuca, nunca sem pente.</strong> Corta a parte de trás sempre com pente — de preferência o mesmo número dos lados ou um acima. Com pente, uma passagem torta deixa o cabelo um pouco mais comprido; sem pente, deixa uma falha.</li><li><strong>Passagens curtas e verticais.</strong> Inclina a cabeça para a frente, encosta o pente à base da nuca e sobe em linha reta até sentires a máquina deixar de cortar. Volta a baixo, desloca dois dedos para o lado e repete, da orelha esquerda à direita.</li><li><strong>Usa a mão livre para sentir.</strong> Passa os dedos no sentido contrário ao crescimento: um tufo mais comprido sente-se melhor do que se vê.</li></ul><p><strong>Para ver o resultado:</strong> grava um vídeo curto da nuca com a câmara frontal do telemóvel, ou fica de costas para o espelho da casa de banho com um espelho de mão à frente. Faz isto no fim de cada volta, não no fim do corte.</p><p><strong>O que deixar para outra pessoa:</strong> a linha da nuca e um degradê na parte de trás. Sozinho, mantém a linha natural e tira só os pelos soltos no pescoço. Muita gente corta em casa e vai à barbearia de dois em dois cortes para acertar a linha e a forma — é uma boa divisão de trabalho.</p>"
      },
      {
        id: "degrade",
        h2: "Degradê simples com máquina em casa",
        html: "<p>Um degradê é uma passagem gradual de curto (em baixo) para comprido (em cima). Em casa, com uma máquina simples, consegues um <strong>degradê baixo com três pentes</strong>:</p><ul class=\"rich-list\"><li><strong>Primeiro, tudo com o 3</strong> nos lados e na nuca.</li><li><strong>Depois o 2</strong>, só até à altura do topo das orelhas, com o movimento para fora no fim de cada passagem.</li><li><strong>Por fim o 1</strong>, só na faixa de baixo — dois a três dedos acima da linha da nuca e das patilhas.</li><li><strong>Suaviza as marcas</strong> entre faixas com o pente do meio, ou com a alavanca a meio caminho, em passagens curtas.</li></ul><p>Cada faixa tem de ficar mais baixa do que a anterior: é isso que dá o efeito. Se as marcas não desaparecem, para aí — fica um corte curto em degraus, que cresce bem. O <strong>degradê à pele</strong> (com lâmina a zero e transições ao milímetro) exige prática e é o mais difícil de corrigir; o guia dos <a href=\"../../revista/tipos-de-degrade-como-pedir-o-corte-certo/\">tipos de degradê</a> explica o que pedir quando preferires deixá-lo a um barbeiro.</p>"
      },
      {
        id: "crianca",
        h2: "Cortar o cabelo a uma criança com máquina",
        html: "<p>A técnica é a mesma; o que muda é o tempo e o ruído. Uma criança aguenta poucos minutos parada, e a vibração da máquina junto das orelhas é o que mais assusta.</p><ul class=\"rich-list\"><li><strong>Prepara tudo antes de a sentar:</strong> máquina carregada, pente encaixado, capa ou toalha, e algo para a distrair (um desenho animado ajuda).</li><li><strong>Apresenta a máquina:</strong> liga-a longe da cabeça, deixa-a ouvir e tocar com a mão antes de começar.</li><li><strong>Usa um pente comprido</strong> — um 3 ou 4 — e corta mais curto só numa próxima vez. Começa pela nuca e pelos lados de trás, longe da cara.</li><li><strong>Nunca sem pente junto das orelhas.</strong> Para contornar as orelhas e a franja, uma tesoura de pontas redondas é mais segura do que a máquina.</li><li><strong>Para quando for demais.</strong> Um corte em duas sessões curtas corre melhor do que uma sessão longa a chorar.</li></ul><p><strong>Bebés e crianças até aos 2 anos</strong> têm cabelo fino e pouco quieto: muitas vezes basta aparar à tesoura. Se é o primeiro corte, vê <a href=\"../../revista/primeiro-corte-de-cabelo-crianca-barbearia/\">como preparar o primeiro corte de cabelo</a>.</p><p>Para crianças com <strong>sensibilidade ao ruído ou ao toque</strong> — como acontece com algumas crianças autistas — ajuda antecipar o que vai acontecer, cortar sempre no mesmo sítio e à mesma hora, e dividir o corte em várias sessões. Há barbearias habituadas a estes cortes: vale a pena perguntar quando marcares.</p>"
      },
      {
        h2: "Os erros que dão mais trabalho a corrigir",
        html: "<ul class=\"rich-list\"><li><strong>Começar curto demais</strong> — o erro sem volta. Começa sempre acima.</li><li><strong>Pente mal encaixado ou máquina sem pente por engano</strong> — confirma o pente antes de cada passagem.</li><li><strong>Pressa na nuca</strong> — é a zona que não vês; faz devagar, com pente, e vê o resultado no telemóvel.</li><li><strong>Lâmina suja ou sem óleo</strong> — puxa o cabelo e deixa o corte irregular.</li><li><strong>Subir a linha da nuca ou das patilhas</strong> — tira só o que está abaixo da linha natural.</li></ul><p><strong>Se já correu mal:</strong> uma falha pequena disfarça-se passando a zona à volta com o mesmo número da falha, em passagens curtas. Uma falha grande ou um degradê torto corrigem-se melhor numa barbearia do que com mais tentativas em casa.</p>"
      },
      {
        h2: "Quando é melhor ir à barbearia",
        html: "<p>A manutenção de um corte curto faz-se bem em casa. Vale a pena ir à barbearia para mudar de corte, para degradês à pele, para cabelo encaracolado ou muito grosso e sempre que o resultado em casa deixar de te convencer — um barbeiro corrige em minutos o que em casa piora a cada tentativa. Saber o <a href=\"../../revista/quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal/\">preço médio de um corte</a> ajuda a fazer as contas. Se ainda não tens máquina, vê as <a href=\"../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/\">melhores máquinas para cortar cabelo em casa</a>.</p>"
      }
    ],
    faq: [
      ["Dá para cortar o cabelo sozinho com máquina?", "Sim, sobretudo cortes curtos com um ou dois números. A parte mais difícil é a nuca: corta-a sempre com pente, em passagens curtas e verticais, e confirma o resultado num vídeo do telemóvel ou com dois espelhos."],
      ["Como cortar o cabelo atrás sozinho?", "Inclina a cabeça para a frente, encosta o pente da máquina à base da nuca e sobe em linha reta, da orelha esquerda à direita. Usa a mão livre para sentir tufos mais compridos e deixa a linha da nuca natural."],
      ["Que número usar na primeira vez?", "Um acima do que queres. Se correr bem, desces um número na mesma sessão; se cortares demasiado à primeira, não há forma de voltar atrás."],
      ["Como se usam os pentes da máquina de cortar cabelo?", "Encaixa o pente até ao clique e confirma que não sai. O número é a altura de cabelo que fica: quanto maior, mais comprido. Passa com o pente encostado à cabeça, contra o crescimento."],
      ["Dá para fazer um degradê com uma máquina simples?", "Um degradê baixo, sim: tudo com o 3, depois o 2 até ao topo das orelhas e o 1 só na faixa de baixo. Um degradê à pele exige prática e é melhor deixá-lo a um barbeiro."],
      ["Cortar o cabelo com máquina estraga o cabelo?", "Não. A máquina corta o fio como a tesoura e não mexe na raiz. O que estraga o corte é uma lâmina suja ou sem óleo, que puxa o cabelo."],
      ["Cortar o cabelo na máquina engrossa os fios?", "Não. A grossura do fio depende da raiz, que o corte não toca. Ao crescer, o cabelo parece mais áspero porque a ponta cortada fica romba."],
      ["Como cortar o cabelo de uma criança com máquina?", "Com tudo preparado antes, um pente comprido (3 ou 4), a começar pela nuca e nunca sem pente junto das orelhas. Sessões curtas correm melhor; para bebés, a tesoura de pontas redondas costuma bastar."],
      ["Devo cortar o cabelo molhado ou seco com a máquina?", "Seco e limpo. Molhado, o cabelo parece mais comprido do que é e a máquina prende, o que deixa o corte irregular."],
      ["Com que frequência posso cortar o cabelo em casa?", "Depende do comprimento: cortes muito curtos perdem a forma ao fim de 2 a 4 semanas, porque o cabelo cresce cerca de 1 cm por mês."]
    ],
    faqCta: "Preferes deixar o corte a um profissional? Encontra uma barbearia no <a href=\"../../#explorar\">mapa do OndeCortar</a>.",
    related: ["numeros-da-maquina-de-cortar-cabelo", "melhores-maquinas-para-cortar-cabelo-em-casa", "tipos-de-degrade-como-pedir-o-corte-certo"],
    finalCta: {
      h2: "Pronto para o primeiro corte em casa?",
      text: "Uma máquina com os comprimentos bem marcados faz metade do trabalho. Compara as que recomendamos antes de comprar.",
      actions: [["../../loja/para-casa/", "Ver seleção para casa"], ["../../#explorar", "Ou encontrar uma barbearia"]]
    }
  }
];
