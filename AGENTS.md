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
| `Barbeiros/barbearias-utils.js` | Utilitários partilhados: normalização de texto, geocoding, slugify |
| `scripts/build-directory-static.js` | **Script de build principal** — gera tudo a partir dos dados |
| `index.html` | Homepage com mapa Leaflet + pesquisa dinâmica + lista estática SSR |
| `script.js` | Lógica client-side da homepage (mapa, pesquisa, filtros) |
| `barbearias/{slug}/index.html` | Páginas de perfil individuais — **geradas pelo build, não editar manualmente** |
| `cidades/{slug}/index.html` | Páginas por cidade — **geradas pelo build, não editar manualmente** |
| `cidades/index.html` | Hub de cidades — **gerado pelo build, não editar manualmente** |

## Workflow — adicionar ou atualizar barbearias

1. Editar `Barbeiros/barbearias.limpo.js` — adicionar/modificar entradas no array `barbearias`
2. Cada entrada deve ter pelo menos: `nome`, `slug` (único, kebab-case), `mostrar_no_mapa: true`
3. Se a cidade for nova, confirmar que está mapeada em `REGIOES_PT` no `index.html`
4. Se alterar `city`, `morada` ou `coords`, confirmar a morada/código postal online antes de mexer
5. Correr o build:
   ```bash
   node scripts/build-directory-static.js
   ```
6. O script atualiza automaticamente:
   - Perfis individuais em `barbearias/`
   - Páginas de cidade em `cidades/`
   - `cidades/index.html`
   - Sitemaps (5 ficheiros XML)
   - Lista estática SSR em `index.html` (entre os markers)
   - JSON-LD `ItemList` no `<head>` de `index.html`

**Nunca editar manualmente** os ficheiros em `barbearias/` ou `cidades/` — são sobrescritos pelo build.

## Regras críticas para não estragar o site

- **Não editar páginas geradas à mão:** qualquer alteração em perfis (`barbearias/{slug}/`) ou cidades (`cidades/{slug}/`) deve ser feita em `Barbeiros/barbearias.limpo.js` ou em `scripts/build-directory-static.js`, seguida de build.
- **Não inventar dados:** `title`, descriptions, CTAs e schema não devem prometer horário, telefone, website ou redes sociais se esses campos não existirem no objeto da barbearia.
- **Não alterar nomes comerciais por estética:** o `h1`, JSON-LD e links devem preservar `barber.name`. Não remover palavras como "Barbearia", "Barber Shop" ou nomes de cidade do nome oficial.
- **Não mexer em `city`/`coords` sem validação externa:** confirmar primeiro por código postal, Google Maps, Fresha, CTT ou fonte equivalente.
- **Não remover os markers de build** em `index.html`; sem eles a homepage perde SSR/schema gerado.
- **Não assumir que desktop basta:** alterações no mapa/homepage têm de ser vistas também em mobile.

## Mapa e regiões da homepage

O mapa usa Leaflet em `script.js` e os dados de `Barbeiros/barbearias.limpo.js`. Para aparecer no mapa público, uma entrada precisa de `mostrar_no_mapa !== false` e `coords` válidas.

Os filtros **Norte / Centro / Lisboa / Alentejo / Algarve / Ilhas** são controlados manualmente pelo objeto `REGIOES_PT` dentro de `index.html`. O build não atualiza este objeto.

Sempre que entra uma cidade nova:
- confirmar que a cidade existe em `REGIOES_PT`;
- escolher a região pelo distrito/município real, não por intuição;
- testar o filtro correspondente na homepage.

Referência rápida:

| Região | Critério |
|---|---|
| Norte | Viana do Castelo, Braga, Porto, Vila Real, Bragança |
| Centro | Aveiro, Coimbra, Leiria, Viseu, Guarda, Castelo Branco |
| Lisboa | Lisboa, Setúbal e Ribatejo operacional usado pelo site (Santarém, Cartaxo, Almeirim, Benavente, Alenquer, Carregado, Alverca) |
| Alentejo | Évora, Portalegre, Beja e Alentejo Litoral |
| Algarve | Distrito de Faro |
| Ilhas | Madeira e Açores |

## Mapa mobile — cuidado especial

O mapa da homepage depende de dimensões CSS estáveis. Em mobile, garantir que `.hero-map-shell`, `.hero-map` e `#map` continuam com altura positiva (`min-height`/`height`) antes de concluir alterações.

Checklist mínimo para alterações que tocam `index.html`, `oc-style.css` ou `script.js`:
- abrir a homepage em desktop e mobile;
- confirmar que o mapa não fica com `height: 0`;
- confirmar que os markers carregam;
- confirmar que não há erros de consola;
- testar pesquisa/filtros se a alteração tocar dados, regiões ou renderização.

## Progressive enhancement / SSR na homepage

A `index.html` tem duas camadas:

### Para bots e utilizadores sem JS (gerado pelo build)
- `#resultsList` contém um `<ul>` estático com todas as barbearias: nome linkado, cidade, morada
- Cada `<li>` tem um `<script type="application/ld+json">` com schema `LocalBusiness` inline
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
  "coords": [38.7223, -9.1393],          // [lat, lng] — necessário para aparecer no mapa
  "horario": "Seg-Sex 9h-19h",
  "mostrar_no_mapa": true,               // false = excluído do site público
  "ultima_validacao": "2026-04-21",      // data ISO — usada no sitemap e nas páginas
  "status": "confirmado"
}
```

## Outros scripts em scripts/

| Script | Propósito |
|---|---|
| `build-directory-static.js` | Build principal — **este é o único que precisas correr** |
| `gerar-barbearias-limpo.js` | Transforma/limpa dados brutos em `barbearias.limpo.js` |
| `audit-barber-locations.js` | Auditoria de qualidade de localização |
| `audit-site-links.js` | Verifica links internos e perfis gerados |
| `smoke-missing-barbearias.js` | Smoke test: confirma que todos os slugs têm página gerada |

## SEO e schema markup

- Páginas de perfil (`barbearias/{slug}/`) têm JSON-LD `HairSalon` + `BreadcrumbList`
- Páginas de cidade (`cidades/{slug}/`) têm JSON-LD `CollectionPage` + `ItemList` + `BreadcrumbList`
- Homepage tem JSON-LD `WebSite` + `Organization` (estático) + `ItemList` de todas as barbearias (gerado pelo build)
- Cada item na lista estática da homepage tem JSON-LD `LocalBusiness` inline
- Sitemaps: `sitemap.xml` (índice) → `sitemap-barbearias.xml`, `sitemap-cidades.xml`, `sitemap-pages.xml`, `sitemap-loja.xml`, `sitemap-revista.xml`

### SEO dos perfis

O SEO dos perfis é gerado em `scripts/build-directory-static.js`, na função `buildProfileSeo(barber)`.

Ao mexer nesta área:
- manter `title` e `meta description` alinhados com os campos reais da barbearia;
- incluir cidade quando existe (`locativeLabel`);
- referir canais de contacto apenas quando existem (`telefone`, `booking`, `website`, `instagram`, `facebook`, `email`);
- referir horário apenas quando `barber.horario` existe;
- preservar `barber.name` no `h1`, `title`, schema e links;
- depois correr o build e verificar pelo menos um perfil com poucos dados e um perfil com vários contactos.

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

- `loja/` — loja de produtos, gerida por `scripts/sync-commerce-static.js`
- `revista/` — artigos editoriais, HTML manual
- `index.html` (hero, nav, footer, CSS, secção de destaques) — HTML manual, só os markers são atualizados pelo build
