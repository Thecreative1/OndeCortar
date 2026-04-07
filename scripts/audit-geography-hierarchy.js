const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");

const ROOT_DIR = path.resolve(__dirname, "..");
const SOURCE_FILE = path.join(ROOT_DIR, "Barbeiros", "barbearias.limpo.js");
const OUTPUT_JSON = path.join(ROOT_DIR, "Barbeiros", "relatorio-hierarquia-geografica.json");
const OUTPUT_CSV = path.join(ROOT_DIR, "Barbeiros", "relatorio-hierarquia-geografica.csv");
const OUTPUT_MD = path.join(ROOT_DIR, "relatorio-hierarquia-geografica.md");

function loadBarbers() {
  const source = fs.readFileSync(SOURCE_FILE, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(source + "\nthis.__barbearias = barbearias;", context);
  return utils.obterBarbeariasPublicas(Array.isArray(context.__barbearias) ? context.__barbearias : []);
}

function trimText(value) {
  return String(value == null ? "" : value).trim();
}

function sameText(left, right) {
  const normalizedLeft = utils.normalizarTexto(trimText(left));
  const normalizedRight = utils.normalizarTexto(trimText(right));
  return Boolean(normalizedLeft && normalizedRight && normalizedLeft === normalizedRight);
}

function uniqueNonEmpty(values) {
  return Array.from(new Set((values || []).map(trimText).filter(Boolean)));
}

function buildHierarchyEntries(item) {
  const city = trimText(item.city);
  const municipality = trimText(item.municipality || item.concelho);
  const district = trimText(item.distrito || item.district);
  const zone = trimText(item.zone || item.freguesia);
  const locality = trimText(item.localidade);
  const zoneEvaluation = zone ? utils.avaliarZona(zone, {
    city: city,
    municipality: municipality,
    district: district
  }) : null;
  const entries = [];

  if (city) {
    entries.push({ label: "Cidade", value: city });
  } else if (locality) {
    entries.push({ label: "Localidade", value: locality });
  }

  if (municipality && !sameText(municipality, city) && !sameText(municipality, locality)) {
    entries.push({ label: "Concelho", value: municipality });
  }

  if (district && !sameText(district, city) && !sameText(district, municipality) && !sameText(district, locality)) {
    entries.push({ label: "Distrito", value: district });
  }

  if (zoneEvaluation && zoneEvaluation.valid && ![city, municipality, district, locality].some(function(value) {
    return sameText(zone, value);
  })) {
    entries.push({ label: "Zona", value: zoneEvaluation.value || zone });
  }

  return entries;
}

function formatSuggestedDisplay(item) {
  const entries = buildHierarchyEntries(item);
  return entries.length
    ? entries.map(function(entry) {
      return entry.label + ": " + entry.value;
    }).join(" | ")
    : "Localização a confirmar";
}

function buildBarberEntry(item, index) {
  const city = trimText(item.city);
  const municipality = trimText(item.municipality || item.concelho);
  const district = trimText(item.distrito || item.district);
  const zone = trimText(item.zone || item.freguesia);
  const locality = trimText(item.localidade);
  const zoneEvaluation = zone ? utils.avaliarZona(zone, {
    city: city,
    municipality: municipality,
    district: district
  }) : null;
  const reasons = [];

  if (city && municipality && !sameText(city, municipality)) {
    reasons.push("city_needs_municipality_context");
  }

  if (city && district && !sameText(city, district) && !sameText(municipality, district)) {
    reasons.push("city_needs_district_context");
  }

  if (zone && [city, municipality, district].some(function(value) {
    return sameText(zone, value);
  })) {
    reasons.push("zone_duplicates_higher_level");
  }

  if (zone && zoneEvaluation && !zoneEvaluation.valid && zoneEvaluation.reason) {
    reasons.push(zoneEvaluation.reason);
  }

  if (!city && locality) {
    reasons.push("locality_without_public_city");
  }

  if (!municipality && city) {
    reasons.push("municipality_missing");
  }

  return {
    scope: "barbearia",
    id: index + 1,
    nome: trimText(item.nome || item.name),
    slug: trimText(item.slug),
    count: 1,
    city: city,
    municipality: municipality,
    district: district,
    zone: zone,
    locality: locality,
    reasons: reasons,
    needs_context: reasons.some(function(reason) {
      return reason.indexOf("_context") !== -1 || reason === "locality_without_public_city";
    }),
    suggested_display: formatSuggestedDisplay(item)
  };
}

function buildCityPageEntries(items) {
  const grouped = new Map();

  items.forEach(function(item) {
    const city = trimText(item.city);
    const slug = utils.slugify(city);
    if (!city || !slug) return;
    if (!grouped.has(slug)) {
      grouped.set(slug, {
        slug: slug,
        names: [],
        barbers: []
      });
    }
    grouped.get(slug).names.push(city);
    grouped.get(slug).barbers.push(item);
  });

  return Array.from(grouped.values())
    .map(function(group) {
      const names = uniqueNonEmpty(group.names);
      const nameCounts = new Map();
      group.names.forEach(function(name) {
        nameCounts.set(name, (nameCounts.get(name) || 0) + 1);
      });
      const city = names.sort(function(left, right) {
        return (nameCounts.get(right) || 0) - (nameCounts.get(left) || 0) || left.localeCompare(right, "pt");
      })[0] || "";
      const barbers = group.barbears || group.barbers;
      const municipalities = uniqueNonEmpty(barbers.map(function(item) {
        return item.municipality || item.concelho;
      }));
      const districts = uniqueNonEmpty(barbers.map(function(item) {
        return item.distrito || item.district;
      }));
      const reasons = [];

      if (names.length > 1) {
        reasons.push("page_merges_city_name_variants");
      }

      if (municipalities.length > 1) {
        reasons.push("page_mixes_multiple_municipalities");
      } else if (municipalities.length === 1 && !sameText(municipalities[0], city)) {
        reasons.push("page_needs_municipality_context");
      }

      if (districts.length > 1) {
        reasons.push("page_mixes_multiple_districts");
      } else if (
        districts.length === 1 &&
        !sameText(districts[0], city) &&
        !sameText(districts[0], municipalities[0])
      ) {
        reasons.push("page_needs_district_context");
      }

      return {
        scope: "pagina_cidade",
        id: "",
        nome: city,
        slug: group.slug,
        count: barbers.length,
        city: city,
        municipality: municipalities.length === 1 ? municipalities[0] : municipalities.join(" | "),
        district: districts.length === 1 ? districts[0] : districts.join(" | "),
        zone: "",
        locality: "",
        variants: names,
        reasons: reasons,
        needs_context: reasons.length > 0,
        suggested_display: formatSuggestedDisplay({
          city: city,
          municipality: municipalities.length === 1 ? municipalities[0] : "",
          district: districts.length === 1 ? districts[0] : "",
          zone: ""
        })
      };
    })
    .sort(function(left, right) {
      return left.nome.localeCompare(right.nome, "pt");
    });
}

function csvEscape(value) {
  const text = String(value == null ? "" : value);
  if (/[",\n]/.test(text)) {
    return '"' + text.replace(/"/g, '""') + '"';
  }
  return text;
}

function toCsv(entries) {
  const header = [
    "scope",
    "id",
    "nome",
    "slug",
    "count",
    "city",
    "municipality",
    "district",
    "zone",
    "locality",
    "needs_context",
    "reasons",
    "suggested_display"
  ];

  const lines = [header.join(",")];
  entries.forEach(function(entry) {
    lines.push([
      entry.scope,
      entry.id,
      entry.nome,
      entry.slug,
      entry.count,
      entry.city,
      entry.municipality,
      entry.district,
      entry.zone,
      entry.locality,
      entry.needs_context,
      entry.reasons.join("|"),
      entry.suggested_display
    ].map(csvEscape).join(","));
  });

  return lines.join("\n") + "\n";
}

function toMarkdown(summary, templateReview, barberEntries, cityEntries) {
  const flaggedBarbers = barberEntries.filter(function(entry) {
    return entry.needs_context;
  }).slice(0, 12);
  const flaggedCities = cityEntries.filter(function(entry) {
    return entry.needs_context;
  }).slice(0, 12);

  return [
    "# Relatório de hierarquia geográfica",
    "",
    "Gerado em " + new Date().toISOString() + ".",
    "",
    "## Resumo",
    "",
    "- Fichas auditadas: " + summary.barbers_total,
    "- Fichas que precisam de contexto geográfico explícito: " + summary.barbers_needing_context,
    "- Páginas de cidade auditadas: " + summary.city_pages_total,
    "- Páginas de cidade que precisam de contexto adicional: " + summary.city_pages_needing_context,
    "",
    "## Regras aplicadas no frontend",
    "",
    "- Páginas de cidade: " + templateReview.city_pages,
    "- Cards de barbearias: " + templateReview.barber_cards,
    "- Filtros e pesquisa: " + templateReview.filters,
    "- Chips e resumos: " + templateReview.chips,
    "- Textos automáticos: " + templateReview.auto_texts,
    "- Breadcrumbs: " + templateReview.breadcrumbs,
    "",
    "## Exemplos de fichas que exigem contexto",
    "",
    flaggedBarbers.length
      ? flaggedBarbers.map(function(entry) {
        return "- " + entry.nome + " -> " + entry.suggested_display + " (" + entry.reasons.join(", ") + ")";
      }).join("\n")
      : "- Nenhuma ficha ficou sem contexto geográfico claro.",
    "",
    "## Exemplos de páginas de cidade revistas",
    "",
    flaggedCities.length
      ? flaggedCities.map(function(entry) {
        return "- " + entry.nome + " -> " + entry.suggested_display + " (" + entry.reasons.join(", ") + ")";
      }).join("\n")
      : "- Nenhuma página de cidade ficou com mistura administrativa sem contexto.",
    "",
    "## Nota",
    "",
    "A auditoria passa agora a separar explicitamente cidade, concelho, distrito e zona. Quando o valor muda de nível administrativo, a apresentação pública deve usar rótulos como `Cidade:`, `Concelho:` e `Distrito:` em vez de chips indistintos."
  ].join("\n");
}

function main() {
  const items = loadBarbers();
  const barberEntries = items.map(buildBarberEntry);
  const cityEntries = buildCityPageEntries(items);
  const combinedEntries = barberEntries.concat(cityEntries);
  const summary = {
    generated_at: new Date().toISOString(),
    barbers_total: barberEntries.length,
    barbers_needing_context: barberEntries.filter(function(entry) {
      return entry.needs_context;
    }).length,
    city_pages_total: cityEntries.length,
    city_pages_needing_context: cityEntries.filter(function(entry) {
      return entry.needs_context;
    }).length
  };
  const templateReview = {
    city_pages: "contexto administrativo visível no topo e no resumo quando concelho ou distrito diferem da cidade",
    barber_cards: "hierarquia geográfica mostrada com rótulos em vez de chips indistintos",
    filters: "filtros rápidos continuam focados em cidade e deixam distrito/concelho fora dos chips rápidos",
    chips: "os chips principais deixam de misturar níveis administrativos sem rótulo",
    auto_texts: "as descrições automáticas passam a respeitar cidade, concelho, distrito e zona",
    breadcrumbs: "mantêm a hierarquia do site e deixam a hierarquia administrativa para os blocos estruturados"
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({
    summary: summary,
    template_review: templateReview,
    barbers: barberEntries,
    city_pages: cityEntries
  }, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_CSV, toCsv(combinedEntries), "utf8");
  fs.writeFileSync(OUTPUT_MD, toMarkdown(summary, templateReview, barberEntries, cityEntries), "utf8");

  console.log(JSON.stringify({
    barbers: barberEntries.length,
    barbersNeedingContext: summary.barbers_needing_context,
    cityPages: cityEntries.length,
    cityPagesNeedingContext: summary.city_pages_needing_context,
    json: path.relative(ROOT_DIR, OUTPUT_JSON),
    csv: path.relative(ROOT_DIR, OUTPUT_CSV),
    markdown: path.relative(ROOT_DIR, OUTPUT_MD)
  }, null, 2));
}

main();
