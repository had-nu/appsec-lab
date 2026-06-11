# Dia 06 — SBOM (Parte I) — Inventário de Componentes
**Cliente:** Aethon Security, S.A.
**Palel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** sbom_inventario.md, sbom_dependencias_raw.md

## Contexto narrativo

O CTO ainda está a processar o facto de que as bibliotecas third-party são responsabilidade dele. Hoje começas o levantamento exaustivo da Software Bill of Materials. A Aethon tem 47 produtos, e cada um tem pelo menos 4-5 camadas de dependências. O CISO perguntou: "já devíamos ter isto, não?" A resposta é sim, mas ninguém teve tempo. O SBOM é o alicerce da conformidade EUCC.

## Tarefa(s) do dia

1. Gerar SBOM em formato CycloneDX para os 3 produtos core
2. Identificar componentes não documentados (shadow dependencies)
3. Verificar licenças de cada componente para compatibilidade
4. Estabelecer baseline de versões mínimas seguras

## Artefactos

- `client-3-aethon/artefacts/sbom_inventario.md`
- `client-3-aethon/artefacts/sbom_dependencias_raw.md`

## Pergunta de reflexão

Por que é que o formato CycloneDX é preferível ao SPDX para EUCC?

<details>
<summary>Ver resposta</summary>
O EUCC recomenda CycloneDX porque suporta metadados de segurança nativos: vetor CVSS, CPE, SWID, e referências a advisory. O SPDX é mais focado em licenciamento, enquanto o CycloneDX permite correlação direta entre dependências e vulnerabilidades conhecidas, essencial para a evidência de conformidade do Art. 18 (Documentação técnica).
</details>
