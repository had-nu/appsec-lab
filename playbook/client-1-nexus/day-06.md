# Dia 06 — CI/CD — Integração do Pipeline

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** .github/workflows/cra-nexus.yml

## Contexto narrativo

O pipeline atual da Nexus Dynamics é básico: `npm test` e está feito. A Mariana quer algo que não bloqueie os developers mas que dê visibilidade.

Tu propões: um pipeline CRA com 7 jobs — pre-eval, sast, sca, iac, wardex-gate, compliance-check, report. O wardex-gate só falha (exit code != 0) se houver criticals ou actively exploited. WARN gera anotação mas não bloqueia.

## Tarefa(s) do dia

1. Criar `.github/workflows/cra-nexus.yml` com os 7 jobs
2. Definir dependências entre jobs (sast+sca → wardex-gate → compliance-check)
3. Documentar para o Rui como testar o pipeline localmente com `act`

## Artefactos

- `.github/workflows/cra-nexus.yml`

## Pergunta de reflexão

Se o wardex-gate bloquear o merge mas o dev estiver a meio de uma feature, o que acontece ao trabalho dele?

<details>
<summary>Ver resposta</summary>

Depende da decisão de design que tomaste. Se o gate for configurado para bloquear o merge
(proteção de branch), o dev não consegue fazer merge até o gate passar ou alguém aceitar
o risco formalmente. Isto é ok se o gate for rápido (< 2 min). Se for lento, os devs vão
contorná-lo (merge bypass, desativar o gate, ou ignorar os alerts). A recomendação é:
inicialmente, o gate corre mas não bloqueia — só gera um comentário no PR com o resultado.
Depois de 2-3 semanas de maturação, ativas o bloqueio. Isto dá tempo para a equipa aprender
a interpretar e resolver findings sem criar atrito.
</details>
