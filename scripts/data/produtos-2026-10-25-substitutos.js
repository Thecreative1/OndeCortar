// 2026-10-25 — revisão técnica: 2 produtos "No disponible" na Amazon.es (só ofertas de terceiros).
// Substitutos confirmados na página da Amazon.es a 2026-10-25 (título, características, stock).
// Sem preços, avaliações ou alegações de teste.
//
// O Beardburys já foi trocado PELO Clippercare a 2026-10-05 (produtos-2026-10-substitutos.js) e
// voltou a estar em stock: aqui a troca faz o caminho inverso. add-store-products.js regenera a
// página produto/beardburys-spray/ sem o aviso de indisponível. Não voltar a correr
// apply-product-replacements.js com o ficheiro de 2026-10-05: desfazia esta troca.
module.exports = [
  {
    slug: "philips-bt3619-series-3000", name: "Philips Beard Trimmer Série 3000 BT3619/15", brand: "Philips", asin: "B0F725KDWK",
    replaces: "philips-bt3238", checkedOn: "25 de outubro de 2026",
    image: "imagens/produtos/philips-bt3619.jpg", alt: "Aparador de barba Philips Série 3000 BT3619/15 com pente de 0,5 a 10 mm e bolsa",
    bestFor: "Barba sem complicação",
    summary: "Indicado para quem quer manter a barba curta alinhada em casa, com um aparador simples que não exige manutenção.",
    useCase: "Faz sentido para aparar a barba uma ou duas vezes por semana: escolhe-se o comprimento na roda e passa-se o pente, seco ou no duche.",
    highlight: "Aparador de barba da geração atual da Série 3000 da Philips, com 20 comprimentos de 0,5 a 10 mm escolhidos numa roda e lâminas que não precisam de óleo.",
    strengths: ["20 comprimentos de 0,5 a 10 mm, de 0,5 em 0,5 mm", "lâminas de pontas arredondadas que não precisam de óleo", "100% à prova de água, com carga USB e bolsa"],
    limits: ["o pente só chega aos 10 mm: não serve para barba comprida", "não traz acessórios para cabelo, nariz ou corpo"],
    categories: ["trimmers-e-shavers", "para-casa"],
    needs: ["para-casa", "para-barba", "para-contornos-e-fades"],
    articles: ["trimmer-vs-shaver-diferencas-reais", "o-essencial-para-tratar-da-barba-em-casa"],
    related: ["philips-oneblade-360-qp2724", "braun-bt5525-series-5", "braun-series-5-aio5545"]
  },
  {
    slug: "beardburys-spray", name: "Spray Beardburys 5 em 1", brand: "Beardburys", asin: "B08NXJ6X7H",
    replaces: "shave-factory-clippercare", checkedOn: "25 de outubro de 2026",
    image: "imagens/produtos/beardburys-spray.jpg", alt: "Spray Beardburys 5 em 1 para limpeza e manutenção de máquinas",
    bestFor: "Manutenção rápida",
    summary: "Indicado para barbeiros e para quem usa máquina de cortar com regularidade e quer arrefecer, limpar, lubrificar e desinfetar as lâminas num só passo.",
    useCase: "Faz sentido depois de cada corte (ou entre clientes): pulveriza-se a lâmina e não é preciso enxaguar.",
    highlight: "Spray de 400 ml da Beardburys, marca espanhola de barbearia, que arrefece, lubrifica, limpa e desinfeta as lâminas sem deixar excesso de óleo.",
    strengths: ["arrefece, lubrifica, limpa e desinfeta numa só aplicação", "não precisa de enxaguar, por isso não para o trabalho", "frasco de 400 ml para muito uso"],
    limits: ["não substitui a limpeza profunda periódica", "vendido por um vendedor externo na Amazon.es, não pela própria Amazon"],
    categories: ["manutencao-de-maquinas", "acessorios-de-barbeiro", "para-barbeiros"],
    needs: ["para-manutencao-e-higiene", "para-barbeiros"],
    articles: ["como-limpar-uma-maquina-de-cortar-cabelo", "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo"],
    related: ["shave-factory-clipper-oil", "wahl-clipper-oil", "syprin-lubrificante-maquinas"]
  }
];
