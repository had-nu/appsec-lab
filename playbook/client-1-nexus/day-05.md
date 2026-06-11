# Dia 05 — Wardex — Configuração e Primeiro Gate

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** wardex-config.yaml, wardex-vulns.yaml, kev-catalogue-stub.json

## Contexto narrativo

O Rui diz: *"Ok, percebemos que temos vulnerabilidades. Mas como é que decidimos se podemos ou não fazer um release? Hoje decidimos 'no feeling'. Precisamos de uma regra."*

É aqui que entra o Wardex como release gate. O Wardex não é mais um scanner — é o motor de decisão que consome os findings dos scanners que já correste e decide: ALLOW, WARN, ou BLOCK.

## Tarefa(s) do dia

1. Criar `wardex-config.yaml` com thresholds (0 críticas, máximo 2 high)
2. Criar `wardex-vulns.yaml` com os findings do SAST (mapeados do sample-vulnerable.js)
3. Criar `kev-catalogue-stub.json` (catálogo KEV simulado)
4. Correr `CLIENT=nexus-dynamics ./run.sh wardex` para testar o gate
5. Analisar o output do Wardex — qual foi a decisão?

## Artefactos

- `clients/nexus-dynamics/wardex/wardex-config.yaml`
- `clients/nexus-dynamics/wardex/wardex-vulns.yaml`
- `clients/nexus-dynamics/wardex/kev-catalogue-stub.json`
- `clients/nexus-dynamics/reports/wardex-report.json`

## Pergunta de reflexão

O Wardex bloqueou o release porque há uma critical (CWE-89 / SQLi com EPSS 0.92). Mas o Rui diz: "Isso é só um ficheiro de exemplo, nem sequer está em produção". Como respondes?

<details>
<summary>Ver resposta</summary>

Duas camadas de resposta. Primeiro, verifica se o código está ou não em produção — se o
`sample-vulnerable.js` é apenas um artefacto de treino, o finding não deve bloquear o
release real. Isto resolve-se no Wardex marcando `reachable: false` ou ajustando o
threshold. Segundo, se o código for real e estiver em produção, a pergunta do Rui é uma
tentativa de negociar risco. A resposta é: "Este ficheiro pode não estar em produção hoje,
mas está no repositório que alimenta a produção. Se alguém o copiar ou referenciar, o risco
existe. O gate está a fazer o trabalho dele: forçar-te a tomar uma decisão consciente sobre
este risco, documentá-la, e aceitá-la formalmente se for o caso."
</details>
