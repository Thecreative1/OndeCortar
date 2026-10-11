// 2026-10-11 — lote 1 de detalhes de produto (os mais procurados). Aplicar com
// node scripts/apply-product-details.js. Fontes: fichas da Amazon.es consultadas a 2026-10-11
// (título, características, detalhes técnicos, descrição) e sugestões do Google PT para cada
// produto ("vs", "sem fio", "rpm", "como usar", "para que serve", versões). Só factos da marca;
// sem preços, avaliações nem "testámos". Perguntas = sugestões do Google com resposta verificável.
const FONTE = "Características publicadas pela marca na Amazon.es, consultadas a 11 de outubro de 2026. Confirma o modelo antes de comprar.";

module.exports = [
  {
    slug: "philips-hc5630-series-5000",
    title: "Philips HC5630 (Série 5000): características e como usar",
    description: "Philips Série 5000 HC5630: 28 comprimentos de 0,5 a 28 mm, até 90 minutos sem fio, o que vem na caixa, como usar e para quem faz sentido.",
    porque: [
      "É a nossa escolha para quem corta o cabelo em casa: uma roda com 28 comprimentos (de 0,5 a 28 mm) permite descer meio número sem trocar de pente, que é o que mais complica um corte em casa.",
      "Funciona sem fio até 90 minutos, segundo a Philips, e traz pente para a barba e dois pentes para o cabelo. Para um primeiro corte com menos dúvidas, a {{remington-colourcut-hc5035|Remington ColourCut}} é mais simples; para uso diário de barbearia, a {{wahl-super-taper|Wahl Super Taper}} aguenta mais horas seguidas."
    ],
    paraQuem: "Para quem corta o próprio cabelo ou o da família algumas vezes por mês e quer controlar o comprimento ao milímetro, sem andar a trocar pentes.",
    ficha: [
      ["Modelo", "Philips Série 5000 HC5630/15"],
      ["Comprimentos", "28 posições na roda, de 0,5 a 28 mm"],
      ["Lâminas", "Autoafiáveis, de duplo fio (aço inoxidável)"],
      ["Alimentação", "Bateria, até 90 minutos sem fio"],
      ["Na caixa", "Escova de limpeza, pente para a barba, 2 pentes para o cabelo (curto e comprido) e bolsa"],
      ["Para", "Cabelo e barba"]
    ],
    fonte: FONTE,
    versao: "O código desta página é o HC5630/15. A Série 5000 tem outros modelos (como o HC5650), que são versões diferentes: confirma o código no título da Amazon antes de comprar.",
    comoUsar: [
      "Escolhe o comprimento na roda e começa pelo mais comprido: é mais fácil voltar a passar mais curto do que corrigir.",
      "Passa a máquina contra o sentido do crescimento, com o pente bem encostado à cabeça.",
      "Para o degradê, desce um ou dois números nas laterais e na nuca e passa por baixo da linha anterior.",
      "No fim, tira os pelos com a escova incluída e limpa as lâminas antes de guardar."
    ],
    faq: [
      ["A Philips HC5630 é sem fio?", "Sim. Segundo a Philips, funciona até 90 minutos sem fio com uma carga."],
      ["Que comprimentos tem a Philips HC5630?", "28 posições numa roda de ajuste, de 0,5 a 28 mm."],
      ["A Philips HC5630 serve para a barba?", "Serve: traz um pente-guia próprio para a barba, além dos dois pentes para o cabelo."],
      ["Qual a diferença entre a HC5630 e a HC5650?", "São modelos diferentes da Série 5000. Nesta página falamos só da HC5630/15; confirma sempre o código no título antes de comprar."]
    ]
  },
  {
    slug: "philips-oneblade-360-qp2724",
    title: "Philips OneBlade 360 QP2724: lâminas, pentes e como usar",
    description: "Philips OneBlade 360 QP2724: lâmina 360, pentes de 1, 3 e 5 mm, uso no duche, quanto dura a lâmina e a diferença para o OneBlade Pro 360.",
    porque: [
      "É a forma mais simples de manter uma barba curta e os contornos limpos com uma só máquina: apara, faz o contorno e rapa, sem lâminas de barbear.",
      "A lâmina 360 inclina-se em todas as direções para seguir o maxilar, e a Philips diz que dura até 4 meses, com um aviso quando é hora de a trocar. Se queres também aparar o corpo ou ter mais comprimentos, o {{philips-oneblade-pro-360|OneBlade Pro 360}} traz pente de 20 posições e kit corporal."
    ],
    paraQuem: "Para quem usa barba de poucos dias ou curta e quer aparar, contornar e rapar com o mesmo aparelho, em seco ou no duche.",
    ficha: [
      ["Modelo", "Philips OneBlade 360 QP2724/31"],
      ["Lâmina", "360, de aço inoxidável; 12 000 movimentos por minuto, segundo a marca"],
      ["Pentes", "3 pentes para barba de poucos dias: 1, 3 e 5 mm"],
      ["Bateria", "Ni-MH, cerca de 45 minutos"],
      ["Água", "100% resistente à água: seco, molhado ou no duche"],
      ["Na caixa", "OneBlade 360, 2 lâminas 360, 3 pentes, tampa de proteção e bolsa (adaptador de corrente não incluído)"]
    ],
    fonte: FONTE,
    versao: "QP2724/31 é o OneBlade 360 para o rosto, com 2 lâminas e 3 pentes de barba. O {{philips-oneblade-pro-360|OneBlade Pro 360 Face + Body}} tem pente de 20 comprimentos (0,4 a 10 mm), kit corporal e até 120 minutos de bateria.",
    comoUsar: [
      "Para aparar, encaixa o pente com o comprimento que queres e passa contra o sentido do pelo.",
      "Para contornar, tira o pente e usa a aresta da lâmina na linha do pescoço e das maçãs do rosto.",
      "Para rapar, passa sem pente, com movimentos curtos e sem carregar.",
      "No fim, passa a lâmina por água corrente e deixa secar."
    ],
    faq: [
      ["Qual a diferença entre o OneBlade 360 e o OneBlade Pro 360?", "O 360 (QP2724) traz 3 pentes de barba (1, 3 e 5 mm) e cerca de 45 minutos de bateria. O Pro 360 Face + Body tem pente de 20 comprimentos, kit corporal e até 120 minutos."],
      ["De quanto em quanto tempo se troca a lâmina do OneBlade?", "A Philips indica que a lâmina dura até 4 meses e mostra um aviso quando é altura de a substituir."],
      ["O OneBlade 360 pode usar-se no duche?", "Sim. É 100% resistente à água e pode usar-se em seco ou molhado."],
      ["O OneBlade 360 traz carregador?", "Segundo a ficha da Amazon, o adaptador de corrente não está incluído nesta versão."]
    ]
  },
  {
    slug: "philips-oneblade-pro-360",
    title: "Philips OneBlade Pro 360 Face + Body: o que tem e como usar",
    description: "Philips OneBlade Pro 360 Face + Body: pente de 20 comprimentos (0,4 a 10 mm), kit corporal, 120 minutos de bateria e a diferença para o OneBlade 360.",
    porque: [
      "É o OneBlade para quem quer mais do que uma barba de poucos dias: o pente de precisão tem 20 comprimentos, de 0,4 a 10 mm, e o kit corporal permite aparar o corpo com um protetor de pele.",
      "A Philips indica até 120 minutos de bateria e lâminas que duram até 4 meses. Se só precisas de manter a barba curta, o {{philips-oneblade-360-qp2724|OneBlade 360 (QP2724)}} faz o essencial com menos acessórios."
    ],
    paraQuem: "Para quem quer controlar o comprimento da barba ao pormenor e usar o mesmo aparelho no rosto e no corpo.",
    ficha: [
      ["Modelo", "Philips OneBlade Pro 360 Face + Body QP6552/30"],
      ["Lâminas", "2 lâminas 360 de aço inoxidável; 12 000 movimentos por minuto, segundo a marca"],
      ["Comprimentos", "Pente de precisão com 20 posições, de 0,4 a 10 mm"],
      ["Corpo", "Kit corporal: pente de encaixe e protetor de pele"],
      ["Bateria", "Até 120 minutos"],
      ["Água", "100% resistente à água: seco ou molhado, com ou sem espuma"]
    ],
    fonte: FONTE,
    versao: "Esta é a versão QP6552/30 (Face + Body). Há outros códigos do Pro 360 (como QP6542 ou QP6652) com acessórios diferentes: confirma o código no título da Amazon antes de comprar.",
    comoUsar: [
      "Escolhe o comprimento no pente de precisão e apara a barba contra o sentido do pelo.",
      "Tira o pente para fazer os contornos com a aresta da lâmina.",
      "Para o corpo, troca para o pente corporal e o protetor de pele e passa devagar, sem esticar a pele demasiado.",
      "Passa a lâmina por água no fim e deixa secar antes de tapar."
    ],
    faq: [
      ["Qual a diferença entre o OneBlade Pro 360 e o OneBlade 360 normal?", "O Pro 360 tem pente de 20 comprimentos (0,4 a 10 mm), kit corporal e até 120 minutos de bateria. O 360 normal (QP2724) traz 3 pentes de barba e cerca de 45 minutos."],
      ["O OneBlade Pro 360 serve para o corpo?", "Sim, esta versão Face + Body traz um kit corporal com pente de encaixe e protetor de pele."],
      ["Quanto tempo dura a bateria do OneBlade Pro 360?", "Segundo a Philips, até 120 minutos."],
      ["Quanto tempo dura a lâmina?", "A marca indica até 4 meses, com um aviso na lâmina quando é altura de a trocar."]
    ]
  },
  {
    slug: "remington-colourcut-hc5035",
    title: "Remington ColourCut HC5035: comprimentos, pentes e uso",
    description: "Remington ColourCut HC5035: máquina com fio, 9 pentes coloridos de 1,5 a 25 mm, alavanca de 0,5 a 2 mm e acessórios para o primeiro corte em casa.",
    porque: [
      "É a máquina mais fácil para quem nunca cortou o cabelo em casa: cada um dos 9 pentes tem uma cor, de 1,5 a 25 mm, e assim não se confunde o 2 com o 3 a meio do corte.",
      "Funciona com fio, por isso não fica sem bateria a meio, e traz tesoura, pente, escova de pescoço e pentes para a zona das orelhas. Quem quer descer meio número sem trocar de pente fica melhor com a {{philips-hc5630-series-5000|Philips Série 5000}}."
    ],
    paraQuem: "Para quem vai fazer os primeiros cortes em casa e quer pentes fáceis de distinguir e tudo o que precisa na mesma caixa.",
    ficha: [
      ["Modelo", "Remington ColourCut HC5035"],
      ["Alimentação", "Com fio"],
      ["Pentes", "9 pentes coloridos, de 1,5 a 25 mm"],
      ["Alavanca", "Ajuste fino de 0,5 a 2 mm"],
      ["Lâminas", "Aço inoxidável, autoafiáveis"],
      ["Na caixa", "Pentes para as orelhas, escova de limpeza, escova de pescoço, tesoura e pente"]
    ],
    fonte: FONTE,
    versao: "A HC5035 é a versão com fio da ColourCut. Se procuras uma máquina sem fio, esta não é: vê a {{wahl-rapid-clip|Wahl Rapid Clip}} ou a {{philips-hc5630-series-5000|Philips Série 5000}}.",
    comoUsar: [
      "Escolhe o pente pela cor e começa pelo mais comprido.",
      "Usa a alavanca para afinar entre números (0,5 a 2 mm) sem trocar de pente.",
      "Passa contra o sentido do crescimento, com o pente encostado.",
      "Acaba o contorno à volta das orelhas com o pente próprio e tira os pelos do pescoço com a escova."
    ],
    faq: [
      ["A Remington ColourCut HC5035 é sem fio?", "Não. A HC5035 funciona com fio."],
      ["Que comprimentos tem a Remington ColourCut?", "9 pentes coloridos de 1,5 a 25 mm e uma alavanca de ajuste fino de 0,5 a 2 mm."],
      ["Para que servem as cores dos pentes?", "Cada comprimento tem uma cor, para reconhecer o pente sem ler o número a meio do corte."],
      ["A ColourCut serve para principiantes?", "É pensada para isso: pentes fáceis de distinguir e acessórios para o corte completo em casa."]
    ]
  },
  {
    slug: "wahl-rapid-clip",
    title: "Wahl Rapid Clip: autonomia, pentes e como usar",
    description: "Wahl Rapid Clip: máquina sem fio com até 120 minutos de autonomia, também com cabo, 10 pentes de 3 a 28 mm e lâminas que se tiram para limpar.",
    porque: [
      "Junta o melhor dos dois mundos para cortar em casa: até 120 minutos sem fio, segundo a Wahl, e a possibilidade de continuar com o cabo quando a bateria acaba.",
      "Traz 10 pentes, de 3 a 28 mm, e as lâminas tiram-se para limpar, o que ajuda a manter a máquina higiénica. Para cortes muito curtos, a {{philips-hc5630-series-5000|Philips Série 5000}} desce até 0,5 mm."
    ],
    paraQuem: "Para quem quer cortar em casa sem estar preso à tomada e não quer ficar sem máquina a meio do corte.",
    ficha: [
      ["Modelo", "Wahl Rapid Clip 9657-0460"],
      ["Alimentação", "Bateria de iões de lítio: até 120 minutos sem fio; também funciona com cabo"],
      ["Carga", "Cerca de 7 horas para a carga completa"],
      ["Pentes", "10 pentes, de 3 a 28 mm"],
      ["Lâminas", "De precisão, autoafiáveis e amovíveis para limpar"],
      ["Na caixa", "Carregador USB e escova de limpeza"]
    ],
    fonte: FONTE,
    versao: "Esta é a Rapid Clip (com e sem fio). Não confundir com a Wahl Magic Clip, que é uma máquina profissional diferente e não está na nossa seleção.",
    comoUsar: [
      "Carrega a bateria por completo antes do primeiro uso.",
      "Encaixa o pente e usa a alavanca para afinar o comprimento.",
      "Corta contra o sentido do crescimento, começando pelo pente mais comprido.",
      "No fim, tira as lâminas, limpa os pelos com a escova e volta a encaixar."
    ],
    faq: [
      ["A Wahl Rapid Clip funciona com fio?", "Sim. Funciona sem fio até 120 minutos e pode continuar ligada ao cabo quando a bateria acaba."],
      ["Quanto tempo demora a carregar a Wahl Rapid Clip?", "Cerca de 7 horas para uma carga completa, segundo a ficha da Amazon."],
      ["Que pentes traz a Rapid Clip?", "10 pentes de encaixe, de 3 a 28 mm."],
      ["As lâminas da Rapid Clip tiram-se?", "Sim, são amovíveis, para limpar com mais facilidade."]
    ]
  },
  {
    slug: "braun-series-5-aio5545",
    title: "Braun Series 5 AIO5545: o que faz e como usar",
    description: "Braun All-in-One Series 5 AIO5545: barba, cabelo, nariz, orelhas e corpo, 14 comprimentos de 3 a 21 mm, à prova de água e até 120 minutos de bateria.",
    porque: [
      "É a escolha para quem quer um só aparelho para tudo: apara a barba, corta o cabelo, trata do nariz e das orelhas e apara o corpo com a tecnologia SkinGuard, pensada para zonas sensíveis.",
      "O pente da barba tem 14 comprimentos (3 a 21 mm), é 100% à prova de água e a bateria dura até 120 minutos, segundo a Braun. Para cortar o cabelo com frequência, uma máquina dedicada como a {{philips-hc5630-series-5000|Philips Série 5000}} dá mais controlo."
    ],
    paraQuem: "Para quem quer resolver barba, cabelo, nariz, orelhas e corpo com o mesmo aparelho e sem encher a gaveta.",
    ficha: [
      ["Modelo", "Braun All-in-One Series 5 AIO5545"],
      ["Usos", "Barba, cabelo, orelhas, nariz e corpo"],
      ["Comprimentos", "14 posições, de 3 a 21 mm (barba)"],
      ["Corpo", "Tecnologia SkinGuard para zonas sensíveis"],
      ["Água", "100% à prova de água, pega AquaGrip"],
      ["Bateria", "Iões de lítio, até 120 minutos"]
    ],
    fonte: FONTE,
    versao: "AIO5545 é o código desta Series 5. Há outros modelos All-in-One (como o AIO5520 ou o AIO5560, e a Series 7) com acessórios diferentes: confirma o código antes de comprar.",
    comoUsar: [
      "Escolhe o acessório para a zona: pente de barba, pente de cabelo, aparador de nariz ou cabeça corporal.",
      "Na barba, ajusta o comprimento e passa contra o sentido do pelo.",
      "No corpo, usa a cabeça com SkinGuard e passa devagar, com a pele seca ou no duche.",
      "Passa os acessórios por água no fim e deixa secar."
    ],
    faq: [
      ["A Braun AIO5545 serve para cortar o cabelo?", "Sim, o kit inclui acessórios para a barba, o cabelo, o nariz, as orelhas e o corpo."],
      ["A Braun Series 5 AIO5545 pode usar-se no duche?", "Sim. É 100% à prova de água, com pega AquaGrip."],
      ["Quantos comprimentos tem a Braun AIO5545?", "14 posições, de 3 a 21 mm, no pente da barba."],
      ["Qual a autonomia da Braun AIO5545?", "Até 120 minutos sem fio, com bateria de iões de lítio."]
    ]
  },
  {
    slug: "wahl-super-taper",
    title: "Wahl Super Taper: rpm, lâminas, óleo e para quem é",
    description: "Wahl Super Taper com fio: motor V5000 de 6000 rpm, alavanca de 1 a 3,5 mm, uso contínuo em barbearia e como lubrificar as lâminas.",
    porque: [
      "É uma máquina de barbearia: com fio, feita para uso contínuo, com o motor V5000 de 6000 rpm que a Wahl indica e lâminas cromadas de precisão.",
      "A alavanca lateral ajusta o corte de 1 a 3,5 mm sem trocar de lâmina, o que dá rapidez nos degradês. Para cortar em casa de vez em quando, uma máquina sem fio como a {{wahl-rapid-clip|Wahl Rapid Clip}} é mais prática."
    ],
    paraQuem: "Para barbeiros e para quem corta muitas vezes e precisa de uma máquina estável durante horas seguidas.",
    ficha: [
      ["Modelo", "Wahl Super Taper (versão com fio)"],
      ["Motor", "V5000 de armadura oscilante, 6000 rpm, segundo a marca"],
      ["Alimentação", "Com fio, para uso contínuo"],
      ["Lâminas", "Cromadas de precisão"],
      ["Alavanca", "Ajuste de 1 a 3,5 mm sem trocar de lâmina"],
      ["Usos", "Cabelo, barba, bigode e contornos"]
    ],
    fonte: FONTE,
    versao: "Esta é a Super Taper clássica, com fio. A Super Taper Cordless (sem fio) é outro produto. Confirma no título se diz \"Cordless\" antes de comprar.",
    comoUsar: [
      "Antes de começar, põe uma gota de óleo nas lâminas com a máquina a trabalhar uns segundos.",
      "Usa a alavanca para abrir ou fechar o corte entre 1 e 3,5 mm durante o degradê.",
      "Encaixa os pentes para comprimentos maiores e corta contra o sentido do crescimento.",
      "A Wahl recomenda lubrificar diariamente: lâminas para baixo, uma gota no centro e nas pontas."
    ],
    faq: [
      ["A Wahl Super Taper é sem fio?", "Esta versão é com fio. A Super Taper Cordless é um modelo diferente."],
      ["Quantas rpm tem a Wahl Super Taper?", "A Wahl indica um motor V5000 de 6000 rpm."],
      ["A Super Taper precisa de óleo?", "Sim. A marca recomenda lubrificar as lâminas todos os dias para manter o rendimento."],
      ["Para que serve a alavanca da Super Taper?", "Ajusta o corte entre 1 e 3,5 mm sem trocar de lâmina, útil nas passagens do degradê."]
    ]
  },
  {
    slug: "cerave-hidratante-rosto-spf50",
    title: "CeraVe Loção Hidratante SPF 50: para que serve e como usar",
    description: "CeraVe Loção Hidratante de Rosto SPF 50: para pele normal a seca, ceramidas e niacinamida, sem perfume. Para que serve, como usar e qual versão é.",
    porque: [
      "É a nossa escolha para quem quer um só produto de manhã: hidrata e protege do sol (SPF 50, UVA e UVB) no mesmo passo, o que torna mais fácil não falhar o protetor solar.",
      "Tem 3 ceramidas, niacinamida e vitamina E, não tem perfume e a CeraVe indica-a como não comedogénica. É para pele normal a seca; com pele oleosa, um fluido como o {{isdin-fusion-water-magic-spf50|ISDIN Fusion Water}} costuma ficar melhor."
    ],
    paraQuem: "Para quem quer simplificar a manhã num só passo e tem pele normal ou seca.",
    ficha: [
      ["Produto", "CeraVe Loção Hidratante de Rosto SPF 50, 52 ml"],
      ["Proteção", "SPF 50, UVA e UVB"],
      ["Tipo de pele", "Normal a seca"],
      ["Ingredientes-chave", "3 ceramidas essenciais, niacinamida, vitamina E"],
      ["Perfume", "Sem perfume; não comedogénica"],
      ["Quando", "De manhã, no rosto e no pescoço"]
    ],
    fonte: FONTE,
    versao: "A CeraVe tem vários produtos com SPF 50. Esta é a loção hidratante de rosto para pele normal a seca, de 52 ml, não a versão Oil Control para pele oleosa.",
    comoUsar: [
      "Lava a cara e seca bem.",
      "Aplica todas as manhãs no rosto e no pescoço, com a quantidade suficiente para cobrir tudo.",
      "Para exposição solar intensa (praia, montanha), a marca recomenda um protetor solar próprio.",
      "À noite não é precisa: usa um creme sem FPS, se a pele repuxar."
    ],
    faq: [
      ["A CeraVe SPF 50 serve para pele oleosa?", "A marca indica-a para pele normal a seca. Com pele oleosa, um protetor fluido e mate costuma ficar melhor."],
      ["A loção hidratante CeraVe SPF 50 substitui o protetor solar?", "No dia a dia sim, porque já tem SPF 50. Para exposição solar intensa, a marca recomenda um protetor solar próprio."],
      ["Quando se aplica a CeraVe SPF 50?", "De manhã, no rosto e no pescoço limpos e secos."],
      ["A CeraVe SPF 50 tem perfume?", "Não. É sem perfume e não comedogénica, segundo a marca."]
    ]
  },
  {
    slug: "cerave-blemish-control",
    title: "CeraVe Blemish Control: para que serve e como usar",
    description: "CeraVe Blemish Control gel de limpeza: ácido salicílico, argila e niacinamida para borbulhas, pontos negros e poros. Como usar e cuidados com o sol.",
    porque: [
      "É um dos géis de limpeza mais bem colocados no ranking de Beleza da Amazon.es (n.º 26 a 11 de outubro de 2026) para pele com borbulhas e pontos negros: junta ácido salicílico, que esfolia dentro dos poros, com argila e niacinamida, e mantém as ceramidas da CeraVe para não deixar a pele a repuxar.",
      "Não tem perfume e a marca indica-o como não comedogénico e hipoalergénico. Como pode aumentar a sensibilidade ao sol, pede protetor solar de manhã. Para pele oleosa sem borbulhas, o {{cerave-gel-limpeza-espumante|gel espumante da CeraVe}} chega."
    ],
    paraQuem: "Para quem tem pele oleosa com borbulhas, pontos negros ou poros entupidos e quer tratar isso logo na limpeza.",
    ficha: [
      ["Produto", "CeraVe Blemish Control, gel de limpeza (473 ml nesta oferta)"],
      ["Tipo de pele", "Oleosa, com tendência acneica"],
      ["Ingredientes-chave", "Ácido salicílico, argila, niacinamida, ceramidas"],
      ["Textura", "Gel que faz espuma"],
      ["Perfume", "Sem perfume; não comedogénico; hipoalergénico, segundo a marca"],
      ["Cuidado", "Pode aumentar a sensibilidade ao sol: usar protetor solar"]
    ],
    fonte: FONTE,
    versao: "Blemish Control é a linha da CeraVe para imperfeições. Este é o gel de limpeza; não confundir com o creme ou o sérum da mesma linha.",
    comoUsar: [
      "Molha a cara com água morna.",
      "Aplica e massaja suavemente, evitando os olhos.",
      "Passa bem por água e seca com toques.",
      "Começa com uma vez por dia, à noite; de manhã, usa sempre protetor solar."
    ],
    faq: [
      ["Como usar o CeraVe Blemish Control?", "Na cara molhada, massaja e passa por água. No início, uma vez por dia; de manhã, protetor solar."],
      ["O CeraVe Blemish Control serve para pontos negros?", "Sim, a marca indica-o para reduzir imperfeições e pontos negros, com ácido salicílico."],
      ["O Blemish Control pode usar-se todos os dias?", "Pode, mas começa com uma vez por dia e vê como a pele reage antes de passar a duas."],
      ["Preciso de protetor solar com o Blemish Control?", "Sim. A marca avisa que pode aumentar a sensibilidade ao sol."]
    ]
  },
  {
    slug: "garnier-vitamina-c-serum",
    title: "Garnier Sérum Vitamina C Antimanchas: como usar",
    description: "Garnier Sérum Antimanchas com vitamina C, niacinamida e ácido salicílico: para que serve, como usar, de manhã ou à noite e porque pede protetor solar.",
    porque: [
      "Está entre os produtos mais bem colocados no ranking de Beleza da Amazon.es (n.º 28 a 11 de outubro de 2026) e é fácil de começar: textura leve, absorve depressa e serve todos os tipos de pele, segundo a Garnier.",
      "Junta um derivado de vitamina C, niacinamida e ácido salicílico para manchas e pele baça, e é vegano. Se preferes uma marca de homem com vitamina C pura a 10%, vê o {{loreal-men-expert-serum-vitamina-c|sérum L'Oréal Men Expert Hydra Energetic}}."
    ],
    paraQuem: "Para quem tem manchas do sol ou marcas de borbulhas e quer uma pele com tom mais uniforme.",
    ficha: [
      ["Produto", "Garnier Sérum Antimanchas com Vitamina C, 30 ml"],
      ["Ingredientes-chave", "Derivado de vitamina C, niacinamida, ácido salicílico"],
      ["Para", "Manchas escuras, pele baça e tom irregular"],
      ["Tipo de pele", "Todos, segundo a marca"],
      ["Textura", "Leve, de absorção rápida, em gotas"],
      ["Outros", "Vegano; testado dermatologicamente"]
    ],
    fonte: FONTE,
    versao: "Esta é o sérum antimanchas de vitamina C (30 ml). A Garnier tem outros produtos de vitamina C com nomes parecidos, como um gel de limpeza; confirma que diz \"sérum\" no título.",
    comoUsar: [
      "Aplica algumas gotas no rosto limpo e massaja suavemente.",
      "Evita o contorno dos olhos, como indica a marca.",
      "Por cima, o teu creme de rosto.",
      "Se o usas de manhã, termina com protetor solar: sem ele, as manchas voltam."
    ],
    faq: [
      ["Como usar o sérum de vitamina C da Garnier?", "Algumas gotas no rosto limpo, massajando, longe do contorno dos olhos; depois o creme."],
      ["O sérum Garnier vitamina C usa-se de manhã ou à noite?", "Pode usar-se em qualquer altura; de manhã, sempre com protetor solar por cima."],
      ["Para que serve o sérum Garnier vitamina C?", "Para reduzir visivelmente as manchas escuras e dar luminosidade, segundo a marca."],
      ["O sérum Garnier serve para homem?", "Sim, a marca indica-o para todos os tipos de pele."]
    ]
  },
  {
    slug: "cerave-gel-limpeza-espumante",
    title: "CeraVe Gel de Limpeza Espumante: para que pele e como usar",
    description: "CeraVe Gel de Limpeza Espumante para pele normal a oleosa, rosto e corpo, com ceramidas e niacinamida. Como usar e qual a diferença para o hidratante.",
    porque: [
      "É a nossa escolha para lavar a cara se tens pele normal, mista ou oleosa: tira o excesso de oleosidade sem deixar a pele a repuxar, com ceramidas, ácido hialurónico e niacinamida.",
      "Não tem perfume, a CeraVe indica-o como não comedogénico e serve para rosto e corpo, por isso um frasco simplifica o duche. Com pele seca, o {{cerave-gel-limpeza-hidratante|gel de limpeza hidratante da mesma marca}} é melhor; com borbulhas, o {{cerave-blemish-control|Blemish Control}}."
    ],
    paraQuem: "Para quem tem pele normal a oleosa e quer um gel simples para a cara e o corpo.",
    ficha: [
      ["Produto", "CeraVe Gel de Limpeza Espumante, frasco com doseador"],
      ["Tipo de pele", "Normal a oleosa"],
      ["Ingredientes-chave", "Ceramidas essenciais, ácido hialurónico, niacinamida"],
      ["Textura", "Gel que faz espuma"],
      ["Onde", "Rosto e corpo"],
      ["Perfume", "Sem perfume; não comedogénico"]
    ],
    fonte: FONTE,
    versao: "Este é o espumante (foaming), para pele normal a oleosa. O {{cerave-gel-limpeza-hidratante|CeraVe Gel de Limpeza Hidratante}} é para pele normal a seca, e o {{cerave-blemish-control|Blemish Control}} para acne. A oferta desta página é o frasco com doseador; a CeraVe também vende a recarga em saco (473 ml) e outros tamanhos, por isso confirma o formato na Amazon.",
    comoUsar: [
      "Molha a pele com água morna.",
      "Massaja o gel com movimentos circulares.",
      "Deixa atuar 30 segundos, como indica a marca, e passa por água.",
      "Seca com toques e hidrata a seguir."
    ],
    faq: [
      ["O CeraVe gel espumante serve para pele oleosa?", "Sim, a marca indica-o para pele normal a oleosa."],
      ["O CeraVe gel de limpeza espumante pode usar-se no corpo?", "Sim, é para rosto e corpo."],
      ["Qual a diferença entre o CeraVe espumante e o hidratante?", "O espumante é para pele normal a oleosa; o hidratante, para pele normal a seca, limpa de forma mais suave."],
      ["Quantas vezes por dia se usa?", "À noite sempre; de manhã, se a pele for oleosa. Mais de duas vezes por dia não é preciso."]
    ]
  },
  {
    slug: "loreal-men-expert-hydra-energetic",
    title: "L'Oréal Men Expert Hydra Energetic: creme para que serve",
    description: "L'Oréal Men Expert Hydra Energetic, creme hidratante anti-fadiga de 50 ml: guaraná e vitamina C, depois da barba, de manhã e à noite. Sem protetor solar.",
    porque: [
      "É um bom primeiro creme de uma marca de homem: textura gel-creme que absorve depressa, para usar de manhã e à noite.",
      "Tem extrato de guaraná e vitamina C e a L'Oréal indica-o também depois da barba, para aliviar o ardor e a vermelhidão. Não tem protetor solar: de dia, junta um FPS ou escolhe a {{cerave-hidratante-rosto-spf50|CeraVe SPF 50}}."
    ],
    paraQuem: "Para quem quer começar a usar creme com uma textura leve e de marca de homem, também a seguir à barba.",
    ficha: [
      ["Produto", "L'Oréal Men Expert Hydra Energetic, creme hidratante anti-fadiga, 50 ml"],
      ["Ingredientes-chave", "Extrato de guaraná, vitamina C (derivado)"],
      ["Textura", "Gel-creme refrescante, de absorção rápida"],
      ["Quando", "De manhã e à noite; também depois da barba"],
      ["Proteção solar", "Não tem"],
      ["Tipo de pele", "Normal, segundo a ficha"]
    ],
    fonte: FONTE,
    versao: "Hydra Energetic é uma linha inteira (gel de limpeza, {{loreal-men-expert-serum-vitamina-c|sérum de vitamina C}}, {{loreal-men-expert-roll-on-olhos|roll-on de olhos}}). Este é o creme hidratante anti-fadiga de 50 ml.",
    comoUsar: [
      "Aplica na pele limpa do rosto, de manhã e à noite.",
      "Depois da barba, espera que a pele seque e aplica uma camada fina.",
      "De dia, junta protetor solar por cima.",
      "Uma quantidade do tamanho de uma ervilha chega para o rosto."
    ],
    faq: [
      ["O L'Oréal Men Expert Hydra Energetic tem protetor solar?", "Não. De dia, junta um protetor solar."],
      ["Pode usar-se o Hydra Energetic depois da barba?", "Sim, a L'Oréal indica que alivia o ardor e a vermelhidão depois do barbear."],
      ["Qual a diferença entre o creme e o sérum Hydra Energetic?", "O creme hidrata e vai por cima; o sérum de vitamina C é um passo extra para pele baça, antes do creme."],
      ["Quando se aplica o Hydra Energetic?", "De manhã e à noite, na pele limpa do rosto."]
    ]
  },
  {
    slug: "cerave-contorno-olhos",
    title: "CeraVe Contorno de Olhos Reparador: para que serve e uso",
    description: "CeraVe Creme Reparador Contorno de Olhos (14 ml): olheiras e papos, ácido hialurónico, niacinamida e ceramidas. Como aplicar e para que pele é.",
    porque: [
      "É a nossa escolha para quem quer um contorno de olhos simples: a CeraVe indica-o para reduzir olheiras e papos, reparar a pele e dar luminosidade, com ácido hialurónico, niacinamida e ceramidas.",
      "Serve todos os tipos de pele e usa-se de manhã, à noite ou nas duas. Para quem acorda sobretudo com os olhos inchados, o {{the-ordinary-caffeine-solution|sérum de cafeína da The Ordinary}} é mais direto."
    ],
    paraQuem: "Para quem tem a pele seca à volta dos olhos, olheiras de cansaço ou papos ligeiros e quer um gesto simples.",
    ficha: [
      ["Produto", "CeraVe Creme Reparador Contorno de Olhos, 14 ml"],
      ["Para", "Olheiras, papos e pele seca à volta dos olhos"],
      ["Ingredientes-chave", "Ácido hialurónico, niacinamida, ceramidas, extratos marinhos e botânicos"],
      ["Tipo de pele", "Todos"],
      ["Quando", "De manhã e/ou à noite"],
      ["Textura", "Leve, de absorção rápida, segundo a marca"]
    ],
    fonte: FONTE,
    versao: "Este é o Creme Reparador de Contorno de Olhos, de 14 ml. A CeraVe tem outro contorno (Skin Renewing); confirma o nome antes de comprar.",
    comoUsar: [
      "Usa uma quantidade do tamanho de um grão de arroz para os dois olhos.",
      "Aplica com o dedo anelar, aos toques, no osso à volta do olho.",
      "Massaja até absorver, sem esfregar.",
      "Depois, o creme de rosto e, de manhã, o protetor solar."
    ],
    faq: [
      ["O contorno de olhos CeraVe serve para olheiras e papos?", "A marca indica-o para reduzir olheiras e papos. Olheiras de genética mudam pouco com cremes."],
      ["Como aplicar o contorno de olhos CeraVe?", "Um grão de arroz para os dois olhos, com o dedo anelar, aos toques, até absorver."],
      ["O contorno CeraVe usa-se de manhã ou à noite?", "Nas duas alturas, ou só numa, como preferires."],
      ["Quantos ml tem o contorno de olhos CeraVe?", "14 ml."]
    ]
  },
  {
    slug: "the-ordinary-hyaluronic-acid-b5",
    title: "The Ordinary Hyaluronic Acid 2% + B5: para que serve",
    description: "The Ordinary Hyaluronic Acid 2% + B5 com ceramidas: para que serve, como usar na pele húmida antes do creme e porque é o sérum mais fácil para começar.",
    porque: [
      "É o sérum que recomendamos para começar: hidrata, é dos que menos irritam e nota-se depressa numa pele que repuxa, sobretudo depois do banho ou da barba.",
      "Tem vários tipos de ácido hialurónico, provitamina B5 e ceramidas, não tem fragrância e é vegano, segundo a The Ordinary. Para poros e brilho, o {{neutrogena-hydro-boost-niacinamida|sérum de niacinamida da Neutrogena}} é mais indicado."
    ],
    paraQuem: "Para quem quer o primeiro sérum e tem a pele desidratada ou a repuxar.",
    ficha: [
      ["Produto", "The Ordinary Hyaluronic Acid 2% + B5 (com ceramidas), 30 ml"],
      ["Ingredientes-chave", "5 tipos de ácido hialurónico, provitamina B5, ceramidas"],
      ["Para", "Hidratação e linhas finas causadas pela secura"],
      ["Tipo de pele", "Todos"],
      ["Fragrância", "Sem fragrância; vegano"],
      ["Quando", "De manhã e à noite"]
    ],
    fonte: FONTE,
    versao: "Esta é a fórmula com ceramidas (with Ceramides). Confirma o nome completo no título: a fórmula anterior desta referência não tinha ceramidas.",
    comoUsar: [
      "Lava a cara e deixa a pele ligeiramente húmida.",
      "Aplica algumas gotas e espalha com as mãos.",
      "Por cima, o creme de rosto, para a hidratação não se perder.",
      "De manhã, termina com protetor solar."
    ],
    faq: [
      ["Para que serve o The Ordinary Hyaluronic Acid 2% + B5?", "Para hidratar a pele e suavizar as linhas finas causadas pela secura, segundo a marca."],
      ["Como usar o The Ordinary Hyaluronic Acid 2% + B5?", "Algumas gotas na pele limpa e ligeiramente húmida, antes do creme, de manhã e à noite."],
      ["O The Ordinary ácido hialurónico serve para pele oleosa?", "Sim, a marca indica-o para todos os tipos de pele."],
      ["Tem perfume?", "Não. É sem fragrância e vegano."]
    ]
  },
  {
    slug: "isdin-fusion-water-magic-spf50",
    title: "ISDIN Fusion Water Magic SPF 50: para que pele e como usar",
    description: "ISDIN Fusion Water Magic SPF 50: protetor solar facial leve, mate e para pele oleosa, que não irrita os olhos. Como usar e diferença para Color e Repair.",
    porque: [
      "É a nossa escolha de protetor solar para o rosto no dia a dia: fase aquosa, absorção imediata e acabamento mate, segundo a ISDIN, que o indica para pele oleosa. Como não brilha, é o que tem mais hipóteses de passar a fazer parte da manhã.",
      "Protege de UVB, UVA, luz azul e IR-A, tem ácido hialurónico e a tecnologia Safe Eye Tech, que a marca diz evitar a irritação dos olhos. Com pele seca, a {{cerave-hidratante-rosto-spf50|CeraVe SPF 50}} hidrata mais."
    ],
    paraQuem: "Para quem desistiu do protetor solar por causa do brilho ou de arder nos olhos e quer um que se sinta pouco.",
    ficha: [
      ["Produto", "ISDIN Fusion Water MAGIC SPF 50, 50 ml"],
      ["Proteção", "SPF 50 de largo espectro: UVB, UVA, luz azul e IR-A"],
      ["Textura", "Fase aquosa, absorção imediata, acabamento mate"],
      ["Tipo de pele", "Indicado pela marca para pele oleosa; sem óleos minerais"],
      ["Ingredientes-chave", "Ácido hialurónico, extrato de alga mediterrânica, vitamina E"],
      ["Olhos", "Safe Eye Tech: não irrita os olhos, segundo a marca"]
    ],
    fonte: FONTE,
    versao: "MAGIC é a versão sem cor. A Fusion Water tem outras: Color (com cor), Glow, Bronze e Repair (anti-idade). Confirma que diz \"MAGIC SPF 50\" sem mais nada no título.",
    comoUsar: [
      "É o último passo da manhã, depois do creme, se usas.",
      "Aplica em quantidade suficiente no rosto, nas orelhas e no pescoço.",
      "Ao sol, reaplica a cada duas horas e depois de suar muito.",
      "Na praia, junta um protetor para o corpo."
    ],
    faq: [
      ["O ISDIN Fusion Water Magic serve para pele oleosa?", "Sim. A ISDIN indica-o para pele oleosa: deixa a pele mate e não tem óleos minerais."],
      ["O ISDIN Fusion Water arde nos olhos?", "A marca diz que não, graças à tecnologia Safe Eye Tech."],
      ["O ISDIN Fusion Water Magic tem cor?", "Não. A versão com cor é a Fusion Water Magic Color."],
      ["Qual a diferença entre o Fusion Water Magic e o Repair?", "O Magic é o protetor de uso diário sem cor; o Repair acrescenta ação anti-idade. São produtos diferentes."]
    ]
  }
];
