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
  const editorialCategoryPaths = {
    "maquinas-de-cortar": "loja/maquinas-de-cortar/",
    "kits-de-barba": "loja/kits-de-barba/",
    "cremes-e-espumas": "loja/cremes-e-espumas/",
    "navalhas-e-laminas": "loja/navalhas-e-laminas/",
    "escovas-e-pentes": "loja/escovas-e-pentes/",
    "acessorios-de-barbeiro": "loja/acessorios-de-barbeiro/"
  };

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
    const mapped = editorialCategoryPaths[value];
    return mapped ? href(mapped) : categoryHref(value);
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
            '<a class="nav-mobile-add" href="' + href("registar.html") + '">Adicionar</a>' +
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
    const leadArticle = getArticles(category.articles || [])[0];
    return (
      '<article class="category-card">' +
        (withImage && lead ? '<div class="category-thumb"><img src="' + href(lead.image) + '" alt="' + e(lead.alt) + '" loading="lazy" /></div>' : "") +
        '<div class="product-copy">' +
          '<div class="meta-row"><span class="tag">' + count + " produtos</span></div>" +
          "<h3>" + e(category.title) + "</h3>" +
          "<p>" + e(category.intro) + "</p>" +
          '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + categoryHref(category.slug) + '">Explorar categoria</a>' +
            (leadArticle ? '<a class="btn btn-secondary btn-small" href="' + articleHref(leadArticle.slug) + '">Ler guia</a>' : "") +
          '</div>' +
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
      (category ? '<div class="callout-card article-sidebar-card"><span class="eyebrow">Categoria relacionada</span><h3>' + e(category.title) + '</h3><p>' + e(article.categoryCta || category.intro) + '</p><div class="card-actions"><a class="btn btn-primary btn-small" href="' + editorialCategoryHref(category.slug) + '">Explorar categoria</a></div></div>' : "")
    );
  }

  function renderArticleRecommendedProducts(article) {
    const entries = articleRecommendedEntries(article);
    if (!entries.length) return "";
    return (
      '<section class="section" id="produtos-artigo"><div class="container">' +
        '<div class="section-header"><div><span class="eyebrow">Produtos recomendados</span><h2>Produtos recomendados neste guia</h2><p>Uma seleção curta para continuares a decisão com contexto e não por impulso.</p></div></div>' +
        '<div class="product-grid article-recommend-grid">' +
          entries.map(function(entry) {
            return (
              '<article class="product-card article-recommend-card">' +
                '<img src="' + href(entry.product.image) + '" alt="' + e(entry.product.alt) + '" loading="lazy" />' +
                '<div class="product-copy">' +
                  '<div class="meta-row"><span class="tag">' + e(entry.product.bestFor) + '</span></div>' +
                  '<h3>' + e(entry.product.name) + '</h3>' +
                  '<p>' + e(entry.blurb) + '</p>' +
                  '<p class="article-note">' + e(entry.note) + '</p>' +
                  '<div class="card-actions"><a class="btn btn-primary btn-small" href="' + productHref(entry.product.slug) + '">Ver produto</a></div>' +
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
        '<span class="eyebrow">Ver categoria relacionada</span>' +
        '<h2>' + e(category.title) + '</h2>' +
        '<p>' + e(article.categoryCta || category.intro) + '</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">Explorar categoria</a><a class="btn btn-secondary" href="' + categoryHref(category.slug) + '">Ver página editorial</a></div>' +
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
          (category ? '<a class="btn btn-primary" href="' + editorialCategoryHref(category.slug) + '">Ver seleção completa</a>' : "") +
          '<a class="btn btn-secondary" href="' + href("revista/") + '">Voltar à Revista</a>' +
        '</div>' +
      '</div></section>'
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
      '<a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a>' +
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
        '<div class="section-header"><div><span class="eyebrow">Revista OndeCortar</span><h2>' + e(title) + '</h2><p>Artigos ligados ao mesmo tema para continuares a explorar.</p></div></div>' +
        '<div class="article-grid">' + list.map(renderArticleCard).join("") + "</div>" +
      "</div></section>"
    );
  }

  function renderStoreHome() {
    const canonical = "https://ondecortar.pt/loja/";
    setMeta("Loja OndeCortar | Produtos de barbearia escolhidos com critério", "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.", canonical);
    const featuredArticles = coreArticles().slice(0, 6);
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
      return (
        '<article class="editorial-card">' +
          '<div class="featured-thumb"><img src="' + href(product.image) + '" alt="' + e(product.alt) + '" loading="lazy" /></div>' +
          '<div class="product-copy">' +
            '<div class="meta-row"><span class="tag">' + e(item.label) + '</span><span class="tag">' + e(product.bestFor) + '</span></div>' +
            "<h3>" + e(product.name) + "</h3>" +
            "<p>" + e(item.note) + "</p>" +
              '<div class="card-actions"><a class="btn btn-secondary btn-small" href="' + productHref(product.slug) + '">Ver recomendação</a><a class="btn btn-primary btn-small" href="' + e(amazonPtUrl(product.amazon)) + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver na Amazon.es</a></div>' +
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
    return (
      renderHeader() +
      '<main>' +
        '<section class="section store-intro-section"><div class="container">' +
          '<div class="store-hero-shell">' +
            '<div class="hero-card store-hero-main-card">' +
              '<span class="section-flag">LOJA ONDECORTAR</span>' +
              '<h1>Comprar por categoria</h1>' +
              '<p>Vai direto a maquinas, barba, acessorios e guias com links afiliados identificados.</p>' +
              '<div class="hero-actions">' +
                '<a class="btn btn-primary" href="#categorias">Comprar por categoria</a>' +
                '<a class="btn btn-secondary" href="' + href("revista/") + '">Ler guias e comparacoes</a>' +
              '</div>' +
              '<p class="store-hero-note">Links afiliados identificados em todas as paginas comerciais</p>' +
            '</div>' +
            '<nav class="store-quick-bar" aria-label="Categorias rapidas">' + heroQuickLinks + '</nav>' +
          '</div>' +
        '</div></section>' +
        '<section class="section" id="categorias"><div class="container"><div class="store-category-topline"><span class="eyebrow">Categorias</span></div><div class="category-grid">' + categoryCards + '</div></div></section>' +
        '<section class="section" id="produtos"><div class="container"><div class="section-header"><div><span class="eyebrow">Mais procurados</span><h2>Top recomendações para comprar hoje</h2><p>Quatro recomendações para começares a compra sem perder tempo.</p></div></div><div class="featured-grid">' + featured + '</div></div></section>' +
        '<section class="section"><div class="container"><div class="section-header"><div><span class="eyebrow">Por necessidade</span><h2>Explorar por necessidade</h2><p>Uma primeira camada para encontrar mais depressa o que faz sentido.</p></div></div><div class="need-grid">' + needCards + '</div></div></section>' +
        '<section class="section"><div class="container comparison-card"><div class="section-header"><div><span class="eyebrow">Comparações rápidas</span><h2>Compara e decide em minutos</h2><p>Quatro atalhos para chegares ao produto certo mais depressa.</p></div></div><div class="comparison-table">' + comparisonRows + '</div></div></section>' +
        renderWhyBuy() +
        renderRelatedArticles("Guias para comprar melhor", featuredArticles.map(function(item) { return item.slug; })) +
        '<section class="section"><div class="container">' + renderDisclosure() + "</div></section>" +
      "</main>" +
      renderFooter()
    );
  }

  function renderCategoryPage(value) {
    const category = categoryMap.get(value);
    if (!category) return renderNotFound("Categoria não encontrada");
    const canonical = "https://ondecortar.pt/loja/" + value + "/";
    setMeta(category.title + " | Loja OndeCortar", category.intro, canonical);
    const topProducts = getProducts(category.top);
    const leadArticle = getArticles(category.articles || [])[0] || null;
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.title,
        "description": category.intro,
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
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><div class="breadcrumbs"><a href="' + href("loja/") + '">Loja</a><span>/</span><span>' + e(category.title) + '</span></div><span class="section-flag">Categoria da loja</span><h1>' + e(category.title) + '</h1><p>' + e(category.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#top3">Ver top 3 da categoria</a>' + (leadArticle ? '<a class="btn btn-secondary" href="' + articleHref(leadArticle.slug) + '">Ler guia principal</a>' : "") + '</div></div>' +
          '<div class="hero-side"><div class="shop-mini-grid">' + topProducts.slice(0, 2).map(renderMiniProduct).join("") + '</div><div class="store-note"><strong>Escolha mais rápida</strong><p>Selecionámos poucas opções para decidires sem te perderes em excesso de oferta.</p></div></div>' +
        '</div></div></section>' +
        (leadArticle ? '<section class="section"><div class="container callout-card article-category-bridge"><span class="eyebrow">Guia editorial</span><h2>' + e(leadArticle.title) + '</h2><p>' + e(leadArticle.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="' + articleHref(leadArticle.slug) + '">Ler guia relacionado</a><a class="btn btn-secondary" href="' + editorialCategoryHref(category.slug) + '">Ver seleção completa</a></div></div></section>' : "") +
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
        '<section class="section" id="relacionados"><div class="container"><div class="section-header"><div><span class="eyebrow">Relacionados</span><h2>Produtos relacionados</h2></div></div><div class="related-grid">' + related.map(function(item) { return renderProductCard(item, true); }).join("") + '</div></div></section>' +
        renderRelatedArticles("Artigos ligados a esta recomendação", product.articles) +
      '</main>' +
      renderFooter()
    );
  }

  function renderMagazineHome() {
    const mainHubs = hubs.filter(function(item) { return !item.legacy; });
    const featured = coreArticles();
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
        '<section class="section"><div class="container hero-card"><div class="hero-grid">' +
          '<div class="hero-copy"><span class="section-flag">Revista OndeCortar</span><h1>Centro editorial para escolher melhor e comprar com mais confiança</h1><p>A Revista deixa de ser um blog genérico e passa a ligar intenção de pesquisa, apoio à decisão e clique para a loja.</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos">Ver os 12 artigos base</a><a class="btn btn-secondary" href="#seccoes">Explorar clusters</a></div></div>' +
            '<div class="hero-side"><div class="panel-note"><strong>SEO com intenção</strong><p>Títulos orientados a pesquisa, dúvida real e decisão prática.</p></div><div class="panel-note"><strong>Ponte para a loja</strong><p>Cada artigo liga a categoria, produtos recomendados e próximos passos concretos.</p></div></div>' +
        '</div></div></section>' +
        '<section class="section" id="seccoes"><div class="container"><div class="section-header"><div><span class="eyebrow">Clusters editoriais</span><h2>Explorar a Revista por intenção</h2><p>Quatro clusters para captar tráfego, responder melhor e empurrar o utilizador para a categoria certa.</p></div></div><div class="hub-grid">' + mainHubs.map(function(item) { return '<article class="hub-card"><h3>' + e(item.title) + '</h3><p>' + e(item.intro) + '</p><div class="card-actions"><a class="btn btn-secondary btn-small" href="' + hubHref(item.slug) + '">Ver cluster</a></div></article>'; }).join("") + '</div></div></section>' +
        '<section class="section" id="artigos"><div class="container"><div class="section-header"><div><span class="eyebrow">Primeira vaga</span><h2>12 artigos com função comercial clara</h2><p>Guias, comparações, erros comuns e conteúdo prático ligados diretamente às categorias da loja.</p></div></div><div class="article-grid">' + featured.map(renderArticleCard).join("") + '</div></div></section>' +
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
        '<section class="section"><div class="container hero-card"><div class="hero-grid"><div class="hero-copy"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span><span>' + e(hub.title) + '</span></div><span class="section-flag">Cluster editorial</span><h1>' + e(hub.title) + '</h1><p>' + e(hub.intro) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#artigos-cluster">Ver artigos</a>' + (hubCategories[0] ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(hubCategories[0].slug) + '">Ver categoria ligada</a>' : "") + '</div></div><div class="hero-side"><div class="panel-note"><strong>Função do cluster</strong><p>Capta uma intenção específica e encaminha o leitor para categorias e produtos com mais contexto.</p></div></div></div></div></section>' +
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
    setMeta(metaTitle, metaDescription, canonical);
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": ["Article", "BlogPosting"],
        "headline": article.title,
        "description": metaDescription,
        "mainEntityOfPage": canonical,
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
        '<section class="section"><div class="container hero-card article-header"><div class="breadcrumbs"><a href="' + href("revista/") + '">Revista</a><span>/</span>' + (hub ? '<a href="' + hubHref(article.hub) + '">' + e(hub.title) + '</a>' : '<span>Revista</span>') + '</div><span class="section-flag">Artigo da Revista</span><h1>' + e(article.title) + '</h1><p>' + e(article.intro) + '</p><p class="article-subcopy">' + e(article.subIntro || article.excerpt) + '</p><div class="hero-actions"><a class="btn btn-primary" href="#produtos-artigo">Ver produtos recomendados</a>' + (article.relatedCategory ? '<a class="btn btn-secondary" href="' + editorialCategoryHref(article.relatedCategory) + '">Ver categoria ligada</a>' : "") + '</div></div></section>' +
        renderArticleQuickAnswers(article) +
        '<section class="section"><div class="container article-layout"><div class="article-body">' +
          (article.sections || []).map(function(item) { return '<article class="article-section"><h2>' + e(item[0]) + '</h2>' + item[1].map(function(text) { return "<p>" + e(text) + "</p>"; }).join("") + "</article>"; }).join("") +
        '</div><aside class="stack">' + renderArticleSidebar(article) + '</aside></div></section>' +
        renderArticleRecommendedProducts(article) +
        renderArticleCategoryBridge(article) +
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
    return renderHeader() + '<main><section class="section"><div class="container callout-card"><h1>' + e(label) + '</h1><p>Volta à loja ou à revista para continuares a navegar.</p><div class="hero-actions"><a class="btn btn-primary" href="' + href("loja/") + '">Ir para a loja</a><a class="btn btn-secondary" href="' + href("revista/") + '">Ir para a revista</a></div></div></section></main>' + renderFooter();
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
