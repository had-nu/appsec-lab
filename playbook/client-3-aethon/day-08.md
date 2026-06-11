# Dia 08 — VDP (Parte I) — Política e Bug Bounty
**Cliente:** Aethon Security, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** vdp_politica.md, vdp_escopo.md

## Contexto narrativo

A Aethon já tem um programa de bug bounty, mas é interno — apenas para colaboradores e parceiros selecionados. Para EUCC Classe II, a Vulnerability Disclosure Policy (VDP) precisa ser pública, acessível, e seguir o padrão ISO 29147. A CISO diz "vamos abrir ao público, mas temos medo do ruído." O CTO diz "os nossos pentesters já chegam." Tu tens de explicar que o bug bounty externo é um requisito implícito de due diligence.

## Tarefa(s) do dia

1. Analisar a VDP atual da Aethon contra ISO 29147
2. Definir o escopo do programa público de bug bounty
3. Estabelecer regras de elegibilidade e exclusões
4. Configurar canal de reporte seguro e confidencial

## Artefactos

- `client-3-aethon/artefacts/vdp_politica.md`
- `client-3-aethon/artefacts/vdp_escopo.md`

## Pergunta de reflexão

Qual a diferença entre VDP e bug bounty no contexto EUCC?

<details>
<summary>Ver resposta</summary>
A VDP é obrigatória (ISO 29147) e estabelece o canal e as regras para reporte de vulnerabilidades. O bug bounty é um programa opcional que oferece recompensas financeiras. O EUCC exige a VDP; o bug bounty é uma boa prática que demonstra matureza do processo de segurança. Para Classe II, a VDP pública é praticamente obrigatória como evidência de due diligence contínua.
</details>
