# Dia 01 — Proposta e Qualificação

**Cliente:** Nexus Dynamics, Lda.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 4 horas
**Artefactos produzidos:** ROOT-SP-001-proposta.md

---

## Contexto Narrativo

Recebes um email de Mariana Soares (CTO da Nexus Dynamics) via LinkedIn:

> *"André, estamos a preparar-nos para o CRA. O nosso produto NexusFlow v2.3 é SaaS, a classificar como 'produto padrão' (Art. 6). Precisamos de perceber o que isto significa para nós — temos prazos, nomeadamente o Art. 14 (Setembro 2026). Podes ajudar-nos a fazer este diagnóstico? Não temos budget para uma consultora grande."*

Ligaste à Mariana. Ela confirma:
- Nunca fizeram avaliação de segurança formal
- Repositório Git com código, VPS, pipeline GitHub Actions básico (lint + test)
- **Não têm SAST, SCA, nem processo de vulnerabilidades**
- Produto: NexusFlow v2.3 — SaaS de gestão de operações de manufatura (Node.js/Express)
- stack: Node.js/Express, MySQL, VPS Linux, GitHub Actions

---

## Tarefas do Dia

### 1. Pesquisar o Regulamento (UE) 2024/2847, Art. 6 e Art. 14

Ler os artigos relevantes do CRA:
- **Art. 6**: Categorias de produtos — "produto padrão" vs "produto importante" (Anexo III)
- **Art. 14**: Obrigação de notificação de vulnerabilidades activamente exploradas (deadline Set 2026)
- **Anexo I Parte II**: Tratamento de vulnerabilidades
- **Anexo VII**: Documentação técnica mínima

### 2. Determinar a Classificação CRA do NexusFlow

Analisar se o NexusFlow é realmente **"produto padrão"** (Art. 6) ou se há características que o possam reclassificar para **"produto importante"** (Anexo III / Classe I).

Factores a considerar:
- O produto processa dados de manufatura — há dados Financeiros envolvidos?
- Tem integrações com sistemas externos (fornecedores, API bancária)?
- Qual o impacto de uma falha de segurança no negócio do cliente?

### 3. Escrever a Proposta de Serviço (ROOT-SP-001)

Seguir a estrutura da SPEC (`SPEC_cra_compliance_lab.md` secção "Proposta de serviço"):

1. Identificação das Partes
2. Âmbito do Engagement (artigos CRA cobertos, exclusões explícitas)
3. Metodologia (fases, entregáveis por fase)
4. Equipa
5. Honorários (valor diário × dias estimados + IVA)
6. Condições de Pagamento
7. Aceitação

### 4. Definir o Scope Temporal

12 dias de engagement é adequado para um cliente SEM maturidade de segurança?
- Sem SAST/SCA pré-existente → requer setup + explicação
- Primeira exposição ao CRA → requer formação básica
- Pipeline CI/CD básico → requer integração de gates

---

## Artefacto

- `clients/nexus-dynamics/CONTRACT/ROOT-SP-001-proposta.md`

---

## Pergunta de Reflexão

**Se o NexusFlow tiver uma integração com APIs bancárias (processamento de pagamentos), isso altera a classificação CRA? Porquê?**

Pista: O CRA classifica pela **função do produto**, não pela tecnologia. Um produto que processa pagamentos ou gere dados financeiros sensíveis pode ser elevado para "Produto Importante" (Anexo III).

<details>
<summary>Ver resposta</summary>

Sim, se o NexusFlow processar pagamentos ou tiver integração com APIs bancárias que envolvam dados financeiros sensíveis, pode ser reclassificado. O CRA classifica com base na **função críTica do produto**, não na tecnologia usada.

Um produto que:
- Processa pagamentos
- Faz controlo de acesso a sistemas críticos
- Gere dados Financeiros sensíveis

pode ser elevado para **"Produto Importante" (Classe I, Anexo III)**, o que implica:
- Avaliação por organismo notificado (não apenas auto-declaração)
- Requisitos de documentação técnica mais rigorosos
- Período de apoio alargado

Para este engagement, consideramos que o NexusFlow **não processa pagamentos** — é um produto de gestão de operações sem integração Financeira crítica. Se houver dúvida, o princípio da precaução recomenda tratar como Classe I.
</details>

---

## Preparação para o Dia 2

A Mariana aceitou a proposta. O CFO da Nexus Dynamics liga com uma questão incómoda:

> *"André, o valor de €9.594 é significativo para nós. Contudo, a tua proposta diz que 'não certificas conformidade'. O que é que estamos a comprar exatamente? Se no final não tens uma declaração de conformidade, o que é que o relatório nos dá?"*
