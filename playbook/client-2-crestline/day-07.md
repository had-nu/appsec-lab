# Dia 07 — Wardex Gate com Dependência SBOM
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** pipeline SBOM gate, reporte wardex v1

## Contexto narrativo
Com o hard stop negociado (e a relação com o Miguel um pouco mais fria), voltas ao trabalho técnico. O wardex tem uma funcionalidade de "gate" que pode ser integrada no pipeline CI/CD — se o SBOM não passar nas verificações de integridade, versões, e licenças, o build falha. A equipa de engenharia está receosa: "Isto vai atrasar os nossos builds todos os dias."

## Tarefa(s) do dia
Configurar o wardex gate no pipeline GitLab CI/CD da Crestline. O gate verifica: (1) validade do formato SPDX, (2) consistência de versões entre SBOM e lockfile, (3) licenças proibidas, (4) CVE críticas. Modo "warn" para os primeiros 15 dias, depois "block".

## Artefactos
- `.gitlab-ci.yml` — Pipeline com wardex sbom gate
- `wardex-gate-rules.md` — Regras do gate

## Pergunta de reflexão
Qual o risco de ativar um SBOM gate em modo "block" demasiado cedo?
<details>
<summary>Ver resposta</summary>
Bloquear builds sem a equipa estar preparada gera frustração, shadow IT (engenheiros a fazer bypass do pipeline), e pressão política para remover o gate completamente. O melhor é um período de aquecimento em modo "warn" com relatórios semanais, para a equipa se habituar e corrigir os problemas mais comuns antes de o gate começar a bloquear.
</details>
