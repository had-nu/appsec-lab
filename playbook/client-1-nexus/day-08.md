# Dia 08 — Geração e Revisão do Artefacto Art. 14

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** art14-artefact-template.json (final)

## Contexto narrativo

A Mariana decidiu que não vai notificar o CNCS hoje — a SQL injection está num ficheiro de exemplo que não está em produção e não há evidência de exploração ativa.

No entanto, quer o artefacto Art. 14 preparado para ser utilizado rapidamente se uma vulnerabilidade real aparecer. *"Prepara o template para podermos usar na hora. Se aparecer uma CVE real, não quero estar a descobrir o que preencher."*

## Tarefa(s) do dia

1. Preencher o art14-artefact-template.json com todos os campos obrigatórios
2. Para os campos opcionais, deixar notas sobre o que preencher em caso real
3. Validar que o template cobre os requisitos do Art. 14:
   - Descrição da vulnerabilidade
   - Produto afetado (versão)
   - Data de identificação
   - Medidas corretivas (se existirem)
   - Contacto do fabricante

## Artefactos

- `clients/nexus-dynamics/compliance/art14-artefact-template.json` (versão final preenchida)

## Pergunta de reflexão

O Art. 14 exige notificação ao CSIRT nacional E à ENISA (Agência Europeia)? Ou basta um?

<details>
<summary>Ver resposta</summary>

Basta um — o CSIRT nacional (em Portugal, o CNCS). O CRA diz que o fabricante notifica o
CSIRT do estado-membro onde está estabelecido. Cabe ao CSIRT nacional decidir se reencaminha
para a ENISA. No entanto, o Art. 14(7) permite à ENISA solicitar informações adicionais
se a vulnerabilidade tiver impacto cross-border. Na prática: notifica o CNCS, que coordena
com a ENISA se necessário. Não precisas de notificar ambos.
</details>
