const fs = require("fs");
const path = require("path");
const vm = require("vm");
const utils = require("../Barbeiros/barbearias-utils.js");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://ondecortar.pt/";
const TODAY = "2026-04-07";
const DEFAULT_OG_IMAGE = SITE_URL + "imagens/banner.jpg";

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

function normalizar(value) {
  return utils.normalizarTexto(value);
}

function slugify(value) {
  return utils.slugify(value);
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

  return "Portugal";
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
  if (lower.includes("google.com/maps") || lower.includes("goo.gl/maps") || lower.includes("maps.app.goo.gl")) {
    return { kind: "google", href: value };
  }
  return { kind: "website", href: value };
}

function normalizeLinks(item) {
  const result = { website: "", instagram: "", facebook: "", booking: "", google: "" };
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
  if (barber.google) {
    return barber.google;
  }
  if (Array.isArray(barber.coords)) {
    return "https://www.google.com/maps/search/?api=1&query=" + barber.coords[0] + "," + barber.coords[1];
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
  const intro = barber.zone && barber.zone !== barber.city
    ? barber.name + " fica na zona de " + barber.zone + ", em " + barber.city + "."
    : barber.name + " está listado em " + barber.city + ".";
  const addressSentence = barber.morada
    ? "A ficha pública mostra a morada em " + barber.morada + "."
    : "A ficha pública ainda não mostra uma morada completa.";
  const channels = [];
  if (barber.telefone) channels.push("telefone");
  if (barber.booking) channels.push("ligação de marcação");
  if (barber.website) channels.push("website");
  if (barber.instagram) channels.push("Instagram");
  if (barber.facebook) channels.push("Facebook");
  if (barber.email) channels.push("email");
  const contactSentence = channels.length
    ? "Nesta página podes confirmar " + joinNatural(channels) + " para escolher o contacto mais direto."
    : "Nesta página podes pelo menos comparar localização e contexto antes de decidir.";
  const horarioSentence = barber.horario
    ? "O horário atualmente indicado é " + barber.horario + "."
    : "O horário ainda não foi indicado publicamente nesta ficha.";
  const updatedSentence = "Informação atualizada em " + formatDate(barber.lastmod) + ".";
  return [intro, addressSentence, contactSentence, horarioSentence, updatedSentence].join(" ");
}

function buildCardSummary(barber) {
  const bits = [];
  if (barber.zone && barber.zone !== barber.city) bits.push(barber.zone);
  if (barber.telefone) bits.push("telefone disponível");
  else if (barber.booking) bits.push("marcação online");
  else if (barber.website || barber.instagram || barber.facebook) bits.push("links úteis");
  if (barber.horario) bits.push("horário indicado");
  return bits.length
    ? "Ficha em " + joinNatural(bits) + "."
    : "Consulta a morada e a localização desta barbearia.";
}

function buildCityIntro(cityName, cityBarbers) {
  const withPhone = cityBarbers.filter((barber) => barber.telefone).length;
  const withBooking = cityBarbers.filter((barber) => barber.booking).length;
  const withSocial = cityBarbers.filter((barber) => barber.instagram || barber.facebook || barber.website).length;
  return [
    "Esta página reúne " + cityBarbers.length + " barbearias em " + cityName + " já listadas no OndeCortar.pt.",
    "Podes comparar moradas, telefones, mapa e links úteis antes de escolher, com " + withPhone + " fichas a mostrar telefone e " + withSocial + " a mostrar presença online.",
    withBooking
      ? "Algumas opções também já apresentam marcação online, o que ajuda a decidir com mais rapidez quando queres tratar de corte, barba ou manutenção regular."
      : "Mesmo quando a marcação online ainda não aparece, a listagem ajuda a perceber rapidamente que espaços têm informação suficiente para contactar e comparar."
  ].join(" ");
}

function buildCityGuide(cityName) {
  return [
    "Em " + cityName + ", vale a pena começar pela morada e pela zona para perceber se a barbearia encaixa no teu percurso habitual.",
    "Quando existem telefone, website ou Instagram, confirma primeiro disponibilidade, estilo de serviço e se aceitam marcação online.",
    "Se estiveres entre várias opções, compara a clareza dos dados públicos: fichas com morada completa, contactos e informação atualizada tendem a facilitar a decisão."
  ];
}

function pickStoreCategorySlug(cityBarbers) {
  if (cityBarbers.some((barber) => barber.booking)) {
    return "kits-de-barba";
  }
  if (cityBarbers.some((barber) => barber.telefone)) {
    return "maquinas-de-cortar";
  }
  return "cremes-e-espumas";
}

function buildSlugData(rawBarbers) {
  const barbers = rawBarbers.map((item, index) => {
    const inferred = utils.inferirLocalizacaoAdministrativa(item.morada || "");
    const fallbackCity = inferirCidadeFallback(item.morada || "");
    const city = item.concelho || inferred.concelho || fallbackCity || "Portugal";
    const links = normalizeLinks(item);
    const normalizedPhone = utils.normalizarTelefone(item.telefone || "");
    const phone = normalizedPhone.telefone ? formatarTelefoneVisual(normalizedPhone.telefone) : "";
    const slug = item.slug || slugify((item.nome || "barbearia") + "-" + city + "-" + (index + 1));
    const citySlug = city && city !== "Portugal" ? slugify(city) : "";
    const zone = inferirZona(item, city);
    const barber = {
      id: index + 1,
      slug: slug,
      name: item.nome || "Barbearia",
      city: city,
      citySlug: citySlug,
      cityUrl: citySlug ? "cidades/" + citySlug + "/" : "",
      profileUrl: "barbearias/" + slug + "/",
      morada: item.morada || "",
      codigoPostal: item.codigo_postal || utils.extrairCodigoPostal(item.morada || ""),
      telefone: phone,
      email: utils.validarEmail(item.email || ""),
      website: links.website,
      booking: links.booking,
      instagram: links.instagram,
      facebook: links.facebook,
      google: links.google,
      horario: String(item.horario || "").trim(),
      observacoes: String(item.observacoes || "").trim(),
      coords: utils.normalizarCoords(item.coords),
      zone: zone,
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
    city.lastmod = city.barbearias.reduce((latest, barber) => barber.lastmod > latest ? barber.lastmod : latest, TODAY);
    city.intro = buildCityIntro(city.name, city.barbearias);
    city.guide = buildCityGuide(city.name);
    city.storeCategory = pickStoreCategorySlug(city.barbearias);
    city.magazineArticle = "como-montar-uma-rotina-simples-de-barba-em-casa";
  });

  return {
    barbers: barbers,
    cities: Array.from(cities.values()).sort((a, b) => b.barbearias.length - a.barbearias.length || a.name.localeCompare(b.name, "pt"))
  };
}

function renderBaseStyles(extraStyles) {
  return `
  <style>
    :root {
      --bg: #f7f7f4;
      --surface: rgba(255, 255, 255, 0.86);
      --surface-soft: #f1f1eb;
      --text: #1e1f1c;
      --muted: #61655e;
      --border: #e3e5de;
      --accent: #516255;
      --accent-strong: #39463c;
      --gold: #b08a4a;
      --shadow: 0 24px 60px rgba(44, 55, 44, 0.08);
      --shadow-soft: 0 16px 36px rgba(44, 55, 44, 0.06);
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
        radial-gradient(circle at top left, rgba(198, 167, 106, 0.14), transparent 30%),
        radial-gradient(circle at top right, rgba(81, 98, 85, 0.12), transparent 26%),
        linear-gradient(180deg, #fafaf7 0%, var(--bg) 32%, #f3f3ee 100%);
    }

    a { color: inherit; text-decoration: none; }
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
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: 999px;
      background: rgba(250, 250, 247, 0.84);
      box-shadow: 0 18px 40px rgba(44, 55, 44, 0.08);
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
      background: rgba(255, 255, 255, 0.82);
      box-shadow: var(--shadow-soft);
    }
    .brand-text { display: grid; gap: 3px; }
    .brand-text strong { font-size: 1rem; }
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
      color: var(--muted);
      font-weight: 600;
    }
    .nav-links a:hover, .nav-links a.is-current {
      background: rgba(198, 167, 106, 0.12);
      color: var(--text);
    }
    .nav-cta {
      color: #fff !important;
      background: linear-gradient(135deg, var(--accent), var(--accent-strong));
      box-shadow: 0 14px 32px rgba(81, 98, 85, 0.22);
    }

    main { padding: 30px 0 48px; }
    h1, h2, h3 { margin: 0; color: var(--text); line-height: 1.08; }
    h1, h2 {
      font-family: "Playfair Display", Georgia, serif;
      font-weight: 700;
      letter-spacing: -0.02em;
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
      border: 1px solid rgba(81, 98, 85, 0.14);
      background: rgba(81, 98, 85, 0.1);
      color: var(--accent-strong);
      font-size: 0.84rem;
      font-weight: 700;
    }
    .tag, .pill {
      background: var(--surface-soft);
      border-color: var(--border);
      color: var(--text);
    }
    .pill-link:hover {
      border-color: rgba(176, 138, 74, 0.44);
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
      padding: 30px;
      display: grid;
      gap: 22px;
      background:
        radial-gradient(circle at top left, rgba(198, 167, 106, 0.14), transparent 30%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 247, 242, 0.94));
    }
    .hero-grid, .grid-2 {
      display: grid;
      grid-template-columns: minmax(0, 1.06fr) minmax(280px, 0.94fr);
      gap: 22px;
      align-items: start;
    }
    .hero-copy, .stack { display: grid; gap: 16px; }
    .hero-actions, .tag-row, .card-actions, .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .summary-panel {
      padding: 22px;
      border-radius: 20px;
      background: rgba(81, 98, 85, 0.08);
      border: 1px solid rgba(81, 98, 85, 0.12);
      display: grid;
      gap: 14px;
    }
    .summary-row {
      padding: 14px 16px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.52);
      border: 1px solid rgba(255, 255, 255, 0.68);
    }
    .summary-row span {
      display: block;
      margin-bottom: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--muted);
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
      color: #fff;
      background: linear-gradient(135deg, var(--accent), var(--accent-strong));
      box-shadow: 0 16px 36px rgba(81, 98, 85, 0.18);
    }
    .btn-secondary {
      color: var(--text);
      background: rgba(255, 255, 255, 0.9);
      border-color: var(--border);
    }
    .btn-soft {
      color: var(--accent-strong);
      background: rgba(81, 98, 85, 0.08);
      border-color: rgba(81, 98, 85, 0.12);
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
      padding: 24px;
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
      border-bottom: 1px solid rgba(227, 229, 222, 0.9);
    }
    .meta-row:last-child { padding-bottom: 0; border-bottom: 0; }
    .meta-row strong { font-size: 0.9rem; color: var(--text); }
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
    .footer-links a { color: var(--muted); font-weight: 600; }

    @media (max-width: 980px) {
      .hero-grid, .grid-2, .barber-grid, .city-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .nav { flex-direction: column; align-items: stretch; border-radius: 28px; }
      .brand { justify-content: center; }
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
      <nav class="nav" aria-label="Navegação principal">
        <a class="brand" href="${prefix}index.html">
          <img src="${prefix}imagens/logo-ondecortar-round.png" alt="Logo OndeCortar.pt" />
          <span class="brand-text">
            <strong>OndeCortar.pt</strong>
            <span>Barbearias em Portugal</span>
          </span>
        </a>
        <div class="nav-links">
          <a href="${prefix}index.html#explorar">Explorar</a>
          <a class="${currentSection === "cidades" ? "is-current" : ""}" href="${prefix}cidades/">Cidades</a>
          <a href="${prefix}registar.html">Adicionar barbearia</a>
          <a class="${currentSection === "loja" ? "is-current" : ""}" href="${prefix}loja/">Loja</a>
          <a class="${currentSection === "revista" ? "is-current" : ""}" href="${prefix}revista/">Revista</a>
          <a href="${prefix}faq.html">FAQ</a>
          <a class="nav-cta" href="${prefix}index.html#mapa">Voltar ao mapa</a>
        </div>
      </nav>
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
          <strong>OndeCortar.pt</strong>
        </div>
        <p>Diretório de barbearias em Portugal com páginas de cidade, perfis individuais, loja e revista ligados entre si.</p>
      </div>
      <div class="footer-links">
        <a href="${prefix}index.html">Homepage</a>
        <a href="${prefix}cidades/">Cidades</a>
        <a href="${prefix}loja/">Loja</a>
        <a href="${prefix}revista/">Revista</a>
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
  <meta property="og:image" content="${escapeHtml(options.ogImage || DEFAULT_OG_IMAGE)}" />
  <link rel="icon" href="${escapeHtml(options.prefix || "")}favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="${escapeHtml(options.prefix || "")}apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  ${options.extraHead || ""}
  ${renderBaseStyles(options.extraStyles)}
${structuredData ? "\n" + structuredData : ""}
</head>
<body>
${options.body || ""}
</body>
</html>
`;
}

function renderBarberCard(barber, prefix, options) {
  const cityLink = barber.cityUrl ? prefix + barber.cityUrl : prefix + "cidades/";
  const primaryLink = barber.primaryLink
    ? '<a class="btn btn-primary" href="' + escapeHtml(barber.primaryLink.href) + '"' + (barber.primaryLink.external ? ' target="_blank" rel="nofollow noopener noreferrer"' : "") + ">" + escapeHtml(barber.primaryLink.label) + "</a>"
    : "";
  return `
  <article class="card">
    <div class="tag-row">
      <a class="pill pill-link" href="${escapeHtml(cityLink)}">${escapeHtml(barber.city)}</a>
      ${options && options.showZone && barber.zone ? '<span class="tag">' + escapeHtml(barber.zone) + "</span>" : ""}
    </div>
    <h3><a href="${escapeHtml(prefix + barber.profileUrl)}">${escapeHtml(barber.name)}</a></h3>
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
  const sameCity = city ? city.barbearias.filter((item) => item.slug !== barber.slug).slice(0, 3) : [];
  const canonical = absoluteUrl(barber.profileUrl);
  const title = barber.name + " em " + barber.city + " | Contactos, morada e mapa | OndeCortar.pt";
  const description = "Vê morada, telefone, mapa, horário e links úteis de " + barber.name + " em " + barber.city + ".";
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
      "@type": "LocalBusiness",
      "name": barber.name,
      "url": canonical,
      "telephone": barber.telefone ? String(barber.telefone).replace(/\s+/g, " ") : undefined,
      "address": barber.morada ? {
        "@type": "PostalAddress",
        "streetAddress": barber.morada,
        "postalCode": barber.codigoPostal || undefined,
        "addressLocality": barber.city,
        "addressCountry": "PT"
      } : undefined,
      "openingHours": barber.horario || undefined,
      "sameAs": barber.sameAs.length ? barber.sameAs : undefined,
      "geo": Array.isArray(barber.coords) ? {
        "@type": "GeoCoordinates",
        "latitude": barber.coords[0],
        "longitude": barber.coords[1]
      } : undefined
    }
  ];
  const mapHead = Array.isArray(barber.coords)
    ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" integrity="sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==" crossorigin="anonymous" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" integrity="sha512-puJW3E/qXDqYp9IfhAI54BJEaWIfloJ7JWs7OeD5i6ruC9JZL1gERT1wjtwXFlh7CjE7ZJ+/vcRZRkIYIb6p4g==" crossorigin="anonymous"></script>`
    : "";
  const mapSection = Array.isArray(barber.coords)
    ? `
        <article class="card">
          <h2>Mapa</h2>
          <p>Vê a localização desta barbearia no mapa.</p>
          <div id="detailMap" aria-label="Mapa de localização"></div>
        </article>`
    : "";
  const sameCityMarkup = sameCity.length
    ? sameCity.map((item) => renderBarberCard(item, prefix, { showZone: true })).join("")
    : '<article class="card"><h3>Mais opções em ' + escapeHtml(barber.city) + '</h3><p>À medida que entrarmos mais fichas nesta cidade, esta área passa a mostrar alternativas semelhantes.</p><div class="card-actions"><a class="btn btn-secondary" href="' + escapeHtml(prefix + (city ? city.url : "cidades/")) + '">Ver cidade</a></div></article>';
  const linksMetaMarkup = [
    barber.booking ? '<div class="meta-row"><strong>Marcação</strong><span><a href="' + escapeHtml(barber.booking) + '" target="_blank" rel="nofollow noopener noreferrer">Abrir marcação</a></span></div>' : "",
    barber.website ? '<div class="meta-row"><strong>Website</strong><span><a href="' + escapeHtml(barber.website) + '" target="_blank" rel="nofollow noopener noreferrer">' + escapeHtml(displayUrl(barber.website)) + '</a></span></div>' : "",
    barber.instagram ? '<div class="meta-row"><strong>Instagram</strong><span><a href="' + escapeHtml(barber.instagram) + '" target="_blank" rel="nofollow noopener noreferrer">Ver perfil</a></span></div>' : "",
    barber.facebook ? '<div class="meta-row"><strong>Facebook</strong><span><a href="' + escapeHtml(barber.facebook) + '" target="_blank" rel="nofollow noopener noreferrer">Ver página</a></span></div>' : "",
    barber.email ? '<div class="meta-row"><strong>Email</strong><span><a href="mailto:' + escapeHtml(barber.email) + '">' + escapeHtml(barber.email) + '</a></span></div>' : "",
    barber.mapUrl ? '<div class="meta-row"><strong>Mapa externo</strong><span><a href="' + escapeHtml(barber.mapUrl) + '" target="_blank" rel="nofollow noopener noreferrer">Abrir localização</a></span></div>' : ""
  ].join("");
  const body = `
${renderHeader(prefix, "cidades")}
<main>
  <section class="section">
    <div class="container hero-card">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="breadcrumbs">
            <a href="${prefix}index.html">OndeCortar.pt</a>
            <span>/</span>
            <a href="${prefix}cidades/">Cidades</a>
            ${city ? '<span>/</span><a href="' + prefix + city.url + '">' + escapeHtml(city.name) + "</a>" : ""}
            <span>/</span>
            <span>${escapeHtml(barber.name)}</span>
          </div>
          <span class="eyebrow">Perfil de barbearia</span>
          <h1>${escapeHtml(barber.name)}</h1>
          <p>${escapeHtml(barber.editorial)}</p>
          <div class="tag-row">
            <span class="tag">${escapeHtml(barber.city)}</span>
            ${barber.zone ? '<span class="tag">' + escapeHtml(barber.zone) + "</span>" : ""}
            ${barber.horario ? '<span class="tag">Horário disponível</span>' : ""}
          </div>
          <div class="hero-actions">
            ${barber.primaryLink ? '<a class="btn btn-primary" href="' + escapeHtml(barber.primaryLink.href) + '"' + (barber.primaryLink.external ? ' target="_blank" rel="nofollow noopener noreferrer"' : "") + ">" + escapeHtml(barber.primaryLink.label) + "</a>" : ""}
            ${barber.mapUrl ? '<a class="btn btn-secondary" href="' + escapeHtml(barber.mapUrl) + '" target="_blank" rel="nofollow noopener noreferrer">Abrir mapa</a>' : ""}
            ${city ? '<a class="btn btn-soft" href="' + prefix + city.url + '">Ver cidade</a>' : ""}
          </div>
        </div>
        <aside class="summary-panel">
          <div class="summary-row"><span>Cidade</span>${escapeHtml(barber.city)}</div>
          <div class="summary-row"><span>Zona</span>${escapeHtml(barber.zone || barber.city)}</div>
          <div class="summary-row"><span>Informação atualizada</span>${escapeHtml(formatDate(barber.lastmod))}</div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid-2">
      <div class="stack">
        <article class="card">
          <h2>Informação principal</h2>
          <div class="meta-list">
            <div class="meta-row"><strong>Cidade e zona</strong><span>${escapeHtml(barber.city + (barber.zone && barber.zone !== barber.city ? " | " + barber.zone : ""))}</span></div>
            <div class="meta-row"><strong>Morada completa</strong><span>${escapeHtml(barber.morada || "Morada não disponível")}</span></div>
            <div class="meta-row"><strong>Telefone</strong><span>${barber.telefone ? '<a href="' + escapeHtml(telephoneHref(barber.telefone)) + '">' + escapeHtml(barber.telefone) + "</a>" : "Telefone não disponível"}</span></div>
            <div class="meta-row"><strong>Horário</strong><span>${escapeHtml(barber.horario || "Horário não disponível")}</span></div>
            <div class="meta-row"><strong>Links úteis</strong><span>${[
              barber.website ? '<a href="' + escapeHtml(barber.website) + '" target="_blank" rel="nofollow noopener noreferrer">Website</a>' : "",
              barber.instagram ? '<a href="' + escapeHtml(barber.instagram) + '" target="_blank" rel="nofollow noopener noreferrer">Instagram</a>' : "",
              barber.booking ? '<a href="' + escapeHtml(barber.booking) + '" target="_blank" rel="nofollow noopener noreferrer">Marcação</a>' : ""
            ].filter(Boolean).join(" | ") || "Sem links públicos adicionais"}</span></div>
          </div>
        </article>
        <article class="card">
          <h2>Descrição útil</h2>
          <p>${escapeHtml(barber.editorial)}</p>
        </article>
        <article class="card">
          <h2>Informação atualizada</h2>
          <p>Os dados desta ficha foram revistos pela última vez em ${escapeHtml(formatDate(barber.lastmod))}. Se encontrares alguma diferença em morada, contactos, horários ou links, usa o formulário de atualização para corrigir a página.</p>
        </article>
        ${mapSection}
      </div>
      <aside class="stack">
        <article class="card">
          <h3>Ligações úteis</h3>
          <div class="meta-list">
            ${linksMetaMarkup}
          </div>
        </article>
        <article class="card">
          <span class="eyebrow">És o dono desta barbearia?</span>
          <h3>Atualiza esta ficha</h3>
          <p>Se algum dado estiver desatualizado, podes pedir correção ou completar o perfil com website, Instagram, marcação e horários.</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${prefix}registar.html">Atualizar perfil</a>
            <a class="btn btn-secondary" href="${prefix}faq.html">Ler FAQ</a>
          </div>
        </article>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="eyebrow">Mesma cidade</span>
          <h2>Outras barbearias em ${escapeHtml(barber.city)}</h2>
          <p>Explora mais opções nesta cidade para comparar localização, contactos e informação disponível.</p>
        </div>
      </div>
      <div class="barber-grid">
        ${sameCityMarkup}
      </div>
    </div>
  </section>
</main>
${renderFooter(prefix)}
${Array.isArray(barber.coords) ? `
<script>
  (function() {
    if (!window.L) return;
    var coords = ${JSON.stringify(barber.coords)};
    var map = L.map("detailMap", { scrollWheelZoom: false }).setView(coords, 15);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    }).addTo(map);
    L.marker(coords).addTo(map).bindPopup(${JSON.stringify(barber.name)}).openPopup();
  })();
</script>` : ""}`;

  return renderDocument({
    title: title,
    description: description,
    canonical: canonical,
    prefix: prefix,
    extraHead: mapHead,
    extraStyles: "#detailMap { min-height: 320px; border-radius: 18px; overflow: hidden; border: 1px solid var(--border); }",
    structuredData: structuredData,
    body: body
  });
}

function renderCityPage(city) {
  const prefix = "../../";
  const canonical = absoluteUrl(city.url);
  const title = "Barbearias em " + city.name + " | Mapa, contactos e perfis | OndeCortar.pt";
  const description = "Encontra barbearias em " + city.name + " com morada, contactos, mapa e links úteis. Compara opções e escolhe melhor no OndeCortar.pt.";
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
      "name": "Barbearias em " + city.name,
      "description": description,
      "url": canonical
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Barbearias em " + city.name,
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
            <a href="${prefix}index.html">OndeCortar.pt</a>
            <span>/</span>
            <a href="${prefix}cidades/">Cidades</a>
            <span>/</span>
            <span>${escapeHtml(city.name)}</span>
          </div>
          <span class="eyebrow">Página de cidade</span>
          <h1>Barbearias em ${escapeHtml(city.name)}</h1>
          <p>${escapeHtml(city.intro)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#lista-barbearias">Ver barbearias</a>
            <a class="btn btn-secondary" href="${prefix}registar.html">Adicionar barbearia nesta cidade</a>
          </div>
        </div>
        <aside class="summary-panel">
          <div class="summary-row"><span>Total listado</span>${escapeHtml(String(city.barbearias.length))} fichas</div>
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
          <h2>Lista de barbearias em ${escapeHtml(city.name)}</h2>
          <p>Todos os perfis abaixo são páginas próprias com morada, contactos, mapa e ligação a outras áreas do OndeCortar.</p>
        </div>
      </div>
      <div class="barber-grid">
        ${city.barbearias.map((barber) => renderBarberCard(barber, prefix, { showZone: true, longCopy: false })).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid-2">
      <article class="card">
        <span class="eyebrow">Escolher melhor</span>
        <h2>Como escolher uma barbearia em ${escapeHtml(city.name)}</h2>
        <ul class="list-clean">
          ${city.guide.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}
        </ul>
      </article>
      <aside class="stack">
        <article class="card">
          <span class="eyebrow">Ligação interna</span>
          <h3>Da cidade para a decisão</h3>
          <p>O diretório ajuda a encontrar espaços locais. A loja e a revista ajudam a escolher melhor produtos e rotinas quando queres prolongar o cuidado entre visitas.</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${prefix}loja/${escapeHtml(city.storeCategory)}/">Ver categoria da loja</a>
            <a class="btn btn-secondary" href="${prefix}revista/${escapeHtml(city.magazineArticle)}/">Ler artigo relacionado</a>
          </div>
        </article>
        <article class="card">
          <h3>És dono de uma barbearia em ${escapeHtml(city.name)}?</h3>
          <p>Uma ficha completa melhora a presença nesta página de cidade, acrescenta contactos úteis e cria um perfil mais forte para Google e utilizadores.</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${prefix}registar.html">Adicionar ou atualizar</a>
            <a class="btn btn-soft" href="${prefix}faq.html">Ver FAQ</a>
          </div>
        </article>
      </aside>
    </div>
  </section>
</main>
${renderFooter(prefix)}`;

  return renderDocument({
    title: title,
    description: description,
    canonical: canonical,
    prefix: prefix,
    structuredData: structuredData,
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
            <a href="${prefix}index.html">OndeCortar.pt</a>
            <span>/</span>
            <span>Cidades</span>
          </div>
          <span class="eyebrow">Diretório local</span>
          <h1>Barbearias por cidade</h1>
          <p>Explora as páginas locais do OndeCortar.pt para encontrar barbearias por cidade, comparar perfis individuais e avançar para a ficha certa com morada, contactos, mapa e links úteis.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#lista-cidades">Ver cidades</a>
            <a class="btn btn-secondary" href="${prefix}index.html#explorar">Voltar ao diretório</a>
          </div>
        </div>
        <aside class="summary-panel">
          <div class="summary-row"><span>Cidades com página própria</span>${escapeHtml(String(cities.length))}</div>
          <div class="summary-row"><span>Objetivo</span>Fortalecer SEO local e a navegação interna</div>
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
          <p>Cada página de cidade reúne perfis individuais, texto editorial, orientação prática e ligação interna para loja e revista.</p>
        </div>
      </div>
      <div class="city-grid">
        ${cities.map((city) => `
          <article class="card">
            <span class="pill">${escapeHtml(String(city.barbearias.length))} barbearias</span>
            <h3><a href="${prefix + city.url}">Barbearias em ${escapeHtml(city.name)}</a></h3>
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
    '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">'
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

function buildSitemapIndex(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">'
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

function main() {
  const rawBarbers = loadBarbers();
  const data = buildSlugData(rawBarbers);
  const citiesMap = new Map(data.cities.map((city) => [city.slug, city]));

  data.barbers.forEach((barber) => {
    writeFile(path.join("barbearias", barber.slug, "index.html"), renderProfilePage(barber, citiesMap));
  });

  data.cities.forEach((city) => {
    writeFile(path.join("cidades", city.slug, "index.html"), renderCityPage(city));
  });

  writeFile(path.join("cidades", "index.html"), renderCitiesHub(data.cities));
  writeFile("barbearia.html", buildLegacyBarberRedirect());

  writeFile("sitemap-pages.xml", buildSitemap([
    { loc: SITE_URL, lastmod: TODAY },
    { loc: SITE_URL + "cidades/", lastmod: TODAY },
    { loc: SITE_URL + "faq.html", lastmod: TODAY },
    { loc: SITE_URL + "registar.html", lastmod: TODAY },
    { loc: SITE_URL + "anunciar.html", lastmod: TODAY },
    { loc: SITE_URL + "privacidade.html", lastmod: TODAY }
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
    { loc: SITE_URL + "sitemap-pages.xml", lastmod: TODAY },
    { loc: SITE_URL + "sitemap-barbearias.xml", lastmod: TODAY },
    { loc: SITE_URL + "sitemap-cidades.xml", lastmod: TODAY },
    { loc: SITE_URL + "sitemap-loja.xml", lastmod: TODAY },
    { loc: SITE_URL + "sitemap-revista.xml", lastmod: TODAY }
  ]));

  console.log(JSON.stringify({
    generatedBarbers: data.barbers.length,
    generatedCities: data.cities.length,
    sitemaps: 5
  }, null, 2));
}

main();
