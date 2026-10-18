// Auditoria de localização (só leitura, não escreve ficheiros):
//   node scripts/audit-regioes-localizacao.js
// Cruza cada barbearia pública com o código postal e as coordenadas:
//   REGIAO / REGIAO-VIZINHOS  cidade no filtro errado de REGIOES_PT (index.html) — corrigir sempre
//   SEM-REGIAO                cidade que falta em REGIOES_PT — corrigir sempre
//   COORDS-FORA-PT / SEM-COORDS / SEM-PAGINA — corrigir sempre
//   COORDS-vs-CP, LONGE-DO-CP4, LONGE-DA-CIDADE, COORDS-IGUAIS, DISTRITO-FICHA, PAGINA-addressRegion
//                             pistas: confirmar a morada online antes de mexer em coords/city (ver CLAUDE.md)
//   CITY-vs-MORADA            informativo: quase sempre freguesia dentro do concelho (Belas/Sintra)
// A tabela CP→distrito é aproximada (CTT); se der um falso alerta, corrigir a tabela.
const fs = require("fs");
const path = require("path");
const ROOT = process.argv[2] || path.resolve(__dirname, "..");
const { barbearias: L } = require(path.join(ROOT, "Barbeiros/barbearias.limpo.js"));
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const R = eval("(" + html.match(/REGIOES_PT\s*=\s*(\{[\s\S]*?\});/)[1] + ")");
const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[()]/g, "").replace(/\s+/g, " ").trim();
const regionOfCity = {};
for (const k in R) for (const c of R[k]) {
  const n = norm(c);
  if (regionOfCity[n] && regionOfCity[n] !== k) console.log("CIDADE EM 2 REGIÕES:", c, regionOfCity[n], k);
  regionOfCity[n] = k;
}

// CP4 -> distrito (CTT, aproximado)
function cpDistrict(cp) {
  const p = parseInt(cp, 10);
  const r = (a, b) => p >= a && p <= b;
  if (r(1000, 1999)) return "Lisboa";
  // exceções dentro de faixas de outro distrito
  if (r(6040, 6059)) return "Portalegre"; // Gavião, Nisa
  if (r(3570, 3579)) return "Guarda"; // Aguiar da Beira
  if (r(4780, 4799)) return "Porto"; // Santo Tirso, Trofa
  if (r(2050, 2065)) return "Lisboa";
  if (r(2000, 2399)) return "Santarém";
  if (r(2435, 2435) || r(2490, 2499)) return "Santarém";
  if (r(2400, 2529)) return "Leiria";
  if (r(2530, 2539)) return "Lisboa";
  if (r(2540, 2549)) return "Leiria";
  if (r(2550, 2799)) return "Lisboa";
  if (r(2800, 2999)) return "Setúbal";
  if (r(3050, 3059)) return "Aveiro";
  if (r(3100, 3109) || r(3240, 3289)) return "Leiria";
  if (r(3000, 3429)) return "Coimbra";
  if (r(3430, 3699)) return "Viseu";
  if (r(3700, 3899)) return "Aveiro";
  if (r(4500, 4559)) return "Aveiro";
  if (r(4660, 4669) || r(4690, 4699)) return "Viseu";
  if (r(4000, 4699)) return "Porto";
  if (r(4870, 4889)) return "Vila Real";
  if (r(4700, 4899)) return "Braga";
  if (r(4900, 4999)) return "Viana do Castelo";
  if (r(5100, 5139)) return "Viseu";
  if (r(5140, 5149) || r(5160, 5399)) return "Bragança";
  if (r(5150, 5159)) return "Guarda";
  if (r(5000, 5099) || r(5400, 5499)) return "Vila Real";
  if (r(6120, 6129)) return "Santarém";
  if (r(6260, 6449)) return "Guarda";
  if (r(6000, 6259)) return "Castelo Branco";
  if (r(7300, 7489)) return "Portalegre";
  if (r(7000, 7299) || r(7490, 7499)) return "Évora";
  if (r(7500, 7599)) return "Setúbal";
  if (r(7600, 7999)) return "Beja";
  if (r(8000, 8999)) return "Faro";
  if (r(9000, 9499)) return "Madeira";
  if (r(9500, 9999)) return "Açores";
  return null;
}
const MEDIO_TEJO_CP = p => (p >= 2200 && p <= 2269) || (p >= 2300 && p <= 2399) || p === 2435 || (p >= 2490 && p <= 2499) || (p >= 6120 && p <= 6129);
const ALENTEJO_LITORAL_CP = p => p >= 7500 && p <= 7599;
// Decisão de 2026-10-11: ficam em Norte (NUTS II), embora o distrito seja do Centro.
const NORTE_EXCECOES = new Set(["espinho", "argoncilhe", "santa maria da feira", "lamego", "vila nova de foz coa"]);
function expectedRegion(cp) {
  const d = cpDistrict(cp); if (!d) return null; const p = parseInt(cp, 10);
  if (["Viana do Castelo", "Braga", "Porto", "Vila Real", "Bragança"].includes(d)) return "Norte";
  if (["Aveiro", "Coimbra", "Leiria", "Viseu", "Guarda", "Castelo Branco"].includes(d)) return "Centro";
  if (d === "Santarém") return MEDIO_TEJO_CP(p) ? "Centro" : "Lisboa";
  if (d === "Setúbal") return ALENTEJO_LITORAL_CP(p) ? "Alentejo" : "Lisboa";
  if (d === "Lisboa") return "Lisboa";
  if (["Évora", "Portalegre", "Beja"].includes(d)) return "Alentejo";
  if (d === "Faro") return "Algarve";
  return "Ilhas";
}
const km = (a, b) => { const t = Math.PI / 180, dl = (b[0] - a[0]) * t, dn = (b[1] - a[1]) * t;
  const h = Math.sin(dl / 2) ** 2 + Math.cos(a[0] * t) * Math.cos(b[0] * t) * Math.sin(dn / 2) ** 2; return 12742 * Math.asin(Math.sqrt(h)); };
const median = arr => { const s = [...arr].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

const pub = L.filter(b => b.mostrar_no_mapa !== false);
const rows = pub.map(b => {
  const cpRaw = b.codigo_postal || ((b.morada || "").match(/\b(\d{4})-\d{3}\b/) || [])[0] || "";
  const cp4 = cpRaw.slice(0, 4);
  let page = {};
  try {
    const h = fs.readFileSync(path.join(ROOT, "barbearias", b.slug, "index.html"), "utf8");
    const a = h.match(/"address":\{"@type":"PostalAddress"[^}]*\}/);
    if (a) page = JSON.parse("{" + a[0] + "}").address;
    const city = h.match(/<a[^>]+href="\.\.\/\.\.\/cidades\/([^/"]+)\/"/);
    page.cityLink = city ? city[1] : "";
  } catch (e) { page.missing = true; }
  return { b, cp: cpRaw, cp4, region: regionOfCity[norm(b.city)] || "(sem)", exp: cp4 ? expectedRegion(cp4) : null, dist: cp4 ? cpDistrict(cp4) : null, page };
});

const out = [];
const flag = (r, kind, msg) => out.push([kind, r.b.slug, r.b.city, r.cp, JSON.stringify(r.b.coords), msg]);

// 1. Coordenadas fora de Portugal / trocadas
for (const r of rows) {
  const c = r.b.coords;
  if (!Array.isArray(c) || c.length !== 2) { flag(r, "SEM-COORDS", ""); continue; }
  const [la, ln] = c;
  const cont = la > 36.9 && la < 42.2 && ln > -9.6 && ln < -6.1;
  const mad = la > 32.3 && la < 33.2 && ln > -17.4 && ln < -16.2;
  const aco = la > 36.8 && la < 39.8 && ln > -31.4 && ln < -24.9;
  if (!cont && !mad && !aco) flag(r, "COORDS-FORA-PT", "");
}
// 2. Região do filtro vs região do CP
for (const r of rows) if (r.exp && r.region !== r.exp && !(r.region === "Norte" && NORTE_EXCECOES.has(norm(r.b.city)))) flag(r, "REGIAO", `filtro=${r.region} CP→${r.exp} (${r.dist})`);
// 3. Região do filtro vs coords (regiões geográficas grosseiras, para as sem CP)
for (const r of rows) if (!r.exp && Array.isArray(r.b.coords)) {
  const near = rows.filter(o => o !== r && o.exp && Array.isArray(o.b.coords)).map(o => [km(r.b.coords, o.b.coords), o.exp]).sort((x, y) => x[0] - y[0]).slice(0, 5);
  const votes = {}; near.forEach(n => votes[n[1]] = (votes[n[1]] || 0) + 1);
  const top = Object.entries(votes).sort((x, y) => y[1] - x[1])[0];
  if (top && top[0] !== r.region && top[1] >= 4) flag(r, "REGIAO-VIZINHOS", `filtro=${r.region} vizinhos→${top[0]} (${near[0][0].toFixed(1)} km)`);
}
// 4. Coords vs outras com o mesmo CP4
const byCp = {}; rows.forEach(r => r.cp4 && Array.isArray(r.b.coords) && (byCp[r.cp4] = byCp[r.cp4] || []).push(r));
for (const r of rows) {
  if (!r.cp4 || !Array.isArray(r.b.coords)) continue;
  // coords vs distrito esperado pelo CP: vizinhos mais próximos
  const near = rows.filter(o => o !== r && o.dist && Array.isArray(o.b.coords)).map(o => [km(r.b.coords, o.b.coords), o]).sort((x, y) => x[0] - y[0]).slice(0, 3);
  if (near.length && near.every(n => n[1].dist !== r.dist) && near[0][0] > 3) {
    flag(r, "COORDS-vs-CP", `CP→${r.dist}, mas os 3 vizinhos mais próximos são ${[...new Set(near.map(n => n[1].dist))].join("/")} (${near[0][0].toFixed(1)} km)`);
  }
  const g = byCp[r.cp4];
  if (g.length >= 3) {
    const m = [median(g.map(x => x.b.coords[0])), median(g.map(x => x.b.coords[1]))];
    const d = km(r.b.coords, m);
    if (d > 20) flag(r, "LONGE-DO-CP4", `${d.toFixed(0)} km da mediana de ${g.length} com CP ${r.cp4}`);
  }
}
// 5. Coords vs outras com a mesma city
const byCity = {}; rows.forEach(r => Array.isArray(r.b.coords) && (byCity[norm(r.b.city)] = byCity[norm(r.b.city)] || []).push(r));
for (const r of rows) {
  const g = byCity[norm(r.b.city)];
  if (!g || g.length < 3 || !Array.isArray(r.b.coords)) continue;
  const m = [median(g.map(x => x.b.coords[0])), median(g.map(x => x.b.coords[1]))];
  const d = km(r.b.coords, m);
  if (d > 15) flag(r, "LONGE-DA-CIDADE", `${d.toFixed(0)} km da mediana das ${g.length} de ${r.b.city}`);
}
// 6. Coordenadas duplicadas (mesmo ponto exato)
const byPt = {}; rows.forEach(r => Array.isArray(r.b.coords) && (byPt[r.b.coords.join(",")] = byPt[r.b.coords.join(",")] || []).push(r));
for (const k in byPt) if (byPt[k].length > 1) flag(byPt[k][0], "COORDS-IGUAIS", byPt[k].map(r => r.b.slug).join(" | "));
// 7. Distrito na ficha vs CP
for (const r of rows) {
  const d = r.b.distrito && norm(r.b.distrito);
  if (d && r.dist && d !== norm(r.dist)) flag(r, "DISTRITO-FICHA", `ficha=${r.b.distrito} CP→${r.dist}`);
}
// 8. Página: addressRegion vs CP
for (const r of rows) {
  if (r.page.missing) { flag(r, "SEM-PAGINA", ""); continue; }
  const ar = r.page.addressRegion;
  if (ar && r.dist && norm(ar) !== norm(r.dist) && !(r.dist === "Madeira" || r.dist === "Açores")) flag(r, "PAGINA-addressRegion", `página=${ar} CP→${r.dist}`);
}
// 9. city vs localidade do CP na morada (texto depois do CP)
for (const r of rows) {
  const m = (r.b.morada || "").match(/\b\d{4}-\d{3}\s+([^,]+)$/);
  if (m && norm(m[1]) !== norm(r.b.city) && !norm(m[1]).includes(norm(r.b.city)) && !norm(r.b.city).includes(norm(m[1])))
    flag(r, "CITY-vs-MORADA", `morada diz "${m[1].trim()}"`);
}
// 10. Cidade sem região
for (const r of rows) if (r.region === "(sem)") flag(r, "SEM-REGIAO", "");

const counts = {}; out.forEach(o => counts[o[0]] = (counts[o[0]] || 0) + 1);
console.log("Públicas:", pub.length, "com CP:", rows.filter(r => r.cp4).length, counts);
out.sort((a, b) => a[0].localeCompare(b[0])).forEach(o => console.log(o.join("  ·  ")));
