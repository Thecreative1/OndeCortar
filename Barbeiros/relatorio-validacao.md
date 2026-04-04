# Relatorio de validacao das barbearias

Data da auditoria: `2026-04-04`

## Resumo

- Total de entradas: **73**
- Confirmadas: **43**
- Por validar: **20**
- Incompletas: **10**
- Sem coordenadas validas: **10**
- Com telefone invalido ou placeholder: **19**
- Com morada generica: **7**
- Escondidas do mapa (`mostrar_no_mapa: false`): **11**

## Notas da auditoria

- O ficheiro limpo nao inventa moradas, telefones, emails, websites, horarios nem coordenadas.
- Os unicos `fontes` incluidos sao URLs publicos que ja existiam no dataset legado.
- Entradas sem coordenadas validas ou com morada demasiado generica ficam fora do mapa publico.

## Entradas mais problematicas

- **Barbearia Açores Central**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Evandro Garcia**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Madeira Style**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia RickGino**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, nome_normalizado`
- **Barbearia Todi**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **CJ Barbearia**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **J.L Barber's Faro**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Alcácer do Sal**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Barreiro Elite**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Beja Moderna**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Bragança Classic**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Bueno**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords`
- **Barbearia Chaves**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Clássica Setúbal**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia do António**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
