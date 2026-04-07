(function() {
  const html = document.documentElement;
  if (html) {
    html.setAttribute("lang", "pt-PT");
    html.setAttribute("xml:lang", "pt-PT");
    html.setAttribute("translate", "no");
  }
  if (document.head) {
    let langMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (!langMeta) {
      langMeta = document.createElement("meta");
      langMeta.setAttribute("http-equiv", "content-language");
      document.head.appendChild(langMeta);
    }
    langMeta.setAttribute("content", "pt-PT");

    let noTranslateMeta = document.querySelector('meta[name="google"]');
    if (!noTranslateMeta) {
      noTranslateMeta = document.createElement("meta");
      noTranslateMeta.setAttribute("name", "google");
      document.head.appendChild(noTranslateMeta);
    }
    noTranslateMeta.setAttribute("content", "notranslate");
  }

  const rawBarbersSource =
    Array.isArray(window.barbearias) ? window.barbearias :
    (typeof barbearias !== "undefined" && Array.isArray(barbearias) ? barbearias : []);

  if (!Array.isArray(window.barbearias) && rawBarbersSource.length) {
    window.barbearias = rawBarbersSource;
  }
  const rawBarbers = rawBarbersSource.filter(function(item) {
    return item && item.mostrar_no_mapa !== false;
  });
  const locationUtils = window.BarbeariasUtils || null;
  const streetRegex = /(rua|r\.|avenida|av\.|praceta|pra[cç]a|largo|estrada|travessa|tv\.|rotunda|alameda|ed\.|edif|bloco|loja|shopping|centro comercial|guimaraeshopping|c\. comercial|piso|andar|n\.?º|n\.?o|bairro)/i;
  const accentPairs = [
    ["#e5efe3", "#516255"],
    ["#f0ead9", "#8d7750"],
    ["#e7ece8", "#425647"],
    ["#efe4dc", "#8a6b52"],
    ["#e5ebdf", "#607252"],
    ["#e9e4d6", "#7e684a"]
  ];
  const placeholderPhones = new Set([
    "+351253000000",
    "+351259123456",
    "+351259654321",
    "+351278765432",
    "+351276123456",
    "+351273987654",
    "+351254321987",
    "+351912345678",
    "+351282123456",
    "+351265123456",
    "+351269123456",
    "+351269987654"
  ]);

  function normalizar(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function isCountryValue(value) {
    const normalized = normalizar(String(value || "").trim());
    return normalized === "portugal" || normalized === "portugal continental" || normalized === "pt";
  }

  function sanitizePublicCity(value) {
    const text = String(value || "").trim();
    return text && !isCountryValue(text) ? text : "";
  }

  function slugify(texto) {
    return normalizar(texto)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function escapeHtml(texto) {
    return String(texto || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cleanSegment(segmento) {
    return String(segmento || "")
      .replace(/[–—]/g, ",")
      .replace(/\b\d{4}-\d{3}\b/g, "")
      .replace(/\b\d{4,5}-?\d*\b/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^[-,\s]+|[-,\s]+$/g, "");
  }

  function looksLikePlace(segmento) {
    const limpo = cleanSegment(segmento);
    return Boolean(limpo) && /[A-Za-zÀ-ÿ]/.test(limpo) && !streetRegex.test(limpo) && !/^\d+$/.test(limpo);
  }

  function inferirCidade(morada) {
    const segmentos = String(morada || "")
      .split(",")
      .map(function(segmento) {
        return segmento.trim();
      })
      .filter(Boolean);

    for (let index = segmentos.length - 1; index >= 0; index -= 1) {
      const segmento = segmentos[index];
      const temCodigoPostal = /\b\d{4}-\d{3}\b/.test(segmento);
      const codigoNoInicio = /^\d{4}-\d{3}\b/.test(segmento.trim());

      if (temCodigoPostal && !codigoNoInicio && index > 0 && looksLikePlace(segmentos[index - 1])) {
        return cleanSegment(segmentos[index - 1]);
      }

      if (temCodigoPostal) {
        const limpo = cleanSegment(segmento);
        if (looksLikePlace(limpo)) {
          return limpo;
        }
      }

      if (looksLikePlace(segmento)) {
        return cleanSegment(segmento);
      }
    }

    return "";
  }

  function formatarTelefone(telefone) {
    return String(telefone || "").replace(/[^\d+]/g, "");
  }

  function formatarTelefoneVisual(telefone) {
    const limpo = formatarTelefone(telefone);
    const digitos = limpo.replace(/[^\d]/g, "");

    if (digitos.length === 12 && digitos.indexOf("351") === 0) {
      return "+351 " + digitos.slice(3, 6) + " " + digitos.slice(6, 9) + " " + digitos.slice(9, 12);
    }

    if (digitos.length === 9) {
      return digitos.slice(0, 3) + " " + digitos.slice(3, 6) + " " + digitos.slice(6, 9);
    }

    return String(telefone || "").trim();
  }

  function isPlaceholderPhone(telefone) {
    return placeholderPhones.has(formatarTelefone(telefone));
  }

  function classifyLink(url) {
    const value = String(url || "").trim();

    if (!value) {
      return { kind: "", href: "" };
    }

    const lower = normalizar(value);

    if (lower.indexOf("instagram.com") !== -1) {
      return { kind: "instagram", href: value };
    }

    if (lower.indexOf("facebook.com") !== -1) {
      return { kind: "facebook", href: value };
    }

    if (
      lower.indexOf("fresha.com") !== -1 ||
      lower.indexOf("treatwell.") !== -1 ||
      lower.indexOf("ongenda.com") !== -1
    ) {
      return { kind: "booking", href: value };
    }

    return { kind: "website", href: value };
  }

  function normalizeLinks(raw) {
    const result = {
      website: "",
      instagram: "",
      facebook: "",
      booking: ""
    };

    ["website", "instagram", "facebook"].forEach(function(field) {
      const value = String(raw[field] || "").trim();

      if (!value) {
        return;
      }

      const classified = classifyLink(value);

      if (!classified.kind) {
        return;
      }

      if (!result[classified.kind]) {
        result[classified.kind] = classified.href;
      }
    });

    return result;
  }

  function summarizeUrl(url) {
    const value = String(url || "").trim();

    if (!value) {
      return "";
    }

    try {
      const parsed = new URL(value);
      return parsed.hostname.replace(/^www\./, "");
    } catch (error) {
      return value.replace(/^https?:\/\//, "").replace(/^www\./, "");
    }
  }

  function initialsFromName(nome) {
    const palavras = String(nome || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);

    if (!palavras.length) {
      return "OC";
    }

    return palavras
      .map(function(parte) {
        return parte.charAt(0).toUpperCase();
      })
      .join("");
  }

  function getAccent(index) {
    const pair = accentPairs[index % accentPairs.length];
    return {
      background: pair[0],
      foreground: pair[1]
    };
  }

  function capitalize(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function buildDescription(barber) {
    const observacoes = String(barber.observacoes || "").trim();
    if (observacoes) {
      return observacoes;
    }

    const details = [];

    if (barber.telefone) {
      details.push("contacto direto");
    }

    if (barber.booking) {
      details.push("marcação online");
    }

    if (barber.website) {
      details.push("website");
    }

    if (barber.instagram) {
      details.push("Instagram");
    }

    if (barber.facebook) {
      details.push("Facebook");
    }

    if (barber.email) {
      details.push("email");
    }

    if (barber.horario) {
      details.push("horário");
    }

    if (!details.length) {
      return "Vê morada e informação útil desta barbearia.";
    }

    if (details.length === 1) {
      return capitalize(details[0]) + " disponível.";
    }

    if (details.length === 2) {
      return capitalize(details[0]) + " e " + details[1] + " disponíveis.";
    }

    return capitalize(details.slice(0, -1).join(", ")) + " e " + details[details.length - 1] + " disponíveis.";
  }

  function buildUsefulTags(barber) {
    const tags = [];

    if (barber.telefone) {
      tags.push("Telefone");
    }

    if (barber.booking) {
      tags.push("Marcação");
    }

    if (barber.website) {
      tags.push("Website");
    }

    if (barber.instagram) {
      tags.push("Instagram");
    }

    if (barber.facebook) {
      tags.push("Facebook");
    }

    if (barber.horario) {
      tags.push("Horário");
    }

    if (barber.email) {
      tags.push("Email");
    }

    return Array.from(new Set(tags)).slice(0, 4);
  }

  function buildLinks(barber) {
    const links = [];

    if (barber.telefone) {
      links.push({
        label: "Ligar",
        actionLabel: "Ligar",
        href: "tel:" + formatarTelefone(barber.telefone),
        kind: "phone"
      });
    }

    if (barber.booking) {
      links.push({
        label: "Marcação",
        actionLabel: "Marcação",
        href: barber.booking,
        kind: "booking",
        external: true
      });
    }

    if (barber.website) {
      links.push({
        label: "Website",
        actionLabel: "Ver website",
        href: barber.website,
        kind: "website",
        external: true
      });
    }

    if (barber.instagram) {
      links.push({
        label: "Instagram",
        actionLabel: "Instagram",
        href: barber.instagram,
        kind: "instagram",
        external: true
      });
    }

    if (barber.facebook) {
      links.push({
        label: "Facebook",
        actionLabel: "Facebook",
        href: barber.facebook,
        kind: "facebook",
        external: true
      });
    }

    if (barber.email) {
      links.push({
        label: "Email",
        actionLabel: "Email",
        href: "mailto:" + barber.email,
        kind: "email"
      });
    }

    if (barber.google) {
      links.push({
        label: "Mapa",
        actionLabel: "Ver mapa",
        href: barber.google,
        kind: "map",
        external: true
      });
    }

    return links;
  }

  function scoreBarber(barber) {
    let score = 0;

    if (barber.telefone) score += 2;
    if (barber.booking) score += 2;
    if (barber.website) score += 2;
    if (barber.instagram) score += 2;
    if (barber.facebook) score += 1;
    if (barber.email) score += 1;
    if (barber.horario) score += 2;
    if (barber.observacoes) score += 1;
    if (barber.morada) score += 2;

    return score;
  }

  function createBarber(raw, index) {
    const name = raw.name || raw.nome || "Barbearia";
    const location = locationUtils && typeof locationUtils.normalizarLocalizacaoBarbearia === "function"
      ? locationUtils.normalizarLocalizacaoBarbearia(raw)
      : null;
    const city = sanitizePublicCity((location && location.city) || raw.city || raw.concelho || inferirCidade(raw.morada));
    const accent = getAccent(index);
    const links = normalizeLinks(raw);
    const rawPhone = String(raw.telefone || "").trim();
    const telefone = rawPhone && !isPlaceholderPhone(rawPhone) ? formatarTelefoneVisual(rawPhone) : "";
    const barber = {
      id: index + 1,
      slug: raw.slug || slugify(name + "-" + city + "-" + (index + 1)),
      name: name,
      city: city,
      citySlug: slugify(city),
      locality: (location && location.locality) || raw.localidade || "",
      morada: (location && location.displayAddress) || raw.morada || "",
      addressRaw: (location && location.addressRaw) || raw.address_raw || raw.morada || "",
      telefone: telefone,
      telefoneOriginal: rawPhone,
      website: links.website,
      booking: links.booking,
      email: raw.email || "",
      instagram: links.instagram,
      facebook: links.facebook,
      google: raw.google_maps || raw.google || "",
      horario: raw.horario || "",
      observacoes: raw.observacoes || "",
      coords: Array.isArray(raw.coords) ? raw.coords : null,
      accent: accent,
      initials: initialsFromName(name),
      district: (location && location.district) || raw.distrito || "",
      zone: (location && location.zone) || raw.zone || raw.freguesia || ""
    };

    barber.tags = buildUsefulTags(barber);
    barber.links = buildLinks(barber);
    barber.primaryLink = barber.links[0] || null;
    barber.secondaryLink = barber.links[1] || barber.links[0] || null;
    barber.description = buildDescription(barber);
    barber.score = scoreBarber(barber);
    barber.cityUrl = barber.citySlug ? "cidades/" + barber.citySlug + "/" : "";
    barber.url = "barbearias/" + barber.slug + "/";

    return barber;
  }

  const barbers = rawBarbers.map(createBarber);
  const barbersBySlug = new Map(
    barbers.map(function(barber) {
      return [barber.slug, barber];
    })
  );

  function getBarbers() {
    return barbers.slice();
  }

  function getStats() {
    const cities = new Set();
    let contacts = 0;

    barbers.forEach(function(barber) {
      if (barber.city) {
        cities.add(barber.city);
      }

      if (barber.telefone || barber.website || barber.instagram || barber.facebook || barber.email) {
        contacts += 1;
      }
    });

    return {
      total: barbers.length,
      cities: cities.size,
      contacts: contacts
    };
  }

  function getPopularCities(limit) {
    const cityMap = new Map();

    barbers.forEach(function(barber) {
      if (!barber.city) {
        return;
      }
      cityMap.set(barber.city, (cityMap.get(barber.city) || 0) + 1);
    });

    return Array.from(cityMap.entries())
      .sort(function(a, b) {
        return b[1] - a[1] || a[0].localeCompare(b[0], "pt");
      })
      .slice(0, limit || 8)
      .map(function(entry) {
        return {
          city: entry[0],
          count: entry[1]
        };
      });
  }

  function searchBarbers(term) {
    const query = normalizar(term);

    if (!query || query.length < 2) {
      return getBarbers();
    }

    return barbers.filter(function(barber) {
      const haystack = [
        barber.name,
        barber.city,
        barber.locality,
        barber.morada,
        barber.observacoes
      ]
        .map(normalizar)
        .join(" ");

      return haystack.includes(query);
    });
  }

  function getFeaturedBarbers(limit) {
    return getBarbers()
      .sort(function(a, b) {
        return b.score - a.score || a.name.localeCompare(b.name, "pt");
      })
      .slice(0, limit || 3);
  }

  function getBarberBySlug(slug) {
    return barbersBySlug.get(slug) || null;
  }

  function getSimilarBarbers(referenceBarber, limit) {
    const maxItems = limit || 3;

    if (!referenceBarber) {
      return [];
    }

    if (!referenceBarber.city) {
      return barbers
        .filter(function(barber) {
          return barber.slug !== referenceBarber.slug;
        })
        .sort(function(a, b) {
          return b.score - a.score;
        })
        .slice(0, maxItems);
    }

    const sameCity = barbers
      .filter(function(barber) {
        return barber.slug !== referenceBarber.slug && barber.city === referenceBarber.city;
      })
      .sort(function(a, b) {
        return b.score - a.score;
      });

    if (sameCity.length >= maxItems) {
      return sameCity.slice(0, maxItems);
    }

    const fallback = barbers
      .filter(function(barber) {
        return barber.slug !== referenceBarber.slug && barber.city !== referenceBarber.city;
      })
      .sort(function(a, b) {
        return b.score - a.score;
      });

    return sameCity.concat(fallback).slice(0, maxItems);
  }

  function buildContactLabel(barber) {
    if (barber.telefone) {
      return barber.telefone;
    }

    if (barber.booking) {
      return "Marcação online";
    }

    if (barber.website) {
      return summarizeUrl(barber.website);
    }

    if (barber.instagram) {
      return "Instagram";
    }

    if (barber.facebook) {
      return "Facebook";
    }

    if (barber.email) {
      return barber.email;
    }

    return "Sem contacto disponível";
  }

  window.OndeCortarData = {
    escapeHtml: escapeHtml,
    normalizar: normalizar,
    slugify: slugify,
    formatarTelefone: formatarTelefone,
    inferirCidade: inferirCidade,
    getDisplayPlace: function(barber) {
      return barber && (barber.city || barber.locality || barber.district) ? (barber.city || barber.locality || barber.district) : "Localização a confirmar";
    },
    getBarbers: getBarbers,
    getStats: getStats,
    getPopularCities: getPopularCities,
    searchBarbers: searchBarbers,
    getFeaturedBarbers: getFeaturedBarbers,
    getBarberBySlug: getBarberBySlug,
    getSimilarBarbers: getSimilarBarbers,
    buildContactLabel: buildContactLabel
  };
})();
