const barbearias = [

// === GUIMARÃES ===
  {
    nome: "Barbearia Fora D’Horas",
    coords: [41.462816, -8.320178],
    morada: "Rua de Santa Eulália, Guimarães, Braga 4800-098",
    telefone: "+351 964 567 455",
    website: "https://www.facebook.com/Barbeariaforadhoras",
    email: "miguelbarbeiro@gmail.com"
  },
  {
    nome: "Treze Barbershop",
    morada: "Praceta Padre Luís Gonzaga Fonseca, Loja 23, Guimarães",
    telefone: "+351 253 061 842",
    email: "info@trezebarbershop.pt",
    website: "https://trezebarbershop.pt",
    coords: [41.4394, -8.2957]
  },
  {
    nome: "Black Rock Barbearia",
    morada: "Largo da República do Brasil, C. Comercial São Francisco, Loja 32, Guimarães",
    telefone: "+351 253 000 000",
    website: "https://www.fresha.com/pt/a/black-rock-barbearia-guimaraes-largo-da-republica-do-brasil-t7wbrdac",
    coords: [41.4421, -8.2913]
  },
  {
    nome: "NewVision Barbershop",
    morada: "Rua Teixeira de Pascoais, 452, Guimarães",
    telefone: "+351 253 106 341",
    instagram: "https://www.instagram.com/newvision_barbershop/",
    coords: [41.4428, -8.2905]
  },
  {
    nome: "The Barbers Studio",
    morada: "Rua Teixeira de Pascoais, 40B, Guimarães",
    facebook: "https://www.facebook.com/BarbeariaTheBarbersStudio/",
    coords: [41.4425, -8.2902]
  },
  {
    nome: "1920 Barber Shop",
    morada: "GuimarãeShopping, Guimarães",
    website: "https://www.guimaraeshopping.pt/lojas/1920-barber-shop/",
    coords: [41.4375, -8.2910]
  },

  // === FAFE ===
  {
    nome: "Barbearia Fafense",
    morada: "Rua Ponte do Ranha, nº 298, Fafe",
    website: "https://www.instagram.com/barbearia_fafense/",
    coords: [41.4515, -8.1680]
  },
  {
    nome: "Barbershop DuArt",
    morada: "Rua dos Aliados, Loja 5, 4820-248 Fafe",
    telefone: "+351 253 176 410",
    email: "duart_l@hotmail.com",
    website: "https://barbershopduart.ongenda.com/",
    coords: [41.4540, -8.1685]
  },

  // === LOUSADA ===
  {
    nome: "Korte JB Barbershop",
    morada: "R. Constituição da República 29, 4620-657 Lousada",
    telefone: "+351 910 537 197",
    instagram: "https://www.instagram.com/kortejbbarbershop/",
    horario: "Seg a Sab, 09:00 às 20:00",
    observacoes: "Atendimento por ordem de chegada.",
    coords: [41.2778327, -8.2834480]
  },

  // === NORTE OESTE ===

  {
    nome: "Barbearia Valadar",
    morada: "Rua Eng. Moura Pegado 2, 5340-211 Macedo de Cavaleiros",
    telefone: "+351 278 422 123",
    website: "https://barbeariavaladar.com/",
    email: "geral@barbeariavaladar.com",
    coords: [41.5382, -6.9614]
  },
  {
    nome: "The Six - Barber Shop",
    morada: "R. de Santo António, Ed. Santo António, Bloco De Piso 2, Loja AS, 5000-607 Vila Real",
    telefone: "+351 259 123 456",
    coords: [41.3000, -7.7440]
  },
  {
    nome: "Barbearia Real",
    morada: "Rua de Santo António 45, 5000-607 Vila Real",
    telefone: "+351 259 654 321",
    coords: [41.2950, -7.7450]
  },
  {
    nome: "Barbearia do António",
    morada: "Av. Professor Doutor Cavaco Silva 100, 5340-278 Macedo de Cavaleiros",
    telefone: "+351 278 765 432",
    coords: [41.5385, -6.9610]
  },
  {
    nome: "Barbearia Chaves",
    morada: "Rua Direita 12, 5400-123 Chaves",
    telefone: "+351 276 123 456",
    coords: [41.7404, -7.4688]
  },
  {
    nome: "Barbearia Bragança Classic",
    morada: "Av. Sá Carneiro 103, 5300-252 Bragança",
    telefone: "+351 273 987 654",
    coords: [41.8061, -6.7562]
  },
  {
    nome: "Douro Barber Shop",
    morada: "Av. João Franco 10, 5050-233 Peso da Régua",
    telefone: "+351 254 321 987",
    coords: [41.1601, -7.7899]
  },

// === CENTRO E OESTE DE PORTUGAL ===

  {
    nome: "Barbearia Vintage Lisboa",
    morada: "R. Luciano Cordeiro 81B, 1150-216 Lisboa",
    telefone: "+351 210 965 372",
    website: "https://www.instagram.com/barbeariavintage_lisboa/",
    coords: [38.7276, -9.1476]
  },
  {
    nome: "Cut by André Silva",
    morada: "Rua Alexandre Herculano 35, 1250-010 Lisboa",
    telefone: "+351 912 345 678",
    website: "https://cutbyandresilva.pt",
    coords: [38.7174, -9.1472]
  },
  {
    nome: "Nobre Arte Barbearia – Torres Vedras",
    morada: "Rua António Leal d’Ascensão 22B, 2560-302 Torres Vedras",
    telefone: "+351 917 295 274",
    website: "https://www.instagram.com/nobreartebarbearia/",
    coords: [39.0928, -9.2616]
  },
  {
    nome: "Barbearia Mustache – Caldas da Rainha",
    morada: "Rua do Comércio 74, 2500-110 Caldas da Rainha",
    telefone: "+351 262 832 918",
    coords: [39.4049, -9.1358]
  },
  {
    nome: "The Barber House – Leiria",
    morada: "Rua Dom Manuel de Aguiar 8B, 2400-137 Leiria",
    telefone: "+351 244 851 340",
    website: "https://thebarberhouse.pt/",
    coords: [39.7436, -8.8075]
  },
  {
    nome: "Barbearia Antunes – Coimbra",
    morada: "Rua da Sofia 92, 3000-389 Coimbra",
    telefone: "+351 239 824 350",
    coords: [40.2070, -8.4292]
  },
  {
    nome: "Barbearia António – Figueira da Foz",
    morada: "Av. Saraiva de Carvalho 6, 3080-154 Figueira da Foz",
    telefone: "+351 233 426 576",
    coords: [40.1494, -8.8612]
  },
  {
    nome: "Barbearia Monteiro – Castelo Branco",
    morada: "Rua Bartolomeu da Costa 1, 6000-179 Castelo Branco",
    telefone: "+351 272 345 987",
    coords: [39.8219, -7.4911]
  },
  {
    nome: "Old School Barber Shop – Covilhã",
    morada: "Rua 1º de Maio 21, 6200-066 Covilhã",
    telefone: "+351 275 323 222",
    coords: [40.2818, -7.5042]
  },
  {
    nome: "Barbearia São Romão – Seia",
    morada: "Av. 1º de Maio 4, 6270-443 Seia",
    telefone: "+351 238 310 208",
    coords: [40.4145, -7.7082]
  },
  {
    nome: "Barbearia Central – Guarda",
    morada: "Rua Vasco Borges 18, 6300-535 Guarda",
    telefone: "+351 271 220 556",
    coords: [40.5384, -7.2676]
  },
  {
    nome: "Barbearia Loureiro – Viseu",
    morada: "Rua Formosa 170, 3500-137 Viseu",
    telefone: "+351 232 421 657",
    coords: [40.6578, -7.9122]
  },
  {
    nome: "Barbearia Lima – Lamego",
    morada: "Rua da Olaria 26, 5100-120 Lamego",
    telefone: "+351 254 612 089",
    coords: [41.0981, -7.8101]
  },
  {
    nome: "Barbearia Elite – Aveiro",
    morada: "Rua Conselheiro Luís Magalhães 12, 3800-215 Aveiro",
    telefone: "+351 234 380 126",
    website: "https://www.instagram.com/barbearia.elite/",
    coords: [40.6434, -8.6538]
  },
  {
    nome: "Barbearia RickGino",
    morada: "Av. da Independência das Colónias 19, loja A, 2900-407 Setúbal",
    telefone: "+351 934 892 154",
    instagram: "https://www.instagram.com/barbearia_rickgino/",
    observacoes: "Seg-Sáb",
    coords: [38.53344812759947, -8.889120970329717]
  },
  {
    nome: "Barbearia Moura – Espinho",
    morada: "Rua 23, 4500-276 Espinho",
    telefone: "+351 227 310 426",
    coords: [41.0074, -8.6436]
  },
  {
    nome: "Barbearia Lima – São João da Madeira",
    morada: "Rua Padre Oliveira Lopes 113, 3700-230 S. João da Madeira",
    telefone: "+351 256 203 581",
    coords: [40.9010, -8.4991]
  },
  {
    nome: "Barbearia Silvério – Ovar",
    morada: "Av. Sá Carneiro 53, 3880-049 Ovar",
    telefone: "+351 256 573 002",
    coords: [40.8605, -8.6259]
  },
  {
    nome: "Barbearia Pereira – Águeda",
    morada: "Rua Dr. João O. Amaral, 3750-107 Águeda",
    telefone: "+351 234 621 312",
    coords: [40.5777, -8.4464]
  },
  {
    nome: "Barbearia Costa – Ourém",
    morada: "Rua Dr. Francisco Sá Carneiro 18, 2490-541 Ourém",
    telefone: "+351 249 544 420",
    coords: [39.6601, -8.5746]
  },
  {
    nome: "Barbearia Moderna – Santarém",
    morada: "Av. Madre Andaluz 5, 2000-210 Santarém",
    telefone: "+351 243 322 122",
    coords: [39.2334, -8.6859]
  },

// === ALGARVE ===

{
  nome: "Ruaça Barbershop",
  morada: "R. Alexandre Herculano n.º 18, 8200-271 Albufeira",
  telefone: "+351 968 403 959",
  website: "https://xn--ruaa-barbershop-gmb.pt/",
  coords: [37.0891, -8.2479]
},
{
  nome: "Chacal's Barbearia",
  morada: "Rua Cândido dos Reis 12, 8200-103 Albufeira",
  telefone: "+351 289 589 123",
  instagram: "https://www.instagram.com/chacals_barbearia/",
  coords: [37.0885, -8.2500]
},
{
  nome: "Patrick Barbershop",
  morada: "Rua do Movimento das Forças Armadas 32, 8200-157 Albufeira",
  telefone: "+351 912 345 678",
  website: "https://www.treatwell.pt/estabelecimentos/na-barbearia-1/em-albufeira-portugal-2/",
  coords: [37.0880, -8.2440]
},
{
  nome: "1920 Barbershop – Faro",
  morada: "Fórum Algarve, Loja 0.02, EN 125 - Km 103, 8009-020 Faro",
  telefone: "+351 289 889 300",
  website: "https://1920barbershop.pt/a-1920-barbershop/faro-forum-algarve/",
  coords: [37.0194, -7.9304]
},
{
  nome: "CJ Barbearia",
  morada: "Largo Dr. Francisco Sá Carneiro 47, 8000-151 Faro",
  telefone: "+351 939 501 816",
  instagram: "https://www.instagram.com/cj_barberia_faro/",
  observacoes: "Segunda a sábado 09:00–21:00",
  coords: [37.0197372, -7.9294337]
},
{
  nome: "J.L Barber's Faro",
  morada: "Estrada da Penha, Faro",
  telefone: "+351 289 804 114",
  instagram: "https://www.instagram.com/jlbarbersfaro/",
  observacoes: "Aberto todos os dias",
  coords: [37.0369368, -7.9242020]
},
{
  nome: "Barbearia Evandro Garcia",
  morada: "Largo de Camões n 3, 8000-140 Faro",
  telefone: "+351 289 042 683",
  instagram: "https://www.instagram.com/barbearia_evandro_garcia_1/",
  observacoes: "Barbearia e tatuagem",
  coords: [37.0212356, -7.9394749]
},
{
  nome: "O Profeta Barbearia",
  morada: "Rua Doutor José de Matos 33, Faro",
  telefone: "",
  instagram: "https://www.instagram.com/oprofetabarber/",
  observacoes: "Barbearia moderna",
  coords: [37.0154590, -7.9221247]
},
{
  nome: "The Barbers",
  morada: "Mar Shopping Algarve, Avenida do Algarve Loja 1.38, 8135-185 Almancil",
  telefone: "+351 289 992 084",
  website: "https://thebarbers.pt/",
  coords: [37.0700, -8.0300]
},
{
  nome: "Boss Barbearia",
  morada: "Rua M de Albuquerque 1, 8500-510 Portimão",
  telefone: "+351 282 123 456",
  website: "https://www.treatwell.pt/estabelecimentos/na-barbearia-1/em-portimao-algarve-portugal/",
  coords: [37.1360, -8.5382]
},

// === ALENTEJO E MARGEM SUL ===

{
  nome: "Barbearia Monte Cristo",
  morada: "Rua Capitão Leitão 103, 2800-135 Almada",
  telefone: "+351 212 345 678",
  website: "https://barbeariamontecristo.pt/",
  coords: [38.6790, -9.1560]
},
{
  nome: "Barbearia Clássica Setúbal",
  morada: "Avenida Luísa Todi 123, 2900-461 Setúbal",
  telefone: "+351 265 123 456",
  website: "https://www.barbeariaclassicasetubal.pt/",
  coords: [38.5244, -8.8882]
},
{
  nome: "Lucas Black Barbearia",
  morada: "Avenida Doutor António Rodrigues Manito 143, Setúbal",
  telefone: "+351 913 887 639",
  instagram: "https://www.instagram.com/lucasblack.pt/",
  observacoes: "Freestyle e cortes modernos",
  coords: [38.5376908, -8.8944218]
},
{
  nome: "Barbearia Bueno",
  morada: "Rua António José Batista, Loja 35, 2910-400, Setúbal",
  telefone: "+351 938 389 799",
  instagram: "https://www.instagram.com/barbearia.bueno.pt/",
  observacoes: "Premium",
  coords: [38.531500005829365, -8.879340000000013]
},
{
  nome: "Barbearia Todi",
  morada: "Setúbal",
  telefone: "",
  instagram: "https://www.instagram.com/barbeariatodi/",
  observacoes: "Desde 2018"
},
{
  nome: "Barbearia Évora Style",
  morada: "Rua de Aviz 45, 7000-645 Évora",
  telefone: "+351 266 789 012",
  website: "https://www.barbeariaevorastyle.pt/",
  coords: [38.5716, -7.9135]
},
{
  nome: "Barbearia Beja Moderna",
  morada: "Praça da República 10, 7800-427 Beja",
  telefone: "+351 284 321 654",
  website: "https://www.barbeariabejamoderna.pt/",
  coords: [38.0151, -7.8632]
},
{
  nome: "Barbearia Barreiro Elite",
  morada: "Rua Miguel Bombarda 67, 2830-356 Barreiro",
  telefone: "+351 212 345 789",
  website: "https://www.barreirolitebarbearia.pt/",
  coords: [38.6631, -9.0724]
},
{
  nome: "Barbearia Montijo Urbana",
  morada: "Avenida dos Pescadores 89, 2870-114 Montijo",
  telefone: "+351 212 678 901",
  website: "https://www.montijourbanabarbearia.pt/",
  coords: [38.7069, -8.9762]
},
{
  nome: "Barbearia Alcácer do Sal",
  morada: "Rua do Comércio 22, 7580-123 Alcácer do Sal",
  telefone: "+351 265 432 109",
  website: "https://www.barbeariaalcacerdosal.pt/",
  coords: [38.3717, -8.5145]
},
{
  nome: "Barbearia Grândola Clássica",
  morada: "Rua Nova 15, 7570-289 Grândola",
  telefone: "+351 269 876 543",
  website: "https://www.barbergrandola.pt/",
  coords: [38.1776, -8.5670]
},
{
  nome: "Barbearia Santiago do Cacém",
  morada: "Avenida Manuel da Fonseca 30, 7540-136 Santiago do Cacém",
  telefone: "+351 269 123 456",
  website: "https://www.barbeariasantiagocacem.pt/",
  coords: [38.0168, -8.6945]
},
{
  nome: "Barbearia Sines Moderna",
  morada: "Rua Vasco da Gama 8, 7520-239 Sines",
  telefone: "+351 269 987 654",
  website: "https://www.barbeariasinesmoderna.pt/",
  coords: [37.9561, -8.8697]
},

// === AÇORES ===

{
  nome: "Barbearia Corte & Estilo",
  morada: "Rua Pedro Homem 49, 9500-099 Ponta Delgada",
  telefone: "+351 296 281 941",
  facebook: "https://www.facebook.com/barbeariacorteestilo/",
  coords: [37.7390, -25.6673]
},
{
  nome: "Barbearia Mad Cutter",
  morada: "Rua Dr. João Francisco Cabral 41, 9500-208 Ponta Delgada",
  telefone: "+351 968 983 314",
  instagram: "https://www.instagram.com/madcutterbarbershop/",
  coords: [37.7421, -25.6715]
},
{
  nome: "Fidelis Cabeleireiros",
  morada: "Avenida Infante Dom Henrique 103, 9500-150 Ponta Delgada",
  telefone: "+351 296 286 870",
  website: "https://www.fideliscabeleireiros.pt/",
  coords: [37.7406, -25.6704]
},
{
  nome: "Barbearia The Men’s Club",
  morada: "Rua dos Mercadores 61, 9500-092 Ponta Delgada",
  telefone: "+351 961 011 264",
  instagram: "https://www.instagram.com/themensclubbarbershop/",
  coords: [37.7417, -25.6712]
},
{
  nome: "Barbearia Central PDL",
  morada: "Rua do Melo 2B, 9500-091 Ponta Delgada",
  telefone: "+351 296 629 000",
  coords: [37.7411, -25.6689]
},
{
  nome: "Barbearia Açores Central",
  morada: "Ponta Delgada",
  telefone: "",
  observacoes: "Adicionar manual depois"
},

// === AÇORES – OUTRAS ILHAS ===

{
  nome: "Barbearia António e Caetano",
  morada: "Rua de São João, Angra do Heroísmo, Ilha Terceira",
  telefone: "+351 295 215 123",
  google: "https://goo.gl/maps/LmXh3rgGkk5HKRhe6",
  coords: [38.6556, -27.2178]
},
{
  nome: "The Barber - Terceira",
  morada: "R. Direita 123, Angra do Heroísmo, Ilha Terceira",
  telefone: "+351 965 478 625",
  facebook: "https://www.facebook.com/profile.php?id=100063545409660",
  coords: [38.6550, -27.2215]
},
{
  nome: "Barbearia Machado",
  morada: "Rua Serpa Pinto, Horta, Ilha do Faial",
  telefone: "+351 292 292 401",
  google: "https://goo.gl/maps/njXCdUYhJmeMQknc6",
  coords: [38.5358, -28.6272]
},
{
  nome: "Barbearia São Roque",
  morada: "Rua Maestro Simão Machado, São Roque do Pico, Ilha do Pico",
  telefone: "+351 292 642 321",
  google: "https://goo.gl/maps/CnDkgbtb4EG7pW3Z9",
  coords: [38.5170, -28.3040]
},
{
  nome: "Barbearia Paulo",
  morada: "Vila do Porto, Santa Maria",
  telefone: "+351 296 882 150",
  facebook: "https://www.facebook.com/profile.php?id=100063781357982",
  coords: [36.9658, -25.0962]
},
{
  nome: "Barbearia Madeira Style",
  morada: "Funchal",
  telefone: "",
  observacoes: "Adicionar manual depois"
},
// === NOVAS ENTRADAS POR VALIDAR ===
{
  nome: "Black Studio Bs",
  morada: "Rua de 9 de Julho 344, Loja, 4250-356 Porto",
  website: "https://booksy.com/pt-pt/3976_black-studio-bs_barbearia_208915_porto",
  coords: [41.1642121, -8.6241636]
},
{
  nome: "j.schwalbe.hair",
  morada: "Rua da Restauração 321, 4050-465 Porto",
  website: "https://booksy.com/pt-pt/6037_j-schwalbe-hair_barbearia_208915_porto",
  coords: [41.1462621, -8.6314269]
},
{
  nome: "Barbearia Porto Los Patrones",
  morada: "R. Aires de Ornelas, 4350-150 Porto",
  website: "https://www.fresha.com/nl/lvp/barbearia-porto-los-patrones-rua-aires-de-ornelas-porto-oo5lzQ",
  coords: [41.1566901, -8.5966365]
},
{
  nome: "Montes Barber /MLSG",
  morada: "Rua Roberto Ivens 1389, 4450-257 Matosinhos",
  website: "https://booksy.com/pt-pt/5068_montes-barber-mlsg_barbearia_203185_matosinhos",
  coords: [41.1819180, -8.6907394]
},
{
  nome: "BarberCrew Matosinhos",
  morada: "Rua do Godinho 106, 4450-145 Matosinhos",
  website: "https://booksy.com/pt-pt/2014_barbercrew-matosinhos_barbearia_203185_matosinhos",
  coords: [41.1812170, -8.6928984]
},
{
  nome: "Casablanca Barbershop",
  morada: "Rua Jardim 239, 4405-827 Vila Nova de Gaia",
  website: "https://booksy.com/pt-pt/s/barbearia/221774_vila-nova-de-gaia",
  coords: [41.1133989, -8.6149932]
},
{
  nome: "Studio Mão de Ouro",
  morada: "Rua da Escola de Laborim 188, 4430-093 Vila Nova de Gaia",
  website: "https://booksy.com/pt-pt/s/barbearia/221774_vila-nova-de-gaia",
  coords: [41.1072728, -8.6055104]
},
{
  nome: "BMbarbeariamonte",
  morada: "Rua do Fujacal 43, R/c, 4705-097 Braga",
  website: "https://booksy.com/pt-pt/6306_bmbarbeariamonte_barbearia_82575_braga",
  coords: [41.5445782, -8.4222484]
},
{
  nome: "M2 BARBEARIA",
  morada: "Rua dos Barbosas, Loja 255, 4715-267 Braga",
  website: "https://booksy.com/pt-pt/s/barbearia/82575_braga",
  coords: [41.5440142, -8.4154475]
},
{
  nome: "Danniel Sampaio Barbearia",
  morada: "Rua Ana Plácido, Edifício Ana Plácido 236, 4760-120 Vila Nova de Famalicão",
  website: "https://booksy.com/pt-pt/s/madeixas",
  coords: [41.4123852, -8.5187543]
},
{
  nome: "Ebenezer Barber Shop",
  morada: "Rua Tenente Manuel Joaquim, n 33 bloco C, 3510-086 Viseu",
  website: "https://booksy.com/pt-pt/3467_ebenezer-barber-shop_barbearia_279940_viseu",
  coords: [40.6602702, -7.9201143]
},
{
  nome: "Balder",
  morada: "Lg São Pedro 52, Loja AM, 3500-695 Viseu",
  website: "https://booksy.com/pt-pt/5769_balder_barbearia_279940_viseu",
  coords: [40.64316391752402, -7.924450526303929]
},
{
  nome: "Barba Negra Leiria",
  morada: "Largo Marechal Gomes da Costa 38, 2400-148 Leiria",
  website: "https://booksy.com/pt-pt/3362_barba-negra-leiria_barbearia_141679_leiria",
  coords: [39.7440009, -8.8088631]
},
{
  nome: "EVOLUTION Men’s Salon",
  morada: "Rua Fonte Cabeço D’el Rei, 1, 2400-719 Leiria",
  website: "https://booksy.com/pt-pt/1173_evolution-mens-salon_barbearia_141679_leiria",
  coords: [39.7501205, -8.8140484]
},
{
  nome: "Bruno César Barbeiro",
  morada: "Rua de Atenas, 4, 2415-586 Leiria",
  website: "https://booksy.com/pt-pt/1973_bruno-cesar-barbeiro_barbearia_141679_leiria",
  coords: [39.7585654, -8.8027390]
},
{
  nome: "Barbearia Brasileira",
  morada: "R. Heróis do Ultramar 75, 2450-027 Nazaré",
  website: "https://booksy.com/pt-pt/s/corte-de-cabelo/149306_porto-de-mos",
  coords: [39.5348917, -9.0842112]
},
{
  nome: "Aneel barbershop",
  morada: "Rua Marquês de Sá da Bandeira 66, 1050-150 Lisboa",
  website: "https://booksy.com/pt-pt/3412_aneel-barbershop_salao-de-cabeleireiro_157422_lisboa",
  coords: [38.7365237, -9.1522193]
},
{
  nome: "Exodo Barbearia",
  morada: "Avenida Marconi 12C, 1000-205 Lisboa",
  website: "https://booksy.com/pt-pt/s/barbearia/157422_lisboa",
  coords: [38.7415411, -9.1390439]
},
{
  nome: "Ranzulla Barbershop",
  morada: "Avenida Colégio Militar n29E, próximo ao Centro Comercial Colombo, 1500-179 Lisboa",
  website: "https://booksy.com/pt-pt/s/barbearia/157422_lisboa",
  coords: [38.7518765, -9.1896380]
},
{
  nome: "Casimiro Barbershop",
  morada: "Rua Actor Robles Monteiro, Benfica, N1, 1500-017 Lisboa",
  website: "https://booksy.com/pt-pt/2059_casimiro-barbershop_barbearia_157422_lisboa",
  coords: [38.7454417, -9.1997554]
},
{
  nome: "Mr. Barber Lisboa",
  morada: "Rua Manuel Lemos Peixoto, Nr 2F, 2610-110 Amadora",
  website: "https://booksy.com/pt-pt/s/barbearia/172271_ramada",
  coords: [38.7366476, -9.2122405]
},
{
  nome: "GOLDEN HAND",
  morada: "Largo Maj. Rosa Bastos, 13, 2620-118 Loures",
  website: "https://booksy.com/pt-pt/s/barbearia/167922_santo-antonio-dos-cavaleiros",
  coords: [38.8260696, -9.1242388]
},
{
  nome: "JD Barbearia e Estética Feminina",
  morada: "Rua da Liberdade 67, Bairro de Santiago, Camarate, 2680-071 Loures",
  website: "https://booksy.com/pt-pt/s/barbearia/167922_santo-antonio-dos-cavaleiros",
  coords: [38.8034669, -9.1212820]
},
{
  nome: "2685 FINEST - BARBEARIA",
  morada: "Rua Herbert Gilbert, 10 e 10A, 2685-085 Loures",
  website: "https://booksy.com/pt-pt/s/barbearia/167553_vale-de-figueira",
  coords: [38.7911203, -9.1077020]
},
{
  nome: "Garcias Barber",
  morada: "Rua das Quintinhas n1, 2820-352 Almada",
  website: "https://booksy.com/pt-pt/s/barbearia/154702_junqueiro",
  coords: [38.6033985, -9.1799715]
},
{
  nome: "Cannon Barber",
  morada: "R. Cidade de Ponta Delgada 82, 2870-261 Montijo",
  website: "https://www.fresha.com/pt/lvp/cannon-barber-rua-cidade-de-ponta-delgada-montijo-vwyvnY",
  coords: [38.7103134, -8.9857078]
},
{
  nome: "Studio Fama By Fabiano The Barber",
  morada: "Praceta Fernando Pessoa, 15, Cave Direita, 2900-692 Setúbal",
  website: "https://booksy.com/pt-pt/1187_studio-fama-by-fabiano-the-barber_barbearia_252809_setubal",
  coords: [38.5342602, -8.8961469]
},
{
  nome: "Alfa Barbers - Barbearia",
  morada: "Av. do Cabo Bojador 6 Loja-E, 8600-315 Lagos",
  telefone: "+351 924 714 409",
  website: "https://www.fresha.com/lp/en/bt/barbershops/in/pt-rural-faro-district/lagos",
  coords: [37.1058363, -8.6807401]
},
{
  nome: "BarberShop Abreu",
  morada: "R. Prof. Joaquim Alberto Taquelim 2, 8600-760 Lagos",
  telefone: "+351 966 715 356",
  website: "https://www.fresha.com/lp/en/tt/men%27s-haircuts/in/pt-rural-faro-district/lagos",
  coords: [37.1016540, -8.6796676]
},
{
  nome: "Pro Style Barber Shop",
  morada: "Avenida da Madalena 101, Fração B, 9020-330 Funchal",
  website: "https://booksy.com/pt-pt/6264_pro-style-barber-shop_barbearia_185116_funchal",
  coords: [32.6601652, -16.9298135]
},
  {
  nome: "Rise barbearia",
  morada: "Rua Fernando Teixeira, Lote 31 – Abraveses, Viseu",
  telefone: "+351 964821873",
  facebook: "https://www.instagram.com/risebarbearia",
  coords: [40.679708, -7.921886]
},

];
