/**
 * apply-revista-unique-images.js — idempotente.
 *
 * 1. Dá uma fotografia editorial própria (imagens/revista/, Unsplash) aos artigos que partilhavam
 *    a mesma capa ou usavam uma foto de produto da Amazon (NEW_HEROES). Na página do artigo troca
 *    só a capa (<figure class="article-hero-media">), og:image, twitter:image e o "image" do
 *    JSON-LD — não mexe noutras imagens do corpo. Atualiza também scripts/data/artigos-*.js
 *    para um rebuild não voltar à foto antiga.
 * 2. Todos os cartões da revista que apontam para um artigo (hub, categorias, relacionados)
 *    passam a mostrar a capa desse artigo, com a classe de foto (sem zoom em pack shots).
 *
 * Depois: python scripts/gerar-webp.py && node scripts/apply-webp-images.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://ondecortar.pt/";
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, "utf8");
const exists = (f) => fs.existsSync(path.join(ROOT, f));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// slug do artigo → [ficheiro em imagens/revista/, alt]
const NEW_HEROES = {
  "aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais": ["bancada-maquinas-escova.jpg", "Bancada de barbeiro com máquinas de cortar, escova e rolo de papel de pescoço"],
  "como-cortar-o-cabelo-em-casa-com-maquina": ["cortar-cabelo-maquina-espelho.jpg", "Homem a cortar o cabelo de outro com máquina, em frente a um espelho antigo"],
  "como-manter-a-maquina-de-cortar-cabelo-a-funcionar-bem-por-mais-tempo": ["maquina-nuca-cliente.jpg", "Barbeiro a passar a máquina na nuca de um cliente"],
  "trimmer-vs-shaver-diferencas-reais": ["aparar-barba-aparador.jpg", "Homem a aparar a barba com um aparador elétrico"],
  "7-erros-ao-comprar-uma-maquina-de-cortar-cabelo-barata": ["maquina-pente-fundo-azul.jpg", "Máquina de cortar cabelo com pente encaixado sobre fundo azul"],
  "como-limpar-uma-maquina-de-cortar-cabelo": ["bancada-madeira-ferramentas.jpg", "Máquinas, tesouras e navalha arrumadas numa bancada de madeira"],
  "numeros-da-maquina-de-cortar-cabelo": ["duas-maquinas-mesa.jpg", "Duas máquinas de cortar cabelo sobre uma mesa de madeira"],
  "melhor-kit-de-barba-para-comecar-sem-comprar-as-cegas": ["kit-barbearia-ardosia.jpg", "Máquinas, tesoura, pente e produtos de barbearia sobre ardósia"],
  "melhor-kit-de-barba-para-oferecer": ["produtos-barba-tabuleiro.jpg", "Produtos de barba arrumados num tabuleiro de madeira"],
  "o-que-vale-a-pena-num-kit-de-barba-e-o-que-e-so-ruido-de-catalogo": ["frascos-barba-alinhados.jpg", "Frascos de óleo e bálsamo de barba alinhados sobre fundo bege"],
  "after-shave-para-que-serve": ["frasco-pos-barba-maos.jpg", "Mãos a segurar um frasco de loção pós-barba"],
  "como-escolher-laminas-sem-irritar-a-pele-desnecessariamente": ["maquina-seguranca-mao.jpg", "Mão a segurar uma máquina de barbear de segurança sobre fundo rosa"],
  "barba-falhada-o-que-fazer": ["jovem-barba-poucos-dias.jpg", "Retrato de um jovem com barba de poucos dias"],
  "caspa-na-barba-o-que-fazer": ["grande-plano-barba.jpg", "Grande plano do rosto de um homem com barba"],
  "buzz-cut-corte-militar-que-numero-pedir": ["barbeiro-degrade-maquina.jpg", "Barbeiro a cortar as laterais com máquina a um cliente de barba"],
  "cabelo-encaracolado-homem-corte-e-cuidados": ["homem-cabelo-encaracolado.jpg", "Retrato de um homem de cabelo comprido encaracolado"],
  "como-aparar-as-sobrancelhas-homem": ["sobrancelha-olho-homem.jpg", "Grande plano do olho e da sobrancelha de um homem"],
  "como-escolher-uma-maquina-de-cortar-cabelo-para-usar-em-casa": ["barbeiro-tatuado-maquina.jpg", "Barbeiro tatuado a passar a máquina na nuca de um cliente"],
  "o-essencial-para-tratar-da-barba-em-casa": ["maos-pente-tesoura.jpg", "Mãos de barbeiro a segurar pente e tesoura"],
  "creme-espuma-ou-gel-de-barbear-qual-escolher": ["pincel-taca-barbear.jpg", "Pincel, taça de espuma e máquina de barbear de segurança junto ao lavatório"],
  "primeiro-corte-de-cabelo-crianca-barbearia": ["corte-menino-barbeiro.jpg", "Barbeiro a cortar o cabelo a um menino, a preto e branco"],
  "pomada-cera-ou-gel-cabelo-homem": ["latas-pomada-cabelo.jpg", "Latas de pomada para o cabelo numa prateleira de barbearia"],
  "risco-no-cabelo-masculino": ["barbeiro-pentear-cliente-barbearia.jpg", "Barbeiro a pentear o cabelo de um cliente numa barbearia"],
  "historia-do-poste-de-barbeiro": ["poste-barbeiro-espiral.jpg", "Poste de barbeiro em espiral vermelho, branco e azul"]
};

const stats = { heroes: 0, data: 0, cards: 0, files: 0 };
const articleFile = (slug) => "revista/" + slug + "/index.html";

// ── 1. Capas ─────────────────────────────────────────────────────
for (const [slug, [file, alt]] of Object.entries(NEW_HEROES)) {
  const f = articleFile(slug);
  if (!exists(f)) throw new Error("Artigo inexistente: " + slug);
  if (!exists("imagens/revista/" + file)) throw new Error("Foto em falta: " + file);
  let html = read(f);
  const before = html;
  const rel = "imagens/revista/" + file;
  const newImg = '<img src="../../' + rel + '" alt="' + esc(alt) + '" loading="eager" fetchpriority="high" />';
  html = html.replace(/(<figure class="article-hero-media">)([\s\S]*?)(<\/figure>)/, (m, a, inner, b) => a + newImg + b);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, "$1" + SITE + rel + "$2");
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, "$1" + SITE + rel + "$2");
  html = html.replace(/(<script type="application\/ld\+json"[^>]*>)(\{[^<]*?"BlogPosting"[^<]*?)(<\/script>)/, (m, o, j, c) => {
    const d = JSON.parse(j); d.image = SITE + rel; return o + JSON.stringify(d) + c;
  });
  if (html !== before) { write(f, html); stats.heroes += 1; }
}

// og:image, twitter:image e JSON-LD de TODOS os artigos = a capa (alguns tinham pack shots da
// Amazon, que aparecem cortados quando o link é partilhado)
for (const d of fs.readdirSync(path.join(ROOT, "revista"))) {
  const f = articleFile(d);
  if (!exists(f)) continue;
  let html = read(f);
  if (!/data-page="article"/.test(html)) continue;
  const m = html.match(/<figure class="article-hero-media">[\s\S]*?<img src="\.\.\/\.\.\/([^"]+)"/);
  if (!m) continue;
  const url = SITE + m[1];
  const before = html;
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, "$1" + url + "$2")
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, "$1" + url + "$2")
    .replace(/(<script type="application\/ld\+json"[^>]*>)(\{[^<]*?"BlogPosting"[^<]*?)(<\/script>)/, (x, o, j, c) => {
      const data = JSON.parse(j); data.image = url; return o + JSON.stringify(data) + c;
    });
  if (html !== before) { write(f, html); stats.shareImages = (stats.shareImages || 0) + 1; }
}

// Dados dos artigos gerados por build-revista-articles.js
for (const df of fs.readdirSync(path.join(ROOT, "scripts/data")).filter((n) => /^artigos-.*\.js$/.test(n))) {
  const rel = "scripts/data/" + df;
  let s = read(rel);
  const before = s;
  for (const [slug, [file, alt]] of Object.entries(NEW_HEROES)) {
    const i = s.indexOf('slug: "' + slug + '"');
    if (i === -1) continue;
    const next = s.indexOf("\n    slug: ", i + 10);
    const end = next === -1 ? s.length : next;
    let seg = s.slice(i, end);
    seg = seg.replace(/image: "[^"]*"/, 'image: "imagens/revista/' + file + '"').replace(/imageAlt: "[^"]*"/, "imageAlt: " + JSON.stringify(alt));
    s = s.slice(0, i) + seg + s.slice(end);
  }
  if (s !== before) { write(rel, s); stats.data += 1; }
}

// ── 2. Cartões ───────────────────────────────────────────────────
function heroOf(slug) {
  const f = articleFile(slug);
  if (!exists(f)) return null;
  const m = read(f).match(/<figure class="article-hero-media">[\s\S]*?<img src="\.\.\/\.\.\/([^"]+)" alt="([^"]*)"/);
  return m ? { src: m[1], alt: m[2] } : null;
}
const heroCache = new Map();
const hero = (slug) => { if (!heroCache.has(slug)) heroCache.set(slug, heroOf(slug)); return heroCache.get(slug); };

const pages = ["revista/index.html", ...fs.readdirSync(path.join(ROOT, "revista")).map((d) => "revista/" + d + "/index.html").filter(exists)];
for (const f of pages) {
  const root = f === "revista/index.html" ? "../" : "../../";
  let html = read(f);
  const before = html;
  html = html.replace(/<article class="(rev-article-card|article-card)([^"]*)">[\s\S]*?<\/article>/g, (card, kind) => {
    const link = card.match(/href="(?:\.\.\/)+revista\/([a-z0-9-]+)\/"/);
    if (!link) return card;
    const h = hero(link[1]);
    if (!h) return card;
    const img = '<img src="' + root + h.src + '" alt="' + h.alt + '" loading="lazy" />';
    let out = card.replace(/(?:<picture[^>]*>\s*<source[^>]*>\s*)?<img\b[^>]*>(?:\s*<\/picture>)?/, img);
    out = out.replace(/class="rev-article-thumb(?: rev-article-thumb--(?:photo|product))?"/, 'class="rev-article-thumb rev-article-thumb--photo"')
      .replace(/class="article-thumb(?: article-thumb--(?:photo|product))?"/, 'class="article-thumb article-thumb--photo"');
    if (out !== card) stats.cards += 1;
    return out;
  });
  if (html !== before) { write(f, html); stats.files += 1; }
}
console.log(JSON.stringify(stats));
