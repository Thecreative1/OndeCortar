# OndeCortar.pt — Instruções para agentes de IA

As instruções do projeto estão em **[CLAUDE.md](CLAUDE.md)**. Lê esse ficheiro antes de qualquer alteração — vale para Claude, Codex e qualquer outro agente.

Este ficheiro não repete as regras de propósito: era uma cópia do CLAUDE.md que ficou desatualizada (até 2026-10-11). Acrescentar regras novas só no CLAUDE.md.

O essencial, para quem não seguir o link:

- Fonte de dados: `Barbeiros/barbearias.limpo.js`. Depois de editar: `node scripts/build-directory-static.js`.
- Nunca editar à mão `barbearias/`, `cidades/`, `llms.txt`, `Barbeiros/barbearias.mapa.js` (gerados pelo build).
- Nunca correr `scripts/sync-commerce-static.js` nem `scripts/gerar-barbearias-limpo.js` (apagam conteúdo).
- Antes de mexer em URLs, títulos, descriptions, schema, sitemaps ou links internos: explicar o risco de indexação e esperar OK.
- `npm test` é o que o CI corre; tem de passar.
