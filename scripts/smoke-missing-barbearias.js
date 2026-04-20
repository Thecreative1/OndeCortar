const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_DATASET = path.join("Barbeiros", "barbearias.limpo.js");
const BARBEARIAS_DIR = path.join(ROOT, "barbearias");
const SITEMAP_PATH = path.join(ROOT, "sitemap-barbearias.xml");

function loadDataset(filePath) {
  const resolved = path.resolve(ROOT, filePath || DEFAULT_DATASET);
  const source = fs.readFileSync(resolved, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    source +
      "\nthis.__dataset = typeof barbearias !== 'undefined' ? barbearias : (typeof barbeariasPorValidar !== 'undefined' ? barbeariasPorValidar : null);",
    context
  );

  if (Array.isArray(context.__dataset)) {
    return context.__dataset;
  }

  throw new Error("Nao foi possivel carregar um array de barbearias em " + resolved);
}

function uniq(list) {
  return Array.from(new Set(list));
}

function diff(left, right) {
  const rightSet = right instanceof Set ? right : new Set(right);
  return Array.from(left).filter((item) => !rightSet.has(item));
}

function countDuplicates(items) {
  const counts = new Map();
  items.forEach((item) => {
    const key = String(item || "");
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([value, count]) => ({ value, count }));
}

function listBarbeariasDirs() {
  if (!fs.existsSync(BARBEARIAS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BARBEARIAS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function buildDirIndexMap(dirSlugs) {
  const missingIndex = [];
  const withIndex = [];

  dirSlugs.forEach((slug) => {
    const indexPath = path.join(BARBEARIAS_DIR, slug, "index.html");
    if (fs.existsSync(indexPath)) {
      withIndex.push(slug);
    } else {
      missingIndex.push(slug);
    }
  });

  return {
    withIndex: new Set(withIndex),
    missingIndex
  };
}

function parseSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    return new Map();
  }

  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const blocks = xml.split(/<url>\s*/).slice(1);
  const entries = new Map();

  blocks.forEach((block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/i);
    if (!locMatch) return;
    const loc = String(locMatch[1] || "").trim();
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/i);
    const lastmod = lastmodMatch ? String(lastmodMatch[1] || "").trim() : "";

    let slug = "";
    try {
      const url = new URL(loc);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "barbearias" && parts[1]) {
        slug = parts[1];
      }
    } catch {
      slug = "";
    }

    if (slug) {
      entries.set(slug, { loc, lastmod });
    }
  });

  return entries;
}

function main() {
  const dataset = loadDataset(process.argv[2]);
  const publicBarbers = utils.obterBarbeariasPublicas(dataset);
  const publicSlugs = publicBarbers.map((item) => (item ? item.slug : "")).filter(Boolean);
  const duplicates = countDuplicates(publicSlugs);

  const datasetSet = new Set(publicSlugs);
  const dirSlugs = listBarbeariasDirs();
  const dirInfo = buildDirIndexMap(dirSlugs);

  const sitemapEntries = parseSitemap();
  const sitemapSet = new Set(sitemapEntries.keys());

  const missingInDir = diff(datasetSet, dirInfo.withIndex);
  const missingInSitemap = diff(datasetSet, sitemapSet);
  const sitemapMissingDir = diff(sitemapSet, dirInfo.withIndex);
  const orphanDirs = diff(dirInfo.withIndex, datasetSet);
  const orphanSitemap = diff(sitemapSet, datasetSet);

  const datasetLastmod = new Map(
    publicBarbers
      .filter((item) => item && item.slug)
      .map((item) => [item.slug, String(item.ultima_validacao || "").trim()])
  );

  const lastmodMismatch = [];
  sitemapEntries.forEach((entry, slug) => {
    if (!datasetLastmod.has(slug)) return;
    const expected = datasetLastmod.get(slug) || "";
    if (!expected) return;
    if (entry.lastmod && entry.lastmod !== expected) {
      lastmodMismatch.push({
        slug,
        expected,
        sitemap: entry.lastmod
      });
    }
  });

  console.log("Smoke test: barbearias publicas");
  console.log("===============================");
  console.log("Dataset (mostrar_no_mapa=true): " + publicSlugs.length);
  console.log("Pastas em /barbearias:          " + dirSlugs.length);
  console.log("Paginas com index.html:         " + dirInfo.withIndex.size);
  console.log("Entradas no sitemap:            " + sitemapEntries.size);
  console.log("Slugs duplicados no dataset:    " + duplicates.length);
  console.log("");

  const errors = [];
  const warnings = [];

  if (duplicates.length) {
    errors.push("Dataset tem slugs duplicados: " + duplicates.map((item) => item.value + " (" + item.count + "x)").join(", "));
  }

  if (dirInfo.missingIndex.length) {
    errors.push("Pastas sem index.html: " + dirInfo.missingIndex.length);
  }

  if (missingInDir.length) {
    errors.push("Barbearias publicas sem pagina em /barbearias: " + missingInDir.length);
  }

  if (missingInSitemap.length) {
    errors.push("Barbearias publicas ausentes do sitemap: " + missingInSitemap.length);
  }

  if (sitemapMissingDir.length) {
    errors.push("Sitemap aponta para paginas inexistentes em /barbearias: " + sitemapMissingDir.length);
  }

  if (orphanDirs.length) {
    warnings.push("Paginas em /barbearias que nao estao no dataset publico: " + orphanDirs.length);
  }

  if (orphanSitemap.length) {
    warnings.push("Entradas no sitemap que nao estao no dataset publico: " + orphanSitemap.length);
  }

  if (lastmodMismatch.length) {
    warnings.push("lastmod no sitemap difere de ultima_validacao: " + lastmodMismatch.length);
  }

  if (errors.length) {
    console.log("Erros:");
    errors.forEach((line) => console.log("- " + line));
  }

  if (warnings.length) {
    console.log("\nWarnings:");
    warnings.forEach((line) => console.log("- " + line));
  }

  function printList(title, items, limit) {
    if (!items.length) return;
    console.log("\n" + title + " (" + items.length + "):");
    items.slice(0, limit).forEach((item) => console.log("- " + item));
    if (items.length > limit) {
      console.log("- ... (" + (items.length - limit) + " mais)");
    }
  }

  printList("Pastas sem index.html", dirInfo.missingIndex, 50);
  printList("Sem pagina em /barbearias", missingInDir, 50);
  printList("Ausentes do sitemap", missingInSitemap, 50);
  printList("Sitemap sem pagina local", sitemapMissingDir, 50);

  if (lastmodMismatch.length) {
    console.log("\nlastmod divergente (ate 20):");
    lastmodMismatch.slice(0, 20).forEach((item) => {
      console.log("- " + item.slug + ": dataset=" + item.expected + " sitemap=" + item.sitemap);
    });
  }

  if (errors.length) {
    process.exitCode = 1;
  }
}

main();

