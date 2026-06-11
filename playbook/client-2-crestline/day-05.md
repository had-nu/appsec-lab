# Dia 05 — Desenho do Programa VDP
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** política VDP, security.txt, draft de disclousure流程

## Contexto narrativo
A CRA exige um programa de divulgação de vulnerabilidades (Art. 10, §1). A Crestline não tem equipa de segurança — nem um único analista. Quando perguntas quem vai tratar dos reportes, o Miguel responde: "Recebemos por email, e o estagiário encaminha para o engenheiro mais disponível." Sabes que isto não escala nem cumpre os prazos regulatórios.

## Tarefa(s) do dia
Desenhar um VDP adaptado a uma empresa sem equipa de segurança dedicada. Propor um modelo de outsourced triage com um parceiro MSSP. Configurar security.txt e policy page. Definir SLAs de triagem e remediação.

## Artefactos
- `vdp-policy-crestline.md` — Política completa de VDP
- `security.txt` — Ficheiro de configuração para /.well-known/security.txt

## Pergunta de reflexão
Vale a pena ter um VDP se não há equipa para o operar?
<details>
<summary>Ver resposta</summary>
Vale, desde que haja um mecanismo de triagem externalizado. Um VDP sem resposta activa é pior do que não ter VDP — dá uma ilusão de canal de comunicação, o que pode levar a divulgações públicas forçadas ou a multas por incumprimento dos SLAs regulatórios. A solução passa por contratar um serviço de bug bounty ou MSSP que faça a triagem inicial, e definir na política que a equipa interna é notificada apenas para escalados confirmados.
</details>
