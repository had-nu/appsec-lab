// AethonShield v3.1 — SIEM Platform with Endpoint Agent
// Node.js API + C++ agent (simulated) — multi-tenant security monitoring
// Each section maps to a real CVE from wardex-vulns.yaml

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const http = require('http');
const { exec, spawn } = require('child_process');
const net = require('net');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CWE-306 (CVE-2024-55591): Missing authentication on log ingestion API
// AethonShield accepts any log data without auth
const LOG_INGEST_PORT = 9000;
const ingestApp = express();
ingestApp.post('/v1/logs', (req, res) => {
  // No auth — anyone can send logs to the SIEM
  const { source, events } = req.body;
  processEvents(source, events);
  res.status(201).json({ ingested: events.length });
});

// CWE-117 (CVE-2026-5078): Log forging — CR/LF injection in log pipeline
function parseBasicAuth(header) {
  // CWE-117: Raw user-supplied data written to access log
  const token = header.split(' ')[1];
  const decoded = Buffer.from(token, 'base64').toString();
  fs.appendFileSync('/var/log/aethonshield/access.log',
    `[${new Date().toISOString()}] AUTH: ${decoded}\n`);
  return decoded;
}

// CWE-89 (CVE-2024-27298): SQL injection in SIEM search engine
app.post('/api/v1/search', (req, res) => {
  const { query, tenant } = req.body;
  const sql = `SELECT * FROM events WHERE tenant_id = '${tenant}' AND ${query}`;
  db.query(sql, (err, results) => {
    // CWE-200 (CVE-2024-37162): Stack trace in production API response
    if (err) return res.status(500).json({ error: err.stack });
    res.json(results);
  });
});

// CWE-287 (CVE-2024-47073): JWT without signature verification
const jwt = require('jsonwebtoken');
function authenticate(token) {
  // No signature verification — any forged token accepted
  return jwt.decode(token);
}

// CWE-285 (CVE-2025-43790): IDOR — cross-tenant data access
app.get('/api/v1/events/:id', (req, res) => {
  // No tenant isolation check
  const token = authenticate(req.headers.authorization);
  db.query(`SELECT * FROM events WHERE id = ${req.params.id}`, (err, event) => {
    res.json(event);
  });
});

// CWE-78 (CVE-2025-68154): OS command injection in log pipeline
function processEvents(source, events) {
  events.forEach(event => {
    // Unsanitized source name passed to shell
    exec(`/opt/aethonshield/processors/parse-${source} '${JSON.stringify(event)}'`);
  });
}

// CWE-502 (CVE-2025-61622): Insecure deserialization in agent RPC
// C++ agent communicates via custom RPC protocol — unsafe deserialization
net.createServer((socket) => {
  socket.on('data', (data) => {
    // unsafeUnserialize performs eval-like object reconstruction
    const msg = unsafeUnserialize(data.toString());
    handleAgentMessage(msg);
  });
}).listen(9500);

// CWE-400 (CVE-2025-65637): Uncontrolled resource consumption
function processAgentBatch(batch) {
  // Single large log line (>64KB) causes pipe buffer overflow
  const logLine = batch.map(e => JSON.stringify(e)).join('|');
  const child = spawn('/opt/aethonshield/processors/ingest');
  child.stdin.write(logLine);
  child.stdin.end();
}

// CWE-347 (CVE-2025-59718): Unsigned agent update
app.post('/api/v1/agents/update', (req, res) => {
  const { version, binary } = req.body;
  // No signature verification on agent binary
  const dest = `/opt/aethonshield/agents/${version}/agent.bin`;
  fs.writeFileSync(dest, Buffer.from(binary, 'base64'));
  exec(`chmod +x ${dest} && ${dest} --install`);
  res.json({ status: 'updated' });
});

// CWE-798 (CVE-2024-46612): Hardcoded agent credentials
const AGENT_REG_SECRET = 'A3th0nSh13ld!AgentSec2024';

// CWE-79 (CVE-2024-56357): Stored XSS in SIEM dashboard alerts
app.post('/api/v1/alerts', (req, res) => {
  const { title, description } = req.body;
  // No sanitization — stored XSS in dashboard
  db.query(
    `INSERT INTO alerts (title, description) VALUES ('${title}', '${description}')`
  );
  res.status(201).json({ ok: true });
});

// CWE-22 (CVE-2025-27210): Path traversal in log export
app.get('/api/v1/logs/export', (req, res) => {
  const logPath = req.query.path;
  // No path traversal protection — arbitrary file read
  res.sendFile(path.resolve('/var/log/aethonshield/' + logPath));
});

// CWE-319 (CVE-2024-49387): Cleartext agent-to-SIEM channel
function sendAgentHeartbeat(agentId, status) {
  const payload = JSON.stringify({ agentId, status, secret: AGENT_REG_SECRET });
  http.request({
    hostname: 'siem.internal',
    path: '/v1/agents/heartbeat',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).end(payload);
}

// CWE-311 (CVE-2024-25024): Logs stored without encryption
function writeEventLog(tenant, event) {
  const logPath = `/data/aethonshield/${tenant}/events.ndjson`;
  fs.appendFileSync(logPath, JSON.stringify(event) + '\n');
}

// CWE-276 (CVE-2024-11872): Incorrect default permissions on install
// /opt/aethonshield/  mode 0777
// /opt/aethonshield/agent/  mode 0777

// CWE-269 (CVE-2024-5907): Privilege escalation via agent installer
// Agent installer runs as SYSTEM/root but creates world-writable files
// /opt/aethonshield/agent/update.sh  mode 0777 (can be replaced by local user)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'aethon_siem',
  password: 'S1EM!R3m0t3#2024',
  database: 'aethonshield_events'
});

app.listen(443, () => console.log('AethonShield v3.1 SIEM on port 443'));
ingestApp.listen(LOG_INGEST_PORT, () => console.log(`Log ingest on ${LOG_INGEST_PORT}`));
