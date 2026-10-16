// Idempotente — secção "O que dizem os preços publicados" no artigo dos preços, calculada a partir
// do campo `precos` de barbearias.limpo.js (markers OC-PRECOS-DADOS-START/END):
//   node scripts/apply-revista-precos-dados.js
// Correr depois de recolher/aplicar preços novos (recolher-precos.js + aplicar-precos.js).
// Só números que os dados mostram: medianas e intervalo do meio (25–75 %), com a amostra e o método.

const fs = require("fs");
const path = require("path");
const { barbearias } = require("../Barbeiros/barbearias.limpo.js");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "revista", "quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal", "index.html");
const START = "<!-- OC-PRECOS-DADOS-START -->";
const END = "<!-- OC-PRECOS-DADOS-END -->";
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

function quantil(values, f) {
  const a = values.slice().sort((x, y) => x - y);
  const i = (a.length - 1) * f, lo = Math.floor(i);
  return a[lo] + (a[Math.ceil(i)] - a[lo]) * (i - lo);
}
function euro(v) {
  const r = Math.round(v * 2) / 2; // arredonda a 0,50 €
  return (r % 1 ? r.toFixed(2).replace(".", ",") : String(r)) + " €";
}

const comPreco = barbearias.filter((b) => b.mostrar_no_mapa !== false && b.precos);
const datas = comPreco.map((b) => b.precos.fonte && b.precos.fonte.data).filter(Boolean).sort();
const ultima = datas[datas.length - 1];
const [ano, mes] = ultima.split("-").map(Number);
const fontes = [...new Set(comPreco.map((b) => b.precos.fonte.nome))].filter((n) => n !== "Barbearia").sort();

const linhas = [["corte", "Corte"], ["barba", "Barba"], ["corte_barba", "Corte + barba"]].map(([k, label]) => {
  const v = comPreco.map((b) => b.precos[k]).filter((x) => typeof x === "number");
  return { label, n: v.length, med: quantil(v, 0.5), p25: quantil(v, 0.25), p75: quantil(v, 0.75), min: Math.min(...v), max: Math.max(...v) };
});
const corte = linhas[0], cb = linhas[2];

const html = START + '<article class="article-section" id="precos-publicados"><h2>O que dizem os preços publicados</h2>' +
  "<p>Em " + MESES[mes - 1] + " de " + ano + " lemos as tabelas de preços que " + comPreco.length +
  " barbearias do directório publicam na sua página de marcações (" + fontes.join(", ") + "). Para cada casa ficou o preço «desde» de cada serviço — o mais barato para um adulto, sem promoções, estagiários nem pacotes de família.</p>" +
  '<ul class="rich-list">' +
  linhas.map((l) => "<li><strong>" + l.label + ":</strong> mediana de " + euro(l.med) + "; metade das casas cobra entre " + euro(l.p25) + " e " + euro(l.p75) +
    " (de " + euro(l.min) + " a " + euro(l.max) + ", " + l.n + " barbearias)</li>").join("") +
  "</ul>" +
  "<p>Na prática, o corte numa casa com marcação online anda pelos " + euro(corte.p25).replace(" €", "") + " a " + euro(corte.p75) +
  " — na zona onde os intervalos da barbearia tradicional e da moderna se tocam — e juntar a barba leva o total para perto de " + euro(cb.med) +
  ". Atenção à amostra: são só casas que publicam preços online, por isso não representam as barbearias de bairro sem marcação.</p>" +
  '<p>Cada perfil com preços mostra a fonte e a data da consulta — por exemplo, procura «Preços» no resumo do perfil depois de abrires uma barbearia no <a href="../../#explorar">mapa</a> ou nas <a href="../../cidades/">páginas de cidade</a>. És dono de uma barbearia? <a href="../../registar.html">Envia-nos os teus preços</a> e aparecem no teu perfil.</p>' +
  "</article>" + END;

let page = fs.readFileSync(FILE, "utf8");
if (page.includes(START)) {
  page = page.replace(new RegExp(START + "[\\s\\S]*?" + END), html);
} else {
  const anchor = '<section class="section"><div class="container article-body">';
  if (!page.includes(anchor)) throw new Error("Âncora do artigo não encontrada");
  page = page.replace(anchor, anchor + html);
}
// dateModified (JSON-LD) e linha "Atualizado em" — só se os dados forem mais recentes.
page = page.replace(/"dateModified":"(\d{4}-\d{2}-\d{2})"/, (m, d) => (ultima > d ? '"dateModified":"' + ultima + '"' : m));
const atualizado = '<span>Atualizado em <time datetime="' + ultima + '">' + Number(ultima.slice(8)) + " de " + MESES[mes - 1] + " de " + ano + "</time></span>";
page = page.replace(/<span>Atualizado em <time datetime="[^"]*">[^<]*<\/time><\/span>/, atualizado);
if (!page.includes("Atualizado em <time")) {
  page = page.replace(/(Publicado em <time datetime="[^"]*">[^<]*<\/time><\/span>)/, "$1" + atualizado);
}
fs.writeFileSync(FILE, page);
console.log("Secção de preços atualizada:", comPreco.length, "barbearias; corte mediana", euro(corte.med));
