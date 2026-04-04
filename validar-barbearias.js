const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("./Barbeiros/barbearias-utils.js");

function loadDataset(filePath) {
  const resolved = path.resolve(process.cwd(), filePath || "Barbeiros/barbearias.limpo.js");
  const source = fs.readFileSync(resolved, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    source + "\nthis.__dataset = typeof barbearias !== 'undefined' ? barbearias : (typeof barbeariasPorValidar !== 'undefined' ? barbeariasPorValidar : null);",
    context
  );

  if (Array.isArray(context.__dataset)) {
    return context.__dataset;
  }

  throw new Error("Nao foi possivel carregar um array de barbearias em " + resolved);
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function validateItem(item, index) {
  const errors = [];
  const warnings = [];
  const label = (item && item.nome) ? item.nome : "Entrada #" + (index + 1);
  const requiredKeys = [
    "nome",
    "slug",
    "distrito",
    "concelho",
    "freguesia",
    "morada",
    "codigo_postal",
    "telefone",
    "email",
    "website",
    "instagram",
    "facebook",
    "google_maps",
    "horario",
    "observacoes",
    "coords",
    "status",
    "fontes",
    "ultima_validacao",
    "mostrar_no_mapa",
    "qualidade_ficha"
  ];

  requiredKeys.forEach(function(key) {
    if (!(key in item)) {
      errors.push(label + ": falta a chave obrigatoria `" + key + "`.");
    }
  });

  if (item.slug !== utils.slugify(item.nome)) {
    errors.push(label + ": o slug nao corresponde ao nome.");
  }

  ["telefone", "email", "website", "instagram", "facebook", "google_maps", "horario", "observacoes"].forEach(function(field) {
    if (!(item[field] === null || typeof item[field] === "string")) {
      errors.push(label + ": o campo `" + field + "` deve ser string ou null.");
    }
  });

  if (!(item.coords === null || utils.coordsSaoValidas(item.coords))) {
    errors.push(label + ": `coords` invalido ou fora de Portugal.");
  }

  if (["confirmado", "por_validar", "incompleto"].indexOf(item.status) === -1) {
    errors.push(label + ": status invalido `" + item.status + "`.");
  }

  if (["alta", "media", "baixa"].indexOf(item.qualidade_ficha) === -1) {
    errors.push(label + ": qualidade_ficha invalida `" + item.qualidade_ficha + "`.");
  }

  if (!Array.isArray(item.fontes)) {
    errors.push(label + ": `fontes` deve ser um array.");
  }

  if (!isIsoDate(item.ultima_validacao)) {
    errors.push(label + ": `ultima_validacao` deve estar em formato YYYY-MM-DD.");
  }

  if (typeof item.mostrar_no_mapa !== "boolean") {
    errors.push(label + ": `mostrar_no_mapa` deve ser boolean.");
  }

  if (item.telefone && utils.telefonePlaceholderReason(item.telefone)) {
    warnings.push(label + ": telefone ainda parece placeholder.");
  }

  if (item.website && utils.normalizarLinks({ website: item.website }).instagram) {
    warnings.push(label + ": website parece conter um link de Instagram.");
  }

  if (item.website && utils.normalizarLinks({ website: item.website }).facebook) {
    warnings.push(label + ": website parece conter um link de Facebook.");
  }

  if (item.website && utils.normalizarLinks({ website: item.website }).google_maps) {
    warnings.push(label + ": website parece conter um link de Google Maps.");
  }

  if (item.mostrar_no_mapa && (!utils.moradaEhUtil(item.morada) || !utils.coordsSaoValidas(item.coords))) {
    errors.push(label + ": esta visivel no mapa sem cumprir os criterios minimos.");
  }

  if (item.status === "confirmado" && (!utils.coordsSaoValidas(item.coords) || !utils.moradaEhUtil(item.morada))) {
    errors.push(label + ": status confirmado nao bate certo com a qualidade minima da ficha.");
  }

  return { errors, warnings };
}

function main() {
  const dataset = loadDataset(process.argv[2]);
  const allErrors = [];
  const allWarnings = [];

  dataset.forEach(function(item, index) {
    const result = validateItem(item, index);
    allErrors.push.apply(allErrors, result.errors);
    allWarnings.push.apply(allWarnings, result.warnings);
  });

  console.log("Validacao de barbearias");
  console.log("=======================");
  console.log("Entradas analisadas: " + dataset.length);
  console.log("Erros: " + allErrors.length);
  console.log("Warnings: " + allWarnings.length);

  if (allErrors.length) {
    console.log("\nErros:");
    allErrors.forEach(function(line) {
      console.log("- " + line);
    });
  }

  if (allWarnings.length) {
    console.log("\nWarnings:");
    allWarnings.forEach(function(line) {
      console.log("- " + line);
    });
  }

  if (allErrors.length) {
    process.exitCode = 1;
  }
}

main();
