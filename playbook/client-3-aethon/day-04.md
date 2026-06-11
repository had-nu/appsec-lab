# Dia 04 — SAST/SCA (Parte I) — Configuração e Primeira Leitura
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** sast_sca_matriz_ferramentas.md, report_sast_raw.md

## Contexto narrativo

A CISO preparou o terreno: repositórios clonados, pipelines identificados, equipa de desenvolvimento em alerta. O CTO disse "vamos lá ver o que é que o vosso scanner encontra que o nosso não encontrou." Há um misto de orgulho ferido e curiosidade genuína. Para Classe II, zero tolerância a vulnerabilidades críticas significa que qualquer hallazgo Critical bloqueia o progresso até resolução.

## Tarefa(s) do dia

1. Configurar ferramentas SAST e SCA nos pipelines da Aethon
2. Executar primeira leitura de análise estática no core product
3. Documentar falsos positivos vs. vulnerabilidades reais
4. Classificar hallazgos por severidade EUCC (Critical, High, Medium, Low)

## Artefactos

- `client-3-aethon/artefacts/sast_sca_matriz_ferramentas.md`
- `client-3-aethon/artefacts/report_sast_raw.md`

## Pergunta de reflexão

Qual a diferença prática entre uma vulnerabilidade Critical e High para Classe II?

<details>
<summary>Ver resposta</summary>
Para Classe II, ambas bloqueiam a certificação até resolução. A diferença está no prazo: Critical exige remediação imediata (o organismo notificado pode suspender o processo), enquanto High pode ser resolvida dentro do sprint corrente. Na prática, o tratamento é idêntico — zero Critical, zero High.
</details>
