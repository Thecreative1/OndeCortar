// Vê se o link de marcação de cada ficha permite mesmo marcar → Barbeiros/marcacao-verificada.json.
// Não mexe nos dados. O build lê o ficheiro e só põe o botão "Marcar online" nas fichas com marca: true.
// Correr de vez em quando e depois de acrescentar links de marcação: os estados mudam com o tempo.
//
// Fresha: /lvp/ é uma página feita pelo Fresha a partir de dados públicos ("Call to book", "not currently
// affiliated"), /lp/ é uma listagem de distrito e "isBookable":false é "Bookings offline". Nenhuma marca.
// Buk: responde 200 mesmo sem a página existir; o título genérico é o sinal de "Page not found".
const fs = require("fs");
const path = require("path");
const { barbearias } = require("../Barbeiros/barbearias.limpo.js");

const OUT = path.join(__dirname, "..", "Barbeiros", "marcacao-verificada.json");
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Accept-Language": "pt-PT,pt;q=0.9"
};
const PLATAFORMAS = [[/fresha\.com$/, "Fresha"], [/noona\.(pt|app)$/, "Noona"], [/buk\.pt$/, "Buk"], [/booksy\.com$/, "Booksy"],
  [/treatwell\./, "Treatwell"], [/ongenda\.com$/, "Ongenda"], [/setmore\.com$/, "Setmore"], [/tuaagenda\.com$/, "Tua Agenda"]];

// Os links que o build pode publicar, pela mesma ordem (normalizeLinks + classifyLink)
function linksMarcacao(item) {
  const links = [String(item.booking || "").trim()];
  for (const campo of ["website", "instagram", "facebook", "google_maps", "google"]) {
    const value = String(item[campo] || "").trim();
    if (/instagram\.com|facebook\.com|fb\.com/i.test(value)) continue;
    if (/fresha\.com|treatwell\.|ongenda\.com|buk\.pt/i.test(value)) links.push(value);
  }
  return [...new Set(links.filter(Boolean))];
}

// Fica o primeiro link que marca; os outros vão para `falhados`, que o build não publica
async function verificarFicha(links) {
  const falhados = [];
  let primeiro = null;
  for (const url of links) {
    const resultado = await verificar(url);
    if (resultado.marca) return { ...resultado, url, ...(falhados.length ? { falhados } : {}) };
    primeiro = primeiro || { ...resultado, url };
    falhados.push(url);
    await new Promise((done) => setTimeout(done, 500));
  }
  return { ...primeiro, ...(falhados.length > 1 ? { falhados: falhados.slice(1) } : {}) };
}

function avaliar(status, finalUrl, html) {
  if (status !== 200) return { marca: false, motivo: "erro-" + status };
  const { hostname, pathname } = new URL(finalUrl);
  const plataforma = (PLATAFORMAS.find(([re]) => re.test(hostname)) || [null, "Site próprio"])[1];
  const titulo = (html.match(/<title[^>]*>([^<]*)</i) || [])[1] || "";
  if (plataforma === "Fresha") {
    if (/\/lvp\//.test(pathname)) return { marca: false, motivo: "fresha-sem-parceria" };
    if (/\/lp\//.test(pathname)) return { marca: false, motivo: "fresha-listagem" };
    const bookable = html.match(/"isBookable":(true|false)/);
    if (bookable) return bookable[1] === "true" ? { marca: true, motivo: plataforma } : { marca: false, motivo: "fresha-offline" };
    return /\/providers\//.test(pathname) ? { marca: true, motivo: plataforma } : { marca: false, motivo: "fresha-por-confirmar" };
  }
  if (plataforma === "Buk" && /^BUK \|/i.test(titulo.trim())) return { marca: false, motivo: "buk-nao-encontrada" };
  return { marca: true, motivo: plataforma };
}

async function verificar(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow", signal: ctrl.signal });
    return avaliar(res.status, res.url, await res.text());
  } catch (err) {
    return { marca: false, motivo: "erro-ligacao" };
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  const fichas = barbearias
    .filter((b) => b.mostrar_no_mapa !== false)
    .map((b) => ({ slug: b.slug, links: linksMarcacao(b) }))
    .filter((b) => b.links.length);
  const resultado = {};
  const fila = fichas.slice();
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (fila.length) {
      const { slug, links } = fila.shift();
      resultado[slug] = await verificarFicha(links);
      await new Promise((done) => setTimeout(done, 500));
    }
  }));
  const ordenado = {};
  Object.keys(resultado).sort().forEach((slug) => { ordenado[slug] = resultado[slug]; });
  fs.writeFileSync(OUT, JSON.stringify({ verificado_em: new Date().toISOString().slice(0, 10), fichas: ordenado }, null, 2) + "\n");

  const contagem = {};
  Object.values(ordenado).forEach((f) => { contagem[f.motivo] = (contagem[f.motivo] || 0) + 1; });
  console.log("Fichas com link de marcação:", fichas.length);
  console.log("Marcam mesmo:", Object.values(ordenado).filter((f) => f.marca).length);
  console.log(contagem);
})();
