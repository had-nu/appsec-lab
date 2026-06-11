# Dia 17 — Preparação do Relatório Final (Anexo Técnico)
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 8 horas
**Artefactos produzidos:** relatório final (anexo técnico completo), matriz de compliance CRA

## Contexto narrativo
O sumário executivo está aprovado. Agora é tempo de compilar o anexo técnico completo que servirá de dossier de compliance para a CRA. Cada achado, cada decisão, cada exceção documentada ao longo dos 17 dias tem de estar aqui. A auditoria interna da Crestline (quando a tiverem) ou uma fiscalização da ENISA vai querer ver este documento.

## Tarefa(s) do dia
Compilar o anexo técnico completo: resultados de todas as análises (SAST, SCA, SBOM, wardex, firmware, rede), VDP implementado, plano de suporte, supply chain risk, incident response, e toda a documentação de compliance. Criar matriz de rastreabilidade CRA (Artigo → Requisito → Evidência → Status).

## Artefactos
- `final-report-technical-annex.md` — Anexo técnico completo
- `cra-compliance-matrix-crestline.md` — Matriz de rastreabilidade CRA

## Pergunta de reflexão
Qual o documento mais importante para uma fiscalização da ENISA?
<details>
<summary>Ver resposta</summary>
A matriz de rastreabilidade CRA. Um fiscalizador não vai ler 500 páginas de relatórios técnicos. Vai perguntar: "Como cumprem o Art. X?" e querer ver a evidência em segundos. A matriz mapeia cada artigo → requisito específico → documento/evidência → status (conforme/não conforme/N/A). Sem isto, demonstrar compliance é um exercício de caça ao documento que raramente corre bem.
</details>
