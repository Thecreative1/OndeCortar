// Aplica Barbeiros/precos-recolhidos.json (de recolher-precos.js) ao barbearias.limpo.js:
//   node scripts/aplicar-precos.js          → mostra o que mudava (não escreve)
//   node scripts/aplicar-precos.js --gravar → escreve o campo `precos` nas fichas
// Só entra quem tem o nome da página confirmado (`nome_ok`). Regras de coerência:
//   corte < 5 € ou barba < 3 € → fora (quase sempre estagiário/promo não apanhado);
//   corte+barba mais barato do que o corte ou a barba → só o corte+barba sai.
// Insere o bloco à mão (antes de "observacoes") para não reformatar o resto do ficheiro.

const fs = require("fs");
const path = require("path");
const { classify } = require("./recolher-precos.js");

// Revistos à mão (2026-10-16): o nome da página é a mesma casa com outra grafia.
const NOME_REVISTO = new Set(["bl3ss3d-barbershop-777", "boss-cut-mangualde", "buzzbbarber", "the-jimmy-s-barbershop-carcavelos"]);

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "Barbeiros", "barbearias.limpo.js");
const IN = path.join(ROOT, "Barbeiros", "precos-recolhidos.json");
const gravar = process.argv.includes("--gravar");

function limpo(r) {
  let corte = r.corte >= 5 ? r.corte : null;
  let barba = r.barba >= 3 ? r.barba : null;
  let cb = r.corte_barba;
  if (cb != null && (cb < (corte || 0) || cb < (barba || 0) || cb < 5)) cb = null;
  if (corte == null && barba == null && cb == null) return null;
  return { corte: corte, barba: barba, corte_barba: cb, fonte: { nome: r.fonte.nome, url: r.fonte.url, data: r.fonte.data } };
}

function bloco(p) {
  const linhas = ["    \"precos\": {"];
  const campos = [];
  ["corte", "barba", "corte_barba"].forEach((k) => { if (p[k] != null) campos.push("      \"" + k + "\": " + p[k]); });
  campos.push("      \"fonte\": {\n        \"nome\": " + JSON.stringify(p.fonte.nome) + ",\n        \"url\": " + JSON.stringify(p.fonte.url) + ",\n        \"data\": " + JSON.stringify(p.fonte.data) + "\n      }");
  return linhas.concat(campos.join(",\n")).join("\n") + "\n    },\n";
}

const recolha = JSON.parse(fs.readFileSync(IN, "utf8")).resultados;
let src = fs.readFileSync(DATA, "utf8");
const aplicados = [], recusados = [];
recolha.forEach((r) => {
  if (!r.servicos || !r.servicos.length) return;
  if (!r.nome_ok && !NOME_REVISTO.has(r.slug)) { recusados.push(r.slug + " — nome da página: " + r.nome_pagina); return; }
  const p = limpo(Object.assign({}, r, classify(r.servicos))); // reclassifica com as regras atuais
  if (!p) { recusados.push(r.slug + " — sem preço de corte/barba utilizável"); return; }
  const at = src.indexOf("\"slug\": " + JSON.stringify(r.slug) + ",");
  if (at === -1) { recusados.push(r.slug + " — slug não encontrado"); return; }
  const fim = src.indexOf("\n  }", at);
  let entrada = src.slice(at, fim);
  entrada = entrada.replace(/    "precos": \{[\s\S]*?\n    \},\n/, "");
  let obs = entrada.indexOf("    \"observacoes\":");
  if (obs === -1) obs = entrada.indexOf("    \"coords\":");
  if (obs === -1) { recusados.push(r.slug + " — ficha sem \"observacoes\" nem \"coords\""); return; }
  entrada = entrada.slice(0, obs) + bloco(p) + entrada.slice(obs);
  src = src.slice(0, at) + entrada + src.slice(fim);
  aplicados.push(r.slug + ": corte " + (p.corte ?? "—") + " · barba " + (p.barba ?? "—") + " · corte+barba " + (p.corte_barba ?? "—") + " (" + p.fonte.nome + ")");
});

console.log("A aplicar (" + aplicados.length + "):\n  " + aplicados.join("\n  "));
console.log("\nFora (" + recusados.length + "):\n  " + recusados.join("\n  "));
if (gravar) {
  fs.writeFileSync(DATA, src);
  console.log("\nGravado em", path.relative(ROOT, DATA));
} else {
  console.log("\n(simulação — correr com --gravar para escrever)");
}
