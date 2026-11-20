// Radar de procura — passo no browser: volume de compras na Amazon.es por termo.
// Correr numa aba aberta em https://www.amazon.es/ (mesma origem; o Node é bloqueado como robô).
// Uso (javascript_tool): colar este ficheiro e depois `await radarVolume(["tinte barba hombre", "champu barba"])`.
// Para muitos termos (o javascript_tool corta aos 45 s): `radarVolumeFundo([...])` e ler `window.__radar` aos bocados.
//
// Por termo devolve os 12 primeiros resultados orgânicos e patrocinados com ASIN, título, "comprados el mes pasado"
// (50+ → 50, 1 mil+ → 1000), e a soma desse número nos 12 — o "volume" do termo. Não abre fichas: para
// vendedor e stock, ver a ficha do produto escolhido (fetch('/dp/ASIN'), como em scripts/check-amazon-links.js).
// Criado a 2026-11-20 (nicho da tinta de barba: Control GX 900+, gel M35 600+).
(function () {
  const num = (t) => {
    const m = String(t || "").replace(/\s/g, "").match(/([\d.,]+)(mil|k)?\+/i);
    if (!m) return 0;
    const n = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
    return m[2] ? n * 1000 : n;
  };
  async function umTermo(termo) {
    const h = await fetch("/s?k=" + encodeURIComponent(termo) + "&language=es_ES").then((r) => r.text());
    const d = new DOMParser().parseFromString(h, "text/html");
    const itens = [...d.querySelectorAll('[data-component-type="s-search-result"]')].slice(0, 12).map((el) => {
      const txt = el.innerText || el.textContent || "";
      const comprados = (txt.match(/[\d.,]+\s*(mil|k)?\s*\+?\s*comprados[^\n]*/i) || [""])[0].trim();
      return {
        asin: el.dataset.asin,
        titulo: (el.querySelector("h2") || {}).textContent ? el.querySelector("h2").textContent.trim().slice(0, 90) : "",
        comprados,
        n: num(comprados),
        patrocinado: /Patrocinado|Sponsored/.test(txt)
      };
    });
    const vistos = new Set();
    const unicos = itens.filter((i) => i.asin && !vistos.has(i.asin) && vistos.add(i.asin));
    return { termo, volume: unicos.reduce((a, i) => a + i.n, 0), top: unicos.sort((a, b) => b.n - a.n).slice(0, 5) };
  }
  window.radarVolume = async function (termos) {
    const out = [];
    for (const t of termos) { out.push(await umTermo(t)); await new Promise((r) => setTimeout(r, 1200)); }
    return out.sort((a, b) => b.volume - a.volume);
  };
  window.radarVolumeFundo = function (termos) {
    window.__radar = [];
    window.__radarFim = false;
    (async () => {
      for (const t of termos) {
        try { window.__radar.push(await umTermo(t)); } catch (e) { window.__radar.push({ termo: t, erro: String(e) }); }
        await new Promise((r) => setTimeout(r, 1200));
      }
      window.__radarFim = true;
    })();
    return termos.length + " termos em fundo; ler window.__radar e window.__radarFim";
  };
  return "radarVolume pronto";
})();
