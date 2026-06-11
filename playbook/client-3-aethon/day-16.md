# Dia 16 — Notified Body (Parte II) — Análise de Alternativas
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** nb_alternativas.md, nb_matriz_decisao.md

## Contexto narrativo

Tens 3 cenários na mesa. Cenário A: esperar os 6 meses com o ON atual, lançamento em Junho do próximo ano. Cenário B: ON alternativo (2 meses de fila, 30% mais caro). Cenário C: modularizar o produto para submeter apenas o módulo core primeiro. O CTO quer o Cenário C porque "lançamos o core em Dezembro e o resto depois." A CISO pergunta "e o risco regulatório?" O CFO pergunta "quanto custa cada cenário?"

## Tarefa(s) do dia

1. Detalhar cada cenário com prazos, custos e riscos
2. Analisar a viabilidade legal da modularização (Cenário C)
3. Apresentar a matriz de decisão aos 3 stakeholders
4. Documentar a decisão e o rationale

## Artefactos

- `client-3-aethon/artefacts/nb_alternativas.md`
- `client-3-aethon/artefacts/nb_matriz_decisao.md`

## Pergunta de reflexão

A modularização do produto pode ser considerada "gaming the system"?

<details>
<summary>Ver resposta</summary>
Depende da honestidade da divisão. Se o "módulo core" for uma fração artificial do produto (ex.: 90% da funcionalidade), o ON pode considerar a modularização abusiva e rejeitar. A divisão deve refletir uma separação arquitetural real, com interfaces bem definidas. Se for legítima, é uma estratégia válida e eficaz.
</details>
