#!/usr/bin/env bash
# appsec-lab run script
# Usage: ./run.sh [target] [--help]

set -euo pipefail

REPORTS_DIR="./reports"
mkdir -p "$REPORTS_DIR"
chmod 777 "$REPORTS_DIR"

usage() {
  cat <<EOF
appsec-lab — AppSec tooling practice environment

USAGE
  ./run.sh <target>

TARGETS
  all       Run everything (requires juice-shop to be up)
  sast      Semgrep + Bearer against ./src
  sca       Trivy filesystem scan of ./src
  dast      ZAP baseline against juice-shop (starts it first)
  iac       Trivy config + Checkov against lab configs
  target    Start Juice Shop only (for manual testing)
  report    Pretty-print latest findings summary

EXAMPLES
  ./run.sh sast           # Run SAST only, fast
  ./run.sh dast           # Start Juice Shop + run ZAP
  ./run.sh all            # Full pipeline
  ./run.sh report         # Summarise what's in reports/
EOF
}

start_target() {
  echo "[*] Starting Juice Shop..."
  docker compose up -d juice-shop
  echo "[*] Waiting for Juice Shop to be healthy..."
  docker compose wait juice-shop || sleep 15
  echo "[+] Juice Shop running at http://localhost:3000"
}

run_sast() {
  echo "[*] Running SAST (Semgrep + Bearer)..."
  docker compose --profile sast up --abort-on-container-exit 
  echo "[+] SAST reports written to $REPORTS_DIR/"
}

run_sca() {
  echo "[*] Running SCA (Trivy filesystem)..."
  docker compose --profile sca up --abort-on-container-exit
  echo "[+] SCA report written to $REPORTS_DIR/trivy-fs.json"
}

run_dast() {
  start_target
  echo "[*] Running DAST (ZAP baseline)..."
  docker compose --profile dast up --abort-on-container-exit
  echo "[+] DAST reports written to $REPORTS_DIR/zap-baseline.*"
}

run_iac() {
  echo "[*] Running IaC scan (Trivy config + Checkov)..."
  docker compose --profile iac up --abort-on-container-exit
  echo "[+] IaC reports written to $REPORTS_DIR/"
}

print_report() {
  echo ""
  echo "══════════════════════════════════════"
  echo "  FINDINGS SUMMARY"
  echo "══════════════════════════════════════"

  if [ -f "$REPORTS_DIR/semgrep.json" ]; then
    COUNT=$(python3 -c "import json,sys; d=json.load(open('$REPORTS_DIR/semgrep.json')); print(len(d.get('results',[])))" 2>/dev/null || echo "?")
    echo "  Semgrep findings : $COUNT"
  fi

  if [ -f "$REPORTS_DIR/bearer.json" ]; then
    COUNT=$(python3 -c "
import json,sys
d=json.load(open('$REPORTS_DIR/bearer.json'))
total=len(d.get('critical',[])) + len(d.get('high',[])) + len(d.get('medium',[])) + len(d.get('low',[]))
print(total)
" 2>/dev/null || echo "?")
    echo "  Bearer findings  : $COUNT"
  fi

  if [ -f "$REPORTS_DIR/trivy-fs.json" ]; then
    COUNT=$(python3 -c "
import json,sys
d=json.load(open('$REPORTS_DIR/trivy-fs.json'))
total=sum(len(r.get('Vulnerabilities') or []) for r in d.get('Results',[]))
print(total)
" 2>/dev/null || echo "?")
    echo "  Trivy vulns      : $COUNT"
  fi

  if [ -f "$REPORTS_DIR/zap-baseline.json" ]; then
    COUNT=$(python3 -c "
import json,sys
d=json.load(open('$REPORTS_DIR/zap-baseline.json'))
print(len(d.get('site',[{}])[0].get('alerts',[])))
" 2>/dev/null || echo "?")
    echo "  ZAP alerts       : $COUNT"
  fi

  if [ -f "$REPORTS_DIR/trivy-iac.json" ]; then
    COUNT=$(python3 -c "
import json,sys
d=json.load(open('$REPORTS_DIR/trivy-iac.json'))
total=sum(len(r.get('Misconfigurations') or []) for r in d.get('Results',[]))
print(total)
" 2>/dev/null || echo "?")
    echo "  Trivy IaC issues : $COUNT"
  fi

  echo "══════════════════════════════════════"
  echo "  Reports in: $REPORTS_DIR/"
  echo ""
}

case "${1:-help}" in
  all)
    run_sast
    run_sca
    run_dast
    run_iac
    print_report
    ;;
  sast)    run_sast ;;
  sca)     run_sca ;;
  dast)    run_dast ;;
  iac)     run_iac ;;
  target)  start_target ;;
  report)  print_report ;;
  *)       usage ;;
esac
