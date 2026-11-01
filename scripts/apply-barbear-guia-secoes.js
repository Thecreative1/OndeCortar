#!/usr/bin/env node
/**
 * Idempotente — secções "Gama alta", "Qualidade-preço", "Barbear e aparar" e "Máquina profissional" no guia
 * revista/melhor-maquina-de-barbear-eletrica-qual-escolher/ (markers OC-BARBEAR-SECOES-START/END, depois de
 * "As máquinas lado a lado", para não mexer no que já converte), linhas novas na tabela, 4 perguntas no FAQ e no
 * FAQPage, título e description com as palavras das pesquisas.
 *
 * Origem (2026-11-01): Search Console 90 dias ("qual a melhor máquina de barbear elétrica" 50 impressões, posição 6,1,
 * 0 cliques; "melhor maquina de barbear" 20, posição 24,8), Google Trends PT ("braun series" 11,6 → 24,8) e sugestões
 * do Google PT ("melhor maquina de barbear qualidade preço", "custo beneficio", "e aparar", "e cortar cabelo",
 * "profissional", "deco", "philips shaver 7000 vs 5000", "philips serie 9000 ou braun serie 9", "braun series 9 pro+…").
 * Só factos dos fabricantes na Amazon.es; sem preços. Base para medir (28 dias): 6 cliques, 490 impressões, 1,2% CTR,
 * posição 7. Datas (dateModified, "Atualizado em", sitemap) mudam só quando a página muda de facto.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SLUG = "melhor-maquina-de-barbear-eletrica-qual-escolher";
const FILE = path.join(ROOT, "revista", SLUG, "index.html");
const SITEMAP = path.join(ROOT, "sitemap-revista.xml");
const TODAY_ISO = "2026-11-01";
const TODAY_PT = "1 de novembro de 2026";

const TITLE = "Melhor máquina de barbear elétrica: Philips ou Braun? | Revista OndeCortar";
const DESCRIPTION = "A melhor máquina de barbear elétrica para cada caso: Philips ou Braun, qualidade-preço, gama alta, pele sensível, idosos e primeira máquina.";

const p = (slug, name) => `<a href="../../produto/${slug}/">${name}</a>`;
const rev = (slug, name) => `<a href="../${slug}/">${name}</a>`;

const SECTIONS = `<!-- OC-BARBEAR-SECOES-START --><article class="article-section" id="gama-alta"><h2>Vale a pena uma gama alta? Philips 7000 e Braun Series 9</h2><p>Só se barbeias todos os dias e tens barba densa, ou se é uma prenda. As gamas altas trazem mais lâminas, sensores que ajustam a potência e mais acessórios: ganhas sobretudo conforto, não um barbear de outra categoria.</p><p><strong>${p("philips-s7887-series-7000", "Philips Série 7000 S7887/35")} (rotativa).</strong> Em relação à ${p("philips-s5465-series-5000", "Série 5000")}, tem 45 lâminas em vez de 27, um sensor que lê a densidade da barba 250 vezes por segundo e até 60 minutos de bateria em vez de 50. Em troca, a lista da caixa não inclui aparador, e carrega por cabo USB-A, sem adaptador de corrente. Se o aparador de encaixar te faz falta, fica na Série 5000.</p><p><strong>${p("braun-series-9-pro-9625s", "Braun Series 9 Pro+ 9625S")} (lâminas).</strong> Em relação à ${p("braun-series5-51-b1000s", "Series 5")}, tem 5 elementos de corte, uma cabeça flexível a 40°, sensores que leem a barba 300 vezes por segundo e um aparador integrado para bigode e patilhas. Traz o estojo PowerCase, que carrega a máquina fora de casa.</p><p><strong>A nossa regra:</strong> escolhe primeiro o tipo, rotativa ou lâminas, e só depois a gama. Quem prefere rotativas não vai mudar de ideias com uma Series 9.</p><h3>Series 9 Pro+: o que mudam os códigos</h3><p>Na tabela da Braun, as versões Pro+ têm os mesmos 5 elementos de corte e os mesmos 60 minutos de bateria. O que muda são os acessórios:</p><ul class="rich-list"><li><strong>9610SI:</strong> base de carga.</li><li><strong>9625S:</strong> PowerCase e base de carga.</li><li><strong>9665CCE:</strong> centro de limpeza e carga.</li><li><strong>9677CCE:</strong> centro de limpeza e carga, e PowerCase.</li></ul><p>Na Amazon.es, o título da 9625S fala em centro de limpeza, mas a tabela da Braun e a lista da caixa não o indicam: conta que não vem. Antes de comprar, confirma também quem vende: nalguns modelos, a oferta principal é de um vendedor terceiro ou de segunda mão.</p></article><article class="article-section" id="qualidade-preco"><h2>A melhor máquina de barbear em qualidade-preço</h2><p>Para barbear todos os dias, a ${p("philips-s5465-series-5000", "Philips Série 5000")} é a nossa escolha: tem cabeças flexíveis a 360°, aparador de encaixar e é 100% à prova de água. Nas lâminas, a equivalente é a ${p("braun-series5-51-b1000s", "Braun Series 5")}.</p><p>Se barbeias só alguns dias por semana, não precisas de tanto: a ${p("philips-x3053-series-3000", "Philips X3000")} e a ${p("braun-series-3-310s", "Braun Series 3")} chegam. Confirma o preço do dia na Amazon.es antes de decidir, porque muda muito ao longo do ano.</p><p><strong>E o teste da DECO?</strong> Há quem procure a "melhor máquina de barbear" da DECO PROteste, mas não conseguimos confirmar um teste público recente, por isso não citamos resultados. Se és subscritor, vê diretamente no site da DECO PROteste.</p></article><article class="article-section" id="barbear-e-aparar"><h2>Uma máquina para barbear e aparar, ou também para cortar o cabelo?</h2><p><strong>Barbear e aparar:</strong> a Série 5000 traz um aparador de encaixar, e a Braun Series 3 e a Series 9 trazem aparador. Servem para acertar o bigode, as patilhas ou os pelos mais compridos, não para manter uma barba comprida. Para isso, precisas do ${rev("melhor-aparador-de-barba", "aparador de barba")}.</p><p><strong>Barbear e cortar o cabelo:</strong> nenhuma máquina de barbear faz as duas coisas. Os kits multifunções cortam e aparam, mas não deixam a pele lisa como uma máquina de barbear. Vê ${rev("aparador-multifuncoes-ou-maquina-profissional-qual-compensa-mais", "aparador multifunções ou máquina profissional")}.</p></article><article class="article-section" id="profissional"><h2>E uma máquina de barbear profissional?</h2><p>Em barbearia, "profissional" costuma querer dizer um shaver compacto para acabamentos, como o ${p("wahl-gold-travel-shaver", "Wahl Gold Travel Shaver")} ou o ${p("hiena-pro-shaver", "Hiena Pro Shaver")}. Para limpar contornos fazem sentido. Para barbear a cara toda em casa, todos os dias, fica com uma destas máquinas: seguem melhor o rosto.</p></article><!-- OC-BARBEAR-SECOES-END -->`;

const ROWS = `<!-- OC-BARBEAR-LINHAS-START --><tr><th scope="row">${p("philips-s7887-series-7000", "Philips Série 7000 S7887/35")}</th><td data-label="Tipo">Rotativa</td><td data-label="Cabeça">45 lâminas autoafiáveis, flexível a 360°</td><td data-label="Água">100% à prova de água</td><td data-label="A saber">Até 60 min de bateria; carrega por USB-A, sem adaptador</td></tr><tr><th scope="row">${p("braun-series-9-pro-9625s", "Braun Series 9 Pro+ 9625S")}</th><td data-label="Tipo">Lâminas de rede</td><td data-label="Cabeça">5 elementos de corte, flexível a 40°</td><td data-label="Água">100% à prova de água</td><td data-label="A saber">Até 60 min de bateria; aparador integrado e PowerCase</td></tr><!-- OC-BARBEAR-LINHAS-END -->`;

const FAQ = [
  ["Vale a pena comprar uma máquina de barbear de gama alta?", "Só se barbeias todos os dias e tens barba densa, ou se é uma prenda. A Philips Série 7000 e a Braun Series 9 trazem mais lâminas, sensores e acessórios, mas para a maioria a Série 5000 ou a Series 5 chegam."],
  ["Qual é a diferença entre a Philips Série 5000 e a Série 7000?", "A Série 7000 S7887/35 tem 45 lâminas em vez de 27, um sensor que ajusta a potência à barba e até 60 minutos de bateria em vez de 50. A Série 5000 S5465/18 traz aparador de encaixar, que a lista da caixa da S7887/35 não inclui."],
  ["Qual é a melhor máquina de barbear em qualidade-preço?", "Para barbear todos os dias, a Philips Série 5000 e, nas lâminas, a Braun Series 5. Para barbear só alguns dias por semana, a Philips X3000 ou a Braun Series 3 chegam."],
  ["Há alguma máquina de barbear que também corte o cabelo?", "Não. Uma máquina de barbear deixa a pele lisa, e para cortar o cabelo precisas de uma máquina de cortar cabelo. Os kits multifunções cortam e aparam, mas não deixam a pele lisa como uma máquina de barbear."]
];

let html = fs.readFileSync(FILE, "utf8");
const before = html;

// 1. Secções novas, depois da tabela (substitui o bloco se já existir)
const blockRe = /<!-- OC-BARBEAR-SECOES-START -->[\s\S]*?<!-- OC-BARBEAR-SECOES-END -->/;
if (blockRe.test(html)) html = html.replace(blockRe, () => SECTIONS);
else {
  const anchor = '<article class="article-section" id="pele-sensivel">';
  if (!html.includes(anchor)) throw new Error("Âncora 'pele-sensivel' não encontrada");
  html = html.replace(anchor, () => SECTIONS + anchor);
}

// 2. Linhas da tabela, antes da do OneBlade
const rowsRe = /<!-- OC-BARBEAR-LINHAS-START -->[\s\S]*?<!-- OC-BARBEAR-LINHAS-END -->/;
if (rowsRe.test(html)) html = html.replace(rowsRe, () => ROWS);
else {
  const anchor = '<tr><th scope="row"><a href="../../produto/philips-oneblade-360-qp2724/">';
  const tableAt = html.indexOf('id="comparar"');
  const at = html.indexOf(anchor, tableAt);
  if (tableAt < 0 || at < 0) throw new Error("Linha do OneBlade não encontrada na tabela");
  html = html.slice(0, at) + ROWS + html.slice(at);
}

// 3. Gamas: as de topo passam a ligar aos produtos
html = html.replace(
  "As gamas de topo (Philips 7000/9000, Braun Series 7/9) fazem sentido para barbas muito densas ou como prenda.",
  'As gamas de topo (Philips 7000/9000, Braun Series 7/9) fazem sentido para barbas muito densas ou como prenda: vê <a href="#gama-alta">se vale a pena</a>.'
);

// 4. FAQ visível + FAQPage (mesmas perguntas, pela mesma ordem, no fim)
for (const [q, a] of FAQ) {
  if (!html.includes(`<strong>${q}</strong>`)) {
    const cta = '<p class="faq-store-cta">';
    const faqStart = html.indexOf('id="faq-artigo"');
    const ctaAt = html.indexOf(cta, faqStart);
    if (faqStart < 0 || ctaAt < 0) throw new Error("FAQ do artigo não encontrado");
    html = html.slice(0, ctaAt) + `<div class="faq-item"><strong>${q}</strong><p>${a}</p></div>` + html.slice(ctaAt);
  }
  if (!html.includes(`"name":"${q}"`)) {
    const m = html.match(/("@type":"FAQPage","mainEntity":\[[\s\S]*?\])(\}<\/script>)/);
    if (!m) throw new Error("FAQPage não encontrado");
    const item = JSON.stringify({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } });
    html = html.replace(m[0], () => m[1].slice(0, -1) + "," + item + "]" + m[2]);
  }
}

// 5. Título e description (o h1 e o URL não mudam)
const metaDesc = /(<meta name="description" content=")[^"]*(")/;
const ogTitle = /(<meta property="og:title" content=")[^"]*(")/;
const ogDesc = /(<meta property="og:description" content=")[^"]*(")/;
if (!metaDesc.test(html) || !ogTitle.test(html) || !ogDesc.test(html)) throw new Error("Meta tags não encontradas");
html = html
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(metaDesc, `$1${DESCRIPTION}$2`)
  .replace(ogTitle, `$1${TITLE}$2`)
  .replace(ogDesc, `$1${DESCRIPTION}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${TITLE}$2`)
  .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${DESCRIPTION}$2`);

// 6. Datas — só se o conteúdo mudou
if (html !== before) {
  html = html
    .replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/, `"dateModified":"${TODAY_ISO}"`)
    .replace(/Leitura estimada \d+ min/, "Leitura estimada 10 min")
    .replace(/Leitura estimada: \d+ min\./, "Leitura estimada: 10 min.");
  if (/Atualizado em <time/.test(html)) {
    html = html.replace(/Atualizado em <time datetime="[^"]+">[^<]+<\/time>/, `Atualizado em <time datetime="${TODAY_ISO}">${TODAY_PT}</time>`);
  } else {
    html = html.replace(/(<span>Publicado em <time datetime="[^"]+">[^<]+<\/time><\/span>)/, `$1<span>Atualizado em <time datetime="${TODAY_ISO}">${TODAY_PT}</time></span>`);
  }
  html = /Atualizado em \d+ de [a-zç]+ de \d{4}\. Leitura estimada:/.test(html)
    ? html.replace(/Atualizado em \d+ de [a-zç]+ de \d{4}\. (Leitura estimada:)/, `Atualizado em ${TODAY_PT}. $1`)
    : html.replace(/(Publicado em \d+ de [a-zç]+ de \d{4}\.) (Leitura estimada:)/, `$1 Atualizado em ${TODAY_PT}. $2`);
  fs.writeFileSync(FILE, html);
  let sm = fs.readFileSync(SITEMAP, "utf8");
  sm = sm.replace(new RegExp(`(<loc>https://ondecortar\\.pt/revista/${SLUG}/</loc>\\s*<lastmod>)[^<]+`), `$1${TODAY_ISO}`);
  fs.writeFileSync(SITEMAP, sm);
  console.log("Guia da máquina de barbear atualizado (secções, tabela, FAQ, título, datas, sitemap).");
} else console.log("Sem alterações.");
