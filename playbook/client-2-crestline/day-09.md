# Dia 09 — Justificação do Período de Suporte (5 Anos)
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** política de suporte, cálculo de período de suporte

## Contexto narrativo
A CRA exige que o período de suporte seja definido pelo fabricante em função da "vida útil expectável do produto" (Art. 3(44) e Art. 10 §2). Para um controlador industrial instalado numa linha de montagem que funciona 24h/7 há 15 anos, qual é o período razoável? O Miguel sugere 2 anos — "ninguém usa firmware atualizado em fábrica." Tu sabes que 2 anos é insuficiente para IIoT crítico.

## Tarefa(s) do dia
Calcular o período de suporte mínimo baseado na vida útil típica de controladores industriais (5-10 anos). Apresentar justificação baseada em normas ISO (ISO 31000, ISO 27001) e prática de mercado. Redigir a política de suporte.

## Artefactos
- `support-period-justification.md` — Justificação do período de 5 anos
- `support-policy-crestline.md` — Política de suporte e EOL

## Pergunta de reflexão
Porque é que 2 anos não é aceitável para suporte de IIoT?
<details>
<summary>Ver resposta</summary>
Um controlador industrial tem um ciclo de vida de 5-15 anos. Com 2 anos de suporte, o produto fica sem atualizações de segurança durante 75-85% da sua vida útil. Isto viola o princípio da proporcionalidade (Art. 5) e o requisito de segurança by design (Anexo I). Além disso, a Diretiva NIS 2 exige que operadores de serviços essenciais usem produtos suportados — se o suporte é de 2 anos, os clientes da Crestline ficam em incumprimento e podem processar a Crestline.
</details>
