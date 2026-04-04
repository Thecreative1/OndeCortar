const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");

const ROOT_DIR = path.resolve(__dirname, "..");
const SOURCE_FILE = path.join(ROOT_DIR, "Barbeiros", "barbeiros.js");
const OUTPUT_CLEAN = path.join(ROOT_DIR, "Barbeiros", "barbearias.limpo.js");
const OUTPUT_REVIEW = path.join(ROOT_DIR, "Barbeiros", "barbearias.por-validar.js");
const OUTPUT_REPORT = path.join(ROOT_DIR, "Barbeiros", "relatorio-validacao.md");

function loadLegacyBarbers() {
  const source = fs.readFileSync(SOURCE_FILE, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(source + "\nthis.__barbearias = barbearias;", context);
  return Array.isArray(context.__barbearias) ? context.__barbearias : [];
}

function pickChangedValues(raw, clean, metadata) {
  const changed = {};

  if (metadata.nomeAlterado) {
    changed.nome = metadata.nomeOriginal;
  }

  if (metadata.telefoneOriginal && !clean.telefone) {
    changed.telefone = metadata.telefoneOriginal;
  }

  if (metadata.emailOriginal && !clean.email) {
    changed.email = metadata.emailOriginal;
  }

  Object.keys(metadata.linksValorOriginal).forEach(function(field) {
    changed[field] = metadata.linksValorOriginal[field];
  });

  if (metadata.coordsOriginais && !clean.coords) {
    changed.coords = metadata.coordsOriginais;
  }

  if (metadata.statusMotivos.length) {
    changed.motivos = metadata.statusMotivos.slice();
  }

  return Object.keys(changed).length ? changed : null;
}

function normalizarBarbearia(raw, index) {
  const nomeData = utils.normalizarNome(raw.nome || raw.name);
  const morada = String(raw.morada || "").trim();
  const telefoneData = utils.normalizarTelefone(raw.telefone);
  const linksData = utils.normalizarLinks(raw);
  const emailOriginal = utils.trimToNull(raw.email);
  const email = utils.validarEmail(raw.email);
  const coordsOriginais = Array.isArray(raw.coords) ? raw.coords : null;
  const coords = utils.normalizarCoords(raw.coords);
  const admin = utils.inferirLocalizacaoAdministrativa(morada);
  const observacoes = utils.trimToNull(raw.observacoes);
  const horario = utils.trimToNull(raw.horario);
  const statusMotivos = [];

  if (!coords) {
    statusMotivos.push("sem_coords_validas");
  }

  if (utils.moradaEhGenerica(morada)) {
    statusMotivos.push("morada_generica");
  }

  if (telefoneData.invalido) {
    statusMotivos.push("telefone_placeholder");
  }

  if (nomeData.alterado) {
    statusMotivos.push("nome_normalizado");
  }

  if (!email && emailOriginal) {
    statusMotivos.push("email_invalido");
  }

  const clean = {
    nome: nomeData.nome,
    slug: utils.slugify(nomeData.nome),
    distrito: admin.distrito,
    concelho: admin.concelho,
    freguesia: admin.freguesia,
    morada: morada,
    codigo_postal: utils.extrairCodigoPostal(morada),
    telefone: telefoneData.telefone,
    email: email,
    website: linksData.website,
    instagram: linksData.instagram,
    facebook: linksData.facebook,
    google_maps: linksData.google_maps,
    horario: horario,
    observacoes: observacoes,
    coords: coords,
    status: "confirmado",
    fontes: Array.from(new Set(linksData.fontes)),
    ultima_validacao: utils.DATA_VALIDACAO,
    mostrar_no_mapa: Boolean(nomeData.nome && utils.moradaEhUtil(morada) && coords)
  };

  clean.status = utils.determinarStatus({
    nome: clean.nome,
    morada: clean.morada,
    coords: clean.coords,
    telefoneInvalido: telefoneData.invalido,
    nomeAlterado: nomeData.alterado
  });
  clean.qualidade_ficha = utils.calcularQualidadeFicha(clean);

  if (
    clean.status === "incompleto" &&
    (utils.moradaEhGenerica(morada) || !coords)
  ) {
    clean.qualidade_ficha = "baixa";
  }

  const valorOriginal = pickChangedValues(raw, clean, {
    nomeAlterado: nomeData.alterado,
    nomeOriginal: nomeData.original,
    telefoneOriginal: utils.trimToNull(raw.telefone),
    emailOriginal: emailOriginal,
    linksValorOriginal: linksData.valorOriginal,
    coordsOriginais: coordsOriginais,
    statusMotivos: statusMotivos
  });

  if (valorOriginal) {
    clean.valor_original = valorOriginal;
  }

  return clean;
}

function macroRegiao(item) {
  if (item.distrito === "Açores") {
    return "Açores";
  }

  if (item.distrito === "Madeira") {
    return "Madeira";
  }

  return "Continente";
}

function compareItems(left, right) {
  const macroOrder = { Continente: 0, "Açores": 1, Madeira: 2 };
  const macroDiff = macroOrder[macroRegiao(left)] - macroOrder[macroRegiao(right)];

  if (macroDiff !== 0) {
    return macroDiff;
  }

  return [
    left.distrito,
    left.concelho,
    left.nome
  ]
    .join("||")
    .localeCompare(
      [
        right.distrito,
        right.concelho,
        right.nome
      ].join("||"),
      "pt"
    );
}

function createDatasetModule(variableName, windowName, items) {
  return [
    "const " + variableName + " = " + JSON.stringify(items, null, 2) + ";",
    "",
    'if (typeof window !== "undefined") {',
    "  window." + windowName + " = " + variableName + ";",
    "}",
    "",
    'if (typeof module !== "undefined" && module.exports) {',
    "  module.exports = { " + variableName + " };",
    "}",
    ""
  ].join("\n");
}

function createReport(items) {
  const totals = {
    total: items.length,
    confirmadas: 0,
    porValidar: 0,
    incompletas: 0,
    semCoords: 0,
    telefoneInvalido: 0,
    moradaGenerica: 0,
    escondidas: 0
  };

  const problemas = items
    .map(function(item) {
      const flags = [];

      if (item.status !== "confirmado") {
        flags.push("status_" + item.status);
      }

      if (!item.coords) {
        flags.push("sem_coords");
      }

      if (utils.moradaEhGenerica(item.morada)) {
        flags.push("morada_generica");
      }

      if (item.valor_original && item.valor_original.telefone) {
        flags.push("telefone_invalido");
      }

      if (item.valor_original && item.valor_original.nome) {
        flags.push("nome_normalizado");
      }

      return {
        nome: item.nome,
        status: item.status,
        mostrar_no_mapa: item.mostrar_no_mapa,
        qualidade_ficha: item.qualidade_ficha,
        flags: flags
      };
    })
    .sort(function(a, b) {
      return b.flags.length - a.flags.length || a.nome.localeCompare(b.nome, "pt");
    });

  items.forEach(function(item) {
    if (item.status === "confirmado") {
      totals.confirmadas += 1;
    } else if (item.status === "por_validar") {
      totals.porValidar += 1;
    } else if (item.status === "incompleto") {
      totals.incompletas += 1;
    }

    if (!item.coords) {
      totals.semCoords += 1;
    }

    if (item.valor_original && item.valor_original.telefone) {
      totals.telefoneInvalido += 1;
    }

    if (utils.moradaEhGenerica(item.morada)) {
      totals.moradaGenerica += 1;
    }

    if (item.mostrar_no_mapa === false) {
      totals.escondidas += 1;
    }
  });

  const lines = [
    "# Relatorio de validacao das barbearias",
    "",
    "Data da auditoria: `" + utils.DATA_VALIDACAO + "`",
    "",
    "## Resumo",
    "",
    "- Total de entradas: **" + totals.total + "**",
    "- Confirmadas: **" + totals.confirmadas + "**",
    "- Por validar: **" + totals.porValidar + "**",
    "- Incompletas: **" + totals.incompletas + "**",
    "- Sem coordenadas validas: **" + totals.semCoords + "**",
    "- Com telefone invalido ou placeholder: **" + totals.telefoneInvalido + "**",
    "- Com morada generica: **" + totals.moradaGenerica + "**",
    "- Escondidas do mapa (`mostrar_no_mapa: false`): **" + totals.escondidas + "**",
    "",
    "## Notas da auditoria",
    "",
    "- O ficheiro limpo nao inventa moradas, telefones, emails, websites, horarios nem coordenadas.",
    "- Os unicos `fontes` incluidos sao URLs publicos que ja existiam no dataset legado.",
    "- Entradas sem coordenadas validas ou com morada demasiado generica ficam fora do mapa publico.",
    "",
    "## Entradas mais problematicas",
    ""
  ];

  problemas
    .filter(function(item) {
      return item.flags.length > 0;
    })
    .slice(0, 15)
    .forEach(function(item) {
      lines.push(
        "- **" +
          item.nome +
          "**: status `" +
          item.status +
          "`, qualidade `" +
          item.qualidade_ficha +
          "`, problemas `" +
          item.flags.join(", ") +
          "`"
      );
    });

  lines.push("");
  return lines.join("\n");
}

function main() {
  const legacy = loadLegacyBarbers();
  const normalized = legacy.map(normalizarBarbearia).sort(compareItems);
  const review = normalized.filter(function(item) {
    return item.status !== "confirmado";
  });

  fs.writeFileSync(OUTPUT_CLEAN, createDatasetModule("barbearias", "barbearias", normalized), "utf8");
  fs.writeFileSync(OUTPUT_REVIEW, createDatasetModule("barbeariasPorValidar", "barbeariasPorValidar", review), "utf8");
  fs.writeFileSync(OUTPUT_REPORT, createReport(normalized), "utf8");

  console.log(
    JSON.stringify(
      {
        total: normalized.length,
        confirmadas: normalized.filter(function(item) { return item.status === "confirmado"; }).length,
        por_validar: normalized.filter(function(item) { return item.status === "por_validar"; }).length,
        incompletas: normalized.filter(function(item) { return item.status === "incompleto"; }).length,
        escondidas: normalized.filter(function(item) { return item.mostrar_no_mapa === false; }).length
      },
      null,
      2
    )
  );
}

main();
