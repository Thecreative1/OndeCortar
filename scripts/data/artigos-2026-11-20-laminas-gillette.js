// 2026-11-20 — revista/laminas-gillette-fusion5-proglide-ou-mach3/ (artigo novo; 1.º nicho escolhido pelo utilizador
// a partir do radar de procura de 20/11 — ver CLAUDE.md "Radar de procura").
// Radar (20/11): Amazon.es "comprados el mes pasado" nos 12 primeiros: cuchillas gillette fusion 5 5 200, proglide 4 650,
// mach 3 2 550; a loja não tinha nenhuma recarga Gillette. Google PT (20/11): "laminas gillette" (fusion, labs, proglide,
// mach3, proshield, continente), "gillette fusion 5" (recargas, power, continente, pingo doce), "gillette proglide"
// (recargas, power, continente), "gillette mach 3" (recargas, turbo, sensitive, continente), "qual a melhor lamina de
// barbear" (pele sensível, da gillette, marca), "mach 3 ou fusion", "gillette skinguard sensitive", "lamina de barbear
// pode ir na bagagem de mão / avião". Não compete com como-escolher-laminas-sem-irritar-a-pele-desnecessariamente
// (fev/2026, genérico); liga a ele.
// Factos só das fichas da Gillette na Amazon.es (20/11): Fusion5 B0DTTLWTQ6 (5 lâminas, banda de gel, aparador de
// precisão, até 20 barbeados com 3 por semana, encaixa em todos os cabos Fusion5 e ProGlide); ProGlide B0DTTNBVGB
// (5 lâminas ProBlades, lubrificação antes e depois das lâminas EverGlide, Flexball, aparador, até 30 barbeados, encaixa
// em ProGlide, Fusion5 ProGlide e Fusion5); Mach3 Base B0DTTN44XL (3 lâminas, banda de gel, microaletas, até 15
// barbeados, só cabos Mach3); SkinGuard Sensitive B0BWDWSKFF (pele irregular, com impurezas e irritada; reduz o contacto
// entre a pele e a lâmina; 2 lâminas; encaixa em SkinGuard Sensitive, ProGlide, ProShield e Fusion; uma recarga chega
// para até 1 mês); GilletteLabs B0BZRY94KR (só cabos GilletteLabs, incluindo os com barra esfoliante e o aquecido;
// 5 lâminas; abertura central). Sem preços, avaliações nem "testámos". Recargas "compatíveis" de outras marcas: não analisadas.
const amzUrl = (asin) => "https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT";
const cta = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"" + amzUrl(asin) + "\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";
const p = (slug, name) => "<a href=\"../../produto/" + slug + "/\">" + name + "</a>";
const r = (href, text) => "<a href=\"../../revista/" + href + "/\">" + text + "</a>";
const table = (cols, rows) =>
  "<div class=\"oc-compare-wrap\"><table class=\"oc-compare-table oc-numbers-table\"><thead><tr>" + cols.map((c) => "<th scope=\"col\">" + c + "</th>").join("") + "</tr></thead><tbody>" +
  rows.map((row) => "<tr><th scope=\"row\">" + row[0] + "</th>" + row.slice(1).map((c, i) => "<td data-label=\"" + cols[i + 1] + "\">" + c + "</td>").join("") + "</tr>").join("") +
  "</tbody></table></div>";

const F5 = "gillette-fusion5-recargas";
const PG = "gillette-proglide-recargas";
const M3 = "gillette-mach3-recargas";
const SG = "gillette-skinguard-sensitive-recargas";

module.exports = [
  {
    slug: "laminas-gillette-fusion5-proglide-ou-mach3",
    category: "guias-de-compra",
    published: "2026-11-20",
    title: "Lâminas Gillette: Fusion5, ProGlide ou Mach3, qual comprar?",
    h1: "Lâminas Gillette: Fusion5, ProGlide ou Mach3, qual comprar?",
    description: "Recargas Gillette Fusion5, ProGlide, Mach3 ou SkinGuard: qual comprar, quantos barbeados dura cada uma, que cabos servem e qual para pele sensível.",
    schemaDescription: "Que recargas Gillette comprar: Fusion5, ProGlide, Mach3, SkinGuard Sensitive ou GilletteLabs, quantos barbeados dura cada lâmina segundo a marca, que recargas servem em cada cabo e qual escolher para pele sensível.",
    image: "imagens/revista/laminas-gillette.jpg",
    imageAlt: "Homem com espuma de barbear no rosto a fazer a barba com uma máquina de lâminas, à frente de um espelho redondo",
    readMinutes: 7,
    criteria: "Características e compatibilidades conforme publicadas pela Gillette nas fichas da Amazon.es, consultadas a 20 de novembro de 2026. Os barbeados por recarga são os números da marca, com 3 barbeados por semana. Não testamos produtos.",
    lede: "A primeira pergunta não é qual é a melhor: é que cabo tens. As recargas Fusion5 e ProGlide servem nos dois cabos, as Mach3 só nos Mach3 e as GilletteLabs só nos GilletteLabs. Se tens um cabo Fusion5 ou ProGlide, a nossa escolha é a ProGlide: segundo a Gillette, dura até 30 barbeados, contra 20 da Fusion5.",
    subcopy: "As diferenças reais entre Fusion5, ProGlide, Mach3 e SkinGuard, quanto dura cada lâmina, que recargas servem no teu cabo e qual escolher para pele sensível. Só com o que a Gillette publica.",
    heroActions: [["#qual-comprar", "Qual comprar"], ["#compatibilidade", "Que recargas servem no meu cabo"]],
    quick: [
      ["Qual é a melhor lâmina Gillette?", "Com cabo Fusion5 ou ProGlide, a ProGlide: 5 lâminas, Flexball e até 30 barbeados por recarga, segundo a marca. A Fusion5, das mais vendidas, também serve no mesmo cabo."],
      ["Fusion5 ou Mach3?", "Depende do cabo: não são compatíveis. A Mach3 tem 3 lâminas e dura até 15 barbeados; a Fusion5 tem 5 e dura até 20."],
      ["E para pele sensível?", "A SkinGuard Sensitive, feita para reduzir o contacto da lâmina com a pele. Serve nos cabos Fusion e ProGlide."],
      ["Quanto dura uma lâmina?", "Segundo a Gillette, com 3 barbeados por semana: Mach3 até 15, Fusion5 até 20, ProGlide até 30. Troca antes se começar a puxar ou a irritar."]
    ],
    summary: [
      "Primeiro vê o nome no cabo: decide que recargas servem",
      "Fusion5 e ProGlide são compatíveis entre si",
      "Mach3 só no cabo Mach3; GilletteLabs só no cabo Labs",
      "ProGlide: a que dura mais barbeados, segundo a marca",
      "Pele sensível: SkinGuard Sensitive",
      "Troca a lâmina quando puxa, não pelo calendário"
    ],
    sideCard: {
      eyebrow: "Loja",
      title: "Recargas Gillette ProGlide",
      text: "5 lâminas, Flexball e até 30 barbeados por recarga, segundo a Gillette. Servem nos cabos ProGlide e Fusion5.",
      actions: [["../../produto/" + PG + "/", "Ver as ProGlide"], ["../../loja/navalhas-e-laminas/", "Navalhas e lâminas"]]
    },
    sections: [
      {
        id: "qual-comprar",
        h2: "Fusion5, ProGlide ou Mach3: qual comprar",
        html: "<p>As três famílias mais vendidas da Gillette em Portugal não são três versões da mesma coisa: têm números de lâminas diferentes, duram um número diferente de barbeados e nem todas encaixam no mesmo cabo. Este é o resumo, com os números que a Gillette publica:</p>" +
          table(["Recarga", "Lâminas", "Barbeados por recarga*", "Encaixa em"], [
            [p(M3, "Mach3"), "3", "até 15", "só cabos Mach3"],
            [p(F5, "Fusion5"), "5", "até 20", "cabos Fusion5 e ProGlide"],
            [p(PG, "ProGlide"), "5, com Flexball", "até 30", "cabos ProGlide e Fusion5"],
            [p(SG, "SkinGuard Sensitive"), "2, para pele sensível", "até 1 mês", "cabos SkinGuard, ProGlide, ProShield e Fusion"]
          ]) +
          "<p><small>* Segundo a Gillette, com 3 barbeados por semana.</small></p>" +
          "<h3>A nossa escolha: ProGlide, se o teu cabo é Fusion5 ou ProGlide</h3>" +
          "<p>As " + p(PG, "recargas ProGlide") + " têm 5 lâminas, lubrificação antes e depois das lâminas e a cabeça Flexball, que se adapta aos contornos do rosto. O argumento mais prático é a duração: a Gillette fala em até 30 barbeados por recarga, contra 20 da Fusion5. Servem nos cabos ProGlide e também nos Fusion5, por isso não precisas de mudar de máquina.</p>" +
          cta("B0DTTNBVGB", PG) +
          "<h3>A escolha segura: Fusion5</h3>" +
          "<p>As " + p(F5, "recargas Fusion5") + " estão entre as mais compradas na Amazon.es. Têm 5 lâminas, banda de gel lubrificante e um aparador de precisão nas costas para as patilhas e debaixo do nariz. Segundo a marca, duram até 20 barbeados. Servem nos cabos Fusion5 e ProGlide.</p>" +
          cta("B0DTTLWTQ6", F5) +
          "<h3>Se tens um cabo Mach3: Mach3</h3>" +
          "<p>As " + p(M3, "recargas Mach3") + " só servem nos cabos Mach3. Têm 3 lâminas, banda de gel e microaletas à frente das lâminas para preparar a pele, e duram até 15 barbeados. Se o teu cabo é Mach3 e estás contente, não há razão para mudar. Se queres mais lâminas, tens de comprar um cabo Fusion5 ou ProGlide.</p>" +
          cta("B0DTTN44XL", M3)
      },
      {
        id: "compatibilidade",
        h2: "Que recargas servem no meu cabo",
        html: "<p>É a dúvida que mais compras erradas provoca. Olha para o nome escrito no cabo e procura-o nesta tabela:</p>" +
          table(["O teu cabo", "Recargas que servem", "Não servem"], [
            ["Fusion5", "Fusion5, ProGlide, SkinGuard Sensitive", "Mach3, GilletteLabs"],
            ["ProGlide", "ProGlide, Fusion5, SkinGuard Sensitive", "Mach3, GilletteLabs"],
            ["Mach3", "Mach3", "Fusion5, ProGlide, GilletteLabs"],
            ["GilletteLabs", "GilletteLabs", "Outras: confirmar na embalagem"],
            ["SkinGuard Sensitive", "SkinGuard Sensitive", "Outras: confirmar na embalagem"]
          ]) +
          "<p>Fonte: as compatibilidades que a Gillette indica em cada recarga. Se o teu cabo é de outra gama (Power, ProShield, Sensor), confirma na embalagem antes de comprar um pack grande.</p>"
      },
      {
        id: "quanto-dura",
        h2: "Quanto tempo dura uma lâmina Gillette",
        html: "<p>A Gillette dá um número de barbeados por recarga, contado com 3 barbeados por semana:</p><ul class=\"rich-list\">" +
          "<li><strong>Mach3:</strong> até 15 barbeados, cerca de 5 semanas.</li>" +
          "<li><strong>Fusion5:</strong> até 20 barbeados, cerca de 7 semanas.</li>" +
          "<li><strong>ProGlide:</strong> até 30 barbeados, cerca de 10 semanas.</li>" +
          "<li><strong>SkinGuard Sensitive:</strong> até 1 mês por recarga.</li></ul>" +
          "<p>Se te barbeias todos os dias, divide por dois. E o número é um máximo: barba dura, pouca espuma ou pressão a mais gastam a lâmina mais depressa. <strong>A regra prática é trocar quando começa a puxar, a arranhar ou a irritar</strong>, não pelo calendário. Uma lâmina gasta é uma das causas mais comuns de irritação depois do barbear.</p>" +
          "<p><strong>Para durar mais:</strong> passa a lâmina por água quente entre passagens, não a batas no lavatório (estraga o alinhamento das lâminas), e no fim deixa-a secar fora do duche.</p>"
      },
      {
        id: "pele-sensivel",
        h2: "Qual a melhor lâmina de barbear para pele sensível",
        html: "<p>Na gama Gillette, a resposta é a " + p(SG, "SkinGuard Sensitive") + ". Ao contrário das outras, não aposta em mais lâminas: tem 2, com uma proteção entre elas que, segundo a marca, reduz o contacto da lâmina com a pele e ajuda a reduzir a irritação. Foi feita para pele irregular, com impurezas ou irritada, e serve nos cabos SkinGuard, ProGlide, ProShield e Fusion.</p>" +
          cta("B0BWDWSKFF", SG) +
          "<p>Mas a lâmina é metade do problema. Barbear a favor do pelo, com a pele molhada, um " + p("gillette-pro-gel-pele-sensivel", "gel para pele sensível") + " e sem voltar a passar no mesmo sítio faz tanta diferença como a recarga. Explicamos o resto em " + r("como-escolher-laminas-sem-irritar-a-pele-desnecessariamente", "como escolher lâminas sem irritar a pele") + " e " + r("creme-espuma-ou-gel-de-barbear-qual-escolher", "creme, espuma ou gel de barbear") + ".</p>"
      },
      {
        id: "gillettelabs",
        h2: "GilletteLabs: atenção ao cabo",
        html: "<p>As recargas GilletteLabs aparecem muitas vezes ao lado das Fusion5 e ProGlide, mas não são intermutáveis. Segundo a Gillette, servem em todos os cabos GilletteLabs (incluindo o da barra esfoliante e o aquecido) e só nesses: têm uma abertura no centro para encaixar a barra. Têm 5 lâminas e um aparador nas costas. Se não tens um cabo GilletteLabs, não as compres a pensar que servem no teu Fusion.</p>"
      },
      {
        id: "onde-comprar",
        h2: "Continente, Pingo Doce ou online?",
        html: "<p>Muita gente procura as recargas Gillette no supermercado, e são as mesmas: a Fusion5 do Continente ou do Pingo Doce é a Fusion5 da Amazon. A diferença costuma estar no tamanho dos packs. Online encontras packs de 12, 15 ou 20 recargas, que no supermercado nem sempre há. Compara sempre o preço por recarga, não o preço da caixa.</p>" +
          "<p>Na Amazon.es também aparecem recargas \"compatíveis com Gillette\" de outras marcas. Não são da Gillette e não as analisámos, por isso não as recomendamos: confirma o nome da marca antes de comprar.</p>"
      },
      {
        id: "lamina-ou-maquina",
        h2: "Lâmina, máquina elétrica ou barbearia?",
        html: "<p>A lâmina dá o barbear mais rente, mas pede espuma, tempo e lâminas novas. Se te barbeias todos os dias e a pele reage, uma " + r("melhor-maquina-de-barbear-eletrica-qual-escolher", "máquina de barbear elétrica") + " pode ser mais confortável. Se gostas de barba de poucos dias, um " + r("laminas-oneblade-qual-comprar-e-quanto-duram", "OneBlade") + " corta e apara sem rapar até à pele. E se queres um barbear clássico, com toalha quente e navalha, há barbearias que o fazem: encontras uma perto de ti no <a href=\"../../cidades/\">diretório por cidade</a>.</p>"
      }
    ],
    faq: [
      ["Qual é a melhor lâmina Gillette?", "Se o teu cabo é Fusion5 ou ProGlide, escolhemos a ProGlide: 5 lâminas, Flexball e até 30 barbeados por recarga, segundo a Gillette. A Fusion5, das mais compradas, serve no mesmo cabo. Para pele sensível, a SkinGuard Sensitive. Não testamos produtos."],
      ["Fusion5 ou ProGlide: qual a diferença?", "As duas têm 5 lâminas e servem nos mesmos cabos. A ProGlide acrescenta lubrificação antes e depois das lâminas e a cabeça Flexball, e a Gillette diz que dura até 30 barbeados, contra 20 da Fusion5."],
      ["Mach3 ou Fusion5?", "Não são compatíveis: a Mach3 só serve no cabo Mach3. A Mach3 tem 3 lâminas e dura até 15 barbeados; a Fusion5 tem 5 e dura até 20, segundo a marca. Se já tens cabo Mach3 e estás contente, não precisas de mudar."],
      ["As recargas Fusion5 servem no cabo ProGlide?", "Sim. Segundo a Gillette, as Fusion5 servem em todos os cabos Fusion5 e ProGlide, e as ProGlide servem nos cabos ProGlide e Fusion5."],
      ["As lâminas GilletteLabs servem no cabo Fusion5?", "Não. Segundo a Gillette, as recargas GilletteLabs servem só nos cabos GilletteLabs, incluindo o da barra esfoliante e o aquecido."],
      ["Quanto tempo dura uma lâmina de barbear?", "Segundo a Gillette, com 3 barbeados por semana: Mach3 até 15 barbeados, Fusion5 até 20, ProGlide até 30, e a SkinGuard Sensitive até 1 mês. Troca antes se a lâmina começar a puxar ou a irritar."],
      ["Qual a melhor lâmina de barbear para pele sensível?", "Na Gillette, a SkinGuard Sensitive, feita para reduzir o contacto da lâmina com a pele. Serve nos cabos SkinGuard, ProGlide, ProShield e Fusion. Barbear a favor do pelo e com gel para pele sensível ajuda tanto como a lâmina."],
      ["As recargas do Continente são iguais às da Amazon?", "Sim, são as mesmas recargas Gillette. Online há packs maiores; compara o preço por recarga. Atenção às recargas \"compatíveis\" de outras marcas, que não são Gillette."],
      ["Posso levar a lâmina de barbear na bagagem de mão?", "Em geral, as máquinas de lâminas descartáveis e de recargas podem ir na bagagem de mão, mas lâminas soltas, como as de máquinas de segurança ou de navalhas, não. As regras dependem do aeroporto e da companhia: confirma antes de viajar."]
    ],
    faqCta: "Vê as <a href=\"../../produto/" + PG + "/\">ProGlide</a>, as <a href=\"../../produto/" + F5 + "/\">Fusion5</a>, as <a href=\"../../produto/" + M3 + "/\">Mach3</a> ou as <a href=\"../../produto/" + SG + "/\">SkinGuard Sensitive</a>.",
    related: ["como-escolher-laminas-sem-irritar-a-pele-desnecessariamente", "creme-espuma-ou-gel-de-barbear-qual-escolher", "laminas-oneblade-qual-comprar-e-quanto-duram"],
    finalCta: {
      h2: "Primeiro o cabo, depois a recarga",
      text: "Vê o nome no cabo, escolhe a recarga que lá encaixa e troca-a quando começar a puxar. É isso que faz um bom barbear, mais do que o número de lâminas.",
      actions: [["../../produto/" + PG + "/", "Ver as ProGlide"], ["../../loja/navalhas-e-laminas/", "Navalhas e lâminas"]]
    }
  }
];
