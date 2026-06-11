# Dia 10 — Wardex Gate — Thresholds Strictos
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** wardex_gate_report.md, wardex_exceptions.md

## Contexto narrativo

O Wardex Gate é o momento da verdade. Todas as análises convergem para um único score composto que decide se o produto avança para a fase seguinte. Para Classe II, os thresholds são implacáveis: zero Critical, zero High, zero Medium não mitigado. O CTO diz "isto vai bloquear-nos." Tu respondes: "esse é o objetivo — bloquear produtos inseguros antes de chegarem ao mercado."

## Tarefa(s) do dia

1. Executar o Wardex Gate para os 3 produtos core
2. Analisar resultados contra thresholds Classe II
3. Documentar exceções técnicas com justificação e risco aceite
4. Decidir: GO / NO-GO / GO with conditions

## Artefactos

- `client-3-aethon/artefacts/wardex_gate_report.md`
- `client-3-aethon/artefacts/wardex_exceptions.md`

## Pergunta de reflexão

Qual a diferença entre um GO with conditions e um NO-GO no Wardex?

<details>
<summary>Ver resposta</summary>
GO with conditions significa que o produto avança mas com compromissos formais de remediação num prazo definido (ex.: resolver 3 Medium em 30 dias). NO-GO significa que o produto não pode avançar até que todos os blockers sejam resolvidos — ou seja, o cronograma para e o CTO tem de reportar à gestão. Para Classe II, apenas GO ou GO with conditions são aceitáveis; NO-GO aciona escalada ao organismo notificado.
</details>
