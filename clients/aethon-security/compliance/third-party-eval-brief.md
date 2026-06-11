# Briefing para Organismo Notificado — AethonShield v3.1

**Preparado por:** Root Security Governance Advisory
**Data:** 2026-06-11

---

## 1. Produto

**Nome:** AethonShield v3.1
**Fabricante:** Aethon Security, S.A.
**Classificação CRA:** Produto Importante Classe II — SIEM + endpoint security

---

## 2. Âmbito da Avaliação

O organismo notificado (ON) deve avaliar:

| Requisito | Evidência |
|---|---|
| Art. 13 — Obrigações do fabricante | SBOM, VDP, support period |
| Art. 14 — Notificação | Artefacto Art. 14 (template) |
| Anexo VII — Documentação técnica | `annex-vii-auditable.md` |
| Anexo V — Declaração UE | `annex-v-eu-declaration.md` (minuta) |
| Secure coding | SAST reports (Semgrep, Bearer) |
| Dependency management | SCA reports (Trivy) |
| Release gate | Wardex gate report |

---

## 3. Riscos Identificados

- CWE-89 (SQLi) no console web — corrigido com prepared statements
- CWE-798 (credenciais hardcoded) — segredos movidos para vault
- Dependências Node.js com CVEs conhecidos — atualizadas

---

## 4. Contacto

**Fabricante:** compliance@aethonsecurity.pt
**Consultora:** root@rootsec.pt

---

> Este briefing é um resumo para facilitação da avaliação. O ON deve solicitar
> os documentos completos diretamente à Aethon Security.
