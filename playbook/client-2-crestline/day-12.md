# Dia 12 — Análise de Segurança de Rede
**Cliente:** Crestline Systems, S.A.
**Papel:** André Ataíde, Root Security Governance Advisory
**Duração estimada:** 6 horas
**Artefactos produzidos:** relatório de segurança de rede, recomendações de hardening

## Contexto narrativo
Os controladores Crestline comunicam via Modbus TCP, MQTT e um protocolo proprietário chamado CrestNet. Durante a análise de firmware, descobriste que o CrestNet não usa TLS — é plaintext com um checksum CRC32. Qualquer pessoa na mesma rede pode sniffar comandos, replayed packets, e enviar comandos falsos. O pior: as fábricas dos clientes colocam os controladores na mesma VLAN que os PCs administrativos.

## Tarefa(s) do dia
Analisar a segurança dos protocolos de comunicação. Testar a pilha MQTT para authentication bypass. Documentar a falta de encriptação no CrestNet. Propor roadmap de migração para TLS 1.3 e autenticação mútua.

## Artefactos
- `network-security-assessment.md` — Análise de protocolos de comunicação
- `crestnet-migration-roadmap.md` — Roadmap de migração para TLS

## Pergunta de reflexão
Porque é que fábricas ainda usam Modbus TCP sem encriptação em 2026?
<details>
<summary>Ver resposta</summary>
Porque Modbus foi desenhado nos anos 70 para ambientes isolados e serial. A versão TCP é uma adaptação que preserva a simplicidade. Milhares de dispositivos em campo não podem ser atualizados. A segurança em ambiente industrial é frequentemente compensada por segmentação de rede (air gap) — mas com IT/OT convergence e IIoT, as redes planas (tudo na mesma VLAN) tornam a falta de encriptação crítica. A CRA força a mudança.
</details>
