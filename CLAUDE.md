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
| `Barbeiros/barbearias-utils.js` | Utilitários partilhados: normalização de texto, geocoding, slugify. Contém `LOCALITY_FRONTEND_FORMS` — **localidades que levam artigo** ("no Porto", "na Póvoa de Varzim", "nas Velas"); acrescentar aqui cada cidade nova que não diga "em X", senão o `<title>`/`h1` fica "Barbearias em Póvoa de Varzim" (o mesmo artigo dá "concelho **do** Porto", "distrito **da** Guarda"). Contém também `MUNICIPIO_RULES` (concelho/distrito inferidos quando a ficha não os tem) — ver "Pesquisa e localização" |
| `llms.txt` | Resumo do site para assistentes de IA (llmstxt.org) com todas as páginas de cidade — **gerado pelo build** (`buildLlmsTxt`), não editar |
| `oc-analytics.js` | Toda a medição do site: GA4 em modo sem cookies (consentimento negado) + **GoatCounter** (`ondecortar.goatcounter.com`, sem cookies). Eventos `barber_contact_click` (Marcar/Ligar por perfil: `clique-booking/<slug>`, `clique-phone/<slug>`), cliques de afiliado (`amazon/<tipo>/<página>/<ASIN>`) e artigo/diretório → loja (`para-loja/…`). Os números para mostrar às barbearias vêm do GoatCounter (o GA4 sem consentimento quase não reporta) |
| `scripts/build-directory-static.js` | **Script de build principal** — gera tudo a partir dos dados |
| `index.html` | Homepage com mapa Leaflet + pesquisa dinâmica + lista estática SSR |
| `script.js` | Normalização client-side dos dados da homepage (cidades, links, descrições) e `searchBarbers` (a pesquisa) — o mapa Leaflet, os filtros de região e a reposição da pesquisa ao voltar atrás estão em script inline no `index.html` |
| `registar.html` | Formulário único (Formspree) para adicionar, atualizar ou corrigir uma barbearia. O site **não tem contas nem login** — não pôr botões "Entrar". `registar.html#atualizar=<nome>` abre em "Atualizar" com o nome preenchido (hash, não query, para não criar URLs) |
| `AGENTS.md` | Aponta para este ficheiro (para Codex e outros agentes). Não duplicar regras lá |
| `PRODUCT.md` | Propósito, público, tom e identidade visual — lido por skills de design |
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

Estado em 2026-10-18: **1105 barbearias, 322 cidades** (lote 7 a 18/10: +51 em cidades com 1 ficha; lote 6: +38 procuradas pelo nome — ver abaixo; lote 5 a 17/10: +123; ver memória `cidades-poucas-fichas`). **Cidades com 1 ficha: 92 → 59** (o resto são aldeias onde o Maps não tem mais barbearias ou só tem noutras localidades). Prioridade: dar-lhes 2–3 fichas, por causa do risco de "doorway" — ver "SEO — regras da Google". As fichas antigas `status: "por_validar"` foram verificadas no Google Maps a 2026-10-18: **12 escondidas** (11 não existiam — os sites citados em `fontes` nem tinham DNS — e a Barreiro Elite duvidosa) e **7 corrigidas** (morada, telefone, coords e horário do Maps, `confirmado`). Os URLs das escondidas não dão 404: `PROFILE_REDIRECTS` no build gera uma página noindex + canonical + refresh para a cidade (como `CITY_REDIRECTS`); tinham ~3 900 impressões e 18 cliques em 90 dias. Ao esconder uma ficha que o Google conhece, acrescentá-la aí. Restam 4 `por_validar` já escondidas desde abril. Homepage (2026-10-18): `<title>` "Barbearias em Portugal: +1000 com mapa e horário | OndeCortar.pt" e description "Mais de 1000 barbearias em 320 cidades…" (antes "800+", que a Google trata como título obsoleto; a 18/10 a homepage tinha 8 889 impressões e 0,2% de CTR em 28 dias — comparar daqui a 3–4 semanas). "+1000" fica verdadeiro enquanto o diretório cresce; não pôr o número exato no título.

**Fonte n.º 0 — barbearias que as pessoas já procuram pelo nome (lote 6, 2026-10-18; o melhor rendimento por ficha).** No Search Console, Desempenho → filtro de página exata `/` (URL `…/performance/search-analytics?resource_id=https%3A%2F%2Fondecortar.pt%2F&num_of_days=28&page=!https%3A%2F%2Fondecortar.pt%2F&breakdown=query`) → pesquisas por que a homepage aparece. Em 28 dias eram ~650, das quais ~530 impressões com o **nome de barbearias que não estavam no diretório** (posição ~10, CTR 0%: o Google mostrava a homepage por falta de perfil). Ler a tabela por JS (`tr` → `td`, as 5 últimas colunas = pesquisa, cliques, impressões, CTR, posição), cruzar com o diretório por tokens de `nome`+`slug`+`city` (ignorar palavras genéricas: barbearia, barber, perto de mim…) e pesquisar cada nome em falta no Maps. **Centrar o mapa em Portugal** (`/maps/search/{nome}/@39.6,-8.1,7z?hl=pt-PT`), senão os resultados vêm enviesados para a localização do browser. Link estável da ficha: `https://maps.google.com/?cid=<decimal do 2.º hex de !1s0x…:0x…>`. Repetir de 4 em 4 semanas — aparecem nomes novos. Fora do lote 6: lojas de artigos ("Barbearia Sofia"), resultados em Espanha, nomes ambíguos com vários resultados ("Barbearia Henrique", "da Vila"). Ver memória `barbearias-procuradas-pelo-nome`.

**Localidades pequenas dentro de um concelho** (Perafita, Rinchoa, Alfena, Alhandra, São Domingos de Rana…): `city` = concelho que já tem página, `zone` = localidade, `codigo_postal` preenchido (com CP o build usa a `city` manual, como no Arlem/Seixal) e a morada fica com a localidade real. Assim não nasce uma página de cidade com 1 ficha. Cidade nova a sério → `distrito` e `concelho` na ficha, região em `REGIOES_PT` e artigo em `LOCALITY_FRONTEND_FORMS` se não for "em X" ("na Trofa").

**Lista de lacunas:** artifact [Vilas sem barbearia](https://claude.ai/artifact/DgEHSWmsP3bXNVdT2FNTjQ) (db, coleção `vilas`, doc `{estado: por-ver|encontrei|sem, nota}`). Calculada com Overpass (`place=city|town` em PT) + distância à barbearia mais próxima > 10 km; concelho/distrito por Nominatim reverse. Em 2026-10-07 ficaram **111 de 171** tratadas; faltam ~60, quase todas aldeias pequenas (rendimento baixo). Ler com `ArtifactData list collection=vilas`; o utilizador também pode escrever notas lá.

**Fontes, por ordem de rendimento:**
1. **Google Maps no browser integrado** (o Claude pesquisa ele mesmo; o aviso de cookies foi "Rejeitar tudo" com autorização). Pesquisa `barbearia {vila} {distrito}`; ler os resultados (`a[href*="/maps/place/"]`, coordenadas em `!3d!4d`, place_id em `!19s`), ficar com categoria "Barb…" a < 8 km da vila, e abrir cada ficha (`maps/place/?q=place_id:…`) para morada com CP, telefone, site e horário completo (`table tr`). Scripts guardados em `localStorage` de google.com com fila — ver memória `fontes-descoberta-barbearias`. Vista limitada (sem sessão): só os primeiros resultados.
2. **Fresha** — páginas de distrito `lp/en/bt/barbershops/in/pt-rural-{distrito}-district` (e `tt/men's-haircuts`, `bt/hair-salons`) dão links `/lvp/…` com JSON-LD (morada, geo, telefone, `sameAs` com Instagram/Facebook). Muitas páginas só trazem o 1.º turno no HTML → `horario: null`.
3. **Booksy** (JSON-LD com geo e horário), listas de "Comércio e Serviços" das câmaras, OpenStreetMap.

**Regras ao criar fichas em massa:** excluir fichas sem rua (só vila ou só CP), categorias que não são barbearia (bar, salão de senhora), horários incoerentes ("Aberto 24 horas", 7h–22h, cada dia diferente) → `horario: null`; não alterar nomes comerciais (só tirar emojis); cruzar com o diretório por distância (<150 m) e telefone antes de inserir; corrigir localidades abreviadas ou erradas na morada ("Pte. de Lima", "3350-153 Coimbra" em Poiares), porque **com `codigo_postal: null` o build lê a cidade da morada**. Nomes de localidade repetidos (Guia de Pombal vs Albufeira) → `city: "Guia (Pombal)"` + `codigo_postal` preenchido. A localidade depois do CP na morada tem de ser **exatamente** a `city` (o Maps escreve "Costa de Caparica", "Cabanas" → corrigir), senão nasce uma página de cidade nova; CP de outra localidade (Altura, São Romão, Parada) → não entra no lote da cidade. No fim: regiões em `REGIOES_PT`, artigos em `LOCALITY_FRONTEND_FORMS`, build, smoke, audit de links e de localização, filtros da homepage a somar o total.

## Mapa de regiões (filtros da homepage)

Os filtros **Norte / Centro / Lisboa / Alentejo / Algarve / Ilhas** da homepage são controlados pelo objecto `REGIOES_PT` em `index.html` (procurar `var REGIOES_PT`; estava na linha ~6440 em 2026-10-11). Este objecto **não é gerado pelo build** — é manual e tem de ser mantido à mão.

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
> **Exceções decididas (2026-10-11):** Espinho e Argoncilhe (distrito de Aveiro, Área Metropolitana do Porto), Lamego (Viseu) e Vila Nova de Foz Côa (Guarda) ficam em **Norte**, como na NUTS II. Santa Maria da Feira (concelho de Argoncilhe) juntou-se a 2026-10-18. As exceções estão também em `NORTE_EXCECOES` de `scripts/audit-regioes-localizacao.js` — acrescentar lá, senão a auditoria acusa `REGIAO`.
> "Lisboa" é nome de região e de cidade: escrito na pesquisa dá a **cidade** (`updateDirectory`); o chip "Lisboa" dos filtros dá a região.

## Pesquisa e localização — nomes que contêm outros nomes

Há muitas localidades cujo nome contém outro: Porto / Porto de Mós / Porto Santo / Vila do Porto; Vila Real / Vila Real de Santo António; Paredes / Paredes de Coura; Mira / Praia de Mira / Mira de Aire; Leiria / Vieira de Leiria; Nazaré / Gafanha da Nazaré. Correção de 2026-10-11 (antes, "Porto" mostrava 20 barbearias, com os Açores e a Madeira):

- **Pesquisa da homepage** (`searchBarbers` em `script.js`): primeiro cidade/localidade/zona **exata**; só se não houver nenhuma, procura por palavra e depois pelo nome. "Porto de Mós" escrito por extenso continua a funcionar.
- **Concelho/distrito inferidos** (`encontrarRegraMunicipio` + `MUNICIPIO_RULES` em `barbearias-utils.js`): só o nome exato (ou o nome antes de parênteses/vírgula, ex.: "Horta (Angústias)"). Antes, "Porto de Mós" herdava concelho e `addressRegion` "Porto". Cidade sem regra fica sem distrito inferido — melhor vazio do que errado; se fizer falta, pôr `distrito` na ficha ou acrescentar uma regra.
- **Cuidado ao acrescentar regras:** uma regra com `concelho` diferente da cidade pode **mudar a `city` pública** e apagar/criar páginas de cidade (visto com Vieira de Leiria → Marinha Grande; ficou só `distrito: "Leiria"` na ficha). Depois de mexer em regras, correr o build e ver em `git status` se apareceram ou desapareceram pastas em `cidades/`.
- **Frases geradas** ("no concelho do Porto", "no distrito da Guarda", "na Região Autónoma dos Açores"): `municipalityPhrase` / `districtPhrase` no build, com o artigo tirado de `LOCALITY_FRONTEND_FORMS`.
- Para testar: pesquisar no browser "Porto", "Vila Real", "Paredes" e "Mira" e confirmar que só aparecem essas cidades.

## Navegação dos perfis e botões de registo

- O topo dos perfis tem **"← Voltar"** (`data-oc-back`): volta à página anterior quando se vem do próprio site (a homepage repõe a pesquisa e o mapa ao voltar atrás); vindo de fora (Google), o link segue para a homepage. Em mobile substitui o antigo "← Barbearias".
- Um só botão por função: homepage = "+ Adicionar barbearia"; perfil = "Atualizar perfil" (cabeçalho), "És o dono? Atualizar perfil" e o cartão do dono, todos para `registar.html#atualizar=<nome>`. Não voltar a pôr "Entrar" nem "Reclamar esta barbearia" ao lado de "Atualizar perfil" (iam todos para o mesmo formulário).
- **Nunca "reclamar" nos textos para donos:** em PT-PT "reclamar" é queixar-se (livro de reclamações), não reivindicar — o dono lê "fazer uma queixa". O botão do cartão do dono (`ownerBlock` no build) diz "Completar a ficha" (ficha incompleta) ou "Atualizar perfil" (completa); trocado a 2026-10-24.
- **WhatsApp em vez do email (2026-10-24):** a lista "Ficha N/6" do cartão do dono (`ownerBlock`) conta Morada, Telefone, Horário, Website, Instagram e **WhatsApp** (antes Email — o formulário promete que o email é privado, por isso ninguém chegava a 6/6; ninguém escreve a um barbeiro por email). A nota dos contactos diz "WhatsApp e website ainda por adicionar pela barbearia." A linha **WhatsApp · Escrever** só aparece com o campo `whatsapp` preenchido, e **só com confirmação do dono** (caixa "Este número tem WhatsApp…" no `registar.html`, chega no email do Formspree como `whatsapp: sim`) — nunca deduzir do telemóvel (839 fichas têm telemóvel; nem todos têm WhatsApp). O link é `wa.me/351…?text=Olá! Vi a vossa barbearia no OndeCortar.pt.` (o dono vê de onde vem o cliente), `rel="nofollow noopener"`, `data-oc-click="whatsapp"` → GoatCounter `clique-whatsapp/<slug>` (sem mexer no `oc-analytics.js`). **Gratuito** (como a marcação); a versão paga é destaque/fotos/estatísticas. Ícone oficial do WhatsApp (Simple Icons, CC0, sem alterar a forma) e botão "Escrever" no verde **#25D366** — o único contacto a verde (`.oc-icon--wa`, `.oc-contact-row__action--wa` em `barbearia-profile.css`); o exemplo no topo do `registar.html` (cartão "WhatsApp no teu perfil", link `#whatsapp` para a caixa) tem de ficar igual à linha do perfil. FAQ, privacidade (botão só a pedido do dono, conversa no WhatsApp/Meta, GoatCounter) e cartões do registar já falam do WhatsApp. **Quando o 1.º perfil tiver WhatsApp:** o parágrafo de abertura ("Nesta ficha encontras telefone e Instagram…", `buildProfileEditorial`) e os botões rápidos do topo ainda não o mencionam — decidir. Ainda **não** entra na description nem no schema — decidir quando houver fichas com o campo (aviso de indexação). Homepage: aviso "Novo · Já pode pôr o WhatsApp no perfil da sua barbearia" na secção "Para barbeiros" (`.owner-new-badge` em `oc-style.css`) e etiqueta "Novo" no botão "+ Adicionar barbearia" do cabeçalho e do menu mobile (`.nav-new-tag`; não no topo/h1 — esse é para quem procura barbearia; uma frase para clientes no topo só quando ~20 fichas tiverem WhatsApp) — tirar daqui a uns meses, quando deixar de ser novo.
- **Lista "Ficha N/6", ainda por decidir:** o website falta a ~227 fichas que só têm Instagram/Facebook — para essas a ficha **é** o site (a Barbearia Nobre pôs o link do perfil na bio do Instagram). Ideia: contar Preços (só 47 fichas) e Marcação (link ou "só por marcação") e deixar o website como opcional. Texto visível em todos os perfis: avisar antes de implementar.
- `audit-site-links.js` ignora hashes com `=` (são estado lido por JS, não âncoras).

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
*(no `<head>` — o build injeta o ItemList aqui)*

```html
<div id="resultsList" ...><!-- STATIC-LIST-START -->...<!-- STATIC-LIST-END --></div>
```
*(no `<body>` — o build injeta o `<ul>` estático aqui)*

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
  "whatsapp": "+351 961 540 429",        // opcional — SÓ se o dono confirmou no formulário; telemóvel PT (o validador verifica)
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
| `gerar-barbearias-limpo.js` | ⚠️ **Não correr.** Legado: **reescreve `barbearias.limpo.js`** a partir de `Barbeiros/barbeiros.js` (234 barbearias, abril 2026) — apagaria ~570 fichas. Desde então os dados editam-se diretamente no `barbearias.limpo.js` |
| `audit-barber-locations.js` | Auditoria de qualidade de localização |
| `audit-regioes-localizacao.js` | Só leitura — cruza as 802 fichas com o código postal e as coordenadas: cidade no filtro de região errado ou em falta em `REGIOES_PT`, coords fora de PT, longe da cidade/CP, pontos repetidos, distrito da ficha/página ≠ CP. `REGIAO`, `SEM-REGIAO` e `COORDS-FORA-PT` corrigem-se sempre; o resto são pistas (confirmar online). Em 2026-10-11 restavam só pistas já revistas (fronteiras de distrito, Terceira, Odemira, Couço, Sertã). Correr depois de acrescentar cidades novas |
| `audit-geography-hierarchy.js` | Relatório de fichas que precisam de contexto geográfico (concelho/distrito) → `relatorio-hierarquia-geografica.md` na raiz + `.json/.csv` em `Barbeiros/` (último em abril 2026) |
| `audit-site-links.js` | Verifica links internos e perfis gerados |
| `apply-home-links.js` | Idempotente — links para a homepage sem `index.html` (`../../#mapa`, `./#explorar`, `#mapa` na própria homepage). Em 2026-10-13 eram 2467 links em 521 páginas e o Google tratava `/index.html` como página própria. O build e os modelos já não os geram; correr se aparecerem de novo (ex.: HTML colado de páginas antigas). **Nunca escrever `href="…index.html"` para a homepage** |
| `audit-loja-revista.js` | Só leitura, corre no `npm test` (`audit:loja`). **Falha** se uma página com link `amazon.es/dp` não tiver a frase "Como Afiliado da Amazon". Lista pistas: artigos que falam de produtos sem link para a loja, produtos que nenhum artigo liga, categorias sem guia da revista. Ver "Loja ↔ revista" abaixo |
| `recolher-precos.js` | Lê os preços das páginas de marcação (Booksy e Fresha `/a/` por JSON-LD, buk.pt pela lista de serviços) → `Barbeiros/precos-recolhidos.json`. Não mexe nos dados. As páginas Fresha `/lvp/` (a maioria) não têm preços. ~1,5 s entre pedidos (297 fichas ≈ 15 min) |
| `aplicar-precos.js` | Sem argumentos = simulação; `--gravar` escreve o campo `precos` (`{corte, barba, corte_barba, fonte:{nome,url,data}}`, preços «desde») nas fichas com nome da página confirmado. Revisão manual de nomes em `NOME_REVISTO`. Os preços mudam a description e o `priceRange` do perfil (risco de indexação já aceite a 2026-10-16 para os primeiros 46; avisar se for um lote grande novo) |
| `apply-revista-precos-dados.js` | Idempotente — secção "O que dizem os preços publicados" (medianas calculadas do campo `precos`, markers OC-PRECOS-DADOS) no artigo `quanto-custa-cortar-o-cabelo-numa-barbearia-em-portugal` + `dateModified`. Correr depois de aplicar preços novos |
| `smoke-missing-barbearias.js` | Smoke test: confirma que todos os slugs têm página gerada |
| `indexnow.js` | Avisa o Bing/IndexNow de URLs novos ou alterados (pelos `<lastmod>` dos sitemaps, `--days 2` por omissão; `--url` para URLs concretos). Simulação por omissão, `--send` envia, `--wait` espera o deploy. Corre sozinho no workflow `IndexNow` |
| `apply-para-oferecer-natal.js` | Idempotente — `loja/para-oferecer/` como página "Prendas para homem" (2026-10-18): reescreve head (title, description, CollectionPage, FAQPage) e tudo à volta do bloco OC-CATEGORY-ALL (hero, 8 destaques, "Escolhe por pessoa" `#por-pessoa`, por tipo, guias, FAQ, CTA para o diretório). Produtos lidos de `commerce-products-a/b.js`. O `<title>` não fala do Natal de propósito; **em janeiro trocar o objeto `SEASON`** e correr de novo + `apply-webp-images.js`. CSS no fim de `commerce.css` (OC-GIFT-PERSON-START/END) |
| `apply-maquinas-guia-secoes.js` | Idempotente — secções "cabelo e barba", "qualidade-preço" e "marcas" + 1 pergunta de FAQ/FAQPage no guia `revista/melhores-maquinas-para-cortar-cabelo-em-casa/` (markers OC-MAQUINAS-SECOES-START/END), feitas a 2026-10-18 a partir das pesquisas do Search Console. Muda as datas (dateModified, "Atualizado em", sitemap) só quando o texto muda; ao editar o texto, atualizar `TODAY_*` no topo. Base para medir: 2 829 impressões, 2,5% CTR, posição 7,8 (90 dias) |
| `apply-wordmark.js` | Idempotente — logótipo em texto "OndeCortar" + `<sup>.pt</sup>` dourado em todo o site (2026-10-18), como nos perfis e na homepage. Páginas escuras manuais (Sobre, FAQ, Registar, Privacidade): `<style id="oc-wordmark">` (Big Shoulders, .pt #E3A863, sem logótipo redondo). Loja/revista/produtos: mantêm o logótipo redondo e a letra; .pt #8A5714 (contraste no creme) em `commerce.css` (OC-WORDMARK). Cidades: no build (`renderHeader`/`renderFooter`). **Páginas novas criadas a partir de modelos herdam o markup; HTML colado de páginas antigas → correr de novo** |
| `apply-revista-seo.js` | Idempotente — metadados SEO da revista (twitter:card, og:image por artigo, image no JSON-LD, `<time>`) |
| `apply-revista-internal-links.js` | Idempotente — ponte para o directório nos artigos + completa grelhas de relacionados até 3 |
| `build-revista-articles.js` | Idempotente — `node scripts/build-revista-articles.js scripts/data/artigos-AAAA-MM-DD-x.js` gera `revista/{slug}/` a partir de um ficheiro de dados e liga tudo: `sitemap-revista.xml`, cartão no hub (+ ItemList), lista da categoria e contagem "N guias". **Modelo = `revista/tipos-de-degrade-como-pedir-o-corte-certo/`** (copia cabeçalho, rodapé, nav e CSS e substitui `<main>` e as meta): não pôr nada nessa página fora do `<main>` (ex.: barra fixa), senão passa para todos os artigos gerados. Temas novos do hub em `HUB_TOPIC`. Com o hub compacto (2026-10-11), o cartão novo entra no topo da grelha do tema e o último cartão passa para o início da lista `.rev-more-list` (`demoteLastCard`) |
| `add-store-products.js` | Idempotente — `node scripts/add-store-products.js ficheiro.js` cria páginas `produto/{slug}/` a partir do modelo, junta cartões às categorias (bloco OC-CATEGORY-ALL), `sitemap-loja.xml` e `commerce-products-b.js`. Forma segura de adicionar produtos sem o sync |
| `apply-store-comparison.js` | Idempotente — `node scripts/apply-store-comparison.js scripts/data/comparacao-maquinas.js` insere a tabela "Comparar num relance" (markers OC-COMPARE-START/END). Só factos publicados pelo fabricante na Amazon.es; "—" quando não indicado |
| `gerar-webp.py` | `python scripts/gerar-webp.py` — gera `.webp` ao lado das fotos de `imagens/produtos/` e `imagens/revista/` (só quando poupa ≥10%; nunca altera os `.jpg`) |
| `apply-webp-images.js` | Idempotente — envolve as `<img>` de `.jpg` com `.webp` ao lado em `<picture style="display:contents">` + `<source … style="display:none">`. O `src` continua a ser o `.jpg` (fallback, og:image, Google Imagens). **Correr os dois depois de acrescentar fotos novas** (ex.: depois de `add-store-products.js`). Seletores CSS `x > img` não apanham a `<img>` dentro do `<picture>` — acrescentar a variante `x > picture > img` |
| `apply-product-details.js` | Idempotente — enriquece páginas de produto a partir de `scripts/data/detalhes-produtos-*.js`: `<title>`/description/og e description do JSON-LD Product, "Porque recomendamos" completo, "Para quem é" sem repetir o topo, secção `#detalhes` (ficha rápida, "Qual versão é esta", como usar, FAQ; markers OC-PRODUCT-DETAILS) e JSON-LD FAQPage com as mesmas perguntas. Só factos da marca na Amazon.es + perguntas das sugestões do Google; sem "o mais vendido" sem prova. Corre no fim de `add-store-products.js`. Lote 1 (15 mais procurados) a 2026-10-11 |
| `apply-product-image-links.js` | Idempotente — nas páginas de produto, a foto leva à Amazon.es (mesmo link do botão) com a linha "Ver na Amazon.es ↗" por baixo; `tabindex=-1`/`aria-hidden` (o botão é o caminho acessível); GoatCounter conta em `amazon/product-foto/<slug>`. Ignora produtos substituídos (OC-UNAVAILABLE). Corre automaticamente no fim de `add-store-products.js`. Nos cartões (loja, revista) a foto continua a levar à página do produto |
| `apply-card-links.js` | Idempotente — imagem e nome de cada cartão de produto (loja, produto, revista) passam a ligar à página do produto (`oc-card-media-link` com `display:contents`, `oc-card-title-link`). Correr depois de gerar/regenerar páginas com cartões |
| `apply-article-product-picks.js` | Idempotente — bloco "Da nossa seleção" (produtos com foto + Amazon) nos artigos práticos da revista (markers OC-ARTICLE-PICKS-START/END) e barra fixa mobile no guia das máquinas (OC-ARTICLE-STICKY). Produtos/notas configurados no topo do script; nome, link e imagem lidos da página `produto/{slug}/`. Só toca nos artigos listados. O bloco inclui a frase de afiliado da Amazon (faltava em 28 artigos até 2026-10-13) — não a tirar |
| `apply-revista-unique-images.js` | Idempotente — cada artigo da revista com foto de capa própria (`NEW_HEROES`), og:image/twitter:image/JSON-LD alinhados com a capa, e todos os cartões da revista (hub, categorias, relacionados) a mostrar a capa do artigo para onde apontam (sem pack shots da Amazon). Correr depois de criar artigos ou mudar capas; depois `gerar-webp.py` + `apply-webp-images.js`. Nunca repetir uma foto de capa entre artigos |
| `apply-loja-novidades.js` | ⚠️ Correr de novo move o bloco OC-NOVIDADES-CSS para o fim de `commerce.css` (conteúdo igual, diff de ~300 linhas): se só mudaram atalhos/novidades, repor `commerce.css` com `git checkout`. Idempotente — atalhos em falta no menu da loja (`SHORTCUTS`; desde 2026-10-11 o menu tem todas as categorias com o mesmo nome e ordem da grelha "Explorar por tipo de produto" — manter assim ao criar categorias) e secção "Novos na loja" (`#novidades`, markers OC-LOJA-NOVIDADES-START/END) em `loja/index.html`; copia o estilo de `#mais-procurados` para `#novidades` em `commerce.css` (OC-NOVIDADES-CSS-START/END). Para trocar as novidades, editar `NOVIDADES` no script e correr de novo |
| `apply-product-replacements.js` | Troca um produto por outro (campo `replaces` no ficheiro de dados, ex.: `scripts/data/produtos-2026-10-09-balsamo.js`): cartões, links e JSON-LD passam ao substituto; a página antiga fica (sem 404) com aviso e botões para o substituto. `note: {title, text, buyBox}` muda o aviso quando o motivo não é indisponibilidade. Depois: `add-store-products.js` com o mesmo ficheiro, `apply-product-quick-decision.js`, `gerar-webp.py`, `apply-webp-images.js`. Rever à mão frases de artigos que citam o produto antigo pelo nome |
| `apply-site-enhancements.js` | ⚠️ **Não correr inteiro**: apesar de "idempotente", reescreve os blocos "Todas as opções" de 12 categorias e as contagens da loja a partir do catálogo desatualizado (visto em 2026-10-09) |
| `build-black-friday-page.js` | Gera `loja/black-friday/` (página sazonal) a partir do modelo de `loja/para-oferecer/` + entrada no sitemap. Para o ano seguinte: atualizar `EVENT` (datas confirmadas pela Amazon) e `WATCH` |
| `build-top-escolhas-page.js` | Idempotente — gera `loja/top-escolhas/` a partir do modelo de `loja/para-oferecer/`, só com os produtos de "Mais procurados"/"Em destaque" da loja; textos de `commerce-products-a/b.js`. Depois: `apply-webp-images.js` |
| `apply-product-quick-decision.js` | Idempotente — "Compra esta se… / Evita esta se…" nas páginas de produto (markers OC-QUICK-DECISION-START/END), a partir de `summary` e `limits[0]` do catálogo |
| `apply-revista-conversion.js` | Idempotente — tabela "Melhor para" (OC-ARTICLE-COMPARE) e "Se tivéssemos de escolher apenas um" (OC-SINGLE-PICK) nos guias de compra, só onde o artigo já indica uma preferência |
| `check-amazon-links.js` | Estado dos links Amazon do catálogo → `amazon-product-health.json`. "blocked" = deteção de bots, não link partido; **não prova stock** (ver memória: `fetch('/dp/ASIN')` no browser em amazon.es) |
| `check-amazon-products.ps1` | Legado: lê as páginas antigas da raiz (`maquinas.html`, `navalhas.html`…), que hoje são só redirecionamentos. Usar `check-amazon-links.js` |

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
- **A Google Search ignora o `llms.txt`** (documentado a 2026-06-15) e diz que não é preciso nada especial para os AI Overviews/AI Mode. Mantê-lo para outras IAs (o ChatGPT já nos manda visitas — 13 em 11 dias no GoatCounter a 18/10), sem gastar tempo a otimizá-lo para a Google.
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

## SEO — regras da Google (lidas na fonte a 2026-10-18)

Resumo da Google Search Central aplicado a este site. Quando uma regra daqui chocar com um hábito antigo, ganha a regra. Fontes no fim da secção; reler a página [updates](https://developers.google.com/search/updates) de tempos a tempos — as funcionalidades mudam.

**Títulos (`<title>`)** — únicos por página, descritivos, o importante à frente (cortam pela largura do ecrã), sem encher de palavras-chave, marca no fim com separador (`| OndeCortar.pt` ✓). A Google **reescreve** títulos *obsoletos* (números/anos que já não batem certo — a homepage ainda diz "800+"), *micro-boilerplate* (páginas quase iguais que só mudam um detalhe — cuidado com as páginas de cidade), títulos que não batem com o `h1` e títulos com metade vazia. Não pôr preços no título.

**Meta descriptions** — únicas por página; geradas por programa são aceites se forem legíveis e variadas (é o caso dos perfis e cidades: usar os dados reais de cada ficha); sem listas de palavras-chave; não há limite oficial (a regra interna de ≤160 caracteres continua boa). A Google usa muitas vezes o texto da página e não a description — o primeiro parágrafo visível conta.

**Conteúdo útil (people-first)** — escrever para quem chega, não para o Google. **Sinais de alerta que a Google lista:** muitas páginas sobre temas sem relação "para ver se alguma pega", resumir o que outros dizem sem acrescentar nada, **mudar datas sem mudança real de conteúdo** (não mexer em `dateModified`/`ultima_validacao` só para parecer fresco), contar o número de palavras. Deixar claro *quem* fez (Equipa OndeCortar.pt), *como* (critério editorial, "não testamos produtos") e *porquê*. E-E-A-T não é fator direto de ranking, mas a confiança pesa.

**Spam — o que pode prejudicar o site todo:**
- **Doorway / páginas por cidade:** a Google dá como exemplo de spam "páginas dirigidas a regiões ou cidades que levam o utilizador ao mesmo sítio". As nossas páginas de cidade são legítimas *se* tiverem fichas reais e conteúdo próprio. **92 cidades têm 1 ficha** — são as mais parecidas com doorways. Prioridade: dar-lhes 2–3 fichas (lotes de cidades) antes de criar cidades novas; não gerar páginas de cidade sem barbearias.
- **Scaled content abuse:** não criar páginas em massa para variações de pesquisa ("barbearia perto de mim em X", "melhor barbeiro em Y") nem artigos quase iguais. Cada página nova tem de ter dados ou texto que não existem noutra.
- **Thin affiliation:** páginas de produto que só repetem o texto da Amazon são spam. O que a Google aceita: informação adicional, comparações, avaliação original. Nas nossas: "Compra esta se / Evita esta se", limitações honestas, comparações, ficha rápida. **Nunca copiar descrições da Amazon**; cada produto novo precisa de pelo menos decisão + limitação próprias.
- **Keyword stuffing:** inclui "listas de cidades ou telefones sem valor acrescentado" — não acrescentar blocos de texto com dezenas de nomes de localidades.
- **Links pagos:** links de afiliado com `rel="sponsored"` (✓ já usamos `sponsored nofollow noopener noreferrer`; no diretório o "Marcar" usa `nofollow noopener` sem `noreferrer` de propósito).

**Dados estruturados:**
- `HairSalon` (subtipo de LocalBusiness): obrigatórios `name` e `address`; recomendados `geo` com ≥5 casas decimais (✓ 7), `telephone` com indicativo (✓ +351), `url`, `openingHoursSpecification` (✓, `opens`/`closes` em hh:mm), `priceRange` < 100 caracteres. **Nunca `aggregateRating`/`review` da própria barbearia** (só sites que recolhem reviews de terceiros).
- **FAQ rich results acabaram** — a Google deixou de os mostrar a 7 de maio de 2026 e retirou a documentação a 15 de junho. O `FAQPage` não dá destaque nenhum na Google. Manter os FAQ porque ajudam quem lê e as IAs, mas **não criar FAQ nem markup só por SEO**. Outros tipos retirados em 2025–26: Course info, Estimated salary, Learning video, Special announcement, Vehicle listing, ClaimReview, Book actions, Practice problem.
- Dados estruturados têm de bater com o que está visível na página (regra geral).
- **Nome do site nos resultados:** vem do `WebSite` na homepage (`name` "OndeCortar.pt" ✓). `alternateName` ["OndeCortar", "ondecortar.pt"] e `og:site_name` "OndeCortar.pt" desde 2026-10-18.

**Sitemaps** — a Google **só usa `<lastmod>` se for consistentemente exato** (mudança real de conteúdo, dados estruturados ou links). `priority` e `changefreq` são ignorados. Limite 50 000 URLs por ficheiro. Só URLs canónicos. Desde 2026-10-18 o build calcula: homepage e `cidades/` = data mais recente dos dados; FAQ, Registar, Sobre e Privacidade = data da última mudança real (hash do conteúdo em `Barbeiros/paginas-lastmod.json`, que vai para o git; na 1.ª vez usa a data do último commit); índice `sitemap.xml` = data mais recente de cada sitemap filho. Perfis usam `ultima_validacao` (✓). Página estática nova no `sitemap-pages.xml` → usar `staticPageLastmod("ficheiro")`.

**Indexação** — "Descoberta – atualmente não indexada" = a Google ainda não rastreou (adiou); ajuda: links internos a partir de páginas já indexadas + sitemap. "Rastreada – não indexada" = a Google decidiu não indexar (qualidade/duplicação); **não adianta voltar a pedir** — melhorar a página. Pedir indexação acelera mas "nunca é instantâneo"; páginas novas levam ~1 semana; esperar algumas semanas antes de julgar o efeito de uma mudança. A Google faz agora **core updates pequenos e contínuos** (dez/2025): melhorias contam sem esperar por um update grande.

**URLs e links** — palavras legíveis nos URLs (✓ slugs), páginas agrupadas por pasta (✓ `barbearias/`, `cidades/`, `revista/`, `loja/`), links internos com texto descritivo (não "clique aqui"), uma URL por conteúdo (canonical + redirecionamentos — ver `apply-home-links.js`).

**IA na pesquisa (AI Overviews / AI Mode)** — sem otimização especial: a página tem de estar indexada e poder mostrar snippet. A Google diz para **não** fazer: `llms.txt` para a Google, "chunking" do texto, páginas para cada variação de pergunta, menções falsas noutros sites. Conteúdo original, não "commodity", imagens próprias e boa experiência de página é o que conta. Ver no Search Console: definição "Search generative AI features" (o site tem de estar incluído) e o relatório de desempenho de IA generativa (em lançamento desde jun/2026). Há um botão oficial de **"fonte preferida"** (Preferred sources) que se pode pôr no site — só domínio inteiro.

**Bing e ChatGPT** — o ChatGPT e o Copilot usam o índice do Bing. **IndexNow ativo desde 2026-10-18** (Bing, Yandex, Seznam, Naver; a Google não usa): chave `02daf1105e257bfad18c75fa0af5d57b.txt` na raiz (não apagar nem mudar), `scripts/indexnow.js` e o workflow `.github/workflows/indexnow.yml`, que a cada push que mude sitemaps espera o deploy do Pages (`--wait`, compara o `sitemap.xml` **e os 5 sitemaps filhos** publicados com os locais — até 18/10 só via o índice e enviava antes de um artigo novo estar online) e envia os URLs com `<lastmod>` dos últimos 2 dias. Manual: `node scripts/indexnow.js` (simulação) / `--send` / `--url …`. **Bing Webmaster Tools ativo desde 2026-10-18** (conta do utilizador, ao lado de pulsarfm.eu): verificado pela meta `msvalidate.01` no `<head>` da homepage (não apagar) e `sitemap.xml` submetido. Lá há relatórios de pesquisa do Bing e de citações em respostas de IA (Copilot) — "AI Performance".

**Mitos (a Google diz que não contam):** meta keywords; número de palavras; ordem/quantidade de headings; palavras-chave no domínio; conteúdo duplicado interno como "penalização" (gasta rastreio, não é castigo); E-E-A-T como fator direto.

Fontes: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) · [Title links](https://developers.google.com/search/docs/appearance/title-link) · [Snippets](https://developers.google.com/search/docs/appearance/snippet) · [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business) · [Outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) · [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Page indexing report](https://support.google.com/webmasters/answer/7440203) · [Product reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews) · [Site names](https://developers.google.com/search/docs/appearance/site-names) · [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [AI features](https://developers.google.com/search/docs/appearance/ai-features) · [Preferred sources](https://developers.google.com/search/docs/appearance/preferred-sources) · [Updates](https://developers.google.com/search/updates) · [IndexNow](https://www.indexnow.org/documentation).

## Decidir com dados (regra do utilizador, 2026-10-18)

"Sempre acedendo às pesquisas e sites para não trabalhar às escuras": antes de propor o próximo trabalho, abrir as fontes no browser integrado (sessões do utilizador) e mostrar os números.

- **Search Console** (propriedade `https://ondecortar.pt/`): Desempenho com `breakdown=page` ou `breakdown=query` e `num_of_days=28`; filtro de página exata com `page=!<url>`. Procurar **muitas impressões + CTR baixo** (a 18/10: homepage 8 889 impressões e 0,2% de CTR; o guia das máquinas 1 167 e 2,7%). Inspecionar um URL não gasta a quota de pedidos de indexação.
- **GoatCounter** (`ondecortar.goatcounter.com`, `?period-start=…&period-end=…&filter=amazon/`): cliques Amazon por página e produto, `clique-booking/` e `clique-phone/` por perfil. Conta **menos do que a Amazon** (a 18/10: 20 contra ~50 no mesmo período; bloqueadores de anúncios) — usar como amostra de *onde* se clica, não como total.
- **Amazon Associates**: cliques, encomendados, enviados, ganhos. A comissão real anda nos **~2,7%** da receita enviada (1,16 € em 42,53 €) — só sobe com muito mais tráfego para guias de compra. O pico de 05/10 inclui testes nossos.
  - **Pedidos indiretos:** a 18/10 (30 dias: 150 cliques, 6 pedidos) só 1 pedido era o produto ligado; **5 eram indiretos** (a pessoa entra pelo nosso link e compra outra coisa). Conta o número de pessoas que mandamos à Amazon, não acertar no produto exato. Cliques por categoria: "Aparelhos de saúde e cuidado pessoal" (máquinas) 74, "Other" 60, Beleza 16. Para ver: `afiliados.amazon.es/p/reporting/earnings` → "Agrupar por" (a tabela lê-se por JS em `tr`/`td`; com sessão expirada só aparece a categoria).
- **Google PT e Amazon.es**: sugestões (`suggestqueries…&hl=pt-PT&gl=pt`, em PT diz-se "prenda", "presente" dá Brasil) e o que se compra para oferecer (pesquisas Amazon.es, "comprados el mes pasado").
- O que os dados mostraram a 18/10: os cliques Amazon vêm de **guias de compra com intenção** (o das máquinas: 17 visitas → 7 cliques); o diretório tem **procura por nomes de barbearias** que ainda não estão no site (lote 6).
- **Melhorar o CTR de uma página (método de 2026-10-18):** Desempenho com `num_of_days=90&breakdown=query&page=!<url exato>` → pesquisas reais dessa página. Se o título não usa as palavras das pesquisas com mais impressões (ex.: "degradê" e "o que é degradê" vs título "Tipos de degradê masculino…"), reescrever `<title>`/og:title e description/og:description com essas palavras — **sem mudar URL nem h1**, sem ano no título (fica obsoleto em janeiro) e sem números que mudam sozinhos, a não ser que se atualizem com os dados (a description do artigo dos preços cita "46 barbearias, 12 €/19 €" — atualizar se `apply-revista-precos-dados.js` mudar as medianas). Página que já tem bom CTR (guia das máquinas, 2,5%) não se mexe no título: melhora-se o conteúdo. Mudanças de 18/10 e base para comparar: memória `ctr-artigos-2026-10-18`. Esperar 3–4 semanas antes de julgar.
- **Expandir um guia que já tem tráfego:** ver as pesquisas da página para que ela aparece mas **não responde** (guia das máquinas: "máquina de cortar cabelo e barba", "custo benefício", "melhores marcas") e acrescentar secções com esse título, por baixo do que já converte (lista, resposta rápida, "se só um" ficam no topo). Só factos do catálogo (`commerce-products-a/b.js` e páginas `produto/`), sem preços. Num script idempotente com markers (ex.: `apply-maquinas-guia-secoes.js`), que muda `dateModified`/"Atualizado em"/lastmod do sitemap só quando o texto muda. Aproveitar para ligar produtos que o `audit-loja-revista.js` diz que nenhum artigo liga (14 → 11 a 18/10).

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
- abrir localmente com servidor estático (`.claude/launch.json` → `npx serve -l 5500 .`, ou `python -m http.server 8123 --bind 127.0.0.1`);
- verificar homepage e pelo menos um perfil em browser;
- em mobile, confirmar que o mapa tem altura visível e sem erros de consola. No browser integrado, se o painel estiver escondido, `innerWidth` dá 0 e o mapa parece vazio — fixar o tamanho com `resize_window` antes de medir.

**`npm test` = CI.** O workflow `.github/workflows/quality.yml` ("Quality") corre `npm test` (validar → build → smoke → audit de links → audit loja × revista) a cada push para `main`. Esteve vermelho de 2026-10-07 a 2026-10-11 sem ninguém dar por isso (o validador não aceitava `horario_fonte` "Google Maps" nem o "&" lido como "e" nos slugs). Depois de um push, confirmar com `gh run list --workflow Quality --limit 3` (ou esperar pelo run: `gh run watch <id> --exit-status`). Se o validador reclamar de algo que o CLAUDE.md permite, corrigir o validador (`validar-barbearias.js`, **na raiz**, não em `scripts/`), não os dados.

**Armadilhas práticas (2026-10-18):**
- `npm test` corre o build: se os dados não mudaram, o build só muda datas em `llms.txt`, `sitemap.xml` e `sitemap-pages.xml` → repor com `git checkout --` antes do commit.
- No Windows, `apply-webp-images.js` falha às vezes com `UNKNOWN: unknown error, open …index.html` (ficheiro preso pelo `serve` ou pelo antivírus). É passageiro: repetir (`for i in 1 2 3 4 5; do node scripts/apply-webp-images.js && break; sleep 2; done`).
- `sed -i` num HTML com fins de linha CRLF reescreve o ficheiro todo (diff de centenas de linhas no `revista/index.html` a 18/10) → editar com `node` (ler, `replace`, escrever) e confirmar `git diff --stat`.
- **Números de barbearias escritos à mão** (revista "Mais de 339", artigo dos cortes "800", até 18/10) ficam velhos: usar "Mais de 1000" como no título da homepage e procurar `grep -rnoE "Mais de [0-9]+ barbearias"` quando o total mudar de patamar.
- Na shell Git Bash, regex com `\s`/`\[` dentro de `node -e` ou heredoc pode perder as barras → escrever o script num ficheiro no scratchpad.
- `grep -o '.\{200\}texto.\{200\}'` num HTML minificado (uma linha de 100 KB) pode ficar minutos pendurado → ler secções de páginas com um script `node` (`split(/(?=<section)/)` + tirar tags).

**Testes de browser (Playwright, fora do CI):** `tests/smoke.spec.js` (layout da homepage, mapa, pesquisa, rodapé escuro, contagem). Precisam de um servidor na porta 4321:

```bash
npx serve -l 4321 .
```

```bash
npx playwright test
```

Atualizar as cores esperadas quando o tema mudar (o rodapé passou a `#0C0E0C` com o tema escuro). O `playwright test` reescreve `test-results/` (que está no git) — repor com `git checkout -- test-results` antes do commit.

## Revisão visual (lições de 2026-10-10)

- **Fotos de produto:** a imagem tem de ter pelo menos a largura a que é mostrada (os cartões da loja mostram até ~400 px, 800 px em ecrãs retina). Fotos pequenas ampliadas ficam esborratadas — trocar pela versão grande da Amazon (o URL da imagem sem o sufixo de tamanho `._AC_SX…_` / `._SL…_`, limitada a 800 px), **mantendo o nome do ficheiro** para não mexer no HTML; depois `gerar-webp.py` (apagar o `.webp` antigo se a foto mudou) e `apply-webp-images.js`. Algumas não têm melhor (Eurostil: 418 px é o máximo na Amazon).
- **Menus/chips com scroll horizontal no mobile** (atalhos da loja `.loja-quicknav`, chips da revista `.rev-cats-scroll`, cidades da homepage `.chips-row`/`#directoryCities`): a barra de scroll está escondida, por isso levam um esbatido à direita (`mask-image: linear-gradient(to right,#000 85%,transparent)` + `padding-right: 32px`) para se perceber que há mais. No desktop os chips da revista fazem `flex-wrap` em vez de scroll. Seguir o mesmo padrão em menus novos.
- **Auditorias automáticas de contraste dão falsos positivos** em fundos com degradê (paragens transparentes lidas como preto) e em painéis de vidro escuro; confirmar à mão antes de mudar. Falsos positivos conhecidos: o separador "·" decorativo da homepage e o breadcrumb/etiqueta da página Sobre (≈7:1 reais).
- **Botões secundários sobre painéis escuros** (ex.: ponte para o diretório nos artigos) precisam de cor explícita creme — o `.btn-secondary` por omissão herda texto escuro.
- Nos cartões da revista nunca pôr pack shots da Amazon (ficam com zoom/cortados no `object-fit: cover`); usar a capa do artigo (`apply-revista-unique-images.js`).

## Secções que NÃO são geridas pelo build principal

- `loja/` — loja de produtos. **⚠️ NÃO correr `scripts/sync-commerce-static.js`**: várias páginas (`loja/index.html`, `loja/kits-de-barba/`, `revista/index.html` e a maioria dos artigos da revista) foram enriquecidas à mão depois do último sync, e o renderer (`commerce.js` + `commerce-articles.js`) está desatualizado em relação ao HTML publicado — correr o sync apaga esse conteúdo. Para alterações transversais de afiliados/preços usar `scripts/apply-affiliate-improvements.js` (idempotente) ou editar os HTML diretamente.
  - **Categoria nova (ex.: `loja/cuidados-de-rosto/`, 2026-10-11; `loja/pomadas-e-ceras/`, 2026-10-13):** copiar a estrutura de `loja/oleos-e-balms/` (hero, `#top-escolhas`, guia, comparação, guias da revista, bloco OC-CATEGORY-ALL com a grelha vazia, FAQ + `FAQPage`, aviso de afiliado), depois `add-store-products.js` com `categories: ["<slug>"]` enche o catálogo. Ligar à mão: atalho em `SHORTCUTS` de `apply-loja-novidades.js` (e no HTML), cartão `.loja-cat-card` em `loja/index.html` e URL em `sitemap-loja.xml`.
  - **Catálogo das categorias — todos os cartões com imagem:** o bloco `<!-- OC-CATEGORY-ALL-START/END -->` ("Todas as opções desta categoria") usa a grelha `related-grid` de 2 colunas, onde os cartões da mesma fila esticam para a altura do mais alto. Todos os `product-card` deste bloco têm de ter `<img>` — um cartão com imagem (~820px) ao lado de um sem imagem (~240px) cria um vazio enorme (corrigido em 2026-07-20 em 7 categorias, 17 cartões). A imagem e o `alt` copiam-se da página do produto (`produto/{slug}/index.html`); os caminhos relativos `../../` são válidos em ambas as localizações.
  - **Identidade visual da loja:** verde da marca (`--green-primary: #425a47` em `commerce.css`) + dourado. O hero da homepage da loja é verde-floresta escuro com brilho dourado (`body[data-page="store"] .loja-hero-card`) — decidido em 2026-07-20, não voltar a castanho. `commerce.css` é partilhado por toda a loja e revista: classes como `.comparison-row` (rótulo 1.3rem, coluna 220px) e `.category-hero-card .hero-grid` (texto centrado verticalmente) afetam todas as páginas de categoria de uma vez.
  - **Painéis escuros "barbearia" (2026-09-30) — só na loja:** para um visual mais masculino, as zonas de destaque da loja usam painel verde-escuro (`#121a15 → #1f3025`, riscas diagonais subtis, linha dourada no topo, barra dourada sob o título), cartões em vidro escuro (`rgba(255,255,255,.045)`), fotos em quadro creme `#f6efe3`, etiquetas douradas e CTA "Ver preço na Amazon.es" **dourado** com texto escuro (botão secundário = contorno creme). Aplicado em:
    - homepage da loja: `.loja-hero-card`, `#mais-procurados`, `#prendas`;
    - categorias: `.category-hero-card` e `#top-escolhas` (`loja/kits-de-barba/` tem CSS inline próprio com o mesmo visual — alterar lá também);
    - produto: hero, `.buy-box` e `#relacionados`.
    As restantes secções ficam claras de propósito (alternância claro/escuro). Os blocos estão no fim de `commerce.css`, todos com seletores `body[data-page="store|category|product"]`.
  - **A revista mantém o look claro (bege/creme)** — decisão de 2026-09-30. Não aplicar os painéis escuros a `data-page="magazine|hub|article"` nem mexer em regras partilhadas de forma a que afetem a revista.
- **Funil de Natal (2026-10-18):** guias `revista/prendas-de-natal-para-homem/` e `revista/o-que-oferecer-ao-pai/` (este serve também anos e Dia do Pai, 19/03) → `loja/para-oferecer/` ("Prendas para homem", gerada por `apply-para-oferecer-natal.js`) → produto → Amazon. 4 packs de oferta acrescentados pela procura na Amazon.es (L'Oréal Power Age Rotina, NIVEA Neceser, NIVEA Hyaluron, Oukzon; `scripts/data/produtos-2026-10-18-packs-natal.js`). Os guias de Natal têm de estar indexados até meados de novembro. **Listas de ideias da Amazon: descartadas** — não trazem cliques novos, a comissão é a mesma e a lista pública mostra o nome pessoal do dono da conta.
- **Loja ↔ revista: controlar sempre nos dois sentidos (regra do utilizador, 2026-10-13).** Em 2026-10-13 o artigo `pomada-cera-ou-gel-cabelo-homem` não ligava a nenhum produto porque **a loja não tinha styling** (nem pomadas, nem ceras, nem cremes de caracóis) — ninguém tinha reparado. Criou-se `loja/pomadas-e-ceras/` (9 produtos) e ligou-se ao artigo e ao de cabelo encaracolado. Por isso:
  - **Ao escrever ou rever um artigo:** se o texto recomenda um tipo de produto (pomada, creme, máquina, óleo…), confirmar que a loja o tem. Se não tiver, dizer ao utilizador e propor produtos (pela procura: Google PT + mais vendidos da Amazon.es), em vez de deixar o artigo sem ligação ou de afirmar "sem marcas que não tenhamos analisado".
  - **Ao criar produtos ou categorias:** ligar a pelo menos um artigo (bloco "Da nossa seleção" em `apply-article-product-picks.js`, campo `articles` do ficheiro de dados) e a categoria a um guia da revista. Produto que nenhum artigo liga só se encontra pela loja.
  - **Correr `node scripts/audit-loja-revista.js`** no fim (também corre no `npm test`). Os artigos de "Cultura de barbearia" sobre cortes, preços e escolher barbearia (primeiro corte, cortes que combinam, risco, preços, sinais de qualidade) ficam sem loja **de propósito** — o CTA é o diretório; não são erro.
  - **Grelhas de destaque (`#top-escolhas`) com número de cartões múltiplo de 4** (4 ou 8): com 6 cartões a 2.ª fila fica com 2 e um vazio no desktop.
- `revista/` — artigos editoriais, HTML manual. **Ao criar um artigo novo é preciso ligar tudo à mão**: entrada em `sitemap-revista.xml` (o build NÃO gera este sitemap — só o sync proibido o faz), cartão no hub `revista/index.html` (+ ItemList JSON-LD do hub), entrada na página da categoria respetiva (+ contagem "N guias" no painel), e correr `apply-revista-seo.js` + `apply-revista-internal-links.js` no fim. Artigos sobre cortes/barbearias/preços vão para a categoria `estilo-e-tendencias` ("Cultura de barbearia") e os CTAs devem apontar para o directório (mapa/cidades), não para a loja.
  - **⚠️ Antes de escrever qualquer artigo: ver o que as pessoas procuram no Google (regra do utilizador, 2026-10-11).** Correr as sugestões do Google PT para o tema e variantes (`curl "https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-PT&gl=pt&q=<termo>"`, com o termo em `encodeURIComponent`), e, se o artigo vende produtos, os mais vendidos da Amazon.es na categoria. O título, os h2 e as perguntas do FAQ saem dessas pesquisas (tipo de pele, idade, marca, "melhor…", "pode…?"), não de uma ideia nossa. Mostrar ao utilizador o resumo da procura antes de redigir.
    - As sugestões "PT" vêm misturadas com o Brasil: ignorar marcas e lojas de lá (Mondial, Dragão, Philco, Wmark, Shopee, Mercado Livre, "custo benefício" escrito à brasileira). Kemei aparece muito, mas não está na loja — não recomendar sem a ter analisado. Usar `curl -s -A "Mozilla/5.0"` sem `iconv` (com `iconv` a saída vinha vazia).
  - **Artigo novo — sequência completa (usada em 2026-10-09/10 para 14 artigos):** pesquisa no Google (ponto acima) → ficheiro de dados em `scripts/data/artigos-…js` → `build-revista-articles.js` → `apply-revista-seo.js` → `apply-revista-internal-links.js` → (se vende produtos) acrescentar ao `PICKS`/`STICKY` de `apply-article-product-picks.js` e correr → foto de capa nova do Unsplash em `imagens/revista/` + entrada em `NEW_HEROES` de `apply-revista-unique-images.js` e correr → `gerar-webp.py` → `apply-webp-images.js` → `audit-site-links.js`. Depois de publicar, juntar o URL à fila de indexação do Search Console (o Claude pede ~11/dia no browser integrado — ver memória `fila-indexacao-search-console`). **Cuidado:** correr `build-revista-articles.js` de novo sobre um artigo existente põe `dateModified` = hoje; só o fazer quando o conteúdo muda a sério (a Google lista "mudar datas para parecer fresco" como sinal de alerta). Foto de capa do Unsplash: filtro `?license=free`, ver a foto antes de usar (rejeitar, por ex., barbeiro a fumar), descarregar já em 1200×675 (`images.unsplash.com/photo-…?w=1200&h=675&fit=crop&fm=jpg&q=80`) e confirmar que o ID não está já noutro artigo.
  - **Tom dos artigos que vendem:** editorial, não genérico — tomar posição (uma escolha clara), decisão prática antes das marcas, limitações honestas, CTA a meio do texto. Não afirmar o que não se pode provar ("a maioria dos barbeiros usa…", "é o padrão") nem "testámos"; descriptions ≤ 160 caracteres; FAQPage = as mesmas perguntas da página.
- `index.html` (hero, nav, footer, CSS, secção de destaques) — HTML manual, só os markers são atualizados pelo build

## Ficheiros legados (não apagar sem pensar nos URLs)

- **Raiz:** `loja.html`, `maquinas.html`, `navalhas.html`, `kits.html`, `cremes.html`, `escovas.html`, `acessorios.html`, `produto.html`, `barbearia.html` são **redirecionamentos** de URLs antigos para `loja/…` e para a homepage (meta refresh + canonical). Apagá-los dá 404 a links antigos — conta como mudança de indexação. `obrigado.html` é a página depois do formulário.
- **`Barbeiros/barbeiros.js`** e **`Barbeiros/barbearias.por-validar.js`**: dados de abril de 2026, usados só pelo `gerar-barbearias-limpo.js` (que não se corre). A fonte de verdade é `barbearias.limpo.js`.
- **`relatorio-editorial-ptpt.md`**, **`relatorio-hierarquia-geografica.md`** (raiz) e `Barbeiros/relatorio-*`: relatórios antigos (abril 2026), não instruções.
- `commerce.js` + `commerce-articles.js` + `scripts/sync-commerce-static.js`: renderer antigo da loja/revista — ver aviso acima, não correr o sync.
