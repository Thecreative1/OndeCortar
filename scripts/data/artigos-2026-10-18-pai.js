// 2026-10-18 — guia de prendas para o pai (Natal, anos e Dia do Pai). Pesquisas confirmadas nas sugestões
// do Google PT: "o que oferecer ao pai" (… no natal, … no aniversário, … nos anos, … no dia do pai,
// … 60 anos, … que faz 80 anos), "prenda para o pai" (… natal), "ideias prenda natal pai",
// "prenda pai 50/60/65/70/75/80 anos", "prenda original para o pai", "prenda pai e avô", "prenda para o avô".
// Factos dos produtos das páginas produto/{slug}/; stock confirmado a 18/10 (fetch /dp/ASIN).
// Sem preços, avaliações, rankings ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "o-que-oferecer-ao-pai",
    category: "presentes-e-kits",
    published: "2026-10-18",
    title: "O que oferecer ao pai: prendas de Natal, anos e Dia do Pai",
    h1: "O que oferecer ao pai: prendas que ele vai mesmo usar",
    description: "O que oferecer ao pai no Natal, nos anos ou no Dia do Pai: ideias pela forma como ele faz a barba e por idade (50, 60, 70 e 80 anos) — e o que evitar.",
    schemaDescription: "Prendas para o pai no Natal, nos anos e no Dia do Pai, escolhidas pela forma como ele faz a barba e por idade, do pai de 50 ao de 80 anos.",
    image: "imagens/revista/prenda-pai.jpg",
    imageAlt: "Barbeiro de óculos a fazer a barba a um cliente mais velho numa barbearia antiga",
    readMinutes: 7,
    criteria: "Ideias organizadas pela forma como ele faz a barba e por idade; características conforme publicadas pelos fabricantes. Não testamos produtos.",
    lede: "\"Não preciso de nada.\" É a resposta de quase todos os pais quando se pergunta o que querem. E é quase sempre verdade — até ao dia em que a máquina de barbear de há dez anos deixa de segurar a carga.",
    subcopy: "A forma mais segura de acertar é olhar para o que ele usa todas as manhãs. Aqui estão ideias pela forma como ele faz a barba, por idade e para o pai que tem tudo — no Natal, nos anos ou no Dia do Pai.",
    heroActions: [["#como-faz-a-barba", "Ver pela forma como faz a barba"], ["#por-idade", "Ver por idade"]],
    quick: [
      ["Qual é a prenda mais segura para o pai?", "Uma máquina de barbear elétrica nova, do mesmo tipo da que ele usa (rede ou rotativa). Usa-a todos os dias."],
      ["E se ele usa barba ou bigode?", "Um aparador simples e lavável, ou um aparador de nariz e orelhas — útil e raramente comprado pelo próprio."],
      ["Algo mais pequeno?", "Um pack de cuidado de rosto, um creme de barbear de qualidade ou o aparador de nariz e orelhas."],
      ["E se ele tem tudo?", "Melhora a peça que ele usa todos os dias, ou oferece uma experiência: um corte e uma barba numa boa barbearia."]
    ],
    summary: [
      "Vê primeiro como ele faz a barba",
      "Máquina elétrica: não mudes de tipo",
      "Barba ou bigode: aparador simples",
      "À lâmina: um ritual de barbear clássico",
      "Pai que tem tudo: melhorar ou oferecer um corte",
      "Natal, anos e Dia do Pai: compra com tempo"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para oferecer",
      text: "Prendas e packs de barbearia, com o que cada um faz bem e para quem não é.",
      actions: [["../../loja/para-oferecer/", "Ver prendas"], ["../../revista/prendas-de-natal-para-homem/", "Prendas de Natal para homem"]]
    },
    sections: [
      {
        id: "como-faz-a-barba",
        h2: "Primeiro: como é que o teu pai faz a barba?",
        html: "<p>É a pergunta que decide quase tudo. Na próxima visita, repara na casa de banho:</p><ul class=\"rich-list\"><li><strong>Máquina elétrica</strong> — de cabeça retangular (lâminas de rede) ou com três círculos (cabeças rotativas)?</li><li><strong>Barba ou bigode aparados</strong> — tem aparador? Ainda funciona bem?</li><li><strong>Lâmina e espuma</strong> — de lata, ou já usa pincel e creme?</li></ul><p>Anota a <strong>marca e o modelo</strong>. Assim não ofereces o mesmo que ele já tem — e acertas no tipo que ele prefere.</p>"
      },
      {
        h2: "Se ele faz a barba com máquina elétrica",
        html: "<p>É a prenda que se nota todas as manhãs, sobretudo se a máquina dele já tem anos. A regra de ouro: <strong>não mudar de tipo</strong>. Quem se habituou a lâminas de rede raramente gosta de rotativa, e vice-versa.</p><ul class=\"rich-list\"><li><strong>Lâminas de rede:</strong> a <a href=\"../../produto/braun-series5-51-b1000s/\">Braun Series 5 51-B1000s</a> tem 3 lâminas flexíveis, tecnologia AutoSense que ajusta a potência à barba e é 100% à prova de água.</li><li><strong>Cabeças rotativas:</strong> a <a href=\"../../produto/philips-s5465-series-5000/\">Philips Série 5000 S5465</a> tem 27 lâminas autoafiáveis e cabeças flexíveis a 360°, a seco ou no duche.</li></ul><p>Vê <a href=\"../../revista/melhor-maquina-de-barbear-eletrica-qual-escolher/\">como escolher uma máquina de barbear elétrica</a>.</p>" + amz("B0B3JBYXG8", "braun-series5-51-b1000s")
      },
      {
        h2: "Se ele usa barba ou bigode",
        html: "<p>Para manter a barba ou o bigode no mesmo comprimento, um aparador simples chega. O <a href=\"../../produto/remington-mb320c/\">Remington MB320C</a> tem <strong>lâminas de cerâmica que não precisam de óleo</strong> e 9 comprimentos (1,5 a 18 mm), com uma janela na roda que mostra o comprimento escolhido.</p><p><strong>Para juntar:</strong> o <a href=\"../../produto/panasonic-er-gn30/\">aparador de nariz e orelhas Panasonic ER-GN30</a>, com lâmina curva de fio duplo que se lava debaixo da torneira. Com a idade, os pelos do nariz e das orelhas crescem mais — e quase ninguém compra isto para si. Vê <a href=\"../../revista/aparador-de-pelos-do-nariz-qual-escolher/\">que aparador de nariz escolher</a>.</p>" + amz("B000OS72Y0", "remington-mb320c")
      },
      {
        h2: "Se ele faz a barba à lâmina",
        html: "<p>Muitos pais ainda fazem a barba como aprenderam: lâmina e espuma de lata. Um ritual de barbear clássico é uma prenda com história. A <a href=\"../../produto/king-c-rotina/\">King C. Gillette Rotina Clássica</a> junta <strong>máquina de segurança, pincel, creme e amaciador</strong> num conjunto coerente.</p><p>Se ele não quer mudar de lâmina, melhora o que vem antes e depois: o <a href=\"../../produto/proraso-pre-barba/\">Proraso Pré-Barba para pele sensível</a> amolece os pelos antes do barbear, e o <a href=\"../../produto/proraso-creme/\">creme de barbear Proraso</a> dá boa cobertura e deslize. Vê <a href=\"../../revista/como-escolher-laminas-sem-irritar-a-pele-desnecessariamente/\">como barbear à lâmina sem irritar a pele</a>.</p>" + amz("B0FMQBG11X", "king-c-rotina")
      },
      {
        h2: "Para o pai que tem tudo",
        html: "<p>Quando ele já tem tudo, há dois caminhos que funcionam:</p><ul class=\"rich-list\"><li><strong>Melhorar o que ele usa todos os dias.</strong> Uma máquina de barbear mais recente, um aparador que corta melhor do que o antigo.</li><li><strong>Algo que ele nunca compraria.</strong> O <a href=\"../../produto/nivea-men-pack-hyaluron/\">NIVEA MEN Pack Hyaluron</a> traz creme de dia com FPS 15, contorno de olhos e bálsamo after shave — a marca indica-o para homens com mais de 35 anos. Mais simples, o <a href=\"../../produto/nivea-men-pack-neceser/\">NIVEA MEN Pack Cuidado Completo</a> junta creme de rosto, creme em lata, after shave e desodorizante numa necessaire.</li></ul>" + amz("B0FBBS86WS", "nivea-men-pack-hyaluron")
      },
      {
        id: "por-idade",
        h2: "Prenda para o pai por idade: 50, 60, 70 e 80 anos",
        html: "<p>A idade não manda na prenda — a rotina dele é que manda. Mas há padrões que ajudam:</p><ul class=\"rich-list\"><li><strong>Pai de 50 anos:</strong> ainda muito ativo e exigente. Uma <a href=\"../../produto/philips-s5465-series-5000/\">máquina de barbear elétrica</a> nova ou uma rotina de rosto como o <a href=\"../../produto/nivea-men-pack-hyaluron/\">pack NIVEA MEN Hyaluron</a>.</li><li><strong>Pai de 60 anos:</strong> conforto todos os dias. Máquina de barbear e <a href=\"../../produto/panasonic-er-gn30/\">aparador de nariz e orelhas</a>. Se ele viaja muito, o <a href=\"../../produto/wahl-gold-travel-shaver/\">Wahl Gold Edition Travel Shaver</a> é compacto (88 g) e vem com caixa metálica e bolsa.</li><li><strong>Pai de 70 anos:</strong> simplicidade. Um aparelho só, fácil de limpar: o <a href=\"../../produto/remington-mb320c/\">Remington MB320C</a> tem lâminas de cerâmica que não precisam de óleo. Se gosta de rituais, um <a href=\"../../produto/proraso-creme/\">creme de barbear de qualidade</a>.</li><li><strong>Pai de 80 anos:</strong> o mais útil costuma ser o mais simples — um <a href=\"../../produto/nivea-men-pack-neceser/\">pack de cuidado do dia a dia</a> ou um corte e uma barba feitos por um barbeiro.</li></ul>"
      },
      {
        h2: "Prendas originais para o pai",
        html: "<ul class=\"rich-list\"><li><strong>Um ritual de barbear clássico</strong> — pincel, creme e máquina de segurança, para o pai que gosta das coisas feitas com calma.</li><li><strong>Um shaver de viagem</strong> — o <a href=\"../../produto/wahl-gold-travel-shaver/\">Wahl Gold Edition Travel Shaver</a> inclui lâmina e folha de substituição.</li><li><strong>Uma barba feita por um barbeiro</strong> — toalha quente, navalha e meia hora só para ele. Muitos pais nunca experimentaram.</li></ul>"
      },
      {
        h2: "E para o avô?",
        html: "<p>As mesmas regras valem para o avô, com uma diferença: <strong>quanto mais simples, melhor</strong>. Evita aparelhos com muitos acessórios e prefere o que se usa sem manual — um aparador de nariz e orelhas, um creme de barbear do género do que ele já usa, ou um pack de cuidado do dia a dia. Se ele já não vai sozinho à barbearia, acompanhá-lo pode ser a melhor prenda.</p>"
      },
      {
        h2: "Natal, anos ou Dia do Pai: muda alguma coisa?",
        html: "<ul class=\"rich-list\"><li><strong>Natal:</strong> compra cedo. Em dezembro os prazos de entrega para Portugal alargam; confirma a data prevista antes de encomendar. Se não tens pressa, vê o que <a href=\"../../loja/black-friday/\">vigiar na Black Friday</a>.</li><li><strong>Anos:</strong> é a altura certa para a prenda maior — a máquina de barbear nova.</li><li><strong>Dia do Pai (19 de março):</strong> uma prenda mais pequena funciona bem — o aparador de nariz e orelhas, um creme ou um pack de rosto.</li></ul><p>Na Amazon.es, o mesmo produto pode ser vendido pela Amazon ou por terceiros, com prazos e devoluções diferentes. Vê quem vende antes de comprar.</p>"
      },
      {
        h2: "O que não oferecer ao pai",
        html: "<ul class=\"rich-list\"><li><strong>Uma máquina de tipo diferente da que ele usa.</strong> Rede e rotativa não se trocam por capricho.</li><li><strong>Aparelhos com dez acessórios.</strong> Ficam na caixa.</li><li><strong>Aromas fortes às cegas.</strong> Se ele usa sempre o mesmo after shave, não o troques.</li><li><strong>Mais uma gravata.</strong> Ele sabe que é a prenda de quem não pensou.</li></ul>"
      },
      {
        h2: "Na dúvida: oferece-lhe um corte e uma barba",
        html: "<p>Um corte e uma barba numa boa barbearia é uma prenda que quase todos os pais apreciam — e que poucos se oferecem a si próprios. Algumas barbearias vendem vales de oferta; pergunta diretamente. Encontra uma perto dele no <a href=\"../../#explorar\">mapa do OndeCortar</a> ou procura <a href=\"../../cidades/\">por cidade</a>.</p>"
      }
    ],
    faq: [
      ["O que oferecer ao pai no Natal?", "Uma máquina de barbear elétrica nova, do mesmo tipo da que ele usa, ou um aparador de nariz e orelhas. Se ele faz a barba à lâmina, um conjunto de barbear clássico."],
      ["O que oferecer ao pai nos anos?", "É a altura para a prenda maior, como uma máquina de barbear nova. Se preferes algo mais pequeno, um pack de cuidado de rosto ou um corte e uma barba numa barbearia."],
      ["Que prenda dar a um pai de 60 anos?", "Algo que torne a rotina mais confortável: uma máquina de barbear elétrica nova, um aparador de nariz e orelhas ou, se ele viaja, um shaver compacto."],
      ["Que prenda dar a um pai de 80 anos?", "O mais simples costuma ser o mais útil: um pack de cuidado do dia a dia, um creme de barbear como o que ele já usa, ou acompanhá-lo a um barbeiro."],
      ["O que oferecer a um pai que tem tudo?", "Melhora a peça que ele usa todos os dias, como a máquina de barbear, ou oferece algo que ele nunca compraria para si: um pack de rosto ou uma barba feita por um barbeiro."],
      ["Qual é uma prenda original para o pai?", "Um ritual de barbear clássico com pincel e máquina de segurança, um shaver de viagem ou uma barba com toalha quente numa boa barbearia."]
    ],
    faqCta: "Preferes oferecer uma experiência? Encontra uma barbearia perto dele no <a href=\"../../#explorar\">mapa do OndeCortar</a>.",
    related: ["prendas-de-natal-para-homem", "melhor-maquina-de-barbear-eletrica-qual-escolher", "aparador-de-pelos-do-nariz-qual-escolher"],
    finalCta: {
      h2: "Uma prenda que ele usa todas as manhãs",
      text: "Vê como ele faz a barba, escolhe pelo tipo e compra com tempo.",
      actions: [["../../loja/para-oferecer/", "Ver prendas"], ["../../revista/prendas-de-natal-para-homem/", "Prendas de Natal para homem"]]
    }
  }
];
