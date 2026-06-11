# Dia 11 — Análise Técnica de Firmware
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 7 horas
**Artefactos produzidos:** relatório de análise de firmware, lista de vulnerabilidades de hardware

## Contexto narrativo
É hora de ir além do源代码. Pedes um controlador CREST-2000 para análise laboratorial. Abres o invólucro e comes com os olhos: portas JTAG expostas, UART sem autenticação, flash SPI externa sem encriptação, e um chip Wi-Fi que já não é fabricado. A segurança física do dispositivo é quase nula. O engenheiro de hardware diz: "Isto sempre foi assim, nunca ninguém se queixou."

## Tarefa(s) do dia
Realizar análise de segurança do firmware: extrair firmware via SPI, analisar binário com ferramentas de reversing (Ghidra, binwalk), identificar hardcoded credentials, backdoors, e configurações inseguras. Documentar riscos de segurança física.

## Artefactos
- `firmware-analysis-report.md` — Relatório de análise de firmware
- `hardware-security-findings.md` — Achados de segurança física

## Pergunta de reflexão
Qual o impacto de portas de depuração (JTAG/SWD) acessíveis num produto industrial?
<details>
<summary>Ver resposta</summary>
Permitem que um atacante com acesso físico extraia firmware completo, faça dumping de memória, reprograme o dispositivo, ou injete código arbitrário. Em ambiente industrial, o acesso físico pode ser de um funcionário desonesto, um concorrente em feira, ou alguém que compra o dispositivo em segunda mão. A mitigação passa por fuzíveis de segurança (eFuse), JTAG locking, ou remoção física das portas em produção.
</details>
