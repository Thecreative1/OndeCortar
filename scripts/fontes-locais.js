/**
 * Fontes servidas pelo próprio site (fonts/*.woff2, subconjunto latino) em vez do Google Fonts:
 * o IP de quem visita deixa de ir para a Google e há menos ligações antes de mostrar o texto.
 * Todos os ficheiros são fontes variáveis (um ficheiro por família); cada página declara só as
 * famílias e o intervalo de pesos que carregava do Google, para o aspeto ficar igual.
 *
 * Usado pelo build (perfis e cidades) e por apply-fontes-locais.js (páginas manuais).
 * Ficheiros descarregados de fonts.gstatic.com a 2026-10-31 (bloco "latin" do CSS do Google Fonts).
 */
const FILES = {
  "Big Shoulders Display": { normal: "big-shoulders-display-latin.woff2" },
  "Geist": { normal: "geist-latin.woff2" },
  "Geist Mono": { normal: "geist-mono-latin.woff2" },
  "Bricolage Grotesque": { normal: "bricolage-grotesque-latin.woff2" },
  "Manrope": { normal: "manrope-latin.woff2" },
  "Instrument Serif": { normal: "instrument-serif-latin.woff2", italic: "instrument-serif-italic-latin.woff2" },
  "Plus Jakarta Sans": { normal: "plus-jakarta-sans-latin.woff2" },
  "Playfair Display": { normal: "playfair-display-latin.woff2", italic: "playfair-display-italic-latin.woff2" },
};

// faces: [[família, pesos ("700 800" ou "400"), estilo opcional ("italic")], …]
// prefix: caminho até à raiz do site ("../../", "" ou "/")
function fontFaceCss(prefix, faces) {
  return faces.map(([family, weight, style = "normal"]) => {
    const file = FILES[family] && FILES[family][style];
    if (!file) throw new Error("Fonte local em falta: " + family + " " + style);
    return "@font-face{font-family:\"" + family + "\";font-style:" + style + ";font-weight:" + weight +
      ";font-display:swap;src:url(\"" + prefix + "fonts/" + file + "\") format(\"woff2\")}";
  }).join("");
}

function fontStyleTag(prefix, faces) {
  return "<style id=\"oc-fonts\">" + fontFaceCss(prefix, faces) + "</style>";
}

// Mesmas famílias e pesos que cada tipo de página pedia ao Google Fonts
const PROFILE_FACES = [["Big Shoulders Display", "700 800"], ["Geist", "400 600"], ["Geist Mono", "400 500"]];
const CITY_FACES = [["Big Shoulders Display", "700 800"], ["Plus Jakarta Sans", "400 800"]];

module.exports = { FILES, fontFaceCss, fontStyleTag, PROFILE_FACES, CITY_FACES };
