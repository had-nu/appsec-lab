# Anexo VII — Documentação Técnica Auditável (CRA)

**Produto:** AethonShield v3.1
**Fabricante:** Aethon Security, S.A.
**Classificação CRA:** Produto Importante Classe II (Anexo III — SIEM + endpoint)
**Data:** 2026-06-11

---

## 1. Descrição Geral do Produto

AethonShield é uma plataforma SIEM (Security Information and Event Management) com agente
de endpoint para Windows, Linux e macOS. Funcionalidades principais:
- Recolha e correlação de logs de segurança
- Deteção de ameaças em tempo real (regras + ML)
- Resposta automatizada a incidentes (SOAR lite)
- Gestão centralizada de agentes endpoint
- Relatórios de conformidade (ISO 27001, DORA, CRA)

---

## 2. Arquitetura

- **Backend:** Node.js (Express) — servidor central SIEM
- **Agente:** Go (endpoint) — Windows, Linux, macOS
- **Base de Dados:** PostgreSQL + Elasticsearch
- **Deployment:** On-prem (cliente) ou Cloud (SaaS)
- **Comunicação:** TLS 1.3 entre agente e servidor

---

## 3. Componentes de Segurança

| Componente | Versão | Descrição |
|---|---|---|
| express | 4.18 | HTTP framework |
| passport | 0.7 | Autenticação |
| crypto | built-in | Hashing e cifra |
| helmet | 7.1 | HTTP headers |
| winston | 3.11 | Logging |

---

## 4. SBOM

Gerado em CycloneDX v1.5, disponível em `compliance/sbom-cyclonedx.json`.
Assinado com cosign — verificável pelo organismo notificado.

---

## 5. Avaliação de Risco (Contexto Classe II)

| Risco | Probabilidade | Impacto | Controlo |
|---|---|---|---|
| RCE no agente endpoint | Média | Crítico | Code signing + sandbox |
| SQLi no console web | Média | Crítico | Prepared statements + WAF |
| Exposição de logs sensíveis | Alta | Alto | Cifra em repouso + RBAC |
| Elevação de privilégios | Baixa | Crítico | Privilege separation |
| Falha de deteção | Média | Alto | Testes de bypass regulares |

---

## 6. Ciclo de Vida de Vulnerabilidades

- SAST: push e PR (gate blocking)
- SCA: Semanal
- Wardex gate: Release-blocking
- Prazo: Crítico 24h, Alto 3 dias, Médio 15 dias

---

## 7. Período de Apoio

**Período:** 5 anos
**Justificação:** Produto de segurança crítica — os clientes dependem do AethonShield
para a sua postura de segurança. Atualizações contínuas são expectável e necessárias.
