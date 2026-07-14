/**
 * check-amazon-links.js — verifica o estado dos links afiliados da Amazon
 * para todos os produtos em commerce-products-a/b.js e atualiza
 * amazon-product-health.json.
 *
 * Nota: a Amazon aplica deteção de bots; um estado "blocked" (503/captcha)
 * significa que a verificação automática foi travada, não que o link está
 * partido. Nesses casos confirmar manualmente no browser.
 *
 * Uso: node scripts/check-amazon-links.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const https = require("https");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "amazon-product-health.json");
const DELAY_MS = 1500;

function loadProducts() {
  const context = { window: { OndeCortarCommerce: {} } };
  vm.createContext(context);
  ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  });
  return context.window.OndeCortarCommerce.products || [];
}

function fetchStatus(url) {
  return new Promise((resolve) => {
    const request = https.get(url, {
      timeout: 12000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept-Language": "pt-PT,pt;q=0.9,en;q=0.6",
        Accept: "text/html,application/xhtml+xml"
      }
    }, (response) => {
      const status = response.statusCode || 0;
      let body = "";
      response.on("data", (chunk) => {
        if (body.length < 40000) body += chunk;
      });
      response.on("end", () => {
        let state = "error";
        if (status >= 200 && status < 300) {
          if (/captcha|Robot Check|automated access/i.test(body)) state = "blocked";
          else if (/dp-container|productTitle|add-to-cart/i.test(body)) state = "ok";
          else state = "ok-unverified";
        } else if (status >= 300 && status < 400) {
          state = "redirect";
        } else if (status === 503 || status === 429) {
          state = "blocked";
        } else if (status === 404 || status === 410) {
          state = "not-found";
        }
        resolve({ state: state, http_status: status });
      });
    });
    request.on("timeout", () => {
      request.destroy();
      resolve({ state: "timeout", http_status: 0 });
    });
    request.on("error", () => resolve({ state: "error", http_status: 0 }));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const products = loadProducts();
  const results = [];
  for (const product of products) {
    if (!product.amazon) continue;
    const outcome = await fetchStatus(product.amazon);
    results.push({
      slug: product.slug,
      title: product.name,
      url: product.amazon,
      status: outcome.state,
      http_status: outcome.http_status,
      checked_at: new Date().toISOString().slice(0, 10)
    });
    console.log(outcome.state.padEnd(14), product.slug);
    await sleep(DELAY_MS);
  }
  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2), "utf8");
  const summary = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  console.log("\nResumo:", JSON.stringify(summary));
  console.log("Relatório escrito em amazon-product-health.json");
}

main();
