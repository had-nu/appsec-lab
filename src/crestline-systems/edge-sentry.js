// EdgeSentry v1.4 — IIoT Gateway Management
// Node.js API + C CLI (simulated) — OT industrial control
// Each section maps to a real CVE from wardex-vulns.yaml

const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const { exec, spawn } = require('child_process');

const app = express();

// CWE-306 (CVE-2024-55591): Missing authentication on OT management API
// No auth middleware on any route — API fully open
app.use((req, res, next) => {
  // Bypass auth entirely (simulating CVE-2024-55591 pattern)
  next();
});

// CWE-862 (CVE-2024-10575): Missing authorization on OT endpoints
app.get('/api/ot/devices/:id/config', (req, res) => {
  // No role check — any request can read device configs
  const config = fs.readFileSync(`/etc/edgesentry/devices/${req.params.id}/config.json`);
  res.json(JSON.parse(config));
});

app.post('/api/ot/gateway/reboot', (req, res) => {
  // No authorization — anyone can reboot industrial gateways
  exec('reboot');
  res.json({ status: 'rebooting' });
});

// CWE-89 (CVE-2024-27298): SQL injection in OT data query interface
app.get('/api/ot/query', (req, res) => {
  const { start, end, device } = req.query;
  const query = `SELECT * FROM telemetry WHERE device_id = '${device}' AND ts BETWEEN '${start}' AND '${end}'`;
  db.query(query, (err, rows) => {
    res.json(rows);
  });
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'ot_admin',
  password: 'OtGat3way!2024#',
  database: 'edgesentry_telemetry'
});

// CWE-798 (CVE-2024-46612): Hardcoded admin credentials in firmware
const FIRMWARE_ADMIN_USER = 'admin';
const FIRMWARE_ADMIN_PASS = 'Edg3S3ntry!';

// CWE-319 (CVE-2024-49387): Cleartext Modbus/TCP communication
function readModbusRegister(ip, register) {
  // Modbus/TCP without TLS — cleartext protocol
  const socket = net.createConnection(502, ip);
  socket.write(buildModbusPdu(register));
  // ...
}

// CWE-77 (CVE-2025-60021): OS command injection in admin CLI
app.post('/api/ot/cli', (req, res) => {
  // CWE-294 (CVE-2024-38890): No nonce — replay attacks possible
  const { command } = req.body;
  exec(`/opt/edgesentry/bin/ot-cli ${command}`, (err, stdout) => {
    res.json({ output: stdout });
  });
});

// CWE-22 (CVE-2024-21896): Path traversal in log access
app.get('/api/ot/logs', (req, res) => {
  const logFile = req.query.file || 'current';
  fs.readFile(`/var/log/edgesentry/${logFile}.log`, 'utf8', (err, data) => {
    if (err) {
      // CWE-200 (CVE-2024-29987): Topology info in error responses
      res.json({ error: err.message, devices: listAllDevices() });
      return;
    }
    res.json({ log: data });
  });
});

// CWE-347 (CVE-2024-47943): Unsigned firmware update
app.post('/api/ot/firmware/update', (req, res) => {
  const { version, binary } = req.body;
  // No signature verification — attacker can flash modified firmware
  const dest = `/opt/edgesentry/firmware/${version}.bin`;
  fs.writeFileSync(dest, Buffer.from(binary, 'base64'));
  exec(`/opt/edgesentry/bin/flash ${dest}`, (err) => {
    res.json({ status: err ? 'failed' : 'updated' });
  });
});

// CWE-494 (CVE-2024-47867): Insecure firmware download (no integrity check)
app.get('/api/ot/firmware/download/:version', (req, res) => {
  const url = `https://updates.crestline.io/firmware/${req.params.version}.bin`;
  // No checksum verification — MITM can serve malicious firmware
  res.redirect(url);
});

// CWE-276 (CVE-2024-37038): Incorrect default permissions
// Config files and binaries are world-writable
// /opt/edgesentry/config/*.json   mode 0777
// /opt/edgesentry/bin/*           mode 0777

// CWE-311 (CVE-2025-10227): OT data stored in plaintext
function storeTelemetry(data) {
  fs.writeFileSync('/opt/edgesentry/data/telemetry.raw', data);
}

// CWE-120 (CVE-2024-8748): Buffer overflow in network packet parser
// (simulated in C — demonstrated via oversized packet crash)
function parseModbusPacket(raw) {
  const buf = Buffer.alloc(128);
  // No bounds check — parses raw bytes, overflow when raw > 128
  raw.copy(buf);
  return buf.readUInt16BE(2);
}

const net = require('net');
app.listen(8080, () => console.log('EdgeSentry v1.4 OT gateway API on port 8080'));
