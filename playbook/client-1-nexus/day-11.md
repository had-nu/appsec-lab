# Dia 11 — Relatório Final e Apresentação

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** Relatório final, Apresentação

## Contexto narrativo

Último dia técnico. A Mariana pediu um relatório executivo para apresentar ao CEO. O CEO não quer saber de CWEs nem de CVSS — quer saber: "Estamos seguros? Vamos ser multados pelo CRA? Quanto custa resolver?"

## Tarefa(s) do dia

1. Produzir relatório final com:
   - Sumário executivo (1 página para o CEO)
   - Findings categorizados por risco de negócio
   - Roadmap de remediação (priorizado, com estimativas de esforço)
   - Estado de conformidade CRA (artigo por artigo)
2. Preparar apresentação de 10 slides para a reunião de encerramento

## Artefactos

- `clients/nexus-dynamics/reports/relatorio-final.md`
- `clients/nexus-dynamics/reports/apresentacao-final.md`

## Pergunta de reflexão

A apresentação final tem um slide que diz: "Risco residual: MÉDIO". A Mariana pergunta: "Isto significa que estamos a médio risco de ser multados?" Como respondes?

<details>
<summary>Ver resposta</summary>

Não. "Risco residual médio" significa que depois de implementares os controlos recomendados
(SAST, Wardex, etc.), o risco que sobra (o que não consegues mitigar) é médio. Não é o
risco de multa — é o risco de segurança. A multa por não conformidade CRA é uma métrica
diferente: depende de (1) estares registado como fabricante, (2) teres a documentação
técnica em dia, (3) teres o processo de notificação. Se o cliente implementar o roadmap,
o risco de multa por omissão é baixo. O risco residual médio é sobre o que um atacante
consegue fazer apesar dos controlos. São camadas diferentes de risco — e deves explicar
ambas para não gerar confusão.
</details>
