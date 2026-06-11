# Dia 06 — Negociação Hard Stop
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** ata de decisão, exceção documentada, plano de mitigação

## Contexto narrativo
O Miguel Varela (CTO) pede uma reunião de urgência. A pressão comercial é enorme — um cliente alemão quer fechar encomenda de 5000 controladores CREST-5000 até ao final do mês, e a equipa de desenvolvimento precisa de cortar tudo o que não é essencial. "O SBOM e o VDP são burocracia. Tu próprio viste que o firmware é seguro depois das correções. Vamos fazer o release sem essas duas entregas e tratamos disso depois." O Miguel está visivelmente stressado.

## Tarefa(s) do dia
Responder à pressão do CTO fundamentando legalmente a recusa. Invocar o Art. 5 (proporcionalidade e responsabilidade do fabricante), Art. 8 §3 (obrigatoriedade de SBOM na disponibilização do produto), e Anexo I (2)(a)-(g) (requisitos essenciais de segurança que incluem VDP e SBOM). Explicar que a isenção Art. 53 PME só se aplica a micro e pequenas empresas — a Crestline não se enquadra. Negociar um plano de aceleração sem eliminar deliverables.

## Artefactos
- `hard-stop-decision-log.md` — Registo de decisão com exceções rejeitadas
- `acceleration-plan.md` — Plano de aceleração negociado

## Pergunta de reflexão
Até onde ceder quando um cliente pressiona para cortar compliance em nome do negócio?
<details>
<summary>Ver resposta</summary>
Ceder totalmente é violar o dever de diligência profissional. Ignorar a pressão é irrealista. O caminho é negociar trade-offs que não comprometam a conformidade legal essencial. Por exemplo: acelerar o SBOM usando ferramentas automáticas (como o wardex) em vez de o fazer manualmente; aceitar um VDP com triagem externalizada mais básica; e documentar TUDO — se o cliente insiste em ignorar um requisito legal, essa decisão tem de ser formalmente registada e assinada, com a responsabilidade transferida para a gestão. No caso concreto, SBOM e VDP são inequivocamente obrigatórios sob a CRA — não há margem legal para os omitir.
</details>
