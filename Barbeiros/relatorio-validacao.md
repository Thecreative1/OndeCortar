# Relatorio de validacao das barbearias

Data da auditoria: `2026-04-05`

## Resumo

- Total de entradas: **234**
- Confirmadas: **208**
- Por validar: **23**
- Incompletas: **3**
- Sem coordenadas validas: **3**
- Com telefone invalido ou placeholder: **19**
- Com morada generica: **7**
- Escondidas do mapa (`mostrar_no_mapa: false`): **7**

## Notas da auditoria

- O ficheiro limpo nao inventa moradas, telefones, emails, websites, horarios nem coordenadas.
- Os unicos `fontes` incluidos sao URLs publicos que ja existiam no dataset legado.
- Entradas sem coordenadas validas ou com morada demasiado generica ficam fora do mapa publico.

## Entradas mais problematicas

- **Barbearia Açores Central**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Madeira Style**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Todi**: status `incompleto`, qualidade `baixa`, problemas `status_incompleto, sem_coords, morada_generica`
- **Barbearia Alcácer do Sal**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Barreiro Elite**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Beja Moderna**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Bragança Classic**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Chaves**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Clássica Setúbal**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia da Vila**: status `por_validar`, qualidade `baixa`, problemas `status_por_validar, morada_generica`
- **Barbearia do António**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Grândola Clássica**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Milénio**: status `por_validar`, qualidade `baixa`, problemas `status_por_validar, morada_generica`
- **Barbearia Monte Cristo**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
- **Barbearia Montijo Urbana**: status `por_validar`, qualidade `media`, problemas `status_por_validar, telefone_invalido`
