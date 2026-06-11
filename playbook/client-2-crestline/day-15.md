# Dia 15 — Planeamento de Resposta a Incidentes
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** plano de resposta a incidentes, runbooks, template de notificação

## Contexto narrativo
Se um controlador Crestline for comprometido, uma fábrica para. Se uma fábrica para, são milhares de euros por hora em perda de produção. Se houver danos físicos (sobreaquecimento, movimento não controlado de robôs), há risco de vida. A CRA exige que os fabricantes tenham capacidade de resposta a incidentes (Art. 10 §4). A Crestline nunca respondeu a um incidente de segurança.

## Tarefa(s) do dia
Desenhar um plano de resposta a incidentes adaptado a IIoT. Incluir: deteção, triagem, contenção (OTA kill switch), erradicação, recuperação, e notificação a clientes e ENISA. Criar runbooks para cenários comuns.

## Artefactos
- `incident-response-plan-crestline.md` — Plano de resposta a incidentes
- `runbook-malware-firmware.md` — Runbook para infeção de firmware
- `runbook-dos-controller.md` — Runbook para DoS em controlador
- `template-notificacao-enisa.md` — Template de notificação ENISA

## Pergunta de reflexão
O que é um "kill switch" OTA e quando deve ser usado?
<details>
<summary>Ver resposta</summary>
Um kill switch OTA é um comando remoto que desativa ou isola um dispositivo comprometido. Deve ser usado quando: (1) o dispositivo está a ser usado num ataque contra terceiros (botnet IIoT), (2) há risco de segurança física, (3) o dispositivo está a exfiltrar dados sensíveis. A ativação de um kill switch é uma decisão de crise — deve ser aprovada por direção e documentada, pois deixa o cliente sem o produto funcionar.
</details>
