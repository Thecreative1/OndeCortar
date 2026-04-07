(function() {
  window.OndeCortarCommerce = window.OndeCortarCommerce || {};
  window.OndeCortarCommerce.affiliateNotice = "Alguns links nesta página são links de afiliado. O OndeCortar pode receber comissão por compras elegíveis.";
  window.OndeCortarCommerce.needs = [
    { slug: "para-casa", title: "Para casa", copy: "Escolhas simples para manutenção regular em casa." },
    { slug: "para-barbeiros", title: "Para barbeiros", copy: "Peças úteis para posto, manutenção e ritmo de trabalho." },
    { slug: "para-barba", title: "Para barba", copy: "Rotina, conforto e manutenção entre cortes." },
    { slug: "para-contornos-e-fades", title: "Para contornos e fades", copy: "Mais detalhe, linhas e acabamento." },
    { slug: "para-manutencao-e-higiene", title: "Para manutenção e higiene", copy: "Limpeza, apoio e organização de rotina." },
    { slug: "para-oferecer", title: "Para oferecer", copy: "Kits e conjuntos mais fáceis de acertar." }
  ];
  window.OndeCortarCommerce.featuredPicks = [
    { label: "Melhor máquina para casa", product: "braun-series-5-aio5545", note: "Versátil e direta para quem quer resolver cabelo e barba no mesmo aparelho." },
    { label: "Melhor kit para começar", product: "viking-sandalwood", note: "Boa opção para começar uma rotina de barba simples ou para oferecer." },
    { label: "Melhor opção clássica", product: "king-c-dupla", note: "Faz sentido para quem quer mais controlo e um barbear tradicional." },
    { label: "Melhor para manutenção", product: "beardburys-spray", note: "Ajuda a manter a máquina pronta sem inventar uma rotina complexa." }
  ];
  window.OndeCortarCommerce.quickComparison = [
    ["Melhor para casa", "braun-series-5-aio5545"],
    ["Melhor para uso frequente", "wahl-super-taper"],
    ["Melhor kit para começar", "viking-sandalwood"],
    ["Melhor para pele sensível", "proraso-pre-barba"]
  ];
  window.OndeCortarCommerce.categories = [
    {
      slug: "maquinas-de-cortar",
      title: "Máquinas de cortar",
      intro: "Máquinas e aparadores para cortar cabelo em casa ou num posto de barbeiro.",
      top: ["wahl-super-taper", "braun-series-5-aio5545", "hatteker-completa"],
      picks: [["Melhor para casa", "braun-series-5-aio5545"], ["Melhor para uso frequente", "wahl-super-taper"], ["Melhor preço/versatilidade", "hatteker-completa"]],
      articles: ["como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa", "aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais", "7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata", "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo"],
      faqs: [
        ["Qual é a melhor máquina para cortar cabelo em casa?", "Depende do ritmo de uso. Em casa, versatilidade e facilidade de controlo costumam pesar mais do que uma lista enorme de acessórios."],
        ["Vale a pena comprar logo uma máquina profissional?", "Só quando o uso vai ser frequente e quando já sabes que queres mais consistência no corte."],
        ["O que costuma ser erro na primeira compra?", "Comprar pelo número de acessórios e ignorar estabilidade, ergonomia e manutenção básica."]
      ]
    },
    {
      slug: "trimmers-e-shavers",
      title: "Trimmers e shavers",
      intro: "Ferramentas para detalhe, contornos e manutenção entre cortes completos.",
      top: ["philips-bt3238", "solati-aparador", "braun-series-5-aio5545"],
      picks: [["Melhor para barba", "philips-bt3238"], ["Melhor para contornos", "solati-aparador"], ["Melhor versatilidade", "braun-series-5-aio5545"]],
      articles: ["aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais", "como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa"],
      faqs: [
        ["Trimmer e máquina são a mesma coisa?", "Não. O trimmer entra melhor em detalhe e manutenção, enquanto a máquina principal resolve corte mais amplo."],
        ["Faz sentido comprar um tudo-em-um?", "Faz quando queres simplificar a rotina e ainda não precisas de uma ferramenta dedicada para cada uso."]
      ]
    },
    {
      slug: "kits-de-barba",
      title: "Kits de barba",
      intro: "Kits para começar uma rotina, oferecer melhor e perceber o que faz sentido comprar junto.",
      top: ["kit-xikezan", "viking-sandalwood", "king-c-rotina"],
      picks: [["Melhor para começar", "viking-sandalwood"], ["Melhor kit completo", "kit-xikezan"], ["Melhor opção clássica", "king-c-rotina"]],
      articles: ["melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas", "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo", "como-montar-uma-rotina-simples-de-barba-em-casa"],
      faqs: [
        ["Um kit compensa mais do que comprar separado?", "Compensa quando ainda não tens base de rotina ou quando queres reduzir a margem para erro na primeira compra."],
        ["O que é ruído num kit de barba?", "Peças que parecem acrescentar valor no catálogo, mas raramente entram na rotina real de quem compra."]
      ]
    },
    {
      slug: "cremes-e-espumas",
      title: "Cremes e espumas",
      intro: "Produtos para ganhar conforto no barbear e perceber quando creme, espuma, gel ou pré-barba fazem realmente diferença.",
      top: ["proraso-creme", "gillette-labs-gel", "proraso-pre-barba"],
      picks: [["Melhor para rotina clássica", "proraso-creme"], ["Melhor para rapidez", "gillette-labs-gel"], ["Melhor para pele sensível", "proraso-pre-barba"]],
      articles: ["creme-espuma-ou-gel-de-barbear-qual-escolher", "como-montar-uma-rotina-simples-de-barba-em-casa", "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente"],
      faqs: [
        ["Creme, espuma e gel servem para o mesmo?", "Não exatamente. Todos reduzem atrito, mas a experiência, o tempo de preparação e o conforto percebido mudam bastante."],
        ["Quando faz sentido usar pré-barba?", "Sobretudo quando a pele reage mal ao barbear ou quando queres melhorar preparação e deslizamento."]
      ]
    },
    {
      slug: "navalhas-e-laminas",
      title: "Navalhas e lâminas",
      intro: "Uma secção para quem quer perceber melhor o barbear clássico, o controlo da lâmina e o que muda entre formatos.",
      top: ["asipro-navalha", "king-c-dupla", "derby-premium"],
      picks: [["Melhor para começar", "asipro-navalha"], ["Melhor máquina clássica", "king-c-dupla"], ["Melhor reposição", "derby-premium"]],
      articles: ["navalha-classica-ou-maquina-de-seguranca-diferencas-reais", "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente"],
      faqs: [
        ["Navalha clássica e máquina de segurança são a mesma experiência?", "Não. As duas pedem mais atenção do que um sistema moderno, mas o controlo, a curva de aprendizagem e o ritual são diferentes."],
        ["As lâminas mudam mesmo o conforto?", "Mudam bastante, sobretudo quando tens pele sensível ou uma rotina mais frequente."]
      ]
    },
    {
      slug: "escovas-e-pentes",
      title: "Escovas e pentes",
      intro: "Acessórios pequenos, mas com impacto real na forma como distribuis produto, alinhas a barba e manténs o look mais arrumado.",
      top: ["zilberhaar-escova", "charlemagne-pente", "viking-escova-kit"],
      picks: [["Melhor para barba densa", "zilberhaar-escova"], ["Melhor para detalhe", "charlemagne-pente"], ["Melhor kit simples", "viking-escova-kit"]],
      articles: ["escova-de-barba-ou-pente-qual-usar-no-dia-a-dia", "como-montar-uma-rotina-simples-de-barba-em-casa"],
      faqs: [
        ["Escova e pente fazem o mesmo?", "Não. A escova ajuda mais na distribuição e disciplina, enquanto o pente entra melhor em detalhe e alinhamento rápido."],
        ["Vale a pena comprar ambos?", "Vale quando a barba já tem comprimento e quando queres uma rotina mais completa."]
      ]
    },
    {
      slug: "acessorios-de-barbeiro",
      title: "Acessórios de barbeiro",
      intro: "Peças de apoio para bancada, fachada, higiene, manutenção e uma rotina de trabalho mais organizada.",
      top: ["wdzd-poste-barbeiro-dourado", "wdzd-poste-barbeiro-prateado", "poste-barbeiro-seta-luminosa"],
      picks: [["Melhor presença premium", "wdzd-poste-barbeiro-dourado"], ["Melhor visual classico", "wdzd-poste-barbeiro-prateado"], ["Melhor para fachada", "poste-barbeiro-seta-luminosa"]],
      articles: ["historia-do-poste-de-barbeiro", "o-essencial-para-manter-uma-bancada-de-barbeiro-organizada", "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo"],
      faqs: [
        ["Acessórios fazem mesmo diferença numa barbearia?", "Fazem quando resolvem problemas concretos de bancada, higiene, acesso, fachada e apresentação do serviço."],
        ["O que costuma ter impacto mais imediato?", "Organização, limpeza rápida e sinalética exterior fácil de reconhecer costumam criar efeito visível mais depressa."]
      ]
    },
    {
      slug: "manutencao-de-maquinas",
      title: "Manutenção de máquinas",
      intro: "Produtos e consumíveis para prolongar a vida útil da máquina e reduzir falhas evitáveis.",
      top: ["beardburys-spray", "colcolo-organizador", "eurostil-rolos"],
      picks: [["Melhor para limpeza rápida", "beardburys-spray"], ["Melhor para organização", "colcolo-organizador"], ["Melhor para higiene de serviço", "eurostil-rolos"]],
      articles: ["como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo", "o-essencial-para-manter-uma-bancada-de-barbeiro-organizada"],
      faqs: [
        ["Com que frequência devo limpar a máquina?", "Mais vale uma rotina curta e consistente do que grandes limpezas raras."],
        ["Um spray 5 em 1 chega para tudo?", "Ajuda bastante, mas não substitui organização, escovagem e cuidado básico com armazenamento."]
      ]
    },
    {
      slug: "oleos-e-balms",
      title: "Óleos e balms",
      intro: "Escolhas para hidratar, disciplinar e simplificar a rotina de barba sem comprar demais.",
      top: ["viking-sandalwood", "kit-xikezan", "zilberhaar-escova"],
      picks: [["Melhor para rotina diária", "viking-sandalwood"], ["Melhor para começar", "kit-xikezan"], ["Melhor complemento", "zilberhaar-escova"]],
      articles: ["como-montar-uma-rotina-simples-de-barba-em-casa", "melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas", "escova-de-barba-ou-pente-qual-usar-no-dia-a-dia"],
      faqs: [
        ["Óleo e balm fazem o mesmo?", "Não. Um entra mais na hidratação, o outro ajuda também a disciplinar e dar mais controlo."],
        ["Vale a pena começar por um kit?", "Vale quando queres montar uma base simples sem pensar produto a produto."]
      ]
    },
    {
      slug: "para-casa",
      title: "Para casa",
      intro: "Escolhas simples para manutenção regular sem transformar o grooming numa complicação.",
      top: ["braun-series-5-aio5545", "philips-bt3238", "hatteker-completa"],
      picks: [["Melhor no geral", "braun-series-5-aio5545"], ["Melhor para barba", "philips-bt3238"], ["Melhor versatilidade", "hatteker-completa"]],
      articles: ["como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa", "como-montar-uma-rotina-simples-de-barba-em-casa", "7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata"],
      faqs: [
        ["Preciso de várias ferramentas em casa?", "Nem sempre. Em muitos casos, uma máquina versátil e uma rotina curta já resolvem bem."],
        ["Vale a pena tentar cortar cabelo em casa?", "Vale quando queres manutenção regular e sabes onde queres simplificar."]
      ]
    },
    {
      slug: "para-barbeiros",
      title: "Para barbeiros",
      intro: "Uma seleção focada em posto, continuidade de uso e compras com impacto real no trabalho diário.",
      top: ["wahl-super-taper", "beardburys-spray", "colcolo-organizador"],
      picks: [["Melhor base de corte", "wahl-super-taper"], ["Melhor para manutenção", "beardburys-spray"], ["Melhor para bancada", "colcolo-organizador"]],
      articles: ["o-essencial-para-manter-uma-bancada-de-barbeiro-organizada", "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo"],
      faqs: [
        ["O que costuma ter impacto mais rápido no posto?", "Ferramenta base consistente, manutenção simples e bancada organizada."],
        ["Vale a pena investir cedo em acessórios?", "Vale quando eles resolvem problemas reais de ritmo, acesso ou higiene."]
      ]
    },
    {
      slug: "para-oferecer",
      title: "Para oferecer",
      intro: "Kits e conjuntos mais fáceis de escolher para oferecer, com menos risco de errar.",
      top: ["kit-xikezan", "king-c-rotina", "viking-sandalwood"],
      picks: [["Melhor kit completo", "kit-xikezan"], ["Melhor opção clássica", "king-c-rotina"], ["Melhor para rotina simples", "viking-sandalwood"]],
      articles: ["melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas", "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo"],
      faqs: [
        ["O que é mais seguro oferecer?", "Normalmente um kit com uso claro e uma rotina fácil de perceber."],
        ["É melhor um aparelho ou um kit?", "Para presente, o kit costuma ser mais fácil de acertar."]
      ]
    }
  ];
  window.OndeCortarCommerce.hubs = [
    {
      slug: "guias-de-compra",
      title: "Guias de compra",
      intro: "Artigos para filtrar opções, perceber o que importa e sair do ruído antes de comprar.",
      categories: ["maquinas-de-cortar", "kits-de-barba", "cremes-e-espumas", "navalhas-e-laminas"],
      articles: ["como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa", "melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas", "creme-espuma-ou-gel-de-barbear-qual-escolher", "navalha-classica-ou-maquina-de-seguranca-diferencas-reais"]
    },
    {
      slug: "comparacoes",
      title: "Comparações",
      intro: "Comparações diretas para perceber o que muda entre formatos, kits e acessórios antes de clicar.",
      categories: ["maquinas-de-cortar", "kits-de-barba", "escovas-e-pentes", "navalhas-e-laminas"],
      articles: ["o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo", "aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais", "escova-de-barba-ou-pente-qual-usar-no-dia-a-dia", "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente"]
    },
    {
      slug: "erros-comuns",
      title: "Erros comuns",
      intro: "Conteúdo para evitar compras fracas, expectativas erradas e decisões feitas só pelo marketing.",
      categories: ["maquinas-de-cortar", "kits-de-barba", "cremes-e-espumas", "navalhas-e-laminas"],
      articles: ["7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata", "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo", "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente", "creme-espuma-ou-gel-de-barbear-qual-escolher"]
    },
    {
      slug: "conteudo-pratico",
      title: "Conteúdo prático",
      intro: "Guias utilitários para montar rotina, manter equipamento e ligar uso real à compra certa.",
      categories: ["kits-de-barba", "escovas-e-pentes", "maquinas-de-cortar", "acessorios-de-barbeiro"],
      articles: ["como-montar-uma-rotina-simples-de-barba-em-casa", "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo", "o-essencial-para-manter-uma-bancada-de-barbeiro-organizada"]
    },
    {
      slug: "cuidados-com-a-barba",
      title: "Cuidados com a barba",
      intro: "Rotina, conforto e manutenção entre cortes.",
      categories: ["oleos-e-balms", "cremes-e-espumas", "escovas-e-pentes"],
      articles: ["o-essencial-para-tratar-da-barba-em-casa", "como-reduzir-irritacao-ao-fazer-a-barba"],
      legacy: true
    },
    {
      slug: "maquinas-e-manutencao",
      title: "Máquinas e manutenção",
      intro: "Escolher e cuidar melhor do equipamento.",
      categories: ["maquinas-de-cortar", "manutencao-de-maquinas", "trimmers-e-shavers"],
      articles: ["como-limpar-uma-maquina-de-cortar-cabelo", "trimmer-vs-shaver-diferencas-reais"],
      legacy: true
    },
    {
      slug: "para-barbeiros",
      title: "Para barbeiros",
      intro: "Conteúdo ligado ao posto de trabalho, organização e rotina do dia a dia.",
      categories: ["para-barbeiros", "acessorios-de-barbeiro"],
      articles: ["o-que-um-barbeiro-precisa-no-posto-de-trabalho", "como-limpar-uma-maquina-de-cortar-cabelo"],
      legacy: true
    },
    {
      slug: "estilo-e-tendencias",
      title: "Estilo e tendências",
      intro: "Uma área para ligar rotina e estilo sem cair em conteúdo vazio.",
      categories: ["navalhas-e-laminas", "escovas-e-pentes", "acessorios-de-barbeiro"],
      articles: ["o-essencial-para-tratar-da-barba-em-casa", "historia-do-poste-de-barbeiro"],
      legacy: true
    },
    {
      slug: "presentes-e-kits",
      title: "Presentes e kits",
      intro: "Sugestões para oferecer com mais confiança e menos adivinhação.",
      categories: ["para-oferecer", "kits-de-barba"],
      articles: ["melhor-kit-de-barba-para-oferecer"],
      legacy: true
    }
  ];
})();
