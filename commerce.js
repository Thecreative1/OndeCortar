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

  function absoluteUrl(path) {
    return /^https?:/i.test(path) ? path : "https://ondecortar.pt/" + String(path || "").replace(/^\/+/, "");
  }

  function categoryHref(value) {
    return href("loja/" + value + "/");
  }

  function editorialCategoryHref(value) {
    return categoryHref(value) + "#top-escolhas";
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
    return href("produto/" + encodeURIComponent(value) + "/");
  }

  function amazonPtUrl(value) {
    try {
      const url = new URL(String(value || ""));
      if (!/amazon\.es$/i.test(url.hostname)) {
        return value;
      }

      let targetUrl = url;
      if (/^\/customer-preferences\/edit\/?$/i.test(url.pathname)) {
        const returnUrl = url.searchParams.get("preferencesReturnUrl");
        if (returnUrl) {
          targetUrl = new URL(returnUrl, "https://www.amazon.es");
        }
      }

      if (!targetUrl.searchParams.get("tag")) {
        targetUrl.searchParams.set("tag", "ondecortarp0c-21");
      }

      targetUrl.searchParams.set("language", "pt_PT");

      return targetUrl.toString();
    } catch (error) {
      return value;
    }
  }

  function setMeta(title, description, canonical) {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogUrl) ogUrl.setAttribute("content", canonical);
    if (canonicalTag) canonicalTag.setAttribute("href", canonical);
  }

  function setRobots(content) {
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute("content", content);
  }

  function setStructuredData(items) {
    document.querySelectorAll('script[data-ondecortar-ld]').forEach(function(node) {
      node.remove();
    });

    (items || []).forEach(function(item) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-ondecortar-ld", "true");
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }

  function titleCaseCategory(category) {
    return category && category.title ? category.title : "";
  }

  function categoryMetaTitle(category) {
    return "Recomendações de " + titleCaseCategory(category) + " | OndeCortar.pt";
  }

  function categoryMetaDescription(category) {
    return "Compara " + String(category.title || "").toLowerCase() + " com mais critério. Vê produtos recomendados, contexto de compra e ligações úteis.";
  }

  function categoryLongIntro(category) {
    const topCount = (category.top || []).length;
    const articleCount = (category.articles || []).length;
    return [
      category.intro,
      "Nesta categoria reunimos " + topCount + " produtos recomendados, atalhos rápidos para diferentes cenários e um bloco editorial pensado para reduzir ruído na decisão.",
      "A ideia não é mostrar um catálogo infinito, mas dar contexto sobre quem beneficia mais deste tipo de produto, que erros evitar antes de comprar e por onde continuar a navegar dentro do ecossistema OndeCortar.",
      articleCount ? "Também ligamos esta página a " + articleCount + " artigo" + (articleCount === 1 ? "" : "s") + " da revista para que possas aprofundar a escolha antes de sair para uma recomendação concreta." : "Quando faz sentido, a página liga ainda a artigos da revista para aprofundares a escolha antes de sair para um produto."
    ].join(" ");
  }

  function categoryShortIntro(category) {
    const articleCount = (category.articles || []).length;
    return category.intro + " " + (articleCount
      ? "Vês primeiro as escolhas mais fortes e, no fim, tens guias ligados a esta compra."
      : "Vês primeiro as escolhas mais fortes para decidir sem te perderes num catálogo infinito.");
  }

  function categoryTopChoices(category, limit) {
    const seen = new Set();
    const result = [];

    function pushProduct(product) {
      if (!product || !product.slug || seen.has(product.slug)) return;
      seen.add(product.slug);
      result.push(product);
    }

    getProducts(category.top || []).forEach(pushProduct);
    products.filter(function(item) {
      return Array.isArray(item.categories) && item.categories.indexOf(category.slug) !== -1;
    }).forEach(pushProduct);

    return result.slice(0, limit || 5);
  }

  function categoryGuideCopy(category) {
    const scenarios = (category.picks || [])
      .map(function(item) { return String(item[0] || "").toLowerCase(); })
      .filter(Boolean)
      .slice(0, 3);
    const scenarioLine = scenarios.length
      ? "Começa pelo cenário mais parecido com o teu uso: " + scenarios.join(", ") + "."
      : "Começa pelo contexto de uso antes de olhares para extras ou listas longas de acessórios.";

    return {
      title: "Como escolher nesta categoria",
      copy: scenarioLine + " Nesta categoria, a diferença costuma aparecer mais no uso real do que na ficha técnica.",
      points: [
        "Se queres uma compra simples, reduz primeiro para duas ou três opções fortes e só depois abres o detalhe.",
        "Se vais usar com frequência, dá mais peso a conforto, consistência e manutenção do que ao número de extras.",
        (category.articles || []).length
          ? "No fim da página tens artigos ligados a esta categoria para confirmar a decisão antes de clicar num produto."
          : "Usa esta categoria para eliminar ruído antes de abrires um produto específico."
      ]
    };
  }

  function productHighlightLine(product, fallback) {
    const line = fallback || (product && Array.isArray(product.strengths) && product.strengths[0]) || (product && product.summary) || "";
    if (!line) return "";
    return line.charAt(0).toUpperCase() + line.slice(1);
  }

  function normalizeProductCardOptions(options) {
    if (typeof options === "boolean") {
      return { dense: options };
    }
    return options || {};
  }

  function articlePublishedDate(article) {
    return article.datePublished || "2026-04-05";
  }

  function articleUpdatedDate(article) {
    return article.dateModified || "2026-04-07";
  }

  function formatDatePt(value) {
    try {
      const date = new Date(String(value) + "T12:00:00Z");
      return new Intl.DateTimeFormat("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
      }).format(date);
    } catch (error) {
      return value;
    }
  }

  function coreArticles() {
    const list = articles.filter(function(item) {
      return item.series === "core-2026";
    });
    return list.length ? list : articles;
  }

  function currentSection() {
    if (page === "magazine" || page === "hub" || page === "article") return "revista";
    if (page === "store" || page === "category" || page === "product") return "loja";
    return "";
  }

  function sectionLabel() {
    const section = currentSection();
    if (section === "loja") {
      return "Produtos de barbearia";
    }
    if (section === "revista") {
      return "Guias e artigos";
    }
    return "Barbearias em Portugal";
  }

  function renderHeader() {
    const section = currentSection();
    const ctaLabel = section === "revista" ? "Ler artigos" : "Ver loja";
    return (
      '<header class="site-header"><div class="container"><nav class="nav" aria-label="Navegação principal">' +
        '<div class="nav-main-row">' +
          '<a class="brand" href="' + href("index.html") + '">' +
            '<img class="brand-logo" src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" />' +
            '<span class="brand-text"><strong>OndeCortar.pt</strong><span>' + e(sectionLabel()) + '</span></span>' +
          "</a>" +
          '<div class="nav-mobile-actions">' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="siteNavLinks" data-nav-toggle>' +
              "<span>Menu</span>" +
              '<span class="nav-toggle-box" aria-hidden="true"><span class="nav-toggle-line"></span><span class="nav-toggle-line"></span><span class="nav-toggle-line"></span></span>' +
            "</button>" +
          "</div>" +
        "</div>" +
        '<div class="nav-links" id="siteNavLinks">' +
          '<a href="' + href("index.html#explorar") + '">Explorar</a>' +
          '<a href="' + href("index.html#cidades") + '">Cidades</a>' +
          '<a href="' + href("registar.html") + '">Adicionar barbearia</a>' +
          '<a class="' + (section === "loja" ? "is-current" : "") + '" href="' + href("loja/") + '">Loja</a>' +
          '<a class="' + (section === "revista" ? "is-current" : "") + '" href="' + href("revista/") + '">Revista</a>' +
          '<a href="' + href("faq.html") + '">FAQ</a>' +
          '<a class="nav-cta" href="' + (section === "revista" ? href("revista/") : href("loja/")) + '">' + e(ctaLabel) + '</a>' +
        "</div>" +
      "</nav></div></header>"
    );
  }

  function renderFooter() {
    return (
      '<footer><div class="container footer-shell">' +
        '<div class="footer-intro">' +
          '<div class="footer-brand"><img src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" /><strong>OndeCortar.pt</strong></div>' +
          "<p>Produtos recomendados e artigos úteis para escolher melhor antes de comprar.</p>" +
        "</div>" +
        '<div class="footer-links">' +
          '<a href="' + href("loja/") + '">Loja</a>' +
          '<a href="' + href("revista/") + '">Revista</a>' +
          '<a href="' + href("index.html#explorar") + '">Mapa</a>' +
          '<a href="' + href("faq.html") + '">FAQ</a>' +
        "</div>" +
      "</div></footer>"
    );
  }

  function setupNavigation() {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector("[data-nav-toggle]");
    const navLinks = document.getElementById("siteNavLinks");

    if (!nav || !toggle || !navLinks) {
      return;
    }

    function setOpen(nextOpen) {
      nav.classList.toggle("is-open", nextOpen);
      document.body.classList.toggle("nav-open", nextOpen);
      toggle.setAttribute("aria-expanded", String(nextOpen));
    }

    toggle.addEventListener("click", function() {
      setOpen(!nav.classList.contains("is-open"));
    });

    navLinks.addEventListener("click", function(event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("click", function(event) {
      if (!nav.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function() {
      if (window.innerWidth > 760) {
        setOpen(false);
      }
    });
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
          '<div class="meta-row"><span class="tag">' + count + " produtos</span></div>" +
          "<h3>" + e(category.title) + "</h3>" +
          "<p>" + e(category.intro) + "</p>" +
          '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + categoryHref(category.slug) + '">Explorar categoria</a></div>' +
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
        '<span class="eyebrow">Compra com confiança</span>' +
        "<h2>Escolhe melhor antes de comprar</h2>" +
        "<p>Recomendações curtas, comparação rápida e acesso direto para Amazon.es com links identificados.</p>" +
      "</div></section>"
    );
  }

  function articleRecommendedEntries(article) {
    const explicit = Array.isArray(article.recommendedProducts) && article.recommendedProducts.length
      ? article.recommendedProducts
      : (article.relatedProducts || []).map(function(item) { return { slug: item }; });
    return explicit
      .map(function(item) {
        const normalized = typeof item === "string" ? { slug: item } : item;
        const product = productMap.get(normalized.slug);
        if (!product) return null;
        return {
          product: product,
          blurb: normalized.blurb || product.summary,
          note: normalized.note || product.useCase
        };
      })
      .filter(Boolean)
      .slice(0, 4);
  }

  function collectMagazineProducts(articleList, categoryList, limit) {
    const seen = new Set();
    const result = [];

    function pushProduct(product) {
      if (!product || !product.slug || seen.has(product.slug)) return;
      seen.add(product.slug);
      result.push(product);
    }

    function pushSlug(slug) {
      if (!slug) return;
      pushProduct(productMap.get(slug));
    }

    (categoryList || []).forEach(function(category) {
      (category.top || []).forEach(pushSlug);
      pushProduct(categoryLeadProduct(category));
    });

    (articleList || []).forEach(function(article) {
      articleRecommendedEntries(article).forEach(function(entry) {
        pushProduct(entry.product);
      });
      (article.relatedProducts || []).forEach(pushSlug);
    });

    return result.slice(0, limit || 4);
  }

  function renderMagazineProductShelf(title, copy, list, ctaHref, ctaLabel) {
    if (!list || !list.length) return "";
    return (
      '<section class="section"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Produtos em destaque</span><h2>' + e(title) + '</h2><p>' + e(copy) + '</p></div>' +
          (ctaHref ? '<div class="hero-actions"><a class="btn btn-secondary" href="' + ctaHref + '">' + e(ctaLabel || "Ver categoria") + '</a></div>' : "") +
        '</div>' +
        '<div class="product-grid product-grid--dense magazine-product-grid">' + list.map(function(product) { return renderProductCard(product, { dense: true }); }).join("") + '</div>' +
      '</div></section>'
    );
  }

  function renderArticleQuickAnswers(article) {
    const items = article.quickAnswers || [];
    if (!items.length) return "";
    return (
      '<section class="section"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Resposta rápida</span><h2>O que interessa saber primeiro</h2><p>Uma leitura curta para perceber a direção certa antes de entrares no detalhe.</p></div></div>' +
        '<div class="quick-answer-grid">' +
          items.map(function(item) {
            return '<article class="quick-answer-card"><strong>' + e(item[0]) + '</strong><p>' + e(item[1]) + '</p></article>';
          }).join("") +
        '</div>' +
      '</div></section>'
    );
  }

  function renderArticleSidebar(article) {
    const list = article.checklist || [];
    const category = categoryMap.get(article.relatedCategory || "");
    return (
      (list.length ? '<div class="callout-card article-sidebar-card"><span class="eyebrow">Resumo prático</span><h3>O que confirmar antes de escolher</h3><ul class="rich-list">' + list.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' : "") +
      (category ? '<div class="callout-card article-sidebar-card"><span class="eyebrow">Categoria relacionada</span><h3>' + e(category.title) + '</h3><p>' + e(article.categoryCta || category.intro) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + editorialCategoryHref(category.slug) + '">Ver Top Escolhas</a></div></div>' : "")
    );
  }

  function renderCategoryGuide(category) {
    const guide = categoryGuideCopy(category);
    return (
      '<section class="section"><div class="container category-guide-card">' +
        '<div class="section-header section-header--compact"><div><span class="eyebrow">Como escolher</span><h2>' + e(guide.title) + '</h2><p>' + e(guide.copy) + '</p></div></div>' +
        '<ul class="rich-list category-guide-points">' + guide.points.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul>' +
      '</div></section>'
    );
  }

  function renderArticleDecisionStrip(article) {
    const entries = articleRecommendedEntries(article).slice(0, 3);
    if (!entries.length) return "";
    return (
      '<section class="section" id="atalhos-compra"><div class="container">' +
        '<div class="section-header section-header--compact"><div><span class="eyebrow">Atalhos de compra</span><h2>Produtos a considerar enquanto lês</h2><p>Uma ponte curta entre o guia, a categoria ligada e as recomendações que fazem mais sentido neste tema.</p></div></div>' +
        '<div class="article-inline-products">' +
          entries.map(function(entry) {
            return (
              '<article class="shop-mini-card article-inline-card">' +
                '<img src="' + href(entry.product.image) + '" alt="' + e(entry.product.alt) + '" loading="lazy" />' +
                '<div>' +
                  '<span class="tag">' + e(entry.product.bestFor) + '</span>' +
                  '<strong>' + e(entry.product.name) + '</strong>' +
                  '<p>' + e(entry.blurb) + '</p>' +
                  '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(entry.product.slug) + '">Ver produto</a></div>' +
                '</div>' +
              '</article>'
            );
          }).join("") +
        '</div>' +
      '</div></section>'
    );
  }

  function renderArticleRecommendedProducts(article) {
    const entries = articleRecommendedEntries(article);
    if (!entries.length) return "";
    return (
      '<section class="section" id="produtos-artigo"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Produtos recomendados</span><h2>Produtos ligados a este guia</h2><p>Uma seleção curta para continuares a decisão com menos fricção entre conteúdo, categoria e produto.</p></div></div>' +
        '<div class="product-grid article-recommend-grid">' +
          entries.map(function(entry) {
            return (
              '<article class="product-card article-recommend-card">' +
                '<img src="' + href(entry.product.image) + '" alt="' + e(entry.product.alt) + '" loading="lazy" />' +
                '<div class="product-copy">' +
                  '<div class="meta-row"><span class="tag">' + e(entry.product.bestFor) + '</span></div>' +
                  '<h3 class="product-card-title">' + e(entry.product.name) + '</h3>' +
                  '<p class="product-highlight-line">' + e(productHighlightLine(entry.product, entry.blurb)) + '</p>' +
                  '<p class="product-support-line article-note">' + e(entry.note) + '</p>' +
                  '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(entry.product.slug) + '">Ver produto</a><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(entry.product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a></div>' +
                '</div>' +
              '</article>'
            );
          }).join("") +
        '</div>' +
        '<div class="section" style="padding:18px 0 0;">' + renderDisclosure() + '</div>' +
      '</div></section>'
    );
  }

  function renderArticleCategoryBridge(article) {
    const category = categoryMap.get(article.relatedCategory || "");
    if (!category) return "";
    return (
      '<section class="section"><div class="container callout-card article-category-bridge">' +
        '<span class="eyebrow">Categoria da loja ligada a este guia</span>' +
        '<h2>' + e(category.title) + '</h2>' +
        '<p>' + e(article.categoryCta || category.intro) + '</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">Ver Top Escolhas da categoria</a><a class="btn btn-secondary" href="' + categoryHref(category.slug) + '">Abrir categoria completa</a></div>' +
      '</div></section>'
    );
  }

  function renderArticleFinalCta(article) {
    const category = categoryMap.get(article.relatedCategory || "");
    const title = article.finalCta && article.finalCta.title ? article.finalCta.title : "Escolhe com mais confiança";
    const copy = article.finalCta && article.finalCta.copy ? article.finalCta.copy : "Se o artigo te ajudou a reduzir dúvidas, o próximo passo é comparar menos opções, mas melhores.";
    return (
      '<section class="section"><div class="container callout-card article-final-cta">' +
        '<span class="eyebrow">Próximo passo</span>' +
        '<h2>' + e(title) + '</h2>' +
        '<p>' + e(copy) + '</p>' +
        '<div class="hero-actions">' +
          (category ? '<a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">Ver Top Escolhas da categoria</a>' : "") +
          '<a class="btn btn-secondary" href="' + href("revista/") + '">Voltar à Revista</a>' +
        '</div>' +
      '</div></section>'
    );
  }

  function renderProductCard(product, options) {
    const opts = normalizeProductCardOptions(options);
    const primaryHref = opts.primaryHref || amazonPtUrl(product.amazon);
    const primaryLabel = opts.primaryLabel || "Ver na Amazon.es";
    const primaryAttrs = /^https?:/i.test(primaryHref)
      ? ' target="_blank" rel="sponsored nofollow noopener noreferrer"'
      : "";
    const secondaryHref = opts.hideSecondary ? "" : (opts.secondaryHref || productHref(product.slug));
    const secondaryLabel = opts.secondaryLabel || "Ver recomendação";
    const classes = ["product-card"];
    if (opts.dense) classes.push("product-card--dense");
    if (opts.prominent) classes.push("product-card--prominent");
    return (
      '<article class="' + classes.join(" ") + '">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" />' +
        '<div class="product-copy">' +
          '<div class="meta-row"><span class="tag">' + e(opts.label || product.bestFor) + "</span></div>" +
          '<h3 class="product-card-title">' + e(product.name) + "</h3>" +
          '<p class="product-highlight-line">' + e(productHighlightLine(product, opts.highlight)) + "</p>" +
          ((opts.support || (!opts.dense && product.useCase)) ? '<p class="product-support-line">' + e(opts.support || product.useCase) + "</p>" : "") +
          '<div class="card-actions">' +
            (secondaryHref ? '<a class="btn btn-secondary btn-small" href="' + secondaryHref + '">' + e(secondaryLabel) + '</a>' : "") +
            '<a class="btn btn-primary btn-small" href="' + e(primaryHref) + '"' + primaryAttrs + '>' + e(primaryLabel) + '</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function articleCoverData(article) {
    const recommended = articleRecommendedEntries(article);
    const fallbackSlug = Array.isArray(article.relatedProducts) && article.relatedProducts.length ? article.relatedProducts[0] : "";
    const product = recommended[0] ? recommended[0].product : productMap.get(fallbackSlug);

    if (article.ogImage) {
      return {
        src: href(article.ogImage),
        alt: article.title,
        kind: "photo"
      };
    }

    if (product) {
      return {
        src: href(product.image),
        alt: product.alt || product.name,
        kind: "product"
      };
    }

    return {
      src: href("imagens/logo-ondecortar-round.png"),
      alt: "OndeCortar.pt",
      kind: "brand"
    };
  }

  function renderArticleCard(article, options) {
    const opts = options || {};
    const hub = hubMap.get(article.hub);
    const category = categoryMap.get(article.relatedCategory || "");
    const cover = articleCoverData(article);
    const classes = ["article-card"];
    if (opts.compact) {
      classes.push("article-card-compact");
    }
    return (
      '<article class="' + classes.join(" ") + '">' +
        '<a class="article-thumb article-thumb--' + cover.kind + '" href="' + articleHref(article.slug) + '">' +
          '<img src="' + cover.src + '" alt="' + e(cover.alt) + '" loading="lazy" />' +
        '</a>' +
        '<div class="article-copy">' +
          '<div class="meta-row"><span class="tag">' + e(hub ? hub.title : "Revista") + "</span>" + (category ? '<span class="tag">' + e(category.title) + '</span>' : "") + "</div>" +
          "<h3>" + e(article.title) + "</h3>" +
          "<p>" + e(article.excerpt) + "</p>" +
          '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + articleHref(article.slug) + '">Ler artigo</a>' + (category ? '<a class="btn btn-soft btn-small" href="' + editorialCategoryHref(category.slug) + '">Ver categoria</a>' : "") + '</div>' +
        "</div>" +
      "</article>"
    );
  }

  function renderFaq(items) {
    if (!items || !items.length) return "";
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
        '<div class="section-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>' + e(title) + '</h2><p>Artigos ligados ao mesmo tema para continuares a decidir com contexto e pontes claras para a loja.</p></div></div>' +
        '<div class="article-grid">' + list.map(renderArticleCard).join("") + "</div>" +
      "</div></section>"
    );
  }

  function renderStoreSpotlightCard(item) {
    const product = productMap.get(item.product);
    if (!product) return "";
    return (
      '<article class="editorial-card store-hero-spotlight-card">' +
        '<div class="featured-thumb"><img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" /></div>' +
        '<div class="store-hero-spotlight-copy">' +
          '<div class="meta-row"><span class="tag">' + e(item.label) + '</span><span class="tag">' + e(product.bestFor) + '</span></div>' +
          '<h2>' + e(product.name) + '</h2>' +
          '<p>' + e(item.note) + '</p>' +
          '<p class="store-hero-note">Escolha rápida para quem quer ir direto a uma opção segura.</p>' +
          '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Comprar na Amazon.es</a><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderStoreChoiceCard(item) {
    const product = productMap.get(item.product);
    if (!product) return "";
    return (
      '<article class="shop-mini-card store-choice-card">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" />' +
        '<div><span class="tag">' + e(item.label) + '</span><strong>' + e(product.name) + '</strong><p>' + e(item.note) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Comprar</a><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Detalhes</a></div></div>' +
      '</article>'
    );
  }

  function renderStoreHome() {
    const canonical = "https://ondecortar.pt/loja/";
    setMeta("Loja OndeCortar | Produtos de barbearia escolhidos com critério", "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.", canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Loja OndeCortar",
        "description": "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.",
        "url": canonical
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Produtos em destaque da Loja OndeCortar",
        "itemListElement": featuredPicks.map(function(item, index) {
          const product = productMap.get(item.product);
          return {
            "@type": "ListItem",
            "position": index + 1,
            "url": "https://ondecortar.pt/produto/" + item.product + "/",
            "name": product ? product.name : item.product
          };
        })
      }
    ]);
    const heroQuickLinks = [
      { label: "Maquinas de cortar", slug: "maquinas-de-cortar" },
      { label: "Kits de barba", slug: "kits-de-barba" },
      { label: "Navalhas", slug: "navalhas-e-laminas" },
      { label: "Shavers", slug: "trimmers-e-shavers" },
      { label: "Oleos e cuidados", slug: "oleos-e-balms" },
      { label: "Acessorios", slug: "acessorios-de-barbeiro" }
    ].map(function(item) {
      return (
        '<a class="store-quick-pill" href="' + categoryHref(item.slug) + '">' +
          '<span>' + e(item.label) + '</span>' +
        '</a>'
      );
    }).join("");
    const featured = featuredPicks.map(function(item) {
      const product = productMap.get(item.product);
      return renderProductCard(product, {
        dense: true,
        label: item.label,
        highlight: item.note
      });
    }).join("");
    const needCards = needs.map(function(item) {
      return '<article class="category-card"><div class="meta-row"><span class="tag">Necessidade</span></div><h3>' + e(item.title) + "</h3><p>" + e(item.copy) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + needHref(item.slug) + '">Explorar</a></div></article>';
    }).join("");
    const categoryCards = categories.map(function(item) { return renderCategoryCard(item, true); }).join("");
    const comparisonRows = quickComparison.map(function(item) {
      const product = productMap.get(item[1]);
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>';
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section store-intro-section"><div class="container">' +
          '<div class="store-hero-shell">' +
            '<div class="hero-card store-hero-main-card store-hero-compact-card">' +
              '<span class="section-flag">LOJA ONDECORTAR</span>' +
              '<h1>Menos ruído, mais produtos certos logo no arranque</h1>' +
              '<p>Entramos já nas escolhas mais fortes e deixamos as categorias e artigos como apoio à decisão.</p>' +
              '<div class="hero-actions">' +
                '<a class="btn btn-primary" href="#top-escolhas">Ver Top Escolhas</a>' +
                '<a class="btn btn-secondary" href="#categorias">Ver categorias</a>' +
              '</div>' +
              '<p class="store-hero-note">Links afiliados identificados em todas as páginas comerciais</p>' +
            '</div>' +
            '<nav class="store-quick-bar" aria-label="Categorias rapidas">' + heroQuickLinks + '</nav>' +
          '</div>' +
        '</div></section>' +
        '<section class="section" id="top-escolhas"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Top Escolhas</span><h2>Produtos para abrir primeiro</h2><p>Uma seleção curta e comercial para entrares logo em recomendações com mais tração e menos fricção.</p></div></div><div class="product-grid product-grid--dense product-grid--top-choices">' + featured + '</div></div></section>' +
        '<section class="section" id="categorias"><div class="container"><div class="section-header"><div><span class="eyebrow">Categorias</span><h2>Comprar por categoria</h2><p>Se já sabes o tipo de produto que queres, entra diretamente na categoria certa.</p></div></div><div class="category-grid">' + categoryCards + '</div></div></section>' +
        '<section class="section" id="comparar"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Comparações rápidas</span><h2>Compara e decide em minutos</h2><p>Quatro atalhos diretos para chegares ao produto certo sem navegar à toa.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Por necessidade</span><h2>Escolhe pela tua situação</h2><p>Se ainda não sabes o produto, começa pelo teu cenário de uso e afunila daí.</p></div></div><div class="need-grid">' + needCards + '</div></div></section>' +
        renderWhyBuy() +
        '<section class="section"><div class="container">' + renderDisclosure() + "</div></section>" +
      "</main>" +
      renderFooter()
    );
  }

  function renderCategoryPage(value) {
    const category = categoryMap.get(value);
    if (!category) return renderNotFound("Categoria não encontrada");
    const canonical = "https://ondecortar.pt/loja/" + value + "/";
    const introShort = categoryShortIntro(category);
    const relatedArticles = getArticles(category.articles || []);
    const topProducts = categoryTopChoices(category, 5);
    const pickLabelMap = new Map((category.picks || []).map(function(item) {
      return [item[1], item[0]];
    }));
    setMeta(categoryMetaTitle(category), categoryMetaDescription(category), canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.title,
        "description": categoryMetaDescription(category),
        "url": canonical
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Loja", "item": "https://ondecortar.pt/loja/" },
          { "@type": "ListItem", "position": 2, "name": category.title, "item": canonical }
        ]
      }
    ].concat(category.faqs && category.faqs.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": category.faqs.map(function(item) {
        return {
          "@type": "Question",
          "name": item[0],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item[1]
          }
        };
      })
    }] : []));
    const comparisonRows = (category.picks || []).map(function(item) {
      const product = productMap.get(item[1]);
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a></div>';
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card category-hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja/") + '">Loja</a><span>/</span><span>' + e(category.title) + '</span></div><span class="section-flag">Categoria da loja</span><h1>' + e(category.title) + '</h1><p>' + e(introShort) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#top-escolhas">Ver Top Escolhas</a>' + (relatedArticles[0] ? '<a class="btn btn-secondary" href="' + articleHref(relatedArticles[0].slug) + '">Ler guia relacionado</a>' : '<a class="btn btn-secondary" href="' + href("loja/") + '">Voltar à loja</a>') + '</div></div>' +
          '<div class="hero-side"><div class="shop-mini-grid">' + topProducts.slice(0, 2).map(renderMiniProduct).join("") + '</div><div class="store-note"><strong>Ponte editorial</strong><p>' + e((relatedArticles.length ? "Esta categoria liga a " + relatedArticles.length + " guia" + (relatedArticles.length === 1 ? "" : "s") + " da revista" : "Esta categoria foi organizada para te mostrar primeiro as escolhas mais fortes")) + ' para afinares a decisão sem sair do ecossistema OndeCortar.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section" id="top-escolhas"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Top Escolhas</span><h2>Produtos que vale a pena abrir primeiro</h2><p>Os produtos aparecem logo abaixo do título para encurtares o caminho até à decisão.</p></div></div><div class="product-grid product-grid--dense product-grid--category-top">' + topProducts.map(function(item, index) { return renderProductCard(item, { dense: true, label: pickLabelMap.get(item.slug) || (index === 0 ? "Top escolha" : item.bestFor) }); }).join("") + '</div></div></section>' +
        renderCategoryGuide(category) +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Melhor para</span><h2>Comparação rápida</h2><p>Quatro atalhos editoriais para chegar a uma opção com mais contexto.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        (relatedArticles.length ? '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Revista</span><h2>Artigos relacionados</h2><p>Usa estes artigos para aprofundar o contexto antes de clicar num produto específico.</p></div></div><div class="article-grid">' + relatedArticles.slice(0, 3).map(renderArticleCard).join("") + '</div></div></section>' : '') +
        '<section class="section" id="faq-categoria"><div class="container">' + renderFaq(category.faqs) + '</div></section>' +
        renderWhyBuy() +
        '<section class="section"><div class="container">' + renderDisclosure() + '</div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderProductPage(value) {
    const product = productMap.get(value);
    if (!product) return renderNotFound("Produto não encontrado");
    const canonical = "https://ondecortar.pt/produto/" + encodeURIComponent(value) + "/";
    setMeta(product.name + " | Recomendação OndeCortar", product.summary, canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.summary,
        "image": absoluteUrl(product.image),
        "url": canonical,
        "category": (product.categories || []).map(function(item) {
          const category = categoryMap.get(item);
          return category ? category.title : item;
        }).join(", ")
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Loja", "item": "https://ondecortar.pt/loja/" },
          { "@type": "ListItem", "position": 2, "name": product.categories && product.categories[0] && categoryMap.get(product.categories[0]) ? categoryMap.get(product.categories[0]).title : "Produtos", "item": product.categories && product.categories[0] ? ("https://ondecortar.pt/loja/" + product.categories[0] + "/") : "https://ondecortar.pt/loja/" },
          { "@type": "ListItem", "position": 3, "name": product.name, "item": canonical }
        ]
      }
    ]);
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
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja/") + '">Loja</a><span>/</span><span>' + e(product.name) + '</span></div><span class="section-flag">Produto recomendado</span><span class="eyebrow">' + e(product.bestFor) + '</span><h1>' + e(product.name) + '</h1><p>' + e(product.summary) + " " + e(product.useCase) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a><a class="btn btn-secondary" href="' + categoryHref(product.categories[0]) + '">Ver categoria</a></div><div class="product-hero-panel"><strong>Antes de comprar</strong><ul class="rich-list"><li>Melhor para: ' + e(product.bestFor) + '</li><li>Ponto forte: ' + e(leadStrength || product.summary) + '</li><li>Vantagem adicional: ' + e(secondStrength || product.useCase) + '</li></ul><div class="card-actions">' + (leadGuide ? '<a class="btn btn-soft btn-small" href="' + articleHref(leadGuide.slug) + '">Ler guia relacionado</a>' : "") + '<a class="btn btn-secondary btn-small" href="#relacionados">Comparar semelhantes</a></div></div></div>' +
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
            '<div class="buy-box"><span class="price-hint">Loja afiliada</span><h3>Comprar agora na Amazon.es</h3><p>Confirma disponibilidade e avança para a compra com entrega rápida e pagamento seguro na plataforma.</p><div class="card-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a><a class="btn btn-secondary" href="' + categoryHref(product.categories[0]) + '">Voltar à categoria</a></div></div>' +
            renderDisclosure() +
          '</div>' +
        '</div></section>' +
        '<section class="section" id="relacionados"><div class="container"><div class="section-header"><div><span class="eyebrow">Relacionados</span><h2>Produtos relacionados</h2></div></div><div class="related-grid">' + related.map(function(item) { return renderProductCard(item, { dense: true }); }).join("") + '</div></div></section>' +
        renderRelatedArticles("Artigos ligados a esta recomendação", product.articles) +
      '</main>' +
      renderFooter()
    );
  }

  function renderMagazineHome() {
    const mainHubs = hubs.filter(function(item) { return !item.legacy; });
    const featured = coreArticles();
    const leadArticle = featured[0];
    const highlightArticles = featured.slice(1, 4);
    const remainingArticles = featured.slice(4).length ? featured.slice(4) : featured.slice(1);
    const leadCover = leadArticle ? articleCoverData(leadArticle) : null;
    const highlightedProducts = collectMagazineProducts(featured.slice(0, 6), [], 4);
    const canonical = "https://ondecortar.pt/revista/";
    setMeta("Revista OndeCortar | Guias de compra, comparações e artigos para escolher melhor", "Revista OndeCortar com guias de compra, comparações e artigos práticos ligados às categorias da loja.", canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Revista OndeCortar",
        "description": "Revista OndeCortar com guias de compra, comparações e artigos práticos ligados às categorias da loja.",
        "url": canonical
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Artigos em destaque da Revista OndeCortar",
        "itemListElement": featured.map(function(article, index) {
          return {
            "@type": "ListItem",
            "position": index + 1,
            "url": "https://ondecortar.pt/revista/" + article.slug + "/",
            "name": article.title
          };
        })
      }
    ]);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container">' +
          '<div class="section-header magazine-home-header"><div><span class="eyebrow">Revista OndeCortar</span><h1>Guias, comparações e uso prático para comprar com mais critério</h1><p>Conteúdo editorial pensado para reduzir dúvida, ligar à categoria certa e empurrar a decisão para produtos mais relevantes.</p></div><div class="hero-actions"><a class="btn btn-primary" href="#artigos">Ver guias</a><a class="btn btn-secondary" href="#seccoes">Ver secções</a></div></div>' +
          '<div class="magazine-home-grid">' +
            (leadArticle ? '<article class="editorial-card magazine-lead-card"><div class="magazine-lead-visual">' +
              '<a class="article-thumb article-thumb--' + leadCover.kind + '" href="' + articleHref(leadArticle.slug) + '">' +
                '<img src="' + leadCover.src + '" alt="' + e(leadCover.alt) + '" loading="lazy" />' +
              '</a>' +
            '</div><div class="magazine-lead-copy"><span class="section-flag">Artigo em destaque</span><h2>' + e(leadArticle.title) + '</h2><p>' + e(leadArticle.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + articleHref(leadArticle.slug) + '">Ler artigo</a><a class="btn btn-secondary" href="#artigos">Mais artigos</a></div></div></article>' : "") +
            '<div class="magazine-highlight-list">' + highlightArticles.map(function(item) { return renderArticleCard(item, { compact: true }); }).join("") + '</div>' +
          '</div>' +
        '</div></section>' +
        renderMagazineProductShelf("Produtos recomendados que já valem o clique", "Antes de mergulhares nos artigos, aqui tens uma seleção curta dos produtos mais fortes ligados aos guias e comparações em destaque.", highlightedProducts, href("loja/"), "Ver loja") +
        '<section class="section" id="seccoes"><div class="container"><div class="section-header"><div><span class="eyebrow">Secções da revista</span><h2>Explorar por tema</h2><p>Se preferires navegar por assunto, aqui tens os principais temas editoriais.</p></div></div><div class="hub-grid">' + mainHubs.map(function(item) { return '<article class="hub-card"><h3>' + e(item.title) + '</h3><p>' + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + hubHref(item.slug) + '">Ver secção</a></div></article>'; }).join("") + '</div></div></section>' +
        '<section class="section" id="artigos"><div class="container"><div class="section-header"><div><span class="eyebrow">Em destaque</span><h2>Guias e comparações com ponte direta para a loja</h2><p>Entra pelo artigo que te interessa e continua para a categoria ou produto certo sem quebrar o contexto.</p></div></div><div class="article-grid">' + remainingArticles.map(function(item) { return renderArticleCard(item); }).join("") + '</div></div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderHubPage(value) {
    const hub = hubMap.get(value);
    if (!hub) return renderNotFound("Secção não encontrada");
    const canonical = "https://ondecortar.pt/revista/" + value + "/";
    setMeta(hub.title + " | Revista OndeCortar", hub.intro, canonical);
    const hubArticles = getArticles(hub.articles);
    const hubCategories = (hub.categories || []).map(function(item) { return categoryMap.get(item); }).filter(Boolean);
    const hubProducts = collectMagazineProducts(hubArticles, hubCategories, 4);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": hub.title,
        "description": hub.intro,
        "url": canonical
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Revista", "item": "https://ondecortar.pt/revista/" },
          { "@type": "ListItem", "position": 2, "name": hub.title, "item": canonical }
        ]
      }
    ]);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><span>' + e(hub.title) + '</span></div><span class="section-flag">Cluster editorial</span><h1>' + e(hub.title) + '</h1><p>' + e(hub.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos-cluster">Ver artigos</a>' + (hubCategories[0] ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(hubCategories[0].slug) + '">Ver Top Escolhas da categoria</a>' : "") + '</div></div><div class="hero-side"><div class="panel-note"><strong>Função do cluster</strong><p>Capta uma intenção específica e encaminha o leitor para categorias e produtos com mais contexto.</p></div></div></div></div></section>' +
        renderMagazineProductShelf("Produtos em destaque neste tema", "Os produtos aparecem primeiro para ganhares contexto comercial antes de entrares nos artigos ou nas categorias.", hubProducts, hubCategories[0] ? editorialCategoryHref(hubCategories[0].slug) : href("loja/"), hubCategories[0] ? "Ver Top Escolhas" : "Ver loja") +
        '<section class="section" id="artigos-cluster"><div class="container"><div class="section-header"><div><span class="eyebrow">Artigos</span><h2>Artigos deste cluster</h2><p>Conteúdo com direção clara para ajudar a escolher e clicar melhor.</p></div></div><div class="article-grid">' + hubArticles.map(renderArticleCard).join("") + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Categorias ligadas</span><h2>Onde este cluster toca na loja</h2></div></div><div class="category-grid">' + hubCategories.map(function(item) { return renderCategoryCard(item, false); }).join("") + '</div></div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderArticlePage(value) {
    const article = articleMap.get(value);
    if (!article) return renderNotFound("Artigo não encontrado");
    const hub = hubMap.get(article.hub);
    const canonical = "https://ondecortar.pt/revista/" + value + "/";
    const metaTitle = article.metaTitle || (article.title + " | Revista OndeCortar");
    const metaDescription = article.metaDescription || article.excerpt;
    const publishedDate = articlePublishedDate(article);
    const updatedDate = articleUpdatedDate(article);
    setMeta(metaTitle, metaDescription, canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": ["Article", "BlogPosting"],
        "headline": article.title,
        "description": metaDescription,
        "mainEntityOfPage": canonical,
        "datePublished": publishedDate,
        "dateModified": updatedDate,
        "publisher": {
          "@type": "Organization",
          "name": "OndeCortar.pt",
          "url": "https://ondecortar.pt/"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Revista", "item": "https://ondecortar.pt/revista/" },
          { "@type": "ListItem", "position": 2, "name": hub ? hub.title : "Revista", "item": hub ? ("https://ondecortar.pt/revista/" + article.hub + "/") : "https://ondecortar.pt/revista/" },
          { "@type": "ListItem", "position": 3, "name": article.title, "item": canonical }
        ]
      }
    ].concat(article.faqs && article.faqs.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(function(item) {
        return {
          "@type": "Question",
          "name": item[0],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item[1]
          }
        };
      })
    }] : []));
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card article-header"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span>' + (hub ? '<a href="' + hubHref(article.hub) + '">' + e(hub.title) + '</a>' : '<span>Revista</span>') + '</div><span class="section-flag">Artigo da Revista</span><h1>' + e(article.title) + '</h1><div class="article-dates"><span>Publicado em ' + e(formatDatePt(publishedDate)) + '</span><span>Atualizado em ' + e(formatDatePt(updatedDate)) + '</span></div><p>' + e(article.intro) + '</p><p class="article-subcopy">' + e(article.subIntro || article.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#atalhos-compra">Ver atalhos de compra</a>' + (article.relatedCategory ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(article.relatedCategory) + '">Ver categoria ligada</a>' : "") + '</div></div></section>' +
        renderArticleQuickAnswers(article) +
        renderArticleCategoryBridge(article) +
        renderArticleDecisionStrip(article) +
        '<section class="section"><div class="container article-layout"><div class="article-body">' +
          (article.sections || []).map(function(item) { return '<article class="article-section"><h2>' + e(item[0]) + '</h2>' + item[1].map(function(text) { return "<p>" + e(text) + "</p>"; }).join("") + "</article>"; }).join("") +
        '</div><aside class="stack">' + renderArticleSidebar(article) + '</aside></div></section>' +
        renderArticleRecommendedProducts(article) +
        renderArticleFinalCta(article) +
        (article.faqs && article.faqs.length ? '<section class="section" id="faq-artigo"><div class="container">' + renderFaq(article.faqs) + '</div></section>' : "") +
        renderRelatedArticles("Artigos relacionados", article.relatedArticles) +
      '</main>' +
      renderFooter()
    );
  }

  function renderNotFound(label) {
    setMeta("Página não encontrada | OndeCortar", "A página pedida não está disponível.", window.location.href);
    setStructuredData([]);
    setRobots("noindex,follow");
    return renderHeader() + '<main><section class="section"><div class="container callout-card"><h1>' + e(label) + '</h1><p>Volta à loja ou à revista para continuares a navegar.</p><div class="hero-actions"><a class="btn btn-primary" href="' + href("loja/") + '">Ir para a loja</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ir para a revista</a></div></div></section></main>' + renderFooter();
  }

  if (params.toString()) {
    setRobots("noindex,follow");
  }

  if (page === "store") app.innerHTML = renderStoreHome();
  else if (page === "category") app.innerHTML = renderCategoryPage(slug);
  else if (page === "product") app.innerHTML = renderProductPage(slug);
  else if (page === "magazine") app.innerHTML = renderMagazineHome();
  else if (page === "hub") app.innerHTML = renderHubPage(slug);
  else if (page === "article") app.innerHTML = renderArticlePage(slug);
  else app.innerHTML = renderNotFound("Página não encontrada");

  setupNavigation();
})();
