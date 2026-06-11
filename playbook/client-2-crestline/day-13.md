# Dia 13 — Avaliação de Risco na Cadeia de Fornecimento
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** relatório de supply chain risk, matriz de dependências críticas

## Contexto narrativo
A Crestline compra componentes a 23 fornecedores diferentes: chips, módulos Wi-Fi, sensores, conectores. Durante a análise de risco da cadeia de fornecimento, descobres que o chip Wi-Fi (fornecido por um distribuidor chinês) tem um backdoor de firmware conhecido. O fornecedor do RTOS personalizado não responde a pedidos de atualização há 3 anos. A equipa de compras nunca incluiu cláusulas de segurança nos contratos.

## Tarefa(s) do dia
Mapear a cadeia de fornecimento de software e hardware. Identificar fornecedores críticos, componentes com suporte terminado, e riscos geopolíticos. Propor critérios de avaliação de fornecedores (SSDF, ISO 28000). SUGERIR cláusulas contratuais.

## Artefactos
- `supply-chain-risk-report.md` — Matriz de risco da cadeia de fornecimento
- `vendor-security-assessment-template.md` — Template de avaliação de fornecedor

## Pergunta de reflexão
Como gerir um componente crítico cujo fornecedor faliu ou deixou de o suportar?
<details>
<summary>Ver resposta</summary>
Documentar no SBOM como componente sem suporte. Avaliar se pode ser substituído por um equivalente (compatível a nível de pinout e protocolo). Se for insubstituível, o risco de usar um componente EOL tem de ser aceite pela gestão e comunicado aos clientes. Para produtos novos, criar uma regra: nenhum componente pode ser selecionado sem garantia de suporte mínimo de 5 anos. Para produtos existentes, considerar redesign do hardware se o componente é crítico para a segurança.
</details>
