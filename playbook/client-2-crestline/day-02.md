# Dia 02 — Análise SAST/SCA
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** relatório SAST, relatório SCA, lista de vulnerabilidades críticas

## Contexto narrativo
O Miguel disponibilizou-te acesso ao repositório Git dos firmware dos controladores CREST-2000 e CREST-5000. São anos de código C embarcado com pouca documentação. Corres o Semgrep e o Dependency-Check da mesma forma que fizeste para a Nexus, mas agora com mais tempo para aprofundar. Os resultados são assustadores: buffer overflows em todo o lado, uma OpenSSL de 2018, e uma biblioteca de terceiros sem qualquer manutenção.

## Tarefa(s) do dia
Correr análise SAST com Semgrep e SCA com OWASP Dependency-Check sobre os repositórios fornecidos. Classificar achados por gravidade e explotabilidade. Preparar apresentação para a equipa de engenharia.

## Artefactos
- `sast-report-crestline.md` — Resultados Semgrep com falsos positivos sinalizados
- `sca-report-crestline.md` — Resultados Dependency-Check com CVE mapeadas

## Pergunta de reflexão
Qual a diferença crítica entre fazer SAST/SCA para a Nexus (software puro) vs. para a Crestline (firmware embarcado)?
<details>
<summary>Ver resposta</summary>
No firmware embarcado, as correções são muito mais caras — cada atualização requer validação de hardware, testes de regressão em múltiplas plataformas, e frequentemente uma campanha de flashing em campo. Além disso, bibliotecas desatualizadas estão muitas vezes em componentes que não podem ser atualizados independentemente (ex: bootloader, RTOS). A priorização tem de pesar o risco vs. o custo operacional de cada correção.
</details>
