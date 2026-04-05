(function(root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.BarbeariasUtils = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  const DATA_VALIDACAO = "2026-04-05";
  const STREET_REGEX = /(rua|r\.|avenida|av\.|praceta|pra[cç]a|largo|estrada|travessa|tv\.|rotunda|alameda|ed\.|edif|bloco|loja|shopping|centro comercial|guimaraeshopping|forum|fórum|c\. comercial|bairro|parque|mercado)/i;
  const VENUE_REGEX = /(shopping|centro comercial|forum|fórum|loja|mercado|studio|barbershop|barber shop|barbearia)/i;
  const PLACEHOLDER_PHONE_DIGITS = new Set([
    "351253000000",
    "351259123456",
    "351259654321",
    "351278765432",
    "351276123456",
    "351273987654",
    "351254321987",
    "351912345678",
    "351282123456",
    "351265123456",
    "351269123456",
    "351269987654",
    "351212345678",
    "351212345789",
    "351212678901",
    "351265432109",
    "351269876543",
    "351284321654"
  ]);
  const MUNICIPIO_RULES = [
    { needles: ["almancil"], distrito: "Faro", concelho: "Loulé", freguesia: "Almancil" },
    { needles: ["albufeira"], distrito: "Faro", concelho: "Albufeira" },
    { needles: ["lagos"], distrito: "Faro", concelho: "Lagos" },
    { needles: ["portimao", "portimão"], distrito: "Faro", concelho: "Portimão" },
    { needles: ["faro"], distrito: "Faro", concelho: "Faro" },
    { needles: ["guimaraes", "guimarães"], distrito: "Braga", concelho: "Guimarães" },
    { needles: ["fafe"], distrito: "Braga", concelho: "Fafe" },
    { needles: ["braga"], distrito: "Braga", concelho: "Braga" },
    { needles: ["vila nova de famalicao", "vila nova de famalicão"], distrito: "Braga", concelho: "Vila Nova de Famalicão" },
    { needles: ["lousada"], distrito: "Porto", concelho: "Lousada" },
    { needles: ["porto"], distrito: "Porto", concelho: "Porto" },
    { needles: ["matosinhos"], distrito: "Porto", concelho: "Matosinhos" },
    { needles: ["vila nova de gaia"], distrito: "Porto", concelho: "Vila Nova de Gaia" },
    { needles: ["macedo de cavaleiros"], distrito: "Bragança", concelho: "Macedo de Cavaleiros" },
    { needles: ["peso da regua", "peso da régua"], distrito: "Vila Real", concelho: "Peso da Régua" },
    { needles: ["vila real"], distrito: "Vila Real", concelho: "Vila Real" },
    { needles: ["chaves"], distrito: "Vila Real", concelho: "Chaves" },
    { needles: ["braganca", "bragança"], distrito: "Bragança", concelho: "Bragança" },
    { needles: ["torres vedras"], distrito: "Lisboa", concelho: "Torres Vedras" },
    { needles: ["lisboa"], distrito: "Lisboa", concelho: "Lisboa" },
    { needles: ["amadora"], distrito: "Lisboa", concelho: "Amadora" },
    { needles: ["loures"], distrito: "Lisboa", concelho: "Loures" },
    { needles: ["caldas da rainha"], distrito: "Leiria", concelho: "Caldas da Rainha" },
    { needles: ["leiria"], distrito: "Leiria", concelho: "Leiria" },
    { needles: ["nazare", "nazaré"], distrito: "Leiria", concelho: "Nazaré" },
    { needles: ["coimbra"], distrito: "Coimbra", concelho: "Coimbra" },
    { needles: ["figueira da foz"], distrito: "Coimbra", concelho: "Figueira da Foz" },
    { needles: ["castelo branco"], distrito: "Castelo Branco", concelho: "Castelo Branco" },
    { needles: ["covilha", "covilhã"], distrito: "Castelo Branco", concelho: "Covilhã" },
    { needles: ["seia"], distrito: "Guarda", concelho: "Seia" },
    { needles: ["guarda"], distrito: "Guarda", concelho: "Guarda" },
    { needles: ["viseu"], distrito: "Viseu", concelho: "Viseu" },
    { needles: ["lamego"], distrito: "Viseu", concelho: "Lamego" },
    { needles: ["aveiro"], distrito: "Aveiro", concelho: "Aveiro" },
    { needles: ["espinho"], distrito: "Aveiro", concelho: "Espinho" },
    { needles: ["s. joao da madeira", "s. joão da madeira", "sao joao da madeira", "são joão da madeira"], distrito: "Aveiro", concelho: "São João da Madeira" },
    { needles: ["ovar"], distrito: "Aveiro", concelho: "Ovar" },
    { needles: ["agueda", "águeda"], distrito: "Aveiro", concelho: "Águeda" },
    { needles: ["ourem", "ourém"], distrito: "Santarém", concelho: "Ourém" },
    { needles: ["santarem", "santarém"], distrito: "Santarém", concelho: "Santarém" },
    { needles: ["almada"], distrito: "Setúbal", concelho: "Almada" },
    { needles: ["setubal", "setúbal"], distrito: "Setúbal", concelho: "Setúbal" },
    { needles: ["barreiro"], distrito: "Setúbal", concelho: "Barreiro" },
    { needles: ["montijo"], distrito: "Setúbal", concelho: "Montijo" },
    { needles: ["alcacer do sal", "alcácer do sal"], distrito: "Setúbal", concelho: "Alcácer do Sal" },
    { needles: ["grandola", "grândola"], distrito: "Setúbal", concelho: "Grândola" },
    { needles: ["santiago do cacem", "santiago do cacém"], distrito: "Setúbal", concelho: "Santiago do Cacém" },
    { needles: ["sines"], distrito: "Setúbal", concelho: "Sines" },
    { needles: ["beja"], distrito: "Beja", concelho: "Beja" },
    { needles: ["evora", "évora"], distrito: "Évora", concelho: "Évora" },
    { needles: ["ponta delgada"], distrito: "Açores", concelho: "Ponta Delgada" },
    { needles: ["angra do heroismo", "angra do heroísmo"], distrito: "Açores", concelho: "Angra do Heroísmo" },
    { needles: ["horta"], distrito: "Açores", concelho: "Horta" },
    { needles: ["madalena"], distrito: "Açores", concelho: "Madalena" },
    { needles: ["sao roque do pico", "são roque do pico"], distrito: "Açores", concelho: "São Roque do Pico" },
    { needles: ["vila do porto"], distrito: "Açores", concelho: "Vila do Porto" },
    { needles: ["funchal"], distrito: "Madeira", concelho: "Funchal" }
  ];

  function trimToNull(value) {
    const text = String(value == null ? "" : value).trim();
    return text || null;
  }

  function normalizarTexto(value) {
    return String(value == null ? "" : value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function slugify(value) {
    return normalizarTexto(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function formatarTelefonePortugues(value) {
    const digits = String(value || "").replace(/[^\d]/g, "");

    if (!digits) {
      return null;
    }

    if (digits.length === 12 && digits.indexOf("351") === 0) {
      return "+351 " + digits.slice(3, 6) + " " + digits.slice(6, 9) + " " + digits.slice(9, 12);
    }

    if (digits.length === 9) {
      return digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6, 9);
    }

    return trimToNull(value);
  }

  function telefonePlaceholderReason(value) {
    const digits = String(value || "").replace(/[^\d]/g, "");

    if (!digits) {
      return null;
    }

    if (PLACEHOLDER_PHONE_DIGITS.has(digits)) {
      return "sequencia_conhecida";
    }

    const local = digits.length === 12 && digits.indexOf("351") === 0 ? digits.slice(3) : digits;

    if (local.length !== 9) {
      return "comprimento_invalido";
    }

    if (/^(\d)\1{8}$/.test(local)) {
      return "repeticao";
    }

    if (
      /012345|123456|234567|345678|456789/.test(local) ||
      /987654|876543|765432|654321|543210/.test(local)
    ) {
      return "sequencia_artificial";
    }

    if (/000000|111111|222222|333333|444444|555555|666666|777777|888888|999999/.test(local)) {
      return "grupo_repetido";
    }

    return null;
  }

  function normalizarTelefone(value) {
    const original = trimToNull(value);

    if (!original) {
      return {
        telefone: null,
        invalido: false,
        motivo: "ausente"
      };
    }

    const motivo = telefonePlaceholderReason(original);

    if (motivo) {
      return {
        telefone: null,
        invalido: true,
        motivo: motivo
      };
    }

    return {
      telefone: formatarTelefonePortugues(original),
      invalido: false,
      motivo: null
    };
  }

  function classificarLink(value, fieldHint) {
    const text = trimToNull(value);

    if (!text) {
      return null;
    }

    const normalized = normalizarTexto(text);
    const hint = normalizarTexto(fieldHint || "");

    if (
      normalized.indexOf("instagram.com") !== -1 ||
      hint === "instagram"
    ) {
      return "instagram";
    }

    if (
      normalized.indexOf("facebook.com") !== -1 ||
      normalized.indexOf("fb.com") !== -1 ||
      hint === "facebook"
    ) {
      return "facebook";
    }

    if (
      normalized.indexOf("google.com/maps") !== -1 ||
      normalized.indexOf("goo.gl/maps") !== -1 ||
      normalized.indexOf("maps.app.goo.gl") !== -1 ||
      hint === "google" ||
      hint === "google_maps"
    ) {
      return "google_maps";
    }

    return "website";
  }

  function normalizarLinks(item) {
    const raw = item || {};
    const result = {
      website: null,
      instagram: null,
      facebook: null,
      google_maps: null
    };
    const valorOriginal = {};
    const fields = ["website", "instagram", "facebook", "google_maps", "google"];

    fields.forEach(function(field) {
      const value = trimToNull(raw[field]);

      if (!value) {
        return;
      }

      const kind = classificarLink(value, field);

      if (!kind) {
        return;
      }

      if (!result[kind]) {
        result[kind] = value;
      }

      if ((field === "google" ? "google_maps" : field) !== kind) {
        valorOriginal[field] = value;
      }
    });

    return {
      website: result.website,
      instagram: result.instagram,
      facebook: result.facebook,
      google_maps: result.google_maps,
      fontes: [result.website, result.instagram, result.facebook, result.google_maps].filter(Boolean),
      valorOriginal: valorOriginal
    };
  }

  function extrairCodigoPostal(morada) {
    const match = String(morada || "").match(/\b\d{4}-\d{3}\b/);
    return match ? match[0] : "";
  }

  function moradaEhGenerica(morada) {
    const text = trimToNull(morada);

    if (!text) {
      return true;
    }

    if (extrairCodigoPostal(text)) {
      return false;
    }

    if (STREET_REGEX.test(text) || VENUE_REGEX.test(text)) {
      return false;
    }

    const segments = text
      .split(",")
      .map(function(segment) {
        return segment.trim();
      })
      .filter(Boolean);

    return segments.length <= 2 && !/\d/.test(text);
  }

  function moradaEhUtil(morada) {
    return !moradaEhGenerica(morada);
  }

  function coordsSaoValidas(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) {
      return false;
    }

    const lat = Number(coords[0]);
    const lng = Number(coords[1]);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return false;
    }

    if (lat < 30 || lat > 43.9 || lng < -32.5 || lng > -6) {
      return false;
    }

    return true;
  }

  function normalizarCoords(coords) {
    if (!coordsSaoValidas(coords)) {
      return null;
    }

    return [Number(coords[0]), Number(coords[1])];
  }

  function inferirLocalizacaoAdministrativa(morada) {
    const normalized = normalizarTexto(morada);

    for (let index = 0; index < MUNICIPIO_RULES.length; index += 1) {
      const rule = MUNICIPIO_RULES[index];
      const matched = rule.needles.some(function(needle) {
        return normalized.indexOf(needle) !== -1;
      });

      if (matched) {
        return {
          distrito: rule.distrito || "",
          concelho: rule.concelho || "",
          freguesia: rule.freguesia || ""
        };
      }
    }

    return {
      distrito: "",
      concelho: "",
      freguesia: ""
    };
  }

  function normalizarNome(nome) {
    const original = trimToNull(nome) || "Barbearia";
    let normalizado = original;

    if (/[A-Za-zÀ-ÿ]{3,}\d$/.test(original) && !/\b\d{3,}\b/.test(original)) {
      normalizado = original.replace(/\d+$/, "").trim();
    }

    return {
      nome: normalizado,
      alterado: normalizado !== original,
      original: original
    };
  }

  function validarEmail(email) {
    const value = trimToNull(email);

    if (!value) {
      return null;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
  }

  function obterBarbeariasPublicas(barbearias) {
    return (Array.isArray(barbearias) ? barbearias : []).filter(function(item) {
      return item && item.mostrar_no_mapa === true;
    });
  }

  function determinarStatus(context) {
    const hasName = Boolean(trimToNull(context.nome));
    const hasMorada = Boolean(trimToNull(context.morada));
    const hasUsefulAddress = moradaEhUtil(context.morada);
    const hasCoords = coordsSaoValidas(context.coords);

    if (!hasName || !hasMorada) {
      return "incompleto";
    }

    if (!hasCoords) {
      return "incompleto";
    }

    if (context.telefoneInvalido || context.nomeAlterado || !hasUsefulAddress) {
      return "por_validar";
    }

    return "confirmado";
  }

  function calcularQualidadeFicha(item) {
    const contacts = [
      item.telefone,
      item.email,
      item.website,
      item.instagram,
      item.facebook,
      item.google_maps
    ].filter(Boolean).length;
    const hasUsefulAddress = moradaEhUtil(item.morada);
    const hasCoords = coordsSaoValidas(item.coords);

    if (item.status === "confirmado" && hasUsefulAddress && hasCoords && contacts >= 1) {
      return "alta";
    }

    if (hasUsefulAddress && hasCoords) {
      return "media";
    }

    return "baixa";
  }

  return {
    DATA_VALIDACAO: DATA_VALIDACAO,
    slugify: slugify,
    trimToNull: trimToNull,
    normalizarTexto: normalizarTexto,
    normalizarNome: normalizarNome,
    normalizarTelefone: normalizarTelefone,
    telefonePlaceholderReason: telefonePlaceholderReason,
    normalizarLinks: normalizarLinks,
    extrairCodigoPostal: extrairCodigoPostal,
    moradaEhGenerica: moradaEhGenerica,
    moradaEhUtil: moradaEhUtil,
    coordsSaoValidas: coordsSaoValidas,
    normalizarCoords: normalizarCoords,
    inferirLocalizacaoAdministrativa: inferirLocalizacaoAdministrativa,
    validarEmail: validarEmail,
    determinarStatus: determinarStatus,
    calcularQualidadeFicha: calcularQualidadeFicha,
    obterBarbeariasPublicas: obterBarbeariasPublicas
  };
});
