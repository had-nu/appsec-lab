# Dia 05 — SAST/SCA (Parte II) — Remediação e Validação
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** report_sast_remediated.md, plano_remediacao.md

## Contexto narrativo

Os resultados da primeira leitura estão na mesa. Como esperado, o core product da Aethon tem uma boa base de segurança — afinal, são uma empresa de segurança cibernética. Mas encontraste 3 Critical e 7 High na camada de dependências third-party que eles estavam a ignorar. O CTO ficou surpreendido. "Isso é culpa do fornecedor da biblioteca X." Tu respondes: "O EUCC não aceita essa justificação. O fabricante é responsável por toda a cadeia."

## Tarefa(s) do dia

1. Atribuir prioridades de remediação com a equipa de desenvolvimento
2. Validar correções implementadas com nova leitura SAST
3. Documentar dependências que necessitam de atualização ou substituição
4. Confirmar que zero Critical e zero High permanecem abertos

## Artefactos

- `client-3-aethon/artefacts/report_sast_remediated.md`
- `client-3-aethon/artefacts/plano_remediacao.md`

## Pergunta de reflexão

Quem é responsável por vulnerabilidades em dependências third-party no EUCC?

<details>
<summary>Ver resposta</summary>
O fabricante (Aethon) é integralmente responsável, mesmo que a vulnerabilidade esteja numa biblioteca open-source ou componente de terceiros. O Art. 12 (Responsabilidade do fabricante) é claro: o certificado cobre o produto como um todo, incluindo todos os componentes incorporados. Aethon deve manter um SBOM atualizado e monitorizar CVEs ativamente.
</details>
