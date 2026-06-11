# Dia 03 — Requisito SBOM e Resistência do Cliente
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 5 horas
**Artefactos produzidos:** draft SBOM policy, minuta de cláusula contratual para fornecedores

## Contexto narrativo
Apresentas o conceito de SBOM à equipa da Crestline. O Miguel franze o sobrolho. "Nós não somos uma empresa de software — somos industriais. Fazemos controladores, não aplicações. Isto é burocracia europeia que não se aplica a fábricas." Explicas que o Regulamento (UE) 2019/881 (Cybersecurity Act) e a proposta CRA classificam explicitamente produtos IIoT como "produtos com elementos digitais". A resistência é palpável.

## Tarefa(s) do dia
Explicar o requisito de SBOM conforme Art. 3(42) e Anexo I (2)(f) da CRA. Elaborar uma política de SBOM adaptada ao contexto industrial. Definir formato SPDX 2.3 e frequência de geração.

## Artefactos
- `sbom-policy-crestline.md` — Política SBOM para a Crestline Systems
- `sbom-clausula-fornecedores.md` — Minuta de cláusula contratual

## Pergunta de reflexão
Como responder a um cliente que diz "não somos software, somos hardware"?
<details>
<summary>Ver resposta</summary>
A CRA define "produto com elementos digitais" como qualquer produto de software ou hardware com componentes de processamento de dados que se conecta direta ou indiretamente a um dispositivo ou rede. Um controlador IIoT que corre firmware, tem uma pilha TCP/IP e actualizações OTA é inequivocamente abrangido. O argumento não é técnico — é educacional. Mostrar que fabricantes concorrentes já estão a gerar SBOM ajuda a desarmar a resistência.
</details>
