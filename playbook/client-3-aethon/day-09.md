# Dia 09 — VDP (Parte II) — Processo de Triage e SLA
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** vdp_sla_triagem.md, vdp_report_template.md

## Contexto narrativo

A política está definida, mas a CISO levantou uma questão prática: "quem é que vai triar os reports?" A equipa de segurança da Aethon é enxuta — 5 pessoas para 47 produtos. Um bug bounty público pode gerar dezenas de reports por semana. Precisas de definir SLAs claros, um processo de triagem automatizada, e templates de resposta. O CTO sugeriu "usar IA para triagem." Tu concordas, com cautela.

## Tarefa(s) do dia

1. Definir níveis de severidade e SLAs correspondentes
2. Desenhar o fluxo de triagem: da receção à resolução
3. Criar template de resposta para researchers
4. Configurar notificações automáticas e dashboard de tracking

## Artefactos

- `client-3-aethon/artefacts/vdp_sla_triagem.md`
- `client-3-aethon/artefacts/vdp_report_template.md`

## Pergunta de reflexão

Qual o SLA máximo aceitável para uma vulnerabilidade Critical reportada via VDP?

<details>
<summary>Ver resposta</summary>
O EUCC não define SLAs específicos para VDP, mas a prática recomendada (seguindo ISO 30111 e FIRST CVSS) é: confirmação de receção em 24h, triagem em 72h, e remediação de Critical em 15 dias. Para Classe II, sugere-se 7 dias para Critical, dado o nível de risco. A Aethon deve definir isto na política e cumpri-lo como evidência de due diligence.
</details>
