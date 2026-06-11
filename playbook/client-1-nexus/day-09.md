# Dia 09 — Anexo VII — Preenchimento

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** annex-vii.md (final)

## Contexto narrativo

O Anexo VII é o documento técnico mínimo que qualquer fabricante CRA precisa de ter. Não é um documento de 100 páginas — é um template relativamente curto que descreve: o produto, a arquitetura, os componentes de segurança, a avaliação de risco, e o ciclo de vida de vulnerabilidades.

A Mariana diz: *"Isto parece burocrático. Não podemos usar o README?"*

Tu explicas que o Anexo VII é um requisito legal. O README é para developers. O Anexo VII é para auditores e autoridades.

## Tarefa(s) do dia

1. Preencher todos os campos do template annex-vii.md
2. Validar que cada secção está completa e clara
3. Adicionar informação sobre:
   - Período de apoio (5 anos para SaaS)
   - Procedimento de notificação de vulnerabilidades

## Artefactos

- `clients/nexus-dynamics/compliance/annex-vii.md` (versão final)

## Pergunta de reflexão

O Anexo VII é confidencial ou público?

<details>
<summary>Ver resposta</summary>

O Anexo VII é confidencial. O CRA distingue entre a documentação técnica (Anexo VII) e a
declaração de conformidade UE (Anexo V). O Anexo V é público. O Anexo VII é mantido pelo
fabricante e disponibilizado às autoridades mediante solicitação (Art. 31). Isto significa
que o Anexo VII não precisa de estar publicamente acessível, mas precisa de estar completo
e disponível quando solicitado. Para um cliente SaaS como a Nexus Dynamics, o Anexo VII
deve viver no repositório interno, não no repositório público.
</details>
