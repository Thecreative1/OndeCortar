// Artigos novos da revista (2026-10-05) — pesquisas confirmadas nas sugestões do Google PT:
// "números máquina cabelo", "pente máquina de cortar cabelo", "como cortar cabelo em casa",
// "como cortar cabelo masculino", "como aparar a barba", "...no pescoço", "...bigode com máquina".
// Sem preços, sem testes inventados. Medidas dos pentes = norma usada pela maioria das máquinas
// de barbearia (incrementos de 1/8"); as máquinas domésticas marcam os mm no próprio pente.
module.exports = [
  {
    slug: "numeros-da-maquina-de-cortar-cabelo",
    category: "maquinas-e-manutencao",
    title: "Números da máquina de cortar cabelo: tabela em mm e que número pedir",
    h1: "Números da máquina de cortar cabelo: quanto mede cada pente",
    description: "Pente 0, 1, 2, 3… quanto mede cada número da máquina de cortar cabelo em milímetros, que número pedir na barbearia e como usar os pentes em casa sem errar.",
    schemaDescription: "Tabela dos números dos pentes da máquina em milímetros, o que pedir na barbearia e como usar os pentes em casa.",
    image: "imagens/revista/maquinas-pentes-dourados.jpg",
    imageAlt: "Coleção de máquinas de cortar cabelo na bancada do barbeiro",
    readMinutes: 5,
    lede: "«Um 2 dos lados e tesoura em cima.» É a frase mais ouvida nas barbearias portuguesas — e quase ninguém sabe quanto é, afinal, um 2.",
    subcopy: "Cada número corresponde a um pente com uma altura fixa. Percebida a tabela, pedes o corte certo na barbearia e acertas o comprimento em casa à primeira.",
    heroActions: [["#tabela-numeros", "Ver a tabela"], ["../../index.html#explorar", "Encontrar barbearia no mapa"]],
    quick: [
      ["Quanto mede o número 1?", "Cerca de 3 mm. É um rapado curto em que já se vê o couro cabeludo."],
      ["E o número 2?", "Cerca de 6 mm. É o curto clássico das laterais e o número mais pedido nas barbearias."],
      ["O que é o número 0?", "É cortar sem pente. O comprimento depende da lâmina e da alavanca — normalmente entre 0,5 e 2 mm."],
      ["Todas as máquinas são iguais?", "Não. As máquinas de barbearia seguem quase todas a mesma tabela; as domésticas costumam indicar os milímetros no próprio pente."]
    ],
    summary: [
      "Cada número = um pente com altura fixa; quanto maior o número, mais comprido fica",
      "1 ≈ 3 mm · 2 ≈ 6 mm · 3 ≈ 10 mm · 4 ≈ 13 mm",
      "O 0 é sem pente: o comprimento depende da máquina",
      "Em casa, confirma os mm marcados no pente da tua máquina",
      "Na dúvida, começa um número acima — cortar mais é fácil, voltar atrás não",
      "O cabelo cresce cerca de 1 cm por mês"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Máquinas com os mm marcados",
      text: "As máquinas que recomendamos para casa indicam o comprimento em milímetros em cada pente ou na roda de ajuste.",
      actions: [["../../loja/maquinas-de-cortar/#comparar", "Comparar máquinas"], ["../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/", "Ver as melhores"]]
    },
    sections: [
      {
        h2: "Como funcionam os números da máquina",
        html: "<p>A lâmina de uma máquina de cortar cabelo corta sempre à mesma distância da pele. O que muda o comprimento é o <strong>pente</strong> — a peça de plástico que se encaixa por cima da lâmina e a afasta da cabeça. Cada pente tem uma altura fixa e um número gravado: quanto maior o número, mais comprido fica o cabelo.</p><p>Por isso, quando pedes «um 2», estás a pedir que o barbeiro use o pente número 2 e que o cabelo fique, em todo o lado onde ele passar, com cerca de 6 mm.</p>"
      },
      {
        id: "tabela-numeros",
        h2: "Tabela dos números em milímetros",
        html: "<p>Esta é a numeração usada pela grande maioria das máquinas de barbearia. Os valores são aproximados — podem variar um milímetro de marca para marca.</p>" +
          '<div class="oc-compare-wrap"><table class="oc-compare-table oc-numbers-table"><thead><tr><th scope="col">Número</th><th scope="col">Comprimento</th><th scope="col">Como fica</th></tr></thead><tbody>' +
          '<tr><th scope="row">0 (sem pente)</th><td data-label="Comprimento">0,5 a 2 mm*</td><td data-label="Como fica">Quase à pele; base dos degradês</td></tr>' +
          '<tr><th scope="row">½</th><td data-label="Comprimento">≈ 1,5 mm</td><td data-label="Como fica">Muito curto; transição do degradê</td></tr>' +
          '<tr><th scope="row">1</th><td data-label="Comprimento">≈ 3 mm</td><td data-label="Como fica">Rapado curto; vê-se o couro cabeludo</td></tr>' +
          '<tr><th scope="row">1½</th><td data-label="Comprimento">≈ 4,5 mm</td><td data-label="Como fica">Entre o 1 e o 2; suaviza transições</td></tr>' +
          '<tr><th scope="row">2</th><td data-label="Comprimento">≈ 6 mm</td><td data-label="Como fica">Curto clássico das laterais</td></tr>' +
          '<tr><th scope="row">3</th><td data-label="Comprimento">≈ 10 mm</td><td data-label="Como fica">Curto que já cobre o couro cabeludo</td></tr>' +
          '<tr><th scope="row">4</th><td data-label="Comprimento">≈ 13 mm</td><td data-label="Como fica">Laterais cheias ou topo curto</td></tr>' +
          '<tr><th scope="row">5</th><td data-label="Comprimento">≈ 16 mm</td><td data-label="Como fica">Topo curto com algum volume</td></tr>' +
          '<tr><th scope="row">6</th><td data-label="Comprimento">≈ 19 mm</td><td data-label="Como fica">Comprimento médio-curto</td></tr>' +
          '<tr><th scope="row">7</th><td data-label="Comprimento">≈ 22 mm</td><td data-label="Como fica">Médio; já se nota o penteado</td></tr>' +
          '<tr><th scope="row">8</th><td data-label="Comprimento">≈ 25 mm</td><td data-label="Como fica">O pente mais comprido habitual (2,5 cm)</td></tr>' +
          "</tbody></table></div>" +
          '<p class="oc-numbers-note">* Sem pente, o comprimento depende da lâmina e da posição da alavanca: mais fechada corta mais rente.</p>'
      },
      {
        h2: "Que número pedir na barbearia",
        html: "<p>Um pedido completo diz o número das laterais e o que fazer em cima. Alguns exemplos que os barbeiros entendem à primeira:</p><ul class=\"rich-list\"><li><strong>«Um 2 dos lados e tesoura em cima»</strong> — o corte curto clássico: laterais limpas e o topo com comprimento para pentear.</li><li><strong>«Um 1 em toda a cabeça»</strong> — rapado uniforme, sem diferença entre topo e laterais.</li><li><strong>«Degradê do 0 ao 2»</strong> — começa sem pente junto à orelha e sobe até ao 2. A altura da transição (baixa, média ou alta) também se pede; está explicada no guia dos <a href=\"../../revista/tipos-de-degrade-como-pedir-o-corte-certo/\">tipos de degradê</a>.</li><li><strong>«Um 3 dos lados e um 5 em cima»</strong> — curto mas sem se ver a pele, para quem não quer tesoura.</li></ul><p>Se nunca fizeste aquele corte, começa um número acima do que pensas querer. Ficar comprido demais corrige-se na hora; curto demais só se resolve com tempo.</p>"
      },
      {
        h2: "Números nas máquinas para casa",
        html: "<p>Muitas máquinas domésticas não usam números: indicam diretamente os milímetros em cada pente ou numa roda de ajuste. A Philips Series 5000 HC5630, por exemplo, tem uma roda com 28 posições entre 0,5 e 28 mm; a Remington ColourCut traz pentes coloridos de 1,5 a 25 mm. É a forma mais segura de acertar: lê o valor gravado no pente e usa a tabela acima como referência.</p><p>Quando a tua máquina usa números, confirma a correspondência no manual — o «número 2» de uma marca pode ter um milímetro a mais ou a menos do que o de outra. Se estás a escolher máquina, o nosso guia das <a href=\"../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/\">melhores máquinas para cortar cabelo em casa</a> compara pentes e comprimentos de cada uma.</p>"
      },
      {
        h2: "Como usar os pentes sem errar",
        html: "<p>Três regras evitam a maioria dos acidentes em casa:</p><ul class=\"rich-list\"><li><strong>Confirma o pente antes de ligar.</strong> O erro clássico é passar a máquina sem pente ou com um número abaixo do previsto — e aí não há volta a dar.</li><li><strong>Garante que o pente está bem encaixado.</strong> Um pente que salta a meio da passagem deixa uma falha visível.</li><li><strong>Corta contra o sentido do crescimento</strong>, com movimentos lentos e o pente sempre encostado à cabeça.</li></ul><p>O passo a passo completo — laterais, nuca, topo e contornos — está no guia <a href=\"../../revista/como-cortar-o-cabelo-em-casa-com-maquina/\">como cortar o cabelo em casa com máquina</a>.</p>"
      },
      {
        h2: "Quanto tempo dura cada número",
        html: "<p>O cabelo cresce, em média, cerca de 1 cm por mês. Na prática, um 1 (3 mm) passa a parecer um 4 ao fim de um mês, e um 2 (6 mm) chega perto dos 16 mm. É por isso que os cortes muito curtos e os degradês pedem retoque a cada 2 a 4 semanas, enquanto um corte com mais comprimento aguenta mais tempo sem perder a forma.</p>"
      }
    ],
    faq: [
      ["O número 1 da máquina são quantos milímetros?", "Cerca de 3 mm na numeração usada pela maioria das máquinas de barbearia. É um rapado curto em que já se vê o couro cabeludo."],
      ["Qual é a diferença entre o número 0 e o número 1?", "O 0 é cortar sem pente: fica entre 0,5 e 2 mm, conforme a máquina e a alavanca. O 1 usa o pente de cerca de 3 mm e deixa o cabelo um pouco mais cheio."],
      ["Que número pedir para um corte curto mas sem se ver a pele?", "Um 3 (cerca de 10 mm) ou acima. Do 2 para baixo, a pele começa a notar-se, sobretudo em cabelo claro ou fino."],
      ["Os pentes são iguais em todas as marcas?", "Não exatamente. As máquinas de barbearia seguem quase todas a mesma tabela, com diferenças de cerca de um milímetro. As máquinas domésticas costumam gravar os milímetros no próprio pente — confirma sempre esse valor."]
    ],
    faqCta: "Preferes que seja um profissional a escolher o número? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["tipos-de-degrade-como-pedir-o-corte-certo", "como-cortar-o-cabelo-em-casa-com-maquina", "melhores-maquinas-para-cortar-cabelo-em-casa"],
    finalCta: {
      h2: "Já sabes o número — falta o resto",
      text: "Se vais cortar em casa, escolhe uma máquina com os comprimentos bem marcados. Se preferes a barbearia, encontra uma perto de ti.",
      actions: [["../../index.html#explorar", "Ver mapa de barbearias"], ["../../loja/maquinas-de-cortar/", "Ver máquinas de cortar"]]
    }
  },
  {
    slug: "como-cortar-o-cabelo-em-casa-com-maquina",
    category: "conteudo-pratico",
    title: "Como cortar o cabelo em casa com máquina: passo a passo",
    h1: "Como cortar o cabelo em casa com máquina, passo a passo",
    description: "Do material ao acabamento: como cortar o cabelo masculino em casa com máquina, que números usar, como fazer uma transição simples e os erros que dão mais trabalho a corrigir.",
    schemaDescription: "Passo a passo para cortar o cabelo em casa com máquina: material, números, transição, contornos e erros a evitar.",
    image: "imagens/revista/bancada-maquinas-tesouras.jpg",
    imageAlt: "Ferramentas de barbeiro profissionais na bancada",
    readMinutes: 6,
    lede: "Cortar o cabelo em casa com máquina não exige talento — exige ordem. A maioria dos cortes que correm mal falha no mesmo sítio: começa curto demais e com pressa.",
    subcopy: "Este é o método mais seguro para um corte curto de manutenção: números conservadores primeiro, laterais antes do topo, e os contornos no fim.",
    heroActions: [["#passo-a-passo", "Ver passo a passo"], ["../../revista/numeros-da-maquina-de-cortar-cabelo/", "Tabela dos números"]],
    quick: [
      ["Que número usar para começar?", "Um acima do que queres. Se o objetivo é um 2 nas laterais, faz primeiro tudo com o 3 e só depois desce."],
      ["Molhado ou seco?", "Seco e limpo. A máquina desliza melhor e vês o comprimento real enquanto cortas."],
      ["Por onde começar?", "Laterais e nuca, de baixo para cima e contra o crescimento. O topo e os contornos ficam para o fim."],
      ["E o degradê?", "Uma transição simples entre dois números faz-se em casa. Um degradê à pele é trabalho para barbeiro."]
    ],
    summary: [
      "Cabelo limpo e seco, capa ou toalha, e dois espelhos ou alguém para ajudar",
      "Começa sempre um número acima do objetivo",
      "Laterais e nuca primeiro, de baixo para cima, contra o crescimento",
      "Transição: número intermédio na zona de junção, com movimento para fora",
      "Contornos com aparador ou máquina sem pente, sem subir a linha da nuca",
      "Limpa e lubrifica a lâmina no fim"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "O que precisas para cortar em casa",
      text: "Máquinas com vários comprimentos, capa e manutenção — escolhidas para quem corta em casa.",
      actions: [["../../loja/para-casa/", "Ver seleção para casa"], ["../../loja/maquinas-de-cortar/#comparar", "Comparar máquinas"]]
    },
    sections: [
      {
        h2: "O que precisas antes de começar",
        html: "<ul class=\"rich-list\"><li><strong>Máquina com pentes</strong> — com os comprimentos bem marcados (em mm ou por número). Ver a <a href=\"../../revista/numeros-da-maquina-de-cortar-cabelo/\">tabela dos números da máquina</a>.</li><li><strong>Dois espelhos</strong> (um à frente e outro de mão para ver a nuca) ou alguém que ajude na parte de trás.</li><li><strong>Capa ou toalha</strong> e um sítio fácil de varrer.</li><li><strong>Pente e, se quiseres trabalhar o topo, tesoura.</strong></li><li><strong>Aparador ou máquina sem pente</strong> para os contornos à volta das orelhas e na nuca.</li></ul><p>O cabelo deve estar <strong>limpo e completamente seco</strong>. Molhado parece mais comprido do que é e a máquina prende.</p>"
      },
      {
        id: "passo-a-passo",
        h2: "Passo 1: laterais e nuca com um número acima",
        html: "<p>Encaixa o pente um número acima do comprimento final — se queres um 2, começa com o 3. Começa pela patilha e sobe pela lateral, contra o sentido do crescimento, com o pente sempre encostado à cabeça. Faz passagens sobrepostas e lentas: é melhor passar duas vezes no mesmo sítio do que deixar falhas.</p><p>Repete do outro lado e na nuca. Na nuca, inclina a cabeça para a frente e usa o espelho de mão. Só quando tudo estiver uniforme é que trocas para o número final e repetes.</p>"
      },
      {
        h2: "Passo 2: o topo",
        html: "<p>Se queres o mesmo comprimento em toda a cabeça, passa a máquina com o mesmo número no topo, da testa para trás. Se queres o topo mais comprido, usa um pente maior (por exemplo, 2 dos lados e 4 ou 5 em cima) ou apara à tesoura, segurando o cabelo entre os dedos.</p>"
      },
      {
        h2: "Passo 3: uma transição simples",
        html: "<p>Quando as laterais ficam mais curtas do que o topo, há uma «marca» na zona onde os dois comprimentos se encontram. Para a suavizar, usa o número intermédio só nessa faixa — por exemplo, um 3 entre um 2 e um 4 — com um movimento curto em que afastas a máquina da cabeça no fim da passagem.</p><p>Não tentes um degradê à pele em casa na primeira vez: é a parte que exige mais prática e a mais difícil de corrigir. O guia dos <a href=\"../../revista/tipos-de-degrade-como-pedir-o-corte-certo/\">tipos de degradê</a> explica o que pedir quando preferires deixá-lo a um barbeiro.</p>"
      },
      {
        h2: "Passo 4: contornos das orelhas e da nuca",
        html: "<p>Com o aparador, ou com a máquina sem pente, limpa à volta das orelhas dobrando-as ligeiramente para a frente. Na nuca, segue a linha natural do cabelo: tira só os pelos soltos abaixo dela. Subir a linha para «ficar mais limpo» é o erro mais comum e demora semanas a crescer.</p><p>No fim, passa a mão pelo cabelo no sentido contrário e revê ao espelho de frente e de lado — as falhas vêem-se melhor com a luz a bater de lado.</p>"
      },
      {
        h2: "Passo 5: limpar e guardar a máquina",
        html: "<p>Retira o pente, sacode os pelos e escova a lâmina. Uma gota de óleo nos dentes mantém o corte suave no próximo uso. O passo a passo da manutenção está em <a href=\"../../revista/como-limpar-uma-maquina-de-cortar-cabelo/\">como limpar uma máquina de cortar cabelo</a>.</p>"
      },
      {
        h2: "Os erros que dão mais trabalho a corrigir",
        html: "<ul class=\"rich-list\"><li><strong>Começar curto demais</strong> — o erro sem volta. Começa sempre acima.</li><li><strong>Ligar a máquina sem pente por engano</strong> — confirma o pente antes de cada passagem.</li><li><strong>Pressa na nuca</strong> — é a zona que não vês; faz devagar e com espelho de mão.</li><li><strong>Lâmina suja ou sem óleo</strong> — puxa o cabelo e deixa o corte irregular.</li><li><strong>Subir a linha da nuca ou das patilhas</strong> — tira só o que está abaixo da linha natural.</li></ul>"
      },
      {
        h2: "Quando é melhor ir à barbearia",
        html: "<p>A manutenção de um corte curto faz-se bem em casa. Vale a pena ir à barbearia para mudar de corte, para degradês à pele, para cabelo encaracolado ou muito grosso e sempre que o resultado em casa deixar de te convencer — um barbeiro corrige em minutos o que em casa piora a cada tentativa. Saber o <a href=\"../../revista/quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal/\">preço médio de um corte</a> ajuda a fazer as contas.</p>"
      }
    ],
    faq: [
      ["Dá para cortar o cabelo sozinho com máquina?", "Sim, sobretudo cortes curtos com o mesmo número ou com dois números. A parte mais difícil é a nuca: usa um espelho de mão ou pede ajuda para essa zona."],
      ["Devo cortar o cabelo molhado ou seco com a máquina?", "Seco e limpo. Molhado, o cabelo parece mais comprido do que é e a máquina prende, o que deixa o corte irregular."],
      ["Com que frequência posso cortar o cabelo em casa?", "Depende do comprimento: cortes muito curtos perdem a forma ao fim de 2 a 4 semanas, porque o cabelo cresce cerca de 1 cm por mês."],
      ["Que número usar na primeira vez?", "Um acima do que queres. Se correr bem, desces um número na mesma sessão; se cortares demasiado à primeira, não há forma de voltar atrás."]
    ],
    faqCta: "Preferes deixar o corte a um profissional? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["numeros-da-maquina-de-cortar-cabelo", "melhores-maquinas-para-cortar-cabelo-em-casa", "como-limpar-uma-maquina-de-cortar-cabelo"],
    finalCta: {
      h2: "Pronto para o primeiro corte em casa?",
      text: "Uma máquina com os comprimentos bem marcados faz metade do trabalho. Compara as que recomendamos antes de comprar.",
      actions: [["../../loja/para-casa/", "Ver seleção para casa"], ["../../index.html#explorar", "Ou encontrar uma barbearia"]]
    }
  },
  {
    slug: "como-aparar-a-barba-em-casa",
    category: "cuidados-com-a-barba",
    title: "Como aparar a barba em casa: pescoço, bochechas e bigode",
    h1: "Como aparar a barba em casa: pescoço, bochechas e bigode",
    description: "Passo a passo para aparar a barba em casa: que comprimento escolher, onde marcar a linha do pescoço, como alinhar as bochechas e aparar o bigode com máquina ou tesoura.",
    schemaDescription: "Como aparar a barba em casa: comprimento, linha do pescoço, bochechas, bigode e acabamento.",
    image: "imagens/revista/aparar-barba-tesoura.jpg",
    imageAlt: "Aparar a barba à tesoura, em contraluz",
    readMinutes: 5,
    lede: "Uma barba bem aparada não depende do comprimento — depende de três linhas: a do pescoço, a das bochechas e a do bigode.",
    subcopy: "Acerta as três com o método certo e a barba parece cuidada mesmo com poucos dias de crescimento. Falha a do pescoço e nenhum óleo resolve.",
    heroActions: [["#passo-a-passo", "Ver passo a passo"], ["../../loja/trimmers-e-shavers/", "Ver aparadores"]],
    quick: [
      ["Onde fica a linha do pescoço?", "Cerca de um a dois dedos acima da maçã de Adão, numa curva de orelha a orelha. Tudo abaixo apara-se rente."],
      ["Molhada ou seca?", "Seca e penteada. A barba molhada parece mais comprida e acabas por tirar mais do que querias."],
      ["Máquina ou tesoura?", "Aparador com pente para o comprimento; aparador sem pente ou tesoura para o bigode e os contornos."],
      ["Com que frequência?", "Contornos a cada poucos dias; comprimento a cada uma a duas semanas, conforme o crescimento."]
    ],
    summary: [
      "Barba lavada, seca e penteada no sentido do crescimento",
      "Comprimento: começa pelo pente mais longo e desce aos poucos",
      "Pescoço: linha a um ou dois dedos acima da maçã de Adão",
      "Bochechas: segue a linha natural, baixa só os pelos soltos",
      "Bigode: penteado para baixo, aparado ao longo do lábio",
      "Acabamento com óleo ou bálsamo"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Aparadores de barba",
      text: "Aparadores com vários comprimentos e cabeças de precisão para contornos — com o que cada um faz bem e onde fica aquém.",
      actions: [["../../loja/trimmers-e-shavers/", "Ver aparadores"], ["../../loja/oleos-e-balms/", "Óleos e bálsamos"]]
    },
    sections: [
      {
        h2: "Antes de começar",
        html: "<p>Lava a barba e deixa-a secar por completo. Penteia-a no sentido do crescimento — assim os pelos ficam no sítio onde vão estar no dia a dia e vês o comprimento real. Precisas de um <strong>aparador com pentes</strong> e, para o bigode e os contornos, de um aparador sem pente ou de uma tesoura pequena.</p><p>Trabalha num sítio com boa luz e, se possível, com um segundo espelho para ver o pescoço de lado.</p>"
      },
      {
        id: "passo-a-passo",
        h2: "Passo 1: o comprimento geral",
        html: "<p>Escolhe um pente mais comprido do que o comprimento que queres e passa o aparador contra o sentido do crescimento, em passagens lentas e sobrepostas. Se ficar comprido demais, desce um número e repete. Cortar aos poucos é mais lento, mas é a única forma de não perder semanas de barba numa passagem.</p><p>Muita gente deixa o queixo um ou dois números mais comprido do que as laterais: alonga o rosto e dá forma à barba sem esforço.</p>"
      },
      {
        h2: "Passo 2: a linha do pescoço",
        html: "<p>É a linha que mais muda o resultado. A referência mais usada pelos barbeiros: coloca um ou dois dedos acima da maçã de Adão — é aí que fica o ponto mais baixo da barba. A partir desse ponto, imagina uma curva que sobe até atrás de cada orelha.</p><p>Tudo o que estiver abaixo dessa linha apara-se rente, com o aparador sem pente ou com uma lâmina. O erro mais comum é subir a linha até à mandíbula: a barba parece menor e o rosto mais largo. Se tens pele sensível nesta zona, vê como <a href=\"../../revista/como-reduzir-irritacao-ao-fazer-a-barba/\">reduzir a irritação ao fazer a barba</a>.</p>"
      },
      {
        h2: "Passo 3: as bochechas",
        html: "<p>Na maioria dos casos, a linha natural das bochechas é a melhor. Limita-te a tirar os pelos soltos acima dela, com o aparador de lado. Se quiseres uma linha mais definida, baixa-a ligeiramente — mas nunca de uma vez: tira um pouco de cada lado e compara ao espelho de frente.</p>"
      },
      {
        h2: "Passo 4: o bigode",
        html: "<p>Penteia o bigode para baixo, sobre o lábio. Com o aparador sem pente ou com tesoura, apara ao longo do lábio superior para que os pelos não passem da linha da boca. Nos cantos, segue a forma natural do bigode até à barba.</p><p>Com máquina, usa a parte de cima da lâmina e movimentos curtos; com tesoura, corta pelo menos um ou dois milímetros acima do que parece certo — o bigode encolhe quando volta à posição normal.</p>"
      },
      {
        h2: "Passo 5: acabamento",
        html: "<p>Penteia tudo de novo e revê a simetria ao espelho, de frente e de lado. Limpa os contornos com a cabeça de precisão do aparador, se a tiver. No fim, umas gotas de óleo ou um pouco de bálsamo amaciam os pelos e disciplinam a forma — a rotina completa está em <a href=\"../../revista/como-montar-uma-rotina-simples-de-barba-em-casa/\">como montar uma rotina simples de barba em casa</a>.</p>"
      },
      {
        h2: "Os erros mais comuns",
        html: "<ul class=\"rich-list\"><li><strong>Linha do pescoço alta demais</strong> — a barba encolhe e o rosto parece mais largo.</li><li><strong>Aparar com a barba molhada</strong> — parece mais comprida e acabas por tirar demais.</li><li><strong>Fazer um lado inteiro e depois o outro</strong> — alterna os lados para manter a simetria.</li><li><strong>Descer muitos números de uma vez</strong> — vai devagar, sobretudo no queixo.</li><li><strong>Lâminas sujas</strong> — puxam o pelo e irritam a pele.</li></ul>"
      }
    ],
    faq: [
      ["Onde deve ficar a linha da barba no pescoço?", "A referência mais usada é um a dois dedos acima da maçã de Adão, numa curva que sobe até atrás das orelhas. Tudo abaixo dessa linha apara-se rente."],
      ["É melhor aparar a barba molhada ou seca?", "Seca e penteada. Molhada, a barba parece mais comprida do que é e é fácil tirar demasiado."],
      ["Como aparar o bigode com máquina?", "Penteia o bigode para baixo e usa o aparador sem pente, com a parte de cima da lâmina, em movimentos curtos ao longo do lábio superior."],
      ["De quanto em quanto tempo devo aparar a barba?", "Os contornos ficam melhor se forem limpos a cada poucos dias. O comprimento geral costuma pedir um retoque a cada uma ou duas semanas, conforme o crescimento."]
    ],
    faqCta: "Queres uma primeira forma feita por um profissional? Encontra uma barbearia no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>.",
    related: ["como-montar-uma-rotina-simples-de-barba-em-casa", "trimmer-vs-shaver-diferencas-reais", "como-reduzir-irritacao-ao-fazer-a-barba"],
    finalCta: {
      h2: "Já sabes onde passar o aparador",
      text: "Um aparador com vários comprimentos e uma cabeça de precisão resolve as três linhas. Compara os que recomendamos.",
      actions: [["../../loja/trimmers-e-shavers/", "Ver aparadores"], ["../../revista/cuidados-com-a-barba/", "Mais sobre barba"]]
    }
  }
];
