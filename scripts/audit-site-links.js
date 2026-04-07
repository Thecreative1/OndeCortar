const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IGNORE_DIRS = new Set([".git", ".claude", "imagens"]);
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
  if (!trimmed || /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(trimmed)) {
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

function auditFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");
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

    if (target.hash) {
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
