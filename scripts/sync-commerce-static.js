const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const VERSION = "20260409-commerce-ux";
const TODAY = new Date().toISOString().slice(0, 10);
const SITE_URL = "https://ondecortar.pt/";
const DEFAULT_OG_IMAGE = SITE_URL + "imagens/banner.jpg";
const NAV_SCRIPT = `
  <script>
    (function() {
      var nav = document.querySelector(".nav");
      var toggle = document.querySelector("[data-nav-toggle]");
      var navLinks = document.getElementById("siteNavLinks");
      var backdrop = document.querySelector("[data-nav-backdrop]");
      var toggleLabel = toggle ? toggle.querySelector(".nav-toggle-label") : null;
      if (!nav || !toggle || !navLinks) return;

      function setOpen(nextOpen) {
        var mobile = window.innerWidth <= 1100;
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
        if (window.innerWidth > 1100) {
          setOpen(false);
        }
      });

      setOpen(false);
    })();
  </script>`;

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(value) {
  return /^https?:/i.test(String(value || ""))
    ? String(value)
    : SITE_URL + String(value || "").replace(/^\/+/, "");
}

function writeFile(relativePath, contents) {
  const target = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, "utf8");
}

function loadCommerceData() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  [
    "commerce-taxonomy.js",
    "commerce-products-a.js",
    "commerce-products-b.js",
    "commerce-articles.js"
  ].forEach((file) => {
    const code = fs.readFileSync(path.join(ROOT, file), "utf8");
    vm.runInContext(code, context, { filename: file });
  });
  return context.window.OndeCortarCommerce;
}

function createNode(tagName) {
  return {
    tagName: String(tagName || "").toLowerCase(),
    attributes: {},
    textContent: "",
    parentNode: null,
    setAttribute(name, value) {
      this.attributes[String(name).toLowerCase()] = String(value);
    },
    getAttribute(name) {
      return this.attributes[String(name).toLowerCase()];
    },
    remove() {
      if (this.parentNode && typeof this.parentNode.removeChild === "function") {
        this.parentNode.removeChild(this);
      }
    }
  };
}

function selectorMatches(node, selector) {
  if (!node) return false;
  const valuedMatch = /^([a-z]+)\[([^=]+)="([^"]+)"\]$/i.exec(selector);
  if (valuedMatch) {
    const tag = valuedMatch[1].toLowerCase();
    const attr = valuedMatch[2].toLowerCase();
    const value = valuedMatch[3];
    return node.tagName === tag && node.attributes[attr] === value;
  }

  const bareMatch = /^([a-z]+)\[([^\]]+)\]$/i.exec(selector);
  if (bareMatch) {
    const tag = bareMatch[1].toLowerCase();
    const attr = bareMatch[2].toLowerCase();
    return node.tagName === tag && Object.prototype.hasOwnProperty.call(node.attributes, attr);
  }

  return false;
}

function createSandbox(spec, data) {
  const headNodes = [];
  const bodyNodes = [];
  const app = { innerHTML: "" };
  const dataset = {};

  Object.entries(spec.bodyAttrs || {}).forEach(([key, value]) => {
    if (!key.startsWith("data-")) return;
    const datasetKey = key
      .slice(5)
      .replace(/-([a-z])/g, function(_, char) { return char.toUpperCase(); });
    dataset[datasetKey] = value;
  });

  const head = {
    appendChild(node) {
      node.parentNode = head;
      headNodes.push(node);
      return node;
    },
    removeChild(node) {
      const index = headNodes.indexOf(node);
      if (index !== -1) {
        headNodes.splice(index, 1);
      }
      node.parentNode = null;
      return node;
    }
  };

  function appendInitialNode(tagName, attrs, textContent) {
    const node = createNode(tagName);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (textContent) node.textContent = textContent;
    head.appendChild(node);
    return node;
  }

  appendInitialNode("meta", { name: "description", content: spec.description || "" });
  appendInitialNode("meta", { property: "og:title", content: spec.ogTitle || spec.title || "" });
  appendInitialNode("meta", { property: "og:description", content: spec.ogDescription || spec.description || "" });
  appendInitialNode("meta", { property: "og:url", content: spec.canonical || "" });
  appendInitialNode("meta", { property: "og:type", content: spec.ogType || "website" });
  appendInitialNode("meta", { property: "og:image", content: spec.ogImage || DEFAULT_OG_IMAGE });
  appendInitialNode("link", { rel: "canonical", href: spec.canonical || "" });

  const body = {
    dataset: dataset,
    scrollHeight: 4200,
    classList: {
      add() {},
      remove() {},
      toggle() {}
    },
    appendChild(node) {
      node.parentNode = body;
      bodyNodes.push(node);
      return node;
    },
    removeChild(node) {
      const index = bodyNodes.indexOf(node);
      if (index !== -1) {
        bodyNodes.splice(index, 1);
      }
      node.parentNode = null;
      return node;
    }
  };

  const document = {
    title: spec.title || "",
    documentElement: createNode("html"),
    head: head,
    body: body,
    createElement(tagName) {
      return createNode(tagName);
    },
    getElementById(id) {
      return id === "app" ? app : null;
    },
    querySelector(selector) {
      return headNodes.find((node) => selectorMatches(node, selector)) || null;
    },
    querySelectorAll(selector) {
      return headNodes.filter((node) => selectorMatches(node, selector));
    }
  };

  const windowObject = {
    document: document,
    location: {
      href: spec.canonical || SITE_URL,
      search: spec.search || ""
    },
    innerHeight: 900,
    scrollY: 0,
    addEventListener() {},
    removeEventListener() {},
    OndeCortarCommerce: data
  };

  const context = {
    window: windowObject,
    document: document,
    console: console,
    URL: URL,
    URLSearchParams: URLSearchParams
  };

  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "commerce.js"), "utf8"), context, { filename: "commerce.js" });

  return {
    appHtml: app.innerHTML,
    title: document.title || spec.title,
    description: (document.querySelector('meta[name="description"]') || {}).attributes?.content || spec.description || "",
    canonical: (document.querySelector('link[rel="canonical"]') || {}).attributes?.href || spec.canonical || "",
    ogTitle: (document.querySelector('meta[property="og:title"]') || {}).attributes?.content || spec.ogTitle || spec.title || "",
    ogDescription: (document.querySelector('meta[property="og:description"]') || {}).attributes?.content || spec.ogDescription || spec.description || "",
    ogUrl: (document.querySelector('meta[property="og:url"]') || {}).attributes?.content || spec.canonical || "",
    ogType: (document.querySelector('meta[property="og:type"]') || {}).attributes?.content || spec.ogType || "website",
    ogImage: (document.querySelector('meta[property="og:image"]') || {}).attributes?.content || spec.ogImage || DEFAULT_OG_IMAGE,
    structuredData: document.querySelectorAll('script[data-ondecortar-ld]').map((node) => node.textContent)
  };
}

function renderStaticPage(spec, data) {
  const rendered = createSandbox(spec, data);
  const structuredDataItems = rendered.structuredData.length
    ? rendered.structuredData
    : (spec.structuredData || []).map((item) => JSON.stringify(item));
  const structuredData = structuredDataItems.length
    ? "\n" + structuredDataItems.map((item) => `  <script type="application/ld+json" data-ondecortar-ld="true">${item}</script>`).join("\n")
    : "";

  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#516255" />
  <meta http-equiv="content-language" content="pt-PT" />
  <meta name="google" content="notranslate" />
  <title>${escapeHtml(rendered.title)}</title>
  <meta name="description" content="${escapeHtml(rendered.description)}" />
  <link rel="canonical" href="${escapeHtml(rendered.canonical)}" />
  <link rel="icon" href="${escapeHtml(spec.assetPrefix)}favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="${escapeHtml(spec.assetPrefix)}apple-touch-icon.png" />
  <meta property="og:title" content="${escapeHtml(rendered.ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(rendered.ogDescription)}" />
  <meta property="og:url" content="${escapeHtml(rendered.ogUrl)}" />
  <meta property="og:type" content="${escapeHtml(rendered.ogType)}" />
  <meta property="og:image" content="${escapeHtml(rendered.ogImage)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${escapeHtml(spec.assetPrefix)}commerce.css" />${structuredData}
</head>
<body${Object.entries(spec.bodyAttrs || {}).map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join("")}>
  <div id="app" class="page-shell">${rendered.appHtml}</div>
${NAV_SCRIPT}
</body>
</html>
`;
}

function buildRedirectPage(options) {
  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.title)}</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="${escapeHtml(options.canonical)}" />
  <meta http-equiv="refresh" content="0; url=${escapeHtml(options.target)}" />
  <script>
    window.location.replace(${JSON.stringify(options.target)});
  </script>
</head>
<body>
  <p>${escapeHtml(options.copy)} <a href="${escapeHtml(options.target)}">${escapeHtml(options.targetLabel || options.target)}</a>.</p>
</body>
</html>
`;
}

function buildProductRedirectPage() {
  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirecionar produto | OndeCortar.pt</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="${SITE_URL}loja/" />
  <script>
    (function() {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get("slug");
      if (slug) {
        window.location.replace("${SITE_URL}produto/" + encodeURIComponent(slug) + "/");
      }
    })();
  </script>
</head>
<body>
  <p>Este link de produto mudou. <a id="produto-fallback" href="${SITE_URL}loja/">Ir para a loja</a>.</p>
  <script>
    (function() {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get("slug");
      if (!slug) return;
      var target = "${SITE_URL}produto/" + encodeURIComponent(slug) + "/";
      var link = document.getElementById("produto-fallback");
      if (link) {
        link.href = target;
        link.textContent = target;
      }
    })();
  </script>
</body>
</html>
`;
}

function buildSitemap(entries) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">'];
  entries.forEach((entry) => {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeHtml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod || TODAY}</lastmod>`);
    lines.push("  </url>");
  });
  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}

function coreArticles(data) {
  const list = (data.articles || []).filter((item) => item.series === "core-2026");
  return list.length ? list : (data.articles || []);
}

function main() {
  const data = loadCommerceData();
  const categories = data.categories || [];
  const hubs = data.hubs || [];
  const articles = data.articles || [];
  const products = data.products || [];
  const productMap = new Map(products.map((item) => [item.slug, item]));
  const categoryMap = new Map(categories.map((item) => [item.slug, item]));
  const hubMap = new Map(hubs.map((item) => [item.slug, item]));

  writeFile(
    "loja.html",
    buildRedirectPage({
      title: "Redirecionar | Loja OndeCortar",
      canonical: SITE_URL + "loja/",
      target: SITE_URL + "loja/",
      copy: "A loja mudou para",
      targetLabel: "/loja/"
    })
  );

  writeFile("produto.html", buildProductRedirectPage());

  writeFile(
    path.join("loja", "index.html"),
    renderStaticPage(
        {
          title: "Loja OndeCortar | Produtos de barbearia escolhidos com critério",
          description: "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.",
        canonical: SITE_URL + "loja/",
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Loja OndeCortar",
            "description": "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.",
            "url": SITE_URL + "loja/"
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Produtos em destaque da Loja OndeCortar",
            "itemListElement": (data.featuredPicks || []).map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": SITE_URL + "produto/" + item.product + "/",
              "name": productMap.get(item.product) ? productMap.get(item.product).name : item.product
            }))
          }
        ],
        assetPrefix: "../",
        bodyAttrs: {
          "data-page": "store",
          "data-root": "../"
        }
      },
      data
    )
  );

  writeFile(
    path.join("revista", "index.html"),
    renderStaticPage(
      {
        title: "Revista OndeCortar | Guias de compra, comparações e artigos para escolher melhor",
        description: "Revista OndeCortar com guias de compra, comparações e artigos práticos ligados às categorias da loja.",
        canonical: SITE_URL + "revista/",
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Revista OndeCortar",
            "description": "Revista OndeCortar com guias de compra, comparações e artigos práticos ligados às categorias da loja.",
            "url": SITE_URL + "revista/"
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Artigos em destaque da Revista OndeCortar",
            "itemListElement": coreArticles(data).map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": SITE_URL + "revista/" + article.slug + "/",
              "name": article.title
            }))
          }
        ],
        assetPrefix: "../",
        bodyAttrs: {
          "data-page": "magazine",
          "data-root": "../"
        }
      },
      data
    )
  );

  categories.forEach((category) => {
    writeFile(
      path.join("loja", category.slug, "index.html"),
      renderStaticPage(
        {
          title: `Recomendações de ${category.title} | OndeCortar.pt`,
          description: `Compara ${category.title.toLowerCase()} com mais critério. Vê produtos recomendados, contexto de compra e ligações úteis.`,
          canonical: SITE_URL + "loja/" + category.slug + "/",
          ogType: "website",
          ogImage: DEFAULT_OG_IMAGE,
          structuredData: [
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": category.title,
              "description": category.intro,
              "url": SITE_URL + "loja/" + category.slug + "/"
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Loja", "item": SITE_URL + "loja/" },
                { "@type": "ListItem", "position": 2, "name": category.title, "item": SITE_URL + "loja/" + category.slug + "/" }
              ]
            }
          ].concat((category.faqs || []).length ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": category.faqs.map((item) => ({
              "@type": "Question",
              "name": item[0],
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item[1]
              }
            }))
          }] : []),
          assetPrefix: "../../",
          bodyAttrs: {
            "data-page": "category",
            "data-slug": category.slug,
            "data-root": "../../"
          }
        },
        data
      )
    );
  });

  hubs.forEach((hub) => {
    writeFile(
      path.join("revista", hub.slug, "index.html"),
      renderStaticPage(
        {
          title: `${hub.title} | Revista OndeCortar`,
          description: hub.intro,
          canonical: SITE_URL + "revista/" + hub.slug + "/",
          ogType: "website",
          ogImage: DEFAULT_OG_IMAGE,
          structuredData: [
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": hub.title,
              "description": hub.intro,
              "url": SITE_URL + "revista/" + hub.slug + "/"
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Revista", "item": SITE_URL + "revista/" },
                { "@type": "ListItem", "position": 2, "name": hub.title, "item": SITE_URL + "revista/" + hub.slug + "/" }
              ]
            }
          ],
          assetPrefix: "../../",
          bodyAttrs: {
            "data-page": "hub",
            "data-slug": hub.slug,
            "data-root": "../../"
          }
        },
        data
      )
    );
  });

  articles.forEach((article) => {
    const metaTitle = article.metaTitle || `${article.title} | Revista OndeCortar`;
    const metaDescription = article.metaDescription || article.excerpt || article.intro;
    const hub = hubMap.get(article.hub);
    const publishedDate = article.datePublished || null;
    const updatedDate = article.dateModified || article.datePublished || null;
    writeFile(
      path.join("revista", article.slug, "index.html"),
      renderStaticPage(
        {
          title: metaTitle,
          description: metaDescription,
          canonical: SITE_URL + "revista/" + article.slug + "/",
          ogTitle: article.ogTitle || article.title,
          ogDescription: article.ogDescription || metaDescription,
          ogType: "article",
          ogImage: absoluteUrl(article.ogImage || DEFAULT_OG_IMAGE),
          structuredData: [
            {
              "@context": "https://schema.org",
              "@type": ["Article", "BlogPosting"],
              "headline": article.title,
              "description": metaDescription,
              "mainEntityOfPage": SITE_URL + "revista/" + article.slug + "/",
              "datePublished": publishedDate,
              "dateModified": updatedDate,
              "author": {
                "@type": "Organization",
                "name": "OndeCortar.pt",
                "url": SITE_URL
              },
              "publisher": {
                "@type": "Organization",
                "name": "OndeCortar.pt",
                "url": SITE_URL
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Revista", "item": SITE_URL + "revista/" },
                { "@type": "ListItem", "position": 2, "name": hub ? hub.title : "Revista", "item": hub ? (SITE_URL + "revista/" + article.hub + "/") : (SITE_URL + "revista/") },
                { "@type": "ListItem", "position": 3, "name": article.title, "item": SITE_URL + "revista/" + article.slug + "/" }
              ]
            }
          ].concat((article.faqs || []).length ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": article.faqs.map((item) => ({
              "@type": "Question",
              "name": item[0],
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item[1]
              }
            }))
          }] : []),
          assetPrefix: "../../",
          bodyAttrs: {
            "data-page": "article",
            "data-slug": article.slug,
            "data-root": "../../"
          }
        },
        data
      )
    );
  });

  products.forEach((product) => {
    const primaryCategory = product.categories && product.categories[0] ? categoryMap.get(product.categories[0]) : null;
    writeFile(
      path.join("produto", product.slug, "index.html"),
      renderStaticPage(
        {
          title: `${product.name} | Recomendação OndeCortar`,
          description: product.summary,
          canonical: SITE_URL + "produto/" + product.slug + "/",
          ogTitle: product.name,
          ogDescription: product.summary,
          ogType: "website",
          ogImage: absoluteUrl(product.image),
          structuredData: [
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.summary,
              "image": absoluteUrl(product.image),
              "url": SITE_URL + "produto/" + product.slug + "/",
              "category": (product.categories || []).map((item) => categoryMap.get(item) ? categoryMap.get(item).title : item).join(", ")
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Loja", "item": SITE_URL + "loja/" },
                { "@type": "ListItem", "position": 2, "name": primaryCategory ? primaryCategory.title : "Produtos", "item": primaryCategory ? (SITE_URL + "loja/" + primaryCategory.slug + "/") : (SITE_URL + "loja/") },
                { "@type": "ListItem", "position": 3, "name": product.name, "item": SITE_URL + "produto/" + product.slug + "/" }
              ]
            }
          ],
          assetPrefix: "../../",
          bodyAttrs: {
            "data-page": "product",
            "data-slug": product.slug,
            "data-root": "../../"
          }
        },
        data
      )
    );
  });

  const sitemapEntries = [
    { loc: SITE_URL + "loja/", lastmod: TODAY },
    ...categories.map((category) => ({
      loc: SITE_URL + "loja/" + category.slug + "/",
      lastmod: TODAY
    })),
    ...products.map((product) => ({
      loc: SITE_URL + "produto/" + product.slug + "/",
      lastmod: TODAY
    }))
  ];

  const magazineEntries = [
    { loc: SITE_URL + "revista/", lastmod: TODAY },
    ...hubs.map((hub) => ({
      loc: SITE_URL + "revista/" + hub.slug + "/",
      lastmod: TODAY
    })),
    ...articles.map((article) => ({
      loc: SITE_URL + "revista/" + article.slug + "/",
      lastmod: TODAY
    }))
  ];

  writeFile("sitemap-loja.xml", buildSitemap(sitemapEntries));
  writeFile("sitemap-revista.xml", buildSitemap(magazineEntries));

  console.log(
    JSON.stringify(
      {
        version: VERSION,
        categories: categories.length,
        hubs: hubs.length,
        articles: articles.length,
        products: products.length,
        sitemapLojaEntries: sitemapEntries.length,
        sitemapRevistaEntries: magazineEntries.length
      },
      null,
      2
    )
  );
}

main();
