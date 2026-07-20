---
target: loja/index.html
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-07-20T11-39-27Z
slug: loja-index-html
---
# Critique — loja/index.html (2026-07-20)

## Design Health Score

| # | Heurística | Score | Problema-chave |
|---|-----------|-------|-----------|
| 1 | Visibilidade do estado | 3 | Nav marca página atual; sem estados assíncronos relevantes |
| 2 | Correspondência com o mundo real | 3 | Copy excelente em PT; mas pack shots com texto em espanhol ("9 en 1", "Perfilado clásico y preciso") |
| 3 | Controlo e liberdade | 3 | Links Amazon em nova aba, bem identificados |
| 4 | Consistência e standards | 2 | Três sistemas de navegação sobrepostos; acentos gold/verde sem lógica única |
| 5 | Prevenção de erros | 4 | "Quando não escolher" é prevenção de erro de compra genuinamente excelente |
| 6 | Reconhecimento vs. memória | 2 | Mesmos 4 produtos em 2 secções; 6 destinos duplicados entre "por uso" e "categorias" |
| 7 | Flexibilidade e eficiência | 3 | Âncoras no hero; múltiplos caminhos (em excesso) |
| 8 | Estética e design minimalista | 2 | 26 cartões, 4894px desktop / 12.702px mobile, monotonia de grelhas |
| 9 | Recuperação de erros | 3 | n/a na prática (página estática sem formulários) |
| 10 | Ajuda e documentação | 3 | Disclosure de afiliados claro, FAQ, contexto inline |
| **Total** | | **28/40** | **Good — base sólida, atacar os pontos fracos** |

## Veredicto anti-padrões

**LLM**: Não é slop óbvio — a paleta (papel creme + verde-oliva + dourado) e sobretudo o copy têm identidade real. Mas a estrutura é template: 5 secções idênticas (eyebrow uppercase + h2 + parágrafo + grelha de cartões), cartões todos do mesmo tamanho, hero só de texto numa loja de produtos físicos. Padrões banidos presentes: `border-left: 2px` como acento em `.loja-quick-avoid` (side-stripe), eyebrow repetido como gramática de secção em todas as 5 secções.

**Scan determinístico**: indisponível — o motor `detector/detect-antipatterns.mjs` não existe na instalação da skill (tentativa real, erro registado). Evidência substituída por medições manuais no browser (contraste computado, contagem de duplicados, dimensões de imagens, altura de página).

**Browser**: screenshots do painel falharam por timeout do renderer (4 tentativas); overlay visual não injetado (sem detector para servir). Fallback: screenshot fornecido pelo utilizador + inspeção DOM/estilos computados em desktop (1280px) e mobile (375px).

## Impressão geral

A página está bem escrita e mal editada. O copy é dos melhores que se vê em lojas de afiliados PT ("Escolhe menos. Acerta melhor.", "Quando não escolher") mas a estrutura contradiz a promessa: promete "sem listas infinitas" e entrega 26 cartões em 12.700px de scroll mobile, com os mesmos 4 produtos duas vezes e 6 destinos repetidos. A maior oportunidade única: **editar a página como o copy foi editado** — fundir redundâncias e tratar as imagens.

## O que funciona

1. **Copy com voz própria** — "Quando não escolher" em cada quick-pick é honestidade rara em afiliados; constrói confiança e diferencia.
2. **Hero dark editorial** — o painel escuro `#1F1B16` com dourado sobre o papel creme é uma decisão comprometida que dá peso à entrada.
3. **Transparência** — "Ver preço na Amazon.es" (em vez de fingir loja própria) + secção de disclosure no fim.

## Problemas prioritários

- **[P1] Os mesmos 4 produtos aparecem duas vezes** — "Em destaque" (com foto) e "Escolhas rápidas" (sem foto) são a mesma lista: Braun AIO5545, Viking Sandalwood, King C., Beardburys. Confirmação DOM: `sameProducts: true`. O utilizador pergunta "já vi isto?" e a página fica um ecrã inteiro mais longa sem informação nova. **Fix**: fundir numa secção — cartões de destaque com foto + o bloco "Quando não escolher" integrado. Corta ~25% da página. Comando: `distill`.
- **[P1] Três sistemas de navegação para os mesmos 12 destinos** — "Escolhe pelo uso" (6 cartões) e "Por categoria" (12 cartões) partilham 6 URLs; "Quero barbear à clássica" e "Navalhas e lâminas" vão ao mesmo sítio com nomes diferentes. A grelha de categorias ainda repete thumbnails (braun, viking, wahl, beardburys ×2 cada). **Fix**: manter "por uso" como navegação rica; reduzir categorias a uma lista/chips compacta com contagens, sem imagens. Comando: `distill` + `layout`.
- **[P1] Imagens de produto sem direção de arte** — mistura de pack shots com caixa (Braun, com "9 en 1" em espanhol), lifestyle (King C. com banner "PERFILADO CLÁSICO Y PRECISO" em espanhol), e thumbs de baixa resolução (zilberhaar 151×300px, viking-barba-kit 257×300px) esticados em cartões; ratios de 0.37 a 1.19 com `object-fit: contain` deixam latas magras a flutuar em espaço vazio. É o fator nº1 do aspeto "menos bonito". **Fix**: substituir imagens com texto ES e as de baixa resolução; uniformizar fundo/enquadramento dos thumbs. Comando: `polish` (trabalho de assets).
- **[P2] Hero sem imagem** — loja de produtos físicos, registo brand, e o hero é só tipografia num painel escuro. O registo pede imagem (still-life de ferramentas, produto em destaque) no lado direito do painel. Comando: `bolder`.
- **[P2] Contrastes abaixo de AA** — trust line do hero `rgba(242,235,224,0.4)` ≈ 3.4:1; `.loja-uso-desc` `rgba(220,210,195,0.62)` sobre verde-escuro ≈ 3.7:1; dourado `#a6772d` em fundos claros ≈ 3.5:1 em texto de 0.72–0.8rem. Comando: `polish`.
- **[P2] Mobile: 12.702px de altura** — 15+ ecrãs de scroll com cartões empilhados 1 coluna. Resolve-se em grande parte com as fusões acima. Comando: `adapt`.

## Persona red flags

**Casey (mobile distraído)**: 15 ecrãs de scroll; 8 botões "Ver preço na Amazon.es" idênticos tornam-se ruído; nunca chega às categorias. Touch targets ok (≥42px).

**Jordan (primeira visita)**: não distingue "Escolhe pelo uso" de "Por categoria" de "Escolhas rápidas"; clica em "Quero barbear à clássica", volta atrás, clica "Navalhas e lâminas" e aterra na mesma página — sente que andou em círculos.

**Cliente OndeCortar (homem 20-55, quer resposta prática, tratado por tu)**: o topo responde-lhe bem ("qual compro? → estes 4, e porquê") mas a repetição a seguir mina a promessa "sem listas infinitas"; as fotos com espanhol e thumbs pixelados baixam a confiança na curadoria.

## Observações menores

- `nav-cta` "Ver melhores opções" aponta para a própria loja quando já se está na loja.
- Footer: `<a>Sobre</a><a>FAQ</a>` colados no código (o flex gap salva, mas é frágil).
- Eyebrow + h2 + p idênticos em 5 secções: variar a apresentação de pelo menos uma secção quebrava a monotonia.
- Imagens todas com peso razoável exceto duplicação de downloads evitada pelo browser; lazy-loading correto.

## Perguntas provocadoras

- E se a página inteira coubesse em 3 secções: hero, "os 4 que interessam" (com o porquê e o quando-não), e "encontra o teu caminho" (uso + categorias fundidos)?
- O que aconteceria se cada categoria tivesse uma foto própria, tirada com a mesma luz e o mesmo fundo, como uma montra de barbearia?
- A promessa "Escolhe menos" está no hero — a página abaixo cumpre-a?
