// Sementes e filtros do radar de procura (scripts/radar-procura.js). Criado a 2026-11-20.
// Acrescentar sementes quando aparecer um tema novo (pedido de uma barbearia, pedido indireto da Amazon,
// pesquisa no Search Console). Tudo em minúsculas e sem acentos nas listas de filtro.
module.exports = {
  // O que se escreve no Google em Portugal: temas de homem, barba, cabelo e barbearia.
  GOOGLE_PT: [
    "barba", "bigode", "barbear", "aparador", "maquina de barbear", "maquina de cortar cabelo", "lamina de barbear",
    "navalha", "after shave", "creme de barbear", "oleo de barba", "balsamo barba", "champo barba", "tinta barba",
    "cabelo homem", "corte de cabelo homem", "champo homem", "cera cabelo", "pomada cabelo", "gel cabelo homem",
    "caracois homem", "cabelos brancos homem", "careca", "queda de cabelo homem", "caspa homem",
    "pele homem", "creme rosto homem", "creme hidratante homem", "rugas homem", "olheiras homem",
    "protetor solar homem", "pontos negros homem", "sobrancelhas homem", "pelos nariz", "pelos orelhas",
    "depilacao homem", "pelos peito homem", "pelos costas", "aparador corporal", "unhas homem",
    "kit barba", "prenda homem", "presente homem", "prenda pai", "material barbeiro", "produtos barbearia",
    "tesoura cabelo", "pente barba", "escova barba", "secador cabelo homem", "escova alisadora",
    "perfume barbearia", "desodorizante homem"
  ],
  // Prefixos/sufixos que mostram intenção (compra, dúvida). Terminar em espaço = prefixo.
  MODIFICADORES_PT: ["melhor ", "qual ", "como ", "para", "de"],
  // O que se escreve na Amazon.es (intenção de compra). Espanhol.
  AMAZON_ES: [
    "barba", "bigote", "afeitadora", "maquina de afeitar", "cortapelos", "recortadora", "cuchillas", "navaja",
    "after shave", "espuma afeitar", "aceite barba", "balsamo barba", "champu barba", "tinte barba",
    "hombre pelo", "champu hombre", "cera pelo hombre", "pomada pelo", "canas hombre", "calvo",
    "crema hombre", "crema facial hombre", "contorno ojos hombre", "protector solar hombre", "cejas hombre",
    "nariz", "orejas pelo", "depiladora hombre", "corporal hombre", "kit barba", "regalo hombre",
    "barbero", "barberia", "tijeras pelo", "peine barba", "cepillo barba", "secador hombre", "cepillo alisador"
  ],
  // Um termo só conta se tiver uma destas palavras (sem acentos).
  NICHO: [
    "barba", "barbe", "bigod", "bigot", "patilh", "cabelo", "pelo", "pelos", "cabeca", "careca", "calv", "rosto", "pele", "cara ",
    "barbear", "afeit", "aparador", "recort", "cortapelo", "maquina de cortar", "laminas", "lamina", "cuchill", "navalha", "navaja",
    "after", "tinta", "tinte", "champo", "champu", "shampoo", "cera", "pomada", "gel ", "creme", "crema", "oleo", "aceite", "balsamo",
    "pente", "peine", "escova", "cepillo", "sobrancelh", "ceja", "nariz", "orelha", "oreja", "depil", "corporal", "body", "groom",
    "oneblade", "philips", "braun", "wahl", "remington", "gillette", "babyliss", "proraso", "just for men", "nivea men",
    "barbeiro", "barbero", "barbearia", "barberia", "caspa", "brancos", "canas", "rugas", "olheiras", "contorno", "hidratante",
    "protetor solar", "protector solar", "pontos negros", "caracois", "rizos", "homem", "hombre", "tesoura", "tijera", "secador", "alisador"
  ],
  // Ruído: Brasil, lojas, outros temas que as sementes apanham.
  RUIDO: [
    "shopee", "mercado livre", "mercadolivre", "magalu", "americanas", "mondial", "dragao", "philco", "wmark", "kemei", "britania", "cadence",
    "custo beneficio", "barbacoa", "parrilla", "barbara", "barbapapa", "barbie", "coser", "cafe", "nespresso", "tatuar", "humo",
    "cachorro", "cao ", "perro", "gato", "caballo", "bebe", "bebé", "mulher", "mujer", "feminin", "senhora", "infantil",
    "png", "desenho", "tatuagem", "one piece", "letra", "musica", "filme", "pelicula", "significado", "sonhar",
    "olx", "usada", "segunda mao", "aluguer", "emprego", "curso", "formacao", "perto de mim", "horario", "preco corte",
    "disfraz", "fantasia", "halloween", "carnaval", "bruja", "bruxa", "conejo", "postizo", "postico", "piercing", "pirata", "barba negra",
    "paraguai", "calvin klein", "juguete", "brinquedo", "peluche", "muneca", "opinel", "orejas pelo", "orelhas cabelo", "barba falsa", "ghd",
    "victorinox", "multiusos", "tactica", "supervivencia", "thermomix", "cocina", "peluca", "caza", "pesca", "ensalada", "atun"
  ],
  // Saúde: o radar marca com ⚕ (só factos do fabricante; quando é doença, o artigo remete para o médico).
  SAUDE: ["queda", "calvicie", "minoxidil", "alopecia", "finasterida", "caspa", "dermatite", "acne", "psoriase", "foliculite", "alergia"],
  MARCAS: ["philips", "braun", "wahl", "remington", "gillette", "babyliss", "proraso", "just for men", "nivea", "loreal", "l oreal", "cerave",
    "la roche", "isdin", "american crew", "reuzel", "beardburys", "uppercut", "taylor", "oneblade", "panasonic", "rowenta", "andis", "oster", "jrl"],
  // Tradução mínima ES→PT para cruzar a Amazon.es com o Google PT e com os títulos do site.
  ES_PT: [
    ["hombre", "homem"], ["hombres", "homem"], ["afeitadora", "maquina de barbear"], ["maquina de afeitar", "maquina de barbear"], ["afeitar", "barbear"],
    ["cortapelos", "maquina de cortar cabelo"], ["recortadora", "aparador"], ["cuchillas", "laminas"], ["cuchilla", "lamina"], ["navaja", "navalha"],
    ["tinte", "tinta"], ["canas", "cabelos brancos"], ["pelo", "cabelo"], ["champu", "champo"], ["aceite", "oleo"], ["crema", "creme"],
    ["bigote", "bigode"], ["cejas", "sobrancelhas"], ["orejas", "orelhas"], ["oreja", "orelha"], ["calvo", "careca"], ["peine", "pente"],
    ["cepillo", "escova"], ["tijeras", "tesoura"], ["regalo", "prenda"], ["barbero", "barbeiro"], ["barberia", "barbearia"],
    ["contorno ojos", "contorno de olhos"], ["protector", "protetor"], ["depiladora", "depiladora"], ["espuma", "espuma"], ["rizos", "caracois"],
    ["cara", "rosto"], ["facial", "rosto"], ["cuerpo", "corpo"], ["corporal", "corporal"], ["electrica", "eletrica"], ["electrico", "eletrico"]
  ],
  // Sinónimos para a cobertura: uma palavra do termo conta como presente se o título tiver qualquer uma do grupo.
  SINONIMOS: [
    ["presente", "prenda", "oferecer", "oferta"], ["shampoo", "champo"], ["navalha", "navalhas", "lamina"], ["hidratante", "creme"],
    ["material", "equipamento", "acessorio", "barbeiro"], ["maquina", "aparador", "trimmer"], ["depiladora", "aparador", "depilacao"],
    ["barbear", "barba"], ["cabelos", "cabelo"], ["brancos", "grisalha", "branca"]
  ],
  PALAVRAS_VAZIAS: ["para", "com", "sem", "que", "qual", "como", "melhor", "melhores", "the", "por", "dos", "das", "uma", "um", "homem", "hombre",
    "masculino", "masculina", "homens", "de", "do", "da", "em", "no", "na", "e", "o", "a", "os", "as", "mais", "the", "con", "los", "las", "del",
    "comprar", "barato", "barata", "preco", "precio", "venda", "portugal", "online", "amazon"]
};
