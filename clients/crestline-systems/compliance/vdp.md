# Vulnerability Disclosure Policy (VDP) — Crestline Systems

**Documento:** VDP-CRESTLINE-001
**Data:** 2026-06-11

---

## 1. Propósito

Este documento estabelece o processo para receção, triagem, investigação e resolução de
vulnerabilidades de segurança reportadas por terceiros (investigadores, clientes, ou
público) relativas ao produto EdgeSentry.

---

## 2. Escopo

Estão abrangidos:
- EdgeSentry v1.x (software de gestão de gateways IIoT)
- API pública do EdgeSentry
- Documentação oficial

Não estão abrangidos:
- Infraestrutura interna da Crestline Systems
- Produtos de terceiros

---

## 3. Canais de Reporte

- Email: `security@crestlinesystems.pt`
- PGP key disponível em https://crestlinesystems.pt/pgp
- Resposta esperada: 48h úteis (confirmação de receção)

---

## 4. Processo

| Fase | Prazo | Responsável |
|---|---|---|
| Receção e confirmação | 48h úteis | Security team |
| Triagem e classificação | 5 dias úteis | Security team |
| Investigação e remediação | 30 dias (critical: 48h) | Engineering + Security |
| Comunicação da resolução | 5 dias úteis após patch | Security team |
| Divulgação pública (se aplicável) | 90 dias após patch | Security team |

---

## 5. Classificação de Vulnerabilidades

| Severidade | Exemplo | Prazo de remediação |
|---|---|---|
| Crítica | RCE, SQLi sem auth | 48h |
| Alta | XSS, path traversal | 10 dias |
| Média | Missing headers, info disclosure | 30 dias |
| Baixa | Best practices, hardening | 90 dias |

---

## 6. Reconhecimento

Investigadores que reportem vulnerabilidades válidas serão reconhecidos no:
- Security Acknowledgments page (em construção)
- Menção no relatório de release

---

## 7. Safe Harbor

A Crestline Systems compromete-se a não tomar ações legais contra investigadores que:
- Acedam a sistemas apenas para testar a vulnerabilidade reportada
- Não destruam ou exfiltrem dados
- Notifiquem a Crestline primeiro (responsible disclosure)
- Respeitem o prazo de 90 dias antes de divulgação pública
