# Relatório Editorial PT-PT

## Objetivo

Rever os textos repetidos do OndeCortar.pt para os tornar mais naturais, credíveis, claros e comerciais em português de Portugal, sem alterar a estrutura principal do site.

## Problemas revistos

- Preposições pouco naturais com cidades e localidades.
- Frases automáticas com tom mecânico ou demasiado gerado.
- Copy vaga, abstrata ou com excesso de linguagem de slogan.
- Blocos que explicavam pouco e atrasavam a ação principal.

## Regra editorial principal

As referências geográficas deixaram de usar uma regra cega. O frontend passa a usar uma tabela central de formas locativas em [`E:\GIT_HUB\OndeCortar\Barbeiros\barbearias-utils.js`](E:\GIT_HUB\OndeCortar\Barbeiros\barbearias-utils.js).

- Exceções e casos explícitos são definidos nessa tabela.
- Quando não existe exceção, o fallback continua a ser `em [Localidade]`.
- Isto evita erros como `em Porto` e mantém formas corretas como `no Porto`, `na Amadora` e `em Guimarães`.

## Tabela de formas locativas

| Localidade | Forma correta no frontend |
| --- | --- |
| Porto | no Porto |
| Guimarães | em Guimarães |
| Lisboa | em Lisboa |
| Braga | em Braga |
| Faro | em Faro |
| Coimbra | em Coimbra |
| Aveiro | em Aveiro |
| Leiria | em Leiria |
| Setúbal | em Setúbal |
| Évora | em Évora |
| Amadora | na Amadora |
| Nazaré | na Nazaré |
| Guarda | na Guarda |
| Covilhã | na Covilhã |
| Figueira da Foz | na Figueira da Foz |
| Barreiro | no Barreiro |
| Montijo | no Montijo |

## Templates revistos

### Páginas de cidade

- Titles, metas, H1 e descrições passam a usar a forma locativa correta.
- A introdução editorial ficou mais factual e menos automática.
- As contagens automáticas passaram a respeitar singular, plural e casos como `nenhuma ficha`.
- O bloco de apoio no fim liga de forma mais natural à loja e à revista.

### Perfis de barbearia

- As descrições automáticas passaram a soar mais naturais.
- A frase de contacto foi revista para evitar construções artificiais.
- Breadcrumbs, títulos, metas e blocos “outras barbearias” usam a localidade correta.

### Loja

- Heróis e notas comerciais ficaram mais diretos.
- Foram removidas várias frases vagas ou demasiado publicitárias.
- A ligação entre categoria, produto e revista ficou mais clara e menos “copy de slogan”.

### Revista

- Os textos de ligação entre artigo, categoria e produto foram revistos.
- Os clusters e blocos intermédios passaram a explicar melhor a utilidade prática.
- A copy ficou mais orientada à decisão e menos abstrata.

### Ligações entre diretório, loja e revista

- O texto de ponte entre áreas foi simplificado.
- O utilizador percebe mais cedo o próximo passo útil: ver perfil, ver categoria, ler guia ou abrir produto.

## Ficheiros centrais alterados

- [`E:\GIT_HUB\OndeCortar\Barbeiros\barbearias-utils.js`](E:\GIT_HUB\OndeCortar\Barbeiros\barbearias-utils.js)
- [`E:\GIT_HUB\OndeCortar\scripts\build-directory-static.js`](E:\GIT_HUB\OndeCortar\scripts\build-directory-static.js)
- [`E:\GIT_HUB\OndeCortar\commerce.js`](E:\GIT_HUB\OndeCortar\commerce.js)
- [`E:\GIT_HUB\OndeCortar\index.html`](E:\GIT_HUB\OndeCortar\index.html)

## Critérios editoriais aplicados

- Preferir frases curtas e úteis.
- Evitar linguagem promocional vazia.
- Usar verbos concretos: `ver`, `comparar`, `abrir`, `contactar`, `escolher`.
- Omitir construções artificiais quando o dado disponível é simples.
- Manter PT-PT natural, sobretudo em localidades e chamadas para ação.

## Resultado esperado

- Texto mais natural e mais profissional.
- Menos sinais de texto automático.
- Melhor coerência entre cidade, perfil, loja e revista.
- Melhor leitura rápida em títulos, descrições, CTAs e blocos de apoio.
