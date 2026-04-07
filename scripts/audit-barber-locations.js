const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");

const ROOT_DIR = path.resolve(__dirname, "..");
const SOURCE_FILE = path.join(ROOT_DIR, "Barbeiros", "barbeiros.js");
const OUTPUT_JSON = path.join(ROOT_DIR, "Barbeiros", "relatorio-localizacao.json");
const OUTPUT_CSV = path.join(ROOT_DIR, "Barbeiros", "relatorio-localizacao.csv");

function loadLegacyBarbers() {
  const source = fs.readFileSync(SOURCE_FILE, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(source + "\nthis.__barbearias = barbearias;", context);
  return Array.isArray(context.__barbearias) ? context.__barbearias : [];
}

function csvEscape(value) {
  const text = String(value == null ? "" : value);
  if (/[",\n]/.test(text)) {
    return '"' + text.replace(/"/g, '""') + '"';
  }
  return text;
}

function buildAuditEntry(item, index) {
  const location = utils.normalizarLocalizacaoBarbearia(item);
  const currentCity = utils.trimToNull(item.city || item.concelho) || "";
  const currentZone = utils.trimToNull(item.zone || item.freguesia) || "";
  const currentPostal = utils.trimToNull(item.postal_code || item.codigo_postal) || "";
  const flags = Array.from(location.issues || []);

  if (currentZone && /^\d+[A-Za-z]?$/.test(currentZone) && flags.indexOf("zone_number_or_door") === -1) {
    flags.push("zone_number_or_door");
  }

  if (currentZone && location.streetNumber && utils.normalizarTexto(currentZone) === utils.normalizarTexto(location.streetNumber) && flags.indexOf("zone_equals_street_number") === -1) {
    flags.push("zone_equals_street_number");
  }

  if (currentCity && location.locality && utils.normalizarTexto(currentCity) !== utils.normalizarTexto(location.locality) && flags.indexOf(currentPostal ? "city_differs_from_postal_locality" : "city_differs_from_address_locality") === -1) {
    flags.push(currentPostal ? "city_differs_from_postal_locality" : "city_differs_from_address_locality");
  }

  if (!currentCity && location.locality && flags.indexOf("city_missing_with_valid_locality") === -1) {
    flags.push("city_missing_with_valid_locality");
  }

  if (currentZone && !utils.ehZonaValida(currentZone, {
    city: location.city,
    street: location.street,
    streetNumber: location.streetNumber,
    postalCode: location.postalCode
  }) && flags.indexOf("zone_invalid") === -1) {
    flags.push("zone_invalid");
  }

  const uniqueFlags = Array.from(new Set(flags));

  if (location.dataConfidence === "low" && uniqueFlags.indexOf("low_confidence_location") === -1) {
    uniqueFlags.push("low_confidence_location");
  }

  const autoFixableReasons = ["city_missing_with_valid_locality"];
  const autoFixable = uniqueFlags.length > 0 &&
    uniqueFlags.every(function(reason) {
      return autoFixableReasons.indexOf(reason) !== -1;
    }) &&
    location.dataConfidence !== "low";
  const needsReview = (uniqueFlags.length > 0 && !autoFixable) || location.dataConfidence === "low";

  return {
    id: index + 1,
    nome: item.nome || item.name || "",
    slug: item.slug || "",
    address_raw: utils.trimToNull(item.address_raw || item.morada) || "",
    current_city: currentCity,
    current_zone: currentZone,
    current_postal_code: currentPostal,
    inferred_locality: location.locality || "",
    normalized_city: location.city || "",
    normalized_zone: location.zone || "",
    normalized_postal_code: location.postalCode || "",
    street: location.street || "",
    street_number: location.streetNumber || "",
    data_confidence: location.dataConfidence || "low",
    auto_fixable: autoFixable,
    needs_review: needsReview,
    reasons: uniqueFlags
  };
}

function toCsv(entries) {
  const header = [
    "id",
    "nome",
    "slug",
    "address_raw",
    "current_city",
    "current_zone",
    "current_postal_code",
    "inferred_locality",
    "normalized_city",
    "normalized_zone",
    "normalized_postal_code",
    "street",
    "street_number",
    "data_confidence",
    "auto_fixable",
    "needs_review",
    "reasons"
  ];

  const lines = [header.join(",")];
  entries.forEach(function(entry) {
    lines.push([
      entry.id,
      entry.nome,
      entry.slug,
      entry.address_raw,
      entry.current_city,
      entry.current_zone,
      entry.current_postal_code,
      entry.inferred_locality,
      entry.normalized_city,
      entry.normalized_zone,
      entry.normalized_postal_code,
      entry.street,
      entry.street_number,
      entry.data_confidence,
      entry.auto_fixable,
      entry.needs_review,
      entry.reasons.join("|")
    ].map(csvEscape).join(","));
  });

  return lines.join("\n") + "\n";
}

function main() {
  const items = loadLegacyBarbers();
  const audit = items.map(buildAuditEntry);
  const flagged = audit.filter(function(entry) {
    return entry.needs_review;
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({
    generated_at: new Date().toISOString(),
    total: audit.length,
    flagged: flagged.length,
    entries: audit
  }, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_CSV, toCsv(audit), "utf8");

  console.log(JSON.stringify({
    total: audit.length,
    flagged: flagged.length,
    json: path.relative(ROOT_DIR, OUTPUT_JSON),
    csv: path.relative(ROOT_DIR, OUTPUT_CSV)
  }, null, 2));
}

main();
