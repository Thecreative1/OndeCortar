(function() {
  const rawBarbers = Array.isArray(window.barbearias) ? window.barbearias : [];
  const streetRegex = /(rua|r\.|avenida|av\.|praceta|pra[cç]a|largo|estrada|travessa|tv\.|rotunda|alameda|ed\.|edif|bloco|loja|shopping|centro comercial|guimaraeshopping|c\. comercial|piso|andar|n\.?º|n\.?o|bairro)/i;
  const accentPairs = [
    ["#e5efe3", "#516255"],
    ["#f0ead9", "#8d7750"],
    ["#e7ece8", "#425647"],
    ["#efe4dc", "#8a6b52"],
    ["#e5ebdf", "#607252"],
    ["#e9e4d6", "#7e684a"]
  ];

  function normalizar(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
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

    return "Portugal";
  }

  function formatarTelefone(telefone) {
    return String(telefone || "").replace(/[^\d+]/g, "");
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

  function inferirTom(nome) {
    const nomeNormalizado = normalizar(nome);

    if (/(vintage|classic|old school|mustache|1920)/.test(nomeNormalizado)) {
      return "Clássico";
    }

    if (/(premium|elite|studio|vision|house|nobre)/.test(nomeNormalizado)) {
      return "Premium";
    }

    if (/(real|central|house|urban)/.test(nomeNormalizado)) {
      return "Urbano";
    }

    return "Curado";
  }

  function buildDescription(barber) {
    const pieces = [];
    pieces.push("Espaço em " + barber.city);

    if (barber.telefone) {
      pieces.push("com contacto direto");
    }

    if (barber.website || barber.instagram || barber.facebook) {
      pieces.push("e presença online");
    }

    if (barber.horario) {
      pieces.push("com horário partilhado");
    }

    if (barber.observacoes) {
      pieces.push("e nota adicional na ficha");
    }

    const texto = pieces.join(" ");
    return texto.charAt(0).toUpperCase() + texto.slice(1) + ".";
  }

  function buildEditorialTags(barber) {
    const tags = [];
    const tone = inferirTom(barber.name);
    const contacts = barber.telefone || barber.website || barber.instagram || barber.facebook || barber.email;

    tags.push(tone);

    if (contacts) {
      tags.push("Contacto direto");
    }

    if (barber.website) {
      tags.push("Com website");
    }

    if (barber.instagram) {
      tags.push("Com Instagram");
    }

    if (barber.facebook) {
      tags.push("Com Facebook");
    }

    if (barber.horario) {
      tags.push("Horários visíveis");
    }

    if (barber.observacoes) {
      tags.push("Ficha completa");
    }

    const nomeNormalizado = normalizar(barber.name);
    if (/(classic|vintage|1920|old school)/.test(nomeNormalizado)) {
      tags.push("Clássico");
    }

    if (/(studio|premium|elite|vision)/.test(nomeNormalizado)) {
      tags.push("Premium");
    }

    return Array.from(new Set(tags)).slice(0, 4);
  }

  function buildLinks(barber) {
    const links = [];

    if (barber.telefone) {
      links.push({
        label: "Ligar",
        href: "tel:" + formatarTelefone(barber.telefone),
        kind: "phone"
      });
    }

    if (barber.email) {
      links.push({
        label: "Email",
        href: "mailto:" + barber.email,
        kind: "email"
      });
    }

    if (barber.website) {
      links.push({
        label: "Website",
        href: barber.website,
        kind: "website",
        external: true
      });
    }

    if (barber.instagram) {
      links.push({
        label: "Instagram",
        href: barber.instagram,
        kind: "instagram",
        external: true
      });
    }

    if (barber.facebook) {
      links.push({
        label: "Facebook",
        href: barber.facebook,
        kind: "facebook",
        external: true
      });
    }

    if (barber.google) {
      links.push({
        label: "Mapa",
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
    const city = inferirCidade(raw.morada);
    const accent = getAccent(index);
    const barber = {
      id: index + 1,
      slug: slugify(name + "-" + city + "-" + (index + 1)),
      name: name,
      city: city,
      morada: raw.morada || "",
      telefone: raw.telefone || "",
      website: raw.website || "",
      email: raw.email || "",
      instagram: raw.instagram || "",
      facebook: raw.facebook || "",
      google: raw.google || "",
      horario: raw.horario || "",
      observacoes: raw.observacoes || "",
      coords: Array.isArray(raw.coords) ? raw.coords : null,
      accent: accent,
      initials: initialsFromName(name)
    };

    barber.tone = inferirTom(name);
    barber.tags = buildEditorialTags(barber);
    barber.links = buildLinks(barber);
    barber.primaryLink = barber.links[0] || null;
    barber.secondaryLink = barber.links[1] || barber.links[0] || null;
    barber.description = buildDescription(barber);
    barber.score = scoreBarber(barber);
    barber.url = "barbearia.html?slug=" + barber.slug;

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
      cities.add(barber.city);

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

    if (barber.website) {
      return "Website disponível";
    }

    if (barber.instagram) {
      return "Instagram disponível";
    }

    if (barber.email) {
      return barber.email;
    }

    return "Sem contacto direto";
  }

  window.OndeCortarData = {
    escapeHtml: escapeHtml,
    normalizar: normalizar,
    slugify: slugify,
    formatarTelefone: formatarTelefone,
    inferirCidade: inferirCidade,
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
