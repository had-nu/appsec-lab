# Dia 21 — Redação de Relatórios (Parte I) — 3 Audiências
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** relatorio_ciso.md, relatorio_cto.md, relatorio_cfo.md

## Contexto narrativo

O dossiê foi submetido ao ON. Agora começa o trabalho de redação dos relatórios finais. Não é um relatório — são três. Cada stakeholder precisa de uma versão adaptada ao seu contexto. A CISO quer detalhes técnicos e evidências. O CTO quer recomendações acionáveis para a equipa de engenharia. O CFO quer custos, ROI, e riscos financeiros. Três documentos, três linguagens, uma verdade.

## Tarefa(s) do dia

1. Redigir relatório para a CISO: foco em conformidade e controlos
2. Redigir relatório para o CTO: foco em melhorias técnicas e dívida técnica
3. Redigir relatório para o CFO: foco em custos, multas evitadas, e valor da certificação
4. Garantir consistência dos dados entre os três relatórios

## Artefactos

- `client-3-aethon/artefacts/relatorio_ciso.md`
- `client-3-aethon/artefacts/relatorio_cto.md`
- `client-3-aethon/artefacts/relatorio_cfo.md`

## Pergunta de reflexão

Qual o risco de ter três relatórios diferentes para três audiências?

<details>
<summary>Ver resposta</summary>
O risco é inconsistência: se os dados diferirem entre relatórios, a confiança do cliente é destruída. A CISO pode comparar o relatório dela com o do CFO e detetar discrepâncias. A solução é ter uma única base de dados (single source of truth) e três views diferentes — filtros, não versões diferentes.
</details>
