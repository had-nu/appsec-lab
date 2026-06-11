# Dia 08 — Wardex Gate com SBOM (Continuação)
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** pipeline refinado, relatório de blocking issues, dashboard

## Contexto narrativo
Após 24 horas com o wardex gate em modo "warn", os primeiros relatórios chegam. 6 builds foram sinalizadas — 4 por licenças incompatíveis (GPLv3 num componente proprietário), 2 por versões inconsistentes. A equipa de engenharia percebeu que o gate é útil: encontrou erros que teriam passado para produção. O Miguel ainda está desconfiado, mas vê utilidade prática.

## Tarefa(s) do dia
Analisar os blocking issues do primeiro dia. Ajudar a equipa a corrigir as licenças e versões. Refinar as regras do gate com base no feedback. Configurar dashboard de monitorização.

## Artefactos
- `wardex-gate-day1-report.md` — Reporte de blocking issues do primeiro dia
- `wardex-dashboard-config.md` — Configuração do dashboard Wardex

## Pergunta de reflexão
O que fazer quando um componente legado tem uma licença incompatível e não há substituto?
<details>
<summary>Ver resposta</summary>
Documentar a exceção formalmente com justificação técnica e comercial (Art. 5 — proporcionalidade). Isolar o componente do resto do produto sempre que possível. Incluir no SBOM com uma nota de licença pendente. Se o componente é GPLv3 e o produto é proprietário, pode ser necessário reescrever o componente ou mudar a licença do produto. Mas para IIoT crítico, por vezes a única opção prática é documentar o risco e aceitar a exceção — desde que devidamente autorizada pela gestão.
</details>
