// 2026-10-10 — abrir uma barbearia em Portugal. Pesquisas confirmadas nas sugestões do Google PT:
// "abrir barbearia em portugal", "como abrir uma barbearia com pouco dinheiro", "licença para
// abrir barbearia", "investimento para abrir barbearia", "abrir uma barbearia é um bom negócio",
// "como colocar barbearia no google maps", "como divulgar barbearia".
// Fontes legais: Guia do Comércio e Serviços da DGAE (2024) — a lista de atividades do RJACSR
// (DL 10/2015) não inclui salões de cabeleireiro/barbearias; Licenciamento Zero (DL 48/2011) só
// mantém a ocupação do espaço público (câmaras). Carteira profissional revogada pelo
// DL 92/2011; há leituras de que o diploma exige formação certificada — remetido para IEFP /
// contabilista. Sem valores de investimento inventados.
const amz = (asin, slug) =>
  "<div class=\"hero-actions\"><a class=\"btn btn-primary\" href=\"https://www.amazon.es/dp/" + asin + "?tag=ondecortar27-21&amp;language=pt_PT\" target=\"_blank\" rel=\"sponsored nofollow noopener noreferrer\">Ver preço na Amazon.es</a><a class=\"btn btn-secondary\" href=\"../../produto/" + slug + "/\">Ver detalhes</a></div>";

module.exports = [
  {
    slug: "como-abrir-uma-barbearia-em-portugal",
    category: "para-barbeiros",
    published: "2026-10-10",
    title: "Como abrir uma barbearia em Portugal: licenças, passos e equipamento",
    h1: "Como abrir uma barbearia em Portugal",
    description: "Precisa de licença? O CAE certo, os passos nas Finanças e na câmara, a carteira profissional, o equipamento e como ter clientes desde o primeiro dia.",
    schemaDescription: "Licenças, CAE, passos legais, formação, equipamento e clientes: o que é preciso para abrir uma barbearia em Portugal.",
    image: "imagens/revista/barbearia-vazia-cadeiras.jpg",
    imageAlt: "Interior de uma barbearia vazia com cadeiras de barbeiro, espelhos e luz quente",
    readMinutes: 7,
    criteria: "Informação geral com base no Guia do Comércio e Serviços da DGAE (2024) e na legislação citada; não substitui um contabilista nem a câmara municipal.",
    lede: "Abrir uma barbearia em Portugal é mais simples do que a maioria pensa no papel — e mais exigente do que parece no dia a dia. A burocracia cabe numa tarde. O que decide se a cadeira está ocupada é tudo o resto.",
    subcopy: "Aqui está o que diz a lei, os passos por ordem, o equipamento para começar sem desperdiçar dinheiro e como ter clientes desde a primeira semana.",
    heroActions: [["#passos", "Ver os passos"], ["#clientes", "Como ter clientes"]],
    quick: [
      ["Preciso de licença para abrir?", "Não há uma licença específica de abertura: as barbearias não estão na lista de atividades sujeitas a comunicação prévia do regime do comércio e serviços. Mas o espaço, as obras e o reclamo na rua passam pela câmara."],
      ["Que CAE uso?", "O 96021 — Salões de cabeleireiro, que inclui as barbearias e o corte e aparo de barba."],
      ["Preciso de carteira profissional?", "A carteira profissional de barbeiro deixou de existir em 2011. A formação certificada continua a ser recomendada; confirma com o IEFP ou um contabilista se é exigida no teu caso."],
      ["Quanto custa?", "Depende sobretudo da renda e das obras. Desconfia de quem dá um número fechado sem conhecer o espaço."]
    ],
    summary: [
      "CAE 96021 e início de atividade nas Finanças e na Segurança Social",
      "Sem licença de abertura própria, mas o espaço tem de estar licenciado",
      "Obras, mudança de uso e reclamos: câmara municipal",
      "Livro de reclamações, preços e horário afixados",
      "Equipamento: começa pelo posto, não pela decoração",
      "Google, marcações online e diretórios desde o primeiro dia"
    ],
    sideCard: {
      eyebrow: "Diretório",
      title: "Põe a tua barbearia no mapa",
      text: "O registo no OndeCortar é gratuito: morada, contactos, horário e link de marcação, visíveis para quem procura uma barbearia perto.",
      actions: [["../../registar.html", "Registar a barbearia"], ["../../loja/para-barbeiros/", "Equipamento"]]
    },
    sections: [
      {
        h2: "A boa notícia: não há uma licença de abertura",
        html: "<p>O regime que trata do acesso às atividades de comércio, serviços e restauração (o RJACSR, de 2015) tem uma lista fechada de atividades que exigem comunicação prévia ou autorização — oficinas, lavandarias, restaurantes, tatuagens, entre outras. <strong>Os salões de cabeleireiro e as barbearias não estão nessa lista</strong>, como se pode confirmar no Guia do Comércio e Serviços da DGAE.</p><p>Isto não quer dizer que a câmara não entre na história. Entra em três situações:</p><ul class=\"rich-list\"><li><strong>O espaço</strong> tem de ter licença de utilização compatível com comércio ou serviços. Se era uma habitação, é preciso mudar o uso.</li><li><strong>Obras</strong> que mexam na estrutura, na fachada ou nas instalações podem precisar de licença ou comunicação à câmara.</li><li><strong>Reclamo, toldo ou esplanada</strong> na via pública são ocupação do espaço público — pede-se à câmara.</li></ul><p>Antes de assinar o contrato de arrendamento, pergunta ao senhorio pela licença de utilização e confirma-a na câmara. É o erro mais caro de corrigir depois.</p>"
      },
      {
        id: "passos",
        h2: "Os passos, por ordem",
        html: "<ol class=\"rich-list\"><li><strong>Decide a forma jurídica:</strong> empresário em nome individual ou sociedade. Um contabilista ajuda a escolher pelo volume que esperas.</li><li><strong>Início de atividade nas Finanças</strong> com o <strong>CAE 96021</strong> (salões de cabeleireiro, que inclui barbearias) e inscrição na <strong>Segurança Social</strong>.</li><li><strong>Confirma o espaço</strong>: licença de utilização, obras e reclamo na câmara municipal.</li><li><strong>Livro de reclamações</strong> físico no estabelecimento e adesão ao livro eletrónico.</li><li><strong>Preços dos serviços afixados</strong> de forma visível e <strong>horário de funcionamento</strong> afixado, dentro das regras da tua câmara.</li><li><strong>Se tiveres trabalhadores:</strong> contratos, seguro de acidentes de trabalho e serviços de segurança e saúde no trabalho.</li><li><strong>Faturação</strong>: emite as faturas num programa certificado ou no Portal das Finanças — confirma com o contabilista o que se aplica ao teu volume.</li></ol><p>Os requisitos gerais de exercício estão no portal ePortugal e no guia da DGAE. Como as regras municipais variam, confirma sempre na câmara do concelho onde vais abrir.</p>"
      },
      {
        h2: "Carteira profissional e formação",
        html: "<p>Até 2011, ser barbeiro exigia carteira profissional e um curso certificado. O Decreto-Lei n.º 92/2011 acabou com a carteira profissional destas profissões.</p><p>Há, no entanto, quem leia o mesmo diploma como exigindo formação profissional certificada a quem trabalha no setor. Não tomamos partido numa questão legal: <strong>confirma com o IEFP ou com o teu contabilista</strong> antes de abrir. E independentemente da lei, a formação é o que te dá clientes que voltam — um bom degradê não se aprende em vídeos.</p>"
      },
      {
        h2: "Quanto custa abrir uma barbearia",
        html: "<p>Não te vamos dar um número: depende quase tudo do espaço. O que pesa no investimento inicial, por ordem habitual:</p><ul class=\"rich-list\"><li><strong>Renda, caução e trespasse</strong>, se houver.</li><li><strong>Obras</strong>: canalização para lavatórios, eletricidade, iluminação, pavimento.</li><li><strong>Mobiliário</strong>: cadeiras de barbeiro, espelhos, lavatório, bancadas, receção.</li><li><strong>Ferramentas e consumíveis</strong>: máquinas, tesouras, navalhas, capas, desinfetante, produtos.</li><li><strong>Software</strong> de marcações e faturação, e o contabilista.</li><li><strong>Fundo de maneio</strong> para os primeiros meses, enquanto a agenda enche.</li></ul><p>Para abrir com pouco dinheiro, a regra é simples: <strong>começa pelo posto de trabalho, não pela decoração</strong>. Uma cadeira boa e ferramentas fiáveis fazem mais pela tua agenda do que um néon na parede.</p>"
      },
      {
        h2: "O equipamento para começar",
        html: "<p>O essencial do posto está em <a href=\"../../revista/o-que-um-barbeiro-precisa-no-posto-de-trabalho/\">o que um barbeiro precisa no posto de trabalho</a>. Em resumo:</p><ul class=\"rich-list\"><li><strong>Uma máquina de corte fiável</strong>, como a <a href=\"../../produto/wahl-super-taper/\">Wahl Super Taper</a> — motor estável para uso contínuo.</li><li><strong>Um borrifador de névoa contínua</strong>, como o <a href=\"../../produto/grifema-pulverizador-300ml/\">GRIFEMA de 300 ml</a> — vê <a href=\"../../revista/borrifador-para-barbearia-qual-escolher/\">que borrifador escolher</a>.</li><li><strong>Capas</strong> para o cliente, como a <a href=\"../../produto/uraqt-capa/\">capa profissional URAQT</a>.</li><li><strong>Desinfetante</strong> para pentes e ferramentas, como o <a href=\"../../produto/barbicide-desinfetante-pulverizador/\">Barbicide com pulverizador</a>.</li><li><strong>Organização da bancada</strong> — <a href=\"../../revista/o-essencial-para-manter-uma-bancada-de-barbeiro-organizada/\">como manter a bancada organizada</a>.</li></ul>" + amz("B001D2CSYU", "wahl-super-taper") + "<p>Para a fachada, há quem goste do clássico — conta a <a href=\"../../revista/historia-do-poste-de-barbeiro/\">história do poste de barbeiro</a>.</p>"
      },
      {
        id: "clientes",
        h2: "Clientes desde o primeiro dia",
        html: "<ul class=\"rich-list\"><li><strong>Perfil no Google.</strong> Cria o perfil da empresa no Google (Google Business Profile) com morada, horário, fotos e telefone. É assim que a barbearia aparece no Google Maps quando alguém pesquisa «barbearia perto de mim».</li><li><strong>Marcação online.</strong> Fresha, Booksy, Noona ou Buk: os clientes marcam sem ligar, e tu vês a agenda no telemóvel.</li><li><strong>Instagram</strong> com o teu trabalho — antes e depois, sempre com autorização do cliente.</li><li><strong>Diretórios.</strong> <a href=\"../../registar.html\">Regista a barbearia no OndeCortar</a>: é gratuito e aparece no mapa e na página da tua cidade, com o link de marcação.</li><li><strong>Os primeiros clientes</strong> trazem os seguintes. Pede-lhes uma avaliação no Google no fim do corte.</li></ul>"
      },
      {
        h2: "Abrir uma barbearia dá dinheiro?",
        html: "<p>Pode dar — mas depende de três coisas que nenhum guia controla: <strong>a localização</strong>, <strong>o preço</strong> que o teu bairro aceita e <strong>quantas horas da agenda estão ocupadas</strong>. Uma cadeira vazia custa o mesmo que uma cheia.</p><p>Antes de abrir, vê quantas barbearias já existem na tua zona no <a href=\"../../index.html#explorar\">mapa do OndeCortar</a>, que preços praticam e que horários fazem. A concorrência ensina-te mais do que qualquer plano de negócios.</p>"
      }
    ],
    faq: [
      ["É preciso licença para abrir uma barbearia em Portugal?", "Não há uma licença de abertura própria: as barbearias não constam da lista de atividades sujeitas a comunicação prévia ou autorização do regime do comércio e serviços (RJACSR). O espaço tem de ter licença de utilização adequada, e obras ou reclamos na via pública passam pela câmara municipal."],
      ["Qual é o CAE de uma barbearia?", "O CAE 96021 — Salões de cabeleireiro, que inclui expressamente as barbearias e o corte e aparo de barba."],
      ["É obrigatório ter curso para ser barbeiro em Portugal?", "A carteira profissional foi revogada em 2011 (Decreto-Lei n.º 92/2011). Há leituras de que o diploma exige formação profissional certificada; confirma com o IEFP ou com um contabilista antes de abrir."],
      ["Como pôr a minha barbearia no Google Maps?", "Criando um perfil da empresa no Google (Google Business Profile) com morada, horário e fotos, e verificando-o. Também podes registar a barbearia gratuitamente no OndeCortar."]
    ],
    faqCta: "Já tens barbearia? <a href=\"../../registar.html\">Regista-a gratuitamente no OndeCortar</a> e aparece no mapa da tua cidade.",
    related: ["o-que-um-barbeiro-precisa-no-posto-de-trabalho", "borrifador-para-barbearia-qual-escolher", "o-essencial-para-manter-uma-bancada-de-barbeiro-organizada"],
    finalCta: {
      h2: "A burocracia cabe numa tarde",
      text: "O resto — posto, clientes e agenda cheia — começa no primeiro dia.",
      actions: [["../../registar.html", "Registar a barbearia"], ["../../loja/para-barbeiros/", "Ver equipamento"]]
    }
  }
];
