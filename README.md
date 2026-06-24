# Application Security Playground

Lab de prática AppSec para desenvolvimento de competências de análise, com extensão
CRA (Cyber Resilience Act) para simulação de engagements de consultoria em conformidade.

O objectivo *não* é aprender a operar ferramentas. É aprender a extrair inteligência do
output dessas ferramentas e converter essa inteligência em decisões de risco — que é
exactamente o que se espera de um Especialista AppSec Sénior num contexto regulado
(DORA/ISO 27001/CRA).

---

## Configuração

### Pré-requisitos

- **Docker Engine** (≥ 24.0)
- **Docker Compose v2**
- **~4 GB de espaço em disco**

### Setup

```bash
git clone <url-do-repo>
cd appsec-lab
chmod +x run.sh
```

---

## Comandos de Execução

### Scanners per-cliente

```bash
CLIENT=nexus-dynamics ./run.sh sast      # Semgrep + Bearer contra src/<CLIENT>/
CLIENT=nexus-dynamics ./run.sh sca       # Trivy filesystem scan de src/<CLIENT>/
CLIENT=nexus-dynamics ./run.sh iac       # Trivy config + Checkov
CLIENT=nexus-dynamics ./run.sh all       # Pipeline completo (sast + sca + iac + wardex)
CLIENT=nexus-dynamics ./run.sh wardex    # Wardex release gate CRA
CLIENT=nexus-dynamics ./run.sh cra-check # Verifica artefactos CRA
CLIENT=nexus-dynamics ./run.sh compliance-report  # Sumário de conformidade
./run.sh report          # Sumário de findings
./run.sh down            # Desmonta containers
```

Clientes disponíveis: `nexus-dynamics`, `crestline-systems`, `aethon-security`.
Para each cliente, o código-fonte simulado está em `src/<cliente>/`.

---

## Estrutura do Projeto

```
appsec-lab/
├── docker-compose.yml        ← Orquestração de scanners + Wardex
├── Dockerfile.wardex         ← Build multi-stage do Wardex
├── run.sh                    ← Script de execução
├── .github/workflows/
│   ├── ci.yml                ← CI base
│   ├── cra-nexus.yml         ← Pipeline Cliente 1
│   ├── cra-crestline.yml     ← Pipeline Cliente 2
│   └── cra-aethon.yml        ← Pipeline Cliente 3
├── src/
│   ├── nexus-dynamics/       ← NexusFlow v2.3 (SaaS, 14 CWEs)
│   ├── crestline-systems/    ← EdgeSentry v1.4 (IIoT, 15 CWEs)
│   └── aethon-security/      ← AethonShield v3.1 (SIEM, 17 CWEs)
├── clients/
│   ├── nexus-dynamics/       ← Cliente 1 (12 dias)
│   ├── crestline-systems/    ← Cliente 2 (18 dias)
│   └── aethon-security/      ← Cliente 3 (25 dias)
│       ├── CONTRACT/         ← Proposta, contrato, recibo
│       ├── wardex/           ← Config, vulns, SBOM check, KEV
│       ├── compliance/       ← Anexo VII, Anexo V, VDP, SBOM
│       └── reports/          ← Output do pipeline
├── playbook/
│   ├── client-1-nexus/       ← Dias 1-12
│   ├── client-2-crestline/   ← Dias 1-18
│   └── client-3-aethon/      ← Dias 1-25
├── config/
│   └── bearer-config.yml
└── reports/                  ← Output dos scanners
```

---

## Ferramentas Incluídas

| Ferramenta | Tipo | O que detecta |
|---|---|---|
| **Semgrep** | SAST | Padrões de código inseguro, SQLi, XSS |
| **Bearer** | SAST | Exposição de dados sensíveis, PII |
| **Trivy (fs)** | SCA | CVEs em dependências, segredos |
| **Trivy (config)** | IaC | Misconfigs em Docker/Compose |
| **Checkov** | IaC | Misconfigs de infra |
| **Wardex** | Gate | Risk-based release gate CRA |

**Targets:** Código por cliente em `src/<cliente>/` (contextualizado ao produto)

---

## Engagements CRA — Visão Geral

| Cliente | Classificação | Duração | Complexidade |
|---|---|---|---|
| Nexus Dynamics (SaaS manufatura) | Produto padrão (Art. 6) | 12 dias | Básica — primeiro contacto com CRA |
| Crestline Systems (IIoT industrial) | Classe I (Anexo III) | 18 dias | Média — SBOM, VDP, hard stops |
| Aethon Security (SIEM/endpoint) | Classe II (Anexo III) | 25 dias | Alta — ON, Anexo V, stakeholders |

Cada engagement segue o fluxo: proposta → contrato → kickoff → avaliação técnica →
Wardex gate → artefactos CRA → relatório → encerramento.

---

## Especificação Detalhada

Ver `SPEC_cra_compliance_lab.md` para a especificação completa da extensão CRA,
incluindo decisões arquitecturais, OD-01 a OD-04, e sequência de produção.

---

## Sprint Base — 5 Dias (sem CRA)

### Dia 1 — Setup + SAST
```bash
CLIENT=nexus-dynamics ./run.sh sast
```
Para cada finding: CWE? O que está errado? Impacto em produção? Como corrigir?

### Dia 2 — SCA + Mapeamento de Risco
```bash
CLIENT=nexus-dynamics ./run.sh sca
```
Para cada CVE HIGH/CRITICAL: CVSS base vs. contextual? Attack vector? Precisa de auth? O vendor tem patch?

### Dia 3 — IaC + Correlação
```bash
CLIENT=nexus-dynamics ./run.sh iac
```
Que misconfigs de infra podem amplificar o risco das vulns encontradas? (ex: secrets no docker-compose, permissões no workflow)

### Dia 4 — Integração + Linguagem de Risco
Para cada finding, escrever uma frase para o Diretor de SI:
*"Encontrámos X instâncias de [tipo] na aplicação. Em termos de risco, significa [impacto]. Recomendo [ação]."*

### Dia 5 — Mock de Entrevista
1. *"SAST devolve 300 findings. Como começas?"* → Priorização por severidade + criticidade + localização
2. *"SQL injection num endpoint autenticado dois dias antes do release. O que fazes?"*
3. *"Diferença prática entre SAST e DAST?"* → SAST analisa o código; DAST testa o runtime

---

## Path de Follow-up (6 meses)

**Mês 1-2:** OWASP Top 10 Web + API, triagem de CVEs com EPSS, escrever 2-3 regras Semgrep
**Mês 3-4:** ISO 27001 Annex A (8.25-8.29), DORA Art. 5-14, threat modelling com STRIDE
**Mês 5-6:** Relatório de avaliação AppSec completo, publicação de artigo técnico

---

## Referências Rápidas

**CWEs mais comuns:** CWE-89 (SQLi), CWE-79 (XSS), CWE-22 (Path Traversal), CWE-287 (Auth), CWE-798 (Creds)

**DORA — Artigos AppSec:** Art. 8 (Identificação), Art. 9 (Proteção), Art. 10 (Deteção), Art. 17 (Incidentes)

**ISO 27001:2022 — Controlos AppSec:** 8.25 (SDLC), 8.26 (Requisitos), 8.27 (Arquitetura), 8.28 (Codificação), 8.29 (Testes)
