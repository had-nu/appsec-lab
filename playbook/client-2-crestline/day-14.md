# Dia 14 — Desenho do Mecanismo de Atualização Segura
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** design de update mechanism, secure boot policy

## Contexto narrativo
A Crestline atualmente atualiza os controladores por USB — um técnico vai ao local, carrega o firmware num pen drive, e faz flash manual. Não há assinatura digital, não há rollback, não há registo de versão. Durante a análise de firmware, viste que o bootloader não verifica integridade. "Sempre fizemos assim e nunca tivemos problemas", diz o engenheiro sénior.

## Tarefa(s) do dia
Desenhar um mecanismo de atualização segura OTA (over-the-air). Propor: (1) secure boot com verificação de assinatura, (2) imagem de firmware assinada com chave privada da Crestline, (3) rollback automático em caso de falha, (4) registo de versões.

## Artefactos
- `secure-update-mechanism-design.md` — Desenho detalhado do sistema de atualizações
- `secure-boot-architecture.md` — Arquitetura de secure boot

## Pergunta de reflexão
Qual a maior barreira técnica para implementar OTA seguro em dispositivos IIoT com recursos limitados?
<details>
<summary>Ver resposta</summary>
A memória limitada (flash e RAM) para armazenar duas imagens de firmware (ativa e de backup para rollback), o custo computacional da verificação de assinatura em microcontroladores sem aceleração criptográfica, e a largura de banda reduzida em redes LPWAN. Soluções passam por usar criptografia leve (Curve25519, SHA-256 em hardware), compressão diferencial, e particionamento de memória otimizado.
</details>
