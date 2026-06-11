# Dia 07 — KEV Correlation — Deteção Art. 14

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** KEV correlation report

## Contexto narrativo

O Art. 14 do CRA diz que o fabricante deve notificar o CSIRT nacional (em Portugal, o CNCS) no prazo de 24h após tomar conhecimento de uma vulnerabilidade ativamente explorada.

O wardex report mostra que a CWE-89 (SQL injection) tem um EPSS de 0.92 — quase 92% de probabilidade de estar a ser ativamente explorada. O teu KEV catalogue stub confirma que há CVE conhecidas para SQL injection em produtos similares.

A Mariana pergunta: *"Temos de notificar o CNCS hoje?"*

## Tarefa(s) do dia

1. Correr o Wardex gate e verificar o status
2. Comparar findings com o KEV catalogue
3. Se houver match com KEV + EPSS alto → disparar procedimento Art. 14
4. Preencher o template art14-artefact-template.json (em modo draft)
5. Discutir com a Mariana se a notificação é obrigatória neste caso

## Artefactos

- `clients/nexus-dynamics/compliance/art14-artefact-template.json` (preenchido)
- Análise de correlação KEV

## Pergunta de reflexão

O Art. 14 diz "conhecimento" (knowledge). Se o Wardex te diz que um EPSS é 0.92, isso conta como "conhecimento" para efeitos legais?

<details>
<summary>Ver resposta</summary>

Juridicamente, sim — se tens um instrumento técnico (Wardex) que te dá um sinal forte de
exploração ativa (EPSS > 0.9 + KEV match), e optas por não investigar, isso pode ser
considerado "willful blindness" (cegueira deliberada). O CRA não exige certeza absoluta —
exige que o fabricante atue com diligência. O EPSS não prova exploração ativa, mas é um
indicador suficientemente forte para justificar uma investigação. Se a investigação
confirmar o cenário, a notificação ao CNCS deve ser feita em 24h. Se não confirmar,
documentas a decisão de não notificar com a justificação técnica. O que não podes fazer
é ignorar o alerta.
</details>
