// NexusFlow v2.3 — SaaS Manufacturing Platform
// Node.js/Express — simulated codebase for AppSec lab
// Each section maps to a real CVE from wardex-vulns.yaml

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const http = require('http');
const { exec } = require('child_process');

const app = express();

// CWE-798 (CVE-2024-53356): Hardcoded credentials in configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: 'nexus_ro',
  password: 'NexusR3m0t3!2024',
  database: 'nexusflow_prod'
});

// CWE-1104 (CVE-2025-10220): Unmaintained dependency
// Package "express-session" pinned at 1.15.0 — 3 years without update (CVE-2024-XXXXX)
const session = require('express-session');

// CWE-89 (CVE-2024-27298): SQL injection in production search API
app.get('/api/orders/search', (req, res) => {
  const query = `SELECT * FROM orders WHERE order_ref = '${req.query.q}'`;
  db.query(query, (err, results) => {
    if (err) {
      // CWE-200 (CVE-2024-37162): Stack trace leak
      res.status(500).send({ error: err.stack });
      return;
    }
    res.json(results);
  });
});

// CWE-918 (CVE-2024-29415): SSRF in supplier webhook integration
app.post('/api/integrations/webhook', (req, res) => {
  const { supplierUrl, payload } = req.body;
  // No hostname validation — SSRF via supplier URL
  http.get(`${supplierUrl}/notify`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => data += chunk);
    resp.on('end', () => res.json({ status: 'forwarded', response: data }));
  });
});

// CWE-285 (CVE-2025-3013): IDOR — orders accessible by any authenticated user
app.get('/api/orders/:id', (req, res) => {
  // No tenant check — any user can access any order
  const token = parseToken(req.headers.authorization);
  // CWE-287 (CVE-2024-54150): JWT algorithm confusion
  const user = jwt.verify(token, getPublicKey());
  db.query(`SELECT * FROM orders WHERE id = ${req.params.id}`, (err, order) => {
    res.json(order);
  });
});

// CWE-79 (CVE-2024-56357): Stored XSS in production order comments
app.post('/api/orders/:id/comments', (req, res) => {
  const comment = req.body.text;
  db.query(
    `INSERT INTO order_comments (order_id, text) VALUES (${req.params.id}, '${comment}')`,
    (err) => {
      res.json({ ok: true });
    }
  );
});

// CWE-22 (CVE-2025-27210): Path traversal in report download
app.get('/api/reports/download', (req, res) => {
  const fileName = req.query.file;
  // No path sanitization — path.join on Windows bypass possible
  res.sendFile(`/var/nexusflow/reports/${fileName}`);
});

// CWE-352 (CVE-2024-20252): CSRF — state-changing endpoints without tokens
app.post('/api/orders/:id/cancel', (req, res) => {
  // No CSRF token validation
  db.query(`UPDATE orders SET status = 'cancelled' WHERE id = ${req.params.id}`);
  res.json({ status: 'cancelled' });
});

// CWE-523 (CVE-2024-1509): Internal API over cleartext HTTP
function notifyInventory(depotId, qty) {
  http.get(`http://inventory.internal/adjust?depot=${depotId}&qty=${qty}`);
}

// CWE-620 (CVE-2024-48887): Unverified password change
app.post('/api/auth/reset', (req, res) => {
  const { email, newPassword } = req.body;
  // No current password verification — anyone can reset any account
  db.query(`UPDATE users SET password = '${hashPassword(newPassword)}' WHERE email = '${email}'`);
  res.json({ ok: true });
});

// CWE-916 (CVE-2024-24553): Weak password hashing
function hashPassword(password) {
  // SHA-1 — cryptographically broken
  return crypto.createHash('sha1').update(password).digest('hex');
}

// CWE-614 (CVE-2024-47833): Missing Secure flag on session cookie
app.use(session({
  secret: 'nexusflow-prod-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }
}));

app.listen(3000, () => console.log('NexusFlow v2.3 started on port 3000'));
