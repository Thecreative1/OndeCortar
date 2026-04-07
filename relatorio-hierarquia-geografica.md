# Relatório de hierarquia geográfica

Gerado em 2026-04-07T13:55:51.555Z.

## Resumo

- Fichas auditadas: 199
- Fichas que precisam de contexto geográfico explícito: 71
- Páginas de cidade auditadas: 79
- Páginas de cidade que precisam de contexto adicional: 38

## Regras aplicadas no frontend

- Páginas de cidade: contexto administrativo visível no topo e no resumo quando concelho ou distrito diferem da cidade
- Cards de barbearias: hierarquia geográfica mostrada com rótulos em vez de chips indistintos
- Filtros e pesquisa: filtros rápidos continuam focados em cidade e deixam distrito/concelho fora dos chips rápidos
- Chips e resumos: os chips principais deixam de misturar níveis administrativos sem rótulo
- Textos automáticos: as descrições automáticas passam a respeitar cidade, concelho, distrito e zona
- Breadcrumbs: mantêm a hierarquia do site e deixam a hierarquia administrativa para os blocos estruturados

## Exemplos de fichas que exigem contexto

- Barbearia Pereira – Águeda -> Cidade: Águeda | Distrito: Aveiro (city_needs_district_context)
- Barbearia Moura – Espinho -> Cidade: Espinho | Distrito: Aveiro (city_needs_district_context)
- Barbearia Silvério – Ovar -> Cidade: Ovar | Distrito: Aveiro (city_needs_district_context)
- Barbearia Lima – São João da Madeira -> Cidade: S. João da Madeira | Concelho: São João da Madeira | Distrito: Aveiro (city_needs_municipality_context, city_needs_district_context)
- Barbearia Fafense -> Cidade: Fafe | Distrito: Braga (city_needs_district_context)
- Barbershop DuArt -> Cidade: Fafe | Distrito: Braga (city_needs_district_context)
- 1920 Barber Shop -> Cidade: Guimarães | Distrito: Braga (city_needs_district_context)
- Black Rock Barbearia -> Cidade: Guimarães | Distrito: Braga (city_needs_district_context)
- NewVision Barbershop -> Cidade: Guimarães | Distrito: Braga (city_needs_district_context)
- The Barbers Studio -> Cidade: Guimarães | Distrito: Braga (city_needs_district_context)
- Treze Barbershop -> Cidade: Guimarães | Distrito: Braga (city_needs_district_context)
- Danniel Sampaio Barbearia -> Cidade: Vila Nova de Famalicão | Distrito: Braga (city_needs_district_context)

## Exemplos de páginas de cidade revistas

- Águeda -> Cidade: Águeda | Distrito: Aveiro (page_needs_district_context)
- Albufeira -> Cidade: Albufeira | Distrito: Faro (page_needs_district_context)
- Alcácer do Sal -> Cidade: Alcácer do Sal | Distrito: Setúbal (page_needs_district_context)
- Almada -> Cidade: Almada | Distrito: Setúbal (page_needs_district_context)
- Amadora -> Cidade: Amadora | Distrito: Lisboa (page_needs_district_context)
- Barreiro -> Cidade: Barreiro | Distrito: Setúbal (page_needs_district_context)
- Caldas da Rainha -> Cidade: Caldas da Rainha | Distrito: Leiria (page_needs_district_context)
- Chaves -> Cidade: Chaves | Distrito: Vila Real (page_needs_district_context)
- Covilhã -> Cidade: Covilhã | Distrito: Castelo Branco (page_needs_district_context)
- Espinho -> Cidade: Espinho | Distrito: Aveiro (page_needs_district_context)
- Fafe -> Cidade: Fafe | Distrito: Braga (page_needs_district_context)
- Falagueira-Venda Nova Amadora -> Cidade: Falagueira-Venda Nova Amadora | Concelho: Amadora | Distrito: Lisboa (page_needs_municipality_context, page_needs_district_context)

## Nota

A auditoria passa agora a separar explicitamente cidade, concelho, distrito e zona. Quando o valor muda de nível administrativo, a apresentação pública deve usar rótulos como `Cidade:`, `Concelho:` e `Distrito:` em vez de chips indistintos.