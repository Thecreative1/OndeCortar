// 2026-11-20 — recargas Gillette para revista/laminas-gillette-fusion5-proglide-ou-mach3/. 1.º nicho do radar de procura
// (20/11), escolhido pelo utilizador: Amazon.es "comprados el mes pasado" fusion5 5 200, proglide 4 650, mach3 2 550
// (soma dos 12 primeiros); a loja não tinha recargas Gillette. Os 4 vendidos pela Amazon e em stock a 20/11.
// Escolhidos os packs mais comprados de cada família (Fusion5 12: 800+; ProGlide 12: 200+; Mach3 15: 600+; SkinGuard 11: 100+).
// Só dados das fichas da Gillette na Amazon.es (20/11). Sem preços nem avaliações. Packs de outras marcas
// "compatíveis com Gillette" ficaram de fora (não analisados).
const ART = "laminas-gillette-fusion5-proglide-ou-mach3";
module.exports = [
  {
    slug: "gillette-proglide-recargas", name: "Gillette ProGlide recargas (pack de 12)", brand: "Gillette", asin: "B0DTTNBVGB",
    image: "imagens/produtos/gillette-proglide-recargas.jpg", alt: "Caixa de 12 recargas Gillette ProGlide com uma recarga em destaque e o cordão incluído no pack",
    bestFor: "A que dura mais barbeados",
    summary: "Indicado para quem tem um cabo ProGlide ou Fusion5 e quer a recarga de 5 lâminas que, segundo a Gillette, dura mais barbeados.",
    useCase: "Encaixa nos cabos ProGlide, Fusion5 ProGlide e Fusion5. Com 3 barbeados por semana, a marca fala em até 30 barbeados por recarga, cerca de 10 semanas.",
    highlight: "Recargas de 5 lâminas ProBlades com lubrificação antes e depois das lâminas (EverGlide), cabeça Flexball que se adapta aos contornos do rosto e aparador de precisão, até 30 barbeados cada, segundo a Gillette.",
    strengths: ["até 30 barbeados por recarga com 3 por semana, segundo a marca", "cabeça Flexball e lubrificação antes e depois das lâminas", "servem também nos cabos Fusion5"],
    limits: ["não servem nos cabos Mach3 nem GilletteLabs", "não trazem cabo: é preciso já ter um ProGlide ou Fusion5"],
    categories: ["navalhas-e-laminas"],
    articles: [ART],
    related: ["gillette-fusion5-recargas", "gillette-skinguard-sensitive-recargas", "gillette-pro-gel-pele-sensivel"]
  },
  {
    slug: "gillette-fusion5-recargas", name: "Gillette Fusion5 recargas (pack de 12)", brand: "Gillette", asin: "B0DTTLWTQ6",
    image: "imagens/produtos/gillette-fusion5-recargas.jpg", alt: "Caixa de 12 recargas Gillette Fusion5 com estojo de viagem e uma recarga laranja em destaque",
    bestFor: "A escolha segura",
    summary: "Indicado para quem tem um cabo Fusion5 ou ProGlide e quer a recarga de 5 lâminas mais comum, em pack grande.",
    useCase: "Encaixa em todos os cabos Fusion5 e ProGlide. Com 3 barbeados por semana, a Gillette fala em até 20 barbeados por recarga, cerca de 7 semanas.",
    highlight: "Recargas de 5 lâminas com banda de gel lubrificante e aparador de precisão nas costas, para patilhas e debaixo do nariz; até 20 barbeados cada, segundo a Gillette.",
    strengths: ["5 lâminas e banda de gel lubrificante", "aparador de precisão para as zonas difíceis", "servem nos cabos Fusion5 e ProGlide"],
    limits: ["dura menos barbeados do que a ProGlide (até 20 contra 30, segundo a marca)", "não serve nos cabos Mach3 nem GilletteLabs, e não traz cabo"],
    categories: ["navalhas-e-laminas"],
    articles: [ART],
    related: ["gillette-proglide-recargas", "gillette-skinguard-sensitive-recargas", "gillette-pro-gel-pele-sensivel"]
  },
  {
    slug: "gillette-mach3-recargas", name: "Gillette Mach3 recargas (pack de 15)", brand: "Gillette", asin: "B0DTTN44XL",
    image: "imagens/produtos/gillette-mach3-recargas.jpg", alt: "Caixa de 15 recargas Gillette Mach3 com estojo de viagem e uma recarga azul em destaque",
    bestFor: "Para quem tem cabo Mach3",
    summary: "Indicado para quem já tem um cabo Mach3 e quer continuar com ele, em pack de 15.",
    useCase: "Só encaixa nos cabos Mach3. Com 3 barbeados por semana, a Gillette fala em até 15 barbeados por recarga, cerca de 5 semanas.",
    highlight: "Recargas Mach3 Base de 3 lâminas com revestimento para reduzir a pressão na pele, banda de gel lubrificante e microaletas à frente das lâminas; até 15 barbeados cada, segundo a Gillette.",
    strengths: ["3 lâminas com revestimento e microaletas que preparam a pele", "banda de gel lubrificante", "pack de 15 recargas"],
    limits: ["só servem nos cabos Mach3: com um cabo Fusion5 ou ProGlide não encaixam", "duram menos barbeados (até 15) do que as Fusion5 e ProGlide, segundo a marca"],
    categories: ["navalhas-e-laminas"],
    articles: [ART],
    related: ["gillette-fusion5-recargas", "gillette-proglide-recargas", "gillette-pro-gel-pele-sensivel"]
  },
  {
    slug: "gillette-skinguard-sensitive-recargas", name: "Gillette SkinGuard Sensitive recargas (pack de 11)", brand: "Gillette", asin: "B0BWDWSKFF",
    image: "imagens/produtos/gillette-skinguard-sensitive-recargas.jpg", alt: "Caixa de 11 recargas Gillette SkinGuard Sensitive com a máquina na caixa e as recargas ao lado",
    bestFor: "Pele sensível",
    summary: "Indicado para quem tem pele sensível, irritada ou com borbulhas e quer uma recarga que toque menos na pele.",
    useCase: "Encaixa nos cabos SkinGuard Sensitive, ProGlide, ProShield e Fusion. A Gillette diz que uma recarga chega para até 1 mês de barbear.",
    highlight: "Recargas de 2 lâminas com a proteção SkinGuard entre elas, que reduz o contacto da lâmina com a pele, e tiras deslizantes antes e depois das lâminas; feitas para pele irregular, com impurezas ou irritada.",
    strengths: ["menos contacto da lâmina com a pele, segundo a marca", "feita para pele sensível, irritada ou com borbulhas", "serve nos cabos ProGlide, ProShield e Fusion"],
    limits: ["2 lâminas: barbeia menos rente por passagem do que as recargas de 5", "a lâmina não resolve tudo: técnica e gel contam tanto como a recarga"],
    categories: ["navalhas-e-laminas"],
    articles: [ART, "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente"],
    related: ["gillette-pro-gel-pele-sensivel", "gillette-proglide-recargas", "gillette-fusion5-recargas"]
  }
];
