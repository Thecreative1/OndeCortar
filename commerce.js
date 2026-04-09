(function() {
  const html = document.documentElement;
  if (html) {
    html.setAttribute("lang", "pt-PT");
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
    const ogType = document.querySelector('meta[property="og:type"]');
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogUrl) ogUrl.setAttribute("content", canonical);
    if (ogType && page === "product") ogType.setAttribute("content", "product");
    if (canonicalTag) canonicalTag.setAttribute("href", canonical);
    if (twTitle) twTitle.setAttribute("content", title);
    if (twDesc) twDesc.setAttribute("content", description);
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
    return "Recomendações de " + String(category.title || "").toLowerCase() + " para comparar menos opções, perceber diferenças reais e escolher com mais critério.";
  }

  function categoryLongIntro(category) {
    const topCount = (category.top || []).length;
    const articleCount = (category.articles || []).length;
    return [
      category.intro,
      "A ideia é filtrar depressa, perceber onde cada opção faz sentido e evitar compras feitas só pela lista de extras.",
      topCount ? "Começa pelas recomendações mais fortes e usa-as como base para comparar o resto da categoria." : "",
      articleCount ? "Se ainda houver dúvida, a revista ajuda a fechar a decisão com mais contexto." : "Quando fizer sentido, a revista entra para aprofundar o que a categoria não precisa de repetir."
    ].join(" ");
  }

  function categoryShortIntro(category) {
    const articleCount = (category.articles || []).length;
    return category.intro + " " + (articleCount
      ? "Começa pelas escolhas mais fortes e usa os guias da revista para resolver a dúvida que ainda faltar."
      : "Começa pelas escolhas mais fortes e filtra pelo teu caso de uso.");
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
    return {
      title: category.guideTitle || "Como escolher nesta categoria",
      copy: category.guideCopy || "Começa pelo contexto de uso antes de te preocupares com extras ou listas longas de acessórios.",
      points: (category.guidePoints && category.guidePoints.length)
        ? category.guidePoints
        : [
            "Se queres uma resposta rápida, abre duas ou três opções fortes e só depois vais ao detalhe.",
            "Se o uso vai ser frequente, dá mais peso a conforto, consistência e facilidade de manutenção do que à lista de extras.",
            (category.articles || []).length
              ? "Se ainda houver algo por perceber, os artigos ligados a esta categoria aprofundam o tema."
              : "Usa esta categoria para encontrar a opção que melhor se encaixa no teu caso."
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
    return article.datePublished || null;
  }

  function articleUpdatedDate(article) {
    return article.dateModified || article.datePublished || null;
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

  function categoryTitleLower(category) {
    return category && category.title ? String(category.title).toLowerCase() : "";
  }

  function categoryActionLabel(category, variant) {
    const title = categoryTitleLower(category);
    if (!title) {
      return variant === "all" ? "Ver todas as opções" : "Ver categoria";
    }
    if (variant === "compare") {
      return "Comparar " + title;
    }
    if (variant === "return") {
      return "Voltar a " + title;
    }
    if (variant === "all") {
      return "Ver todas as opções";
    }
    return "Ver " + title;
  }

  function articleActionLabel(article) {
    const hub = hubMap.get(article && article.hub || "");
    const actionMap = {
      "guias-de-compra": "Ler guia",
      "comparacoes": "Ver comparação",
      "erros-comuns": "Ver erros",
      "conteudo-pratico": "Ver passo a passo",
      "cuidados-com-a-barba": "Ver rotina",
      "maquinas-e-manutencao": "Ver manutenção",
      "para-barbeiros": "Ver checklist",
      "estilo-e-tendencias": "Ver inspiração",
      "presentes-e-kits": "Ver sugestões"
    };
    return actionMap[hub && hub.slug] || "Ler artigo";
  }

  function countWords(value) {
    return String(value || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }

  function articleReadingMinutes(article) {
    const sections = (article.sections || []).reduce(function(total, item) {
      const titleWords = countWords(item[0]);
      const paragraphWords = Array.isArray(item[1])
        ? item[1].reduce(function(sum, text) { return sum + countWords(text); }, 0)
        : 0;
      return total + titleWords + paragraphWords;
    }, 0);
    const checklistWords = (article.checklist || []).reduce(function(total, item) {
      return total + countWords(item);
    }, 0);
    const faqWords = (article.faqs || []).reduce(function(total, item) {
      return total + countWords(item[0]) + countWords(item[1]);
    }, 0);
    const totalWords = countWords(article.title) +
      countWords(article.intro) +
      countWords(article.subIntro) +
      countWords(article.excerpt) +
      sections +
      checklistWords +
      faqWords;
    return Math.max(3, Math.round(totalWords / 200));
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
    const ctaLabel = section === "revista" ? "Ver últimos guias" : "Ver melhores opções";
    return (
      '<header class="site-header"><div class="container"><nav class="nav" aria-label="Navegação principal">' +
        '<div class="nav-main-row">' +
          '<a class="brand" href="' + href("index.html") + '">' +
            '<img class="brand-logo" src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" />' +
            '<span class="brand-text"><strong>OndeCortar.pt</strong><span>' + e(sectionLabel()) + '</span></span>' +
          "</a>" +
          '<div class="nav-mobile-actions">' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="siteNavLinks" data-nav-toggle>' +
              '<span class="nav-toggle-label">Menu</span>' +
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
      '</nav><button class="nav-backdrop" type="button" aria-label="Fechar menu" aria-hidden="true" data-nav-backdrop hidden></button></div></header>'
    );
  }

  function renderFooter() {
    return (
      '<footer><div class="container footer-shell">' +
        '<div class="footer-intro">' +
          '<div class="footer-brand"><img src="' + href("imagens/logo-ondecortar-round.png") + '" alt="Logo OndeCortar.pt" /><strong>OndeCortar.pt</strong></div>' +
      "<p>Recomendações de produtos de barbearia e artigos práticos para escolher com mais segurança.</p>" +
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
    const backdrop = document.querySelector("[data-nav-backdrop]");
    const toggleLabel = toggle ? toggle.querySelector(".nav-toggle-label") : null;

    if (!nav || !toggle || !navLinks) {
      return;
    }

    function setOpen(nextOpen) {
      const mobile = window.innerWidth <= 760;
      nav.classList.toggle("is-open", nextOpen);
      document.body.classList.toggle("nav-open", nextOpen);
      toggle.setAttribute("aria-expanded", String(nextOpen));
      navLinks.setAttribute("aria-hidden", String(mobile ? !nextOpen : false));
      if ("inert" in navLinks) {
        navLinks.inert = mobile ? !nextOpen : false;
      }
      if (toggleLabel) {
        toggleLabel.textContent = nextOpen ? "Fechar" : "Menu";
      }
      if (backdrop) {
        backdrop.hidden = !nextOpen;
        backdrop.setAttribute("aria-hidden", String(!nextOpen));
      }
    }

    toggle.addEventListener("click", function() {
      setOpen(!nav.classList.contains("is-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", function() {
        setOpen(false);
      });
    }

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

    setOpen(false);
  }

  function getProducts(slugs) {
    return (slugs || []).map(function(item) { return productMap.get(item); }).filter(Boolean);
  }

  function getArticles(slugs) {
    return (slugs || []).map(function(item) { return articleMap.get(item); }).filter(Boolean);
  }

  function renderDisclosure(options) {
    const opts = options || {};
    if (opts.variant === "store") {
      return (
        '<div class="disclosure disclosure--store">' +
          '<div class="disclosure-copy">' +
            '<span class="eyebrow disclosure-eyebrow">Transparência</span>' +
            '<strong class="disclosure-title">Links afiliados identificados. A recomendação não é afetada.</strong>' +
            '<p>' + e(affiliateNotice) + "</p>" +
          "</div>" +
        "</div>"
      );
    }
    return '<div class="disclosure"><strong>Transparência:</strong> ' + e(affiliateNotice) + "</div>";
  }

  function renderEditorialTrustSection(options) {
    const opts = options || {};
    const items = (opts.items || []).slice(0, 4);
    if (!items.length) return "";
    return (
      '<section class="section section--editorial-trust"><div class="container">' +
        '<div class="section-header section-header--compact"><div><span class="eyebrow">' + e(opts.eyebrow || "Critério editorial") + '</span><h2>' + e(opts.title || "Critério editorial visível em cada artigo") + '</h2><p>' + e(opts.copy || "Datas, critérios de avaliação e transparência sobre links afiliados — para que percebas como cada recomendação chega ao artigo.") + '</p></div></div>' +
        '<div class="trust-grid">' + items.map(function(item) {
          return '<article class="trust-card"><span class="eyebrow">' + e(item.eyebrow) + '</span><h3>' + e(item.title) + '</h3><p>' + e(item.copy) + '</p></article>';
        }).join("") + '</div>' +
      '</div></section>'
    );
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
          '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + categoryHref(category.slug) + '">' + e(categoryActionLabel(category)) + '</a></div>' +
        "</div>" +
      "</article>"
    );
  }

  function renderHubCard(hub) {
    const articleCount = (hub.articles || []).length;
    const categoryCount = (hub.categories || []).length;
    return (
      '<article class="hub-card hub-card--theme">' +
        '<div class="meta-row"><span class="tag">' + articleCount + ' guias</span><span class="tag">' + categoryCount + ' categorias</span></div>' +
        '<h3>' + e(hub.title) + '</h3>' +
        '<p>' + e(hub.intro) + '</p>' +
        '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + hubHref(hub.slug) + '">Abrir tema</a></div>' +
      '</article>'
    );
  }

  function renderMiniProduct(product) {
    return (
      '<a class="shop-mini-card" href="' + productHref(product.slug) + '">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt || product.name) + '" loading="lazy" />' +
        '<div><strong>' + e(product.name) + '</strong><p>' + e(product.summary) + '</p><span class="tag">Ver produto</span></div>' +
      "</a>"
    );
  }

  function renderWhyBuy(category) {
    const title = category && category.ctaTitle ? category.ctaTitle : "Menos opções, mais certas";
    const copy = category && category.ctaCopy
      ? category.ctaCopy
      : "Cada categoria tem poucas opções selecionadas com critério — para que não precises de comparar tudo.";
    return (
      '<section class="section"><div class="container callout-card">' +
        '<span class="eyebrow">Explorar categoria</span>' +
        "<h2>" + e(title) + "</h2>" +
        "<p>" + e(copy) + "</p>" +
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

  function productPrimaryCategory(product) {
    if (!product || !Array.isArray(product.categories)) return null;
    for (let index = 0; index < product.categories.length; index += 1) {
      const category = categoryMap.get(product.categories[index]);
      if (category) return category;
    }
    return null;
  }

  function articlePrimaryCategory(article) {
    const explicit = categoryMap.get(article.relatedCategory || "");
    if (explicit) return explicit;

    const recommended = articleRecommendedEntries(article);
    for (let index = 0; index < recommended.length; index += 1) {
      const category = productPrimaryCategory(recommended[index].product);
      if (category) return category;
    }

    const related = getProducts(article.relatedProducts || []);
    for (let index = 0; index < related.length; index += 1) {
      const category = productPrimaryCategory(related[index]);
      if (category) return category;
    }

    const hub = hubMap.get(article.hub || "");
    if (hub && Array.isArray(hub.categories)) {
      for (let index = 0; index < hub.categories.length; index += 1) {
        const category = categoryMap.get(hub.categories[index]);
        if (category) return category;
      }
    }

    return null;
  }

  function articleQuickAnswerItems(article) {
    const explicit = article.quickAnswers || [];
    if (explicit.length) return explicit.slice(0, 4);

    const faqs = article.faqs || [];
    if (faqs.length) {
      return faqs.slice(0, 4).map(function(item) {
        return [item[0], item[1]];
      });
    }

    return (article.sections || [])
      .map(function(item) {
        const paragraph = Array.isArray(item[1]) && item[1][0] ? item[1][0] : "";
        return [item[0], paragraph];
      })
      .filter(function(item) { return item[0] && item[1]; })
      .slice(0, 4);
  }

  function collectMagazineCategories(articleList, categoryList, limit) {
    const seen = new Set();
    const result = [];

    function pushCategory(category) {
      if (!category || !category.slug || seen.has(category.slug)) return;
      seen.add(category.slug);
      result.push(category);
    }

    (categoryList || []).forEach(function(category) {
      pushCategory(category);
    });

    (articleList || []).forEach(function(article) {
      pushCategory(articlePrimaryCategory(article));
    });

    return result.slice(0, limit || 4);
  }

  function collectHubSupplementaryArticles(hub, limit) {
    if (!hub) return [];
    const seen = new Set(hub.articles || []);
    const result = [];

    articles.forEach(function(article) {
      if (!article || !article.slug || seen.has(article.slug)) return;
      const category = articlePrimaryCategory(article);
      if (!category || !Array.isArray(hub.categories) || hub.categories.indexOf(category.slug) === -1) return;
      seen.add(article.slug);
      result.push(article);
    });

    return result.slice(0, limit || 4);
  }

  function renderMagazineStoreBridge(title, copy, list, ctaHref, ctaLabel) {
    if (!list || !list.length) return "";
    return (
      '<section class="section"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Passar para a loja</span><h2>' + e(title) + '</h2><p>' + e(copy) + '</p></div>' +
          (ctaHref ? '<div class="hero-actions"><a class="btn btn-secondary" href="' + ctaHref + '">' + e(ctaLabel || "Ver categoria") + '</a></div>' : "") +
        '</div>' +
        '<div class="category-grid">' + list.map(function(category) { return renderCategoryCard(category, false); }).join("") + '</div>' +
      '</div></section>'
    );
  }

  function renderArticleQuickAnswers(article) {
    const items = articleQuickAnswerItems(article);
    if (!items.length) return "";
    const category = articlePrimaryCategory(article);
    return (
      '<section class="section" id="resposta-rapida"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Resposta rápida</span><h2>O essencial, sem o detalhe todo</h2><p>Se queres uma leitura rápida antes de aprofundar, começa por aqui.</p></div></div>' +
        '<div class="quick-answer-grid">' +
          items.map(function(item) {
            return '<article class="quick-answer-card"><strong>' + e(item[0]) + '</strong><p>' + e(item[1]) + '</p></article>';
          }).join("") +
        '</div>' +
        (category ? '<div class="quick-answer-store-nudge"><p>Queres explorar mais? <a href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + ' →</a></p></div>' : "") +
      '</div></section>'
    );
  }

  function renderArticleSidebar(article) {
    const list = article.checklist || [];
    const category = articlePrimaryCategory(article);
    return (
      (list.length ? '<div class="callout-card article-sidebar-card"><span class="eyebrow">Resumo prático</span><h3>O essencial deste guia</h3><ul class="rich-list">' + list.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' : "") +
      (category ? '<div class="callout-card article-sidebar-card"><span class="eyebrow">Explorar categoria</span><h3>' + e(category.title) + '</h3><p>' + e(article.categoryCta || category.intro) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + '</a></div></div>' : "")
    );
  }

  function renderArticleSupportCards(article) {
    const category = articlePrimaryCategory(article);
    const checklist = article.checklist || [];
    const publishedDate = articlePublishedDate(article);
    const updatedDate = articleUpdatedDate(article);
    const readingTime = articleReadingMinutes(article);
    const cards = [];

    if (checklist.length) {
      cards.push(
        '<article class="callout-card article-support-card"><span class="eyebrow">Resumo prático</span><h3>O essencial deste guia</h3><ul class="rich-list">' + checklist.map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></article>'
      );
    }

    cards.push(
      '<article class="callout-card article-support-card article-trust-card"><span class="eyebrow">Critério editorial</span><h3>Como revemos este guia</h3><ul class="rich-list">' +
        (publishedDate ? '<li>Publicado em ' + e(formatDatePt(publishedDate)) + '.</li>' : "") +
        (updatedDate ? '<li>Revisto editorialmente em ' + e(formatDatePt(updatedDate)) + '.</li>' : "") +
        '<li>Leitura estimada: ' + e(readingTime) + ' min.</li>' +
        '<li>Critérios: uso real, manutenção, conforto e relação qualidade-preço.</li>' +
        '<li>Links afiliados são assinalados sem alterar a recomendação editorial.</li>' +
      '</ul></article>'
    );

    if (category) {
      cards.push(
        '<article class="callout-card article-support-card"><span class="eyebrow">Explorar categoria</span><h3>' + e(category.title) + '</h3><p>' + e(article.categoryCta || category.intro) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + '</a><a class="btn btn-soft btn-small" href="' + categoryHref(category.slug) + '">' + e(categoryActionLabel(category, "all")) + '</a></div></article>'
      );
    }

    if (!cards.length) return "";

    return '<section class="section"><div class="container article-support-grid">' + cards.join("") + '</div></section>';
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
    const category = articlePrimaryCategory(article);
    const entries = articleRecommendedEntries(article).slice(0, 3);
    if (!entries.length) return "";
    return (
      '<section class="section" id="perfis-de-uso"><div class="container">' +
        '<div class="section-header section-header--compact"><div><span class="eyebrow">Perfis de uso</span><h2>Opções por tipo de uso</h2><p>Se o teu caso se enquadra num destes perfis, encontras a opção mais próxima do teu contexto.</p></div>' +
          (category ? '<div class="hero-actions"><a class="btn btn-secondary btn-small" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + '</a></div>' : "") +
        '</div>' +
        '<div class="article-inline-products">' +
          entries.map(function(entry) {
            return (
              '<article class="shop-mini-card article-inline-card">' +
                '<img src="' + href(entry.product.image) + '" alt="' + e(entry.product.alt || entry.product.name) + '" loading="lazy" />' +
                '<div>' +
                  '<span class="tag">' + e(entry.product.bestFor) + '</span>' +
                  '<strong>' + e(entry.product.name) + '</strong>' +
                  (entry.product.priceRange ? '<span class="product-price-range">' + e(entry.product.priceRange) + '</span>' : '') +
                  '<p>' + e(entry.blurb) + '</p>' +
                  '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(entry.product.slug) + '">Ver produto</a></div>' +
                '</div>' +
              '</article>'
            );
          }).join("") +
        '</div>' +
        (category ? '<div class="article-category-shortcut"><a href="' + categoryHref(category.slug) + '">Explorar ' + e(category.title) + ' →</a></div>' : "") +
      '</div></section>'
    );
  }

  function renderArticleCategoryBridge(article) {
    const category = articlePrimaryCategory(article);
    if (!category) return "";
    return (
      '<section class="section"><div class="container callout-card article-category-bridge">' +
        '<span class="eyebrow">Explorar categoria</span>' +
        '<h2>' + e(category.title) + '</h2>' +
        '<p>' + e(article.categoryCta || category.intro) + '</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + '</a><a class="btn btn-secondary" href="' + categoryHref(category.slug) + '">' + e(categoryActionLabel(category, "all")) + '</a></div>' +
      '</div></section>'
    );
  }

  function renderProductArticleLinks(product) {
    const productArticles = getArticles(product.articles || []);
    if (!productArticles.length) return "";
    return renderGuideLinkPanel(
      "Artigos relacionados",
      "Leituras sobre o mesmo tema para quem quer perceber mais antes de seguir em frente.",
      productArticles.slice(0, 2),
      href("revista/"),
      "Ver revista"
    );
  }

  function renderArticleAuthorBox() {
    return (
      '<section class="section"><div class="container">' +
        '<div class="author-box"><div class="author-box-inner">' +
          '<strong>Equipa OndeCortar.pt</strong>' +
          '<p>Conteúdo baseado em critérios de uso real, manutenção e relação qualidade-preço. Os links para produtos são afiliados — as recomendações editoriais não são afetadas por isso.</p>' +
        '</div></div>' +
      '</div></section>'
    );
  }

  function renderArticleFinalCta(article) {
    const category = articlePrimaryCategory(article);
    const hub = hubMap.get(article.hub || "");
    const defaultTitle = category ? "Explorar " + category.title : "Queres ir mais fundo neste tema?";
    const defaultCopy = category
      ? "Se este tema ficou claro, as opções desta categoria estão organizadas pelo mesmo critério."
      : "Podes continuar por este tema ou explorar categorias relacionadas.";
    const title = article.finalCta && article.finalCta.title ? article.finalCta.title : defaultTitle;
    const copy = article.finalCta && article.finalCta.copy ? article.finalCta.copy : defaultCopy;
    const primaryLabel = category ? categoryActionLabel(category, "compare") : "Ir para a loja";
    const secondaryLabel = hub ? "Explorar " + hub.title.toLowerCase() : "Ler mais guias";
    return (
      '<section class="section"><div class="container callout-card article-final-cta">' +
        '<span class="eyebrow">Continuar</span>' +
        '<h2>' + e(title) + '</h2>' +
        '<p>' + e(copy) + '</p>' +
        '<div class="hero-actions">' +
          (category ? '<a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">' + e(primaryLabel) + '</a>' : "") +
          '<a class="btn btn-secondary" href="' + (hub ? hubHref(hub.slug) : href("revista/")) + '">' + e(secondaryLabel) + '</a>' +
        '</div>' +
      '</div></section>'
    );
  }

  function renderProductCard(product, options) {
    const opts = normalizeProductCardOptions(options);
    const primaryHref = opts.primaryHref || amazonPtUrl(product.amazon);
    const primaryLabel = opts.primaryLabel || "Ver preço";
    const primaryAttrs = /^https?:/i.test(primaryHref)
      ? ' target="_blank" rel="sponsored nofollow noopener noreferrer"'
      : "";
    const secondaryHref = opts.hideSecondary ? "" : (opts.secondaryHref || productHref(product.slug));
    const secondaryLabel = opts.secondaryLabel || "Ver produto";
    const classes = ["product-card"];
    if (opts.dense) classes.push("product-card--dense");
    if (opts.prominent) classes.push("product-card--prominent");
    return (
      '<article class="' + classes.join(" ") + '">' +
        '<img src="' + href(product.image) + '" alt="' + e(product.alt || product.name) + '" loading="lazy" />' +
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
    const category = articlePrimaryCategory(article);
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
          '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + articleHref(article.slug) + '">' + e(articleActionLabel(article)) + '</a>' + (category ? '<a class="btn btn-soft btn-small" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category)) + '</a>' : "") + '</div>' +
        "</div>" +
      "</article>"
    );
  }

  function renderFaq(items, opts) {
    if (!items || !items.length) return "";
    const options = opts || {};
    return (
      '<div class="faq-list-wrap">' +
        '<h3>Perguntas frequentes</h3>' +
        (items || []).map(function(item) {
          return '<div class="faq-item"><strong>' + e(item[0]) + "</strong><p>" + e(item[1]) + "</p></div>";
        }).join("") +
        (options.ctaHref ? '<p class="faq-store-cta">Para uma resposta mais concreta, vê as nossas <a href="' + options.ctaHref + '">' + e(options.ctaLabel || "recomendações desta categoria") + '</a>.</p>' : "") +
      "</div>"
    );
  }

  function renderRelatedArticles(title, slugs) {
    const list = getArticles(slugs);
    if (!list.length) return "";
    return (
        '<section class="section"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>' + e(title) + '</h2><p>Se ainda há um ângulo por explorar, estas leituras cobrem o mesmo tema de forma diferente.</p></div></div>' +
        '<div class="article-grid">' + list.map(renderArticleCard).join("") + "</div>" +
      "</div></section>"
    );
  }

  function renderGuideLinkPanel(title, copy, list, ctaHref, ctaLabel) {
    if (!list || !list.length) return "";
    return (
      '<section class="section"><div class="container"><div class="store-guide-panel"><div class="store-guide-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>' + e(title) + '</h2><p>' + e(copy) + '</p></div>' +
        (ctaHref ? '<a class="btn btn-secondary btn-small" href="' + ctaHref + '">' + e(ctaLabel || "Ver mais guias") + '</a>' : "") +
      '</div><div class="store-guide-row">' + list.map(function(article) {
        return '<a class="store-guide-link" href="' + articleHref(article.slug) + '"><strong>' + e(article.title) + '</strong><span>' + e(articleActionLabel(article)) + '</span></a>';
      }).join("") + '</div></div></div></section>'
    );
  }

  function renderMagazineStoryItem(article) {
    const hub = hubMap.get(article.hub);
    const category = articlePrimaryCategory(article);
    return (
      '<article class="magazine-story-item">' +
        '<div class="meta-row"><span class="tag">' + e(hub ? hub.title : "Revista") + '</span>' + (category ? '<span class="tag">' + e(category.title) + '</span>' : "") + '</div>' +
        '<h3><a href="' + articleHref(article.slug) + '">' + e(article.title) + '</a></h3>' +
        '<p>' + e(article.excerpt) + '</p>' +
        '<div class="inline-actions"><a class="magazine-story-link" href="' + articleHref(article.slug) + '">' + e(articleActionLabel(article)) + '</a>' + (category ? '<a class="magazine-story-link magazine-story-link-muted" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category)) + '</a>' : "") + '</div>' +
      '</article>'
    );
  }

  function renderStoreSpotlightCard(item) {
    const product = productMap.get(item.product);
    if (!product) return "";
    return (
      '<article class="editorial-card store-hero-spotlight-card">' +
        '<div class="featured-thumb"><img src="' + href(product.image) + '" alt="' + e(product.alt || product.name) + '" loading="lazy" /></div>' +
        '<div class="store-hero-spotlight-copy">' +
          '<div class="meta-row"><span class="tag">' + e(item.label) + '</span><span class="tag">' + e(product.bestFor) + '</span></div>' +
          '<h2>' + e(product.name) + '</h2>' +
          '<p>' + e(item.note) + '</p>' +
          '<p class="store-hero-note">Uma das escolhas mais sólidas desta categoria para começar sem hesitar.</p>' +
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
        '<img src="' + href(product.image) + '" alt="' + e(product.alt || product.name) + '" loading="lazy" />' +
        '<div><span class="tag">' + e(item.label) + '</span><strong>' + e(product.name) + '</strong><p>' + e(item.note) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Comprar</a><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver produto</a></div></div>' +
      '</article>'
    );
  }

  function renderStoreHome() {
    const canonical = "https://ondecortar.pt/loja/";
    setMeta("Loja OndeCortar | Seleção curta para comprar melhor", "Máquinas, kits, navalhas e acessórios escolhidos com critério, organizados por uso e por categoria.", canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Loja OndeCortar",
        "description": "Loja OndeCortar com uma seleção curta de máquinas, kits, navalhas e acessórios organizados com critério.",
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
    const featured = featuredPicks.map(function(item) {
      const product = productMap.get(item.product);
      if (!product) return "";
      return renderProductCard(product, {
        dense: true,
        label: item.label,
        highlight: item.note
      });
    }).join("");
    const needCards = quickComparison.map(function(item) {
      const product = productMap.get(item[1]);
      const label = item[0];
      if (!product) return "";
      return (
        '<a class="store-need-card" href="' + productHref(product.slug) + '">' +
          '<span class="tag">Começar por aqui</span>' +
          '<strong>' + e(label) + '</strong>' +
          '<p>' + e(product.name) + "</p>" +
          '<span class="store-need-link">Abrir recomendação</span>' +
        "</a>"
      );
    }).join("");
    const categoryCards = categories.map(function(item) { return renderCategoryCard(item, true); }).join("");
    const guideArticles = [];
    const seenGuideSlugs = new Set();
    function pushGuide(slugValue) {
      if (!slugValue || seenGuideSlugs.has(slugValue)) return;
      const article = articleMap.get(slugValue);
      if (!article) return;
      seenGuideSlugs.add(slugValue);
      guideArticles.push(article);
    }

    featuredPicks.forEach(function(item) {
      const product = productMap.get(item.product);
      if (product && product.articles && product.articles[0]) {
        pushGuide(product.articles[0]);
      }
    });
    articles.forEach(function(item) {
      if (guideArticles.length >= 4) return;
      pushGuide(item.slug);
    });

    const guideLinks = guideArticles.slice(0, 3).map(function(article) {
      return (
        '<a class="store-magazine-link" href="' + articleHref(article.slug) + '">' +
          e(article.title) +
        "</a>"
      );
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section section--store-start" id="categorias"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Loja OndeCortar</span><h2>Escolhe menos. Acerta melhor.</h2><p>Máquinas, kits, navalhas e acessórios organizados para filtrar depressa, comparar com critério e evitar compras de catálogo.</p></div></div><div class="product-grid product-grid--top-choices">' + featured + '</div><div class="category-grid">' + categoryCards + '</div></div></section>' +
        '<section class="section" id="escolhas-por-necessidade"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Começar pelo uso</span><h2>Ainda não sabes por onde pegar?</h2><p>Parte do contexto real: casa, barba, manutenção ou presente. É a forma mais rápida de evitar abrir opções que não te servem.</p></div></div><div class="store-need-grid">' + needCards + '</div></div></section>' +
        '<section class="section store-endcap-section"><div class="container"><div class="store-endcap-shell">' +
          renderDisclosure({ variant: "store" }) +
        '</div></div></section>' +
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
      return '<div class="comparison-row"><strong>' + e(item[0]) + '</strong><div><h3>' + e(product.name) + '</h3><p>' + e(product.summary) + '</p></div><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver produto</a></div>';
    }).join("");
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card category-hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja/") + '">Loja</a><span>/</span><span>' + e(category.title) + '</span></div><span class="section-flag">Escolha por categoria</span><h1>' + e(category.title) + '</h1><p>' + e(introShort) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#top-escolhas">Ver melhores opções</a>' + (relatedArticles[0] ? '<a class="btn btn-soft" href="' + articleHref(relatedArticles[0].slug) + '">' + e(articleActionLabel(relatedArticles[0])) + '</a>' : '<a class="btn btn-soft" href="' + href("loja/") + '">Voltar à loja</a>') + '</div></div>' +
          '<div class="hero-side"><div class="shop-mini-grid">' + topProducts.slice(0, 2).map(renderMiniProduct).join("") + '</div><div class="store-note"><strong>' + e(category.guidePanelTitle || "Lê o guia certo") + '</strong><p>' + e(category.guidePanelCopy || "Se ainda houver algo por perceber, os artigos desta categoria aprofundam o tema.") + '</p></div></div>' +
        '</div></div></section>' +
        '<section class="section" id="top-escolhas"><div class="container"><div class="section-header section-header--compact"><div><span class="eyebrow">Melhores opções</span><h2>' + e(category.topTitle || "As melhores opções desta categoria") + '</h2><p>' + e(category.topCopy || "Compara pelo teu caso de uso e escolhe a opção que encaixa melhor no teu dia a dia.") + '</p></div></div><div class="product-grid product-grid--dense product-grid--category-top">' + topProducts.map(function(item, index) { return renderProductCard(item, { dense: true, label: pickLabelMap.get(item.slug) || (index === 0 ? "Melhor escolha" : item.bestFor) }); }).join("") + '</div></div></section>' +
        renderCategoryGuide(category) +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Atalho de escolha</span><h2>' + e(category.comparisonTitle || "Comparação rápida") + '</h2><p>' + e(category.comparisonCopy || "Qual é o teu caso? Escolhe o perfil mais parecido e encontra a opção mais próxima do teu contexto.") + '</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        (relatedArticles.length ? renderGuideLinkPanel(category.magazineTitle || "Leituras ligadas a esta categoria", category.magazineCopy || "A revista aprofunda diferenças, erros comuns e critérios de avaliação para quem quer mais contexto.", relatedArticles.slice(0, 4), href("revista/"), "Ver mais guias") : '') +
        '<section class="section" id="faq-categoria"><div class="container">' + renderFaq(category.faqs) + '</div></section>' +
        renderWhyBuy(category) +
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
        "brand": { "@type": "Brand", "name": (product.brand || product.name.split(" ")[0]) },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": product.amazon || canonical,
          "seller": { "@type": "Organization", "name": "Amazon.es" }
        },
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
      return item.slug !== product.slug && Array.isArray(item.categories) && Array.isArray(product.categories) && item.categories.some(function(category) { return product.categories.indexOf(category) !== -1; });
    }).slice(0, 3);
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja/") + '">Loja</a><span>/</span><span>' + e(product.name) + '</span></div><span class="section-flag">Recomendação OndeCortar</span><span class="eyebrow">' + e(product.bestFor) + '</span><h1>' + e(product.name) + '</h1><p>' + e(product.summary) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço</a><a class="btn btn-secondary" href="' + (product.categories && product.categories[0] ? categoryHref(product.categories[0]) : href("loja/")) + '">' + e(categoryActionLabel(product.categories && product.categories[0] ? categoryMap.get(product.categories[0]) : null)) + '</a></div><div class="product-hero-panel"><strong>Antes de comprar</strong><ul class="rich-list"><li>Melhor para: ' + e(product.bestFor) + '</li><li>Ponto forte: ' + e(leadStrength || product.summary) + '</li><li>Outra vantagem: ' + e(secondStrength || product.useCase) + '</li></ul><div class="card-actions"><a class="btn btn-secondary btn-small" href="#relacionados">Ver alternativas</a></div></div></div>' +
      '<div class="hero-side"><div class="product-stage"><img src="' + href(product.image) + '" alt="' + e(product.alt || product.name) + '" loading="lazy" /></div><div class="store-note"><strong>Porque recomendamos</strong><p>' + e(product.highlight || product.summary) + '</p></div></div>' +
        '</div></div></section>' +
        '<section class="section"><div class="container split-grid">' +
          '<div class="stack">' +
            '<div class="product-highlight"><h3>Para quem é</h3><p>' + e(product.summary) + '</p></div>' +
            '<div class="product-highlight"><h3>Onde faz sentido</h3><p>' + e(product.useCase) + '</p></div>' +
            '<div class="product-highlight"><h3>Pontos fortes</h3><ul class="rich-list">' + (product.strengths || []).map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
            '<div class="product-highlight"><h3>Limitações</h3><ul class="rich-list">' + (product.limits || []).map(function(item) { return "<li>" + e(item) + "</li>"; }).join("") + '</ul></div>' +
          '</div>' +
          '<div class="stack">' +
            '<div class="buy-box"><span class="price-hint">Loja afiliada</span><h3>Confirmar preço e disponibilidade</h3><p>O preço e o stock mudam com frequência. Confirma diretamente na Amazon.es antes de decidir.</p><div class="card-actions"><a class="btn btn-primary" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço</a><a class="btn btn-secondary" href="' + (product.categories && product.categories[0] ? categoryHref(product.categories[0]) : href("loja/")) + '">' + e(categoryActionLabel(product.categories && product.categories[0] ? categoryMap.get(product.categories[0]) : null, "return")) + '</a></div></div>' +
            renderDisclosure() +
          '</div>' +
        '</div></section>' +
        renderProductArticleLinks(product) +
        '<section class="section" id="relacionados"><div class="container"><div class="section-header"><div><span class="eyebrow">Comparar alternativas</span><h2>Outras opções que vale a pena ver</h2><p>Se este produto está perto do que procuras mas ainda não fecha a decisão, estas alternativas ajudam a calibrar melhor a escolha.</p></div></div><div class="related-grid">' + related.map(function(item) { return renderProductCard(item, { dense: true }); }).join("") + '</div></div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderMagazineHome() {
    const mainHubs = hubs.filter(function(item) { return !item.legacy; });
    const featured = coreArticles();
    const leadArticle = featured[0];
    const spotlightArticles = featured.slice(1, 4);
    const remainingArticles = featured.slice(4).length ? featured.slice(4) : featured.slice(1);
    const leadCover = leadArticle ? articleCoverData(leadArticle) : null;
    const leadCategory = leadArticle ? articlePrimaryCategory(leadArticle) : null;
    const featuredCategories = collectMagazineCategories(featured.slice(0, 6), [], 4);
    const canonical = "https://ondecortar.pt/revista/";
    setMeta("Revista OndeCortar | Guias de compra, comparações e uso prático", "Guias de compra, comparações e artigos práticos para escolheres produtos de barbearia com mais segurança.", canonical);
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
    const topCategories = categories.slice(0, 4);
    const trustItems = [
      {
        eyebrow: "Datas visíveis",
        title: "Cada guia mostra contexto editorial",
        copy: "Publicação, revisão e leitura estimada aparecem nos artigos para que percebas o grau de atualização antes de aprofundar."
      },
      {
        eyebrow: "Como avaliamos",
        title: "Uso real acima de especificações",
        copy: "Priorizamos conforto, manutenção e o que faz diferença no dia a dia em vez de listas longas de acessórios."
      },
      {
        eyebrow: "Transparência",
        title: "Links afiliados sinalizados com clareza",
        copy: affiliateNotice
      }
    ];
    return (
      renderHeader() +
      '<main>' +
        '<section class="section"><div class="container">' +
          '<div class="section-header magazine-home-header"><div><span class="eyebrow">Revista OndeCortar</span><h1>Guias, comparações e respostas para perceber melhor</h1><p>Artigos práticos sobre o que funciona, o que evitar e qual a diferença real entre as opções.</p></div><div class="hero-actions"><a class="btn btn-primary" href="#artigos">Ver últimos guias</a><a class="btn btn-secondary" href="#seccoes">Explorar temas</a></div></div>' +
          '<div class="magazine-editorial-grid">' +
            (leadArticle ? '<article class="editorial-card magazine-feature-card"><div class="magazine-feature-copy"><div class="meta-row"><span class="tag">Artigo em destaque</span>' + (leadCategory ? '<span class="tag">' + e(leadCategory.title) + '</span>' : "") + '</div><h2>' + e(leadArticle.title) + '</h2><p>' + e(leadArticle.intro || leadArticle.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + articleHref(leadArticle.slug) + '">' + e(articleActionLabel(leadArticle)) + '</a><a class="btn btn-secondary" href="#artigos">Explorar mais leituras</a></div></div><div class="magazine-feature-media">' +
              '<a class="article-thumb article-thumb--' + leadCover.kind + '" href="' + articleHref(leadArticle.slug) + '">' +
                '<img src="' + leadCover.src + '" alt="' + e(leadCover.alt) + '" loading="lazy" />' +
              '</a>' +
            '</div></article>' : "") +
            '<aside class="editorial-card magazine-story-column"><div class="magazine-story-column-header"><span class="eyebrow">Últimos artigos</span><h2>O que ler a seguir</h2><p>Mais leituras para aprofundares o tema enquanto ainda tens perguntas em aberto.</p></div><div class="magazine-story-list">' + spotlightArticles.map(renderMagazineStoryItem).join("") + '</div></aside>' +
          '</div>' +
        '</div></section>' +
        renderEditorialTrustSection({
          eyebrow: "Como trabalhamos",
          title: "Contexto antes de tudo. Sempre.",
          copy: "A revista existe para responder a dúvidas reais, com critério e sem pressa. Quanto mais perceberes, mais fácil fica chegar à tua própria conclusão.",
          items: trustItems
        }) +
        renderMagazineStoreBridge("Queres explorar por categoria?", "As categorias da loja estão organizadas pelo mesmo critério dos guias — para quando quiseres ir mais fundo.", topCategories, href("loja/"), "Ver todas as categorias") +
        '<section class="section" id="artigos"><div class="container"><div class="section-header"><div><span class="eyebrow">Artigos</span><h2>Últimos artigos da revista</h2><p>Guias e comparações sobre o que realmente importa perceber.</p></div></div><div class="article-grid">' + remainingArticles.map(function(item) { return renderArticleCard(item); }).join("") + '</div></div></section>' +
        '<section class="section" id="seccoes"><div class="container"><div class="section-header"><div><span class="eyebrow">Temas</span><h2>Explorar por tema</h2><p>Escolhe um tema e encontra guias, comparações e leituras ligadas.</p></div></div><div class="hub-grid">' + mainHubs.map(renderHubCard).join("") + '</div></div></section>' +
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
    const leadArticle = hubArticles[0] || null;
    const leadCategory = leadArticle ? articlePrimaryCategory(leadArticle) : null;
    const leadCover = leadArticle ? articleCoverData(leadArticle) : null;
    const supportArticles = hubArticles.slice(1, 4);
    const supplementaryArticles = collectHubSupplementaryArticles(hub, 4);
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
        '<section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><span>' + e(hub.title) + '</span></div><span class="section-flag">Tema da Revista</span><h1>' + e(hub.title) + '</h1><p>' + e(hub.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos-cluster">Ver guias deste tema</a>' + (hubCategories[0] ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(hubCategories[0].slug) + '">' + e(categoryActionLabel(hubCategories[0], "compare")) + '</a>' : "") + '</div></div><div class="hero-side"><div class="panel-note hub-panel-note"><strong>O que encontras aqui</strong><ul class="rich-list"><li>' + e((hub.articles || []).length) + ' guias para perceber o tema com clareza.</li><li>' + e(hubCategories.length) + ' categorias para explorar quando estiveres pronto.</li><li>Critério editorial e transparência visíveis em cada escolha.</li></ul></div></div></div></div></section>' +
        renderEditorialTrustSection({
          eyebrow: "Sinais de confiança",
          title: "Tudo o que importa perceber — antes de qualquer outra coisa",
          copy: "Cada tema reúne as dúvidas que surgem na prática, explica os critérios que fazem diferença e deixa espaço para chegares à tua conclusão com mais segurança.",
          items: [
            { eyebrow: "Estrutura", title: "Fio condutor entre artigos", copy: "Os temas agrupam perguntas próximas para que não precises de andar a saltar entre leituras sem contexto." },
            { eyebrow: "Critério", title: "Mais uso real, menos ruído", copy: "Os artigos deste tema focam-se no que faz diferença no dia a dia: conforto, manutenção, curva de aprendizagem e casos concretos." },
            { eyebrow: "Transparência", title: "O critério editorial está visível", copy: affiliateNotice }
          ]
        }) +
        '<section class="section" id="artigos-cluster"><div class="container"><div class="section-header"><div><span class="eyebrow">Ponto de entrada</span><h2>Por onde a maioria começa</h2><p>O guia mais completo deste tema. Cobre o que importa perceber primeiro e deixa os restantes para quem quiser ir mais fundo.</p></div></div>' +
          (leadArticle ? '<div class="magazine-editorial-grid hub-editorial-grid"><article class="editorial-card magazine-feature-card"><div class="magazine-feature-copy"><div class="meta-row"><span class="tag">Guia principal</span>' + (leadCategory ? '<span class="tag">' + e(leadCategory.title) + '</span>' : "") + '</div><h2>' + e(leadArticle.title) + '</h2><p>' + e(leadArticle.intro || leadArticle.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + articleHref(leadArticle.slug) + '">' + e(articleActionLabel(leadArticle)) + '</a>' + (leadCategory ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(leadCategory.slug) + '">' + e(categoryActionLabel(leadCategory)) + '</a>' : '') + '</div></div><div class="magazine-feature-media"><a class="article-thumb article-thumb--' + leadCover.kind + '" href="' + articleHref(leadArticle.slug) + '"><img src="' + leadCover.src + '" alt="' + e(leadCover.alt) + '" loading="lazy" /></a></div></article><aside class="editorial-card magazine-story-column"><div class="magazine-story-column-header"><span class="eyebrow">Leituras seguintes</span><h2>O que explorar a seguir</h2><p>Abre só o que resolve a dúvida que ainda ficou em aberto.</p></div><div class="magazine-story-list">' + supportArticles.map(renderMagazineStoryItem).join("") + '</div></aside></div>' : '<div class="article-grid">' + hubArticles.map(renderArticleCard).join("") + '</div>') +
        '</div></section>' +
        (supplementaryArticles.length ? '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Ir mais fundo</span><h2>O que ainda pode ficar por responder</h2><p>Para quem leu o essencial e ainda tem uma dúvida em aberto. Cada artigo responde a um ângulo diferente do mesmo tema.</p></div></div><div class="article-grid">' + supplementaryArticles.map(renderArticleCard).join("") + '</div></div></section>' : "") +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Explorar categoria</span><h2>Categorias ligadas a este tema</h2><p>Para quando quiseres continuar por uma categoria específica, com o mesmo critério dos guias.</p></div></div><div class="category-grid">' + hubCategories.map(function(item) { return renderCategoryCard(item, false); }).join("") + '</div></div></section>' +
      '</main>' +
      renderFooter()
    );
  }

  function renderArticlePage(value) {
    const article = articleMap.get(value);
    if (!article) return renderNotFound("Artigo não encontrado");
    const hub = hubMap.get(article.hub);
    const category = articlePrimaryCategory(article);
    const canonical = "https://ondecortar.pt/revista/" + value + "/";
    const metaTitle = article.metaTitle || (article.title + " | Revista OndeCortar");
    const metaDescription = article.metaDescription || article.excerpt;
    const publishedDate = articlePublishedDate(article);
    const updatedDate = articleUpdatedDate(article);
    const readingTime = articleReadingMinutes(article);
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
        "author": {
          "@type": "Organization",
          "name": "OndeCortar.pt",
          "url": "https://ondecortar.pt/"
        },
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
        '<section class="section"><div class="container hero-card article-header"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span>' + (hub ? '<a href="' + hubHref(article.hub) + '">' + e(hub.title) + '</a>' : '<span>Revista</span>') + '</div><span class="section-flag">Artigo da Revista</span><h1>' + e(article.title) + '</h1><div class="article-meta"><span class="article-author">Por <strong>Equipa OndeCortar.pt</strong></span>' + (publishedDate ? '<span>Publicado em ' + e(formatDatePt(publishedDate)) + '</span>' : '') + (updatedDate && updatedDate !== publishedDate ? '<span>Atualizado em ' + e(formatDatePt(updatedDate)) + '</span>' : '') + '<span>Leitura estimada ' + e(readingTime) + ' min</span></div><p>' + e(article.intro) + '</p><p class="article-subcopy">' + e(article.subIntro || article.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#resposta-rapida">Ver resposta rápida</a>' + (category ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(category.slug) + '">' + e(categoryActionLabel(category, "compare")) + '</a>' : "") + '</div></div></section>' +
        renderArticleQuickAnswers(article) +
        renderArticleSupportCards(article) +
        '<section class="section"><div class="container article-body">' +
          (article.sections || []).map(function(item) { return '<article class="article-section"><h2>' + e(item[0]) + '</h2>' + item[1].map(function(text) { return "<p>" + e(text) + "</p>"; }).join("") + "</article>"; }).join("") +
        '</div></section>' +
        renderArticleDecisionStrip(article) +
        renderArticleCategoryBridge(article) +
        (article.faqs && article.faqs.length ? '<section class="section" id="faq-artigo"><div class="container">' + renderFaq(article.faqs, { ctaHref: category ? categoryHref(category.slug) : "", ctaLabel: category ? "recomendações de " + category.title.toLowerCase() : "" }) + '</div></section>' : "") +
        renderRelatedArticles("Artigos relacionados", article.relatedArticles) +
        renderArticleFinalCta(article) +
      '</main>' +
      renderFooter()
    );
  }

  function renderNotFound(label) {
    setMeta("Página não encontrada | OndeCortar", "A página pedida não está disponível.", window.location.href);
    setStructuredData([]);
    setRobots("noindex,follow");
    return renderHeader() + '<main><section class="section"><div class="container callout-card"><h1>' + e(label) + '</h1><p>Esta página não está disponível. Volta à loja ou à revista para continuares.</p><div class="hero-actions"><a class="btn btn-primary" href="' + href("loja/") + '">Ir para a loja</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ir para a revista</a></div></div></section></main>' + renderFooter();
  }

  if (params.toString()) {
    setRobots("noindex,follow");
  }

  function setupArticleProgressBar(category) {
    if (!category) return;
    const bar = document.createElement("div");
    bar.className = "article-progress-bar";
    bar.innerHTML = '<span>Queres ir mais fundo?</span><a href="' + categoryHref(category.slug) + '">Explorar ' + e(category.title) + ' →</a>';
    document.body.appendChild(bar);

    const finalCta = document.querySelector(".article-final-cta");
    let visible = false;

    function updateBar() {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pastHalf = total > 0 && scrolled / total >= 0.5;
      const nearEnd = finalCta
        ? scrolled + window.innerHeight >= finalCta.getBoundingClientRect().top + window.scrollY - 80
        : false;
      const shouldShow = pastHalf && !nearEnd;
      if (shouldShow !== visible) {
        visible = shouldShow;
        bar.classList.toggle("article-progress-bar--visible", visible);
      }
    }

    window.addEventListener("scroll", updateBar, { passive: true });
  }

  if (page === "store") app.innerHTML = renderStoreHome();
  else if (page === "category") app.innerHTML = renderCategoryPage(slug);
  else if (page === "product") app.innerHTML = renderProductPage(slug);
  else if (page === "magazine") app.innerHTML = renderMagazineHome();
  else if (page === "hub") app.innerHTML = renderHubPage(slug);
  else if (page === "article") app.innerHTML = renderArticlePage(slug);
  else app.innerHTML = renderNotFound("Página não encontrada");

  setupNavigation();

  if (page === "article") {
    const currentArticle = articleMap.get(slug);
    if (currentArticle) {
      const progressCategory = articlePrimaryCategory(currentArticle);
      if (progressCategory) setupArticleProgressBar(progressCategory);
    }
  }
})();
