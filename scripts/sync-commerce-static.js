const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const VERSION = "20260403-shop-10";
const TODAY = "2026-04-03";
const DEFAULT_OG_IMAGE = "https://ondecortar.pt/imagens/banner.jpg";

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

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function writeFile(relativePath, contents) {
  const target = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, "utf8");
}

function buildPageHtml(options) {
  const {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogType,
    ogImage,
    stylesheetPath,
    bodyAttrs,
    scriptBase
  } = options;

  const attrs = Object.entries(bodyAttrs)
    .map(([key, value]) => ` ${key}="${escapeHtml(value)}"`)
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#516255" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <link rel="icon" href="${escapeHtml(scriptBase)}favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="${escapeHtml(scriptBase)}apple-touch-icon.png" />
  <meta property="og:title" content="${escapeHtml(ogTitle || title)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription || description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${escapeHtml(ogType || "website")}" />
  <meta property="og:image" content="${escapeHtml(ogImage || DEFAULT_OG_IMAGE)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${escapeHtml(stylesheetPath)}?v=${VERSION}" />
</head>
<body${attrs}>
  <div id="app" class="page-shell"></div>
  <script src="${escapeHtml(scriptBase)}commerce-products-a.js?v=${VERSION}"></script>
  <script src="${escapeHtml(scriptBase)}commerce-products-b.js?v=${VERSION}"></script>
  <script src="${escapeHtml(scriptBase)}commerce-taxonomy.js?v=${VERSION}"></script>
  <script src="${escapeHtml(scriptBase)}commerce-articles.js?v=${VERSION}"></script>
  <script src="${escapeHtml(scriptBase)}commerce.js?v=${VERSION}"></script>
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
    lines.push(`    <priority>${entry.priority}</priority>`);
    lines.push("  </url>");
  });

  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}

function main() {
  const data = loadCommerceData();
  const categories = data.categories || [];
  const hubs = data.hubs || [];
  const articles = data.articles || [];

  writeFile(
    "loja.html",
    buildPageHtml({
      title: "Loja OndeCortar | Produtos de barbearia escolhidos com critério",
      description: "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.",
      canonical: "https://ondecortar.pt/loja/",
      ogType: "website",
      stylesheetPath: "commerce.css",
      scriptBase: "",
      bodyAttrs: {
        "data-page": "store",
        "data-root": ""
      }
    })
  );

  writeFile(
    "loja/index.html",
    buildPageHtml({
      title: "Loja OndeCortar | Produtos de barbearia escolhidos com critério",
      description: "Loja OndeCortar com máquinas, kits, navalhas e acessórios recomendados.",
      canonical: "https://ondecortar.pt/loja/",
      ogType: "website",
      stylesheetPath: "../commerce.css",
      scriptBase: "../",
      bodyAttrs: {
        "data-page": "store",
        "data-root": "../"
      }
    })
  );

  writeFile(
    "revista/index.html",
    buildPageHtml({
      title: "Revista OndeCortar | Guias de compra, comparações e artigos para escolher melhor",
      description: "Revista OndeCortar com guias de compra, comparações e artigos práticos ligados às categorias da loja.",
      canonical: "https://ondecortar.pt/revista/",
      ogType: "website",
      stylesheetPath: "../commerce.css",
      scriptBase: "../",
      bodyAttrs: {
        "data-page": "magazine",
        "data-root": "../"
      }
    })
  );

  writeFile(
    "produto.html",
    buildPageHtml({
      title: "Produto | OndeCortar.pt",
      description: "Página de produto recomendada na loja editorial do OndeCortar.",
      canonical: "https://ondecortar.pt/produto.html",
      ogType: "website",
      stylesheetPath: "commerce.css",
      scriptBase: "",
      bodyAttrs: {
        "data-page": "product",
        "data-root": ""
      }
    })
  );

  categories.forEach((category) => {
    writeFile(
      path.join("loja", category.slug, "index.html"),
      buildPageHtml({
        title: `${category.title} | Loja OndeCortar`,
        description: category.intro,
        canonical: `https://ondecortar.pt/loja/${category.slug}/`,
        ogType: "website",
        stylesheetPath: "../../commerce.css",
        scriptBase: "../../",
        bodyAttrs: {
          "data-page": "category",
          "data-slug": category.slug,
          "data-root": "../../"
        }
      })
    );
  });

  hubs.forEach((hub) => {
    writeFile(
      path.join("revista", hub.slug, "index.html"),
      buildPageHtml({
        title: `${hub.title} | Revista OndeCortar`,
        description: hub.intro,
        canonical: `https://ondecortar.pt/revista/${hub.slug}/`,
        ogType: "website",
        stylesheetPath: "../../commerce.css",
        scriptBase: "../../",
        bodyAttrs: {
          "data-page": "hub",
          "data-slug": hub.slug,
          "data-root": "../../"
        }
      })
    );
  });

  articles.forEach((article) => {
    const metaTitle = article.metaTitle || `${article.title} | Revista OndeCortar`;
    const metaDescription = article.metaDescription || article.excerpt || article.intro;
    writeFile(
      path.join("revista", article.slug, "index.html"),
      buildPageHtml({
        title: metaTitle,
        description: metaDescription,
        canonical: `https://ondecortar.pt/revista/${article.slug}/`,
        ogTitle: article.ogTitle || article.title,
        ogDescription: article.ogDescription || metaDescription,
        ogType: "article",
        ogImage: article.ogImage || DEFAULT_OG_IMAGE,
        stylesheetPath: "../../commerce.css",
        scriptBase: "../../",
        bodyAttrs: {
          "data-page": "article",
          "data-slug": article.slug,
          "data-root": "../../"
        }
      })
    );
  });

  const sitemapEntries = [
    { loc: "https://ondecortar.pt/", priority: "1.0" },
    { loc: "https://ondecortar.pt/anunciar.html", priority: "0.4" },
    { loc: "https://ondecortar.pt/registar.html", priority: "0.5" },
    { loc: "https://ondecortar.pt/loja.html", priority: "0.9" },
    { loc: "https://ondecortar.pt/loja/", priority: "0.9" },
    { loc: "https://ondecortar.pt/revista/", priority: "0.9" },
    { loc: "https://ondecortar.pt/produto.html", priority: "0.5" },
    ...categories.map((category) => ({
      loc: `https://ondecortar.pt/loja/${category.slug}/`,
      priority: "0.8"
    })),
    ...hubs.map((hub) => ({
      loc: `https://ondecortar.pt/revista/${hub.slug}/`,
      priority: hub.legacy ? "0.6" : "0.7"
    })),
    ...articles.map((article) => ({
      loc: `https://ondecortar.pt/revista/${article.slug}/`,
      priority: "0.8"
    })),
    { loc: "https://ondecortar.pt/maquinas.html", priority: "0.9" },
    { loc: "https://ondecortar.pt/kits.html", priority: "0.8" },
    { loc: "https://ondecortar.pt/cremes.html", priority: "0.8" },
    { loc: "https://ondecortar.pt/navalhas.html", priority: "0.8" },
    { loc: "https://ondecortar.pt/escovas.html", priority: "0.8" },
    { loc: "https://ondecortar.pt/acessorios.html", priority: "0.8" },
    { loc: "https://ondecortar.pt/faq.html", priority: "0.6" },
    { loc: "https://ondecortar.pt/privacidade.html", priority: "0.2" }
  ];

  writeFile("sitemap.xml", buildSitemap(sitemapEntries));

  console.log(
    JSON.stringify(
      {
        version: VERSION,
        categories: categories.length,
        hubs: hubs.length,
        articles: articles.length,
        sitemapEntries: sitemapEntries.length
      },
      null,
      2
    )
  );
}

main();
