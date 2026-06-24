// Sample vulnerable Node.js code for SAST practice
// Source: derived from OWASP Juice Shop patterns
// Purpose: give SAST tools real findings to analyse

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',       // CWE-798: Hardcoded credentials
  database: 'juice_shop'
});

// CWE-89: SQL Injection — user input concatenated directly into query
app.get('/search', (req, res) => {
  const query = "SELECT * FROM products WHERE name = '" + req.query.q + "'";
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// CWE-79: Reflected XSS — user input rendered without sanitisation
app.get('/user', (req, res) => {
  res.send('<html><body>Hello ' + req.query.name + '</body></html>');
});

// CWE-916: Weak password hashing — MD5 is cryptographically broken
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// CWE-22: Path Traversal — unvalidated file path from user input
const fs = require('fs');
app.get('/file', (req, res) => {
  const filePath = './uploads/' + req.query.filename;
  res.sendFile(filePath);
});

// CWE-614: Missing Secure flag on session cookie
app.use(require('express-session')({
  secret: 'juice-shop-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }  // missing secure + httpOnly
}));

// CWE-287: Weak authentication — predictable token
function generateToken(userId) {
  return Buffer.from(userId.toString()).toString('base64');  // trivially reversible
}

app.listen(3000);
