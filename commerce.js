(function() {
  const app = document.getElementById("app");
  if (!app) return;

  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "store";
  const params = new URLSearchParams(window.location.search);
  const slug = document.body.dataset.slug || params.get("slug") || "";
  const data = window.OndeCortarCommerce || {};
  const products = data.products || [];
  const categories = data.categories || [];
  const articles = data.articles || [];
  const hubs = data.hubs || [];
  const needs = data.needs || [];
  const featuredPicks = data.featuredPicks || [];
  const quickComparison = data.quickComparison || [];
  const affiliateNotice = data.affiliateNotice || "";

  const productMap = new Map(products.map(function(item) { return [item.slug, item]; }));
  const categoryMap = new Map(categories.map(function(item) { return [item.slug, item]; }));
  const articleMap = new Map(articles.map(function(item) { return [item.slug, item]; }));
  const hubMap = new Map(hubs.map(function(item) { return [item.slug, item]; }));

  function e(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function href(path) {
    return /^https?:/i.test(path) ? path : root + path;
  }

  function categoryHref(value) {
    return href("loja/" + value + "/");
  }

  function needHref(value) {
    const map = {
      "para-barba": "oleos-e-balms",
      "para-contornos-e-fades": "trimmers-e-shavers",
      "para-manutencao-e-higiene": "manutencao-de-maquinas"
    };
    return categoryHref(map[value] || value);
  }

  function articleHref(value) {
    return href("revista/" + value + "/");
  }

  function hubHref(value) {
    return href("revista/" + value + "/");
  }

  function productHref(value) {
    return href("produto.html?slug=" + encodeURIComponent(value));
  }

  function setMeta(title, description, canonical) {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (canonicalTag) canonicalTag.setAttribute("href", canonical);
  }

  function currentSection() {
    if (page === "magazine" || page === "hub" || page === "article") return "revista";
    if (page === "store" || page === "category" || page === "product") return "loja";
    return "";
  }

  function renderHeader() {
    const section = currentSection();
    return (
      '<header class="site-header"><div class="container"><nav class="nav" aria-label="Navegação principal">' +
        '<a class="brand" href="' + href("index.html") + '">' +
          '<img class="brand-logo" src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" />' +
          '<span class="brand-text"><strong>OndeCortar.pt</strong><span>Barbearias em Portugal</span></span>' +
        "</a>" +
        '<div class="nav-links">' +
          '<a href="' + href("index.html#explorar") + '">Explorar</a>' +
          '<a class="' + (section === "loja" ? "is-current" : "") + '" href="' + href("loja.html") + '">Loja</a>' +
          '<a class="' + (section === "revista" ? "is-current" : "") + '" href="' + href("revista/") + '">Revista</a>' +
          '<a href="' + href("faq.html") + '">FAQ</a>' +
          '<a class="nav-cta" href="' + href("loja.html") + '">Ver loja</a>' +
        "</div>" +
      "</nav></div></header>"
    );
  }

  function renderFooter() {
    return (
      '<footer><div class="container footer-shell">' +
        '<div class="footer-intro">' +
          '<div class="footer-brand"><img src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" /><strong>OndeCortar.pt</strong></div>' +
          "<p>Loja afiliada editorial e Revista OndeCortar para ajudar a decidir melhor antes da compra.</p>" +
        "</div>" +
        '<div class="footer-links">' +
          '<a href="' + href("loja.html") + '">Loja</a>' +
          '<a href="' + href("revista/") + '">Revista</a>' +
          '<a href="' + href("index.html#explorar") + '">Mapa</a>' +
          '<a href="' + href("faq.html") + '">FAQ</a>' +
        "</div>" +
      "</div></footer>"
    );
  }

  function getProducts(slugs) {
    return (slugs || []).map(function(item) { return productMap.get(item); }).filter(Boolean);
  }

  function getArticles(slugs) {
    return (slugs || []).map(function(item) { return articleMap.get(item); }).filter(Boolean);
  }

  function renderDisclosure() {
    return '<div class="disclosure"><strong>Transparência:</strong> ' + e(affiliateNotice) + "</div>";
  }

  function renderWhyBuy() {
    return (
      '<section class="section"><div class="container callout-card">' +
        '<span class="eyebrow">Comprar com confiança</span>' +
        "<h2>Porque comprar por aqui</h2>" +
        "<p>Seleção feita com critério, compra final numa plataforma conhecida, links afiliados identificados e artigos que ajudam a decidir.</p>" +
      "</div></section>"
    );
  }

  function renderProductCard(product, compact) {
    return (
      '<article class="product-card">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" />' +
        '<div class="product-copy">' +
          '<div class="meta-row"><span class="tag">' + e(product.bestFor) + "</span></div>" +
          "<h3>" + e(product.name) + "</h3>" +
          "<p>" + e(product.summary) + "</p>" +
          (!compact ? "<p>" + e(product.useCase) + "</p>" : "") +
          '<div class="card-actions">' +
            '<a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a>' +
            '<a class="btn btn-primary btn-small" href="' + e(product.amazon) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderArticleCard(article) {
    const hub = hubMap.get(article.hub);
    return (
      '<article class="article-card">' +
        '<div class="article-copy">' +
          '<div class="meta-row"><span class="tag">' + e(hub ? hub.title : "Revista") + "</span></div>" +
          "<h3>" + e(article.title) + "</h3>" +
          "<p>" + e(article.excerpt) + "</p>" +
          '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + articleHref(article.slug) + '">Ler artigo</a></div>' +
        "</div>" +
      "</article>"
    );
  }

  function renderFaq(items) {
    return (
      '<div class="faq-list-wrap">' +
        '<h3>Perguntas frequentes</h3>' +
        (items || []).map(function(item) {
          return '<div class="faq-item"><strong>' + e(item[0]) + "</strong><p>" + e(item[1]) + "</p></div>";
        }).join("") +
      "</div>"
    );
  }

  function renderRelatedArticles(title, slugs) {
    const list = getArticles(slugs);
    if (!list.length) return "";
    return (
      '<section class="section"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>' + e(title) + '</h2><p>Artigos ligados ao tema desta página para ajudar a decidir melhor.</p></div></div>' +
        '<div class="article-grid">' + list.map(renderArticleCard).join("") + "</div>" +
      "</div></section>"
    );
  }

  function renderStoreHome() {
    setMeta("Loja OndeCortar | Produtos de barbearia escolhidos com critério", "Loja afiliada editorial do OndeCortar com máquinas, kits, navalhas e acessórios recomendados.", "https://ondecortar.pt/loja.html");
    const featured = featuredPicks.map(function(item) {
      const product = productMap.get(item.product);
      return (
        '<article class="editorial-card">' +
          '<div class="meta-row"><span class="tag">' + e(item.label) + "</span></div>" +
          "<h3>" + e(product.name) + "</h3>" +
          "<p>" + e(item.note) + "</p>" +
          '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>' +
        "</article>"
      );
    }).join("");
    const needCards = needs.map(function(item) {
      return '<article class="category-card"><h3>' + e(item.title) + "</h3><p>" + e(item.copy) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + needHref(item.slug) + '">Explorar</a></div></article>';
    }).join("");
    const categoryCards = categories.map(function(item) {
      return '<article class="category-card"><h3>' + e(item.title) + "</h3><p>" + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + categoryHref(item.slug) + '">Ver categoria</a></div></article>';
    }).join("");
    const comparisonRows = quickComparison.map(function(item) {
      const product = productMap.get(item[1]);
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>';
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy">' +
            '<span class="eyebrow">Loja OndeCortar</span>' +
            '<h1>Produtos de barbearia escolhidos com critério</h1>' +
            '<p>Máquinas, kits, navalhas e acessórios para barbeiros e para quem cuida da barba em casa.</p>' +
            '<div class="hero-actions"><a class="btn btn-primary" href="#produtos">Explorar produtos</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ler a Revista</a></div>' +
            '<div class="hero-trust"><span class="pill">Compra final na Amazon.es através de links identificados</span></div>' +
          "</div>" +
          '<div class="hero-side">' +
            '<div class="visual-block"><strong>Revista atrai</strong><p>Conteúdo útil para captar procura, guiar a escolha e empurrar para categorias e produtos com contexto.</p></div>' +
            '<div class="panel-note"><strong>Seleção mais clara</strong><p>Menos catálogo, mais critério, mais contexto e mais confiança no momento de escolher.</p></div>' +
          "</div>" +
        "</div></div></section>" +
        '<section class="section"><div class="container trust-grid">' +
          '<article class="editorial-card"><h3>Seleção curada</h3><p>Menos ruído e mais escolhas com lógica de uso.</p></article>' +
          '<article class="editorial-card"><h3>Compra simples</h3><p>Ligação direta para a Amazon.es sem inventar preços manuais.</p></article>' +
          '<article class="editorial-card"><h3>Guias e comparações</h3><p>Conteúdo para escolher melhor antes de comprar.</p></article>' +
          '<article class="editorial-card"><h3>Links transparentes</h3><p>Disclosure afiliado visível nas páginas comerciais.</p></article>' +
        '</div></section>' +
        '<section class="section" id="produtos"><div class="container"><div class="section-header"><div><span class="eyebrow">Mais procurados</span><h2>Escolhas mais procuradas</h2><p>Quatro pontos de entrada para começar a loja com contexto.</p></div></div><div class="featured-grid">' + featured + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Por necessidade</span><h2>Explorar por necessidade</h2><p>Uma primeira camada para encontrar mais depressa o que faz sentido.</p></div></div><div class="need-grid">' + needCards + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Categorias</span><h2>Explorar por categoria</h2><p>As categorias clássicas continuam, mas com leitura mais editorial.</p></div></div><div class="category-grid">' + categoryCards + '</div></div></section>' +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Comparações rápidas</span><h2>Decidir sem andar perdido</h2><p>Quatro atalhos para chegar a uma primeira recomendação.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        renderWhyBuy() +
        renderRelatedArticles("Começar pela Revista", articles.slice(0, 6).map(function(item) { return item.slug; })) +
        '<section class="section"><div class="container">' + renderDisclosure() + "</div></section>" +
      "</main>" +
      renderFooter()
    );
  }

  function renderCategoryPage(value) {
    const category = categoryMap.get(value);
    if (!category) return renderNotFound("Categoria não encontrada");
    setMeta(category.title + " | Loja OndeCortar", category.intro, "https://ondecortar.pt/loja/" + value + "/");
    const topProducts = getProducts(category.top);
    const comparisonRows = (category.picks || []).map(function(item) {
      const product = productMap.get(item[1]);
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>';
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja.html") + '">Loja</a><span>/</span><span>' + e(category.title) + '</span></div><span class="eyebrow">Categoria</span><h1>' + e(category.title) + '</h1><p>' + e(category.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#top3">Ver top 3</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ler a Revista</a></div></div>' +
          '<div class="hero-side"><div class="panel-note"><strong>Guia de compra</strong><p>Top 3, melhor para cada uso, FAQ e artigos relacionados para decidir com mais clareza.</p></div><div class="panel-note"><strong>Compra final</strong><p>As recomendações ligam à Amazon.es com disclosure afiliado visível.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section" id="top3"><div class="container"><div class="section-header"><div><span class="eyebrow">Top 3</span><h2>Produtos recomendados</h2><p>Uma primeira seleção curta para não cair numa grelha sem fim.</p></div></div><div class="product-grid">' + topProducts.map(function(item) { return renderProductCard(item); }).join("") + '</div></div></section>' +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Melhor para</span><h2>Comparação rápida</h2><p>Quatro atalhos editoriais para chegar a uma opção com mais contexto.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        '<section class="section"><div class="container">' + renderFaq(category.faqs) + '</div></section>' +
        renderRelatedArticles("Artigos relacionados", category.articles) +
        renderWhyBuy() +
        '<section class="section"><div class="container">' + renderDisclosure() + '</div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderProductPage(value) {
    const product = productMap.get(value);
    if (!product) return renderNotFound("Produto não encontrado");
    setMeta(product.name + " | Recomendação OndeCortar", product.summary, "https://ondecortar.pt/produto.html?slug=" + encodeURIComponent(value));
    const related = products.filter(function(item) {
      return item.slug !== product.slug && item.categories.some(function(category) { return product.categories.indexOf(category) !== -1; });
    }).slice(0, 3);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja.html") + '">Loja</a><span>/</span><span>' + e(product.name) + '</span></div><span class="eyebrow">' + e(product.bestFor) + '</span><h1>' + e(product.name) + '</h1><p>' + e(product.summary) + " " + e(product.useCase) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + e(product.amazon) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a><a class="btn btn-secondary" href="' + categoryHref(product.categories[0]) + '">Ver categoria</a></div></div>' +
          '<div class="hero-side"><div class="visual-block"><img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" /></div></div>' +
        '</div></div></section>' +
        '<section class="section"><div class="container split-grid">' +
          '<div class="stack">' +
            '<div class="product-highlight"><h3>Para quem é</h3><p>' + e(product.summary) + '</p></div>' +
            '<div class="product-highlight"><h3>Onde faz sentido</h3><p>' + e(product.useCase) + '</p></div>' +
            '<div class="product-highlight"><h3>Pontos fortes</h3><ul class="rich-list">' + product.strengths.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
            '<div class="product-highlight"><h3>Limitações</h3><ul class="rich-list">' + product.limits.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
          '</div>' +
          '<div class="stack">' +
            '<div class="callout-card"><span class="eyebrow">CTA</span><h3>Ver disponibilidade</h3><p>Compra final na Amazon.es através de link identificado.</p><div class="card-actions"><a class="btn btn-primary" href="' + e(product.amazon) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a></div></div>' +
            renderDisclosure() +
          '</div>' +
        '</div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Relacionados</span><h2>Produtos relacionados</h2></div></div><div class="related-grid">' + related.map(function(item) { return renderProductCard(item, true); }).join("") + '</div></div></section>' +
        renderRelatedArticles("Artigos ligados a esta recomendação", product.articles) +
      '</main>' +
      renderFooter()
    );
  }

  function renderMagazineHome() {
    setMeta("Revista OndeCortar | Guias e artigos de barbearia", "Revista OndeCortar com guias de compra, cuidados com a barba e artigos ligados à loja.", "https://ondecortar.pt/revista/");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><span class="eyebrow">Revista OndeCortar</span><h1>Artigos úteis para escolher melhor</h1><p>Guias, comparações e artigos problema/solução ligados à loja para orientar a decisão com mais contexto.</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos">Ler artigos</a><a class="btn btn-secondary" href="' + href("loja.html") + '">Explorar produtos</a></div></div>' +
          '<div class="hero-side"><div class="panel-note"><strong>Objetivo editorial</strong><p>Captar tráfego, responder a dúvidas reais e ligar naturalmente à loja afiliada.</p></div><div class="panel-note"><strong>Ponte com a loja</strong><p>Cada artigo empurra para produtos relevantes e cada categoria puxa artigos relacionados.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Secções</span><h2>Explorar a Revista</h2><p>Hubs editoriais pensados para dúvidas reais e intenção comercial.</p></div></div><div class="hub-grid">' + hubs.map(function(item) { return '<article class="hub-card"><h3>' + e(item.title) + '</h3><p>' + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + hubHref(item.slug) + '">Ver secção</a></div></article>'; }).join("") + '</div></div></section>' +
        '<section class="section" id="artigos"><div class="container"><div class="section-header"><div><span class="eyebrow">Primeiros artigos</span><h2>Leituras prioritárias</h2><p>Os primeiros seis artigos para abrir a revista com utilidade comercial real.</p></div></div><div class="article-grid">' + articles.slice(0, 6).map(renderArticleCard).join("") + '</div></div></section>' +
        renderWhyBuy() +
        '<section class="section"><div class="container">' + renderDisclosure() + '</div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderHubPage(value) {
    const hub = hubMap.get(value);
    if (!hub) return renderNotFound("Secção não encontrada");
    setMeta(hub.title + " | Revista OndeCortar", hub.intro, "https://ondecortar.pt/revista/" + value + "/");
    const hubArticles = getArticles(hub.articles);
    const hubCategories = (hub.categories || []).map(function(item) { return categoryMap.get(item); }).filter(Boolean);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><span>' + e(hub.title) + '</span></div><span class="eyebrow">Secção editorial</span><h1>' + e(hub.title) + '</h1><p>' + e(hub.intro) + '</p></div><div class="hero-side"><div class="panel-note"><strong>Ligação à loja</strong><p>Artigos desta secção puxam categorias e produtos relevantes.</p></div></div></div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Artigos</span><h2>Leituras nesta secção</h2></div></div><div class="article-grid">' + hubArticles.map(renderArticleCard).join("") + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Ligação à loja</span><h2>Categorias relacionadas</h2></div></div><div class="category-grid">' + hubCategories.map(function(item) { return '<article class="category-card"><h3>' + e(item.title) + '</h3><p>' + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + categoryHref(item.slug) + '">Ver categoria</a></div></article>'; }).join("") + '</div></div></section>' +
        '<section class="section"><div class="container">' + renderDisclosure() + '</div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderArticlePage(value) {
    const article = articleMap.get(value);
    if (!article) return renderNotFound("Artigo não encontrado");
    const hub = hubMap.get(article.hub);
    setMeta(article.title + " | Revista OndeCortar", article.excerpt, "https://ondecortar.pt/revista/" + value + "/");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card article-header"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><a href="' + hubHref(article.hub) + '">' + e(hub ? hub.title : "Secção") + '</a></div><span class="eyebrow">Revista OndeCortar</span><h1>' + e(article.title) + '</h1><p>' + e(article.intro) + '</p></div></section>' +
        '<section class="section"><div class="container article-layout"><div class="article-body">' +
          (article.sections || []).map(function(item) { return '<article class="article-section"><h3>' + e(item[0]) + '</h3>' + item[1].map(function(text) { return "<p>" + e(text) + "</p>"; }).join("") + "</article>"; }).join("") +
          '<article class="article-section"><h3>Lista prática</h3><ul class="rich-list">' + (article.checklist || []).map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></article>' +
        '</div><aside class="stack">' + renderWhyBuy().replace('<section class="section"><div class="container callout-card">', '<div class="callout-card">').replace('</div></section>', '</div>') + renderDisclosure() + '</aside></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Produtos recomendados</span><h2>Ligações úteis à loja</h2><p>Produtos ligados ao tema do artigo, sem depender de ratings ou preços fixos.</p></div></div><div class="product-grid">' + getProducts(article.relatedProducts).map(function(item) { return renderProductCard(item, true); }).join("") + '</div></div></section>' +
        '<section class="section"><div class="container">' + renderFaq(article.faqs) + '</div></section>' +
        renderRelatedArticles("Artigos relacionados", article.relatedArticles) +
        '<section class="section"><div class="container">' + renderDisclosure() + '</div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderNotFound(label) {
    setMeta("Página não encontrada | OndeCortar", "A página pedida não está disponível.", window.location.href);
    return renderHeader() + '<main><section class="section"><div class="container callout-card"><h1>' + e(label) + '</h1><p>Volta à loja ou à revista para continuares a navegar.</p><div class="hero-actions"><a class="btn btn-primary" href="' + href("loja.html") + '">Ir para a loja</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ir para a revista</a></div></div></section></main>' + renderFooter();
  }

  if (page === "store") app.innerHTML = renderStoreHome();
  else if (page === "category") app.innerHTML = renderCategoryPage(slug);
  else if (page === "product") app.innerHTML = renderProductPage(slug);
  else if (page === "magazine") app.innerHTML = renderMagazineHome();
  else if (page === "hub") app.innerHTML = renderHubPage(slug);
  else if (page === "article") app.innerHTML = renderArticlePage(slug);
  else app.innerHTML = renderNotFound("Página não encontrada");
})();
