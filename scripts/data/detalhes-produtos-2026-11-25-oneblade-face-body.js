// 2026-11-25 — detalhes do Philips OneBlade 360 Face + Body QP2824/31 (produto novo do radar de 25/11).
// Aplicar com node scripts/apply-product-details.js (corre também no fim de add-store-products.js).
// Fonte: ficha da Philips na Amazon.es consultada a 25/11/2026 (características, descrição, detalhes técnicos).
// Perguntas tiradas das sugestões do Google PT ("oneblade face body vs pro", "vs intimate", "oneblade 360 face",
// "qp2824"). Factos do Pro 360 e do QP2724 vêm de detalhes-produtos-lote1.js. Sem preços, avaliações nem "testámos".
const FONTE = "Características publicadas pela Philips na Amazon.es, consultadas a 25 de novembro de 2026. Confirma o modelo antes de comprar.";

module.exports = [
  {
    slug: "philips-oneblade-360-face-body-qp2824",
    title: "Philips OneBlade 360 Face + Body QP2824: o que tem e como usar",
    description: "Philips OneBlade 360 Face + Body QP2824: kit corporal, 3 lâminas, pentes de 1, 3 e 5 mm, bateria e a diferença para o OneBlade 360 e o Pro 360.",
    porque: [
      "É a versão do OneBlade 360 que traz kit corporal: os pentes de barba de 1, 3 e 5 mm do {{philips-oneblade-360-qp2724|OneBlade 360}}, mais um pente de 3 mm e um protetor de pele para o peito, as axilas ou as pernas, e 3 lâminas 360 na caixa.",
      "Se a barba muda muito de comprimento, o {{philips-oneblade-pro-360|OneBlade Pro 360}} tem pente de 20 comprimentos e até 120 minutos de bateria. Para a zona íntima, a Philips tem uma versão própria, o {{philips-oneblade-intimate-qp1924|OneBlade Intimate}}."
    ],
    paraQuem: "Para quem usa barba curta ou de poucos dias e quer aparar também o corpo com o mesmo aparelho, a seco ou no duche.",
    ficha: [
      ["Modelo", "Philips OneBlade 360 Face + Body QP2824/31"],
      ["Lâmina", "360, de aço inoxidável; 12 000 movimentos por minuto, segundo a marca"],
      ["Pentes", "3 pentes de barba (1, 3 e 5 mm) e pente corporal de 3 mm com protetor de pele"],
      ["Bateria", "NiMH, 45 minutos depois de 8 horas de carga, por cabo USB-A"],
      ["Água", "A seco ou molhado, com ou sem espuma, também no duche"],
      ["Na caixa", "OneBlade 360, 3 lâminas 360, 3 pentes de barba, kit corporal, tampa de proteção e cabo USB-A (adaptador de corrente não incluído)"]
    ],
    fonte: FONTE,
    versao: "QP2824/31 é a versão Face + Body do OneBlade 360. Em relação ao {{philips-oneblade-360-qp2724|OneBlade 360 QP2724}}, que é só para o rosto, traz o kit corporal e 3 lâminas em vez de 2. O {{philips-oneblade-pro-360|OneBlade Pro 360 Face + Body}} é outro modelo, com pente de 20 comprimentos e mais bateria.",
    comoUsar: [
      "Para a barba, encaixa o pente de 1, 3 ou 5 mm e passa contra o sentido do pelo.",
      "Para contornar, tira o pente e usa a aresta da lâmina na linha do pescoço e das maçãs do rosto.",
      "Para o corpo, encaixa o pente corporal ou o protetor de pele e passa devagar, sem carregar.",
      "No fim, passa a lâmina por água corrente e deixa secar antes de pôr a tampa. A Philips indica que cada lâmina dura até 4 meses."
    ],
    faq: [
      ["Qual a diferença entre o OneBlade 360 Face + Body e o OneBlade Pro 360?", "O Face + Body (QP2824) traz 3 pentes de barba (1, 3 e 5 mm), kit corporal, 3 lâminas e 45 minutos de bateria. O Pro 360 Face + Body tem pente de 20 comprimentos (0,4 a 10 mm), kit corporal e até 120 minutos."],
      ["Qual a diferença para o OneBlade 360 QP2724?", "O QP2724 é só para o rosto e traz 2 lâminas. O Face + Body tem os mesmos pentes de barba de 1, 3 e 5 mm e acrescenta o pente corporal de 3 mm, o protetor de pele e uma terceira lâmina."],
      ["O OneBlade 360 Face + Body serve para a zona íntima?", "A ficha na Amazon inclui a zona púbica nos usos e o kit traz um protetor de pele para zonas sensíveis. Para essa zona, a Philips tem uma versão própria, o OneBlade Intimate, com lâmina SkinProtect de pontas arredondadas."],
      ["Quanto tempo dura a bateria do OneBlade 360 Face + Body?", "Segundo a Philips, 45 minutos depois de uma carga de 8 horas, por cabo USB-A. O adaptador de corrente não vem na caixa."]
    ]
  }
];
