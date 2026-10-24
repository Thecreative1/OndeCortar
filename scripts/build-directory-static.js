const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");
const horarioUtils = require("./horario-utils.js");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://ondecortar.pt/";
const TODAY = new Date().toISOString().slice(0, 10);
// Imagem de partilha 1200×630 gerada por scripts/gerar-imagens-partilha.js (antes: banner 1536×316, cortado pelo Facebook)
const DEFAULT_OG_IMAGE = SITE_URL + "imagens/partilha/ondecortar.jpg";
const DEFAULT_OG_IMAGE_ALT = "OndeCortar.pt — encontra uma barbearia perto de ti: mapa de Portugal com mais de 1000 barbearias";
// Etiquetas comuns de partilha (Facebook, WhatsApp, X) — só quando a imagem é a de 1200×630
function ogImageTags(image, alt) {
  const sized = image === DEFAULT_OG_IMAGE;
  return '  <meta property="og:image" content="' + escapeHtml(image) + '" />\n' +
    (sized ? '  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n' : "") +
    '  <meta property="og:image:alt" content="' + escapeHtml(alt || DEFAULT_OG_IMAGE_ALT) + '" />\n' +
    '  <meta property="og:site_name" content="OndeCortar.pt" />\n' +
    '  <meta property="og:locale" content="pt_PT" />\n' +
    '  <meta name="twitter:card" content="summary_large_image" />';
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function writeFile(relativePath, contents) {
  const target = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, "utf8");
}

function absoluteUrl(relativePath) {
  return SITE_URL + String(relativePath || "").replace(/^\/+/, "");
}

function loadBarbers() {
  const context = {};
  vm.createContext(context);
  const code = fs.readFileSync(path.join(ROOT, "Barbeiros", "barbearias.limpo.js"), "utf8");
  vm.runInContext(code + ";this.data = barbearias;", context, { filename: "Barbeiros/barbearias.limpo.js" });
  return utils.obterBarbeariasPublicas(context.data || []);
}

// Produtos da loja destacados nos perfis (cross-sell barbearia → loja).
// Os slugs têm de existir em commerce-products-a/b.js; nome vem de lá.
// Três variantes rodadas de forma determinística por slug da barbearia,
// para os perfis não mostrarem todos exatamente os mesmos produtos.
const STORE_PICK_VARIANTS = [
  [
    { slug: "philips-hc5630-series-5000", label: "Máquina mais procurada para cortar em casa" },
    { slug: "philips-oneblade-360-qp2724", label: "Aparar e fazer contornos na barba" },
    { slug: "viking-sandalwood", label: "Kit de barba para oferecer" }
  ],
  [
    { slug: "remington-colourcut-hc5035", label: "Primeira máquina para cortar em casa" },
    { slug: "philips-bt3238", label: "Aparador para a barba" },
    { slug: "braun-series-5-aio5545", label: "Cabelo, barba e corpo num só aparelho" }
  ],
  [
    { slug: "wahl-rapid-clip", label: "Máquina sem fios para retoques entre cortes" },
    { slug: "remington-mb320c", label: "Aparador de barba simples" },
    { slug: "shave-factory-clippercare", label: "Manutenção da máquina" }
  ]
];

function hashSlug(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash * 31) + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function loadStorePicks() {
  try {
    const context = { window: { OndeCortarCommerce: {} } };
    vm.createContext(context);
    ["commerce-products-a.js", "commerce-products-b.js"].forEach((file) => {
      vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
    });
    const products = new Map((context.window.OndeCortarCommerce.products || []).map((item) => [item.slug, item]));
    return STORE_PICK_VARIANTS.map((variant) => variant.map((pick) => {
      const product = products.get(pick.slug);
      return product ? { slug: pick.slug, label: pick.label, name: product.name } : null;
    }).filter(Boolean)).filter((variant) => variant.length);
  } catch (error) {
    return [];
  }
}

const storePickVariants = loadStorePicks();

function storeSection(prefix, barberSlug) {
  if (!storePickVariants.length) return "";
  const storePicks = storePickVariants[hashSlug(barberSlug) % storePickVariants.length];
  const rows = storePicks.map((pick) =>
    '<a href="' + escapeHtml(prefix + "produto/" + pick.slug + "/") + '" style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--hairline);text-decoration:none;color:var(--ink)">' +
      '<span style="min-width:0"><strong style="display:block;font-size:14.5px">' + escapeHtml(pick.name) + "</strong><span class=\"oc-meta\">" + escapeHtml(pick.label) + "</span></span>" +
    "</a>"
  ).join("");
  return '<section class="oc-section" style="padding:0 20px 28px" aria-labelledby="loja-h">' +
    '<div class="oc-card" style="padding:20px 18px">' +
      '<div class="oc-eyebrow" style="margin-bottom:6px">Loja OndeCortar</div>' +
      '<h2 id="loja-h" class="oc-section-head__title" style="margin-bottom:8px">Manter o corte entre visitas</h2>' +
      '<p style="font-size:14px;line-height:1.55;color:var(--subtext);margin-bottom:6px">Máquinas, aparadores e kits escolhidos com critério para os retoques em casa entre idas à barbearia.</p>' +
      rows +
      '<a class="oc-btn oc-btn--loja" href="' + escapeHtml(prefix + "loja/") + '" style="width:100%;margin-top:14px">Ver a loja completa</a>' +
    "</div>" +
  "</section>";
}

// Guias da revista nos perfis (barbearia → revista): os perfis têm ~70% do tráfego do site.
// Só artigos úteis a quem vai a uma barbearia; ordem fixa, sem dados inventados.
const PROFILE_GUIDES = [
  { slug: "numeros-da-maquina-de-cortar-cabelo", title: "Que número pedir", label: "Tabela dos pentes da máquina em milímetros" },
  { slug: "tipos-de-degrade-como-pedir-o-corte-certo", title: "Tipos de degradê", label: "Baixo, médio, alto ou à pele — como pedir" },
  { slug: "quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal", title: "Quanto custa um corte", label: "Preços típicos em Portugal por serviço" },
  { slug: "como-escolher-uma-barbearia-sinais-de-qualidade", title: "Como escolher uma barbearia", label: "7 sinais de qualidade antes de marcar" }
].filter((guide) => fs.existsSync(path.join(ROOT, "revista", guide.slug, "index.html")));

function guidesSection(prefix) {
  if (!PROFILE_GUIDES.length) return "";
  const rows = PROFILE_GUIDES.map((guide) =>
    '<a href="' + escapeHtml(prefix + "revista/" + guide.slug + "/") + '" style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--hairline);text-decoration:none;color:var(--ink)">' +
      '<span style="min-width:0"><strong style="display:block;font-size:14.5px">' + escapeHtml(guide.title) + "</strong><span class=\"oc-meta\">" + escapeHtml(guide.label) + "</span></span>" +
    "</a>"
  ).join("");
  return '<section class="oc-section" style="padding:0 20px 28px" aria-labelledby="guias-h">' +
    '<div class="oc-card" style="padding:20px 18px">' +
      '<div class="oc-eyebrow" style="margin-bottom:6px">Revista OndeCortar</div>' +
      '<h2 id="guias-h" class="oc-section-head__title" style="margin-bottom:8px">Antes de ires à barbearia</h2>' +
      '<p style="font-size:14px;line-height:1.55;color:var(--subtext);margin-bottom:6px">Guias curtos para pedir o corte certo e saber o que esperar.</p>' +
      rows +
    "</div>" +
  "</section>";
}

function latestLastmod(entries, fallback) {
  return (entries || []).reduce((latest, entry) => {
    const value = String((entry && entry.lastmod) || "").trim();
    return value && value > latest ? value : latest;
  }, fallback || "1970-01-01");
}

function normalizar(value) {
  return utils.normalizarTexto(value);
}

function slugify(value) {
  return utils.slugify(value);
}

function hasPublicCity(value) {
  const text = String(value || "").trim();
  return Boolean(text) && !utils.ehPaisConhecido(text);
}

function localityForm(value) {
  return utils.obterFormaLocalidade(value);
}

function locativeLabel(value) {
  return localityForm(value).locative || ("em " + String(value || "").trim());
}

// "concelho do Porto", "da Amadora", "de Leiria" — mesmo artigo que o locativo.
function ofPlace(value) {
  const text = String(value || "").trim();
  const match = locativeLabel(text).match(/^(no|na|nos|nas)\s/);
  const contraction = { no: "do", na: "da", nos: "dos", nas: "das" };
  return (match ? contraction[match[1]] : "de") + " " + text;
}

function municipalityPhrase(value) {
  return "no concelho " + ofPlace(value);
}

function districtPhrase(value) {
  const key = utils.normalizarTexto(value);
  if (key === "madeira") return "na Região Autónoma da Madeira";
  if (key === "acores" || key === "açores") return "na Região Autónoma dos Açores";
  return "no distrito " + ofPlace(value);
}

function barbersLabel(value) {
  return utils.barbeariasNaLocalidade(value);
}

function trimText(value) {
  return String(value || "").trim();
}

function sameGeoValue(left, right) {
  const normalizedLeft = normalizar(trimText(left));
  const normalizedRight = normalizar(trimText(right));
  return Boolean(normalizedLeft && normalizedRight && normalizedLeft === normalizedRight);
}

function buildGeoHierarchy(barber, options) {
  if (!barber) return [];

  const settings = options || {};
  const showZone = settings.showZone !== false;
  const city = hasPublicCity(barber.city) ? barber.city : "";
  const locality = hasPublicCity(barber.locality) ? barber.locality : "";
  const municipality = hasPublicCity(barber.municipality) ? barber.municipality : "";
  const district = hasPublicCity(barber.district) ? barber.district : "";
  const zoneEvaluation = utils.avaliarZona(barber.zone, {
    city: city,
    municipality: municipality,
    district: district
  });
  const zone = zoneEvaluation.valid ? trimText(zoneEvaluation.value || barber.zone) : "";
  const items = [];

  if (city) {
    items.push({ label: "Cidade", value: city, href: barber.cityUrl || "" });
  } else if (locality) {
    items.push({ label: "Localidade", value: locality, href: "" });
  }

  if (municipality && !sameGeoValue(municipality, city) && !sameGeoValue(municipality, locality)) {
    items.push({ label: "Concelho", value: municipality, href: "" });
  }

  if (district && !sameGeoValue(district, city) && !sameGeoValue(district, municipality) && !sameGeoValue(district, locality)) {
    items.push({ label: "Distrito", value: district, href: "" });
  }

  if (showZone && zone && ![city, locality, municipality, district].some((value) => sameGeoValue(zone, value))) {
    items.push({ label: "Zona", value: zone, href: "" });
  }

  return items;
}

function buildCityHierarchyEntries(city) {
  if (!city) return [];

  const items = [];
  if (city.name) {
    items.push({ label: "Cidade", value: city.name, href: city.url || "" });
  }
  if (city.municipality && !sameGeoValue(city.municipality, city.name)) {
    items.push({ label: "Concelho", value: city.municipality, href: "" });
  }
  if (city.district && !sameGeoValue(city.district, city.name) && !sameGeoValue(city.district, city.municipality)) {
    items.push({ label: "Distrito", value: city.district, href: "" });
  }
  return items;
}

function formatGeoEntry(entry) {
  return entry && entry.value ? entry.label + ": " + entry.value : "";
}

function renderHierarchyText(entries, prefix) {
  if (!entries || !entries.length) return "";

  return '<div class="location-compact">' + entries.map((entry) => {
    const valueMarkup = entry.href
      ? '<a href="' + escapeHtml(prefix + entry.href) + '">' + escapeHtml(entry.value) + "</a>"
      : escapeHtml(entry.value);
    return '<span><strong>' + escapeHtml(entry.label) + ":</strong> " + valueMarkup + "</span>";
  }).join("") + "</div>";
}

function renderSummaryRow(label, valueMarkup) {
  if (!label || !valueMarkup) return "";
  return '<div class="summary-row"><span>' + escapeHtml(label) + "</span>" + valueMarkup + "</div>";
}

function buildLocationNarrative(barber) {
  if (!barber) return "";

  const city = hasPublicCity(barber.city) ? barber.city : "";
  const locality = hasPublicCity(barber.locality) ? barber.locality : "";
  const municipality = hasPublicCity(barber.municipality) ? barber.municipality : "";
  const district = hasPublicCity(barber.district) ? barber.district : "";
  const zoneEvaluation = utils.avaliarZona(barber.zone, {
    city: city,
    municipality: municipality,
    district: district
  });
  const zone = zoneEvaluation.valid ? trimText(zoneEvaluation.value || barber.zone) : "";
  const parts = [];
  const primaryPlace = city || locality;

  if (zone && ![city, locality, municipality, district].some((value) => sameGeoValue(zone, value))) {
    parts.push("na zona de " + zone);
  }

  if (primaryPlace) {
    parts.push(locativeLabel(primaryPlace));
  }

  if (municipality && !sameGeoValue(municipality, primaryPlace)) {
    parts.push(municipalityPhrase(municipality));
  }

  if (district && !sameGeoValue(district, primaryPlace) && !sameGeoValue(district, municipality)) {
    parts.push(districtPhrase(district));
  }

  return parts.join(", ");
}

function buildCityContext(cityName, hierarchy) {
  const parts = [];

  if (cityName) {
    parts.push(locativeLabel(cityName));
  }

  if (hierarchy && hierarchy.municipality && !sameGeoValue(hierarchy.municipality, cityName)) {
    parts.push(municipalityPhrase(hierarchy.municipality));
  }

  if (
    hierarchy &&
    hierarchy.district &&
    !sameGeoValue(hierarchy.district, cityName) &&
    !sameGeoValue(hierarchy.district, hierarchy.municipality)
  ) {
    parts.push(districtPhrase(hierarchy.district));
  }

  return parts.join(", ");
}

function uniqueNonEmpty(values) {
  return Array.from(new Set((values || []).map((value) => trimText(value)).filter(Boolean)));
}

function publicLocationLabel(barber) {
  if (!barber) return "Localização a confirmar";
  const hierarchy = buildGeoHierarchy(barber, { showZone: false });
  return hierarchy.length ? formatGeoEntry(hierarchy[0]) : "Localização a confirmar";
}

function cleanSegment(value) {
  return String(value || "")
    .replace(/[–—]/g, ",")
    .replace(/\b\d{4}-\d{3}\b/g, "")
    .replace(/\b\d{4,5}-?\d*\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[-,\s]+|[-,\s]+$/g, "");
}

function inferirCidadeFallback(morada) {
  const streetRegex = /(rua|r\.|avenida|av\.|praceta|pra[cç]a|largo|estrada|travessa|tv\.|rotunda|alameda|ed\.|edif|bloco|loja|shopping|centro comercial|guimaraeshopping|c\. comercial|piso|andar|n\.?º|n\.?o|bairro)/i;
  const segmentos = String(morada || "")
    .split(",")
    .map((segmento) => segmento.trim())
    .filter(Boolean);

  function looksLikePlace(segmento) {
    const limpo = cleanSegment(segmento);
    return Boolean(limpo) && /[A-Za-zÀ-ÿ]/.test(limpo) && !streetRegex.test(limpo) && !/^\d+$/.test(limpo);
  }

  for (let index = segmentos.length - 1; index >= 0; index -= 1) {
    const segmento = segmentos[index];
    const temCodigoPostal = /\b\d{4}-\d{3}\b/.test(segmento);
    const codigoNoInicio = /^\d{4}-\d{3}\b/.test(segmento);

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

function inferirZona(barber, city) {
  if (barber.freguesia) {
    return barber.freguesia;
  }

  const segmentos = String(barber.morada || "")
    .split(",")
    .map((segmento) => cleanSegment(segmento))
    .filter(Boolean);
  const cidadeNormalizada = normalizar(city);

  for (let index = segmentos.length - 1; index >= 0; index -= 1) {
    const segmento = segmentos[index];
    const segmentoNormalizado = normalizar(segmento);
    if (!segmentoNormalizado || segmentoNormalizado === cidadeNormalizada) {
      continue;
    }
    if (segmentoNormalizado.includes(cidadeNormalizada)) {
      continue;
    }
    if (/\d/.test(segmento) && index === 0) {
      continue;
    }
    return segmento;
  }

  return city;
}

function formatarTelefoneVisual(telefone) {
  const digits = String(telefone || "").replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.indexOf("351") === 0) {
    return "+351 " + digits.slice(3, 6) + " " + digits.slice(6, 9) + " " + digits.slice(9, 12);
  }
  if (digits.length === 9) {
    return digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6, 9);
  }
  return String(telefone || "").trim();
}

function telephoneHref(telefone) {
  return "tel:" + String(telefone || "").replace(/[^\d+]/g, "");
}

function classifyLink(url) {
  const value = String(url || "").trim();
  const lower = normalizar(value);
  if (!value) return { kind: "", href: "" };
  if (lower.includes("instagram.com")) return { kind: "instagram", href: value };
  if (lower.includes("facebook.com") || lower.includes("fb.com")) return { kind: "facebook", href: value };
  if (lower.includes("fresha.com") || lower.includes("treatwell.") || lower.includes("ongenda.com") || lower.includes("buk.pt")) {
    return { kind: "booking", href: value };
  }
  // inclui o link estável da ficha (maps.google.com/?cid=…), usado nos lotes tirados do Maps
  if (lower.includes("google.com/maps") || lower.includes("maps.google.") || lower.includes("goo.gl/maps") || lower.includes("maps.app.goo.gl")) {
    return { kind: "google", href: value };
  }
  return { kind: "website", href: value };
}

function normalizeLinks(item) {
  const result = { website: "", instagram: "", facebook: "", booking: "", google: "" };
  // campo explícito de marcação (ex.: Noona) — conta como booking seja qual for o domínio
  const booking = String(item.booking || "").trim();
  if (booking) result.booking = booking;
  ["website", "instagram", "facebook", "google_maps", "google"].forEach((field) => {
    const value = String(item[field] || "").trim();
    if (!value) return;
    const classified = classifyLink(value);
    if (classified.kind && !result[classified.kind]) {
      result[classified.kind] = classified.href;
    }
  });
  return result;
}

function joinNatural(items) {
  const values = (items || []).filter(Boolean);
  if (!values.length) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return values[0] + " e " + values[1];
  return values.slice(0, -1).join(", ") + " e " + values[values.length - 1];
}

function formatDate(iso) {
  const value = String(iso || "").trim();
  if (!value) return "";
  const date = new Date(value + "T12:00:00Z");
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function buildPrimaryLink(barber) {
  if (barber.telefone) {
    return { label: "Ligar agora", href: telephoneHref(barber.telefone), external: false };
  }
  if (barber.booking) {
    return { label: "Marcar online", href: barber.booking, external: true };
  }
  if (barber.website) {
    return { label: "Abrir website", href: barber.website, external: true };
  }
  if (barber.instagram) {
    return { label: "Ver Instagram", href: barber.instagram, external: true };
  }
  if (barber.facebook) {
    return { label: "Ver Facebook", href: barber.facebook, external: true };
  }
  if (barber.email) {
    return { label: "Enviar email", href: "mailto:" + barber.email, external: false };
  }
  return null;
}

function buildMapLink(barber) {
  if (Array.isArray(barber.coords)) {
    return "https://www.google.com/maps/search/?api=1&query=" + barber.coords[0] + "," + barber.coords[1];
  }
  if (barber.google) {
    return barber.google;
  }
  if (barber.morada) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(barber.morada);
  }
  return "";
}

function displayUrl(value) {
  return String(value || "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
}

function buildProfileEditorial(barber) {
  const locationNarrative = buildLocationNarrative(barber);
  const intro = locationNarrative
    ? barber.name + " fica " + locationNarrative + "."
    : barber.name + " tem a localização pública ainda em revisão.";
  const addressSentence = barber.morada
    ? "A morada publicada é " + barber.morada + "."
    : "A ficha pública ainda não mostra uma morada completa.";
  const channels = [];
  if (barber.telefone) channels.push("telefone");
  if (barber.booking) channels.push("ligação para marcação");
  if (barber.website) channels.push("website");
  if (barber.instagram) channels.push("Instagram");
  if (barber.facebook) channels.push("Facebook");
  if (barber.email) channels.push("email");
  const contactSentence = channels.length
    ? "Nesta ficha encontras " + joinNatural(channels) + " para escolher a forma de contacto mais prática."
    : "Nesta ficha podes confirmar a morada e os dados públicos disponíveis antes de contactar.";
  const horarioSentence = barber.horario
    ? "O horário indicado é " + barber.horario + "."
    : "O horário ainda não foi indicado publicamente nesta ficha.";
  const updatedSentence = "Informação atualizada em " + formatDate(barber.lastmod) + ".";
  return [intro, addressSentence, contactSentence, horarioSentence, updatedSentence].join(" ");
}

function buildCardSummary(barber) {
  const bits = [];
  if (barber.telefone) bits.push("telefone");
  else if (barber.booking) bits.push("marcação online");
  else if (barber.website || barber.instagram || barber.facebook) bits.push("links úteis");
  if (barber.horario) bits.push("horário");
  return bits.length
    ? "Ficha com " + joinNatural(bits.concat("morada")) + " para consultar rapidamente."
    : "Consulta a morada e a localização confirmada desta barbearia.";
}

const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Linha "Segundo …" por baixo do horário quando veio de uma fonte externa (horario_fonte).
// No OpenStreetMap a atribuição é obrigatória pela licença ODbL.
function buildHorarioFonteNote(fonte) {
  if (!fonte || !fonte.nome) return "";
  const H = escapeHtml;
  const isOsm = /openstreetmap/i.test(fonte.nome);
  const label = isOsm ? "OpenStreetMap" : fonte.nome;
  const link = fonte.url
    ? '<a href="' + H(fonte.url) + '" target="_blank" rel="noopener noreferrer nofollow" style="color:inherit">' + H(label) + "<\/a>"
    : H(label);
  const m = String(fonte.data || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const when = m ? ", consultado a " + Number(m[3]) + " " + MESES_CURTOS[Number(m[2]) - 1] + " " + m[1] : "";
  const licence = isOsm ? ' (© contribuidores do OpenStreetMap, <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer nofollow" style="color:inherit">ODbL<\/a>)' : "";
  return '<p style="font-size:12.5px;line-height:1.5;color:var(--subtext);margin-top:8px">Segundo o ' + link + licence + when +
    ". Confirma antes de ir.<\/p>";
}

// ── Preços "desde" (campo `precos`, de scripts/recolher-precos.js ou enviados pela barbearia).
// Mostram-se sempre com fonte e data; "desde" = serviço de adulto mais barato desse tipo.
const PRECO_LABELS = [["corte", "Corte"], ["barba", "Barba"], ["corte_barba", "Corte + barba"]];

function normalizePrecos(p) {
  if (!p || typeof p !== "object" || !p.fonte || !p.fonte.nome) return null;
  const out = { fonte: p.fonte };
  let any = false;
  PRECO_LABELS.forEach(([k]) => {
    if (typeof p[k] === "number" && p[k] > 0) { out[k] = p[k]; any = true; }
  });
  return any ? out : null;
}

function formatEuro(value) {
  return (value % 1 ? value.toFixed(2).replace(".", ",") : String(value)) + " €";
}

function precosItems(precos) {
  return precos ? PRECO_LABELS.filter(([k]) => precos[k]).map(([k, label]) => ({ label: label, value: precos[k] })) : [];
}

function precosRange(precos) {
  const values = precosItems(precos).map((i) => i.value);
  if (!values.length) return "";
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  return min === max ? formatEuro(min) : formatEuro(min).replace(" €", "") + "–" + formatEuro(max);
}

function buildPrecosFonteNote(fonte) {
  const H = escapeHtml;
  const m = String(fonte.data || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const when = m ? " a " + Number(m[3]) + " " + MESES_CURTOS[Number(m[2]) - 1] + " " + m[1] : "";
  if (fonte.nome === "Barbearia") {
    return '<p class="oc-summary__note">Preços «desde» indicados pela barbearia' + when + ". Confirma antes de ir.<\/p>";
  }
  const link = fonte.url
    ? '<a href="' + H(fonte.url) + '" target="_blank" rel="noopener nofollow" style="color:inherit">' + H(fonte.nome) + "<\/a>"
    : H(fonte.nome);
  return '<p class="oc-summary__note">Preços «desde» segundo a página de marcações (' + link + "), consultada" + when + ". Confirma antes de ir.<\/p>";
}

function buildProfileSeo(barber) {
  const placeLabel = barber.city ? " " + locativeLabel(barber.city) : "";
  const contactChannels = [];

  if (barber.telefone) contactChannels.push("telefone");
  if (barber.booking) contactChannels.push("marcação online");
  if (barber.website) contactChannels.push("website");
  if (barber.instagram) contactChannels.push("Instagram");
  if (barber.facebook) contactChannels.push("Facebook");
  if (barber.email) contactChannels.push("email");

  const hasLocation = Boolean(barber.morada || Array.isArray(barber.coords));
  const titleFocus = barber.horario
    ? (barber.telefone ? "Telefone, morada e horário" : "Morada, mapa e horário")
    : (contactChannels.length ? "Contacto, morada e mapa" : "Morada e mapa");
  const descriptionParts = [];

  // Com preços, abre a description pelo preço do corte (ou do primeiro serviço com preço).
  const firstPrice = precosItems(barber.precos)[0];
  if (firstPrice) descriptionParts.push(firstPrice.label.toLowerCase() + " desde " + formatEuro(firstPrice.value));
  descriptionParts.push.apply(descriptionParts, contactChannels);
  if (barber.horario) {
    descriptionParts.push("horário");
  }
  if (hasLocation) {
    descriptionParts.push("localização no mapa");
  }

  const descriptionFocus = descriptionParts.length
    ? joinNatural(descriptionParts)
    : "localização e dados públicos disponíveis";
  const subject = barber.name + placeLabel;

  return {
    title: subject + " | " + titleFocus + " | OndeCortar.pt",
    description: subject + ": " + descriptionFocus + ". Consulta morada, contactos úteis e barbearias próximas no OndeCortar.pt."
  };
}

function buildCityIntro(cityName, cityBarbers, hierarchy) {
  const cityContext = buildCityContext(cityName, hierarchy);
  const withPhone = cityBarbers.filter((barber) => barber.telefone).length;
  const withBooking = cityBarbers.filter((barber) => barber.booking).length;
  const withSocial = cityBarbers.filter((barber) => barber.instagram || barber.facebook || barber.website).length;
  const totalLabel = cityBarbers.length + " barbearia" + (cityBarbers.length === 1 ? "" : "s");
  const phoneLabel = withPhone === 0
    ? "nenhuma ficha mostra telefone"
    : withPhone === 1
      ? "1 ficha mostra telefone"
      : withPhone + " fichas mostram telefone";
  const socialLabel = withSocial === 0
    ? "nenhuma ficha mostra presença online"
    : withSocial === 1
      ? "1 ficha mostra presença online"
      : withSocial + " fichas mostram presença online";
  return [
    "Esta página reúne " + totalLabel + " já listada" + (cityBarbers.length === 1 ? "" : "s") + " " + cityContext + ".",
    "Podes comparar moradas, telefones, mapa e links úteis antes de escolher. Neste momento, " + phoneLabel + " e " + socialLabel + ".",
    withBooking
      ? (withBooking === 1
        ? "Uma das opções já tem marcação online, o que facilita o primeiro contacto."
        : "Algumas opções também já têm marcação online, o que facilita o primeiro contacto.")
      : (withPhone || withSocial)
        ? (cityBarbers.length === 1
          ? "Ainda não tem marcação online: o contacto faz-se por telefone ou pelas redes sociais."
          : "Nenhuma tem ainda marcação online: o contacto faz-se por telefone ou pelas redes sociais.")
        : (cityBarbers.length === 1 ? "Ainda não tem marcação online." : "Nenhuma tem ainda marcação online.")
  ].join(" ");
}

function buildCityGuide(cityName, hierarchy) {
  const cityContext = buildCityContext(cityName, hierarchy);
  return [
    cityContext.charAt(0).toUpperCase() + cityContext.slice(1) + ", começa por confirmar morada e contactos antes de escolher.",
    "Quando há telefone, website ou Instagram, verifica primeiro disponibilidade e tipo de serviço.",
    "Se estiveres entre várias opções, dá prioridade às fichas com morada completa, contactos claros e informação atualizada."
  ];
}

// Pares categoria+artigo rodados por cidade (determinístico via hashSlug),
// para o bloco "Loja e revista" não apontar sempre para o mesmo destino.
const CITY_COMMERCE_VARIANTS = [
  { category: "maquinas-de-cortar", article: "como-escolher-uma-barbearia-sinais-de-qualidade", articleLabel: "Como escolher uma barbearia" },
  { category: "kits-de-barba", article: "quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal", articleLabel: "Quanto custa um corte" },
  { category: "manutencao-de-maquinas", article: "tipos-de-degrade-como-pedir-o-corte-certo", articleLabel: "Tipos de degradê" }
];

function buildSlugData(rawBarbers) {
  const barbers = rawBarbers.map((item, index) => {
    const location = utils.normalizarLocalizacaoBarbearia(item);
    const city = hasPublicCity(location.city) ? location.city : "";
    const links = normalizeLinks(item);
    const normalizedPhone = utils.normalizarTelefone(item.telefone || "");
    const phone = normalizedPhone.telefone ? formatarTelefoneVisual(normalizedPhone.telefone) : "";
    const slug = item.slug || slugify((item.nome || "barbearia") + "-" + city + "-" + (index + 1));
    const citySlug = city ? slugify(city) : "";
    const barber = {
      id: index + 1,
      slug: slug,
      name: item.nome || "Barbearia",
      city: city,
      citySlug: citySlug,
      cityUrl: citySlug ? "cidades/" + citySlug + "/" : "",
      profileUrl: "barbearias/" + slug + "/",
      morada: location.displayAddress || item.morada || "",
      addressRaw: location.addressRaw || item.address_raw || item.morada || "",
      street: location.street || "",
      streetNumber: location.streetNumber || "",
      complement: location.complement || "",
      locality: location.locality || "",
      municipality: location.municipality || item.municipality || item.concelho || city,
      codigoPostal: location.postalCode || item.codigo_postal || utils.extrairCodigoPostal(item.morada || ""),
      district: location.district || item.distrito || "",
      country: location.country || "Portugal",
      telefone: phone,
      email: utils.validarEmail(item.email || ""),
      // WhatsApp só quando o dono o confirmou no formulário (campo `whatsapp`); 9 dígitos, sem 351
      whatsapp: String(item.whatsapp || "").replace(/\D/g, "").replace(/^351/, ""),
      website: links.website,
      booking: links.booking,
      instagram: links.instagram,
      facebook: links.facebook,
      google: links.google,
      horario: String(item.horario || "").trim(),
      horarioFonte: item.horario_fonte && item.horario_fonte.nome ? item.horario_fonte : null,
      precos: normalizePrecos(item.precos),
      observacoes: String(item.observacoes || "").trim(),
      coords: utils.normalizarCoords(item.coords),
      zone: location.zone || "",
      dataConfidence: location.dataConfidence || "low",
      needsReview: Boolean(location.needsReview),
      locationFlags: location.issues || [],
      lastmod: item.ultima_validacao || TODAY
    };
    barber.mapUrl = buildMapLink(barber);
    barber.primaryLink = buildPrimaryLink(barber);
    barber.editorial = buildProfileEditorial(barber);
    barber.cardSummary = buildCardSummary(barber);
    barber.sameAs = [barber.website, barber.instagram, barber.facebook].filter(Boolean);
    return barber;
  });

  const cities = new Map();
  barbers.forEach((barber) => {
    if (!barber.citySlug) return;
    if (!cities.has(barber.citySlug)) {
      cities.set(barber.citySlug, {
        slug: barber.citySlug,
        name: barber.city,
        url: "cidades/" + barber.citySlug + "/",
        barbers: []
      });
    }
    cities.get(barber.citySlug).barbers.push(barber);
  });

  cities.forEach((city) => {
    city.barbearias = city.barbers.slice().sort((a, b) => a.name.localeCompare(b.name, "pt"));
    city.lastmod = latestLastmod(city.barbearias);
    city.municipalityValues = uniqueNonEmpty(city.barbearias.map((barber) => barber.municipality));
    city.districtValues = uniqueNonEmpty(city.barbearias.map((barber) => barber.district));
    city.municipality = city.municipalityValues.length === 1 ? city.municipalityValues[0] : "";
    city.district = city.districtValues.length === 1 ? city.districtValues[0] : "";
    city.hasMixedMunicipalities = city.municipalityValues.length > 1;
    city.hasMixedDistricts = city.districtValues.length > 1;
    city.intro = buildCityIntro(city.name, city.barbearias, city);
    city.guide = buildCityGuide(city.name, city);
    const cityCommerce = CITY_COMMERCE_VARIANTS[hashSlug(city.slug) % CITY_COMMERCE_VARIANTS.length];
    city.storeCategory = cityCommerce.category;
    city.magazineArticle = cityCommerce.article;
    city.magazineArticleLabel = cityCommerce.articleLabel;
  });

  return {
    barbers: barbers,
    cities: Array.from(cities.values()).sort((a, b) => b.barbearias.length - a.barbearias.length || a.name.localeCompare(b.name, "pt")),
    siteLastmod: latestLastmod(barbers, TODAY)
  };
}

function renderBaseStyles(extraStyles) {
  return `
  <style>
    :root {
      /* Tema escuro "preto mate & verde-garrafa" (igual aos perfis, 2026-10-01).
         --text é a cor do TEXTO (clara); --accent/--accent-strong são fundos de botão
         (verde-garrafa); --link é a cor dos links em texto (âmbar). */
      --bg: #141614;
      --surface: #1E221F;
      --surface-soft: #262B27;
      --text: #ECE7DD;
      --muted: #A49D90;
      --border: #2F3530;
      --border-strong: #4B544D;
      --accent: #1F4D3A;
      --accent-strong: #143326;
      --link: #E3A863;
      --gold: #E3A863;
      --shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
      --shadow-soft: 0 16px 36px rgba(0, 0, 0, 0.28);
      --mobile-nav-panel: rgba(20, 22, 20, 0.98);
      --mobile-nav-border: #2F3530;
      --mobile-nav-link-bg: #1E221F;
      --mobile-nav-toggle-border: rgba(200, 135, 58, 0.6);
      --mobile-nav-toggle-bg: rgba(30, 34, 31, 0.9);
      --mobile-nav-shadow: 0 22px 46px rgba(0, 0, 0, 0.45);
      --mobile-nav-backdrop: rgba(0, 0, 0, 0.55);
      --container: min(1160px, calc(100% - 32px));
      --radius-lg: 24px;
      --radius-md: 18px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(ellipse at 90% 0%, rgba(31, 77, 58, 0.45), transparent 45%),
        linear-gradient(160deg, #161916 0%, #111311 100%);
    }

    a {
      color: var(--link);
      text-decoration-color: rgba(166, 119, 45, 0.52);
      text-decoration-thickness: 1px;
      text-underline-offset: 0.18em;
      transition: color 0.2s ease, text-decoration-color 0.2s ease;
    }
    a:hover {
      color: var(--text);
      text-decoration-color: rgba(166, 119, 45, 0.84);
    }
    img { display: block; max-width: 100%; }
    a:focus-visible {
      outline: 3px solid rgba(81, 98, 85, 0.32);
      outline-offset: 3px;
    }

    .container { width: var(--container); margin: 0 auto; }
    .site-header { padding: 18px 0 0; }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      padding: 14px 18px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: rgba(16, 18, 16, 0.94);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    }
    .brand, .footer-brand {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }
    .brand img, .footer-brand img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      object-fit: contain;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: var(--shadow-soft);
    }
    .brand,
    .nav-links a,
    .btn,
    .eyebrow,
    .pill,
    .tag {
      text-decoration: none;
    }
    .brand-text { display: grid; gap: 3px; }
    .brand-text strong, .footer-brand strong { font-family: 'Big Shoulders Display', 'Arial Narrow', sans-serif; font-weight: 700; font-size: 22px; line-height: 1; letter-spacing: -0.01em; color: var(--text); }
    .brand-text strong sup, .footer-brand strong sup { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #E3A863; vertical-align: super; margin-left: 2px; }
    .site-header .brand img, .footer-brand img, .brand-text > span { display: none; }
    .brand-text span { font-size: 0.82rem; color: var(--muted); }
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      justify-content: end;
    }
    .nav-links a {
      min-height: 42px;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      font-weight: 600;
    }
    .nav-links a:hover, .nav-links a.is-current {
      background: rgba(200, 135, 58, 0.14);
      border-color: rgba(200, 135, 58, 0.5);
      color: var(--text);
    }
    .nav-links a.nav-cta {
      color: #fff !important;
      background: linear-gradient(135deg, var(--accent), var(--accent-strong));
      border-color: rgba(81, 98, 85, 0.28) !important;
      box-shadow: 0 14px 32px rgba(81, 98, 85, 0.22);
    }
    .nav-links a.nav-cta:hover {
      color: #fff !important;
      background: linear-gradient(135deg, var(--accent), var(--accent-strong));
      border-color: rgba(81, 98, 85, 0.28) !important;
    }

    main { padding: 30px 0 48px; }
    h1, h2, h3 { margin: 0; color: var(--text); line-height: 1.08; }
    h1, h2 {
      font-family: "Big Shoulders Display", "Arial Narrow", sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.01em;
      line-height: 0.95;
    }
    h1 { font-size: clamp(2.6rem, 6vw, 4.8rem); }
    h2 { font-size: clamp(1.9rem, 4vw, 2.8rem); }
    h3 { font-size: 1.15rem; }
    p, li { color: var(--muted); line-height: 1.75; }

    .eyebrow, .tag, .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid rgba(200, 135, 58, 0.45);
      background: rgba(200, 135, 58, 0.14);
      color: var(--gold);
      font-size: 0.84rem;
      font-weight: 700;
    }
    .tag, .pill {
      background: var(--surface-soft);
      border-color: var(--border-strong);
      color: var(--text);
    }
    .pill-link:hover {
      border-color: rgba(176, 138, 74, 0.74);
      transform: translateY(-1px);
    }
    .breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      color: var(--muted);
      font-size: 0.94rem;
    }

    .hero-card, .card, .footer-shell {
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
      box-shadow: var(--shadow);
    }
    .hero-card {
      padding: 24px;
      display: grid;
      gap: 18px;
      background:
        radial-gradient(circle at top right, rgba(31, 77, 58, 0.4), transparent 45%),
        linear-gradient(180deg, #1E221F, #191C1A);
    }
    .hero-grid, .grid-2 {
      display: grid;
      grid-template-columns: minmax(0, 1.06fr) minmax(280px, 0.94fr);
      gap: 18px;
      align-items: start;
    }
    .hero-copy, .stack { display: grid; gap: 16px; }
    .hero-actions, .tag-row, .card-actions, .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .location-compact {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 14px;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }
    .location-compact strong {
      color: var(--text);
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-right: 4px;
    }
    .location-compact a {
      color: var(--link);
      border-bottom: 1px solid rgba(200, 135, 58, 0.5);
    }
    .location-compact a:hover {
      border-color: rgba(166, 119, 45, 0.82);
    }
    .summary-panel {
      padding: 18px;
      border-radius: 20px;
      background: rgba(31, 77, 58, 0.28);
      border: 1px solid rgba(46, 122, 90, 0.45);
      display: grid;
      gap: 14px;
    }
    .summary-row {
      padding: 14px 16px;
      border-radius: 16px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
    }
    .summary-row span {
      display: block;
      margin-bottom: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--link);
    }
    .summary-row a {
      color: var(--link);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: rgba(166, 119, 45, 0.52);
      text-underline-offset: 0.12em;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 18px;
      border-radius: 16px;
      border: 1px solid transparent;
      font-weight: 700;
      transition: transform 0.2s ease;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      color: #F2EEE6;
      background: linear-gradient(135deg, #2C6A4E, var(--accent));
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
    }
    .btn-secondary {
      color: var(--text);
      background: var(--surface);
      border-color: var(--border-strong);
      box-shadow: none;
    }
    .btn-soft {
      color: var(--link);
      background: rgba(200, 135, 58, 0.1);
      border-color: rgba(200, 135, 58, 0.3);
    }
    .section { padding-top: 24px; }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .barber-grid, .city-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
    .city-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .card {
      padding: 20px;
      display: grid;
      gap: 14px;
    }
    .list-clean { margin: 0; padding-left: 18px; }
    .list-clean li::marker { color: var(--gold); }
    .meta-list { display: grid; gap: 12px; }
    .meta-row {
      display: grid;
      gap: 4px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .meta-row:last-child { padding-bottom: 0; border-bottom: 0; }
    .meta-row strong { font-size: 0.9rem; color: var(--text); }
    .meta-row span { color: var(--muted); }
    .meta-row a { color: var(--link); text-decoration: underline; text-decoration-color: rgba(166, 119, 45, 0.52); }
    footer { padding: 0 0 48px; }
    .footer-shell {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 18px;
      flex-wrap: wrap;
      padding: 24px 28px;
    }
    .footer-intro { display: grid; gap: 12px; max-width: 54ch; }
    .footer-links a { color: var(--link); font-weight: 700; text-decoration: none; }

    @media (max-width: 980px) {
      .hero-grid, .grid-2, .barber-grid, .city-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 1100px) {
      .nav:not([data-mobile-nav]) { flex-direction: column; align-items: stretch; border-radius: 28px; }
      .nav:not([data-mobile-nav]) .brand { justify-content: center; }
      .nav-links, .hero-actions, .card-actions, .footer-links { flex-direction: column; align-items: stretch; }
      .nav-links a, .btn { width: 100%; }
      .hero-card, .card, .footer-shell { padding: 22px; }
    }

    ${extraStyles || ""}
  </style>`;
}

function renderHeader(prefix, currentSection) {
  return `
  <header class="site-header">
    <div class="container">
      <nav class="nav" aria-label="Navegação principal" data-mobile-nav data-mobile-nav-breakpoint="1100">
        <div class="nav-main-row">
          <a class="brand" href="${prefix || "./"}">
            <img src="${prefix}imagens/logo-ondecortar-round.png" alt="Logo OndeCortar.pt" />
            <span class="brand-text">
              <strong>OndeCortar<sup>.pt</sup></strong>
              <span>Barbearias em Portugal</span>
            </span>
          </a>
          <div class="nav-mobile-actions">
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="siteNavLinks" data-nav-toggle>
              <span class="nav-toggle-label">Menu</span>
              <span class="nav-toggle-box" aria-hidden="true">
                <span class="nav-toggle-line"></span>
                <span class="nav-toggle-line"></span>
                <span class="nav-toggle-line"></span>
              </span>
            </button>
          </div>
        </div>
        <div class="nav-links" id="siteNavLinks" aria-hidden="false">
          <a href="${prefix || "./"}#explorar">Explorar</a>
          <a class="${currentSection === "cidades" ? "is-current" : ""}" href="${prefix}cidades/">Cidades</a>
          <a href="${prefix}registar.html">Adicionar barbearia</a>
          <a class="${currentSection === "loja" ? "is-current" : ""}" href="${prefix}loja/">Loja</a>
          <a class="${currentSection === "revista" ? "is-current" : ""}" href="${prefix}revista/">Revista</a>
          <a href="${prefix}faq.html">FAQ</a>
          <a class="nav-cta" href="${prefix || "./"}#mapa">Voltar ao mapa</a>
        </div>
      </nav>
      <button class="nav-backdrop" type="button" aria-label="Fechar menu" aria-hidden="true" data-nav-backdrop hidden></button>
    </div>
  </header>`;
}

function renderFooter(prefix) {
  return `
  <footer>
    <div class="container footer-shell">
      <div class="footer-intro">
        <div class="footer-brand">
          <img src="${prefix}imagens/logo-ondecortar-round.png" alt="Logo OndeCortar.pt" />
          <strong>OndeCortar<sup>.pt</sup></strong>
        </div>
        <p>Diretório de barbearias em Portugal com páginas por cidade, perfis com morada e contactos, loja e revista num único site.</p>
      </div>
      <div class="footer-links">
        <a href="${prefix || "./"}">Homepage</a>
        <a href="${prefix}cidades/">Cidades</a>
        <a href="${prefix}loja/">Loja</a>
        <a href="${prefix}revista/">Revista</a>
        <a href="${prefix}sobre/">Sobre</a>
        <a href="${prefix}faq.html">FAQ</a>
      </div>
    </div>
  </footer>`;
}

function renderDocument(options) {
  const structuredData = (options.structuredData || []).map((item) => {
    return '  <script type="application/ld+json">' + JSON.stringify(item) + "</script>";
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#516255" />
  <title>${escapeHtml(options.title)}</title>
  <meta name="description" content="${escapeHtml(options.description)}" />
  <link rel="canonical" href="${escapeHtml(options.canonical)}" />
  ${options.robots ? '<meta name="robots" content="' + escapeHtml(options.robots) + '" />' : ""}
  <meta property="og:title" content="${escapeHtml(options.ogTitle || options.title)}" />
  <meta property="og:description" content="${escapeHtml(options.ogDescription || options.description)}" />
  <meta property="og:url" content="${escapeHtml(options.canonical)}" />
  <meta property="og:type" content="${escapeHtml(options.ogType || "website")}" />
${ogImageTags(options.ogImage || DEFAULT_OG_IMAGE, options.ogImageAlt)}
  <link rel="icon" href="${escapeHtml(options.prefix || "")}favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="${escapeHtml(options.prefix || "")}apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  ${options.extraHead || ""}
  ${renderBaseStyles(options.extraStyles)}
  <link rel="stylesheet" href="${escapeHtml(options.prefix || "")}mobile-nav.css" />
  <script src="${escapeHtml(options.prefix || "")}mobile-nav.js" defer></script>
  <script src="${escapeHtml(options.prefix || "")}oc-analytics.js" defer></script>
${structuredData ? "\n" + structuredData : ""}
</head>
<body>
${options.body || ""}
</body>
</html>
`;
}

function renderBarberCard(barber, prefix, options) {
  const locationSummary = renderHierarchyText(buildGeoHierarchy(barber, options), prefix);
  const primaryLink = barber.primaryLink
    ? '<a class="btn btn-primary" href="' + escapeHtml(barber.primaryLink.href) + '"' + (barber.primaryLink.external ? ' target="_blank" rel="nofollow noopener noreferrer"' : "") + ">" + escapeHtml(barber.primaryLink.label) + "</a>"
    : "";
  // Dados para os filtros da página de cidade (Aberto agora / Marcação online / Perto de mim),
  // lidos pelo CITY_FILTERS_SCRIPT no browser. Sem JS os cartões ficam iguais.
  const week = options && options.filterData ? horarioUtils.parsePt(barber.horario) : null;
  const filterAttrs = options && options.filterData ? [
    week ? ' data-oc-week="' + escapeHtml(JSON.stringify(week)) + '"' : "",
    barber.booking ? ' data-oc-booking="1"' : "",
    Array.isArray(barber.coords) ? ' data-oc-lat="' + barber.coords[0] + '" data-oc-lng="' + barber.coords[1] + '"' : ""
  ].join("") : "";
  const utilityTags = [
    barber.horario ? '<span class="tag"' + (week ? " data-oc-status" : "") + ">Horário disponível</span>" : "",
    options && options.filterData && barber.booking ? '<span class="tag">Marcação online</span>' : "",
    options && options.filterData && Array.isArray(barber.coords) ? '<span class="tag" data-oc-distance hidden></span>' : ""
  ].filter(Boolean).join("");
  const metaHtml = [
    locationSummary,
    utilityTags ? '<div class="tag-row">' + utilityTags + "</div>" : ""
  ].filter(Boolean).map((line) => "    " + line).join("\n");
  return `
  <article class="card"${filterAttrs}>
${metaHtml ? metaHtml + "\n" : ""}    <h3><a href="${escapeHtml(prefix + barber.profileUrl)}">${escapeHtml(barber.name)}</a></h3>
    <p>${escapeHtml(options && options.longCopy ? barber.editorial : barber.cardSummary)}</p>
    ${barber.morada ? '<p><strong>Morada:</strong> ' + escapeHtml(barber.morada) + "</p>" : ""}
    <div class="card-actions">
      <a class="btn btn-secondary" href="${escapeHtml(prefix + barber.profileUrl)}">Ver perfil</a>
      ${primaryLink}
    </div>
  </article>`;
}

function renderProfilePage(barber, citiesMap) {
  const prefix = "../../";
  const city = barber.citySlug ? citiesMap.get(barber.citySlug) : null;
  const sameCity = city ? city.barbearias.filter((i) => i.slug !== barber.slug).slice(0, 3) : [];
  const canonical = absoluteUrl(barber.profileUrl);

  // ── Derived flags
  const lastmodDate = barber.lastmod ? new Date(barber.lastmod) : null;
  const daysSinceUpdate = lastmodDate ? Math.floor((Date.now() - lastmodDate.getTime()) / 86400000) : 999;
  const isUpdatedRecent = daysSinceUpdate <= 90;

  // ── SEO
  const seo = buildProfileSeo(barber);
  const title = seo.title;
  const description = seo.description;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "OndeCortar.pt", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Cidades", "item": SITE_URL + "cidades/" }
      ].concat(city ? [
        { "@type": "ListItem", "position": 3, "name": city.name, "item": SITE_URL + city.url },
        { "@type": "ListItem", "position": 4, "name": barber.name, "item": canonical }
      ] : [
        { "@type": "ListItem", "position": 3, "name": barber.name, "item": canonical }
      ])
    },
    {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      "name": barber.name,
      "url": canonical,
      "telephone": barber.telefone ? String(barber.telefone).replace(/\s+/g, " ") : undefined,
      "email": barber.email || undefined,
      "address": barber.morada ? {
        "@type": "PostalAddress",
        "streetAddress": [barber.street, barber.streetNumber, barber.complement].filter(Boolean).join(" "),
        "postalCode": barber.codigoPostal || undefined,
        "addressLocality": barber.locality || barber.city,
        "addressRegion": barber.district || undefined,
        "addressCountry": "PT"
      } : undefined,
      // Só quando o texto PT se converte sem ambiguidade; o texto livre não é válido no schema.
      "openingHoursSpecification": horarioUtils.toSchemaSpecs(horarioUtils.parsePt(barber.horario)) || undefined,
      "priceRange": precosRange(barber.precos) || undefined,
      "sameAs": barber.sameAs && barber.sameAs.length ? barber.sameAs : undefined,
      "geo": Array.isArray(barber.coords) ? {
        "@type": "GeoCoordinates",
        "latitude": barber.coords[0],
        "longitude": barber.coords[1]
      } : undefined
    }
  ].map((d) => { const c = Object.assign({}, d); Object.keys(c).forEach((k) => c[k] === undefined && delete c[k]); return c; });
  const jsonLd = structuredData.map((d) => '  <script type="application/ld+json">' + JSON.stringify(d) + "<\/script>").join("\n");

  // ── SVG icons (inline, 18px, stroke 1.5)
  const iPhone   = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/><\/svg>';
  const iPin     = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/><\/svg>';
  const iGlobe   = '<svg class="oc-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/><\/svg>';
  const iMail    = '<svg class="oc-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/><\/svg>';
  const iArrow   = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5"/><\/svg>';
  const iArrowUR = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/><\/svg>';
  const iArrowL  = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M19 12H5m5 5-5-5 5-5"/><\/svg>';
  // Hash (não query) para não criar URLs novas do formulário; registar.html lê-o.
  const updateHref = prefix + "registar.html#atualizar=" + encodeURIComponent(barber.name || "");
  // "Voltar": regressa à página anterior do site (a pesquisa da homepage é reposta);
  // sem histórico interno (ex.: vindo do Google) segue o href, a homepage.
  const backScript = '<script>document.addEventListener("click",function(e){var a=e.target.closest("[data-oc-back]");if(!a)return;var r="";try{r=new URL(document.referrer).origin}catch(_){}if(r===location.origin&&history.length>1){e.preventDefault();history.back();}});<\/script>';
  const iShare   = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="M12 16V4m-5 5 5-5 5 5M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/><\/svg>';
  const iSciss   = '<svg class="oc-icon" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/><\/svg>';
  const iCheck   = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/><\/svg>';
  const iBadge   = '<svg class="oc-icon" viewBox="0 0 24 24"><path d="m12 3 2 2.5L17 5l.5 3L20 9l-1 3 1 3-2.5 1L17 19l-3-.5L12 21l-2-2.5L7 19l-.5-3L4 15l1-3-1-3 2.5-1L7 5l3 .5z"/><path d="m9 12 2 2 4-4"/><\/svg>';
  const iInsta   = '<svg class="oc-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/><\/svg>';
  const iCal     = '<svg class="oc-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><\/svg>';
  // Ícone oficial do WhatsApp (Simple Icons, CC0) no verde da marca: o único contacto a verde no perfil
  const iWhatsApp = '<svg class="oc-icon oc-icon--wa" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/><\/svg>';

  // ── Helpers
  function H(s) { return escapeHtml(String(s || "")); }

  function contactRow(icon, label, value, actionLabel, actionHref) {
    if (!value) return "";
    const disp = H(label !== "Morada" && value.length > 42 ? value.substring(0, 40) + "…" : value);
    const act = actionHref
      ? '<a href="' + H(actionHref) + '" class="oc-contact-row__action"' + (actionHref.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + H(actionLabel) + "<\/a>"
      : '<button class="oc-contact-row__action" onclick="' + H("navigator.clipboard&&navigator.clipboard.writeText(" + JSON.stringify(value) + ")") + '">' + H(actionLabel) + "<\/button>";
    return '<div class="oc-contact-row"><span style="color:var(--subtext)">' + icon + "<\/span><div style=\"min-width:0\"><div class=\"oc-contact-row__label\">" + H(label) + "<\/div><div class=\"oc-contact-row__value\">" + disp + "<\/div><\/div>" + act + "<\/div>";
  }

  // Pré-visualização do mapa no cartão: uma imagem estática do mesmo mapa base dos perfis
  // (Esri World Topo, pedido "export" já centrado na barbearia), com pino desenhado por CSS.
  function relatedMapUrl(coords) {
    if (!Array.isArray(coords) || coords.length < 2) return "";
    const lat = Number(coords[0]), lng = Number(coords[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
    const R = 6378137;
    const x = R * lng * Math.PI / 180;
    const y = R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
    const hw = 640, hh = 360; // metros (≈ zoom 16 em 640×360 px)
    const bbox = [x - hw, y - hh, x + hw, y + hh].map(v => v.toFixed(1)).join(",");
    return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/export?bbox=" + bbox +
      "&bboxSR=3857&imageSR=3857&size=640,360&format=jpg&f=image";
  }

  // Morada curta para os cartões: só a rua (antes do código postal), sem cortar a meio de uma palavra
  function shortStreet(morada) {
    let rua = String(morada).split(/,?\s*\d{4}-\d{3}/)[0].replace(/[,\s]+$/, "");
    if (rua.length <= 34) return rua;
    rua = rua.slice(0, 34);
    const corte = Math.max(rua.lastIndexOf(","), rua.lastIndexOf(" "));
    return (corte > 12 ? rua.slice(0, corte) : rua).replace(/[,\s]+$/, "") + "…";
  }

  function relatedCard(item) {
    const mapUrl = relatedMapUrl(item.coords);
    const ph = '<div class="oc-photo oc-related__photo' + (mapUrl ? " oc-related__photo--map" : "") + '">' +
      (mapUrl
        ? '<img class="oc-related__map" src="' + H(mapUrl) + '" alt="" width="640" height="360" loading="lazy" decoding="async">' +
          '<span class="oc-related__pin" aria-hidden="true"><\/span>' +
          '<span class="oc-related__credit">© Esri<\/span>'
        : "") +
      '<div class="oc-photo__label">' + H(item.name.split(" ")[0].toUpperCase()) + "<\/div><\/div>";
    const dist = item.district || item.zone || item.city || "";
    return '<a class="oc-related" href="' + H(prefix + item.profileUrl) + '">' +
      ph +
      '<div>' +
        (dist ? '<div class="oc-eyebrow" style="margin-bottom:6px">' + H(dist) + "<\/div>" : "") +
        '<div style="font-family:var(--serif);font-size:20px;letter-spacing:-0.02em;line-height:1.05;margin-bottom:8px">' + H(item.name) + "<\/div>" +
        '<p style="font-size:13.5px;color:var(--subtext);line-height:1.5">' + H(item.cardSummary || item.editorial || "") + "<\/p>" +
      "<\/div>" +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid var(--hairline)">' +
        '<span class="oc-meta" style="display:flex;align-items:center;gap:6px">' + iPin + " " + H(shortStreet(item.morada || item.city || "")) + "<\/span>" +
        '<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase">Ver perfil ' + iArrow + "<\/span>" +
      "<\/div>" +
    "<\/a>";
  }

  // Cartão "És o dono?" — igual em todas as fichas e sempre no mesmo sítio (depois de
  // Contactos/Horário/Mapa). A lista mostra só factos: que dados a ficha tem e quais faltam.
  function ownerBlock() {
    const fields = [
      ["Morada", barber.morada],
      ["Telefone", barber.telefone],
      ["Horário", barber.horario],
      ["Website", barber.website],
      ["Instagram", barber.instagram],
      // WhatsApp em vez do email: o email do formulário é privado e ninguém escreve a um barbeiro por email
      ["WhatsApp", barber.whatsapp]
    ];
    const missing = fields.filter(function(f) { return !f[1]; }).map(function(f) {
      return f[0] === "Instagram" || f[0] === "WhatsApp" ? f[0] : f[0].toLowerCase();
    });
    const filled = fields.length - missing.length;
    const complete = missing.length === 0;
    const body = complete
      ? "A ficha tem todos os dados principais. Se alguma coisa mudar — horário, contactos, morada — atualiza-a para quem te procura ver a informação certa."
      : "Faltam " + joinNatural(missing) + ". Quanto mais completa a ficha, mais fácil é os clientes encontrarem-te e contactarem-te.";
    const checklist = fields.map(function(f) {
      return '<li class="oc-owner-check__item' + (f[1] ? " is-done" : "") + '">' +
        '<span class="oc-owner-check__mark" aria-hidden="true">' + (f[1] ? iCheck : "") + "<\/span>" +
        H(f[0]) + '<span class="oc-visually-hidden">' + (f[1] ? " (preenchido)" : " (em falta)") + "<\/span>" +
      "<\/li>";
    }).join("");
    return '<div class="oc-card oc-card--ink oc-owner oc-owner-inner">' +
      '<div class="oc-owner-grid">' +
        '<div class="oc-owner__copy">' +
          '<div class="oc-eyebrow oc-owner__eyebrow">És o dono desta barbearia?<\/div>' +
          '<p class="oc-owner__headline">' + (complete ? "Mantém esta página <em>em dia</em>." : "Completa esta <em>página</em>.") + "<\/p>" +
          '<p class="oc-owner__body">' + H(body) + "<\/p>" +
        "<\/div>" +
        '<div class="oc-owner__panel">' +
          '<div class="oc-owner__progress-label"><span>Ficha<\/span><span class="oc-mono">' + filled + "\/" + fields.length + " completa<\/span><\/div>" +
          '<div class="oc-owner__progress" aria-hidden="true"><span style="width:' + Math.round(100 * filled / fields.length) + '%"><\/span><\/div>' +
          '<ul class="oc-owner-check">' + checklist + "<\/ul>" +
          '<a href="' + H(updateHref) + '" class="oc-btn oc-btn--gold oc-owner__cta">' + (complete ? "Atualizar perfil" : "Completar a ficha") + " " + iArrow + "<\/a>" +
        "<\/div>" +
      "<\/div>" +
    "<\/div>";
  }

  const phoneHrefVal = barber.telefone ? "tel:" + barber.telefone.replace(/\s/g, "") : "";
  const mapsUrl = barber.morada
    ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(barber.morada)
    : (Array.isArray(barber.coords) ? "https://www.google.com/maps/search/?api=1&query=" + barber.coords[0] + "," + barber.coords[1] : "");

  const phoneBtn   = barber.telefone ? '<a class="oc-btn oc-btn--primary" href="' + H(phoneHrefVal) + '" style="width:100%" itemprop="telephone">' + iPhone + ' Ligar agora<span class="oc-mono" style="margin-left:auto;font-size:11px;opacity:.6;letter-spacing:.04em">' + H(barber.telefone) + "<\/span><\/a>" : "";
  const mapBtn     = mapsUrl ? '<a class="oc-btn oc-btn--ghost" href="#mapa" style="flex:1">' + iPin + " Abrir mapa<\/a>" : "";
  const webBtn     = barber.website ? '<a class="oc-btn oc-btn--ghost" href="' + H(barber.website) + '" target="_blank" rel="noopener noreferrer" style="flex:1">' + iGlobe + " Website<\/a>" : "";
  const instBtn    = !barber.website && barber.instagram ? '<a class="oc-btn oc-btn--ghost" href="' + H(barber.instagram) + '" target="_blank" rel="noopener noreferrer" style="flex:1">' + iInsta + " Instagram<\/a>" : "";
  const secondRow  = (mapBtn || webBtn || instBtn) ? '<div style="display:flex;gap:10px">' + mapBtn + (webBtn || instBtn) + "<\/div>" : "";
  const claimLink  = '<a class="oc-btn oc-btn--link" href="' + H(updateHref) + '" style="align-self:flex-start;font-size:13px">És o dono? Atualizar perfil ' + iArrow + "<\/a>";

  const pubPill  = '<span class="oc-pill">Ficha pública<\/span>';
  const updPill  = isUpdatedRecent
    ? '<span class="oc-pill oc-pill--gold">' + iBadge + " Info atualizada<\/span>"
    : '<span class="oc-pill oc-pill--warn">Informação por completar<\/span>';
  const cityPill = barber.city     ? '<span class="oc-pill">' + iPin + " " + H(barber.city) + "<\/span>" : "";
  const distPill = barber.district ? '<span class="oc-pill">' + H(barber.district) + " · Distrito<\/span>" : "";
  const barbPill = '<span class="oc-pill oc-pill--gold">' + iSciss + " Barbearia<\/span>";

  const heroLeft =
    "<div>" +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap">' + cityPill + distPill + barbPill + "<\/div>" +
      '<h1 class="oc-hero-name" style="font-size:46px;margin-bottom:18px" itemprop="name">' +
        H(barber.name) +
      "<\/h1>" +
      (barber.editorial ? '<p class="oc-hero__blurb" style="font-size:15.5px;line-height:1.55;color:var(--ink);margin-bottom:22px;max-width:340px" itemprop="description">' + H(barber.editorial) + "<\/p>" : "") +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px">' + pubPill + updPill + "<\/div>" +
      '<div class="oc-hero__ctas" style="display:flex;flex-direction:column;gap:10px">' + phoneBtn + secondRow + claimLink + "<\/div>" +
    "<\/div>";

  // ── Resumo rápido (coluna direita do hero em desktop; por baixo dos botões em mobile).
  // Só dados que a ficha tem. O estado "aberto/fechado" é calculado no browser (hora de
  // Lisboa) a partir do horário publicado; sem JS fica o horário completo.
  const summaryWeek = horarioUtils.parsePt(barber.horario);
  const summaryStatus = barber.horario
    ? '<div class="oc-summary__status" data-oc-week="' + H(summaryWeek ? JSON.stringify(summaryWeek) : "") + '">' +
        '<span class="oc-summary__dot" aria-hidden="true"><\/span>' +
        '<span class="oc-summary__status-text">' + H(barber.horario) + "<\/span>" +
      "<\/div>" +
      '<p class="oc-summary__today" hidden><\/p>' +
      '<p class="oc-summary__note">Segundo o horário publicado; feriados podem variar.<\/p>'
    : '<div class="oc-summary__status is-unknown"><span class="oc-summary__dot" aria-hidden="true"><\/span>' +
        '<span class="oc-summary__status-text">Horário ainda por indicar<\/span><\/div>';
  const summaryOnline = [
    barber.website ? '<a href="' + H(barber.website) + '" target="_blank" rel="noopener noreferrer">' + iGlobe + " Website<\/a>" : "",
    barber.instagram ? '<a href="' + H(barber.instagram) + '" target="_blank" rel="noopener noreferrer">' + iInsta + " Instagram<\/a>" : ""
  ].filter(Boolean).join("");
  const summaryRow = (label, value) => value
    ? '<div class="oc-summary__row"><dt>' + H(label) + "<\/dt><dd>" + value + "<\/dd><\/div>"
    : "";
  const summaryCard =
    '<aside class="oc-card oc-summary" aria-label="Resumo rápido">' +
      '<div class="oc-eyebrow oc-summary__eyebrow">Resumo rápido<\/div>' +
      summaryStatus +
      '<dl class="oc-summary__list">' +
        summaryRow("Morada", barber.morada
          ? H(barber.morada) + (mapsUrl ? ' <a class="oc-summary__link" href="' + H(mapsUrl) + '" target="_blank" rel="noopener noreferrer">Como chegar ' + iArrowUR + "<\/a>" : "")
          : "") +
        summaryRow("Telefone", barber.telefone ? '<a href="' + H(phoneHrefVal) + '">' + H(barber.telefone) + "<\/a>" : "") +
        summaryRow("Preços", precosItems(barber.precos).map((i) => H(i.label) + " desde <strong>" + H(formatEuro(i.value)) + "<\/strong>").join("<br>")) +
        summaryRow("Online", summaryOnline ? '<span class="oc-summary__online">' + summaryOnline + "<\/span>" : "") +
        summaryRow("Atualizada", H(formatDate(barber.lastmod))) +
      "<\/dl>" +
      (barber.precos ? buildPrecosFonteNote(barber.precos.fonte) : "") +
    "<\/aside>";
  const summaryScript = summaryWeek
    ? "<script>(function(){var s=document.querySelector('.oc-summary__status[data-oc-week]');if(!s||!window.Intl)return;" +
      "var w;try{w=JSON.parse(s.getAttribute('data-oc-week'));}catch(e){return;}" +
      "var p={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});" +
      "var d={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[p.weekday];if(d===undefined)return;var now=p.hour+':'+p.minute;" +
      "var N=['segunda','terça','quarta','quinta','sexta','sábado','domingo'];" +
      "function t(h){var a=h.split(':');return (+a[0])+'h'+(a[1]==='00'?'':a[1]);}" +
      "var txt,open=false,today=w[d]||[];" +
      "for(var i=0;i<today.length;i++){if(now>=today[i][0]&&now<today[i][1]){open=true;txt='Aberto agora · fecha às '+t(today[i][1]);break;}}" +
      "if(!open){for(var j=0;j<today.length;j++){if(now<today[j][0]){txt='Fechado · abre hoje às '+t(today[j][0]);break;}}}" +
      "if(!txt){for(var k=1;k<=7;k++){var nd=(d+k)%7;if(w[nd]&&w[nd].length){var m=nd>=5;txt='Fechado · abre '+(k===1?'amanhã':(k===7?(m?'no próximo ':'na próxima ')+N[nd]:(m?'no ':'na ')+N[nd]))+' às '+t(w[nd][0][0]);break;}}}" +
      "if(!txt)return;s.classList.add(open?'is-open':'is-closed');s.querySelector('.oc-summary__status-text').textContent=txt;" +
      "var td=s.parentNode.querySelector('.oc-summary__today');if(td){td.textContent='Hoje: '+(today.length?today.map(function(x){return t(x[0])+'–'+t(x[1]);}).join(' e '):'fechado');td.hidden=false;}" +
      "})();<\/script>"
    : "";

  const heroSection =
    '<section class="oc-hero" aria-label="Informação principal">' +
    heroLeft +
    summaryCard +
    "<\/section>" +
    summaryScript;

  // Dados enviados pelo próprio dono (formulário): WhatsApp confirmado ou preços com fonte "Barbearia"
  const ownerSourced = Boolean(barber.whatsapp || (barber.precos && barber.precos.fonte && barber.precos.fonte.nome === "Barbearia"));

  // ── Contacts
  const instaHandle = barber.instagram
    ? "@" + (barber.instagram.replace(/\/$/, "").split("/").pop() || "")
    : "";
  // Marcação online (Fresha, Noona, …): linha simples nos contactos. Sem "noreferrer" para a
  // barbearia ver o OndeCortar como origem; data-oc-click permite contar os cliques.
  const bookingPlatform = (() => {
    const host = (barber.booking || "").replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
    const known = [[/(^|\.)fresha\.com$/, "Fresha"], [/(^|\.)noona\.(pt|app)$/, "Noona"], [/(^|\.)buk\.pt$/, "Buk"],
      [/(^|\.)ongenda\.com$/, "Ongenda"], [/(^|\.)treatwell\./, "Treatwell"], [/(^|\.)booksy\.com$/, "Booksy"]];
    const match = known.find(([re]) => re.test(host));
    return match ? match[1] : host;
  })();
  const bookingRow = barber.booking
    ? '<div class="oc-contact-row"><span style="color:var(--subtext)">' + iCal + "<\/span><div style=\"min-width:0\"><div class=\"oc-contact-row__label\">Marcação online<\/div><div class=\"oc-contact-row__value\">" + H(bookingPlatform) + "<\/div><\/div>"
      + '<a href="' + H(barber.booking) + '" class="oc-contact-row__action" target="_blank" rel="nofollow noopener" data-oc-click="booking">Marcar<\/a><\/div>'
    : "";
  // WhatsApp (confirmado pelo dono): abre a conversa com uma linha a dizer de onde vem o cliente.
  const whatsappRow = barber.whatsapp
    ? '<div class="oc-contact-row"><span style="color:var(--subtext)">' + iWhatsApp + "<\/span><div style=\"min-width:0\"><div class=\"oc-contact-row__label\">WhatsApp<\/div><div class=\"oc-contact-row__value\">" + H(formatarTelefoneVisual("351" + barber.whatsapp)) + "<\/div><\/div>"
      + '<a href="' + H("https://wa.me/351" + barber.whatsapp + "?text=" + encodeURIComponent("Olá! Vi a vossa barbearia no OndeCortar.pt.")) + '" class="oc-contact-row__action oc-contact-row__action--wa" target="_blank" rel="nofollow noopener" data-oc-click="whatsapp">Escrever<\/a><\/div>'
    : "";
  const contactsInner =
    contactRow(iPin,   "Morada",    barber.morada,   "Copiar", null) +
    contactRow(iPhone, "Telefone",  barber.telefone, "Ligar",  phoneHrefVal) +
    whatsappRow +
    bookingRow +
    contactRow(iMail,  "Email",     barber.email,    "Enviar", barber.email ? "mailto:" + barber.email : "") +
    contactRow(iGlobe, "Website",   barber.website ? barber.website.replace(/^https?:\/\//, "") : "", "Abrir", barber.website) +
    contactRow(iInsta, "Instagram", instaHandle,     "Ver",    barber.instagram);

  // ── Hours
  const hoursWeek = horarioUtils.parsePt(barber.horario);
  const hoursMeta = (horarioUtils.toOpeningHoursStrings(hoursWeek) || [])
    .map((value) => '<meta itemprop="openingHours" content="' + H(value) + '" />')
    .join("");
  const hoursSource = buildHorarioFonteNote(barber.horarioFonte);
  const hoursInner = barber.horario
    ? '<p style="font-size:14.5px;line-height:1.6;color:var(--ink-soft)">' + H(barber.horario) + "<\/p>" +
      hoursMeta + hoursSource
    :'<p style="font-size:14px;color:var(--subtext);font-style:italic">O horário aparece aqui assim que a barbearia o adicionar.<\/p>';

  // ── Map
  const hasMap = Array.isArray(barber.coords) || barber.morada;
  const mapEmbed = Array.isArray(barber.coords)
    ? '<div id="detailMap" style="height:100%;min-height:220px"><\/div>'
    : '<div style="height:220px;display:flex;align-items:center;justify-content:center;background:var(--paper-2);border-radius:18px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--subtext)">' + iPin + " " + H(barber.morada || "") + "<\/div>";
  const mapFooter =
    (barber.morada ? '<div class="oc-meta" style="display:flex;align-items:center;gap:8px;margin-top:14px">' + iPin + " " + H(barber.morada) + "<\/div>" : "") +
    (mapsUrl ? '<a class="oc-btn oc-btn--ghost" href="' + H(mapsUrl) + '" target="_blank" rel="noopener noreferrer" style="width:100%;margin-top:10px">Abrir no Google Maps ' + iArrowUR + "<\/a>" : "");
  const mapWrap = '<div class="oc-map-wrap" style="min-height:220px" id="mapa">' + mapEmbed + "<\/div>" + mapFooter;

  // ── Info row (desktop 3-col, mobile stacked sections)
  const infoRow =
    '<div class="oc-info-row oc-section" style="padding:0 20px 28px;display:flex;flex-direction:column;gap:24px">' +
      '<section class="oc-card" style="padding:20px 18px 8px" aria-labelledby="contactos-h">' +
        '<div class="oc-eyebrow" style="margin-bottom:6px">Ficha<\/div>' +
        '<h2 id="contactos-h" class="oc-section-head__title" style="margin-bottom:14px">Contactos<\/h2>' +
        '<address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress" style="font-style:normal">' +
        contactsInner +
        "<\/address>" +
      "<\/section>" +
      '<section class="oc-card" style="padding:20px 18px 16px" aria-labelledby="horario-h">' +
        '<div class="oc-eyebrow" style="margin-bottom:6px">Esta semana<\/div>' +
        '<h2 id="horario-h" class="oc-section-head__title" style="margin-bottom:14px">Horário<\/h2>' +
        hoursInner +
      "<\/section>" +
      (hasMap
        ? '<section class="oc-card" style="padding:20px 18px" aria-labelledby="mapa-desk-h">' +
            '<div class="oc-eyebrow" style="margin-bottom:6px">' + H((barber.city || "") + (barber.district ? " · " + barber.district : "")) + "<\/div>" +
            '<h2 id="mapa-desk-h" class="oc-section-head__title" style="margin-bottom:14px">Onde fica<\/h2>' +
            mapWrap +
          "<\/section>"
        : "") +
    "<\/div>";

  // ── Owner section wrapper
  function ownerSection() {
    return '<section class="oc-owner-wrap oc-section" style="padding:8px 20px 28px" aria-labelledby="dono-h">' +
      '<h2 id="dono-h" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">És o dono desta barbearia?<\/h2>' +
      ownerBlock() +
    "<\/section>";
  }

  // ── Related
  const relatedSection = sameCity.length
    ? '<section class="oc-section" style="padding:0 20px 28px" aria-labelledby="related-h">' +
        '<div class="oc-section-head" style="align-items:flex-end;margin-bottom:18px">' +
          '<div>' +
            (barber.city ? '<div class="oc-eyebrow" style="margin-bottom:6px">Também em ' + H(barber.city) + "<\/div>" : "") +
            '<h2 id="related-h" class="oc-section-head__title">Outras barbearias por perto<\/h2>' +
          "<\/div>" +
          (city ? '<a href="' + H(prefix + city.url) + '" class="oc-meta" style="display:inline-flex;align-items:center;gap:6px;color:var(--ink)">Ver todas ' + iArrow + "<\/a>" : "") +
        "<\/div>" +
        '<div class="oc-related-grid" style="display:flex;flex-direction:column;gap:14px">' +
          sameCity.map(relatedCard).join("") +
        "<\/div>" +
      "<\/section>"
    : "";

  // ── Footer
  const footerSection =
    '<footer class="oc-footer">' +
      '<div class="oc-footer-inner" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
        '<a href="' + H(prefix) + '" style="font-family:var(--serif);font-size:18px;letter-spacing:-0.01em;text-decoration:none;color:var(--ink)">OndeCortar<sup style="font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--subtext)">.pt<\/sup><\/a>' +
        '<span class="oc-meta">Diretório · PT<\/span>' +
      "<\/div>" +
      '<div class="oc-hr" style="margin:0 0 14px"><\/div>' +
      '<p style="font-size:12px;color:var(--subtext);line-height:1.6;margin-bottom:10px">Ficha pública: ' + H(barber.name) + (barber.city ? ", " + H(barber.city) : "") + (barber.district ? ", " + H(barber.district) : "") + ". " + (ownerSourced ? "Inclui dados enviados pela própria barbearia." : "Dados reunidos a partir de informação pública.") + " Se és o dono e queres atualizar dados, clica em <em>Atualizar perfil<\/em>.<\/p>" +
      '<div class="oc-meta">© 2026 OndeCortar · Barbearias em Portugal<\/div>' +
    "<\/footer>";

  // ── Sticky bar
  const stickyBtns = [
    barber.telefone ? '<a class="oc-sticky-bar__btn oc-sticky-bar__btn--primary" href="' + H(phoneHrefVal) + '">' + iPhone + " Ligar<\/a>" : "",
    mapsUrl         ? '<a class="oc-sticky-bar__btn" href="#mapa">' + iPin + " Mapa<\/a>" : "",
    barber.website  ? '<a class="oc-sticky-bar__btn" href="' + H(barber.website) + '" target="_blank" rel="noopener noreferrer">' + iGlobe + " Site<\/a>" : "",
  ].filter(Boolean);
  const colTemplate = stickyBtns.length === 3 ? "1.4fr 1fr 1fr" : stickyBtns.length === 2 ? "1.4fr 1fr" : "1fr";
  const stickyBar = stickyBtns.length
    ? '<div class="oc-sticky-bar" style="grid-template-columns:' + colTemplate + '">' + stickyBtns.join("") + "<\/div>"
    : "";

  // ── Leaflet
  const leafletHead = Array.isArray(barber.coords)
    ? '\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" crossorigin />' +
      '\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" crossorigin defer><\/script>'
    : "";

  const leafletInit = Array.isArray(barber.coords) ? '<script>(function(){\n  function init(){\n    if(!window.L||!document.getElementById("detailMap"))return;\n    var c=' + JSON.stringify(barber.coords) + ';\n    var m=L.map("detailMap",{scrollWheelZoom:false}).setView(c,15);\n    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Esri, HERE, Garmin, USGS, OpenStreetMap contributors",maxZoom:16}).addTo(m);\n    var gi=L.divIcon({className:"",html:\'<div style="width:32px;height:32px;background:#C8873A;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,.5);border:2px solid #141614"><div style="width:8px;height:8px;border-radius:50%;background:#141614;transform:rotate(45deg)"></div></div>\',iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-36]});\n    L.marker(c,{icon:gi}).addTo(m).bindPopup(' + JSON.stringify(barber.name) + ').openPopup();\n  }\n  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){setTimeout(init,120);}):setTimeout(init,120);\n})();<\/script>' : "";

  // ── Breadcrumb
  const crumbItems =
    '<a href="' + H(prefix) + '">Barbearias<\/a>' +
    (city ? '<span class="oc-crumb__sep">\/<\/span><a href="' + H(prefix + city.url) + '">' + H(city.name) + "<\/a>" : "") +
    '<span class="oc-crumb__sep">\/<\/span><span style="color:var(--ink)">' + H(barber.name) + "<\/span>";

  // ── Full page
  return "<!DOCTYPE html>\n<html lang=\"pt-PT\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta name=\"theme-color\" content=\"#14110D\" />\n  <title>" + H(title) + "<\/title>\n  <meta name=\"description\" content=\"" + H(description) + "\" />\n  <link rel=\"canonical\" href=\"" + H(canonical) + "\" />\n  <meta property=\"og:title\" content=\"" + H(title) + "\" />\n  <meta property=\"og:description\" content=\"" + H(description) + "\" />\n  <meta property=\"og:url\" content=\"" + H(canonical) + "\" />\n  <meta property=\"og:type\" content=\"website\" />\n  " + ogImageTags(DEFAULT_OG_IMAGE) + "\n  <link rel=\"icon\" href=\"" + H(prefix) + "favicon.ico\" type=\"image/x-icon\" />\n  <link rel=\"apple-touch-icon\" href=\"" + H(prefix) + "apple-touch-icon.png\" />\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n  <link href=\"https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap\" rel=\"stylesheet\" />" + leafletHead + "\n  <link rel=\"stylesheet\" href=\"" + H(prefix) + "barbearia-profile.css?v=20261006-mapa\" />\n  <script defer src=\"" + H(prefix) + "oc-analytics.js\"><\/script>\n" + jsonLd + "\n<\/head>\n<body>\n\n  <header class=\"oc-topnav oc-mobile-nav\">\n    <a class=\"oc-topnav__back\" href=\"" + H(prefix) + "\" data-oc-back>" + iArrowL + " Voltar<\/a>\n    <a href=\"" + H(prefix) + "\" class=\"oc-topnav__brand\">OndeCortar<sup>.pt<\/sup><\/a>\n    <a href=\"" + H(canonical) + "\" class=\"oc-topnav__action\" aria-label=\"Partilhar\">" + iShare + "<\/a>\n  <\/header>\n\n  <header class=\"oc-desktop-nav oc-desktop-only\" style=\"display:none\">\n    <div style=\"display:flex;align-items:center;gap:32px\">\n      <a href=\"" + H(prefix) + "\" class=\"oc-topnav__brand\">OndeCortar<sup>.pt<\/sup><\/a>\n      <nav class=\"oc-desktop-nav__links\" aria-label=\"Navegação principal\">\n        <a href=\"" + H(prefix) + "\">Barbearias<\/a>\n        <a href=\"" + H(prefix) + "cidades\/\">Cidades<\/a>\n        <a href=\"" + H(prefix) + "registar.html\">Adicionar barbearia<\/a>\n      <\/nav>\n    <\/div>\n    <div class=\"oc-desktop-nav__actions\">\n      <a href=\"" + H(prefix) + "\" data-oc-back class=\"oc-btn oc-btn--ghost\" style=\"height:38px;padding:0 16px;font-size:13px\">" + iArrowL + " Voltar<\/a>\n      <a href=\"" + H(updateHref) + "\" class=\"oc-btn oc-btn--primary\" style=\"height:38px;padding:0 16px;font-size:13px\">Atualizar perfil " + iArrow + "<\/a>\n    <\/div>\n  <\/header>\n\n  <div class=\"oc-page\">\n    <nav class=\"oc-crumb-wrap oc-section\" style=\"padding:14px 20px 0\" aria-label=\"breadcrumb\">\n      <div class=\"oc-crumb\">" + crumbItems + "<\/div>\n    <\/nav>\n\n    <main>\n      <article itemscope itemtype=\"https://schema.org/HairSalon\">\n" +
    heroSection + "\n" +
    '        <div class="oc-pole-wrap oc-section" style="padding:0 20px 28px"><div class="oc-pole"><\/div><\/div>\n' +
    infoRow + "\n" +
    ownerSection() + "\n" +
    relatedSection + "\n" +
    guidesSection(prefix) + "\n" +
    storeSection(prefix, barber.slug) + "\n" +
    "      <\/article>\n    <\/main>\n\n" +
    footerSection + "\n" +
    "  <\/div>\n\n" +
    stickyBar + "\n\n" +
    leafletInit + "\n" + backScript + "\n\n" +
    '  <script>(function(){var d=document.querySelector(".oc-desktop-nav"),m=document.querySelector(".oc-mobile-nav");function c(){var w=window.innerWidth>=1100;if(d)d.style.display=w?"flex":"none";if(m)m.style.display=w?"flex":"none";}c();window.addEventListener("resize",c);}());<\/script>\n\n<\/body>\n<\/html>';
}

// ── Filtros das páginas de cidade: Aberto agora / Marcação online / Perto de mim.
// Tudo no browser, sem URLs novas nem conteúdo removido do HTML (os cartões continuam todos
// no HTML; os filtros só os escondem). "Aberto agora" usa a hora de Lisboa e o horário
// publicado (mesma lógica do resumo do perfil). GoatCounter conta `filtro-cidade/<filtro>`.
const CITY_FILTERS_MIN = 3;

const CITY_FILTER_ICONS = (() => {
  const svg = (d) => '<svg class="oc-filter-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  return {
    funnel: svg('<path d="M3 5h18l-7 8v6l-4-2v-4z"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    pin: svg('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>')
  };
})();

// Os botões têm de parecer botões e não as etiquetas (.tag) dos cartões: painel com título
// "Filtrar", ícone, moldura âmbar e, ligado, fundo âmbar cheio com ✓.
const CITY_FILTERS_STYLES = `
    [hidden] { display: none !important; }
    .oc-filters {
      display: grid;
      gap: 12px;
      margin: 0 0 22px;
      padding: 16px 18px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.03);
    }
    .oc-filters-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 12px; }
    .oc-filters-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--gold);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .oc-filters-sub { color: var(--muted); font-size: 0.88rem; }
    .oc-filters-row { display: flex; flex-wrap: wrap; gap: 10px; }
    .oc-filter {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 46px;
      padding: 10px 18px 10px 14px;
      border-radius: 12px;
      border: 1.5px solid rgba(200, 135, 58, 0.65);
      background: rgba(200, 135, 58, 0.08);
      color: var(--text);
      font: inherit;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
    }
    .oc-filter-icon { flex: none; color: var(--gold); }
    .oc-filter:hover { background: rgba(200, 135, 58, 0.18); border-color: var(--gold); transform: translateY(-1px); }
    .oc-filter:active { transform: translateY(1px); box-shadow: none; }
    .oc-filter:focus-visible { outline: 3px solid rgba(227, 168, 99, 0.55); outline-offset: 2px; }
    .oc-filter[aria-pressed="true"] {
      background: #C8873A;
      border-color: #C8873A;
      color: #17130D;
    }
    .oc-filter[aria-pressed="true"] .oc-filter-icon { color: #17130D; }
    .oc-filter[aria-pressed="true"]::after { content: "✓"; font-weight: 800; margin-left: 2px; }
    .oc-filter:disabled { opacity: 0.7; cursor: progress; }
    @media (max-width: 520px) {
      .oc-filters { padding: 14px; }
      .oc-filter { flex: 1 1 auto; justify-content: center; }
    }
    .oc-filters-status { margin: 0; font-size: 0.92rem; }
    .oc-filters-status:empty { display: none; }
    .oc-filters-empty {
      display: grid;
      justify-items: start;
      gap: 10px;
      padding: 18px;
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-md);
    }
    .oc-filters-empty p { margin: 0; }
    .tag.is-open {
      background: rgba(31, 77, 58, 0.6);
      border-color: rgba(70, 170, 120, 0.65);
      color: #D5EEDF;
    }
    .tag.is-closed { color: var(--muted); }
`;

const CITY_FILTERS_SCRIPT = `<script>
(function () {
  var box = document.querySelector("[data-oc-filters]");
  var grid = document.querySelector("#lista-barbearias .barber-grid");
  if (!box || !grid) return;
  var cards = [].slice.call(grid.querySelectorAll(".card"));
  var original = cards.slice();
  var state = { open: false, booking: false, near: false };
  var statusEl = box.querySelector(".oc-filters-status");
  var emptyEl = box.querySelector(".oc-filters-empty");
  var btn = {};
  [].forEach.call(box.querySelectorAll("[data-filter]"), function (b) { btn[b.getAttribute("data-filter")] = b; });

  function count(name) {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: "filtro-cidade/" + name, title: "Filtro " + name + " · " + location.pathname, event: true });
    }
  }

  // Hora de Lisboa, como no resumo do perfil
  var day = null, now = "";
  if (window.Intl) {
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Lisbon", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    day = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[p.weekday];
    now = p.hour + ":" + p.minute;
  }

  var hasWeek = false, hasBooking = false, hasCoords = false;
  cards.forEach(function (c) {
    c.ocBooking = c.hasAttribute("data-oc-booking");
    c.ocLat = parseFloat(c.getAttribute("data-oc-lat"));
    c.ocLng = parseFloat(c.getAttribute("data-oc-lng"));
    if (c.ocBooking) hasBooking = true;
    if (!isNaN(c.ocLat) && !isNaN(c.ocLng)) hasCoords = true;
    c.ocOpen = false;
    var raw = c.getAttribute("data-oc-week");
    if (!raw || day === undefined || day === null) return;
    var w;
    try { w = JSON.parse(raw); } catch (e) { return; }
    hasWeek = true;
    (w[day] || []).forEach(function (s) { if (now >= s[0] && now < s[1]) c.ocOpen = true; });
    var tag = c.querySelector("[data-oc-status]");
    if (tag) {
      tag.textContent = c.ocOpen ? "Aberto agora" : "Fechado agora";
      tag.classList.add(c.ocOpen ? "is-open" : "is-closed");
    }
  });

  if (hasWeek && btn.open) btn.open.hidden = false;
  if (hasBooking && btn.booking) btn.booking.hidden = false;
  if (hasCoords && navigator.geolocation && btn.near) btn.near.hidden = false;
  if ((!btn.open || btn.open.hidden) && (!btn.booking || btn.booking.hidden) && (!btn.near || btn.near.hidden)) return;
  box.hidden = false;

  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var hide = (state.open && !c.ocOpen) || (state.booking && !c.ocBooking);
      c.hidden = hide;
      if (!hide) shown++;
    });
    var any = state.open || state.booking || state.near;
    var msg = "";
    if (state.open || state.booking) msg = "A mostrar " + shown + " de " + cards.length + " barbearias";
    if (state.near) msg = (msg ? msg + " · " : "") + "Ordenadas pela distância a ti";
    if (state.open) msg += " · \\"Aberto agora\\" segue o horário publicado; feriados podem variar.";
    statusEl.textContent = any ? msg : "";
    emptyEl.hidden = shown !== 0;
  }

  function toggle(name) {
    state[name] = !state[name];
    btn[name].setAttribute("aria-pressed", state[name] ? "true" : "false");
    if (state[name]) count(name);
    apply();
  }

  function km(a, b, c, d) {
    var r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2);
    var h = x * x + Math.cos(a * r) * Math.cos(c * r) * y * y;
    return 12742 * Math.asin(Math.sqrt(h));
  }
  function fmt(k) {
    if (k < 1) return "a " + Math.max(50, Math.round(k * 20) * 50) + " m";
    return "a " + (k < 10 ? k.toFixed(1).replace(".", ",") : Math.round(k)) + " km";
  }

  function setNear(on, pos) {
    state.near = on;
    btn.near.setAttribute("aria-pressed", on ? "true" : "false");
    var order = original;
    if (on) {
      cards.forEach(function (c) {
        c.ocKm = isNaN(c.ocLat) ? Infinity : km(pos.coords.latitude, pos.coords.longitude, c.ocLat, c.ocLng);
        var t = c.querySelector("[data-oc-distance]");
        if (t && c.ocKm !== Infinity) { t.textContent = fmt(c.ocKm); t.hidden = false; }
      });
      order = cards.slice().sort(function (a, b) { return a.ocKm - b.ocKm; });
    } else {
      cards.forEach(function (c) { var t = c.querySelector("[data-oc-distance]"); if (t) t.hidden = true; });
    }
    order.forEach(function (c) { grid.appendChild(c); });
    apply();
  }

  if (btn.open) btn.open.addEventListener("click", function () { toggle("open"); });
  if (btn.booking) btn.booking.addEventListener("click", function () { toggle("booking"); });
  if (btn.near) btn.near.addEventListener("click", function () {
    if (state.near) { setNear(false); return; }
    var labelEl = btn.near.querySelector("[data-label]") || btn.near;
    var label = labelEl.textContent;
    btn.near.disabled = true;
    labelEl.textContent = "A localizar…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      btn.near.disabled = false;
      labelEl.textContent = label;
      count("near");
      setNear(true, pos);
    }, function () {
      btn.near.disabled = false;
      labelEl.textContent = label;
      statusEl.textContent = "Não foi possível obter a tua localização. Confirma a permissão de localização do browser.";
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  });
  box.querySelector("[data-oc-filters-clear]").addEventListener("click", function () {
    ["open", "booking"].forEach(function (n) { state[n] = false; if (btn[n]) btn[n].setAttribute("aria-pressed", "false"); });
    apply();
  });
})();
</script>`;

function renderCityPage(city) {
  const prefix = "../../";
  const canonical = absoluteUrl(city.url);
  const cityBarbersLabel = barbersLabel(city.name);
  const cityLocative = locativeLabel(city.name);
  const cityHierarchyEntries = buildCityHierarchyEntries(city);
  const cityHierarchyText = renderHierarchyText(cityHierarchyEntries, prefix);
  const title = cityBarbersLabel + " | Onde cortar o cabelo | OndeCortar.pt";
  const description = cityBarbersLabel + " com morada, horário e mapa. Encontra o barbeiro certo, vê como chegar e escolhe onde cortar o cabelo no OndeCortar.pt.";
  // Filtros só a partir de 3 fichas (com 1–2 não há o que filtrar). Ficam escondidos até o
  // JS confirmar que há dados para cada um — sem JS não aparecem botões mortos.
  const withFilters = city.barbearias.length >= CITY_FILTERS_MIN;
  const filtersHtml = withFilters ? `      <div class="oc-filters" data-oc-filters hidden>
        <div class="oc-filters-head">
          <span class="oc-filters-title" id="oc-filters-title">${CITY_FILTER_ICONS.funnel}Filtrar</span>
          <span class="oc-filters-sub">Toca para mostrar só as que te servem</span>
        </div>
        <div class="oc-filters-row" role="group" aria-labelledby="oc-filters-title">
          <button type="button" class="oc-filter" data-filter="open" aria-pressed="false" hidden>${CITY_FILTER_ICONS.clock}<span data-label>Aberto agora</span></button>
          <button type="button" class="oc-filter" data-filter="booking" aria-pressed="false" hidden>${CITY_FILTER_ICONS.calendar}<span data-label>Marcação online</span></button>
          <button type="button" class="oc-filter" data-filter="near" aria-pressed="false" hidden>${CITY_FILTER_ICONS.pin}<span data-label>Perto de mim</span></button>
        </div>
        <p class="oc-filters-status" aria-live="polite"></p>
        <div class="oc-filters-empty" hidden>
          <p>Nenhuma barbearia ${escapeHtml(cityLocative)} corresponde a estes filtros.</p>
          <button type="button" class="btn btn-secondary" data-oc-filters-clear>Limpar filtros</button>
        </div>
      </div>` : "";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "OndeCortar.pt", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Cidades", "item": SITE_URL + "cidades/" },
        { "@type": "ListItem", "position": 3, "name": city.name, "item": canonical }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": cityBarbersLabel,
      "description": description,
      "url": canonical
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": cityBarbersLabel,
      "itemListElement": city.barbearias.map((barber, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": absoluteUrl(barber.profileUrl),
        "name": barber.name
      }))
    }
  ];
  const body = `
${renderHeader(prefix, "cidades")}
<main>
  <section class="section">
    <div class="container hero-card">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="breadcrumbs">
            <a href="${prefix || "./"}">OndeCortar.pt</a>
            <span>/</span>
            <a href="${prefix}cidades/">Cidades</a>
            <span>/</span>
            <span>${escapeHtml(city.name)}</span>
          </div>
          <span class="eyebrow">Página de cidade</span>
          <h1>${escapeHtml(cityBarbersLabel)}</h1>
          <p>${escapeHtml(city.intro)}</p>
          ${cityHierarchyText}
          <div class="hero-actions">
            <a class="btn btn-primary" href="#lista-barbearias">Ver barbearias</a>
            <a class="btn btn-secondary" href="${prefix}registar.html">Adicionar barbearia nesta cidade</a>
          </div>
        </div>
        <aside class="summary-panel">
          ${cityHierarchyEntries.map((entry) => '<div class="summary-row"><span>' + escapeHtml(entry.label) + '</span>' + escapeHtml(entry.value) + '</div>').join("")}
          <div class="summary-row"><span>Total listado</span>${escapeHtml(String(city.barbearias.length))} ficha${city.barbearias.length === 1 ? "" : "s"}</div>
          <div class="summary-row"><span>Última atualização</span>${escapeHtml(formatDate(city.lastmod))}</div>
          <div class="summary-row"><span>Exploração rápida</span><a href="#lista-barbearias">Perfis individuais</a></div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section" id="lista-barbearias">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="eyebrow">Perfis locais</span>
          <h2>${escapeHtml(cityBarbersLabel)}</h2>
          <p>Cada perfil abaixo mostra a morada, o mapa e os contactos que a barbearia tem públicos.</p>
        </div>
      </div>
${filtersHtml ? filtersHtml + "\n" : ""}      <div class="barber-grid">
${city.barbearias.map((barber) => renderBarberCard(barber, prefix, { showZone: true, longCopy: false, filterData: withFilters })).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid-2">
      <article class="card">
        <span class="eyebrow">Escolher melhor</span>
        <h2>Como escolher uma barbearia ${escapeHtml(cityLocative)}</h2>
        <ul class="list-clean">
          ${city.guide.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}
        </ul>
      </article>
      <aside class="stack">
        <article class="card">
          <span class="eyebrow">Loja e revista</span>
          <h3>Depois da pesquisa, o que podes ver a seguir</h3>
          <p>Depois de encontrares uma barbearia nesta cidade, também podes abrir a loja ou a revista para comparar produtos e rotinas em casa.</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${prefix}loja/${escapeHtml(city.storeCategory)}/">Ver categoria da loja</a>
            <a class="btn btn-secondary" href="${prefix}revista/${escapeHtml(city.magazineArticle)}/">${escapeHtml(city.magazineArticleLabel || "Ler artigo relacionado")}</a>
          </div>
        </article>
        <article class="card">
            <h3>És dono de uma barbearia ${escapeHtml(cityLocative)}?</h3>
          <p>Se a tua barbearia já está nesta lista, completa a ficha com horário, preços e WhatsApp. Se ainda não está, adiciona-a — é gratuito.</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${prefix}registar.html">Adicionar ou atualizar</a>
            <a class="btn btn-soft" href="${prefix}faq.html">Ver FAQ</a>
          </div>
        </article>
      </aside>
    </div>
  </section>
</main>
${renderFooter(prefix)}${withFilters ? "\n" + CITY_FILTERS_SCRIPT : ""}`;

  return renderDocument({
    title: title,
    description: description,
    canonical: canonical,
    prefix: prefix,
    structuredData: structuredData,
    extraStyles: withFilters ? CITY_FILTERS_STYLES : "",
    body: body
  });
}

function renderCitiesHub(cities) {
  const prefix = "../";
  const canonical = SITE_URL + "cidades/";
  const body = `
${renderHeader(prefix, "cidades")}
<main>
  <section class="section">
    <div class="container hero-card">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="breadcrumbs">
            <a href="${prefix || "./"}">OndeCortar.pt</a>
            <span>/</span>
            <span>Cidades</span>
          </div>
          <span class="eyebrow">Diretório local</span>
          <h1>Barbearias por cidade</h1>
          <p>Explora as páginas locais do OndeCortar.pt para encontrar barbearias por cidade, comparar perfis individuais e avançar para a ficha certa com morada, contactos, mapa e links úteis.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#lista-cidades">Ver cidades</a>
            <a class="btn btn-secondary" href="${prefix || "./"}#explorar">Voltar ao diretório</a>
          </div>
        </div>
        <aside class="summary-panel">
          <div class="summary-row"><span>Cidades com página própria</span>${escapeHtml(String(cities.length))}</div>
          <div class="summary-row"><span>Objetivo</span>Encontrar mais rápido a página local certa</div>
          <div class="summary-row"><span>Explora por</span>Cidade, perfil individual e links úteis</div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section" id="lista-cidades">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="eyebrow">Cidades</span>
          <h2>Páginas locais disponíveis</h2>
          <p>Cada página de cidade reúne perfis individuais, texto útil, orientação prática e links para a loja e para a revista.</p>
        </div>
      </div>
      <div class="city-grid">
        ${cities.map((city) => `
          <article class="card">
            <span class="pill">${escapeHtml(String(city.barbearias.length))} barbearia${city.barbearias.length === 1 ? "" : "s"}</span>
            <h3><a href="${prefix + city.url}">${escapeHtml(barbersLabel(city.name))}</a></h3>
            <p>${escapeHtml(city.intro)}</p>
            <div class="card-actions">
              <a class="btn btn-secondary" href="${prefix + city.url}">Ver página da cidade</a>
            </div>
          </article>`).join("")}
      </div>
    </div>
  </section>
</main>
${renderFooter(prefix)}`;

  return renderDocument({
    title: "Barbearias por cidade | OndeCortar.pt",
    description: "Explora páginas locais com barbearias por cidade, perfis individuais, moradas, contactos e ligações úteis no OndeCortar.pt.",
    canonical: canonical,
    prefix: prefix,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "OndeCortar.pt", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Cidades", "item": canonical }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Barbearias por cidade",
        "description": "Explora páginas locais com barbearias por cidade, perfis individuais, moradas, contactos e ligações úteis no OndeCortar.pt.",
        "url": canonical
      }
    ],
    body: body
  });
}

// Páginas de cidade que deixaram de existir e o Google ainda pede (404 no Search Console
// a 2026-10-16): redirecionam para a cidade certa. O build mantém-nas em cidades/.
const CITY_REDIRECTS = {
  "carapecos": "barcelos",
  "arganil-arganil": "arganil"
};

// Perfis escondidos que o Google ainda conhece: em vez de 404, levam à página da cidade
// (noindex + canonical). 2026-10-18: fichas antigas "por_validar" que não existem no Google Maps.
const PROFILE_REDIRECTS = {
  "barbearia-beja-moderna": "beja",
  "barbearia-braganca-classic": "braganca",
  "cut-by-andre-silva": "lisboa",
  "barbearia-alcacer-do-sal": "alcacer-do-sal",
  "barbearia-grandola-classica": "grandola",
  "barbearia-montijo-urbana": "montijo",
  "barbearia-santiago-do-cacem": "santiago-do-cacem",
  "barbearia-classica-setubal": "setubal",
  "barbearia-sines-moderna": "sines",
  "barbearia-chaves": "chaves",
  "douro-barber-shop": "peso-da-regua",
  "barbearia-barreiro-elite": "barreiro"
};

function buildCityRedirect(target) {
  const url = SITE_URL + "cidades/" + target + "/";
  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirecionar | OndeCortar.pt</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="${url}" />
  <meta http-equiv="refresh" content="0; url=${url}" />
  <script>
    window.location.replace("${url}");
  </script>
</head>
<body>
  <p>Esta página mudou para <a href="${url}">${url}</a>.</p>
</body>
</html>
`;
}

function buildLegacyBarberRedirect() {
  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirecionar perfil | OndeCortar.pt</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="${SITE_URL}" />
  <script>
    (function() {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get("slug");
      if (!slug) return;
      var target = "${SITE_URL}barbearias/" + encodeURIComponent(slug) + "/";
      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", target);
      window.location.replace(target);
    })();
  </script>
</head>
<body>
  <p>Este perfil mudou para uma URL limpa e indexável. <a id="perfil-fallback" href="${SITE_URL}cidades/">Ver páginas locais</a>.</p>
  <script>
    (function() {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get("slug");
      if (!slug) return;
      var target = "${SITE_URL}barbearias/" + encodeURIComponent(slug) + "/";
      var link = document.getElementById("perfil-fallback");
      if (link) {
        link.href = target;
        link.textContent = target;
      }
    })();
  </script>
</body>
</html>
`;
}

function buildSitemap(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];
  entries.forEach((entry) => {
    lines.push("  <url>");
    lines.push("    <loc>" + escapeHtml(entry.loc) + "</loc>");
    lines.push("    <lastmod>" + escapeHtml(entry.lastmod || TODAY) + "</lastmod>");
    lines.push("  </url>");
  });
  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}

// lastmod exato das páginas estáticas (FAQ, Registar, Sobre, Privacidade): a Google só usa o
// <lastmod> se for consistentemente exato. Guarda-se um hash do conteúdo de cada ficheiro em
// Barbeiros/paginas-lastmod.json e a data só muda quando o conteúdo muda. Na primeira vez, a data
// vem do último commit do ficheiro (ou de hoje, sem git). O JSON vai para o git com o build.
const STATIC_LASTMOD_FILE = path.join(ROOT, "Barbeiros", "paginas-lastmod.json");
function staticPageLastmod(relFile) {
  const crypto = require("crypto");
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(STATIC_LASTMOD_FILE, "utf8")); } catch (e) { cache = {}; }
  const content = fs.readFileSync(path.join(ROOT, relFile), "utf8").replace(/\r\n/g, "\n");
  const hash = crypto.createHash("sha1").update(content).digest("hex");
  const prev = cache[relFile];
  if (prev && prev.hash === hash) return prev.lastmod;
  let lastmod = TODAY;
  if (!prev) {
    try {
      const out = require("child_process").execSync('git log -1 --format=%cs -- "' + relFile + '"', { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(out)) lastmod = out;
    } catch (e) { /* sem git: fica a data de hoje */ }
  }
  cache[relFile] = { hash, lastmod };
  const sorted = Object.fromEntries(Object.keys(cache).sort().map((k) => [k, cache[k]]));
  fs.writeFileSync(STATIC_LASTMOD_FILE, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  return lastmod;
}

// Data mais recente dentro de um sitemap filho (para o índice sitemap.xml)
function latestLastmodInSitemap(relFile) {
  try {
    const dates = (fs.readFileSync(path.join(ROOT, relFile), "utf8").match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g) || [])
      .map((m) => m.slice(9, 19)).sort();
    return dates.length ? dates[dates.length - 1] : TODAY;
  } catch (e) { return TODAY; }
}

function buildSitemapIndex(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];
  entries.forEach((entry) => {
    lines.push("  <sitemap>");
    lines.push("    <loc>" + escapeHtml(entry.loc) + "</loc>");
    lines.push("    <lastmod>" + escapeHtml(entry.lastmod || TODAY) + "</lastmod>");
    lines.push("  </sitemap>");
  });
  lines.push("</sitemapindex>");
  return lines.join("\n") + "\n";
}

function syncGeneratedSubdirectories(relativeDir, desiredSlugs) {
  const targetDir = path.join(ROOT, relativeDir);
  const keep = new Set(desiredSlugs || []);

  if (!fs.existsSync(targetDir)) {
    return;
  }

  fs.readdirSync(targetDir, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) {
      return;
    }

    if (keep.has(entry.name)) {
      return;
    }

    fs.rmSync(path.join(targetDir, entry.name), { recursive: true, force: true });
  });
}

// Os estilos da lista estática vivem em index.html (.ssr-list*): repetidos inline em
// cada <li> pesavam ~150 KB na homepage.
// Sem JSON-LD por item (removido em 2026-10-01, ~157 KB): o schema de cada barbearia é o
// HairSalon do próprio perfil; a homepage só declara o ItemList no <head>.
function buildHomepageStaticList(barbers) {
  const items = barbers.map((barber) => {
    const name = escapeHtml(barber.name);
    const profileUrl = barber.profileUrl;
    const city = barber.city || "";
    const morada = trimText(barber.morada);

    const cityLine   = city   ? `\n      <p>${escapeHtml(city)}</p>` : "";
    const moradaLine = morada ? `\n      <p>${escapeHtml(morada)}</p>` : "";

    return `    <li>
      <h4><a href="${escapeHtml(profileUrl)}">${name}</a></h4>${cityLine}${moradaLine}
    </li>`;
  });

  return `  <ul class="ssr-list" aria-label="Lista de barbearias em Portugal">\n`
    + items.join("\n") + "\n  </ul>";
}

function buildHomepageItemListJsonLd(barbers) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Barbearias em Portugal",
    "url": SITE_URL,
    "numberOfItems": barbers.length,
    "itemListElement": barbers.map((barber, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": barber.name,
      "url": absoluteUrl(barber.profileUrl)
    }))
  };
  return '<script type="application/ld+json">' + JSON.stringify(schema) + "<\/script>";
}

function patchIndexHtml(staticListHtml, headJsonLd, totals) {
  const indexPath = path.join(ROOT, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  const listRe   = /<!-- STATIC-LIST-START -->[\s\S]*?<!-- STATIC-LIST-END -->/;
  const jsonLdRe = /<!-- JSON-LD-BARBEARIAS-START -->[\s\S]*?<!-- JSON-LD-BARBEARIAS-END -->/;

  if (!listRe.test(html)) {
    throw new Error("Marker <!-- STATIC-LIST-START --> não encontrado em index.html");
  }
  if (!jsonLdRe.test(html)) {
    throw new Error("Marker <!-- JSON-LD-BARBEARIAS-START --> não encontrado em index.html");
  }

  html = html.replace(listRe,
    "<!-- STATIC-LIST-START -->\n" + staticListHtml + "\n  <!-- STATIC-LIST-END -->");
  html = html.replace(jsonLdRe,
    "<!-- JSON-LD-BARBEARIAS-START -->\n  " + headJsonLd + "\n  <!-- JSON-LD-BARBEARIAS-END -->");

  // Mantém os totais do HTML estático (SSR) alinhados com os dados reais.
  html = html.replace(/(<(?:span|strong)[^>]*data-barbearias-total[^>]*>)[^<]*(<\/(?:span|strong)>)/g,
    "$1" + totals.barbers + "$2");
  html = html.replace(/(<(?:span|strong)[^>]*data-cidades-total[^>]*>)[^<]*(<\/(?:span|strong)>)/g,
    "$1" + totals.cities + "$2");

  fs.writeFileSync(indexPath, html, "utf8");
}

// Campos que o código do browser (script.js, barbearias-utils.js, script inline do
// index.html) nunca lê — ficam só em barbearias.limpo.js.
const CLIENT_OMIT_FIELDS = new Set([
  "complemento", "country", "data_confidence", "needs_review", "location_flags",
  "fontes", "ultima_validacao", "qualidade_ficha", "valor_original", "horario_fonte", "precos", "whatsapp"
]);

// Gera Barbeiros/barbearias.mapa.js para a homepage: só barbearias públicas, sem os
// campos acima e sem valores vazios (o cliente trata null e ausente da mesma forma).
// Define o mesmo `const barbearias` que o ficheiro fonte.
function buildClientDataFile(rawBarbers) {
  const isEmpty = (value) => value === null || value === undefined || value === ""
    || (Array.isArray(value) && value.length === 0);
  const slim = rawBarbers.map((barber) => {
    const out = {};
    Object.keys(barber).forEach((key) => {
      if (!CLIENT_OMIT_FIELDS.has(key) && !isEmpty(barber[key])) {
        out[key] = barber[key];
      }
    });
    return out;
  });
  return "// Gerado por scripts/build-directory-static.js a partir de barbearias.limpo.js — não editar.\n"
    + "const barbearias = " + JSON.stringify(slim) + ";\n";
}

// llms.txt (https://llmstxt.org): resumo em Markdown para assistentes de IA (ChatGPT, Claude,
// Perplexity…) perceberem o site e citarem as páginas certas. Gerado aqui para os números e a
// lista de cidades acompanharem os dados.
function buildLlmsTxt(data) {
  const cities = data.cities.slice().sort((a, b) =>
    b.barbearias.length - a.barbearias.length || a.name.localeCompare(b.name, "pt"));
  const plural = (n) => n + (n === 1 ? " barbearia" : " barbearias");
  return [
    "# OndeCortar.pt",
    "",
    "> Diretório independente de barbearias em Portugal (continente, Madeira e Açores): " + data.barbers.length +
      " barbearias em " + data.cities.length + " cidades e localidades, com morada, contactos públicos, horário quando conhecido" +
      " e localização no mapa. Gratuito para quem pesquisa e para as barbearias. Inclui também uma revista de guias de barba" +
      " e cabelo e uma loja de recomendações de produtos (links afiliados da Amazon.es, assinalados).",
    "",
    "Notas para quem cita este site:",
    "",
    "- Cada barbearia tem uma página própria em https://ondecortar.pt/barbearias/{slug}/ com dados estruturados schema.org HairSalon.",
    "- Os dados vêm de informação pública (site, redes sociais e páginas de marcação da própria barbearia, Google Maps, OpenStreetMap) e são revistos manualmente;" +
      " cada perfil mostra a data da última validação e, quando o horário vem de fonte externa (Fresha, Booksy, Google Maps ou OpenStreetMap), qual e quando foi consultada. Horários e preços devem ser confirmados com a barbearia.",
    "- O OndeCortar.pt não mostra avaliações nem estrelas e não faz rankings pagos.",
    "- Dados atualizados a " + data.siteLastmod + ".",
    "",
    "## Diretório",
    "",
    "- [Mapa e pesquisa de barbearias](" + SITE_URL + "): pesquisa por cidade, nome ou morada, com filtros por região",
    "- [Todas as cidades](" + SITE_URL + "cidades/): índice das páginas por cidade",
    "- [Adicionar ou corrigir uma barbearia](" + SITE_URL + "registar.html): formulário gratuito para donos de barbearias",
    "",
    "## Barbearias por cidade",
    "",
    ...cities.map((city) => "- [Barbearias " + locativeLabel(city.name) + "](" + absoluteUrl(city.url) + "): " + plural(city.barbearias.length)),
    "",
    "## Sobre o projeto",
    "",
    "- [Sobre o OndeCortar.pt](" + SITE_URL + "sobre/): critérios editoriais e transparência de afiliados",
    "- [Perguntas frequentes](" + SITE_URL + "faq.html)",
    "- [Como escolhemos os produtos](" + SITE_URL + "loja/como-escolhemos/)",
    "",
    "## Optional",
    "",
    "- [Revista](" + SITE_URL + "revista/): guias práticos sobre barba, cortes, máquinas e cultura de barbearia",
    "- [Loja](" + SITE_URL + "loja/): seleção de produtos de barbearia com links afiliados para a Amazon.es",
    ""
  ].join("\n");
}

function main() {
  const rawBarbers = loadBarbers();
  writeFile(path.join("Barbeiros", "barbearias.mapa.js"), buildClientDataFile(rawBarbers));
  const data = buildSlugData(rawBarbers);
  const citiesMap = new Map(data.cities.map((city) => [city.slug, city]));

  const liveSlugs = new Set(data.barbers.map((barber) => barber.slug));
  const profileRedirects = Object.entries(PROFILE_REDIRECTS)
    .filter(([from, to]) => !liveSlugs.has(from) && citiesMap.has(to));
  syncGeneratedSubdirectories("barbearias", [...liveSlugs].concat(profileRedirects.map(([from]) => from)));
  profileRedirects.forEach(([from, to]) => {
    writeFile(path.join("barbearias", from, "index.html"), buildCityRedirect(to));
  });
  const cityRedirects = Object.entries(CITY_REDIRECTS)
    .filter(([from, to]) => !citiesMap.has(from) && citiesMap.has(to));
  syncGeneratedSubdirectories("cidades", data.cities.map((city) => city.slug).concat(cityRedirects.map(([from]) => from)));

  data.barbers.forEach((barber) => {
    writeFile(path.join("barbearias", barber.slug, "index.html"), renderProfilePage(barber, citiesMap));
  });

  data.cities.forEach((city) => {
    writeFile(path.join("cidades", city.slug, "index.html"), renderCityPage(city));
  });

  cityRedirects.forEach(([from, to]) => {
    writeFile(path.join("cidades", from, "index.html"), buildCityRedirect(to));
  });

  writeFile(path.join("cidades", "index.html"), renderCitiesHub(data.cities));
  writeFile("barbearia.html", buildLegacyBarberRedirect());

  writeFile("sitemap-pages.xml", buildSitemap([
    { loc: SITE_URL, lastmod: data.siteLastmod },
    { loc: SITE_URL + "cidades/", lastmod: data.siteLastmod },
    { loc: SITE_URL + "faq.html", lastmod: staticPageLastmod("faq.html") },
    { loc: SITE_URL + "registar.html", lastmod: staticPageLastmod("registar.html") },
    { loc: SITE_URL + "sobre/", lastmod: staticPageLastmod("sobre/index.html") },
    { loc: SITE_URL + "privacidade.html", lastmod: staticPageLastmod("privacidade.html") }
  ]));

  writeFile("sitemap-cidades.xml", buildSitemap(data.cities.map((city) => ({
    loc: absoluteUrl(city.url),
    lastmod: city.lastmod
  }))));

  writeFile("sitemap-barbearias.xml", buildSitemap(data.barbers.map((barber) => ({
    loc: absoluteUrl(barber.profileUrl),
    lastmod: barber.lastmod
  }))));

  writeFile("sitemap.xml", buildSitemapIndex([
    { loc: SITE_URL + "sitemap-pages.xml", lastmod: latestLastmodInSitemap("sitemap-pages.xml") },
    { loc: SITE_URL + "sitemap-barbearias.xml", lastmod: latestLastmodInSitemap("sitemap-barbearias.xml") },
    { loc: SITE_URL + "sitemap-cidades.xml", lastmod: latestLastmodInSitemap("sitemap-cidades.xml") },
    { loc: SITE_URL + "sitemap-loja.xml", lastmod: latestLastmodInSitemap("sitemap-loja.xml") },
    { loc: SITE_URL + "sitemap-revista.xml", lastmod: latestLastmodInSitemap("sitemap-revista.xml") }
  ]));

  writeFile("llms.txt", buildLlmsTxt(data));

  patchIndexHtml(
    buildHomepageStaticList(data.barbers),
    buildHomepageItemListJsonLd(data.barbers),
    {
      barbers: data.barbers.length,
      cities: data.cities.length
    }
  );

  console.log(JSON.stringify({
    generatedBarbers: data.barbers.length,
    generatedCities: data.cities.length,
    sitemaps: 5,
    homepageStaticList: data.barbers.length
  }, null, 2));
}

main();
