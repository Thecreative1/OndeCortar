// Reforça as ligações internas dos artigos da revista (HTML manual — ver apply-revista-seo.js).
//
// O que faz (idempotente):
//   1. Insere em cada artigo, antes do CTA final, um bloco de ponte para o directório de
//      barbearias (mapa + cidades principais), entre os markers OC-DIRECTORY-BRIDGE-START/END.
//   2. Completa as grelhas "Artigos relacionados" até 3 cartões, preferindo artigos da mesma
//      categoria (via BreadcrumbList). Cartões gerados levam data-oc-autorelated="true".

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REVISTA = path.join(ROOT, "revista");
const BRIDGE_START = "<!-- OC-DIRECTORY-BRIDGE-START -->";
const BRIDGE_END = "<!-- OC-DIRECTORY-BRIDGE-END -->";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listArticles() {
  const out = [];
  for (const entry of fs.readdirSync(REVISTA, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(REVISTA, entry.name, "index.html");
    if (fs.existsSync(file)) out.push({ slug: entry.name, file });
  }
  return out;
}

function grab(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

// Catálogo dos artigos (páginas com JSON-LD Article): título, descrição, categoria, imagem.
function buildCatalog(entries) {
  const catalog = [];
  for (const { slug, file } of entries) {
    const html = fs.readFileSync(file, "utf8");
    if (!/"@type":\["Article","BlogPosting"\]/.test(html)) continue;
    const title = (grab(html, /<title>([\s\S]*?)<\/title>/i) || "").replace(/\s*\|\s*Revista OndeCortar\s*$/, "");
    const desc = grab(html, /<meta name="description" content="([^"]*)"/i) || "";
    const ogImage = grab(html, /<meta property="og:image" content="([^"]+)"/i) || "";
    const breadcrumb = grab(html, /"BreadcrumbList"[\s\S]*?"position":2,"name":"([^"]+)"/) || "Revista";
    catalog.push({ slug, file, html, title, desc, ogImage, category: breadcrumb });
  }
  return catalog;
}

function bridgeHtml() {
  return (
    `${BRIDGE_START}<section class="section"><div class="container callout-card article-directory-bridge">` +
    `<span class="eyebrow">Directório OndeCortar</span><h2>Precisas de um profissional?</h2>` +
    `<p>Há coisas que compensa deixar nas mãos de um barbeiro. Encontra uma barbearia perto de ti no nosso mapa — com morada, contactos e horários verificados.</p>` +
    `<div class="hero-actions"><a class="btn btn-primary" href="../../index.html#explorar">Ver mapa de barbearias</a>` +
    `<a class="btn btn-secondary" href="../../cidades/">Procurar por cidade</a></div>` +
    `<p class="article-directory-cities">Cidades mais procuradas: <a href="../../cidades/lisboa/">Lisboa</a>, ` +
    `<a href="../../cidades/porto/">Porto</a>, <a href="../../cidades/braga/">Braga</a>, ` +
    `<a href="../../cidades/coimbra/">Coimbra</a> e <a href="../../cidades/faro/">Faro</a>.</p>` +
    `</div></section>${BRIDGE_END}`
  );
}

// Cartão de artigo relacionado no mesmo formato dos existentes.
function relatedCard(article) {
  const img = article.ogImage.replace("https://ondecortar.pt/", "../../");
  return (
    `<article class="article-card" data-oc-autorelated="true">` +
    `<a class="article-thumb article-thumb--product" href="../../revista/${article.slug}/">` +
    `<img src="${escapeHtml(img)}" alt="${escapeHtml(article.title)}" loading="lazy" /></a>` +
    `<div class="article-copy"><div class="meta-row"><span class="tag">${escapeHtml(article.category)}</span></div>` +
    `<h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(article.desc)}</p>` +
    `<div class="card-actions"><a class="btn btn-secondary btn-small" href="../../revista/${article.slug}/">Ler guia</a></div>` +
    `</div></article>`
  );
}

function main() {
  const catalog = buildCatalog(listArticles());
  const stats = { files: 0, bridges: 0, relatedAdded: 0 };

  for (const article of catalog) {
    let html = article.html;
    const rel = `revista/${article.slug}/index.html`;

    // 1. Ponte para o directório antes do CTA final
    if (!html.includes(BRIDGE_START)) {
      const finalCta = html.indexOf('<section class="section"><div class="container callout-card article-final-cta">');
      if (finalCta !== -1) {
        html = html.slice(0, finalCta) + bridgeHtml() + html.slice(finalCta);
        stats.bridges += 1;
      } else {
        console.warn(`AVISO: ${rel} sem CTA final — ponte não inserida.`);
      }
    }

    // 2. Completar "Artigos relacionados" até 3 cartões
    const headerIdx = html.indexOf("<h2>Artigos relacionados</h2>");
    const gridIdx = headerIdx === -1 ? -1 : html.indexOf('<div class="article-grid">', headerIdx);
    if (gridIdx !== -1) {
      const sectionEnd = html.indexOf("<section", gridIdx);
      const segment = html.slice(gridIdx, sectionEnd);
      const existing = segment.match(/<article class="article-card"/g) || [];
      const linked = [...segment.matchAll(/href="\.\.\/\.\.\/revista\/([^/"]+)\//g)].map((m) => m[1]);
      const missing = 3 - existing.length;
      if (missing > 0) {
        const exclude = new Set([article.slug, ...linked]);
        // rodar os candidatos consoante a posição do artigo, para espalhar os links
        // internos em vez de todos os artigos apontarem para os mesmos relacionados
        const rotate = (list, n) => (list.length ? [...list.slice(n % list.length), ...list.slice(0, n % list.length)] : list);
        const offset = catalog.indexOf(article);
        const sameCategory = rotate(catalog.filter((a) => !exclude.has(a.slug) && a.category === article.category), offset);
        const others = rotate(catalog.filter((a) => !exclude.has(a.slug) && a.category !== article.category), offset);
        const picks = [...sameCategory, ...others].slice(0, missing);
        if (picks.length) {
          const lastCard = segment.lastIndexOf("</article>");
          const insertAt = gridIdx + lastCard + "</article>".length;
          html = html.slice(0, insertAt) + picks.map(relatedCard).join("") + html.slice(insertAt);
          stats.relatedAdded += picks.length;
        }
      }
    } else {
      console.warn(`AVISO: ${rel} sem grelha de artigos relacionados.`);
    }

    if (html !== article.html) {
      fs.writeFileSync(article.file, html);
      stats.files += 1;
      console.log(`Atualizado: ${rel}`);
    }
  }

  console.log("\nResumo:", stats);
}

main();
