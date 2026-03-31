(function() {
  const html = document.documentElement;
  if (html) {
    html.setAttribute("lang", "pt-PT");
    html.setAttribute("xml:lang", "pt-PT");
    html.setAttribute("translate", "no");
  }
  if (document.head) {
    let langMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (!langMeta) {
      langMeta = document.createElement("meta");
      langMeta.setAttribute("http-equiv", "content-language");
      document.head.appendChild(langMeta);
    }
    langMeta.setAttribute("content", "pt-PT");

    let noTranslateMeta = document.querySelector('meta[name="google"]');
    if (!noTranslateMeta) {
      noTranslateMeta = document.createElement("meta");
      noTranslateMeta.setAttribute("name", "google");
      document.head.appendChild(noTranslateMeta);
    }
    noTranslateMeta.setAttribute("content", "notranslate");
  }

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

  function amazonPtUrl(value) {
    try {
      const url = new URL(String(value || ""));
      if (!/amazon\.es$/i.test(url.hostname)) {
        return value;
      }

      if (/^\/dp\//i.test(url.pathname)) {
        url.pathname = "/-/pt" + url.pathname;
      } else if (/^\/gp\/product\//i.test(url.pathname)) {
        url.pathname = "/-/pt" + url.pathname;
      } else if (!/^\/-\/pt\//i.test(url.pathname)) {
        url.pathname = "/-/pt" + (url.pathname.startsWith("/") ? url.pathname : "/" + url.pathname);
      }

      if (!url.searchParams.get("tag")) {
        url.searchParams.set("tag", "ondecortarp0c-21");
      }
      url.searchParams.set("language", "pt_PT");
      return url.toString();
    } catch (error) {
      return value;
    }
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

  function sectionLabel() {
    const section = currentSection();
    if (section === "loja") {
      return "Loja afiliada editorial";
    }
    if (section === "revista") {
      return "Revista editorial";
    }
    return "Barbearias em Portugal";
  }

  function renderHeader() {
    const section = currentSection();
    const ctaLabel = section === "revista" ? "Ler artigos" : "Ver loja";
    return (
      '<header class="site-header"><div class="container"><nav class="nav" aria-label="Navegação principal">' +
        '<a class="brand" href="' + href("index.html") + '">' +
          '<img class="brand-logo" src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" />' +
          '<span class="brand-text"><strong>OndeCortar.pt</strong><span>' + e(sectionLabel()) + '</span></span>' +
        "</a>" +
        '<div class="nav-links">' +
          '<a href="' + href("index.html#explorar") + '">Explorar</a>' +
          '<a class="' + (section === "loja" ? "is-current" : "") + '" href="' + href("loja.html") + '">Loja</a>' +
          '<a class="' + (section === "revista" ? "is-current" : "") + '" href="' + href("revista/") + '">Revista</a>' +
          '<a href="' + href("faq.html") + '">FAQ</a>' +
          '<a class="nav-cta" href="' + (section === "revista" ? href("revista/") : href("loja.html")) + '">' + e(ctaLabel) + '</a>' +
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

  function countProductsByCategory(slugValue) {
    return products.filter(function(item) {
      return Array.isArray(item.categories) && item.categories.indexOf(slugValue) !== -1;
    }).length;
  }

  function categoryLeadProduct(category) {
    const top = getProducts(category.top || []);
    return top[0] || products.find(function(item) {
      return Array.isArray(item.categories) && item.categories.indexOf(category.slug) !== -1;
    }) || null;
  }

  function renderCategoryCard(category, withImage) {
    const lead = categoryLeadProduct(category);
    const count = countProductsByCategory(category.slug);
    return (
      '<article class="category-card">' +
        (withImage && lead ? '<div class="category-thumb"><img src="' + href(lead.image) + '" alt="' + e(lead.alt) + '" loading="lazy" /></div>' : "") +
        '<div class="product-copy">' +
          '<div class="meta-row"><span class="tag">' + count + " seleções</span></div>" +
          "<h3>" + e(category.title) + "</h3>" +
          "<p>" + e(category.intro) + "</p>" +
          '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + categoryHref(category.slug) + '">Ver categoria</a></div>' +
        "</div>" +
      "</article>"
    );
  }

  function renderMiniProduct(product) {
    return (
      '<a class="shop-mini-card" href="' + productHref(product.slug) + '">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" />' +
        '<div><strong>' + e(product.name) + '</strong><p>' + e(product.summary) + '</p><span class="tag">Ver detalhes</span></div>' +
      "</a>"
    );
  }

  function renderWhyBuy() {
    return (
      '<section class="section"><div class="container callout-card">' +
        '<span class="eyebrow">Comprar com confiança</span>' +
        "<h2>Porque comprar pela Loja OndeCortar</h2>" +
        "<p>Poupas tempo na escolha, comparas opções com contexto real e compras na Amazon.es com links identificados.</p>" +
      "</div></section>"
    );
  }

  function renderArticleProductSpotlight(article) {
    const picks = getProducts(article.relatedProducts).slice(0, 2);
    if (!picks.length) return "";
    return (
      '<div class="callout-card article-commerce">' +
        '<span class="eyebrow">Escolhas do artigo</span>' +
        '<h3>Produtos para aplicar este conteúdo</h3>' +
        '<p>Se este tema faz sentido para ti, começa por estas opções com acesso direto.</p>' +
        '<div class="shop-mini-grid">' + picks.map(renderMiniProduct).join("") + '</div>' +
      '</div>'
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
      '<a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a>' +
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
          '<div class="featured-thumb"><img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" /></div>' +
          '<div class="product-copy">' +
            '<div class="meta-row"><span class="tag">' + e(item.label) + '</span><span class="tag">' + e(product.bestFor) + '</span></div>' +
            "<h3>" + e(product.name) + "</h3>" +
            "<p>" + e(item.note) + "</p>" +
              '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a></div>' +
          "</div>" +
        "</article>"
      );
    }).join("");
    const needCards = needs.map(function(item) {
      return '<article class="category-card"><div class="meta-row"><span class="tag">Necessidade</span></div><h3>' + e(item.title) + "</h3><p>" + e(item.copy) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + needHref(item.slug) + '">Explorar</a></div></article>';
    }).join("");
    const categoryCards = categories.map(function(item) { return renderCategoryCard(item, true); }).join("");
    const comparisonRows = quickComparison.map(function(item) {
      const product = productMap.get(item[1]);
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>';
    }).join("");
    const shelfProducts = getProducts(["wahl-super-taper", "viking-sandalwood", "beardburys-spray"]);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy">' +
            '<span class="section-flag">Loja afiliada</span>' +
            '<h1>Escolhe melhor. Compra com confiança.</h1>' +
            '<p>Seleção direta de máquinas, kits, navalhas e acessórios para comprares sem perder tempo em dezenas de páginas.</p>' +
            '<div class="hero-actions"><a class="btn btn-primary" href="#produtos">Ver recomendações</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ler guias de compra</a></div>' +
            '<div class="hero-trust"><span class="pill">Compra final na Amazon.es com links afiliados identificados</span></div>' +
            '<div class="store-metrics">' +
              '<article class="store-metric"><strong>' + products.length + '</strong><span>opções prontas a comprar</span></article>' +
              '<article class="store-metric"><strong>' + categories.length + '</strong><span>categorias de decisão</span></article>' +
              '<article class="store-metric"><strong>' + articles.length + '</strong><span>guias para acelerar a escolha</span></article>' +
            '</div>' +
          "</div>" +
          '<div class="hero-side shop-strip">' +
            '<div class="store-note"><strong>Escolhas rápidas para começar</strong><p>Selecionámos três opções com perfis diferentes para encontrares mais depressa a que faz sentido para ti.</p></div>' +
            '<div class="shop-mini-grid">' + shelfProducts.map(renderMiniProduct).join("") + '</div>' +
          "</div>" +
        "</div></div></section>" +
        '<section class="section"><div class="container trust-grid">' +
          '<article class="editorial-card"><h3>Só o que vale a pena</h3><p>Seleção curta para chegares rápido a uma boa compra.</p></article>' +
          '<article class="editorial-card"><h3>Compra sem fricção</h3><p>Botões diretos para Amazon.es, sem preços manuais desatualizados.</p></article>' +
          '<article class="editorial-card"><h3>Decisão mais rápida</h3><p>Guias e comparações para escolher com mais certeza.</p></article>' +
          '<article class="editorial-card"><h3>Afiliado transparente</h3><p>Links identificados e política clara em todas as páginas comerciais.</p></article>' +
        '</div></section>' +
        '<section class="section" id="produtos"><div class="container"><div class="section-header"><div><span class="eyebrow">Mais procurados</span><h2>Top recomendações para comprar hoje</h2><p>Quatro recomendações para começares a compra sem perder tempo.</p></div></div><div class="featured-grid">' + featured + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Por necessidade</span><h2>Explorar por necessidade</h2><p>Uma primeira camada para encontrar mais depressa o que faz sentido.</p></div></div><div class="need-grid">' + needCards + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Categorias</span><h2>Comprar por categoria</h2><p>Vai direto ao tipo de produto que queres, sem desvios.</p></div></div><div class="category-grid">' + categoryCards + '</div></div></section>' +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Comparações rápidas</span><h2>Compara e decide em minutos</h2><p>Quatro atalhos para chegares ao produto certo mais depressa.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        renderWhyBuy() +
        renderRelatedArticles("Guias para comprar melhor", articles.slice(0, 6).map(function(item) { return item.slug; })) +
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
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja.html") + '">Loja</a><span>/</span><span>' + e(category.title) + '</span></div><span class="section-flag">Categoria da loja</span><h1>' + e(category.title) + '</h1><p>' + e(category.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#top3">Ver top 3 da categoria</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ler guia relacionado</a></div></div>' +
          '<div class="hero-side"><div class="shop-mini-grid">' + topProducts.slice(0, 2).map(renderMiniProduct).join("") + '</div><div class="store-note"><strong>Escolha mais rápida</strong><p>Selecionámos poucas opções para decidires sem te perderes em excesso de oferta.</p></div></div>' +
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
    const leadStrength = (product.strengths && product.strengths[0]) ? product.strengths[0] : "";
    const secondStrength = (product.strengths && product.strengths[1]) ? product.strengths[1] : leadStrength;
    const leadGuideSlug = (product.articles && product.articles[0]) ? product.articles[0] : "";
    const leadGuide = leadGuideSlug ? articleMap.get(leadGuideSlug) : null;
    const related = products.filter(function(item) {
      return item.slug !== product.slug && item.categories.some(function(category) { return product.categories.indexOf(category) !== -1; });
    }).slice(0, 3);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja.html") + '">Loja</a><span>/</span><span>' + e(product.name) + '</span></div><span class="section-flag">Produto recomendado</span><span class="eyebrow">' + e(product.bestFor) + '</span><h1>' + e(product.name) + '</h1><p>' + e(product.summary) + " " + e(product.useCase) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a><a class="btn btn-secondary" href="' + categoryHref(product.categories[0]) + '">Ver categoria</a></div><div class="product-hero-panel"><strong>Antes de comprar</strong><ul class="rich-list"><li>Melhor para: ' + e(product.bestFor) + '</li><li>Ponto forte: ' + e(leadStrength || product.summary) + '</li><li>Vantagem adicional: ' + e(secondStrength || product.useCase) + '</li></ul><div class="card-actions">' + (leadGuide ? '<a class="btn btn-soft btn-small" href="' + articleHref(leadGuide.slug) + '">Ler guia relacionado</a>' : "") + '<a class="btn btn-secondary btn-small" href="#relacionados">Comparar semelhantes</a></div></div></div>' +
      '<div class="hero-side"><div class="product-stage"><img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" /></div><div class="store-note"><strong>Compra com mais confiança</strong><p>Destacamos este produto pelo equilíbrio entre uso real, procura e feedback de compradores para te ajudar a decidir mais depressa.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section"><div class="container split-grid">' +
          '<div class="stack">' +
            '<div class="product-highlight"><h3>Para quem é</h3><p>' + e(product.summary) + '</p></div>' +
            '<div class="product-highlight"><h3>Onde faz sentido</h3><p>' + e(product.useCase) + '</p></div>' +
            '<div class="product-highlight"><h3>Pontos fortes</h3><ul class="rich-list">' + product.strengths.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
            '<div class="product-highlight"><h3>Limitações</h3><ul class="rich-list">' + product.limits.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
          '</div>' +
          '<div class="stack">' +
            '<div class="buy-box"><span class="price-hint">Loja afiliada</span><h3>Comprar agora na Amazon.es</h3><p>Confirma disponibilidade e avança para a compra com entrega rápida e pagamento seguro na plataforma.</p><div class="card-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener">Ver na Amazon.es</a><a class="btn btn-secondary" href="' + categoryHref(product.categories[0]) + '">Voltar à categoria</a></div></div>' +
            renderDisclosure() +
          '</div>' +
        '</div></section>' +
        '<section class="section" id="relacionados"><div class="container"><div class="section-header"><div><span class="eyebrow">Relacionados</span><h2>Produtos relacionados</h2></div></div><div class="related-grid">' + related.map(function(item) { return renderProductCard(item, true); }).join("") + '</div></div></section>' +
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
          '<div class="hero-copy"><span class="section-flag">Revista OndeCortar</span><h1>Artigos úteis para escolher melhor</h1><p>Guias, comparações e artigos problema/solução ligados à loja para orientar a decisão com mais contexto.</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos">Ler artigos</a><a class="btn btn-secondary" href="' + href("loja.html") + '">Explorar produtos</a></div></div>' +
          '<div class="hero-side"><div class="panel-note"><strong>Objetivo editorial</strong><p>Captar tráfego, responder a dúvidas reais e ligar naturalmente à loja afiliada.</p></div><div class="panel-note"><strong>Ponte com a loja</strong><p>Cada artigo empurra para produtos relevantes e cada categoria puxa artigos relacionados.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Secções</span><h2>Explorar a Revista</h2><p>Hubs editoriais pensados para dúvidas reais e intenção comercial.</p></div></div><div class="hub-grid">' + hubs.map(function(item) { return '<article class="hub-card"><h3>' + e(item.title) + '</h3><p>' + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + hubHref(item.slug) + '">Ver secção</a></div></article>'; }).join("") + '</div></div></section>' +
        '<section class="section" id="artigos"><div class="container"><div class="section-header"><div><span class="eyebrow">Primeiros artigos</span><h2>Artigos prioritários</h2><p>Os primeiros seis artigos para abrir a revista com utilidade comercial real.</p></div></div><div class="article-grid">' + articles.slice(0, 6).map(renderArticleCard).join("") + '</div></div></section>' +
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
        '<section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><span>' + e(hub.title) + '</span></div><span class="section-flag">Secção editorial</span><h1>' + e(hub.title) + '</h1><p>' + e(hub.intro) + '</p></div><div class="hero-side"><div class="panel-note"><strong>Ligação à loja</strong><p>Artigos desta secção puxam categorias e produtos relevantes.</p></div></div></div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Artigos</span><h2>Artigos desta secção</h2></div></div><div class="article-grid">' + hubArticles.map(renderArticleCard).join("") + '</div></div></section>' +
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
        '<section class="section"><div class="container hero-card article-header"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><a href="' + hubHref(article.hub) + '">' + e(hub ? hub.title : "Secção") + '</a></div><span class="section-flag">Artigo da Revista</span><h1>' + e(article.title) + '</h1><p>' + e(article.intro) + '</p><p class="article-subcopy">' + e(article.subIntro || article.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#produtos-artigo">Ver escolhas recomendadas</a><a class="btn btn-secondary" href="#faq-artigo">Ler perguntas frequentes</a></div></div></section>' +
        '<section class="section"><div class="container article-layout"><div class="article-body">' +
          (article.sections || []).map(function(item) { return '<article class="article-section"><h3>' + e(item[0]) + '</h3>' + item[1].map(function(text) { return "<p>" + e(text) + "</p>"; }).join("") + "</article>"; }).join("") +
          '<article class="article-section"><h3>Lista prática</h3><ul class="rich-list">' + (article.checklist || []).map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></article>' +
        '</div><aside class="stack">' + renderArticleProductSpotlight(article) + renderDisclosure() + '</aside></div></section>' +
        '<section class="section" id="produtos-artigo"><div class="container"><div class="section-header"><div><span class="eyebrow">Escolhas recomendadas</span><h2>Opções para este tema</h2><p>Sugestões alinhadas com o conteúdo do artigo para te ajudar a decidir melhor.</p></div></div><div class="product-grid">' + getProducts(article.relatedProducts).map(function(item) { return renderProductCard(item, true); }).join("") + '</div></div></section>' +
        '<section class="section" id="faq-artigo"><div class="container">' + renderFaq(article.faqs) + '</div></section>' +
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
