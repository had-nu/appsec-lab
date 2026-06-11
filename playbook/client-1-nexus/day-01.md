# Dia 01 — Proposta e Qualificação

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** ROOT-SP-001-proposta.md

## Contexto narrativo

Recebes um email de Mariana Soares (CTO da Nexus Dynamics) via LinkedIn. A Mariana diz:

> *"André, estamos a preparar-nos para o CRA. O nosso produto NexusFlow v2.3 é SaaS, a classificar como 'produto padrão' (Art. 6). Precisamos de perceber o que isto significa para nós — temos prazos, nomeadamente o Art. 14 (Setembro 2026). Podes ajudar-nos a fazer este diagnóstico? Não temos budget para uma consultora grande."*

Ligas à Mariana, ela confirma que nunca fizeram uma avaliação de segurança formal. Têm um repositório Git com o código, correm num VPS, e têm um pipeline GitHub Actions básico (lint + test). Não têm SAST, SCA, nem processo de vulnerabilidades.

## Tarefa(s) do dia

1. Pesquisar o Regulamento (UE) 2024/2847, Art. 6 e Art. 14
2. Determinar se o NexusFlow é realmente "produto padrão" ou se há características que o possam reclassificar
3. Escrever a Proposta de Serviço (ROOT-SP-001) seguindo a estrutura da SPEC
4. Definir o scope para 12 dias com base na falta de maturidade do cliente

## Artefactos

- `clients/nexus-dynamics/CONTRACT/ROOT-SP-001-proposta.md`

## Pergunta de reflexão

Se o NexusFlow tiver uma integração com sistemas de pagamento (API bancária), isso altera a classificação CRA? Porquê?

<details>
<summary>Ver resposta</summary>

Sim, se o NexusFlow processar pagamentos ou tiver integração com APIs bancárias que envolvam
dados financeiros sensíveis, pode ser reclassificado. O CRA classifica com base na função do
produto, não na tecnologia. Um produto que gere dados financeiros ou faça controlo de acesso
a sistemas críticos pode ser elevado para "Produto Importante" (Anexo III). Para este
engagement, consideramos que o NexusFlow não processa pagamentos — é um produto de gestão de
operações sem integração financeira crítica. Se houver dúvida, o princípio da precaução
recomenda tratar como Classe I.
</details>
