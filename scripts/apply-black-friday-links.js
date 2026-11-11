#!/usr/bin/env node
/**
 * Idempotente — cartão "Black Friday na Amazon.es: de 19 a 30 de novembro" (markers OC-BF-LINK-START/END) nas páginas
 * de máquinas e OneBlade com mais intenção de compra, a apontar para loja/black-friday/.
 * Uso: node scripts/apply-black-friday-links.js            (insere/atualiza)
 *      node scripts/apply-black-friday-links.js --remover  (tira os cartões — depois de 30/11)
 * Não mexe em datas (dateModified, sitemap): é só um link, não uma mudança de conteúdo.
 * O cartão fica antes do FAQ, depois dos produtos: a 25/10 ficou logo a seguir às escolhas e os cliques
 * na Amazon do guia das máquinas desceram de 67 para 28 por 100 visitas (hipótese, medir). Não o voltar
 * a subir: ver "não mexer em artigos que funcionam" no CLAUDE.md.
 * 11/11: título "Vais esperar pela Black Friday?" e "Se não tens pressa…" trocados pelas datas confirmadas
 * (19–30/11) e pela nota de que os links já mostram o preço do dia — o texto antigo pedia para adiar a compra.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const START = "<!-- OC-BF-LINK-START -->";
const END = "<!-- OC-BF-LINK-END -->";
const REMOVE = process.argv.includes("--remover");

const PAGES = [
  {
    file: "revista/melhores-maquinas-para-cortar-cabelo-em-casa/index.html",
    before: 'id="faq-artigo"',
    anchor: "maquinas",
    text: "Os links deste guia levam à Amazon.es, onde vês sempre o preço do dia, com ou sem desconto. Se quiseres comparar, juntámos numa lista as máquinas a vigiar e como confirmar se o desconto é real."
  },
  {
    file: "revista/qual-oneblade-comprar/index.html",
    before: 'id="faq-artigo"',
    anchor: "barba",
    text: "O OneBlade 360 e o Pro 360 estão na nossa lista. Os links desta página levam à Amazon.es, onde vês sempre o preço do dia, com ou sem desconto."
  },
  {
    file: "loja/maquinas-de-cortar/index.html",
    before: 'id="faq-categoria"',
    anchor: "maquinas",
    text: "Os links desta página levam à Amazon.es, onde vês sempre o preço do dia, com ou sem desconto. Se quiseres comparar, juntámos numa lista as máquinas a vigiar e como confirmar se o desconto é real."
  }
];

const block = (p) => START + '<section class="section oc-bf-link" id="black-friday"><div class="container callout-card article-category-bridge">' +
  '<span class="eyebrow">Black Friday 2026</span><h2>Black Friday na Amazon.es: de 19 a 30 de novembro</h2><p>' + p.text + '</p>' +
  '<div class="hero-actions"><a class="btn btn-primary" href="../../loja/black-friday/#' + p.anchor + '">Ver a lista da Black Friday</a></div>' +
  '</div></section>' + END;

for (const p of PAGES) {
  const file = path.join(ROOT, p.file);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html.replace(new RegExp(START + "[\\s\\S]*?" + END), "");
  if (!REMOVE) {
    const i = html.indexOf(p.before);
    if (i < 0) throw new Error(p.file + ": sem " + p.before);
    const at = html.lastIndexOf("<section", i);
    if (at < 0) throw new Error(p.file + ": " + p.before + " fora de uma secção");
    html = html.slice(0, at) + block(p) + html.slice(at);
  }
  if (html !== before) fs.writeFileSync(file, html, "utf8");
  console.log((html === before ? "igual    " : REMOVE ? "removido " : "atualizado ") + p.file);
}
