#!/usr/bin/env node
/**
 * audit-loja-revista.js — só leitura. Cruza a revista com a loja nos dois sentidos.
 *
 *   node scripts/audit-loja-revista.js            (relatório; falha só no aviso de afiliado)
 *   node scripts/audit-loja-revista.js --json
 *
 * ERRO (exit 1, corre no `npm test`):
 *   - página com link amazon.es/dp sem a frase "Como Afiliado da Amazon" (exigida pelo acordo
 *     Amazon Associates). Em 2026-10-13 faltava nos 28 artigos com bloco "Da nossa seleção".
 *
 * PISTAS (rever à mão, não falham):
 *   - artigo sem nenhum link para produto/ nem para uma categoria da loja, mas cujo texto fala
 *     de produtos que se compram (pomada, cera, creme, máquina…). Foi assim que se descobriu, a
 *     2026-10-13, que o artigo da pomada não tinha para onde ligar: a loja não tinha styling.
 *     Artigos de "Cultura de barbearia" (estilo-e-tendencias) sobre cortes/preços/barbearias
 *     ficam sem loja de propósito — o CTA é o diretório.
 *   - produto que nenhum artigo da revista liga (só se chega pela loja);
 *   - categoria da loja sem nenhum guia da revista ligado.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const dirs = (rel) => fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(ROOT, rel, d.name, "index.html"))).map((d) => d.name);

// Palavras de produto que, num artigo sem links para a loja, sugerem que falta ligar (ou que falta o produto na loja)
const PRODUCT_WORDS = /\b(pomadas?|ceras?|argilas?|gel|géis|cremes?|óleos?|bálsamos?|balms?|champôs?|shampoos?|máquinas?|aparadores?|lâminas?|navalhas?|pentes?|escovas?|tesouras?|leave-in|sérum|protetor solar)\b/gi;

const errors = [];
const articlesWithoutStore = [];

const sections = [["revista", dirs("revista")], ["produto", dirs("produto")], ["loja", dirs("loja")]];
const linkedProducts = new Set();
const linkedCategories = new Set();
// Páginas de loja que usam o modelo de categoria mas não são categorias de produto
const NOT_CATEGORIES = ["black-friday", "como-escolhemos"];
const categories = dirs("loja").filter((c) => !NOT_CATEGORIES.includes(c) && read("loja/" + c + "/index.html").includes('data-page="category"'));

sections.forEach(([base, list]) => list.forEach((slug) => {
  const rel = base + "/" + slug + "/index.html";
  const html = read(rel);
  if (/amazon\.es\/dp\//.test(html) && !html.includes("Como Afiliado da Amazon")) errors.push(rel + ": links Amazon sem o aviso \"Como Afiliado da Amazon\"");
  if (base !== "revista" || !html.includes('data-page="article"')) return;

  const products = [...new Set([...html.matchAll(/href="\.\.\/\.\.\/produto\/([^/"]+)\//g)].map((m) => m[1]))];
  const cats = [...new Set([...html.matchAll(/href="\.\.\/\.\.\/loja\/([^/"]+)\//g)].map((m) => m[1]))].filter((c) => categories.includes(c));
  products.forEach((p) => linkedProducts.add(p));
  cats.forEach((c) => linkedCategories.add(c));
  if (products.length || cats.length) return;

  const main = (html.match(/<main>([\s\S]*)<\/main>/) || [, ""])[1].replace(/<[^>]+>/g, " ");
  const words = (main.match(PRODUCT_WORDS) || []).map((w) => w.toLowerCase());
  const topic = (html.match(/href="\.\.\/\.\.\/revista\/([^/"]+)\/">[^<]*<\/a><\/div>/) || [, "?"])[1];
  if (words.length) articlesWithoutStore.push({ article: slug, topic, mentions: words.length, words: [...new Set(words)].slice(0, 8) });
}));

const orphanProducts = dirs("produto").filter((p) => !linkedProducts.has(p) && !read("produto/" + p + "/index.html").includes("OC-UNAVAILABLE"));
const categoriesWithoutGuide = categories.filter((c) => !/href="\.\.\/\.\.\/revista\/[^"]+\/"/.test(read("loja/" + c + "/index.html").replace(/href="\.\.\/\.\.\/revista\/"/g, "")));

const report = {
  errors,
  articlesWithoutStore: articlesWithoutStore.sort((a, b) => b.mentions - a.mentions),
  productsNotInAnyArticle: orphanProducts,
  categoriesWithoutGuide
};

if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
else {
  console.log("Loja × revista");
  console.log("==============");
  console.log("Erros (aviso de afiliado em falta): " + errors.length);
  errors.forEach((e) => console.log("  ✗ " + e));
  console.log("\nArtigos sem link para a loja que falam de produtos (" + articlesWithoutStore.length + ") — falta ligar, ou falta o produto na loja?");
  report.articlesWithoutStore.forEach((a) => console.log("  - " + a.article + " [" + a.topic + "] " + a.mentions + "× " + a.words.join(", ")));
  console.log("\nProdutos que nenhum artigo liga (" + orphanProducts.length + "):");
  console.log("  " + (orphanProducts.join(", ") || "—"));
  console.log("\nCategorias da loja sem guia da revista (" + categoriesWithoutGuide.length + "): " + (categoriesWithoutGuide.join(", ") || "—"));
}
process.exit(errors.length ? 1 : 0);
