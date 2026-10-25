const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_HOSTS = new Set(["ondecortar.pt", "www.ondecortar.pt"]);
const IGNORE_DIRS = new Set([".git", ".claude", "imagens", "node_modules", "test-results"]);
const HTML_FILES = [];
const ISSUES = [];
const anchorCache = new Map();

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        walk(fullPath);
      }
      return;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      HTML_FILES.push(fullPath);
    }
  });
}

function getAnchors(filePath) {
  if (anchorCache.has(filePath)) {
    return anchorCache.get(filePath);
  }

  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const contents = fs.readFileSync(filePath, "utf8");
  const ids = new Set();
  const regex = /\b(?:id|name)=["']([^"']+)["']/gi;
  let match;

  while ((match = regex.exec(contents))) {
    ids.add(match[1]);
  }

  anchorCache.set(filePath, ids);
  return ids;
}

function normalizeTarget(currentFile, href) {
  const trimmed = String(href || "").trim();
  if (!trimmed || /^(?:mailto:|tel:|javascript:|data:)/i.test(trimmed)) {
    return null;
  }

  if (/^https?:/i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (!SITE_HOSTS.has(url.hostname.toLowerCase())) {
        return null;
      }
      return normalizeTarget(currentFile, url.pathname + url.hash);
    } catch (error) {
      return null;
    }
  }

  return normalizeLocalTarget(currentFile, trimmed);
}

function normalizeLocalTarget(currentFile, href) {
  const trimmed = String(href || "").trim();
  if (!trimmed) {
    return null;
  }

  const [rawPath, rawHash] = trimmed.split("#");
  const hash = rawHash ? decodeURIComponent(rawHash) : "";
  let resolvedPath = rawPath || "";

  if (!resolvedPath) {
    return { filePath: currentFile, hash };
  }

  if (resolvedPath.startsWith("/")) {
    resolvedPath = path.join(ROOT, resolvedPath.replace(/^\/+/, ""));
  } else {
    resolvedPath = path.resolve(path.dirname(currentFile), resolvedPath);
  }

  if (resolvedPath.endsWith(path.sep)) {
    resolvedPath = path.join(resolvedPath, "index.html");
  } else if (!path.extname(resolvedPath)) {
    if (fs.existsSync(path.join(resolvedPath, "index.html"))) {
      resolvedPath = path.join(resolvedPath, "index.html");
    } else if (fs.existsSync(resolvedPath + ".html")) {
      resolvedPath = resolvedPath + ".html";
    }
  }

  return {
    filePath: resolvedPath,
    hash
  };
}

function normalizeAssetTarget(currentFile, src) {
  const trimmed = String(src || "").trim();
  if (!trimmed || /^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(trimmed)) {
    return null;
  }

  if (/^https?:/i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (!SITE_HOSTS.has(url.hostname.toLowerCase())) {
        return null;
      }
      return normalizeLocalTarget(currentFile, url.pathname);
    } catch (error) {
      return null;
    }
  }

  return normalizeLocalTarget(currentFile, trimmed);
}

function collectAssetSources(contents) {
  const sources = [];
  const imgRegex = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  const metaImageRegex = /<meta\b(?=[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/gi;
  const linkIconRegex = /<link\b(?=[^>]*\brel=["'][^"']*(?:icon|apple-touch-icon)[^"']*["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(contents))) {
    sources.push({ kind: "img_src", value: match[1] });
  }

  while ((match = metaImageRegex.exec(contents))) {
    sources.push({ kind: "meta_image", value: match[1] });
  }

  while ((match = linkIconRegex.exec(contents))) {
    sources.push({ kind: "icon_href", value: match[1] });
  }

  return sources;
}

// Texto do link → destino que tem de ter
const TEXT_RULES = [
  [/^contactos?$|^contacta|^fala connosco/i, /^mailto:|contacto/],
  [/^sobre( n[óo]s)?$/i, /sobre/],
  [/^faq$|^perguntas frequentes$/i, /faq/],
  [/^privacidade$|pol[íi]tica de privacidade/i, /privacidade/],
  [/^loja$/i, /loja/],
  [/^revista$/i, /revista/],
  [/^cidades$|^todas as cidades$/i, /cidades/],
  [/^\+? ?adicionar (a minha )?barbearia$|^atualizar perfil$|^completar a ficha$/i, /registar/]
];

function auditFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");

  // Link cujo texto promete outro destino (a 2026-10-25, "Contacto" no rodapé da homepage ia para registar.html)
  for (const m of contents.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!text || text.length > 40) continue;
    const rule = TEXT_RULES.find(([re]) => re.test(text));
    if (rule && !rule[1].test(m[1])) {
      ISSUES.push({ type: "wrong_destination", file: path.relative(ROOT, filePath), text, href: m[1] });
    }
  }

  const hrefRegex = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(contents))) {
    const href = match[1];
    const target = normalizeTarget(filePath, href);

    if (!target) {
      continue;
    }

    if (!fs.existsSync(target.filePath)) {
      ISSUES.push({
        type: "broken_path",
        file: path.relative(ROOT, filePath),
        href,
        target: path.relative(ROOT, target.filePath)
      });
      continue;
    }

    // "#atualizar=Nome" é estado lido por JS (registar.html), não uma âncora.
    if (target.hash && !target.hash.includes("=")) {
      const anchors = getAnchors(target.filePath);
      if (!anchors.has(target.hash)) {
        ISSUES.push({
          type: "missing_anchor",
          file: path.relative(ROOT, filePath),
          href,
          target: path.relative(ROOT, target.filePath),
          hash: target.hash
        });
      }
    }
  }

  collectAssetSources(contents).forEach(({ kind, value }) => {
    const target = normalizeAssetTarget(filePath, value);
    if (!target) {
      return;
    }

    if (!fs.existsSync(target.filePath)) {
      ISSUES.push({
        type: "broken_asset",
        assetType: kind,
        file: path.relative(ROOT, filePath),
        src: value,
        target: path.relative(ROOT, target.filePath)
      });
    }
  });
}

walk(ROOT);
HTML_FILES.forEach(auditFile);

const grouped = ISSUES.reduce((acc, issue) => {
  acc[issue.type] = (acc[issue.type] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({
  totalHtmlFiles: HTML_FILES.length,
  issues: ISSUES.length,
  byType: grouped,
  samples: ISSUES.slice(0, 20)
}, null, 2));
// Falha o npm test / CI quando há links partidos ou trocados
if (ISSUES.length) process.exitCode = 1;
