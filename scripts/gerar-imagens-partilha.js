#!/usr/bin/env node
/**
 * Gera as imagens de partilha (Open Graph, 1200×630) em imagens/partilha/:
 * - ondecortar.jpg — homepage, perfis, páginas de cidade e páginas institucionais
 * - ondecortar-donos.jpg — registar.html (para donos de barbearias)
 *
 * O mapa de fundo é desenhado com as coordenadas reais das barbearias públicas do continente
 * (Barbeiros/barbearias.limpo.js). Identidade dos perfis: preto mate, creme, âmbar, Big Shoulders + Geist.
 * Correr de novo se o número de barbearias mudar de patamar (o texto diz "Mais de 1000").
 *
 * Uso: node scripts/gerar-imagens-partilha.js   (usa o Chromium do Playwright, que já é dependência)
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "imagens", "partilha");
const { barbearias } = require(path.join(ROOT, "Barbeiros", "barbearias.limpo.js"));

// Continente: caixa de coordenadas → área do mapa à direita do cartão
const BOX = { latMin: 36.95, latMax: 42.16, lonMin: -9.52, lonMax: -6.18 };
const MAP = { x: 760, y: 40, h: 550 };
MAP.w = MAP.h * ((BOX.lonMax - BOX.lonMin) * Math.cos((39.5 * Math.PI) / 180)) / (BOX.latMax - BOX.latMin);

const pontos = barbearias
  .filter((b) => b.mostrar_no_mapa !== false && Array.isArray(b.coords))
  .map((b) => [Number(b.coords[0]), Number(b.coords[1])])
  .filter(([lat, lon]) => lat >= BOX.latMin && lat <= BOX.latMax && lon >= BOX.lonMin && lon <= BOX.lonMax)
  .map(([lat, lon]) => [
    MAP.x + ((lon - BOX.lonMin) / (BOX.lonMax - BOX.lonMin)) * MAP.w,
    MAP.y + ((BOX.latMax - lat) / (BOX.latMax - BOX.latMin)) * MAP.h,
  ]);
const dots = pontos.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2"/>`).join("");

const WA = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const CARDS = [
  {
    file: "ondecortar.jpg",
    eyebrow: "Barbearias em Portugal",
    title: 'Encontra uma<br>barbearia<br><em>perto de ti</em>',
    sub: "Mais de 1000 barbearias em 320 cidades",
    chips: ["Mapa", "Horário", "Contactos", "Marcação"],
  },
  {
    file: "ondecortar-donos.jpg",
    eyebrow: "Para barbeiros",
    title: 'Põe a tua barbearia <em>no mapa</em>',
    sub: "Ficha gratuita, sem comissões",
    chips: ["Sem mensalidade", `<svg viewBox="0 0 24 24" class="wa"><path d="${WA}"/></svg> Agora com WhatsApp`],
  },
];

const html = (c) => `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&family=Geist:wght@400;500;600&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;background:#141614;font-family:Geist,sans-serif;color:#ECE7DD;position:relative}
  .bg{position:absolute;inset:0;background:
    repeating-linear-gradient(135deg,rgba(255,255,255,.018) 0 2px,transparent 2px 14px),
    radial-gradient(circle at 80% 45%,rgba(200,135,58,.20),transparent 46%),
    linear-gradient(160deg,#1B2A21 0%,#141614 62%)}
  .bar{position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,#C8873A,transparent 75%)}
  svg.map{position:absolute;left:0;top:0;width:1200px;height:630px}
  svg.map circle{fill:#E3A863;opacity:.55}
  .copy{position:absolute;left:72px;top:52px;width:650px}
  .brand{font-family:"Big Shoulders Display";font-weight:800;font-size:44px;letter-spacing:.01em}
  .brand sup{font-family:Geist;font-size:15px;font-weight:600;letter-spacing:.14em;color:#E3A863;margin-left:4px;vertical-align:22px}
  .eyebrow{margin-top:34px;display:inline-block;padding:7px 16px;border:1.5px solid rgba(200,135,58,.6);border-radius:999px;color:#E3A863;font-size:17px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
  h1{margin-top:20px;font-family:"Big Shoulders Display";font-weight:800;font-size:82px;line-height:.9;text-transform:uppercase;letter-spacing:.005em}
  h1 em{font-style:normal;color:#E3A863}
  .rule{width:84px;height:5px;background:#C8873A;border-radius:3px;margin:22px 0 18px}
  .sub{font-size:28px;font-weight:500;color:#D6CFC2}
  .chips{margin-top:20px;display:flex;gap:12px;flex-wrap:wrap}
  .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:20px;font-weight:500;color:#ECE7DD}
  .chip .wa{width:22px;height:22px;fill:#25D366}
  .url{position:absolute;left:72px;bottom:44px;font-size:20px;font-weight:600;letter-spacing:.06em;color:#9A9384}
</style></head><body>
<div class="bg"></div><div class="bar"></div>
<svg class="map" viewBox="0 0 1200 630">${dots}</svg>
<div class="copy">
  <div class="brand">OndeCortar<sup>.PT</sup></div>
  <div class="eyebrow">${c.eyebrow}</div>
  <h1>${c.title}</h1>
  <div class="rule"></div>
  <div class="sub">${c.sub}</div>
  <div class="chips">${c.chips.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
</div>
</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of CARDS) {
    await page.setContent(html(c), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, c.file), type: "jpeg", quality: 86 });
    console.log("imagens/partilha/" + c.file);
  }
  await browser.close();
  console.log("pontos no mapa: " + pontos.length);
})();
