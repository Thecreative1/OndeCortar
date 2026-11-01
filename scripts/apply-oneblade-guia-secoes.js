#!/usr/bin/env node
/**
 * Idempotente — secções "Todos os modelos OneBlade", "OneBlade Intimate", "OneBlade ou Gillette?" e
 * "OneBlade serve para rapar a cabeça?" no guia revista/qual-oneblade-comprar/ (markers
 * OC-ONEBLADE-SECOES-START/END, antes de "Como usar sem irritar"), 4 perguntas no FAQ e no FAQPage,
 * título e description com as palavras das pesquisas.
 *
 * Origem (2026-11-01): Google Trends PT — "oneblade" com tanta procura como "máquina de barbear" nos últimos
 * 12 meses; em subida "gillette oneblade" (+170%) e "philips oneblade intimate" (+140%). Sugestões do Google PT:
 * "oneblade intimate vale a pena", "oneblade serve para raspar a cabeça", "oneblade corta a pele",
 * "oneblade vs gillette", "qual a diferença". Só factos da Philips (suporte e fichas na Amazon.es); sem preços.
 * Datas (dateModified, "Atualizado em", sitemap) mudam só quando a página muda de facto.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SLUG = "qual-oneblade-comprar";
const FILE = path.join(ROOT, "revista", SLUG, "index.html");
const SITEMAP = path.join(ROOT, "sitemap-revista.xml");
const TODAY_ISO = "2026-11-01";
const TODAY_PT = "1 de novembro de 2026";

const TITLE = "Philips OneBlade: qual comprar? 360, Pro ou Intimate | Revista OndeCortar";
const DESCRIPTION = "Philips OneBlade 360, Pro ou Intimate: qual comprar, a diferença para o Bodygroom e a Gillette, se serve para a cabeça e quando trocar a lâmina.";

const p = (slug, name) => `<a href="../../produto/${slug}/">${name}</a>`;
const rev = (slug, name) => `<a href="../${slug}/">${name}</a>`;

const SECTIONS = `<!-- OC-ONEBLADE-SECOES-START --><article class="article-section" id="modelos"><h2>Todos os modelos OneBlade: qual a diferença</h2><p>Os códigos são quase iguais, mas o que muda é simples: os pentes, a bateria e o que vem na caixa. Para a maioria, a escolha continua a ser o 360 ou o Pro 360.</p><ul class="rich-list"><li><strong>${p("philips-oneblade-360-qp2724", "OneBlade 360 (QP2724)")}:</strong> lâmina 360, 2 lâminas na caixa, pentes curtos e 45 minutos de bateria. É o ponto de partida.</li><li><strong>OneBlade 360 Face + Body (QP2824):</strong> a mesma base, com 3 lâminas e um kit corporal, com pente de 3 mm e protetor de pele. Compensa se também aparas o corpo e não precisas dos comprimentos do Pro.</li><li><strong>OneBlade 360 com pente 5 em 1 (QP2734):</strong> um só pente ajustável de 1 a 5 mm e 60 minutos de bateria. É um meio-termo para quem muda de comprimento só de vez em quando.</li><li><strong>${p("philips-oneblade-pro-360", "OneBlade Pro 360 (QP6552)")}:</strong> pente de 20 comprimentos, de 0,4 a 10 mm, e kit corporal. É o mais completo destes.</li><li><strong>OneBlade First Shave (QP1324):</strong> pensado para quem está a começar a fazer a barba, com 30 minutos de bateria e 8 horas de carga. Se já tens barba, não é este.</li><li><strong>OneBlade Intimate (QP1924):</strong> para a zona íntima e as axilas, não para a barba. Explicamos a seguir.</li></ul><p>O fim do código (/30, /31…) pode mudar o conteúdo da caixa, por isso vê a lista do que vem incluído antes de comprar. Na nossa loja estão o 360 e o Pro 360; os outros confirmam-se na Amazon.es.</p></article><article class="article-section" id="intimate"><h2>OneBlade Intimate: o que é e se vale a pena</h2><p>É o OneBlade para a zona íntima e as axilas, vendido para mulher e homem. Segundo a Philips, o QP1924/30 traz 2 lâminas SkinProtect, com proteção extra para pele sensível, e um pente de 3 mm. É à prova de água e a bateria dá 30 minutos.</p><p><strong>A nossa regra:</strong> vale a pena se o queres só para o corpo. Para a barba, não: não traz pentes de barba. Se queres um só aparelho para a cara e o corpo, escolhe uma versão com kit corporal, como o Face + Body ou o ${p("philips-oneblade-pro-360", "Pro 360")}.</p><p><strong>E o OneBlade normal serve para as partes íntimas?</strong> Sem kit corporal, não traz nenhuma proteção própria para essa zona. Nas versões com kit, a Philips indica o protetor de pele para as zonas sensíveis. Aí, usa sempre uma destas opções: o Intimate, um kit corporal ou um aparador como o ${p("philips-bodygroom-bg3480", "Body Groomer Série 3000")}.</p><p>Não encontrámos confirmação da Philips de que as lâminas SkinProtect sirvam nos outros modelos, por isso não contes com isso.</p></article><article class="article-section" id="gillette"><h2>OneBlade ou Gillette?</h2><p>O OneBlade é um produto da Philips. A Gillette vende coisas diferentes, por isso a resposta depende do que estás a comparar.</p><ul class="rich-list"><li><strong>Com uma lâmina manual Gillette:</strong> a lâmina deixa a cara mais lisa, mas pede mais tempo e mais cuidado. O OneBlade não rapa tão rente, mas é mais rápido e é melhor para barba de poucos dias.</li><li><strong>Com um aparador King C. Gillette:</strong> o ${p("king-c-gillette-beard-trimmer-kit", "Beard Trimmer Kit")} é um aparador sem fios com três pentes, focado em manter o comprimento. O OneBlade também apara, mas contorna e rapa com a mesma lâmina.</li></ul><p>Se queres a cara lisa todos os dias, fica com a lâmina ou com ${rev("melhor-maquina-de-barbear-eletrica-qual-escolher", "uma máquina de barbear")}. Se usas barba de poucos dias, fica com o OneBlade.</p></article><article class="article-section" id="cabeca"><h2>OneBlade serve para rapar a cabeça ou cortar o cabelo?</h2><p>Não. A Philips diz que o OneBlade não foi desenhado para rapar a cabeça nem o couro cabeludo. Para isso, vê ${rev("como-rapar-a-cabeca-em-casa-shaver-ou-maquina", "como rapar a cabeça em casa")}. Para cortar o cabelo, o aparelho certo é uma máquina: temos ${rev("melhores-maquinas-para-cortar-cabelo-em-casa", "as melhores máquinas de cortar cabelo")} num guia próprio.</p></article><!-- OC-ONEBLADE-SECOES-END -->`;

const FAQ = [
  ["O OneBlade Intimate vale a pena?", "Vale a pena se o queres só para a zona íntima e as axilas: traz lâminas SkinProtect, com proteção extra para pele sensível, e um pente de 3 mm. Para a barba, não, porque não traz pentes de barba."],
  ["O que é melhor, OneBlade ou Gillette?", "Depende do que queres. Uma lâmina manual Gillette deixa a cara mais lisa, mas pede mais tempo e mais cuidado. O OneBlade é mais rápido e é melhor para barba de poucos dias."],
  ["O OneBlade serve para rapar a cabeça?", "Não. A Philips diz que o OneBlade não foi desenhado para rapar a cabeça nem o couro cabeludo. Para isso, usa um aparelho próprio para a cabeça; para cortar o cabelo, uma máquina de cortar cabelo."],
  ["O OneBlade corta a pele?", "Foi desenhado para cortar o pelo e não a pele, com pontas arredondadas, mas pode irritar se pressionares demasiado ou se a lâmina estiver gasta. Usa-o sem pressionar e troca a lâmina quando começar a puxar."]
];

// Frases antigas que diziam que só o Pro faz corpo: as versões Face + Body também trazem kit corporal.
const CORPO = [
  ["OneBlade para o rosto (o Pro também faz corpo).", "OneBlade para o rosto (as versões com kit corporal, como o Pro, também fazem corpo)."],
  ["foi pensado para o rosto (o Pro também faz corpo)", "foi pensado para o rosto (as versões com kit corporal, como o Pro, também fazem corpo)"],
  ["foi pensado para o rosto</strong> (o Pro estende-se ao corpo)", "foi pensado para o rosto</strong> (as versões com kit corporal, como o Pro, também fazem corpo)"],
  ["foi pensado para o rosto (o Pro estende-se ao corpo)", "foi pensado para o rosto (as versões com kit corporal, como o Pro, também fazem corpo)"]
];

let html = fs.readFileSync(FILE, "utf8");
const before = html;

// 1. Secções novas (substitui o bloco se já existir)
const blockRe = /<!-- OC-ONEBLADE-SECOES-START -->[\s\S]*?<!-- OC-ONEBLADE-SECOES-END -->/;
if (blockRe.test(html)) html = html.replace(blockRe, SECTIONS);
else {
  const anchor = '<article class="article-section"><h2>Como usar sem irritar</h2>';
  if (!html.includes(anchor)) throw new Error("Âncora 'Como usar sem irritar' não encontrada");
  html = html.replace(anchor, SECTIONS + anchor);
}

// 2. FAQ visível + FAQPage (mesmas perguntas, pela mesma ordem, no fim)
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
    html = html.replace(m[0], m[1].slice(0, -1) + "," + item + "]" + m[2]);
  }
}

// 3. Corpo: acertar as frases antigas no texto e no FAQPage
for (const [from, to] of CORPO) html = html.split(from).join(to);
if (/o Pro (também faz corpo|estende-se ao corpo)/.test(html)) throw new Error("Ficou uma frase antiga sobre o corpo");

// 4. Título e description (o h1 e o URL não mudam)
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

// 5. Datas — só se o conteúdo mudou
if (html !== before) {
  html = html
    .replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/, `"dateModified":"${TODAY_ISO}"`)
    .replace(/Leitura estimada \d+ min/, "Leitura estimada 8 min")
    .replace(/Leitura estimada: \d+ min\./, "Leitura estimada: 8 min.");
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
  console.log("Guia OneBlade atualizado (secções, FAQ, título, datas, sitemap).");
} else console.log("Sem alterações.");
