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
  const CODIGO_POSTAL_REGEX = /\b(\d{4})(?:[-\s]?(\d{3}))\b/;
  const STREET_REGEX = /(rua|r\.|avenida|av\.|praceta|pra[cç]a|largo|estrada|travessa|tv\.|rotunda|alameda|ed\.|edif|bloco|loja|shopping|centro comercial|guimaraeshopping|forum|fórum|c\. comercial|bairro|parque|mercado)/i;
  const VENUE_REGEX = /(shopping|centro comercial|forum|fórum|loja|mercado|studio|barbershop|barber shop|barbearia)/i;
  const COUNTRY_SEGMENTS = new Set(["portugal", "portugal continental", "pt"]);
  const LOCALITY_FRONTEND_FORMS = {
    "lisboa": { locative: "em Lisboa" },
    "guimaraes": { locative: "em Guimarães" },
    "braga": { locative: "em Braga" },
    "faro": { locative: "em Faro" },
    "coimbra": { locative: "em Coimbra" },
    "aveiro": { locative: "em Aveiro" },
    "leiria": { locative: "em Leiria" },
    "setubal": { locative: "em Setúbal" },
    "setúbal": { locative: "em Setúbal" },
    "evora": { locative: "em Évora" },
    "évora": { locative: "em Évora" },
    "loule": { locative: "em Loulé" },
    "loulé": { locative: "em Loulé" },
    "vila nova de gaia": { locative: "em Vila Nova de Gaia" },
    "matosinhos": { locative: "em Matosinhos" },
    "fafe": { locative: "em Fafe" },
    "porto": { locative: "no Porto" },
    "barreiro": { locative: "no Barreiro" },
    "montijo": { locative: "no Montijo" },
    "funchal": { locative: "no Funchal" },
    "prior velho": { locative: "no Prior Velho" },
    "amadora": { locative: "na Amadora" },
    "nazare": { locative: "na Nazaré" },
    "nazaré": { locative: "na Nazaré" },
    "guarda": { locative: "na Guarda" },
    "covilha": { locative: "na Covilhã" },
    "covilhã": { locative: "na Covilhã" },
    "figueira da foz": { locative: "na Figueira da Foz" },
    "povoa de santa iria": { locative: "na Póvoa de Santa Iria" },
    "póvoa de santa iria": { locative: "na Póvoa de Santa Iria" },
    "calheta": { locative: "na Calheta" },
    "tocha": { locative: "na Tocha" },
    "quinta da redonda": { locative: "na Quinta da Redonda" },
    "ilha do faial": { locative: "na Ilha do Faial" },
    "ilha do pico": { locative: "na Ilha do Pico" },
    "ilha terceira": { locative: "na Ilha Terceira" },
    "horta (angustias)": { locative: "na Horta (Angústias)" },
    "horta (angústias)": { locative: "na Horta (Angústias)" },
    "falagueira-venda nova amadora": { locative: "na Falagueira-Venda Nova Amadora" },
    "parede - jardins da parede": { locative: "na Parede - Jardins da Parede" }
  };
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
    { needles: ["santa barbara de nexe", "santa bárbara de nexe"], distrito: "Faro", concelho: "Faro", freguesia: "Santa Bárbara de Nexe" },
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
    const match = String(morada || "").match(CODIGO_POSTAL_REGEX);
    return match ? match[1] + "-" + match[2] : "";
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

  function limparSegmentoMorada(value) {
    return String(value == null ? "" : value)
      .replace(/[–—]/g, ",")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^[-,\s]+|[-,\s]+$/g, "");
  }

  function limparTextoLocalizacao(value) {
    return limparSegmentoMorada(value)
      .replace(/\b\d{4}(?:[-\s]?\d{3})?\b/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^[-,\s]+|[-,\s]+$/g, "");
  }

  function ehPaisConhecido(value) {
    const normalized = normalizarTexto(trimToNull(value) || "");
    return Boolean(normalized) && COUNTRY_SEGMENTS.has(normalized);
  }

  function sanitizarCidadePublica(value) {
    const text = trimToNull(value);

    if (!text || ehPaisConhecido(text)) {
      return "";
    }

    return text;
  }

  function obterFormaLocalidade(value) {
    const text = trimToNull(value) || "";
    const normalized = normalizarTexto(text);
    const entry = LOCALITY_FRONTEND_FORMS[normalized];

    if (!text) {
      return {
        name: "",
        locative: ""
      };
    }

    return {
      name: text,
      locative: entry && entry.locative ? entry.locative : "em " + text
    };
  }

  function barbeariasNaLocalidade(value) {
    const form = obterFormaLocalidade(value);
    return form.locative ? "Barbearias " + form.locative : "Barbearias";
  }

  function ehSegmentoPorta(value) {
    const text = trimToNull(value);

    if (!text) {
      return false;
    }

    if (/^\d+[A-Za-z]?(?:-\d+[A-Za-z]?)?$/.test(text)) {
      return true;
    }

    if (/^\d+\s*(?:º|o|a)\b/i.test(text)) {
      return true;
    }

    if (/^(?:loja|lj|porta|piso|andar|bloco|frac[cç][aã]o|fraccao|sala|gabinete)\s*[-A-Za-z0-9.º/]+$/i.test(text)) {
      return true;
    }

    if (/^(?:r\/c|rc|esq|dto|dt|frente|tras|traseiras?)$/i.test(normalizarTexto(text))) {
      return true;
    }

    return false;
  }

  function ehSegmentoRua(value) {
    return STREET_REGEX.test(String(value || ""));
  }

  function ehSegmentoVenue(value) {
    return VENUE_REGEX.test(String(value || ""));
  }

  function ehSegmentoLocalidadeValido(value) {
    const text = limparTextoLocalizacao(value);

    if (!text || text.length < 3) {
      return false;
    }

    if (ehPaisConhecido(text)) {
      return false;
    }

    if (!/[A-Za-zÀ-ÿ]/.test(text) || /\d/.test(text)) {
      return false;
    }

    if (ehSegmentoRua(text) || ehSegmentoVenue(text) || ehSegmentoPorta(text)) {
      return false;
    }

    return true;
  }

  function avaliarZona(value, context) {
    const text = limparTextoLocalizacao(value);

    if (!ehSegmentoLocalidadeValido(text)) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    const normalized = normalizarTexto(text);
    const city = context && context.city ? normalizarTexto(context.city) : "";
    const municipality = context && context.municipality ? normalizarTexto(context.municipality) : "";
    const district = context && context.district ? normalizarTexto(context.district) : "";
    const street = context && context.street ? normalizarTexto(context.street) : "";
    const streetNumber = context && context.streetNumber ? normalizarTexto(context.streetNumber) : "";
    const postalCode = context && context.postalCode ? normalizarTexto(context.postalCode) : "";
    const inferredAdmin = inferirLocalizacaoAdministrativa(text);
    const inferredMunicipality = normalizarTexto(inferredAdmin.concelho);
    const inferredDistrict = normalizarTexto(inferredAdmin.distrito);

    if (!normalized || normalized.length < 3) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    if (city && normalized === city) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    if (street && street.indexOf(normalized) !== -1) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    if (streetNumber && normalized === streetNumber) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    if (postalCode && normalized === postalCode) {
      return {
        valid: false,
        value: text,
        reason: ""
      };
    }

    if (inferredMunicipality && municipality && inferredMunicipality !== municipality) {
      return {
        valid: false,
        value: text,
        reason: "zone_matches_other_municipality"
      };
    }

    if (inferredMunicipality && !municipality && city && inferredMunicipality !== city) {
      return {
        valid: false,
        value: text,
        reason: "zone_matches_other_municipality"
      };
    }

    if (inferredDistrict && district && inferredDistrict !== district) {
      return {
        valid: false,
        value: text,
        reason: "zone_matches_other_district"
      };
    }

    return {
      valid: true,
      value: text,
      reason: ""
    };
  }

  function ehZonaValida(value, context) {
    return avaliarZona(value, context).valid;
  }

  function encontrarRegraMunicipio(value) {
    const normalized = normalizarTexto(value);

    if (!normalized) {
      return null;
    }

    function matchTerm(text, needle) {
      const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp("(^|[\\s,;-])" + escapedNeedle + "($|[\\s,;-])").test(text);
    }

    for (let index = 0; index < MUNICIPIO_RULES.length; index += 1) {
      const rule = MUNICIPIO_RULES[index];
      const matched = rule.needles.some(function(needle) {
        return normalized === needle || matchTerm(normalized, needle);
      });

      if (matched) {
        return rule;
      }
    }

    return null;
  }

  function extrairNumeroPortaDaLinha(value) {
    const text = trimToNull(value) || "";

    if (!text || !ehSegmentoRua(text)) {
      return {
        street: text,
        streetNumber: "",
        trailing: ""
      };
    }

    const match = text.match(/^(.*\D)\s+(\d+[A-Za-z]?(?:-\d+[A-Za-z]?)?)(?:\s+(.*))?$/);

    if (!match) {
      return {
        street: text,
        streetNumber: "",
        trailing: ""
      };
    }

    return {
      street: trimToNull(match[1]) || text,
      streetNumber: trimToNull(match[2]) || "",
      trailing: trimToNull(match[3]) || ""
    };
  }

  function construirMoradaNormalizada(parts) {
    const items = [];
    const streetLine = [parts.street, parts.streetNumber].filter(Boolean).join(" ");

    if (streetLine) {
      items.push(streetLine);
    }

    if (parts.complement) {
      items.push(parts.complement);
    }

    const postalLine = [parts.postalCode, parts.locality || parts.city].filter(Boolean).join(" ");

    if (postalLine) {
      items.push(postalLine);
    }

    return items.join(", ");
  }

  function parseAddressComponents(addressRaw) {
    const raw = trimToNull(addressRaw) || "";
    const segments = raw
      .split(",")
      .map(limparSegmentoMorada)
      .filter(Boolean);
    let postalCode = "";
    let locality = "";
    let localityIndex = -1;
    let postalSegmentIndex = -1;

    for (let index = segments.length - 1; index >= 0; index -= 1) {
      if (CODIGO_POSTAL_REGEX.test(segments[index])) {
        postalSegmentIndex = index;
        postalCode = extrairCodigoPostal(segments[index]);
        break;
      }
    }

    if (postalSegmentIndex !== -1) {
      const postalSegment = segments[postalSegmentIndex];
      const inlineLocality = limparTextoLocalizacao(postalSegment.replace(/^\s*\d{4}(?:[-\s]?\d{3})?\s*/, "").replace(postalCode, " "));

      if (ehSegmentoLocalidadeValido(inlineLocality)) {
        locality = inlineLocality;
        localityIndex = postalSegmentIndex;
      } else if (segments[postalSegmentIndex + 1] && ehSegmentoLocalidadeValido(segments[postalSegmentIndex + 1])) {
        locality = limparTextoLocalizacao(segments[postalSegmentIndex + 1]);
        localityIndex = postalSegmentIndex + 1;
      }
    }

    if (!locality) {
      for (let index = segments.length - 1; index >= 0; index -= 1) {
        if (ehSegmentoLocalidadeValido(segments[index])) {
          locality = limparTextoLocalizacao(segments[index]);
          localityIndex = index;
          break;
        }
      }
    }

    const cutoffIndex = localityIndex !== -1 ? localityIndex : (postalSegmentIndex !== -1 ? postalSegmentIndex : segments.length);
    const preLocationSegments = segments.slice(0, cutoffIndex);
    const firstLine = preLocationSegments[0] || "";
    const streetData = extrairNumeroPortaDaLinha(firstLine);
    const complementParts = [];
    const zoneCandidates = [];
    let streetNumber = streetData.streetNumber;

    if (streetData.trailing) {
      complementParts.push(streetData.trailing);
    }

    preLocationSegments.slice(1).forEach(function(segment) {
      const clean = limparTextoLocalizacao(segment);

      if (!clean) {
        return;
      }

      if (!streetNumber && ehSegmentoPorta(clean)) {
        streetNumber = clean;
        return;
      }

      if (ehSegmentoPorta(clean) || ehSegmentoRua(clean) || ehSegmentoVenue(clean)) {
        complementParts.push(segment);
        return;
      }

      zoneCandidates.push(clean);
    });

    return {
      addressRaw: raw,
      segments: segments,
      street: streetData.street || firstLine || "",
      streetNumber: streetNumber || "",
      complement: complementParts.join(", "),
      postalCode: postalCode,
      locality: locality,
      zoneCandidate: zoneCandidates[0] || "",
      tailSegments: localityIndex !== -1 ? segments.slice(localityIndex) : [],
      displayAddress: construirMoradaNormalizada({
        street: streetData.street || firstLine || "",
        streetNumber: streetNumber || "",
        complement: complementParts.join(", "),
        postalCode: postalCode,
        locality: locality,
        city: ""
      })
    };
  }

  function inferirLocalizacaoAdministrativa(value) {
    const parsed = parseAddressComponents(value);
    const candidate = parsed.locality || trimToNull(value) || "";
    const rule = encontrarRegraMunicipio(candidate);

    if (rule) {
      return {
        distrito: rule.distrito || "",
        concelho: rule.concelho || "",
        freguesia: rule.freguesia || ""
      };
    }

    return {
      distrito: "",
      concelho: "",
      freguesia: ""
    };
  }

  function normalizarLocalizacaoBarbearia(item) {
    const raw = item || {};
    const addressRaw = trimToNull(raw.address_raw || raw.addressRaw || raw.morada) || "";
    const manualMunicipality = sanitizarCidadePublica(raw.municipality || raw.municipio || raw.concelho);
    const manualCity = sanitizarCidadePublica(raw.city || raw.concelho);
    const manualZone = trimToNull(raw.zone || raw.freguesia);
    const manualDistrict = trimToNull(raw.district || raw.distrito);
    const manualPostalCode = trimToNull(raw.postal_code || raw.codigo_postal);
    const hasNormalizedLocationFields = Boolean(
      trimToNull(raw.street || raw.street_number || raw.codigo_postal || raw.localidade || raw.address_raw || raw.addressRaw)
    );
    const parsed = parseAddressComponents(addressRaw);
    const parsedLocality = sanitizarCidadePublica(parsed.locality);
    const issues = [];
    let city = "";
    let citySource = "";
    let zone = "";
    let zoneSource = "";

    if (manualCity && hasNormalizedLocationFields) {
      city = manualCity;
      citySource = "manual";
    } else if (parsedLocality) {
      city = parsedLocality;
      citySource = parsed.postalCode ? "postal_locality" : "address_locality";
    } else if (manualCity) {
      city = manualCity;
      citySource = "manual";
    }

    const admin = inferirLocalizacaoAdministrativa(city || parsedLocality || manualCity || "");
    const district = manualDistrict || admin.distrito || "";
    const municipality = manualMunicipality || admin.concelho || city || "";
    const postalCode = parsed.postalCode || manualPostalCode || "";
    const streetNormalized = normalizarTexto(parsed.street);
    const manualCityNormalized = normalizarTexto(manualCity);
    const localityNormalized = normalizarTexto(parsedLocality);
    const municipalityNormalized = normalizarTexto(municipality);
    const adminMunicipioNormalized = normalizarTexto(admin.concelho);
    const adminFreguesiaNormalized = normalizarTexto(admin.freguesia);

    if (
      city &&
      admin.concelho &&
      admin.freguesia &&
      localityNormalized &&
      localityNormalized === adminFreguesiaNormalized &&
      adminMunicipioNormalized &&
      adminMunicipioNormalized !== localityNormalized &&
      (!manualCity || manualCityNormalized === localityNormalized)
    ) {
      city = admin.concelho;
      citySource = parsed.postalCode ? "postal_municipality" : "address_municipality";
    }

    if (manualCity && parsedLocality && manualCityNormalized !== localityNormalized) {
      issues.push(postalCode ? "city_differs_from_postal_locality" : "city_differs_from_address_locality");
    }

    if (manualCity && parsed.street && streetNormalized.indexOf(manualCityNormalized) !== -1 && parsedLocality && manualCityNormalized !== localityNormalized) {
      issues.push("city_matches_street_name_not_locality");
    }

    if (!city && parsedLocality) {
      issues.push("city_missing_with_valid_locality");
      city = parsedLocality;
      citySource = parsed.postalCode ? "postal_locality" : "address_locality";
    }

    if (manualZone && /^\d+[A-Za-z]?$/.test(manualZone)) {
      issues.push("zone_number_or_door");
    }

    if (manualZone && parsed.streetNumber && normalizarTexto(manualZone) === normalizarTexto(parsed.streetNumber)) {
      issues.push("zone_equals_street_number");
    }

    if (manualZone && postalCode && normalizarTexto(manualZone) === normalizarTexto(postalCode)) {
      issues.push("zone_equals_postal_code");
    }

    const manualZoneEvaluation = manualZone ? avaliarZona(manualZone, {
      city: city,
      municipality: municipality,
      district: district,
      street: parsed.street,
      streetNumber: parsed.streetNumber,
      postalCode: postalCode
    }) : null;
    const adminZoneEvaluation = admin.freguesia ? avaliarZona(admin.freguesia, {
      city: city,
      municipality: municipality,
      district: district,
      street: parsed.street,
      streetNumber: parsed.streetNumber,
      postalCode: postalCode
    }) : null;
    const parsedZoneEvaluation = parsed.zoneCandidate ? avaliarZona(parsed.zoneCandidate, {
      city: city,
      municipality: municipality,
      district: district,
      street: parsed.street,
      streetNumber: parsed.streetNumber,
      postalCode: postalCode
    }) : null;

    if (manualZone && !manualZoneEvaluation.valid) {
      issues.push(manualZoneEvaluation.reason || "zone_invalid");
    }

    if (manualZoneEvaluation && manualZoneEvaluation.valid) {
      zone = manualZoneEvaluation.value;
      zoneSource = "manual";
    } else if (adminZoneEvaluation && adminZoneEvaluation.valid && normalizarTexto(admin.freguesia) === localityNormalized) {
      zone = adminZoneEvaluation.value;
      zoneSource = "admin_freguesia";
    } else if (parsedZoneEvaluation && parsedZoneEvaluation.valid) {
      zone = parsedZoneEvaluation.value;
      zoneSource = "address_segment";
    }

    if (zone && city && normalizarTexto(zone) === normalizarTexto(city)) {
      issues.push("zone_equals_city");
      zone = "";
      zoneSource = "";
    }

    if (zone && municipalityNormalized && normalizarTexto(zone) === municipalityNormalized) {
      issues.push("zone_equals_municipality");
      zone = "";
      zoneSource = "";
    }

    if (zone && district && normalizarTexto(zone) === normalizarTexto(district)) {
      issues.push("zone_equals_district");
      zone = "";
      zoneSource = "";
    }

    if (city && city.length < 3) {
      issues.push("city_too_short");
    }

    if (zone && zone.length < 3) {
      issues.push("zone_too_short");
      zone = "";
      zoneSource = "";
    }

    const displayAddress = construirMoradaNormalizada({
      street: parsed.street,
      streetNumber: parsed.streetNumber,
      complement: parsed.complement,
      postalCode: postalCode,
      locality: parsedLocality,
      city: city
    }) || addressRaw;
    const dataConfidence = citySource === "postal_locality" || citySource === "postal_municipality"
      ? (issues.length ? "medium" : "high")
      : citySource === "address_locality" || citySource === "address_municipality"
        ? "medium"
        : citySource === "manual"
          ? (issues.length ? "low" : "medium")
          : "low";
    const finalIssues = Array.from(new Set(issues.concat(dataConfidence === "low" ? ["low_confidence_location"] : [])));

    return {
      addressRaw: addressRaw,
      street: parsed.street || "",
      streetNumber: parsed.streetNumber || "",
      complement: parsed.complement || "",
      postalCode: postalCode,
      locality: parsedLocality || city || "",
      city: city || "",
      municipality: municipality || "",
      zone: zone || "",
      district: district,
      country: "Portugal",
      citySource: citySource,
      zoneSource: zoneSource,
      displayAddress: displayAddress,
      dataConfidence: dataConfidence,
      needsReview: finalIssues.length > 0,
      issues: finalIssues
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
    ehPaisConhecido: ehPaisConhecido,
    sanitizarCidadePublica: sanitizarCidadePublica,
    obterFormaLocalidade: obterFormaLocalidade,
    barbeariasNaLocalidade: barbeariasNaLocalidade,
    normalizarNome: normalizarNome,
    normalizarTelefone: normalizarTelefone,
    telefonePlaceholderReason: telefonePlaceholderReason,
    normalizarLinks: normalizarLinks,
    extrairCodigoPostal: extrairCodigoPostal,
    moradaEhGenerica: moradaEhGenerica,
    moradaEhUtil: moradaEhUtil,
    coordsSaoValidas: coordsSaoValidas,
    normalizarCoords: normalizarCoords,
    parseAddressComponents: parseAddressComponents,
    normalizarLocalizacaoBarbearia: normalizarLocalizacaoBarbearia,
    avaliarZona: avaliarZona,
    ehZonaValida: ehZonaValida,
    inferirLocalizacaoAdministrativa: inferirLocalizacaoAdministrativa,
    validarEmail: validarEmail,
    determinarStatus: determinarStatus,
    calcularQualidadeFicha: calcularQualidadeFicha,
    obterBarbeariasPublicas: obterBarbeariasPublicas
  };
});
