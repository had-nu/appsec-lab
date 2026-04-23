# Application Security Playground

Lab de prática AppSec para desenvolvimento de competências de análise.

O objectivo *não* é aprender a operar ferramentas. É aprender a extrair inteligência do output dessas ferramentas e converter essa inteligência em decisões de risco — que é exactamente o que se espera de um Especialista AppSec Sénior num contexto regulado (DORA/ISO 27001).

---

## Configuração do ambiente

### 1. Pré-requisitos

Este lab corre inteiramente em containers. Precisas de:

- **Docker Engine** (≥ 24.0) — o daemon que corre os containers
- **Docker Compose v2** — integrado no Docker Desktop e no Docker Engine moderno; verifica com `docker compose version` (nota: `docker compose`, não `docker-compose`)
- **~4 GB de espaço em disco** para as imagens das ferramentas
- **~2 GB de RAM** disponíveis para o ZAP + Juice Shop simultâneos

**Garuda Linux (fish shell):**
```fish
# Instalar Docker Engine (se ainda não estiver)
sudo pacman -S docker docker-compose
sudo systemctl enable --now docker

# Adicionar o teu utilizador ao grupo docker para não precisar de sudo
sudo usermod -aG docker $USER
newgrp docker

# Verificar
docker version
docker compose version
```

**Verificar que o daemon está a correr:**
```bash
sudo systemctl status docker
# deve mostrar: Active: active (running)
```

---

### 2. Clonar / preparar o repositório

```bash
# Se vires do GitHub/Codeberg:
git clone <url-do-repo>
cd appsec-lab

# Se abrires o zip directamente:
unzip appsec-lab.zip
cd appsec-lab
```

Tornar o script executável:
```bash
chmod +x run.sh
```

---

### 3. Verificar a estrutura

Antes de correr qualquer coisa, confirma que tens esta estrutura:

```
appsec-lab/
├── docker-compose.yml    ← orquestração de todos os scanners
├── run.sh                ← script de execução (o teu ponto de entrada)
├── config/
│   └── bearer-config.yml ← configuração do Bearer SAST
├── reports/              ← criado automaticamente pelo run.sh
└── src/
    └── sample-vulnerable.js  ← código de exemplo com 6 CWEs reais
```

---

### 4. Pull das imagens (opcional mas recomendado antes do primeiro run)

Na primeira execução, o Docker vai fazer pull de todas as imagens. Isto pode demorar vários minutos dependendo da ligação. Para fazer o pull antecipadamente:

```bash
# Ferramentas SAST
docker pull returntocorp/semgrep:latest
docker pull bearer/bearer:latest

# SCA + IaC
docker pull aquasec/trivy:latest
docker pull bridgecrew/checkov:latest

# DAST
docker pull ghcr.io/zaproxy/zaproxy:stable

# Target
docker pull bkimminich/juice-shop:latest
```

Depois do pull, todas as imagens ficam em cache local — os runs seguintes são instantâneos a iniciar.

---

### 5. Primeiro run — validação do setup

O SAST é o mais rápido e não precisa de rede depois do pull. Usa-o para confirmar que tudo funciona:

```bash
./run.sh sast
```

O que deves ver:
```
[*] Running SAST (Semgrep + Bearer)...
...
[+] SAST reports written to ./reports/
```

Confirma que os ficheiros foram criados:
```bash
ls -lh reports/
# deve aparecer: semgrep.json  bearer.json
```

Se os ficheiros existem e não estão vazios, o lab está operacional.

---

### 6. Problemas comuns

**`permission denied` ao correr `./run.sh`:**
```bash
chmod +x run.sh
```

**`docker compose` não reconhecido (Compose v1 instalado):**
```bash
# Verificar versão
docker-compose --version   # v1 — formato antigo
docker compose version     # v2 — o que o lab usa

# No Garuda, instalar o plugin v2:
sudo pacman -S docker-compose  # já inclui v2 nos repos actuais
```

**`Got permission denied while trying to connect to the Docker daemon`:**
```bash
# Utilizador não está no grupo docker
sudo usermod -aG docker $USER
# Fazer logout e login, ou:
newgrp docker
```

**ZAP não consegue ligar ao Juice Shop:**
O ZAP depende do Juice Shop estar healthy antes de iniciar. O `run.sh dast` trata disso automaticamente com um wait. Se falhar, corre primeiro `./run.sh target` em separado, espera ver `Juice Shop running at http://localhost:3000`, e só depois `./run.sh dast`.

**Espaço em disco insuficiente:**
```bash
# Ver espaço usado por imagens Docker
docker system df
# Limpar imagens não usadas
docker image prune -a
```

---

## Comandos de execução

```bash
./run.sh sast     # Semgrep + Bearer contra ./src (rápido, sem rede)
./run.sh sca      # Trivy filesystem scan de ./src
./run.sh dast     # Inicia Juice Shop + ZAP baseline (demora ~2-3 min)
./run.sh iac      # Trivy config + Checkov sobre os ficheiros do lab
./run.sh all      # Tudo (requer Juice Shop healthy)
./run.sh target   # Só inicia o Juice Shop em http://localhost:3000
./run.sh report   # Sumário de findings dos últimos runs
./run.sh down     # Desmonta os containers e limpa a rede
```

---

## Ferramentas incluídas

| Ferramenta | Tipo | O que detecta |
|---|---|---|
| **Semgrep** | SAST | Padrões de código inseguro, misuse de APIs, injecção, auth issues |
| **Bearer** | SAST | Exposição de dados sensíveis, data flows, PII leakage |
| **Trivy (fs)** | SCA | CVEs em dependências, segredos expostos |
| **Trivy (config)** | IaC | Misconfigs em Dockerfiles, Compose, CI/CD |
| **Checkov** | IaC | Misconfigs de infra, Dockerfile best practices |
| **OWASP ZAP** | DAST | Vulnerabilidades em runtime (XSS, headers, etc.) |

**Target:** OWASP Juice Shop — aplicação deliberadamente vulnerável com falhas reais do OWASP Top 10.

---

## Estrutura do laboratório

```
appsec-lab/
├── docker-compose.yml   # Orquestra todos os scanners
├── run.sh               # Script de execução
├── config/
│   └── bearer-config.yml
├── reports/             # Output dos scanners (gerado)
│   ├── semgrep.json
│   ├── bearer.json
│   ├── trivy-fs.json
│   ├── trivy-iac.json
│   ├── zap-baseline.json
│   └── zap-baseline.html
└── src/                 # Código a analisar com SAST
    └── (colar código aqui para praticar análise)
```

---

## Plano de sprint — 5 dias

### Dia 1: Setup + SAST

**Objectivo:** Ter o lab a funcionar e ler os primeiros findings.

```bash
./run.sh sast
```

Depois de correr, abrir `reports/semgrep.json` e responder a estas perguntas para cada finding:

1. Qual é o CWE associado? (ex: CWE-89 = SQL Injection)
2. O que é que o código está a fazer de errado?
3. Se isto fosse em produção, o que é que um atacante conseguia fazer?
4. Como se corrige?

**Meta do dia:** Conseguir articular 5 findings sem consultar documentação.

---

### Dia 2 — SCA + mapeamento de risco

**Objectivo:** Distinguir CVE base score de risco contextual.

```bash
./run.sh sca
```

Para cada CVE HIGH/CRITICAL em `reports/trivy-fs.json`:

1. Qual é o CVSS base score? E o CVSS environmental (se aplicável)?
2. O attack vector é network ou local?
3. Precisa de autenticação para ser explorado?
4. Que dados/funções estão em risco nesta aplicação específica?
5. O vendor tem patch? Se não, que compensating control existe?

**Pergunta-chave para a entrevista:** *"Um vendor diz que um CVE crítico não é explorável no vosso contexto. Como validas?"*

Resposta provável: attack vector + privileges required + qual dado/função exposta + log de acesso ao componente. Não aceitas a afirmação sem evidência.

---

### Dia 3 — DAST + IaC

**Objectivo:** Ver o que aparece em runtime vs. análise estática.

```bash
./run.sh dast   # Inicia Juice Shop + corre ZAP
./run.sh iac    # Checkov + Trivy config
```

Para os alertas ZAP em `reports/zap-baseline.json`:

- Quais aparecem no DAST que não aparecem no SAST? Porquê?
- (Resposta: misconfigs de HTTP headers, CORS, cookies — não são bugs de código, são configuração de runtime)

Para os findings IaC:
- O que é um container a correr como root? Qual é o risco real?
- O que é uma imagem sem tag fixa (`latest`)? Por que é um risco de supply chain?

---

### Dia 4 — Integração + linguagem de risco

**Objectivo:** Converter output técnico em decisão de risco no contexto DORA.

Exercício prático — para cada categoria de finding encontrada, escrever uma frase que responderia ao Diretor de SI:

> *"Encontrámos X instâncias de [tipo de vulnerabilidade] na aplicação [Y]. Em termos de risco, isto significa [impacto de negócio]. Recomendo [acção] porque [justificação]. Se optarmos por aceitar o risco temporariamente, o registo de risco deve incluir [owner, prazo, critério de reabertura]."*

Fazer isto para pelo menos 3 findings diferentes. É o exercício mais importante desta semana.

**Mapeamento DORA:**
- Finding identificado por SAST → Article 8 (Identification) — já estava no registo?
- Control preventivo no pipeline → Article 9 (Protection)
- Detecção em runtime pelo ZAP → Article 10 (Detection)

---

### Dia 5 — Mock + revisão de gaps

**Objectivo:** Simular a entrevista. As respostas a seguir são apenas um guia, não são para decorar.

1. *"Um SAST devolve 300 findings. Como começas?"*
    > Prioritização por severidade, criticidade, localização e dependências.

2. *"Dois dias antes de um release, aparece uma SQL injection num endpoint autenticado de backoffice. O que fazes?"*
    > 

3. *"O que é que o DORA exige em termos de gestão de risco ICT aplicacional?"*
    > 

4. *"Como integrarias um SAST num pipeline sem bloquear o delivery de forma cega?"*
    > 

5. *"Explica a diferença prática entre SAST e DAST a um gestor de negócio."*
    > SAST encontra problemas no código antes de existir aplicação em execução — é análise do potencial. DAST testa a aplicação real em execução — é validação do comportamento. Um não substitui o outro.

---

## Path to follow-up (6 months)

### Fase 1 — Mês 1-2: Profundidade técnica

- **OWASP Top 10 Web + API:** Para cada entrada, saber o mecanismo de exploração e o controlo preventivo. Não memorizar — compreender.
- **Triagem de CVEs:** Praticar com o NVD e com relatórios Trivy reais. Distinguir CVSS 9.8 não explorável de CVSS 7.0 explorado activamente (EPSS score).
- **Semgrep regras custom:** Escrever 2-3 regras para padrões específicos de código. Entender como um SAST decide o que é finding vs. noise.

### Fase 2 — Mês 3-4: Governance e compliance

- **ISO 27001:2022 Annex A — controles 8.25-8.29** em detalhe (os AppSec específicos).
- **DORA Articles 5-14** completos. Ler o texto original, não resumos.
- **Threat Modelling (STRIDE):** Aplicar a um sistema simples. É a competência que separa AppSec analítico de AppSec operacional.

### Fase 3 — Mês 5-6: Produção de inteligência

- **Relatório de avaliação AppSec:** Produzir um relatório completo de avaliação de uma aplicação (pode ser o Juice Shop). Inclui: scope, metodologia, findings categorizados, risco contextual, recomendações priorizadas, evidência de conformidade com controlos ISO 27001.
- **Publicação:** Transformar o relatório (anonimizado) num artigo técnico. Ligação directa ao teu perfil Medium.

---

## Referências rápidas

**CWEs mais comuns em SAST:**
- CWE-89: SQL Injection
- CWE-79: Cross-Site Scripting (XSS)
- CWE-22: Path Traversal
- CWE-287: Improper Authentication
- CWE-798: Hardcoded Credentials

**CVSS v3.1 — campos que importam para contextualização:**
- `AV` (Attack Vector): N=Network, L=Local, P=Physical
- `PR` (Privileges Required): N=None, L=Low, H=High
- `UI` (User Interaction): N=None, R=Required
- `S` (Scope): U=Unchanged, C=Changed

**DORA — artigos para AppSec:**
- Art. 8: Identificação de assets e risco (onde a finding entra no registo)
- Art. 9: Protecção e prevenção (onde os controlos SAST/SCA vivem)
- Art. 10: Detecção (onde o DAST e monitoring vivem)
- Art. 17: Gestão de incidentes (o que fazer depois de um incidente aplicacional)

**ISO 27001:2022 — Controlos AppSec (Anexo A):**
- 8.25: Secure system development lifecycle (Integração de segurança no SDLC)
- 8.26: Application security requirements (Definição de requisitos de segurança antes do código)
- 8.27: Secure system architecture and engineering principles (Arquitetura segura)
- 8.28: Secure coding (Práticas de código seguro e validação através de ferramentas como SAST)
- 8.29: Security testing in development and acceptance (Validação através de DAST, SCA e pentests)