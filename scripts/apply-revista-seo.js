// Aplica melhorias de SEO nos HTML estáticos de revista/ (hub, categorias e artigos).
//
// Contexto: as páginas da revista são HTML manual (não geridas pelo build principal) e o
// sync-commerce-static.js NÃO pode ser corrido (destruiria conteúdo enriquecido à mão).
// Este script aplica metadados em falta diretamente nos ficheiros. É idempotente — pode
// correr-se várias vezes sem duplicar nada.
//
// O que faz:
//   1. Acrescenta <meta name="twitter:card" content="summary_large_image">.
//   2. Acrescenta og:site_name e og:locale (pt_PT).
//   3. Nos artigos, acrescenta article:published_time / article:modified_time a partir
//      do datePublished/dateModified do JSON-LD Article.
//   4. Nos artigos, troca o og:image genérico (banner.jpg) pela primeira imagem de produto
//      do próprio artigo e acrescenta o campo "image" ao JSON-LD Article (Google Discover
//      exige imagem no schema).
//   5. Envolve a data visível "Publicado em ..." num <time datetime="..."> para alinhar
//      a data visível com o schema.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://ondecortar.pt/";
const GENERIC_OG_IMAGE = "https://ondecortar.pt/imagens/banner.jpg";

function listPages(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  const out = [];
  (function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") out.push(full);
    }
  })(base);
  return out;
}

// Extrai e altera o bloco JSON-LD do Article; devolve null se a página não for artigo.
function parseArticleLd(html) {
  const re = /<script type="application\/ld\+json" data-ondecortar-ld="true">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      const types = [].concat(data["@type"] || []);
      if (types.includes("Article") || types.includes("BlogPosting")) {
        return { raw: match[1], data };
      }
    } catch {
      /* bloco não-JSON: ignorar */
    }
  }
  return null;
}

// Primeira imagem local do conteúdo do artigo (fotos de produto), em URL absoluto.
// Ignora tudo a partir de "Artigos relacionados" — as thumbnails dos relacionados
// pertencem a outros artigos e não representam esta página.
function firstContentImage(html) {
  const relatedIdx = html.indexOf("<h2>Artigos relacionados</h2>");
  if (relatedIdx !== -1) html = html.slice(0, relatedIdx);
  const re = /<img[^>]*src="((?:\.\.\/)+imagens\/produtos\/[^"]+)"[^>]*>/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    const src = match[1];
    if (src.endsWith(".svg")) continue; // placeholders não servem para partilha
    return SITE_URL + src.replace(/^(\.\.\/)+/, "");
  }
  return null;
}

const MESES = {
  "01": "janeiro", "02": "fevereiro", "03": "março", "04": "abril",
  "05": "maio", "06": "junho", "07": "julho", "08": "agosto",
  "09": "setembro", "10": "outubro", "11": "novembro", "12": "dezembro",
};

function dataPorExtenso(iso) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d || !MESES[m]) return null;
  return `${Number(d)} de ${MESES[m]} de ${y}`;
}

function main() {
  const stats = { files: 0, twitter: 0, siteName: 0, articleMeta: 0, ogImage: 0, ldImage: 0, time: 0 };

  for (const file of listPages("revista")) {
    const original = fs.readFileSync(file, "utf8");
    let html = original;
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");

    const ogImageTag = html.match(/<meta property="og:image" content="([^"]+)" \/>/);
    if (!ogImageTag) {
      console.warn(`AVISO: ${rel} sem og:image — página ignorada.`);
      continue;
    }

    const article = parseArticleLd(html);
    const contentImage = article ? firstContentImage(html) : null;
    const pageImage =
      ogImageTag[1] !== GENERIC_OG_IMAGE ? ogImageTag[1] : contentImage || ogImageTag[1];

    // 4a. og:image específico do artigo em vez do banner genérico
    if (article && pageImage !== ogImageTag[1]) {
      html = html.replace(ogImageTag[0], `<meta property="og:image" content="${pageImage}" />`);
      stats.ogImage += 1;
    }

    // 2. og:site_name + og:locale
    if (!html.includes('property="og:site_name"')) {
      html = html.replace(
        /(<meta property="og:image" content="[^"]+" \/>)/,
        `$1\n  <meta property="og:site_name" content="OndeCortar.pt" />\n  <meta property="og:locale" content="pt_PT" />`
      );
      stats.siteName += 1;
    }

    // 1. twitter:card
    if (!html.includes('name="twitter:card"')) {
      html = html.replace(
        /(<meta property="og:locale" content="pt_PT" \/>)/,
        `$1\n  <meta name="twitter:card" content="summary_large_image" />`
      );
      stats.twitter += 1;
    }

    if (article) {
      const { datePublished, dateModified } = article.data;

      // 3. article:published_time / article:modified_time
      if (datePublished && !html.includes('property="article:published_time"')) {
        html = html.replace(
          /(<meta name="twitter:card" content="summary_large_image" \/>)/,
          `$1\n  <meta property="article:published_time" content="${datePublished}" />\n  <meta property="article:modified_time" content="${dateModified || datePublished}" />`
        );
        stats.articleMeta += 1;
      }

      // 4b. campo image no JSON-LD Article
      if (!article.data.image && pageImage) {
        const updated = { ...article.data };
        // manter a ordem: inserir image logo após description
        const ordered = {};
        for (const key of Object.keys(updated)) {
          ordered[key] = updated[key];
          if (key === "description") ordered.image = pageImage;
        }
        if (!ordered.image) ordered.image = pageImage;
        html = html.replace(article.raw, JSON.stringify(ordered));
        stats.ldImage += 1;
      }

      // 5. <time datetime> na data visível
      if (datePublished && !html.includes("<time datetime=")) {
        const extenso = dataPorExtenso(datePublished);
        if (extenso) {
          const alvo = `<span>Publicado em ${extenso}</span>`;
          const novo = `<span>Publicado em <time datetime="${datePublished}">${extenso}</time></span>`;
          if (html.includes(alvo)) {
            html = html.replace(alvo, novo);
            stats.time += 1;
          } else {
            console.warn(`AVISO: ${rel} — data visível não encontrada ("${extenso}").`);
          }
        }
      }
    }

    if (html !== original) {
      fs.writeFileSync(file, html);
      stats.files += 1;
      console.log(`Atualizado: ${rel}`);
    }
  }

  console.log("\nResumo:", stats);
}

main();
