# Dia 04 — Validação SBOM com Wardex SBOM Check
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** relatório wardex sbom check, SBOM corrigido

## Contexto narrativo
A equipa de engenharia lá gerou o primeiro SBOM em SPDX, extraído à força do seu ambiente de build Yocto. Corres o `wardex sbom check` sobre o ficheiro. O resultado é arrasador: de 47 dependências listadas, 12 estão com versões erradas, 5 têm licenças incompatíveis com a distribuição industrial, e 3 pacotes críticos (a pilha LWIP, o mbedTLS, e o FreeRTOS) estão em versões com CVE públicas conhecidas.

## Tarefa(s) do dia
Correr a ferramenta Wardex SBOM Check sobre o SBOM gerado. Analisar cada achado: falsos positivos vs. reais. Ajudar a equipa a corrigir as versões e regenerar o SBOM. Documentar o processo de geração para evitar erros futuros.

## Artefactos
- `wardex-sbom-check-report.md` — Output detalhado do wardex sbom check
- `sbom-crestline-corrigido.spdx` — SBOM versão corrigida

## Pergunta de reflexão
Um SBOM com erros é pior do que nenhum SBOM?
<details>
<summary>Ver resposta</summary>
Sim. Um SBOM incorreto dá uma falsa sensação de segurança e pode levar a decisões erradas em incidentes (ex: achar que não se é afetado por uma CVE porque a versão listada está errada). Também pode ser considerado negligência se um organismo de fiscalização descobrir que o SBOM foi deliberadamente mal feito. Melhor não ter SBOM e estar a trabalhar para o ter, do que ter um SBOM errado e pensar que se está em compliance.
</details>
