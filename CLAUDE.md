# OndeCortar.pt — Instruções para IA

Diretório de barbearias em Portugal. Site estático (HTML/CSS/JS puro), sem framework, sem servidor, sem base de dados.

## Stack

- HTML/CSS/JS puro — sem React, sem bundler, sem build pipeline de Node além dos scripts abaixo
- Hosting estático (GitHub Pages ou equivalente)
- Leaflet.js para o mapa interativo na homepage

## Ficheiros-chave

| Ficheiro | Papel |
|---|---|
| `Barbeiros/barbearias.limpo.js` | **Fonte única de dados** — define `const barbearias = [...]` com todas as barbearias |
| `Barbeiros/barbearias.mapa.js` | Versão reduzida dos dados que a homepage carrega (só públicas, sem campos que o browser não lê, sem vazios) — **gerada pelo build, não editar**. Se o cliente passar a ler um campo novo, tirá-lo de `CLIENT_OMIT_FIELDS` no build |
| `Barbeiros/barbearias-utils.js` | Utilitários partilhados: normalização de texto, geocoding, slugify. Contém `LOCALITY_FRONTEND_FORMS` — **localidades que levam artigo** ("no Porto", "na Póvoa de Varzim", "nas Velas"); acrescentar aqui cada cidade nova que não diga "em X", senão o `<title>`/`h1` fica "Barbearias em Póvoa de Varzim" |
| `llms.txt` | Resumo do site para assistentes de IA (llmstxt.org) com todas as páginas de cidade — **gerado pelo build** (`buildLlmsTxt`), não editar |
| `oc-analytics.js` | Toda a medição do site: GA4 em modo sem cookies (consentimento negado) + **GoatCounter** (`ondecortar.goatcounter.com`, sem cookies). Eventos `barber_contact_click` (Marcar/Ligar por perfil: `clique-booking/<slug>`, `clique-phone/<slug>`), cliques de afiliado (`amazon/<tipo>/<página>/<ASIN>`) e artigo/diretório → loja (`para-loja/…`). Os números para mostrar às barbearias vêm do GoatCounter (o GA4 sem consentimento quase não reporta) |
| `scripts/build-directory-static.js` | **Script de build principal** — gera tudo a partir dos dados |
| `index.html` | Homepage com mapa Leaflet + pesquisa dinâmica + lista estática SSR |
| `script.js` | Normalização client-side dos dados da homepage (cidades, links, descrições) — o mapa Leaflet, pesquisa e filtros estão em script inline no `index.html` |
| `barbearias/{slug}/index.html` | Páginas de perfil individuais — **geradas pelo build, não editar manualmente** |
| `cidades/{slug}/index.html` | Páginas por cidade — **geradas pelo build, não editar manualmente** |
| `cidades/index.html` | Hub de cidades — **gerado pelo build, não editar manualmente** |

## Workflow — adicionar ou atualizar barbearias

1. Editar `Barbeiros/barbearias.limpo.js` — adicionar/modificar entradas no array `barbearias`
2. Cada entrada deve ter pelo menos: `nome`, `slug` (único, kebab-case), `mostrar_no_mapa: true`
3. **Se a cidade for nova** (não existia antes no directório), verificar se está no mapa de regiões — ver secção abaixo
4. Correr o build:

### ⚠️ Regra obrigatória ao corrigir coordenadas ou city

**Nunca alterar `coords` ou `city` sem primeiro confirmar a morada online.** O código postal é a fonte de verdade — verificar sempre no Fresha, Google Maps ou CTT antes de tocar nesses campos.

Procedimento quando as coords parecem erradas:
1. Pesquisar o nome da barbearia + cidade online (Fresha, Google Maps, Facebook)
2. Confirmar o código postal → determina o município real
3. Só depois corrigir `city` e/ou `coords`

> **Caso real:** Costa Barbershop tinha `city: "Carapeços"` e coords `[41.58, -8.63]`. As coords pareciam erradas (zona Norte) mas ao verificar online o CP era 4750 = Barcelos (Norte) — as coords estavam correctas, o `city` é que estava errado. Corrigir coords sem verificar teria colocado a barbearia no sítio errado.
   ```bash
   node scripts/build-directory-static.js
   ```
5. O script atualiza automaticamente:
   - Perfis individuais em `barbearias/`
   - Páginas de cidade em `cidades/`
   - `cidades/index.html`
   - Sitemaps (5 ficheiros XML)
   - Lista estática SSR em `index.html` (entre os markers)
   - JSON-LD `ItemList` no `<head>` de `index.html`
   - `Barbeiros/barbearias.mapa.js` (dados reduzidos para o browser)

**Nunca editar manualmente** os ficheiros em `barbearias/` ou `cidades/` — são sobrescritos pelo build.

## Encontrar barbearias em zonas sem cobertura

Estado em 2026-10-07: **802 barbearias, 315 cidades**. O `<title>` da homepage diz "600+" — atualizar para "800+" ficou por decidir (pedir OK: muda title/description da homepage).

**Lista de lacunas:** artifact [Vilas sem barbearia](https://claude.ai/artifact/DgEHSWmsP3bXNVdT2FNTjQ) (db, coleção `vilas`, doc `{estado: por-ver|encontrei|sem, nota}`). Calculada com Overpass (`place=city|town` em PT) + distância à barbearia mais próxima > 10 km; concelho/distrito por Nominatim reverse. Em 2026-10-07 ficaram **111 de 171** tratadas; faltam ~60, quase todas aldeias pequenas (rendimento baixo). Ler com `ArtifactData list collection=vilas`; o utilizador também pode escrever notas lá.

**Fontes, por ordem de rendimento:**
1. **Google Maps no browser integrado** (o Claude pesquisa ele mesmo; o aviso de cookies foi "Rejeitar tudo" com autorização). Pesquisa `barbearia {vila} {distrito}`; ler os resultados (`a[href*="/maps/place/"]`, coordenadas em `!3d!4d`, place_id em `!19s`), ficar com categoria "Barb…" a < 8 km da vila, e abrir cada ficha (`maps/place/?q=place_id:…`) para morada com CP, telefone, site e horário completo (`table tr`). Scripts guardados em `localStorage` de google.com com fila — ver memória `fontes-descoberta-barbearias`. Vista limitada (sem sessão): só os primeiros resultados.
2. **Fresha** — páginas de distrito `lp/en/bt/barbershops/in/pt-rural-{distrito}-district` (e `tt/men's-haircuts`, `bt/hair-salons`) dão links `/lvp/…` com JSON-LD (morada, geo, telefone, `sameAs` com Instagram/Facebook). Muitas páginas só trazem o 1.º turno no HTML → `horario: null`.
3. **Booksy** (JSON-LD com geo e horário), listas de "Comércio e Serviços" das câmaras, OpenStreetMap.

**Regras ao criar fichas em massa:** excluir fichas sem rua (só vila ou só CP), categorias que não são barbearia (bar, salão de senhora), horários incoerentes ("Aberto 24 horas", 7h–22h, cada dia diferente) → `horario: null`; não alterar nomes comerciais (só tirar emojis); cruzar com o diretório por distância (<150 m) e telefone antes de inserir; corrigir localidades abreviadas ou erradas na morada ("Pte. de Lima", "3350-153 Coimbra" em Poiares), porque **com `codigo_postal: null` o build lê a cidade da morada**. Nomes de localidade repetidos (Guia de Pombal vs Albufeira) → `city: "Guia (Pombal)"` + `codigo_postal` preenchido. No fim: regiões em `REGIOES_PT`, artigos em `LOCALITY_FRONTEND_FORMS`, build, smoke, audit de links e de localização, filtros da homepage a somar o total.

## Mapa de regiões (filtros da homepage)

Os filtros **Norte / Centro / Lisboa / Alentejo / Algarve / Ilhas** da homepage são controlados pelo objecto `REGIOES_PT` em `index.html` (linha ~4571). Este objecto **não é gerado pelo build** — é manual e tem de ser mantido à mão.

### Regra obrigatória ao adicionar barbearias com cidade nova

Sempre que se adiciona uma barbearia com um campo `city` que ainda não existe no directório, verificar se essa cidade consta em `REGIOES_PT`. Se não constar, **o filtro de região não vai mostrar essa barbearia**.

Forma rápida de verificar após editar os dados:

```bash
node -e "
const fs = require('fs');
eval(fs.readFileSync('Barbeiros/barbearias.limpo.js','utf8').replace('const barbearias','global.barbearias'));
const html = fs.readFileSync('index.html','utf8');
const REGIOES = eval('('+html.match(/REGIOES_PT\s*=\s*(\{[\s\S]*?\});/)[1]+')');
// tem de espelhar o normCity de index.html (remove acentos E parênteses)
function norm(s){return(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[()]/g,'').replace(/\s+/g,' ').trim();}
const mapped = new Set(Object.values(REGIOES).flat().map(norm));
const missing = [...new Set(barbearias.filter(b=>b.mostrar_no_mapa!==false&&b.city).map(b=>norm(b.city)).filter(c=>!mapped.has(c)))];
if(missing.length) console.log('SEM REGIÃO:', missing.join(', '));
else console.log('Todas mapeadas.');
"
```

> **Atenção:** a normalização tem de espelhar exactamente a função `normCity` de `index.html` (que remove parênteses, ex.: `"Horta (Angústias)"` → `"horta angustias"`). Uma versão sem `.replace(/[()]/g,'')` dá falsos positivos.

### Atribuição de regiões (referência geográfica)

| Região | Critério |
|---|---|
| **Norte** | Distritos de Viana do Castelo, Braga, Porto, Vila Real, Bragança |
| **Centro** | Distritos de Aveiro, Coimbra, Leiria, Viseu, Guarda, Castelo Branco |
| **Lisboa** | Distritos de Lisboa e Setúbal + Ribatejo (Santarém, Cartaxo, Almeirim, Benavente, Alenquer, Carregado, Alverca) |
| **Alentejo** | Distritos de Évora, Portalegre, Beja + Alentejo Litoral |
| **Algarve** | Distrito de Faro (incluindo Santa Luzia/Tavira) |
| **Ilhas** | Madeira e Açores |

> **Médio Tejo** (Abrantes, Entroncamento, Torres Novas, Tomar, Ourém, Mação, Sardoal, Alcanena…) está em **Centro**; Ribatejo/Lezíria (Santarém, Rio Maior, Coruche, Chamusca, Almeirim…) em **Lisboa**.
> **Atenção:** Alenquer e Santarém pertencem ao distrito de Lisboa / Ribatejo → região **Lisboa**, não Alentejo.
> Alijo (Vila Real) e Vila Praia de Âncora (Viana do Castelo) são **Norte**, não Centro.

## Progressive enhancement / SSR na homepage

A `index.html` tem duas camadas:

### Para bots e utilizadores sem JS (gerado pelo build)
- `#resultsList` contém um `<ul>` estático com todas as barbearias: nome linkado, cidade, morada
- Sem JSON-LD por `<li>` (removido em 2026-10-01: ~157 KB duplicados do `HairSalon` de cada perfil). Estilos via classes `.ssr-list` no CSS do `index.html`, não inline
- O `<head>` tem um `<script type="application/ld+json">` com schema `ItemList` de todas as barbearias
- O `<noscript>` avisa que o mapa precisa de JS mas a lista está disponível abaixo

### Para utilizadores com JS
- `script.js` inicializa o Leaflet, popula `#resultsList` via `renderResults()` que substitui `innerHTML`
- A lista estática é automaticamente removida do DOM nesse momento — o utilizador nunca a vê

### Markers no index.html (não apagar)
```html
<!-- JSON-LD-BARBEARIAS-START -->...<!-- JSON-LD-BARBEARIAS-END -->
```
*(no `<head>`, linha ~1920 — o build injeta o ItemList aqui)*

```html
<div id="resultsList" ...><!-- STATIC-LIST-START -->...<!-- STATIC-LIST-END --></div>
```
*(no `<body>`, linha ~2125 — o build injeta o `<ul>` estático aqui)*

Se estes markers desaparecerem, o build falha com erro explícito. Não os remover.

## Estrutura de uma entrada em barbearias.limpo.js

```js
{
  "nome": "Nome da Barbearia",
  "slug": "nome-da-barbearia",          // URL: ondecortar.pt/barbearias/nome-da-barbearia/
  "city": "Lisboa",                      // cidade principal (usada nas páginas de cidade)
  "zone": "Belém",                       // zona/bairro (opcional)
  "morada": "Rua X, 123, 1234-567 Lisboa",
  "telefone": "+351 912 345 678",
  "website": "https://...",
  "instagram": "https://instagram.com/...",
  "facebook": "https://facebook.com/...",
  "booking": "https://noona.pt/...",     // opcional — link de marcação (Noona, Booksy, buk.pt…); conta como "marcação online" seja qual for o domínio
  "coords": [38.7223, -9.1393],          // [lat, lng] — necessário para aparecer no mapa
  "horario": "Seg-Sex 9h-19h",           // ver secção Horário abaixo; horario_fonte opcional
  "mostrar_no_mapa": true,               // false = excluído do site público
  "ultima_validacao": "2026-04-21",      // data ISO — usada no sitemap e nas páginas
  "status": "confirmado"
}
```

### Marcação online (`booking`)

- O build trata como marcação: o campo explícito `booking`, ou um `website`/`google_maps` de Fresha, Treatwell, Ongenda ou buk.pt (`classifyLink`). **Noona e Booksy só contam pelo campo `booking`** — não acrescentar `noona` ao `classifyLink` sem avisar: o Zela e o Pluma têm Noona no `website` e mudaria a description desses perfis.
- O perfil mostra a linha "Marcação online · <plataforma> · Marcar" nos contactos (`rel="nofollow noopener"`, **sem `noreferrer`** de propósito, para a barbearia ver o OndeCortar como origem; `data-oc-click="booking"` para a medição). Plataformas reconhecidas pelo nome: Fresha, Noona, Buk, Ongenda, Treatwell, Booksy.
- Decisão de negócio (2026-10-07): a linha de marcação é **gratuita**; uma versão paga futura seria destaque (botão grande no topo, posição na cidade, fotos, estatísticas) — não esconder dados públicos para os vender.

### Horário (`horario` e `horario_fonte`)

- **Formato do `horario`:** texto PT no padrão `Seg-Sex 9h-13h e 15h-20h; Sáb 9h-13h` (grupos com `;`, turnos com ` e `, dias fechados omitidos). O build converte-o com `scripts/horario-utils.js` em `openingHoursSpecification` (JSON-LD) e `openingHours` (microdados). Se o texto não for inequívoco (ex.: `9h-19h` sem dias), o schema é omitido — o texto continua visível. Testar um horário novo: `node -e "const H=require('./scripts/horario-utils.js');console.log(H.toSchemaSpecs(H.parsePt('Seg-Sex 9h-19h')))"`.
- **`horario_fonte` (opcional):** `{ "nome": "OpenStreetMap" | "Booksy" | "Fresha" | "Google Maps", "url": "...", "data": "YYYY-MM-DD" }` quando o horário veio de fonte externa. O perfil mostra "Segundo o … consultado a …. Confirma antes de ir." — no OpenStreetMap com crédito ODbL obrigatório. Não alterar `ultima_validacao` ao preencher só o horário.
- **Prioridade das fontes:** página de marcações da própria barbearia (Booksy/Fresha) > OpenStreetMap. Confirmar sempre que o nome da página corresponde à barbearia — vários `website` do Booksy apontam para **listagens** (várias barbearias) e há páginas do Fresha que mudaram de dono (em 2026-10-01: `mans-house-portimao` mostra "Brell Studio").
- **Mudar o `horario` muda o `<title>` e a description do perfil** (ex.: "Contacto, morada e mapa" → "Telefone, morada e horário") — ver a regra de risco de indexação.

## Outros scripts em scripts/

| Script | Propósito |
|---|---|
| `build-directory-static.js` | Build principal — **este é o único que precisas correr** |
| `gerar-barbearias-limpo.js` | Transforma/limpa dados brutos em `barbearias.limpo.js` |
| `audit-barber-locations.js` | Auditoria de qualidade de localização |
| `audit-site-links.js` | Verifica links internos e perfis gerados |
| `smoke-missing-barbearias.js` | Smoke test: confirma que todos os slugs têm página gerada |
| `apply-revista-seo.js` | Idempotente — metadados SEO da revista (twitter:card, og:image por artigo, image no JSON-LD, `<time>`) |
| `apply-revista-internal-links.js` | Idempotente — ponte para o directório nos artigos + completa grelhas de relacionados até 3 |
| `add-store-products.js` | Idempotente — `node scripts/add-store-products.js ficheiro.js` cria páginas `produto/{slug}/` a partir do modelo, junta cartões às categorias (bloco OC-CATEGORY-ALL), `sitemap-loja.xml` e `commerce-products-b.js`. Forma segura de adicionar produtos sem o sync |
| `apply-store-comparison.js` | Idempotente — `node scripts/apply-store-comparison.js scripts/data/comparacao-maquinas.js` insere a tabela "Comparar num relance" (markers OC-COMPARE-START/END). Só factos publicados pelo fabricante na Amazon.es; "—" quando não indicado |
| `gerar-webp.py` | `python scripts/gerar-webp.py` — gera `.webp` ao lado das fotos de `imagens/produtos/` e `imagens/revista/` (só quando poupa ≥10%; nunca altera os `.jpg`) |
| `apply-webp-images.js` | Idempotente — envolve as `<img>` de `.jpg` com `.webp` ao lado em `<picture style="display:contents">` + `<source … style="display:none">`. O `src` continua a ser o `.jpg` (fallback, og:image, Google Imagens). **Correr os dois depois de acrescentar fotos novas** (ex.: depois de `add-store-products.js`). Seletores CSS `x > img` não apanham a `<img>` dentro do `<picture>` — acrescentar a variante `x > picture > img` |
| `apply-card-links.js` | Idempotente — imagem e nome de cada cartão de produto (loja, produto, revista) passam a ligar à página do produto (`oc-card-media-link` com `display:contents`, `oc-card-title-link`). Correr depois de gerar/regenerar páginas com cartões |
| `build-black-friday-page.js` | Gera `loja/black-friday/` (página sazonal) a partir do modelo de `loja/para-oferecer/` + entrada no sitemap. Para o ano seguinte: atualizar `EVENT` (datas confirmadas pela Amazon) e `WATCH` |

## SEO e schema markup

- Páginas de perfil (`barbearias/{slug}/`) têm JSON-LD `HairSalon` + `BreadcrumbList`
- Páginas de cidade (`cidades/{slug}/`) têm JSON-LD `CollectionPage` + `ItemList` + `BreadcrumbList`
- Homepage tem JSON-LD `WebSite` + `Organization` (estático) + `ItemList` de todas as barbearias (gerado pelo build)
- A lista estática da homepage **não** tem JSON-LD por item — não reintroduzir (o schema de cada barbearia é o `HairSalon` do perfil)
- Sitemaps: `sitemap.xml` (índice) → `sitemap-barbearias.xml`, `sitemap-cidades.xml`, `sitemap-pages.xml`, `sitemap-loja.xml`, `sitemap-revista.xml`

### Identidade visual dos perfis

Desde 2026-10-01 os perfis (`barbearia-profile.css`) usam o tema escuro **"preto mate & verde-garrafa"**: fundo #141614, cartões #1E221F, texto creme #ECE7DD, acento âmbar #C8873A, blocos de destaque em verde-garrafa #1F4D3A; títulos em **Big Shoulders Display** (maiúsculas), corpo em Geist. Escolhido entre 3 propostas (clássica, navy & latão, escuro) por ser o mais masculino. Atenção: `--ink` é a cor do **texto** (clara) — não usar como fundo. Contrastes verificados (WCAG AA). As **páginas de cidade e o índice `cidades/`** usam o mesmo tema desde 2026-10-01 (CSS inline em `renderBaseStyles` no build; aí `--text` é o texto, `--accent` o fundo dos botões e `--link` os links em âmbar). A **homepage** também, desde 2026-10-01: bloco "Tema escuro homepage" no **fim de `oc-style.css`** (carregado depois do CSS inline do `index.html`), que redefine as duas famílias de variáveis (`--bg/--text/--accent…` e `--oc-*`) e os componentes com cores fixas. Armadilhas: vários elementos usavam a cor do texto como fundo (botões, faixa das cidades, rodapé) — nessas secções `--oc-paper` é redefinido localmente para creme; e há cartões com fundo em `background-image` (degradês creme) que não aparecem a quem só verifica `background-color`. Para verificar alterações: procurar fundos claros (cor e degradê) e texto < 4,5:1, também com pesquisa feita, popup do mapa aberto e menu mobile. A loja e a revista mantêm a sua identidade. Desde 2026-10-07 as páginas **Sobre, FAQ, Privacidade e Registar** também usam este tema (CSS inline em cada página; hero com riscas e linha dourada, títulos Big Shoulders, Geist). Nas páginas que carregam `mobile-nav.css` (FAQ, Privacidade, Registar), esse ficheiro vem depois e força texto branco no `.nav-cta` — o botão âmbar precisa de `color: #17130D !important`.

### Páginas para assistentes de IA

- `llms.txt` (gerado pelo build) e o FAQ com perguntas no formato em que as pessoas perguntam às IAs (cidades cobertas, como marcar, como escolher, atualização). O `FAQPage` tem de ter **as mesmas perguntas da página**, pela mesma ordem. `robots.txt` deixa entrar todos os robôs (incluindo os de IA) — não bloquear.
- O formulário de registo diz que o email é privado; quem quer email público no perfil escreve-o em «Informação adicional».

### SEO dos perfis

O SEO dos perfis é gerado em `scripts/build-directory-static.js`, na função `buildProfileSeo(barber)`.

Ao mexer nesta área:
- manter `title` e `meta description` alinhados com os campos reais da barbearia;
- incluir cidade quando existe (`locativeLabel`);
- referir canais de contacto apenas quando existem (`telefone`, `booking`, `website`, `instagram`, `facebook`, `email`);
- referir horário apenas quando `barber.horario` existe;
- preservar `barber.name` no `h1`, `title`, schema e links;
- depois correr o build e verificar pelo menos um perfil com poucos dados e um perfil com vários contactos.

## ⚠️ Regra de trabalho: mudanças com impacto na indexação

**Antes de implementar** qualquer alteração que possa afetar a forma como o Google vê, rastreia ou indexa as páginas, **parar e explicar ao utilizador exatamente qual é o risco**, e só avançar depois de ele confirmar.

Conta como impacto na indexação (lista não exaustiva):
- URLs: mudar ou remover `slug`s, pastas, páginas; apagar perfis ou páginas de cidade (ex.: `mostrar_no_mapa: false`, mudar `city` ou preencher `codigo_postal`, que apaga páginas de cidade);
- `<title>`, `meta description`, `h1`, `canonical`, `robots`/`noindex`, `hreflang`;
- JSON-LD / schema (tipos, campos, remoção de blocos);
- sitemaps e `robots.txt`;
- links internos (navegação, breadcrumbs, listas de cidades, relacionados) e conteúdo SSR visível sem JS (ex.: a lista estática da homepage entre os markers);
- conteúdo que passa a ser carregado só por JS, ou peso/velocidade que mexa nos Core Web Vitals de forma relevante.

O aviso tem de dizer, em concreto: **que páginas/URLs são afetadas (e quantas)**, **o que muda para o Google**, **o pior cenário** (ex.: perda de posições, 404, páginas fora do índice) e **como reverter**. Se a alteração não tiver impacto na indexação, dizê-lo numa linha e avançar.

## Regras críticas para não estragar o site

- **Não editar páginas geradas à mão:** qualquer alteração em perfis (`barbearias/{slug}/`) ou cidades (`cidades/{slug}/`) deve ser feita em `Barbeiros/barbearias.limpo.js` ou em `scripts/build-directory-static.js`, seguida de build.
- **Não inventar dados:** `title`, descriptions, CTAs e schema não devem prometer horário, telefone, website ou redes sociais se esses campos não existirem no objeto da barbearia.
- **Não mostrar preços de produtos da loja:** os `priceRange` em `commerce-products-a/b.js` são estimativas não verificadas (em 2026-07-13 confirmou-se que vários estavam errados — ex.: Philips BT3238 dizia €25–35, real €42,68) e foram removidos de todas as páginas. As regras da Amazon Associates só permitem mostrar preços obtidos via PA-API com timestamp. Só reintroduzir preços quando a conta tiver acesso à PA-API (3 vendas qualificadas).
- **Não alterar nomes comerciais por estética:** o `h1`, JSON-LD e links devem preservar `barber.name`. Não remover palavras como "Barbearia", "Barber Shop" ou nomes de cidade do nome oficial.
- **Não alterar `city`/`coords` sem validação externa:** confirmar primeiro por código postal, Google Maps, Fresha, CTT ou fonte equivalente.
- **Não remover os markers de build** em `index.html`; sem eles a homepage perde SSR/schema gerado.
- **Não assumir que desktop basta:** alterações no mapa/homepage têm de ser vistas também em mobile.

## Mapa mobile — cuidado especial

O mapa da homepage depende de dimensões CSS estáveis. Em mobile, garantir que `.hero-map-shell`, `.hero-map` e `#map` continuam com altura positiva (`min-height`/`height`) antes de concluir alterações.

Checklist mínimo para alterações que tocam `index.html`, `oc-style.css` ou `script.js`:
- abrir a homepage em desktop e mobile;
- confirmar que o mapa não fica com `height: 0`;
- confirmar que os markers carregam;
- confirmar que não há erros de consola;
- testar pesquisa/filtros se a alteração tocar dados, regiões ou renderização.

## Testes antes de fechar alterações

Para alterações em dados ou template gerado:

```bash
node scripts/build-directory-static.js
node scripts/smoke-missing-barbearias.js
node scripts/audit-site-links.js
```

Para alterações de mapa/localização:

```bash
node scripts/audit-barber-locations.js
```

Nota: `audit-barber-locations.js` atualiza `Barbeiros/relatorio-localizacao.json` com timestamp. Não incluir esse ficheiro no diff se a única alteração for `generated_at`.

Para alterações visuais/homepage:
- abrir localmente com servidor estático (`python -m http.server 8123 --bind 127.0.0.1`);
- verificar homepage e pelo menos um perfil em browser;
- em mobile, confirmar que o mapa tem altura visível e sem erros de consola.

`npm test` inclui `validar-barbearias.js`; se falhar por erros de completude já existentes nos dados, reportar isso separadamente e não misturar com a alteração atual.

## Secções que NÃO são geridas pelo build principal

- `loja/` — loja de produtos. **⚠️ NÃO correr `scripts/sync-commerce-static.js`**: várias páginas (`loja/index.html`, `loja/kits-de-barba/`, `revista/index.html` e a maioria dos artigos da revista) foram enriquecidas à mão depois do último sync, e o renderer (`commerce.js` + `commerce-articles.js`) está desatualizado em relação ao HTML publicado — correr o sync apaga esse conteúdo. Para alterações transversais de afiliados/preços usar `scripts/apply-affiliate-improvements.js` (idempotente) ou editar os HTML diretamente.
  - **Catálogo das categorias — todos os cartões com imagem:** o bloco `<!-- OC-CATEGORY-ALL-START/END -->` ("Todas as opções desta categoria") usa a grelha `related-grid` de 2 colunas, onde os cartões da mesma fila esticam para a altura do mais alto. Todos os `product-card` deste bloco têm de ter `<img>` — um cartão com imagem (~820px) ao lado de um sem imagem (~240px) cria um vazio enorme (corrigido em 2026-07-20 em 7 categorias, 17 cartões). A imagem e o `alt` copiam-se da página do produto (`produto/{slug}/index.html`); os caminhos relativos `../../` são válidos em ambas as localizações.
  - **Identidade visual da loja:** verde da marca (`--green-primary: #425a47` em `commerce.css`) + dourado. O hero da homepage da loja é verde-floresta escuro com brilho dourado (`body[data-page="store"] .loja-hero-card`) — decidido em 2026-07-20, não voltar a castanho. `commerce.css` é partilhado por toda a loja e revista: classes como `.comparison-row` (rótulo 1.3rem, coluna 220px) e `.category-hero-card .hero-grid` (texto centrado verticalmente) afetam todas as páginas de categoria de uma vez.
  - **Painéis escuros "barbearia" (2026-09-30) — só na loja:** para um visual mais masculino, as zonas de destaque da loja usam painel verde-escuro (`#121a15 → #1f3025`, riscas diagonais subtis, linha dourada no topo, barra dourada sob o título), cartões em vidro escuro (`rgba(255,255,255,.045)`), fotos em quadro creme `#f6efe3`, etiquetas douradas e CTA "Ver preço na Amazon.es" **dourado** com texto escuro (botão secundário = contorno creme). Aplicado em:
    - homepage da loja: `.loja-hero-card`, `#mais-procurados`, `#prendas`;
    - categorias: `.category-hero-card` e `#top-escolhas` (`loja/kits-de-barba/` tem CSS inline próprio com o mesmo visual — alterar lá também);
    - produto: hero, `.buy-box` e `#relacionados`.
    As restantes secções ficam claras de propósito (alternância claro/escuro). Os blocos estão no fim de `commerce.css`, todos com seletores `body[data-page="store|category|product"]`.
  - **A revista mantém o look claro (bege/creme)** — decisão de 2026-09-30. Não aplicar os painéis escuros a `data-page="magazine|hub|article"` nem mexer em regras partilhadas de forma a que afetem a revista.
- `revista/` — artigos editoriais, HTML manual. **Ao criar um artigo novo é preciso ligar tudo à mão**: entrada em `sitemap-revista.xml` (o build NÃO gera este sitemap — só o sync proibido o faz), cartão no hub `revista/index.html` (+ ItemList JSON-LD do hub), entrada na página da categoria respetiva (+ contagem "N guias" no painel), e correr `apply-revista-seo.js` + `apply-revista-internal-links.js` no fim. Artigos sobre cortes/barbearias/preços vão para a categoria `estilo-e-tendencias` ("Cultura de barbearia") e os CTAs devem apontar para o directório (mapa/cidades), não para a loja.
- `index.html` (hero, nav, footer, CSS, secção de destaques) — HTML manual, só os markers são atualizados pelo build
