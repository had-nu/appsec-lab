# Anexo VII — Documentação Técnica Completa (CRA)

**Produto:** EdgeSentry v1.4
**Fabricante:** Crestline Systems, S.A.
**Classificação CRA:** Produto Importante Classe I (Anexo III)
**Data:** 2026-06-11

---

## 1. Descrição Geral do Produto

EdgeSentry é um software de gestão de gateways IIoT (Industrial Internet of Things)
para infraestrutura industrial crítica. Funcionalidades principais:
- Monitorização e configuração remota de gateways IIoT
- Agregação de telemetria de sensores industriais
- Alertas de anomalias em tempo real
- Gestão de firmware de gateways

---

## 2. Arquitetura

- **Frontend:** React SPA
- **Backend:** Node.js (Express)
- **Base de Dados:** MySQL (on-prem)
- **Deployment:** Docker Compose em servidor dedicado na rede industrial

---

## 3. Componentes de Segurança

| Componente | Versão | Descrição |
|---|---|---|
| express-session | 1.18 | Gestão de sessões |
| mysql | 2.18 | Driver de base de dados |
| crypto | built-in | Hashing de passwords |
| Helmet | 7.x | HTTP headers de segurança |

---

## 4. SBOM

O SBOM do EdgeSentry v1.4 é gerado no formato CycloneDX v1.5 e está disponível em:
`compliance/sbom-cyclonedx.json`

---

## 5. Avaliação de Risco

| Risco | Probabilidade | Impacto | Controlo |
|---|---|---|---|
| SQL Injection | Alta | Crítico | SAST gate + WAF + prepared statements |
| XSS | Média | Alto | Output encoding + CSP |
| Exposição de credenciais | Média | Crítico | Secrets em vault + segregação |
| Path traversal | Baixa | Médio | Validação de input |
| Falha de gateway IIoT | Baixa | Crítico | Redundância + failover |

---

## 6. Ciclo de Vida de Vulnerabilidades

- SAST: push e PR
- SCA: Semanal
- SBOM: Atualizado a cada release
- Wardex gate: Antes de cada release
- Prazo de remediação: Crítico 24h, Alto 5 dias, Médio 20 dias

---

## 7. Período de Apoio

**Período:** 5 anos a partir da primeira disponibilização no mercado
**Justificação:** Ver `support-period-justification.md`
