# Dia 07 — SBOM (Parte II) — Componentes Assinados
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** sbom_assinaturas.md, politica_assinatura_componentes.md

## Contexto narrativo

O SBOM está levantado. Agora vem a parte que o CTO vai gostar menos: todos os componentes precisam de assinatura digital. "Assinar o quê? Nós já assinamos os nossos binários." Sim, mas o EUCC exige que cada componente da cadeia — incluindo dependências third-party — seja verificável criptograficamente. Se uma biblioteca não tem assinatura, tens de a remover ou justificar com análise de risco.

## Tarefa(s) do dia

1. Identificar componentes não assinados no SBOM
2. Definir política de aceitação de componentes assinados vs. não assinados
3. Implementar verificação de assinatura no pipeline CI/CD
4. Documentar exceções com justificação de risco residual

## Artefactos

- `client-3-aethon/artefacts/sbom_assinaturas.md`
- `client-3-aethon/artefacts/politica_assinatura_componentes.md`

## Pergunta de reflexão

O que fazer quando um componente crítico não tem assinatura digital disponível?

<details>
<summary>Ver resposta</summary>
Tens três opções: (1) substituir por alternativa assinada, (2) estabelecer um processo de verificação manual com hash conhecido e pinned version, documentando o risco residual, ou (3) solicitar ao mantenedor que adicione assinatura — mas isto não é escalável. Na prática, a Aethon deve manter uma lista de approved components com assinatura verificada e criar um processo de exceção temporária com revisão trimestral.
</details>
