#!/usr/bin/env node
/**
 * Gera as imagens de partilha (Open Graph, 1200×630) em imagens/partilha/:
 * - ondecortar-v2.jpg — homepage, perfis, páginas de cidade e páginas institucionais
 * - ondecortar-donos-v2.jpg — registar.html (para donos de barbearias)
 *   (os ondecortar.jpg / ondecortar-donos.jpg antigos ficam para partilhas já feitas)
 * - ondecortar-loja.jpg / ondecortar-revista.jpg — páginas da loja e índices/categorias da revista
 *   (os artigos e os produtos usam a própria foto; ver apply-share-tags.js)
 *
 * Cartões principais: verde-escuro, símbolo dourado (imagens/logo-ondecortar-512.png) e mapa de Portugal
 * (imagens/partilha/mapa-portugal.png), como a capa do Facebook. Big Shoulders + Geist.
 * Correr de novo se o número de barbearias mudar de patamar (o texto diz "Mais de 1000").
 *
 * Uso: node scripts/gerar-imagens-partilha.js   (usa o Chromium do Playwright, que já é dependência)
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "imagens", "partilha");

// Identidade nova (2026-10-25, igual à capa do Facebook): verde-escuro, símbolo dourado e mapa de Portugal
// com as cidades. Tudo entre x 140 e 1070: o WhatsApp mostra só o centro (corta ~120 px de cada lado).
// Nome do ficheiro com versão (-v2): o Facebook e o WhatsApp guardam a imagem por URL — mudar o nome obriga a nova recolha.
const png64 = (rel) => "data:image/png;base64," + fs.readFileSync(path.join(ROOT, rel)).toString("base64");
const LOGO = png64("imagens/logo-ondecortar-512.png");
const MAPA = png64("imagens/partilha/mapa-portugal.png");

const WA = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const CARDS = [
  {
    file: "ondecortar-v2.jpg",
    eyebrow: "Barbearias em Portugal",
    title: "Encontra uma<br>barbearia<br><em>perto de ti</em>",
    sub: "Mais de 1000 barbearias,<br>com mapa e horário",
    pill: "ONDECORTAR.PT",
  },
  {
    file: "ondecortar-donos-v2.jpg",
    eyebrow: "Para barbeiros",
    title: "Põe a tua<br>barbearia<br><em>no mapa</em>",
    sub: "Ficha gratuita,<br>sem comissões",
    pill: `<svg viewBox="0 0 24 24" class="wa"><path d="${WA}"/></svg> Agora com WhatsApp`,
  },
];

const html = (c) => `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&family=Geist:wght@400;500;600&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;position:relative;font-family:Geist,sans-serif;color:#F3ECDD;
    background:radial-gradient(ellipse at 76% 50%,#143024 0%,rgba(20,48,36,0) 45%),radial-gradient(ellipse at 25% 45%,#10241b 0%,rgba(16,36,27,0) 50%),linear-gradient(120deg,#07110d 0%,#0e1c17 55%,#0b1712 100%)}
  .stripes{position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.018) 0 2px,transparent 2px 16px)}
  .bar{position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,transparent,#D9A55A 30%,#D9A55A 70%,transparent)}
  .mapa{position:absolute;left:752px;top:62px;height:506px;-webkit-mask-image:linear-gradient(to right,transparent,#000 9%,#000 91%,transparent),linear-gradient(to bottom,transparent,#000 5%,#000 95%,transparent);-webkit-mask-composite:source-in}
  .vline{position:absolute;left:728px;top:120px;width:1.5px;height:390px;background:linear-gradient(transparent,rgba(217,165,90,.55),transparent)}
  .copy{position:absolute;left:142px;top:58px;width:570px}
  .brand{display:flex;align-items:center;gap:18px}
  .logo{width:112px;height:112px;border-radius:50%;background:url(${LOGO}) center/100% no-repeat;box-shadow:0 0 36px rgba(217,165,90,.3);flex:none}
  .eyebrow{font-size:16px;font-weight:600;letter-spacing:.2em;color:#E3A863;text-transform:uppercase}
  .wm{font-family:"Big Shoulders Display";font-weight:800;font-size:42px;margin-top:2px}
  .wm sup{font-family:Geist;font-size:14px;font-weight:600;letter-spacing:.14em;color:#E3A863;margin-left:3px;vertical-align:19px}
  h1{margin-top:22px;font-family:"Big Shoulders Display";font-weight:800;font-size:76px;line-height:.92;text-transform:uppercase}
  h1 em{font-style:normal;color:#E3A863}
  .foot{margin-top:22px;display:flex;align-items:center;gap:18px}
  .sub{font-size:22px;font-weight:500;line-height:1.3;color:#D9D1C1}
  .pill{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:12px;background:#1F5A3D;border:1.5px solid #3E8A61;font-family:"Big Shoulders Display";font-weight:800;font-size:24px;letter-spacing:.04em;white-space:nowrap}
  .pill .wa{width:22px;height:22px;fill:#25D366}
</style></head><body>
<div class="stripes"></div><div class="bar"></div>
<img class="mapa" src="${MAPA}"><div class="vline"></div>
<div class="copy">
  <div class="brand"><div class="logo"></div><div><div class="eyebrow">${c.eyebrow}</div><div class="wm">OndeCortar<sup>.PT</sup></div></div></div>
  <h1>${c.title}</h1>
  <div class="foot"><div class="sub">${c.sub}</div><div class="pill">${c.pill}</div></div>
</div>
</body></html>`;

// Loja e revista: identidade própria (commerce.css) — Playfair Display + Plus Jakarta Sans.
// Loja = painel verde-escuro com riscas, linha dourada e fotos em quadro creme; revista = creme com foto editorial.
const img64 = (rel) => "data:image/jpeg;base64," + fs.readFileSync(path.join(ROOT, rel)).toString("base64");
const SECOES = [
  {
    file: "ondecortar-loja.jpg", theme: "loja",
    eyebrow: "Loja OndeCortar",
    title: "Cortar e cuidar da barba <em>em casa</em>",
    sub: "Máquinas, aparadores e kits que recomendamos, com link para a Amazon.es",
    chips: ["Máquinas", "Barba", "Prendas"],
    fotos: ["imagens/produtos/philips-hc5630.jpg", "imagens/produtos/philips-oneblade-360-qp2724.jpg", "imagens/produtos/VikingRevolution.jpg"],
  },
  {
    file: "ondecortar-revista.jpg", theme: "revista",
    eyebrow: "Revista OndeCortar",
    title: "Guias práticos de <em>barbearia</em>",
    sub: "Cortes, barba e máquinas, explicados em português de Portugal",
    chips: ["Cortes", "Barba", "Guias de compra"],
    foto: "imagens/revista/barbeiro-degrade-maquina.jpg",
  },
];

const htmlSecao = (c) => {
  const loja = c.theme === "loja";
  const art = loja
    ? `<div class="fotos">${c.fotos.map((f, i) => `<div class="quadro q${i}"><img src="${img64(f)}"></div>`).join("")}</div>`
    : `<div class="foto"><img src="${img64(c.foto)}"></div>`;
  return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;position:relative;font-family:"Plus Jakarta Sans",sans-serif;
    background:${loja ? "repeating-linear-gradient(135deg,rgba(255,255,255,.02) 0 2px,transparent 2px 16px),radial-gradient(circle at 78% 40%,rgba(200,160,80,.22),transparent 45%),linear-gradient(150deg,#121a15,#1f3025)" : "radial-gradient(circle at 12% 10%,rgba(176,138,74,.16),transparent 40%),#F4EDE1"};
    color:${loja ? "#F3ECDD" : "#1F1913"}}
  .bar{position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,${loja ? "#D4A752" : "#8A5714"},transparent 75%)}
  .copy{position:absolute;left:140px;top:54px;width:${loja ? 500 : 480}px}
  .brand{font-family:"Playfair Display";font-weight:800;font-size:40px}
  .brand sup{font-family:"Plus Jakarta Sans";font-size:15px;font-weight:700;letter-spacing:.14em;color:${loja ? "#D4A752" : "#8A5714"};margin-left:4px;vertical-align:20px}
  .eyebrow{margin-top:30px;display:inline-block;padding:7px 16px;border:1.5px solid ${loja ? "rgba(212,167,82,.65)" : "rgba(138,87,20,.45)"};border-radius:999px;color:${loja ? "#D4A752" : "#8A5714"};font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
  h1{margin-top:20px;font-family:"Playfair Display";font-weight:800;font-size:${loja ? 56 : 62}px;line-height:1.04}
  h1 em{font-style:italic;color:${loja ? "#D4A752" : "#8A5714"}}
  .rule{width:84px;height:5px;background:${loja ? "#D4A752" : "#8A5714"};border-radius:3px;margin:22px 0 16px}
  .sub{font-size:24px;font-weight:500;line-height:1.35;color:${loja ? "#D9D1C1" : "#4E473D"}}
  .chips{margin-top:20px;display:flex;gap:10px}
  .chip{padding:7px 15px;border-radius:999px;font-size:18px;font-weight:600;
    background:${loja ? "rgba(255,255,255,.07)" : "rgba(138,87,20,.08)"};border:1px solid ${loja ? "rgba(255,255,255,.14)" : "rgba(138,87,20,.2)"}}
  .fotos{position:absolute;right:135px;top:80px;width:470px;height:490px;transform:scale(.88);transform-origin:right top}
  .quadro{position:absolute;background:#f6efe3;border-radius:22px;padding:18px;box-shadow:0 18px 40px rgba(0,0,0,.35);border:2px solid rgba(212,167,82,.5)}
  .quadro img{display:block;width:100%;height:100%;object-fit:contain;border-radius:10px;background:#fff}
  .q0{left:0;top:40px;width:250px;height:300px;transform:rotate(-4deg)}
  .q1{right:0;top:0;width:220px;height:260px;transform:rotate(3deg)}
  .q2{right:30px;bottom:0;width:260px;height:230px;transform:rotate(-2deg)}
  .foto{position:absolute;right:0;top:0;width:560px;height:630px;overflow:hidden}
  .foto img{width:100%;height:100%;object-fit:cover;object-position:62% 50%}
  .foto::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#F4EDE1 0%,rgba(244,237,225,0) 22%)}
</style></head><body>
<div class="bar"></div>${art}
<div class="copy">
  <div class="brand">OndeCortar<sup>.PT</sup></div>
  <div class="eyebrow">${c.eyebrow}</div>
  <h1>${c.title}</h1>
  <div class="rule"></div>
  <div class="sub">${c.sub}</div>
  <div class="chips">${c.chips.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
</div></body></html>`;
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of [...CARDS, ...SECOES]) {
    await page.setContent(c.theme ? htmlSecao(c) : html(c), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, c.file), type: "jpeg", quality: 86 });
    console.log("imagens/partilha/" + c.file);
  }
  await browser.close();
})();
