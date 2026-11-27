/**
 * verificar-amazon-api.js — stock e vendedor dos produtos da loja pela Creators API da Amazon.
 *
 * Fase 1 (decisão de 2026-11-21): só uso interno. Não mexe em nenhuma página nem nos dados.
 * Lê os produtos de commerce-products-a/b.js, pede à API (GetItems, 10 ASINs por pedido)
 * a disponibilidade, o vendedor e se a oferta ganha o "buy box", e escreve:
 *   - amazon-api/AAAA-MM-DD.json  (fora do git: o repositório é o site publicado)
 *   - amazon-api/AAAA-MM-DD.md
 *   - o resumo do job, quando corre no GitHub Actions (GITHUB_STEP_SUMMARY)
 *
 * Os preços NÃO entram nos relatórios: as regras da Amazon só deixam mostrar preços
 * atualizados e com data, e os logs/resumos do Actions num repositório público são visíveis.
 *
 * Credenciais (nunca em ficheiros): variáveis de ambiente
 *   AMAZON_CREATORS_ID, AMAZON_CREATORS_SECRET   (segredos do GitHub com o mesmo nome)
 *   AMAZON_CREATORS_TOKEN_URL  opcional; por omissão o endpoint europeu (credencial versão 3.2)
 *
 * Uso:
 *   node scripts/verificar-amazon-api.js            relatório; sai com código 1 se houver problemas novos
 *   node scripts/verificar-amazon-api.js --bruto    guarda também a resposta bruta da API (para depurar)
 *   node scripts/verificar-amazon-api.js --asin B0XXXXXXX[,B0YYYYYYY]   só esses ASINs
 *
 * Problemas conhecidos e aceites: scripts/data/amazon-stock-ignorar.js (não fazem falhar o job).
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "amazon-api");
const PARTNER_TAG = "ondecortar27-21";
const MARKETPLACE = "www.amazon.es";
const TOKEN_URL = process.env.AMAZON_CREATORS_TOKEN_URL || "https://api.amazon.co.uk/auth/o2/token";
const TOKEN_URLS_ALT = ["https://api.amazon.co.uk/auth/o2/token", "https://api.amazon.com/auth/o2/token", "https://api.amazon.co.jp/auth/o2/token"];
const API_URL ="https://creatorsapi.amazon/catalog/v1/getItems";
const BATCH = 10;
const DELAY_MS = 1200;
const RESOURCES = [
  "itemInfo.title",
  "offersV2.listings.availability",
  "offersV2.listings.condition",
  "offersV2.listings.isBuyBoxWinner",
  "offersV2.listings.merchantInfo",
  "offersV2.listings.type"
];

const args = process.argv.slice(2);
const SAVE_RAW = args.includes("--bruto");
const asinArg = args.includes("--asin") ? (args[args.indexOf("--asin") + 1] || "") : "";
const ONLY_ASINS = asinArg ? new Set(asinArg.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean)) : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Acesso ainda não ativo (até ~48 h depois de criar a credencial) ou perdido (menos de 10 vendas em 30 dias):
// aviso no resumo e saída 0, para o job diário não mandar emails de erro por isso.
function accessNotActive(message) {
  const text = [
    "## Amazon stock: acesso à Creators API não ativo",
    "",
    `A Amazon recusou o pedido: \`${message.slice(0, 200)}\``,
    "",
    "Normal nas primeiras ~48 h depois de criar a credencial. Se continuar, ver se a conta ainda tem 10 vendas nos últimos 30 dias.",
    ""
  ].join("\n");
  console.warn(`\n⚠ ${message}`);
  console.warn("Acesso à Creators API não ativo: até ~48 h depois de criar a credencial, ou menos de 10 vendas em 30 dias.");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  process.exit(0);
}

function loadProducts() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  });
  const products = context.window.OndeCortarCommerce.products || [];
  return products.map((p) => {
    const m = String(p.amazon || "").match(/\/dp\/([A-Z0-9]{10})/i);
    const pagePath = path.join(ROOT, "produto", p.slug, "index.html");
    let substituido = false;
    try { substituido = fs.readFileSync(pagePath, "utf8").includes("OC-UNAVAILABLE"); } catch (e) { /* sem página */ }
    return { slug: p.slug, nome: p.name, asin: m ? m[1].toUpperCase() : null, substituido };
  });
}

function loadIgnore() {
  const file = path.join(__dirname, "data", "amazon-stock-ignorar.js");
  if (!fs.existsSync(file)) return {};
  return require(file);
}

// Valores colados à mão trazem às vezes espaços, quebras de linha ou aspas à volta.
const cleanCredential = (v) => String(v || "").trim().replace(/^["']+|["']+$/g, "").trim();

// Para perceber um "invalid_client" sem nunca escrever o segredo: fim do ID (o ID não é
// secreto, aparece na página da Creators API), tamanhos e se o formato é o esperado.
function describeCredential(rawId, rawSecret, id, secret) {
  const limpo = (raw, v) => (String(raw || "") !== v ? " — tinha espaços/aspas à volta (limpos)" : "");
  return [
    `ID: termina em …${id.slice(-6)}, ${id.length} caracteres, começa por "amzn1.application-oa2-client.": ${id.startsWith("amzn1.application-oa2-client.") ? "sim" : "não"}${limpo(rawId, id)}`,
    `Segredo: ${secret.length} caracteres, começa por "amzn1.oa2-cs.v1.": ${secret.startsWith("amzn1.oa2-cs.v1.") ? "sim" : "não"}, espaços no meio: ${/\s/.test(secret) ? "sim" : "não"}${limpo(rawSecret, secret)}`
  ];
}

async function getToken() {
  const rawId = process.env.AMAZON_CREATORS_ID;
  const rawSecret = process.env.AMAZON_CREATORS_SECRET;
  const id = cleanCredential(rawId);
  const secret = cleanCredential(rawSecret);
  if (!id || !secret) {
    throw new Error("Faltam AMAZON_CREATORS_ID e/ou AMAZON_CREATORS_SECRET nas variáveis de ambiente.");
  }
  describeCredential(rawId, rawSecret, id, secret).forEach((line) => console.log(line));
  // O endpoint depende da versão da credencial (3.2 = EU, 3.1 = NA, 3.3 = FE). Tenta o europeu
  // primeiro e, se a credencial for recusada, os outros; o que funcionar fica no log.
  const urls = [TOKEN_URL, ...TOKEN_URLS_ALT.filter((u) => u !== TOKEN_URL)];
  let lastErr = null;
  for (const url of urls) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grant_type: "client_credentials", client_id: id, client_secret: secret, scope: "creatorsapi::default" })
    });
    const text = await res.text();
    if (res.ok) {
      const data = JSON.parse(text);
      if (!data.access_token) throw new Error("Resposta do token sem access_token.");
      console.log(`Token obtido em ${url}`);
      return data.access_token;
    }
    // Nunca escrever o pedido (tem o segredo); a resposta de erro do LwA não tem credenciais.
    lastErr = new Error(`Token recusado (${res.status}) em ${urls.join(", ")}: ${text.slice(0, 300)}`);
    lastErr.status = res.status;
    if (res.status !== 400 && res.status !== 401) break;
  }
  throw lastErr;
}

async function getItems(token, asins) {
  const body = {
    itemIds: asins,
    itemIdType: "ASIN",
    marketplace: MARKETPLACE,
    partnerTag: PARTNER_TAG,
    condition: "New",
    resources: RESOURCES
  };
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": MARKETPLACE
      },
      body: JSON.stringify(body)
    });
    const text = await res.text();
    if (res.status === 429 && attempt < 4) {
      await sleep(DELAY_MS * attempt * 3);
      continue;
    }
    let json = null;
    try { json = JSON.parse(text); } catch (e) { /* não JSON */ }
    if (!res.ok && !(json && json.itemsResult)) {
      const err = new Error(`GetItems ${res.status}: ${text.slice(0, 400)}`);
      err.status = res.status;
      throw err;
    }
    return json;
  }
  throw new Error("GetItems: limite de pedidos (429) depois de 4 tentativas.");
}

// Aceita lowerCamelCase (documentado) e PascalCase (PA-API antiga), por precaução.
const pick = (o, ...keys) => {
  if (!o) return undefined;
  for (const k of keys) if (o[k] !== undefined) return o[k];
  return undefined;
};

function summarizeItem(item) {
  const title = pick(pick(pick(item, "itemInfo", "ItemInfo"), "title", "Title"), "displayValue", "DisplayValue") || null;
  const offers = pick(item, "offersV2", "OffersV2");
  const listings = pick(offers, "listings", "Listings") || [];
  const listing = listings.find((l) => pick(l, "isBuyBoxWinner", "IsBuyBoxWinner")) || listings[0] || null;
  if (!listing) return { titulo: title, oferta: false, disponibilidade: null, mensagem: null, vendedor: null, buyBox: false, ofertas: 0 };
  const av = pick(listing, "availability", "Availability") || {};
  const merchant = pick(listing, "merchantInfo", "MerchantInfo") || {};
  return {
    titulo: title,
    oferta: true,
    disponibilidade: pick(av, "type", "Type") || null,
    mensagem: pick(av, "message", "Message") || null,
    vendedor: pick(merchant, "name", "Name") || null,
    buyBox: Boolean(pick(listing, "isBuyBoxWinner", "IsBuyBoxWinner")),
    ofertas: listings.length
  };
}

function classify(p) {
  if (!p.asin) return { nivel: "erro", motivo: "sem ASIN no link do catálogo" };
  if (p.erroApi) return { nivel: "erro", motivo: `a API não devolve o produto (${p.erroApi})` };
  if (!p.api) return { nivel: "erro", motivo: "sem resposta da API" };
  if (!p.api.oferta) return { nivel: "erro", motivo: "sem oferta nova (indisponível ou só usados)" };
  const tipo = String(p.api.disponibilidade || "").toUpperCase();
  if (tipo && tipo !== "IN_STOCK") {
    return { nivel: "erro", motivo: `disponibilidade ${tipo}${p.api.mensagem ? ` — "${p.api.mensagem}"` : ""}` };
  }
  if (p.api.vendedor && !/amazon/i.test(p.api.vendedor)) {
    return { nivel: "aviso", motivo: `vendido por terceiro: ${p.api.vendedor}` };
  }
  if (!p.api.buyBox) return { nivel: "aviso", motivo: "nenhuma oferta com buy box" };
  return { nivel: "ok", motivo: "" };
}

async function main() {
  const ignore = loadIgnore();
  let products = loadProducts();
  if (ONLY_ASINS) products = products.filter((p) => p.asin && ONLY_ASINS.has(p.asin));
  const asins = [...new Set(products.map((p) => p.asin).filter(Boolean))];
  console.log(`${products.length} produtos, ${asins.length} ASINs — a pedir à Creators API (${MARKETPLACE})…`);

  let token;
  try {
    token = await getToken();
  } catch (e) {
    if (e.status === 401 || e.status === 403) accessNotActive(e.message);
    console.error(`\n✗ ${e.message}`);
    process.exit(2);
  }

  const byAsin = new Map();
  const errors = new Map();
  const raw = [];
  for (let i = 0; i < asins.length; i += BATCH) {
    const batch = asins.slice(i, i + BATCH);
    let json;
    try {
      json = await getItems(token, batch);
    } catch (e) {
      if (e.status === 401 || e.status === 403) accessNotActive(e.message);
      batch.forEach((a) => errors.set(a, e.message.slice(0, 120)));
      console.warn(`  lote ${i / BATCH + 1}: ${e.message.slice(0, 160)}`);
      await sleep(DELAY_MS);
      continue;
    }
    if (SAVE_RAW) raw.push(json);
    const items = pick(pick(json, "itemsResult", "ItemsResult"), "items", "Items") || [];
    items.forEach((item) => byAsin.set(String(pick(item, "asin", "ASIN")).toUpperCase(), summarizeItem(item)));
    (pick(json, "errors", "Errors") || []).forEach((err) => {
      const msg = String(pick(err, "message", "Message") || "");
      const code = String(pick(err, "code", "Code") || "erro");
      const found = msg.match(/[A-Z0-9]{10}/g) || [];
      batch.filter((a) => found.includes(a)).forEach((a) => errors.set(a, code));
    });
    batch.filter((a) => !byAsin.has(a) && !errors.has(a)).forEach((a) => errors.set(a, "não devolvido"));
    process.stdout.write(`  ${Math.min(i + BATCH, asins.length)}/${asins.length}\r`);
    await sleep(DELAY_MS);
  }
  console.log("");

  const today = new Date().toISOString().slice(0, 10);
  const rows = products.map((p) => {
    const row = { ...p, api: p.asin ? byAsin.get(p.asin) || null : null, erroApi: p.asin ? errors.get(p.asin) || null : null };
    const c = classify(row);
    row.nivel = c.nivel;
    row.motivo = c.motivo;
    row.ignorado = Boolean(ignore[p.slug]);
    row.notaIgnorar = ignore[p.slug] || null;
    return row;
  });

  const ativos = rows.filter((r) => !r.substituido);
  const problemas = ativos.filter((r) => r.nivel === "erro" && !r.ignorado);
  const avisos = ativos.filter((r) => r.nivel === "aviso" && !r.ignorado);
  const conhecidos = ativos.filter((r) => r.nivel !== "ok" && r.ignorado);
  const voltaram = rows.filter((r) => r.substituido && r.nivel === "ok");

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${today}.json`), JSON.stringify({ data: today, marketplace: MARKETPLACE, produtos: rows }, null, 2));
  if (SAVE_RAW) fs.writeFileSync(path.join(OUT_DIR, `${today}-bruto.json`), JSON.stringify(raw, null, 2));

  const line = (r) => `- **${r.nome}** (\`produto/${r.slug}/\`, ${r.asin || "sem ASIN"}): ${r.motivo}${r.notaIgnorar ? ` _(conhecido: ${r.notaIgnorar})_` : ""}`;
  const md = [
    `# Stock da loja na Amazon.es — ${today}`,
    "",
    `${ativos.length} produtos ativos verificados (${rows.length - ativos.length} substituídos à parte). ` +
      `OK: ${ativos.filter((r) => r.nivel === "ok").length} · problemas: ${problemas.length} · avisos: ${avisos.length} · conhecidos: ${conhecidos.length}.`,
    "",
    "## Problemas (tratar: trocar o produto ou confirmar no browser)",
    problemas.length ? problemas.map(line).join("\n") : "Nenhum.",
    "",
    "## Avisos (vendedor terceiro ou sem buy box — ver se compensa manter)",
    avisos.length ? avisos.map(line).join("\n") : "Nenhum.",
    "",
    "## Conhecidos (em scripts/data/amazon-stock-ignorar.js)",
    conhecidos.length ? conhecidos.map(line).join("\n") : "Nenhum.",
    "",
    "## Substituídos que voltaram a ter stock",
    voltaram.length ? voltaram.map((r) => `- ${r.nome} (\`produto/${r.slug}/\`)`).join("\n") : "Nenhum.",
    "",
    "_Sem preços de propósito (regras da Amazon). Fonte: Creators API, GetItems, condição Nova._",
    ""
  ].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, `${today}.md`), md);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);

  console.log(md);
  console.log(`Relatório em amazon-api/${today}.md`);
  process.exit(problemas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(2);
});
