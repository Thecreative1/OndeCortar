/**
 * apply-loja-novidades.js — idempotente.
 *
 *  1. Menu da loja (bloco OC-LOJA-ATALHOS): botões "Acessórios" e "Óleos e bálsamos"
 *     a seguir a "Manutenção", se ainda lá não estiverem.
 *  2. Secção "Novos na loja" em loja/index.html, logo a seguir a #mais-procurados
 *     (markers OC-LOJA-NOVIDADES-START/END), com o mesmo cartão (loja-feat-card)
 *     e um link para o guia da revista de cada produto.
 *  3. commerce.css: cópia das regras de #mais-procurados para #novidades (painel escuro),
 *     gerada a partir do próprio CSS (markers OC-NOVIDADES-CSS-START/END) + grelha 3×.
 *
 * Nome, link Amazon e imagem vêm da página do produto publicada (produto/{slug}/).
 * Os textos só repetem factos que estão nessa página.
 *
 *   node scripts/apply-loja-novidades.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, "utf8");
const exists = (f) => fs.existsSync(path.join(ROOT, f));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SHORTCUTS = [
  ["acessorios-de-barbeiro/", "Acessórios"],
  ["oleos-e-balms/", "Óleos e bálsamos"]
];

// [slug, etiqueta, porquê, quando não escolher, [artigo, texto do link]]
const NOVIDADES = [
  ["panasonic-er-gn30", "Nariz e orelhas", "Lâmina curva de fio duplo, protegida e lavável debaixo da torneira. Serve também para acertar as sobrancelhas.", "Quem quer um aparador recarregável — funciona com uma pilha AA.", ["aparador-de-pelos-do-nariz-qual-escolher", "Guia: aparador de pelos do nariz"]],
  ["philips-bodygroom-bg3480", "Pelos do corpo", "Sistema Triple Protect para pele sensível, pentes de 2 e 3 mm e 100% à prova de água.", "Quem quer deixar o pelo mais comprido — os pentes ficam pelos 3 mm.", ["aparador-corporal-masculino-qual-escolher", "Guia: aparador corporal"]],
  ["candure-tesoura-cabeleireiro", "Corte à tesoura", "6,5 polegadas em aço inoxidável, fio convexo e anéis ajustáveis aos dedos.", "Quem só corta à máquina — aí a tesoura não faz falta.", ["como-cortar-cabelo-masculino-com-tesoura-em-casa", "Guia: cortar à tesoura em casa"]],
  ["grifema-pulverizador-300ml", "Para o posto de barbeiro", "Névoa contínua, uso a 360° e bocal de 0,3 mm, em 300 ml para o dia todo.", "Quem quer um frasco de alumínio — este é de plástico.", ["borrifador-para-barbearia-qual-escolher", "Guia: borrifador para barbearia"]],
  ["proraso-balsamo-barba", "Barba macia", "Amacia a barba e alivia a irritação enquanto cresce. Da Proraso, marca de barbearia desde 1948.", "Quem quer fixação — é em creme, não tem cera.", ["oleo-de-barba-para-que-serve", "Guia: óleo ou bálsamo"]],
  ["shave-factory-clipper-oil", "Manutenção", "Lubrifica e protege as lâminas da máquina, num frasco de 150 ml com bico doseador.", "Quem procura desinfetar — este óleo só lubrifica.", ["como-limpar-uma-maquina-de-cortar-cabelo", "Guia: como limpar a máquina"]]
];

function loadProduct(slug) {
  const file = "produto/" + slug + "/index.html";
  if (!exists(file)) throw new Error("Sem página de produto: " + file);
  const html = read(file);
  const name = (html.match(/<h1>([^<]+)<\/h1>/) || [])[1];
  const amazon = (html.match(/href="(https:\/\/www\.amazon\.es\/[^"]+)"/) || [])[1];
  const img = html.match(/<img src="\.\.\/\.\.\/(imagens\/produtos\/[^"]+)" alt="([^"]*)"/);
  if (!name || !amazon || !img) throw new Error("Dados incompletos em " + file);
  return { slug, name, amazon, image: img[1], alt: img[2] };
}

function picture(p) {
  const webp = p.image.replace(/\.jpe?g$/i, ".webp");
  const img = '<img class="loja-feat-img" src="../' + p.image + '" alt="' + p.alt + '" loading="lazy" />';
  return exists(webp) ? '<picture style="display:contents"><source srcset="../' + webp + '" type="image/webp" style="display:none">' + img + "</picture>" : img;
}

function card([slug, badge, why, avoid, [article, guide]]) {
  if (!exists("revista/" + article + "/index.html")) throw new Error("Artigo inexistente: " + article);
  const p = loadProduct(slug);
  const href = "../produto/" + slug + "/";
  return '\n            <article class="loja-feat-card">\n' +
    '              <a class="oc-card-media-link" href="' + href + '" tabindex="-1" aria-hidden="true">' + picture(p) + "</a>\n" +
    '              <div class="loja-feat-body">\n' +
    '                <span class="loja-feat-badge">' + esc(badge) + "</span>\n" +
    '                <h3 class="loja-feat-name"><a class="oc-card-title-link" href="' + href + '">' + p.name + "</a></h3>\n" +
    '                <p class="loja-feat-why">' + esc(why) + "</p>\n" +
    '                <div class="loja-feat-avoid">\n                  <strong>Quando não escolher</strong>\n                  ' + esc(avoid) + "\n                </div>\n" +
    '                <div class="loja-feat-actions">\n' +
    '                  <a class="btn btn-primary btn-small" href="' + p.amazon + '" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver preço na Amazon.es</a>\n' +
    '                  <a class="btn btn-secondary btn-small" href="' + href + '">Ver detalhes</a>\n' +
    "                </div>\n" +
    '                <a class="loja-feat-guide" href="../revista/' + article + '/">' + esc(guide) + " →</a>\n" +
    "              </div>\n            </article>\n";
}

function applyShortcuts(html) {
  const anchor = '<a class="loja-hero-shortcut" href="manutencao-de-maquinas/">Manutenção</a>';
  if (!html.includes(anchor)) throw new Error("Atalho 'Manutenção' não encontrado");
  let add = "";
  for (const [href, label] of SHORTCUTS) {
    if (!html.includes('class="loja-hero-shortcut" href="' + href + '"')) {
      add += '\n              <a class="loja-hero-shortcut" href="' + href + '">' + label + "</a>";
    }
  }
  return add ? html.replace(anchor, anchor + add) : html;
}

function applySection(html) {
  const section =
    "<!-- OC-LOJA-NOVIDADES-START -->\n" +
    '      <section class="section" id="novidades">\n        <div class="container">\n' +
    '          <div class="section-header section-header--compact">\n            <div>\n' +
    '              <span class="eyebrow">Novidades · outubro de 2026</span>\n' +
    "              <h2>Novos na loja</h2>\n" +
    "              <p>Seis produtos novos, escolhidos pelo que se procura: pelos do nariz e do corpo, corte à tesoura e o posto de barbeiro. Cada um com o guia que o explica e quando não o escolher.</p>\n" +
    '            </div>\n            <div class="hero-actions"><a class="btn btn-secondary btn-small" href="acessorios-de-barbeiro/">Ver acessórios</a></div>\n' +
    '          </div>\n          <div class="loja-feat-grid">\n' +
    NOVIDADES.map(card).join("") +
    "          </div>\n        </div>\n      </section>\n" +
    "      <!-- OC-LOJA-NOVIDADES-END -->";
  if (html.includes("OC-LOJA-NOVIDADES-START")) {
    return html.replace(/<!-- OC-LOJA-NOVIDADES-START -->[\s\S]*?<!-- OC-LOJA-NOVIDADES-END -->/, section);
  }
  const start = html.indexOf('<section class="section" id="mais-procurados">');
  if (start === -1) throw new Error("#mais-procurados não encontrado");
  const end = html.indexOf("</section>", start) + "</section>".length;
  return html.slice(0, end) + "\n\n      " + section + html.slice(end);
}

// Copia cada regra (também dentro de @media) cujo seletor tem #mais-procurados, trocando por #novidades
function buildCss(css) {
  const base = css.replace(/\/\* OC-NOVIDADES-CSS-START \*\/[\s\S]*?\/\* OC-NOVIDADES-CSS-END \*\/\n?/, "");
  const out = [];
  function rules(text, wrap) {
    let i = 0;
    while (i < text.length) {
      const open = text.indexOf("{", i);
      if (open === -1) break;
      const head = text.slice(i, open).replace(/\/\*[\s\S]*?\*\//g, "").trim();
      let depth = 1, j = open + 1;
      while (j < text.length && depth) { if (text[j] === "{") depth++; else if (text[j] === "}") depth--; j++; }
      const body = text.slice(open + 1, j - 1);
      if (head.startsWith("@media")) rules(body, head);
      else if (head.includes("#mais-procurados")) {
        const sel = head.split(",").map((s) => s.trim()).filter((s) => s.includes("#mais-procurados")).map((s) => s.replace(/#mais-procurados/g, "#novidades")).join(",\n");
        const rule = sel + " {" + body + "}";
        out.push(wrap ? wrap + " {\n" + rule + "\n}" : rule);
      }
      i = j;
    }
  }
  rules(base, null);
  const extra =
    "/* OC-NOVIDADES-CSS-START */\n/* Secção \"Novos na loja\" (loja/index.html): mesmo painel escuro de #mais-procurados, gerado por scripts/apply-loja-novidades.js */\n" +
    out.join("\n") + "\n" +
    'body[data-page="store"] #novidades .loja-feat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n' +
    '@media (max-width: 1100px) { body[data-page="store"] #novidades .loja-feat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n' +
    '@media (max-width: 560px) { body[data-page="store"] #novidades .loja-feat-grid { grid-template-columns: 1fr; } }\n' +
    '.loja-feat-guide { display: inline-block; margin-top: 12px; font-size: 14px; font-weight: 600; color: var(--accent); text-decoration: none; }\n' +
    '.loja-feat-guide:hover { text-decoration: underline; }\n' +
    "/* no mobile o .loja-feat-body é display:contents dentro de uma grelha de 2 colunas */\n" +
    ".loja-feat-guide { grid-column: 1 / -1; justify-self: start; }\n" +
    'body[data-page="store"] #novidades .loja-feat-guide { color: #e6c88f; }\n' +
    "/* OC-NOVIDADES-CSS-END */\n";
  return { css: base.replace(/\s*$/, "\n\n") + extra, count: out.length };
}

const loja = read("loja/index.html");
write("loja/index.html", applySection(applyShortcuts(loja)));
const { css, count } = buildCss(read("commerce.css"));
write("commerce.css", css);
console.log("novidades: " + NOVIDADES.length + " cartões | atalhos: " + SHORTCUTS.length + " | regras CSS copiadas: " + count);
