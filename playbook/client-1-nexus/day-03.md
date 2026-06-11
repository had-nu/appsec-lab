# Dia 03 — Kickoff e Avaliação Inicial

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** Actas de kickoff (informal)

## Contexto narrativo

Reunião de kickoff com a Mariana (CTO) e o Rui (dev sénior, único developer da equipa). A Nexus Dynamics tem 40 pessoas, mas a equipa de produto é 5 developers.

O Rui mostra-te o repositório. É uma app Node.js (Express) com MySQL. Não há testes de segurança. O pipeline GitHub Actions corre lint e testes unitários — e nada mais.

O Rui diz: *"Nós sabemos que o código não é perfeito. Mas honestamente, nunca ninguém nos disse o que estávamos a fazer mal. Vamos ver o que aparece."*

## Tarefa(s) do dia

1. Explorar o repositório e a estrutura do código
2. Executar o lab setup (verificar que `run.sh sast` funciona)
3. Rever o src/sample-vulnerable.js e identificar as 6 CWEs visíveis
4. Alinhar expectativas: o lab corre em containers, os reports são JSON, cada scanner tem o seu foco

## Artefactos

- `src/sample-vulnerable.js` (análise visual inicial)
- Reports do SAST (semgrep.json + bearer.json via `./run.sh sast`)

## Pergunta de reflexão

Num cliente com 5 developers e sem histórico de segurança, por onde começarias a construir o programa de AppSec? Pela ferramenta, pelo processo, ou pela cultura?

<details>
<summary>Ver resposta</summary>

Pela cultura e pelo processo, não pela ferramenta. Se instalares um SAST sem preparares a
equipa para interpretar findings, vais gerar ruído e descredibilizar a segurança. O Rui
precisa de saber: (1) o que é um falso positivo, (2) como priorizar, (3) como corrigir sem
introduzir regressões. A ferramenta é um meio, não o fim. Estratégia recomendada: começa
com SAST em modo "só advisory" (não bloqueia PRs), faz pairing para as primeiras correções,
e só passas a gate depois de 2-3 semanas de maturação.
</details>
