// 2026-10-18 — guia de prendas de Natal para homem. Pesquisas confirmadas nas sugestões do Google PT
// (em Portugal diz-se "prenda"; "presente" dá sobretudo resultados do Brasil):
// "prendas de natal para homem" (… baratas, … originais, sugestões …, melhores …, … 2025),
// "prenda para homem" (… 30/40/50/60 anos, … até 10/20/30 €, … amigo secreto, … original),
// "prenda para pai natal", "prenda para marido natal", "presente para homem que tem tudo".
// Amazon.es (pesquisas "kit barba regalo", "estuche regalo hombre"): kits de barba e packs de rosto.
// Factos dos produtos das páginas produto/{slug}/; stock confirmado a 18/10 (fetch /dp/ASIN).
// Sem preços (só via PA-API), avaliações, rankings ou testes.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "prendas-de-natal-para-homem",
    category: "presentes-e-kits",
    published: "2026-10-18",
    title: "Prendas de Natal para homem: ideias que ele vai mesmo usar",
    h1: "Prendas de Natal para homem que ele vai mesmo usar",
    description: "Prendas de Natal para homem por pessoa e por perfil: pai, marido, rapaz de 20 anos e amigo secreto. Ideias úteis de barba e cabelo — e o que evitar.",
    schemaDescription: "Ideias de prendas de Natal para homem organizadas por pessoa (pai, marido, jovem, amigo secreto), por perfil e por idade, com o que evitar.",
    image: "imagens/revista/prendas-natal-homem.jpg",
    imageAlt: "Prenda de Natal embrulhada em papel castanho, com fio vermelho e branco e um ramo de pinheiro",
    readMinutes: 7,
    criteria: "Ideias organizadas por pessoa e por uso; características conforme publicadas pelos fabricantes. Não testamos produtos.",
    lede: "Todos os anos o mesmo problema: o pai \"não precisa de nada\", o marido já tem tudo e o amigo secreto calhou ao colega que mal conheces. E lá vai mais um perfume ou mais um par de meias.",
    subcopy: "Há uma prenda que quase nunca falha: algo que ele usa todas as manhãs à frente do espelho. Aqui estão ideias por pessoa, por perfil e por idade — e o que não oferecer.",
    heroActions: [["#por-pessoa", "Ver ideias por pessoa"], ["#amigo-secreto", "Prendas pequenas"]],
    quick: [
      ["Qual é a prenda mais segura?", "Um kit de barba com caixa, se ele tem barba e não tem rotina. Já vem pronto a oferecer e junta o essencial."],
      ["E para o pai?", "Uma máquina de barbear elétrica melhor do que a que ele tem, ou um aparador de nariz e orelhas — útil e sem conversas embaraçosas."],
      ["Prendas baratas ou para o amigo secreto?", "Um bálsamo ou óleo de barba, uma escova de javali ou uma pomada de cabelo: pequenas, úteis e ninguém as compra para si."],
      ["E se ele tem tudo?", "Melhora o que ele usa todos os dias, ou oferece uma experiência: um corte numa boa barbearia."]
    ],
    summary: [
      "Pai: máquina de barbear ou aparador de nariz",
      "Marido ou namorado: um aparador melhor",
      "Rapaz de 18–25: OneBlade ou pomada de cabelo",
      "Amigo secreto: bálsamo, óleo ou escova",
      "Original: um ritual de barbear clássico",
      "Compra cedo: entregas e devoluções de Natal"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Para oferecer",
      text: "Kits e prendas de barbearia, com o que cada um faz bem e para quem não é.",
      actions: [["../../loja/para-oferecer/", "Ver prendas"], ["../../loja/kits-de-barba/", "Ver kits de barba"]]
    },
    sections: [
      {
        h2: "Antes de comprar: espreita a casa de banho dele",
        html: "<p>É a forma mais simples de acertar sem perguntar nada. Repara no que lá está:</p><ul class=\"rich-list\"><li><strong>Uma máquina velha</strong>, a perder bateria, ou um aparador com o pente partido? Trocá-la é uma prenda que ele vai usar todas as semanas.</li><li><strong>Barba, mas nada para a tratar?</strong> Um kit com óleo, bálsamo e escova resolve.</li><li><strong>Lâmina descartável e espuma de lata?</strong> Há ali um ritual de barbear à espera de ser descoberto.</li><li><strong>Uma prateleira cheia?</strong> Não acrescentes: melhora uma peça que ele já usa.</li></ul><p>Anota a <strong>marca e o modelo</strong> do que ele tem. Evita oferecer exatamente o mesmo.</p>"
      },
      {
        id: "por-pessoa",
        h2: "Prenda de Natal para o pai",
        html: "<p>O pai que \"não precisa de nada\" quase sempre usa a mesma máquina há anos. Uma <strong>máquina de barbear elétrica nova</strong> é das prendas que se notam todas as manhãs.</p><ul class=\"rich-list\"><li>Se ele usa uma máquina de <strong>lâminas de rede</strong> (cabeça retangular), a <a href=\"../../produto/braun-series5-51-b1000s/\">Braun Series 5 51-B1000s</a> tem 3 lâminas flexíveis, tecnologia AutoSense que ajusta a potência à barba e é 100% à prova de água.</li><li>Se usa uma de <strong>cabeças rotativas</strong> (três círculos), a <a href=\"../../produto/philips-s5465-series-5000/\">Philips Série 5000 S5465</a> tem 27 lâminas autoafiáveis e cabeças flexíveis a 360°, a seco ou no duche.</li></ul><p>A regra é não mudar de tipo: quem se habituou a rede raramente gosta de rotativa, e vice-versa. Vê <a href=\"../../revista/melhor-maquina-de-barbear-eletrica-qual-escolher/\">como escolher uma máquina de barbear elétrica</a>. Mais ideias, por idade e para o avô, em <a href=\"../../revista/o-que-oferecer-ao-pai/\">o que oferecer ao pai</a>.</p><p><strong>Para juntar:</strong> o <a href=\"../../produto/panasonic-er-gn30/\">aparador de nariz e orelhas Panasonic ER-GN30</a>, com lâmina curva de fio duplo que se lava debaixo da torneira. Pequeno, útil e ele dificilmente o compra para si.</p><p><strong>Se preferes algo mais simples:</strong> o <a href=\"../../produto/nivea-men-pack-neceser/\">NIVEA MEN Pack Cuidado Completo</a> junta creme de rosto, creme em lata, bálsamo after shave e desodorizante numa necessaire.</p>" + amz("B0B3JBYXG8", "braun-series5-51-b1000s")
      },
      {
        h2: "Prenda de Natal para o marido ou o namorado",
        html: "<p>Se ele tem barba e já trata dela, a prenda é uma ferramenta melhor. O <a href=\"../../produto/braun-bt5525-series-5/\">Braun Beard Trimmer Series 5 BT5525</a> tem <strong>40 comprimentos em intervalos de 0,5 mm com bloqueio</strong>, até 120 minutos de bateria e é 100% à prova de água.</p><p>Se ele usa barba de poucos dias e também apara o corpo, o <a href=\"../../produto/philips-oneblade-pro-360/\">Philips OneBlade Pro 360</a> tem pente de 20 posições (0,4 a 10 mm), kit corporal e até 120 minutos de bateria.</p><p><strong>Quando não oferecer:</strong> se ele comprou um aparador há pouco tempo. Mais ideias, por tipo de homem, em <a href=\"../../revista/presentes-para-namorado-ideias/\">presentes para o namorado</a>.</p>" + amz("B0DQWPZVY3", "braun-bt5525-series-5")
      },
      {
        h2: "Para um rapaz de 18 a 25 anos",
        html: "<p>Nesta idade, a barba muitas vezes ainda está a crescer e o cabelo é o que mais importa. Duas ideias que acertam:</p><ul class=\"rich-list\"><li><strong>O primeiro aparador a sério.</strong> O <a href=\"../../produto/philips-oneblade-360-qp2724/\">Philips OneBlade 360 QP2724</a> apara, contorna e rapa com a mesma lâmina, traz pentes de 1, 3 e 5 mm e usa-se no duche.</li><li><strong>Um produto de cabelo.</strong> A <a href=\"../../produto/american-crew-matte-clay/\">American Crew Matte Clay</a> dá textura sem brilho a cabelo curto ou médio. Se ele prefere um acabamento mais arrumado, a <a href=\"../../produto/uppercut-deluxe-matt-pomade/\">Uppercut Deluxe Matt Pomade</a> é à base de água e sai à primeira lavagem. Vê <a href=\"../../revista/pomada-cera-ou-gel-cabelo-homem/\">pomada, cera ou gel: qual escolher</a>.</li></ul>" + amz("B0DCFP3Z14", "philips-oneblade-360-qp2724")
      },
      {
        id: "amigo-secreto",
        h2: "Prendas baratas e para o amigo secreto",
        html: "<p>Para o amigo secreto, o colega ou o cunhado, o truque é escolher algo <strong>pequeno, útil e que ninguém compra para si</strong>:</p><ul class=\"rich-list\"><li><strong><a href=\"../../produto/proraso-balsamo-barba/\">Bálsamo de barba Proraso</a></strong> — amacia a barba e acalma a pele, de uma marca italiana de barbearia desde 1948.</li><li><strong><a href=\"../../produto/viking-revolution-beard-oil/\">Óleo de barba Viking Revolution</a></strong> — para quem tem barba e nunca usou nada nela.</li><li><strong><a href=\"../../produto/zilberhaar-escova/\">Escova de javali ZilberHaar</a></strong> — para barbas médias a densas.</li><li><strong><a href=\"../../produto/proraso-creme/\">Creme de barbear Proraso</a></strong> — para quem faz a barba à lâmina.</li><li><strong><a href=\"../../produto/uppercut-deluxe-matt-pomade/\">Pomada Uppercut Deluxe Matt</a></strong> — para quem penteia o cabelo todos os dias.</li></ul><p>Se o amigo secreto tem um valor fixo, confirma o preço do dia na Amazon.es antes de escolher: estes produtos mudam de preço com frequência, sobretudo em novembro.</p>" + amz("B01LXOJQ1C", "proraso-balsamo-barba")
      },
      {
        id: "por-perfil",
        h2: "Por perfil: o que ele faz em casa",
        html: "<ul class=\"rich-list\"><li><strong>Tem barba e nenhuma rotina:</strong> um kit com caixa. O <a href=\"../../produto/cusmay-kit-barba-11-em-1/\">Kit de Barba CUSMAY 11 em 1</a> junta champô, óleos, bálsamo, escova, pente, tesoura, navalha e bolsa de viagem; o <a href=\"../../produto/oukzon-kit-barba-10-em-1/\">Oukzon Kit de Barba 10 em 1</a> traz também condicionador de barba; o <a href=\"../../produto/viking-revolution-beard-grooming-kit/\">Viking Revolution Beard Grooming Kit</a> é mais curto e vem com escova, pente, bálsamo, óleo e tesoura. Vê <a href=\"../../revista/melhor-kit-de-barba-para-oferecer/\">qual kit de barba oferecer</a>.</li><li><strong>Corta o cabelo em casa:</strong> a <a href=\"../../produto/philips-hc5630-series-5000/\">Philips Série 5000 HC5630</a> tem 28 comprimentos numa roda (0,5 a 28 mm) e até 90 minutos sem fio. Mais opções em <a href=\"../../revista/melhores-maquinas-para-cortar-cabelo-em-casa/\">as melhores máquinas de cortar cabelo para casa</a>.</li><li><strong>Rapa a cabeça:</strong> o <a href=\"../../produto/philips-hs7980-head-shaver/\">Philips Head Shaver Série 7000 Pro</a> tem cabeça flexível a 360° e até 90 minutos de bateria. Vê <a href=\"../../revista/como-rapar-a-cabeca-em-casa-shaver-ou-maquina/\">shaver ou máquina para rapar a cabeça</a>.</li><li><strong>Quer uma só máquina para tudo:</strong> o <a href=\"../../produto/braun-aio7545-series-7/\">Braun Series 7 AIO7545</a> é um kit 12 em 1 para barba, cabelo, orelhas, nariz e corpo.</li><li><strong>Começa a cuidar da pele:</strong> a <a href=\"../../produto/loreal-men-expert-power-age-rotina/\">L'Oréal Men Expert Power Age Rotina</a> junta sérum e creme anti-idade com ácido hialurónico numa necessaire (sem proteção solar: de dia, junta um FPS). Para quem passou dos 35 e faz a barba, o <a href=\"../../produto/nivea-men-pack-hyaluron/\">NIVEA MEN Pack Hyaluron</a> traz creme de dia com FPS 15, contorno de olhos e bálsamo after shave.</li></ul>" + amz("B0CHDX1X2B", "cusmay-kit-barba-11-em-1")
      },
      {
        h2: "Prendas originais (que não são mais um perfume)",
        html: "<p>Para o homem que gosta das coisas feitas com calma, o barbear clássico é uma prenda com história. A <a href=\"../../produto/king-c-rotina/\">King C. Gillette Rotina Clássica</a> junta <strong>máquina de segurança, pincel, creme e amaciador</strong> num conjunto coerente para começar.</p><p>Se ele já barbeia à moda antiga, o <a href=\"../../produto/taylor-of-old-bond-street-spicy-sandalwood/\">creme Taylor of Old Bond Street Spicy Sandalwood</a>, em taça, com aroma a sândalo especiado, é um extra de barbearia londrina.</p><p><strong>Quando não oferecer:</strong> a quem quer despachar a barba em dois minutos de manhã.</p>" + amz("B0FMQBG11X", "king-c-rotina")
      },
      {
        id: "por-idade",
        h2: "Prendas para homem por idade: 30, 40, 50 e 60 anos",
        html: "<p>A idade não manda na prenda — o que ele usa é que manda. Mas há padrões que ajudam:</p><ul class=\"rich-list\"><li><strong>30 anos:</strong> já sabe o estilo que quer. Um aparador melhor, como o <a href=\"../../produto/braun-bt5525-series-5/\">Braun BT5525</a>, ou uma máquina de cortar cabelo se corta em casa.</li><li><strong>40 anos:</strong> menos tempo, mais exigência. Um tudo-em-um como o <a href=\"../../produto/braun-aio7545-series-7/\">Braun Series 7</a>, ou uma <a href=\"../../produto/loreal-men-expert-power-age-rotina/\">rotina de rosto anti-idade</a> se a pele começa a ficar baça.</li><li><strong>50 anos:</strong> conforto todos os dias. Uma <a href=\"../../produto/philips-s5465-series-5000/\">máquina de barbear elétrica</a> nova e um <a href=\"../../produto/panasonic-er-gn30/\">aparador de nariz e orelhas</a>.</li><li><strong>60 e 70 anos:</strong> rituais. Um conjunto de barbear clássico, um creme de barbear de qualidade ou — se a barba está grisalha — um bálsamo que a amacie. Vê <a href=\"../../revista/barba-grisalha-assumir-ou-pintar/\">barba grisalha: assumir ou pintar</a>.</li></ul>"
      },
      {
        h2: "Comprar a tempo para o Natal",
        html: "<ul class=\"rich-list\"><li><strong>Compra cedo.</strong> Em dezembro os prazos de entrega para Portugal alargam. Confirma a data prevista na página do produto antes de encomendar.</li><li><strong>Vê quem vende.</strong> Na Amazon.es, o mesmo produto pode ser vendido pela Amazon ou por terceiros, com prazos e devoluções diferentes.</li><li><strong>Devoluções.</strong> A Amazon costuma alargar o prazo de devolução das compras feitas para o Natal; confirma as datas deste ano na página de devoluções antes de comprar.</li><li><strong>Black Friday.</strong> Se não tens pressa, vê a nossa lista do que <a href=\"../../loja/black-friday/\">vigiar na Black Friday</a>.</li></ul>"
      },
      {
        h2: "O que não oferecer",
        html: "<ul class=\"rich-list\"><li><strong>Uma máquina igual à que ele já tem.</strong> Espreita a marca e o modelo antes.</li><li><strong>Kits enormes com peças que ninguém usa.</strong> Rolos, pentes repetidos, navalhas para quem nunca usou navalha.</li><li><strong>Aromas fortes às cegas.</strong> Bálsamos e cremes têm cheiro; se não sabes do que ele gosta, escolhe uma ferramenta.</li><li><strong>Algo para \"mudar\" o estilo dele.</strong> Uma boa prenda melhora o que ele já faz, não o que achas que ele devia fazer.</li></ul>"
      },
      {
        h2: "Na dúvida: oferece um corte",
        html: "<p>Se nada disto encaixa, há uma prenda que funciona sempre: <strong>um corte ou uma barba numa boa barbearia</strong>. Algumas vendem vales de oferta — pergunta diretamente. Encontra uma perto dele no <a href=\"../../#explorar\">mapa do OndeCortar</a> ou procura <a href=\"../../cidades/\">por cidade</a>.</p>"
      }
    ],
    faq: [
      ["Que prenda de Natal dar a um homem?", "Algo que ele use todos os dias: um kit de barba se tem barba sem rotina, um aparador ou máquina melhor do que a que tem, ou um conjunto de barbear clássico se gosta de rituais."],
      ["Que prendas de Natal baratas posso dar a um homem?", "Um bálsamo ou óleo de barba, uma escova de javali, um creme de barbear ou uma pomada de cabelo. São pequenas, úteis e raramente compradas pelo próprio. Confirma o preço do dia antes de comprar."],
      ["Que prenda dar ao pai no Natal?", "Uma máquina de barbear elétrica nova do mesmo tipo da que ele usa (rede ou rotativa) e, para juntar, um aparador de nariz e orelhas."],
      ["Que prenda dar a um homem de 50 anos?", "Algo que torne a rotina mais confortável: uma máquina de barbear elétrica, um aparador de nariz e orelhas ou um conjunto de barbear clássico."],
      ["Que prenda dar a um homem que tem tudo?", "Melhora uma peça que ele usa todos os dias, como o aparador ou a máquina de barbear, ou oferece uma experiência: um corte numa boa barbearia."],
      ["O que dar no amigo secreto a um homem?", "Algo pequeno e útil: bálsamo ou óleo de barba, escova de barba, creme de barbear ou pomada de cabelo. Evita perfumes e aromas fortes se não conheces a pessoa."]
    ],
    faqCta: "Preferes oferecer uma experiência? Encontra uma barbearia perto dele no <a href=\"../../#explorar\">mapa do OndeCortar</a>.",
    related: ["presentes-para-namorado-ideias", "melhor-kit-de-barba-para-oferecer", "melhor-maquina-de-barbear-eletrica-qual-escolher"],
    finalCta: {
      h2: "Uma prenda que ele usa, não que ele guarda",
      text: "Espreita a casa de banho dele, escolhe pela pessoa e compra a tempo.",
      actions: [["../../loja/para-oferecer/", "Ver prendas"], ["../../loja/kits-de-barba/", "Ver kits de barba"]]
    }
  }
];
