/* OndeCortar.pt — medição GA4 (G-WQ6F9E5Q7D)
 *
 * Regras deste ficheiro:
 * - Nunca recolher dados pessoais (sem coordenadas, sem e-mails, sem IDs de utilizador).
 * - Um clique gera exatamente UM evento OndeCortar (precedência documentada em classifyClick).
 * - Consent Mode v2 com analytics_storage negado por defeito (pings sem cookies).
 *   Para ativar cookies analíticos (ex.: depois de existir um banner de consentimento),
 *   mudar OC_ANALYTICS_CONSENT para "granted" — é a única linha a alterar.
 */
(function () {
  "use strict";

  var GA_ID = "G-WQ6F9E5Q7D";
  var OC_ANALYTICS_CONSENT = "denied"; // "granted" quando houver banner de consentimento

  if (window.__ocAnalyticsLoaded) return; // proteção contra inclusão dupla
  window.__ocAnalyticsLoaded = true;

  var DEBUG = /[?&]ocdebug=1/.test(location.search) ||
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  // ── Bootstrap gtag ─────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: OC_ANALYTICS_CONSENT
  });
  gtag("js", new Date());
  gtag("config", GA_ID, DEBUG ? { debug_mode: true } : {});

  var loader = document.createElement("script");
  loader.async = true;
  loader.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(loader);

  // ── Contexto da página ─────────────────────────────────────────
  function pageContext() {
    var body = document.body || document.createElement("body");
    var declared = body.getAttribute("data-page") || "";
    var slug = body.getAttribute("data-slug") || "";
    var path = location.pathname;
    var type = declared;

    if (!type) {
      if (/^\/(index\.html)?$/.test(path)) type = "home";
      else if (path.indexOf("/cidades/") === 0) type = "city";
      else if (path.indexOf("/barbearias/") === 0) type = "profile";
      else if (path.indexOf("/produto/") === 0) type = "product";
      else if (path.indexOf("/revista/") === 0) type = "article";
      else if (path.indexOf("/loja/") === 0) type = "store";
      else type = "page";
    }
    // páginas geradas (cidades/perfis) não têm data-page
    if (type === "page" || type === "") {
      if (path.indexOf("/cidades/") === 0) type = "city";
      if (path.indexOf("/barbearias/") === 0) type = "profile";
    }
    if (!slug) {
      var m = path.match(/^\/(?:produto|revista|barbearias|cidades|loja)\/([^\/]+)\/?/);
      if (m) slug = m[1];
    }
    return { type: type, slug: slug, path: path };
  }

  var PAGE = pageContext();
  var DIRECTORY_TYPES = { home: 1, city: 1, profile: 1 };

  function send(eventName, params) {
    var payload = params || {};
    payload.page_type = PAGE.type;
    payload.page_path = PAGE.path;
    gtag("event", eventName, payload);
    if (DEBUG && window.console) console.log("[oc-analytics]", eventName, payload);
  }

  // ── Eventos de visualização ────────────────────────────────────
  var VIEW_EVENTS = {
    store: "shop_view",
    magazine: "magazine_view",
    category: "category_view",
    article: "article_view",
    product: "product_view",
    hub: "magazine_view"
  };
  if (VIEW_EVENTS[PAGE.type]) {
    var viewParams = {};
    if (PAGE.type === "category") viewParams.category_slug = PAGE.slug;
    if (PAGE.type === "article" || PAGE.type === "hub") viewParams.article_slug = PAGE.slug;
    if (PAGE.type === "product") viewParams.product_id = PAGE.slug;
    send(VIEW_EVENTS[PAGE.type], viewParams);
  }

  // ── Classificação de cliques ───────────────────────────────────
  var PLACEMENTS = [
    ["[data-oc-sticky]", "sticky_mobile"],
    ["#destaques", "featured"],
    ["#escolhas-rapidas", "quick_card"],
    ["#por-uso", "use_case"],
    ["#categorias", "category_grid"],
    ["#top-escolhas", "top_picks"],
    ["#relacionados", "related"],
    ["#perfis-de-uso", "article_inline"],
    [".oc-decision-table", "decision_table"],
    [".oc-category-all", "category_all"],
    [".buy-box", "buybox"],
    [".product-hero-panel", "hero_panel"],
    [".article-final-cta", "footer_cta"],
    [".article-category-bridge", "category_bridge"],
    [".quick-answer-store-nudge", "quick_answer_nudge"],
    [".article-support-grid", "support_card"],
    [".faq-list-wrap", "faq_cta"],
    [".hero-actions", "hero"],
    [".store-guide-panel", "guide_panel"],
    [".oc-card", "profile_card"],
    [".store-section", "home_store_block"],
    ["#oc-home-commerce", "home_context_block"],
    ["#emptyState", "empty_state"],
    ["footer", "footer"],
    ["nav", "nav"]
  ];

  function findPlacement(el) {
    for (var i = 0; i < PLACEMENTS.length; i++) {
      if (el.closest && el.closest(PLACEMENTS[i][0])) return PLACEMENTS[i][1];
    }
    return "content";
  }

  function extractAsin(href) {
    var m = String(href).match(/\/dp\/([A-Z0-9]{10})/i) ||
            String(href).match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
            String(href).match(/\/d?p?\/?([B][A-Z0-9]{9})/);
    return m ? m[1].toUpperCase() : "";
  }

  function nearestHeading(el) {
    var card = el.closest("article, .loja-quick-card, .loja-feat-card, .buy-box, .product-hero-panel, .oc-card, section");
    if (!card) return "";
    var h = card.querySelector("h1, h2, h3, h4, strong");
    return h ? h.textContent.trim().slice(0, 80) : "";
  }

  var productCategoryCache = null;
  function pageProductCategory() {
    if (productCategoryCache !== null) return productCategoryCache;
    productCategoryCache = "";
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      try {
        var data = JSON.parse(scripts[i].textContent);
        if (data && data["@type"] === "Product" && data.category) {
          productCategoryCache = String(data.category).slice(0, 80);
          break;
        }
      } catch (e) { /* ignora JSON inválido */ }
    }
    return productCategoryCache;
  }

  function positionInPlacement(link) {
    var container = null;
    for (var i = 0; i < PLACEMENTS.length; i++) {
      container = link.closest(PLACEMENTS[i][0]);
      if (container) break;
    }
    var scope = container || document;
    var all = scope.querySelectorAll('a[href*="amazon."]');
    for (var j = 0; j < all.length; j++) {
      if (all[j] === link) return j + 1;
    }
    return 1;
  }

  function slugFromPath(href, segment) {
    try {
      var url = new URL(href, location.href);
      var m = url.pathname.match(new RegExp("/" + segment + "/([^/]+)/?"));
      return m ? m[1] : "";
    } catch (e) { return ""; }
  }

  function pathHas(href, segment) {
    try {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin) return false;
      return url.pathname.indexOf("/" + segment + "/") !== -1 ||
             url.pathname === "/" + segment;
    } catch (e) { return false; }
  }

  // Precedência (1 clique = 1 evento):
  // 1. affiliate_click (Amazon)
  // 2. em artigos: article_to_product_click / article_to_category_click
  // 3. em páginas do diretório: directory_to_shop_click / directory_to_magazine_click
  // 4. internal_product_click (restantes páginas → /produto/)
  // 5. search_used / location_used tratados por listeners próprios
  function classifyClick(link) {
    var href = link.href || "";

    if (/amazon\.[a-z.]+\//i.test(href) || /amzn\.to\//i.test(href)) {
      var params = {
        product_id: extractAsin(href),
        product_name: nearestHeading(link),
        placement: findPlacement(link),
        button_text: (link.textContent || "").trim().slice(0, 80),
        position: positionInPlacement(link),
        destination_domain: (function () { try { return new URL(href).hostname; } catch (e) { return ""; } })()
      };
      if (PAGE.type === "product") params.product_id = PAGE.slug || params.product_id;
      if (PAGE.type === "product") params.product_category = pageProductCategory();
      if (PAGE.type === "category") params.product_category = PAGE.slug;
      if (PAGE.type === "article" || PAGE.type === "hub") params.source_article = PAGE.slug;
      if (PAGE.type === "category") params.source_category = PAGE.slug;
      return { name: "affiliate_click", params: params };
    }

    var isProduto = pathHas(href, "produto");
    var isLoja = pathHas(href, "loja");
    var isRevista = pathHas(href, "revista");

    if (PAGE.type === "article" || PAGE.type === "hub") {
      if (isProduto) {
        return { name: "article_to_product_click", params: {
          source_article: PAGE.slug,
          product_id: slugFromPath(href, "produto"),
          placement: findPlacement(link)
        } };
      }
      if (isLoja) {
        return { name: "article_to_category_click", params: {
          source_article: PAGE.slug,
          category_slug: slugFromPath(href, "loja"),
          placement: findPlacement(link)
        } };
      }
    }

    if (DIRECTORY_TYPES[PAGE.type]) {
      if (isLoja || isProduto) {
        return { name: "directory_to_shop_click", params: {
          source: PAGE.type,
          destination: isProduto ? "produto/" + slugFromPath(href, "produto") : "loja/" + slugFromPath(href, "loja"),
          placement: findPlacement(link)
        } };
      }
      if (isRevista) {
        return { name: "directory_to_magazine_click", params: {
          source: PAGE.type,
          destination: "revista/" + slugFromPath(href, "revista"),
          placement: findPlacement(link)
        } };
      }
    }

    if (isProduto) {
      return { name: "internal_product_click", params: {
        product_id: slugFromPath(href, "produto"),
        placement: findPlacement(link)
      } };
    }

    return null;
  }

  document.addEventListener("click", function (ev) {
    if (ev.__ocTracked) return;
    var link = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
    if (!link) return;
    var event = classifyClick(link);
    if (!event) return;
    ev.__ocTracked = true;
    send(event.name, event.params);
  }, true);

  // ── Homepage: pesquisa, localização, sem resultados ────────────
  function initHomeTracking() {
    var form = document.getElementById("heroSearchForm");
    var input = document.getElementById("heroSearchInput");
    var locateBtn = document.getElementById("heroLocateBtn");
    var emptyState = document.getElementById("emptyState");
    var lastTerm = "";

    if (form) {
      form.addEventListener("submit", function () {
        lastTerm = input ? input.value.trim().toLowerCase().slice(0, 40) : "";
        send("search_used", { search_term: lastTerm });
      });
    }
    if (locateBtn) {
      locateBtn.addEventListener("click", function () {
        send("location_used", {});
      });
    }
    if (emptyState && window.MutationObserver) {
      var wasHidden = emptyState.hidden;
      new MutationObserver(function () {
        if (wasHidden && !emptyState.hidden) {
          send("no_results_view", { search_term: lastTerm });
        }
        wasHidden = emptyState.hidden;
      }).observe(emptyState, { attributes: true, attributeFilter: ["hidden"] });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeTracking);
  } else {
    initHomeTracking();
  }

  window.OCAnalytics = { version: "1.0.0", page: PAGE, send: send };
})();
