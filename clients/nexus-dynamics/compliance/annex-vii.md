# Anexo VII — Documentação Técnica (CRA)

**Produto:** NexusFlow v2.3
**Fabricante:** Nexus Dynamics, Lda.
**Data:** 2026-06-11

---

## 1. Descrição Geral do Produto

NexusFlow é uma plataforma SaaS de gestão de operações de manufatura. Permite:
- Planeamento e scheduling de produção
- Rastreio de lotes e matérias-primas
- Gestão de ordens de trabalho
- Relatórios de eficiência OEE

---

## 2. Arquitetura

- **Frontend:** React SPA
- **Backend:** Node.js (Express)
- **Base de Dados:** MySQL
- **Deployment:** Docker Compose em VPS dedicada

---

## 3. Componentes de Segurança Implementados

| Componente | Versão | Descrição |
|---|---|---|
| express-session | 1.18 | Gestão de sessões |
| mysql | 2.18 | Driver de base de dados |
| crypto | built-in | Hashing de passwords |

---

## 4. Avaliação de Risco

| Risco | Probabilidade | Impacto | Controlo |
|---|---|---|---|
| SQL Injection | Alta | Crítico | SAST gate + WAF |
| XSS | Média | Alto | Output encoding + CSP |
| Exposição de credenciais | Média | Crítico | Segredos em vault |
| Path traversal | Baixa | Médio | Validação de input |

---

## 5. Ciclo de Vida de Vulnerabilidades

- SAST: Sempre que há commit para main
- SCA: Semanal
- Wardex gate: Antes de cada release
- Prazo de remediação: Crítico 48h, Alto 7 dias, Médio 30 dias

---

## 6. Período de Apoio

**Período:** 5 anos a partir da primeira disponibilização no mercado
**Justificação:** Produto SaaS — atualizações contínuas garantidas por subscrição
