# Dia 04 — SAST/SCA/IaC — Análise de Findings

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** Análise de findings SAST + SCA + IaC

## Contexto narrativo

Correste o SAST, SCA e IaC. O Semgrep devolveu findings. O Trivy encontrou CVEs nas dependências. O Checkov detetou más práticas no Dockerfile e docker-compose.

A Mariana pergunta: *"Isto é muito. O que é que é grave a sério?"*

## Tarefa(s) do dia

1. Correr `./run.sh sast`, `./run.sh sca`, `./run.sh iac`
2. Abrir reports no diretório `reports/`
3. Classificar cada finding em: **Crítico** (explorável remotamente, sem auth, com impacto financeiro), **Alto** (explorável mas requer condições), **Médio** (requer acesso ou configuração específica), **Informativo**
4. Preparar uma tabela de prioridades para apresentar à Mariana (não mais de 10 linhas — gestão não lê mais que isso)

## Artefactos

- `reports/semgrep.json`, `reports/bearer.json`, `reports/trivy-fs.json`
- Tabela de prioridades (criar em `clients/nexus-dynamics/reports/prioridades.md`)

## Pergunta de reflexão

Se tiveres 15 minutos com a CTO para apresentar findings, quais são os 3 que mostras?

<details>
<summary>Ver resposta</summary>

1. SQL injection (CWE-89) — crítica, explorável, sem auth, acesso total à BD
2. Hardcoded credentials (CWE-798) — risco de supply chain se o repo for exposto
3. Missing Secure flag (CWE-614) — risco de session hijacking, mas requer acesso à rede

Estes 3 são compreensíveis para um gestor: "dão acesso aos dados", "expõem credenciais",
"sequestro de sessão". Os restantes (MD5, path traversal, base64 token) são detalhes
técnicos que entram no relatório escrito mas não na conversa de 15 minutos.
</details>
