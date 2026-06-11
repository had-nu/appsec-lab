# SPEC — CRA Compliance Lab
# appsec-playground — extensão para fluxo completo CRA

**Status:** Draft  
**Autor:** Root Security Governance Advisory  
**Âmbito:** Extensão do appsec-playground existente para simulação de três engagements
de consultoria CRA, do contrato à entrega, com CI/CD real e Wardex v2.0 como gate.

---

## 1. Contexto e objectivo pedagógico

O appsec-playground actual cobre a camada técnica — scanners, findings, linguagem de
risco. O que falta é a camada de governance: o processo que transforma um finding de
scanner num artefacto de conformidade com valor legal.

Este lab simula três engagements da Root Security Governance Advisory como consultora
contratada. Cada engagement é um cliente real com contrato, proposta, kickoff, trabalho
técnico, entrega e encerramento. O fluxo não é de sprint — é de dia de trabalho: os
dias administrativos têm a mesma densidade que os técnicos.

O objectivo final é que, ao completar os três engagements, o praticante consiga
conduzir um engagement CRA real de ponta a ponta — desde a proposta até à assinatura
do relatório final.

---

## 2. Três clientes, três níveis CRA

### Cliente 1 — Nexus Dynamics, Lda.
**Sede:** Leiria  
**Sector:** Manufacturing SaaS  
**Dimensão:** PME (~40 pessoas)  
**Produto:** NexusFlow v2.3 — plataforma SaaS de gestão de operações de manufatura  
**Classificação CRA:** Produto padrão (Art. 6) — não consta do Anexo III  
**Artigos em scope:** Art. 14 (notificação, deadline Setembro 2026) + Anexo I Parte II
(tratamento de vulnerabilidades) + Anexo VII básico  
**Duração simulada:** 12 dias de trabalho  
**Foco pedagógico:** Fluxo base completo. Proposta, contrato, avaliação técnica,
pipeline CI/CD com Wardex, artefacto Art. 14, Anexo VII mínimo, entrega, encerramento.
O cliente não tem maturidade de segurança — tudo está a ser construído de raiz.

---

### Cliente 2 — Crestline Systems, S.A.
**Sede:** Aveiro  
**Sector:** IIoT / Infraestrutura industrial  
**Dimensão:** PME (~90 pessoas)  
**Produto:** EdgeSentry 1.4 — software de gestão de gateways IIoT para infraestrutura
industrial crítica  
**Classificação CRA:** Produto importante Classe I (Anexo III — sistemas de gestão de
rede em ambiente industrial)  
**Artigos em scope:** Art. 13 (obrigações do fabricante, SBOM, VDP, período de apoio)
+ Art. 14 + avaliação da conformidade Módulo A com normas harmonizadas + Anexo VII
completo + documentação técnica simplificada PME (Art. 33)  
**Duração simulada:** 18 dias de trabalho  
**Foco pedagógico:** Hard stops de compliance que o cliente resiste a aceitar. SBOM
como requisito operacional, não como deliverable de papel. VDP com processo real.
Período de apoio mínimo de 5 anos documentado e justificado. O praticante lida com
um cliente que tem pressão de release e tenta negociar os requisitos.

---

### Cliente 3 — Aethon Security, S.A.
**Sede:** Lisboa  
**Sector:** Cibersegurança  
**Dimensão:** Empresa média (~200 pessoas)  
**Produto:** AethonShield 3.1 — plataforma SIEM com agente de endpoint para Windows,
Linux e macOS  
**Classificação CRA:** Produto importante Classe II (Anexo III — SIEM + segurança de
endpoints)  
**Artigos em scope:** Art. 13 completo + Art. 14 + Art. 28 (declaração de conformidade
UE) + avaliação por terceiros obrigatória (Módulo B+C ou H) + Anexo VII auditável +
Annexo V (declaração UE) + gestão de múltiplos stakeholders (CISO, CTO, jurídico)  
**Duração simulada:** 25 dias de trabalho  
**Foco pedagógico:** Classe II exige organismo notificado. A declaração de conformidade
UE tem valor legal. O praticante lida com conflitos entre o calendário de produto, os
requisitos do terceiro avaliador, e as expectativas do cliente sobre o que a consultora
pode certificar — e o que não pode.

---

## 3. Estrutura do repositório

```
appsec-lab/
├── docker-compose.yml              ← existente — mantido, expandido
├── run.sh                          ← existente — expandido com targets CRA
├── Dockerfile.wardex               ← NOVO — build multi-stage Alpine
├── .github/
│   └── workflows/
│       ├── ci.yml                  ← existente (se houver) ou NOVO
│       ├── cra-nexus.yml           ← NOVO — pipeline Cliente 1
│       ├── cra-crestline.yml       ← NOVO — pipeline Cliente 2
│       └── cra-aethon.yml          ← NOVO — pipeline Cliente 3
├── config/
│   └── bearer-config.yml           ← existente
├── clients/
│   ├── nexus-dynamics/
│   │   ├── CONTRACT/
│   │   │   ├── ROOT-SP-001-proposta.md
│   │   │   ├── ROOT-CT-001-contrato.md
│   │   │   └── ROOT-RC-001-recibo.md
│   │   ├── wardex/
│   │   │   ├── wardex-config.yaml
│   │   │   ├── wardex-vulns.yaml
│   │   │   └── kev-catalogue-stub.json
│   │   ├── compliance/
│   │   │   ├── annex-vii.md
│   │   │   └── art14-artefact-template.json
│   │   └── reports/                ← gerado pelo pipeline
│   ├── crestline-systems/
│   │   ├── CONTRACT/
│   │   │   ├── ROOT-SP-002-proposta.md
│   │   │   ├── ROOT-CT-002-contrato.md
│   │   │   └── ROOT-RC-002-recibo.md
│   │   ├── wardex/
│   │   │   ├── wardex-config.yaml
│   │   │   ├── wardex-vulns.yaml
│   │   │   ├── wardex-sbom-check.yaml
│   │   │   └── kev-catalogue-stub.json
│   │   ├── compliance/
│   │   │   ├── annex-vii-full.md
│   │   │   ├── sbom-cyclonedx.json
│   │   │   ├── vdp.md
│   │   │   └── support-period-justification.md
│   │   └── reports/
│   └── aethon-security/
│       ├── CONTRACT/
│       │   ├── ROOT-SP-003-proposta.md
│       │   ├── ROOT-CT-003-contrato.md
│       │   └── ROOT-RC-003-recibo.md
│       ├── wardex/
│       │   ├── wardex-config.yaml
│       │   ├── wardex-vulns.yaml
│       │   ├── wardex-sbom-check.yaml
│       │   └── kev-catalogue-stub.json
│       ├── compliance/
│       │   ├── annex-vii-auditable.md
│       │   ├── annex-v-eu-declaration.md
│       │   ├── sbom-cyclonedx.json
│       │   ├── vdp.md
│       │   ├── support-period-justification.md
│       │   └── third-party-eval-brief.md
│       └── reports/
├── src/
│   └── sample-vulnerable.js        ← existente
├── reports/                        ← existente
└── playbook/
    ├── client-1-nexus/
    │   ├── day-01.md               ← Proposta e qualificação
    │   ├── day-02.md               ← Negociação e contrato
    │   ├── day-03.md               ← Kickoff e avaliação inicial
    │   ├── day-04.md               ← SAST/SCA/IaC — análise de findings
    │   ├── day-05.md               ← Wardex — configuração e primeiro gate
    │   ├── day-06.md               ← CI/CD — integração do pipeline
    │   ├── day-07.md               ← KEV correlation — detecção Art. 14
    │   ├── day-08.md               ← Geração e revisão do artefacto Art. 14
    │   ├── day-09.md               ← Anexo VII — preenchimento
    │   ├── day-10.md               ← Revisão com cliente — gaps e aceitações
    │   ├── day-11.md               ← Relatório final e apresentação
    │   └── day-12.md               ← Encerramento, recibo, arquivo
    ├── client-2-crestline/
    │   └── day-01.md ... day-18.md
    └── client-3-aethon/
        └── day-01.md ... day-25.md
```

---

## 4. Dockerfile.wardex

Build multi-stage. A imagem de runtime é Alpine puro — sem toolchain Go, sem cache,
sem ficheiros intermédios. O binário é o único artefacto copiado.

```dockerfile
# Stage 1 — Build
FROM golang:1.26-alpine AS builder

RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /build

# Copiar go.mod e go.sum primeiro para cache de dependências
COPY go.mod go.sum ./
RUN go mod download

# Copiar código-fonte
COPY . .

# Build com os mesmos flags do Makefile
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -ldflags="-s -w" -o wardex .

# Stage 2 — Runtime
FROM alpine:3.21

# Certificados para chamadas HTTPS (EPSS enrichment, KEV download futuro)
RUN apk add --no-cache ca-certificates tzdata

# Utilizador não-root
RUN addgroup -S wardex && adduser -S wardex -G wardex

WORKDIR /workspace
COPY --from=builder /build/wardex /usr/local/bin/wardex

# Permissões
RUN chown wardex:wardex /workspace
USER wardex

ENTRYPOINT ["wardex"]
CMD ["--help"]
```

O container corre sempre como utilizador não-root. O `/workspace` é o volume montado
pelo pipeline — é onde vivem `wardex-config.yaml`, `wardex-vulns.yaml`, e onde são
escritos os artefactos Art. 14 e o audit log.

---

## 5. GitHub Actions — arquitectura dos três pipelines

Cada pipeline de cliente segue a mesma estrutura de jobs, com variações de scope:

```
trigger: push to main / PR / workflow_dispatch

jobs:
  pre-eval          → validação do envelope de evidências
  sast              → Semgrep + Bearer
  sca               → Trivy filesystem
  iac               → Trivy config + Checkov
  wardex-gate       → wardex evaluate (depende de sast + sca)
  compliance-check  → verificação de artefactos CRA (depende de wardex-gate)
  report            → sumário consolidado (depende de todos)
```

O `wardex-gate` job usa a imagem Docker construída do `Dockerfile.wardex`. O código
fonte do Wardex não está no repositório do lab — o Dockerfile faz `git clone` do
repositório público `github.com/had-nu/wardex` no stage de build, ou usa a imagem
publicada no GHCR se disponível.

**Decisão de design:** o pipeline não falha em `warn` — só em `block` (exit 10) e
`actively_exploited` (exit 12). Exit 11 (compliance gap) gera anotação mas não bloqueia
o merge, porque o remédio pode ser documentação, não código.

---

## 6. Playbook — formato de cada dia

Cada ficheiro `day-NN.md` segue esta estrutura fixa:

```markdown
# Dia NN — [Título]
**Cliente:** [nome]  
**Papel:** André Ataíde, Root Security Governance Advisory  
**Duração estimada:** X horas  
**Artefactos produzidos:** [lista]

## Contexto narrativo
[O que está a acontecer neste dia — reunião, email, descoberta técnica,
pressão do cliente, decisão difícil. Escrito na segunda pessoa: "Recebes
um email...", "O CTO diz que...", "O Trivy devolve..."]

## Tarefa(s) do dia
[O que o praticante tem de fazer — comandos, documentos a preencher,
decisões a tomar]

## Artefactos
[Ficheiros a produzir ou consultar, com paths relativos ao repositório]

## Pergunta de reflexão
[Uma pergunta que não tem resposta no playbook — obriga a pensar]

## Resposta modelo (expandir para ver)
<details>
<summary>Ver resposta</summary>
[Resposta detalhada — não decorar, usar como referência depois de tentar]
</details>
```

---

## 7. Documentos contratuais — estrutura

### Proposta de serviço (ROOT-SP-NNN)
- Identificação das partes (Root + cliente)
- Descrição do scope (artigos CRA cobertos, exclusões explícitas)
- Metodologia (fases, entregáveis por fase)
- Equipa (André Ataíde, Especialista AppSec/GRC)
- Honorários (valor diário × dias estimados + IVA)
- Condições de pagamento
- Validade da proposta

### Contrato de prestação de serviços (ROOT-CT-NNN)
- Identificação das partes com NIF
- Objecto do contrato (por referência à proposta)
- Obrigações da Root (entregáveis, prazos)
- Obrigações do cliente (acesso a sistemas, disponibilidade de interlocutor)
- Confidencialidade
- Propriedade intelectual dos artefactos
- Limitação de responsabilidade (Root não certifica conformidade — prepara evidências)
- Rescisão
- Lei aplicável: Portugal, foro do Porto

### Recibo / Fatura (ROOT-RC-NNN)
- Emitido por Root Security Governance Advisory (ENI)
- NIF do emitente e do cliente
- Descrição do serviço por referência ao contrato
- Valor + IVA
- Data de emissão e prazo de pagamento

A cláusula de limitação de responsabilidade nos contratos é crítica: a Root prepara
artefactos, não certifica conformidade. Nenhum contrato deve conter linguagem que
implique que os entregáveis são suficientes para conformidade CRA sem avaliação
adicional onde aplicável (Classe II exige terceiro).

---

## 8. Escalonamento de complexidade entre clientes

### O que o Cliente 1 introduz
- Estrutura base: proposta → contrato → kickoff → pipeline → gate → artefacto → entrega
- Wardex como gate de release num produto SaaS sem histórico de segurança
- Artefacto Art. 14 gerado pela primeira vez — o praticante preenche os campos em falta
- Anexo VII básico: descrição do produto, avaliação de risco, lista de componentes

### O que o Cliente 2 adiciona
- SBOM como input obrigatório — o gate bloqueia sem SBOM presente
- VDP com processo documentado (não apenas um email de contacto)
- Período de apoio: justificação de 5 anos para um produto industrial
- Documentação técnica simplificada PME (Art. 33) — diferente do Anexo VII padrão
- Hard stop de compliance que o cliente tenta negociar: o praticante tem de recusar
  fundamentando no texto do regulamento, não na opinião da Root

### O que o Cliente 3 adiciona
- Classe II: o praticante não pode conduzir a avaliação da conformidade — precisa de
  encaminhar para organismo notificado
- Declaração de conformidade UE (Anexo V): estrutura, campos obrigatórios, o que a
  Root pode e não pode assinar
- Conflito de interesses: o CTO quer lançar em Dezembro, o organismo notificado tem
  pipeline de 6 meses — como se documenta este risco no relatório final
- Múltiplos stakeholders com posições diferentes: CISO quer conformidade total, CFO
  quer minimizar custo, CTO quer velocidade. O praticante tem de produzir uma
  recomendação que aborda os três

---

## 9. Integração com o lab existente

O `docker-compose.yml` existente não muda — os serviços de scanner continuam a
funcionar como antes. O Wardex é adicionado como novo serviço com profile `wardex`:

```yaml
wardex:
  build:
    context: .
    dockerfile: Dockerfile.wardex
  volumes:
    - ./clients/${CLIENT}/wardex:/workspace
    - ./clients/${CLIENT}/reports:/workspace/reports
  environment:
    - WARDEX_ACTOR=${USER}
    - WARDEX_ACCEPT_SECRET=${WARDEX_ACCEPT_SECRET}
  profiles: ["wardex"]
```

O `CLIENT` é passado como variável de ambiente ao invocar o compose:

```bash
CLIENT=nexus-dynamics ./run.sh wardex
```

O `run.sh` ganha os targets `wardex`, `cra-check`, e `compliance-report`:

```bash
./run.sh wardex           # Corre wardex evaluate para o CLIENT activo
./run.sh cra-check        # Verifica presença dos artefactos CRA obrigatórios
./run.sh compliance-report # Gera sumário de conformidade consolidado
```

---

## 10. Sequência de produção de ficheiros

A spec está definida. Os ficheiros são produzidos nesta ordem para que cada camada
dependa da anterior:

**Fase 1 — Infraestrutura base (independente de cliente)**
1. `Dockerfile.wardex`
2. Extensões ao `docker-compose.yml`
3. Extensões ao `run.sh`
4. `.github/workflows/cra-nexus.yml`

**Fase 2 — Cliente 1: Nexus Dynamics**
5. Documentos contratuais (ROOT-SP-001, ROOT-CT-001, ROOT-RC-001)
6. Ficheiros Wardex (wardex-config.yaml, wardex-vulns.yaml, kev-stub)
7. Templates de compliance (annex-vii.md, art14-artefact-template.json)
8. Playbook dias 1-12

**Fase 3 — Cliente 2: Crestline Systems**
9. `.github/workflows/cra-crestline.yml`
10. Documentos contratuais (ROOT-SP-002, ROOT-CT-002, ROOT-RC-002)
11. Ficheiros Wardex + SBOM + VDP
12. Templates de compliance (annex-vii-full.md, support-period-justification.md)
13. Playbook dias 1-18

**Fase 4 — Cliente 3: Aethon Security**
14. `.github/workflows/cra-aethon.yml`
15. Documentos contratuais (ROOT-SP-003, ROOT-CT-003, ROOT-RC-003)
16. Ficheiros Wardex + SBOM + VDP + declaração parcial
17. Templates de compliance (annex-vii-auditable.md, annex-v-eu-declaration.md,
    third-party-eval-brief.md)
18. Playbook dias 1-25

---

## 11. Decisões tomadas

### OD-01 — Fonte do binário Wardex no Dockerfile.

**Decisão:** Opção A — `git clone` no stage de build.
**Justificação:**
- O release v2.0.1 do Wardex não tem assets binários (0 assets) nem imagem GHCR
- Opção B (binário local) exigiria build manual antes de cada Docker build — quebra a
  experiência de "correr e funcionar" do lab
- O Dockerfile final (`Dockerfile.wardex`) usa `git clone --depth 1 --branch v2.0.1`
  no builder stage, com correcções adicionais:
  - `main()` em `./cmd/wardex` (não na raiz como a SPEC original assumia)
  - Tagged release em vez de `main` para reprodutibilidade

### OD-02 — Valor dos honorários nas propostas.

**Decisão:** Valores confirmados conforme proposto:
| Cliente | Dias | Valor/dia | Total c/ IVA |
|---|---|---|---|
| Nexus Dynamics | 12 | €650 | €9.594 |
| Crestline Systems | 18 | €650 | €14.391 |
| Aethon Security | 25 | €750 | €23.062,50 |

O valor do Cliente 3 (€750/dia) reflecte a complexidade adicional de coordenação com
organismo notificado e produção da declaração UE.

### OD-03 — NIF fictício dos clientes.

**Decisão:** Prefixo `999` (claramente fictício):
- Nexus Dynamics: 999 123 456
- Crestline Systems: 999 234 567
- Aethon Security: 999 345 678
- Root Security: 999 654 321

### OD-04 — act vs. push real para GitHub Actions.

**Decisão:** Workflows concebidos para funcionar com `act` nos steps SAST, SCA, IaC,
e wardex-gate. Os steps compliance-check com validação de SBOM e Anexo V requerem
push real ou `act` com segredos configurados. Documentado no README.
