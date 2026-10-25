#!/usr/bin/env node
/**
 * Idempotente — cartão "Vais esperar pela Black Friday?" (markers OC-BF-LINK-START/END) nas páginas
 * de máquinas e OneBlade com mais intenção de compra, a apontar para loja/black-friday/.
 * Uso: node scripts/apply-black-friday-links.js            (insere/atualiza)
 *      node scripts/apply-black-friday-links.js --remover  (tira os cartões — depois de 30/11)
 * Não mexe em datas (dateModified, sitemap): é só um link, não uma mudança de conteúdo.
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
    after: 'id="se-so-um"',
    anchor: "maquinas",
    text: "Se não tens pressa, a Black Friday é a 27 de novembro e a Amazon.es costuma começar as ofertas uns dias antes. Juntámos numa lista as máquinas deste guia que vale a pena vigiar, com dicas para confirmar se o desconto é real."
  },
  {
    file: "revista/qual-oneblade-comprar/index.html",
    after: 'id="produtos-recomendados"',
    anchor: "barba",
    text: "O OneBlade 360 e o Pro 360 estão na nossa lista para a Black Friday (27 de novembro). Se não tens pressa, vê lá os aparadores a vigiar e como confirmar se o desconto é real."
  },
  {
    file: "loja/maquinas-de-cortar/index.html",
    after: 'id="top-escolhas"',
    anchor: "maquinas",
    text: "Se não tens pressa, a Black Friday é a 27 de novembro e a Amazon.es costuma começar as ofertas uns dias antes. Juntámos numa lista as máquinas que vale a pena vigiar, com dicas para confirmar se o desconto é real."
  }
];

const block = (p) => START + '<section class="section oc-bf-link" id="black-friday"><div class="container callout-card article-category-bridge">' +
  '<span class="eyebrow">Black Friday 2026</span><h2>Vais esperar pela Black Friday?</h2><p>' + p.text + '</p>' +
  '<div class="hero-actions"><a class="btn btn-primary" href="../../loja/black-friday/#' + p.anchor + '">Ver a lista da Black Friday</a></div>' +
  '</div></section>' + END;

for (const p of PAGES) {
  const file = path.join(ROOT, p.file);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html.replace(new RegExp(START + "[\\s\\S]*?" + END), "");
  if (!REMOVE) {
    const i = html.indexOf(p.after);
    if (i < 0) throw new Error(p.file + ": sem " + p.after);
    const end = html.indexOf("</section>", i);
    if (end < 0) throw new Error(p.file + ": secção sem </section>");
    const at = end + "</section>".length;
    html = html.slice(0, at) + block(p) + html.slice(at);
  }
  if (html !== before) fs.writeFileSync(file, html, "utf8");
  console.log((html === before ? "igual    " : REMOVE ? "removido " : "atualizado ") + p.file);
}
