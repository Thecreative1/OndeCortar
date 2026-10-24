#!/usr/bin/env node
/**
 * Idempotente — secções "Cabelo e barba com uma só máquina", "Melhor relação qualidade-preço" e
 * "Marcas: o que distingue cada uma" no guia revista/melhores-maquinas-para-cortar-cabelo-em-casa/
 * (markers OC-MAQUINAS-SECOES-START/END, antes de #perfis-de-uso), mais uma pergunta no FAQ e no FAQPage.
 *
 * Origem (2026-10-18): Search Console — "melhor máquina de cortar cabelo e barba" (87 impressões),
 * "custo benefício", "melhores marcas"; sugestões do Google PT. 2026-10-24: + Philips Multigroom Série 7000 MG7931
 * (Amazon.es n.º 3 em Aparadores pessoais; Google PT "philips multigroom series 7000"). Só factos do catálogo
 * (commerce-products-a/b.js) e das páginas de produto; sem preços (regra da loja).
 * Datas (dateModified, "Atualizado em", sitemap) mudam só quando o bloco muda de facto.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SLUG = "melhores-maquinas-para-cortar-cabelo-em-casa";
const FILE = path.join(ROOT, "revista", SLUG, "index.html");
const SITEMAP = path.join(ROOT, "sitemap-revista.xml");
const TODAY_ISO = "2026-10-24";
const TODAY_PT = "24 de outubro de 2026";
const MONTH_PT = "outubro de 2026";

const p = (slug, name) => `<a href="../../produto/${slug}/">${name}</a>`;

const SECTIONS = `<!-- OC-MAQUINAS-SECOES-START --><section class="section" id="cabelo-e-barba"><div class="container article-body"><article class="article-section"><h2>Máquina de cortar cabelo e barba: uma só ou duas?</h2><p>Há dois caminhos, e a escolha depende do comprimento do teu cabelo.</p><p><strong>Um aparelho «tudo em um»</strong> faz sentido se usas cabelo curto e manténs barba. É o caso da ${p("braun-series-5-aio5545", "Braun Series 5 AIO5545")} — a nossa escolha para a maioria das pessoas neste formato —, da ${p("braun-series-3-aio3565", "Braun Series 3 AIO3565")} se queres gastar menos, e da ${p("braun-aio7545-series-7", "Braun Series 7 AIO7545")} (12 em 1, até 120 minutos de bateria) se queres o kit mais completo. Na Philips, a ${p("philips-mg3930-series-3000", "All-in-One MG3930")} é a mais simples: 7 em 1 e lâminas que não precisam de óleo. A ${p("philips-mg7931-series-7000", "Multigroom Série 7000 MG7931")} (16 em 1) é para quem apara a barba curta ao milímetro: pente de precisão de 1 a 3 mm em passos de 0,2 mm e até 120 minutos de bateria. Nas duas, os pentes só vão até 16 mm — chega para cabelo rente, não para cabelo médio.</p><p><strong>Uma máquina de cabelo + um aparador</strong> compensa quando o cabelo passa dos 2 cm ou cortas a família toda. A ${p("philips-hc5630-series-5000", "Philips Series 5000 HC5630")} já traz um pente de barba (são 3 pentes no total), e o ${p("wahl-home-pro-deluxe", "Wahl Home Pro Deluxe")} junta uma máquina com fio e um mini aparador para nuca, patilhas e contornos.</p><p>Regra prática: se a barba é o mais importante e o cabelo é rente, um «tudo em um»; se o corte de cabelo é o mais importante, uma máquina de cabelo a sério e a barba em segundo plano.</p></article><article class="article-section" id="qualidade-preco"><h2>Melhor relação qualidade-preço: onde vale a pena gastar mais</h2><p>Custo-benefício não é a máquina mais barata: é não pagar por extras que não vais usar e não poupar naquilo que se nota em cada corte.</p><ul class="rich-list"><li><strong>Vale pagar por:</strong> bateria (cortar sem fio à volta da cabeça é muito mais fácil), lâminas autoafiáveis ou de cerâmica (cortam igual durante mais tempo) e um ajuste de comprimento simples de ler.</li><li><strong>Não vale pagar por:</strong> dezenas de acessórios para nariz, corpo ou sobrancelhas, se só queres cortar o cabelo.</li></ul><p>Com esse critério, a ${p("philips-hc5630-series-5000", "Philips HC5630")} é o melhor equilíbrio para a maioria: 28 comprimentos numa roda, lâminas autoafiáveis e 90 minutos sem fio. Para gastar o mínimo, a ${p("remington-colourcut-hc5035", "Remington ColourCut HC5035")} (com fio, pentes coloridos que evitam enganos). Se precisas de bateria longa para várias pessoas seguidas, a ${p("wahl-rapid-clip", "Wahl Rapid Clip")} (até 120 minutos, pentes de 3 a 28 mm). O preço de cada uma muda com frequência — confirma-o na Amazon.es antes de decidir.</p></article><article class="article-section" id="marcas"><h2>Melhores marcas de máquinas de cortar cabelo: o que distingue cada uma</h2><p>Não há uma marca melhor em tudo; cada uma tem um ponto forte claro na nossa seleção.</p><ul class="rich-list"><li><strong>Philips:</strong> máquinas domésticas fáceis de acertar, com 28 comprimentos ajustáveis na própria máquina em vez de muitos pentes (${p("philips-hc5630-series-5000", "Series 5000")}, ${p("philips-hc7650-15-series-7000", "Series 7000 HC7650")}) e aparelhos «tudo em um», do simples ${p("philips-mg3930-series-3000", "MG3930")} ao ${p("philips-mg7931-series-7000", "Multigroom 7000 MG7931")}, com pente de precisão para a barba.</li><li><strong>Braun:</strong> a gama «tudo em um» mais completa — Series 3, 5 e 7 — e o ${p("braun-mgk5445", "MGK5445")}, para cabelo, barba e corpo com um só aparelho.</li><li><strong>Remington:</strong> kits completos com muitos pentes, como a ${p("remington-hc5811-genius", "Genius HC5811")} (lâminas de cerâmica, 10 pentes até 40 mm e mala) e a ColourCut para começar.</li><li><strong>Wahl:</strong> vai da máquina de casa (${p("wahl-rapid-clip", "Rapid Clip")}, ${p("wahl-color-pro-cordless-clipper-combo", "Color Pro Cordless")}) à máquina de barbearia (${p("wahl-super-taper", "Super Taper")}), para quem corta muitas vezes e quer fazer degradês.</li><li><strong>BaBylissPRO:</strong> clippers pensadas para barbeiros, como a ${p("babylisspro-chromfx-clipper", "ChromFX")} — só compensa com uso frequente e alguma técnica.</li></ul><p>Para a primeira máquina, Philips ou Remington são o caminho mais seguro; para cabelo e barba no mesmo aparelho, Braun; para quem já corta bem e quer subir de nível, Wahl ou BaBylissPRO.</p></article></div></section><!-- OC-MAQUINAS-SECOES-END -->`;

const FAQ_Q = "Qual é a melhor máquina de cortar cabelo e barba?";
const FAQ_A = "Para cabelo curto e barba no mesmo aparelho, a Braun Series 5 AIO5545 é a escolha equilibrada (a Series 3 AIO3565 se queres gastar menos). Se o cabelo é mais comprido, compensa mais uma máquina de cabelo como a Philips Series 5000 HC5630, que já traz um pente de barba.";

let html = fs.readFileSync(FILE, "utf8");
const before = html;

// 1. Secções novas (substitui o bloco se já existir)
const blockRe = /<!-- OC-MAQUINAS-SECOES-START -->[\s\S]*?<!-- OC-MAQUINAS-SECOES-END -->/;
if (blockRe.test(html)) html = html.replace(blockRe, SECTIONS);
else {
  const anchor = '<section class="section" id="perfis-de-uso">';
  if (!html.includes(anchor)) throw new Error("Âncora #perfis-de-uso não encontrada");
  html = html.replace(anchor, SECTIONS + anchor);
}

// 2. FAQ visível + FAQPage (mesma pergunta, no fim)
if (!html.includes(`<strong>${FAQ_Q}</strong>`)) {
  const cta = '<p class="faq-store-cta">';
  const faqStart = html.indexOf('id="faq-artigo"');
  const ctaAt = html.indexOf(cta, faqStart);
  if (faqStart < 0 || ctaAt < 0) throw new Error("FAQ do artigo não encontrado");
  html = html.slice(0, ctaAt) + `<div class="faq-item"><strong>${FAQ_Q}</strong><p>${FAQ_A}</p></div>` + html.slice(ctaAt);
}
if (!html.includes(`"name":"${FAQ_Q}"`)) {
  const m = html.match(/("@type":"FAQPage","mainEntity":\[[\s\S]*?\])(\}<\/script>)/);
  if (!m) throw new Error("FAQPage não encontrado");
  const item = JSON.stringify({ "@type": "Question", name: FAQ_Q, acceptedAnswer: { "@type": "Answer", text: FAQ_A } });
  html = html.replace(m[0], m[1].slice(0, -1) + "," + item + "]" + m[2]);
}

// 3. Datas — só se o conteúdo mudou
if (html !== before) {
  html = html
    .replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/, `"dateModified":"${TODAY_ISO}"`)
    .replace(/Atualizado em <time datetime="[^"]+">[^<]+<\/time>/, `Atualizado em <time datetime="${TODAY_ISO}">${TODAY_PT}</time>`)
    .replace(/Revisto em [^<]+\./, `Revisto em ${TODAY_PT}.`)
    .replace(/Escolha rápida · atualizado em [^<]+</, `Escolha rápida · atualizado em ${MONTH_PT}<`)
    .replace(/Leitura estimada 3 min/, "Leitura estimada 6 min")
    .replace(/Leitura estimada: 3 min\./, "Leitura estimada: 6 min.");
  fs.writeFileSync(FILE, html);
  let sm = fs.readFileSync(SITEMAP, "utf8");
  sm = sm.replace(new RegExp(`(<loc>https://ondecortar\\.pt/revista/${SLUG}/</loc>\\s*<lastmod>)[^<]+`), `$1${TODAY_ISO}`);
  fs.writeFileSync(SITEMAP, sm);
  console.log("Guia das máquinas atualizado (secções, FAQ, datas, sitemap).");
} else console.log("Sem alterações.");
