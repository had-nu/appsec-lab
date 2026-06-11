# Dia 10 — Revisão com Cliente — Gaps e Aceitações

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** Gap analysis, Risk acceptance log

## Contexto narrativo

Reunião de revisão com a Mariana e o Rui. Apresentas o estado atual:

- SAST configurado e a correr no pipeline
- SCA semanal
- Wardex gate configurado
- Artefacto Art. 14 preparado
- Anexo VII preenchido

Gaps identificados:
- Sem VDP (Vulnerability Disclosure Policy) formal
- Sem SBOM
- Sem testes de penetração

A Mariana diz: *"O VDP parece coisa de empresa grande. Nós somos 40 pessoas, recebemos 3 emails por dia. Quem é que vai gerir reportes de vulnerabilidades?"*

## Tarefa(s) do dia

1. Apresentar a gap analysis para a Mariana
2. Para cada gap, decidir: aceitar, mitigar, ou transferir
3. Documentar as decisões no risk acceptance log
4. Para o VDP, explicar que mesmo PMEs precisam de um processo minimamente documentado (Art. 13(5))

## Artefactos

- `clients/nexus-dynamics/reports/gap-analysis.md`
- `clients/nexus-dynamics/reports/risk-acceptance-log.md`

## Pergunta de reflexão

Qual é o critério para aceitar um risco vs. remediá-lo?

<details>
<summary>Ver resposta</summary>

Regra prática: aceita-se um risco quando o custo da remediação excede o impacto esperado
do incidente, E o impacto não ameaça a continuidade do negócio. Mas atenção: há riscos que
não podem ser aceites por razões legais/compliance — por exemplo, não ter um VDP pode ser
uma violação do Art. 13(5) do CRA, independentemente do custo. Nestes casos, a aceitação
não é uma opção. A decisão de aceitação deve ser documentada com: (1) o risco identificado,
(2) o impacto estimado, (3) a justificação para aceitar, (4) o owner do risco, (5) uma data
de revisão. Isto protege o cliente e a consultora.
</details>
