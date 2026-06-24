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
  all       Run full pipeline: SAST + SCA + IaC + Wardex (CLIENT obrigatório)
  sast      Semgrep + Bearer against src/<CLIENT>/
  sca       Trivy filesystem scan of src/<CLIENT>/
  iac       Trivy config + Checkov against lab configs
  wardex    Run Wardex gate (requires CLIENT env var)
  cra-check  Verify presence of mandatory CRA artifacts for CLIENT
  compliance-report  Generate consolidated compliance summary
  report    Pretty-print latest findings summary
  down      Stop and remove all containers and networks

EXAMPLES
  CLIENT=nexus-dynamics ./run.sh sast    # SAST for Nexus Dynamics
  CLIENT=nexus-dynamics ./run.sh all     # Full pipeline (SAST + SCA + IaC + Wardex)
  ./run.sh report         # Summarise what's in reports/
EOF
}

require_src_client() {
  if [ -z "${CLIENT:-}" ]; then
    echo "[!] CLIENT env var required. Usage: CLIENT=nexus-dynamics ./run.sh $1"
    echo "    Available: nexus-dynamics, crestline-systems, aethon-security"
    exit 1
  fi
  local dir="./src/$CLIENT"
  if [ ! -d "$dir" ]; then
    echo "[!] Client source directory not found: $dir"
    exit 1
  fi
}

run_sast() {
  require_src_client sast
  echo "[*] Running SAST (Semgrep + Bearer) for client: $CLIENT"
  CLIENT="$CLIENT" docker compose --profile sast up --abort-on-container-exit || true
  echo "[+] SAST reports written to $REPORTS_DIR/"
}

run_sca() {
  require_src_client sca
  echo "[*] Running SCA (Trivy filesystem) for client: $CLIENT"
  CLIENT="$CLIENT" docker compose --profile sca up --abort-on-container-exit || true
  echo "[+] SCA report written to $REPORTS_DIR/trivy-fs.json"
}

run_iac() {
  echo "[*] Running IaC scan (Trivy config + Checkov)..."
  docker compose --profile iac up --abort-on-container-exit || true
  echo "[+] IaC reports written to $REPORTS_DIR/"
}

print_report() {
  echo ""
  echo "══════════════════════════════════════"
  echo "  FINDINGS SUMMARY"
  echo "══════════════════════════════════════"

  if [ -f "$REPORTS_DIR/semgrep.json" ]; then
    COUNT=$(python3 -c "import json,sys; d=json.load(open('$REPORTS_DIR/semgrep.json')); print(len(d.get('results',[])))" 2>/dev/null || echo "?")
    echo "  Semgrep findings   : $COUNT"
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

  if [ -f "$REPORTS_DIR/results_json.json" ]; then
    COUNT=$(python3 -c "
import json,sys
d=json.load(open('$REPORTS_DIR/results_json.json'))
print(d.get('failed', 0))
" 2>/dev/null || echo "?")
    echo "  Checkov failed    : $COUNT"
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

require_client() {
  if [ -z "${CLIENT:-}" ]; then
    echo "[!] CLIENT env var required. Usage: CLIENT=nexus-dynamics ./run.sh $1"
    exit 1
  fi
  local dir="./clients/$CLIENT"
  if [ ! -d "$dir" ]; then
    echo "[!] Client directory not found: $dir"
    exit 1
  fi
}

run_wardex() {
  require_client wardex
  local dir="./clients/$CLIENT"

  # Ensure reports dir is writable by container user
  mkdir -p "$dir/reports"
  chmod 777 "$dir/reports"

  echo "[*] Running Wardex gate for client: $CLIENT"
  docker compose run --rm --build \
    -e CLIENT="$CLIENT" \
    -e WARDEX_ACCEPT_SECRET="${WARDEX_ACCEPT_SECRET:-wardex-lab-dev-secret-not-for-prod}" \
    --user "$(id -u):$(id -g)" \
    wardex evaluate \
    --config client/wardex/wardex-config.yaml \
    --evidence client/wardex/wardex-vulns.yaml \
    client/wardex/controls.yaml || true
  echo "[+] Wardex output written to $dir/reports/"
}

run_cra_check() {
  require_client cra-check
  local dir="./clients/$CLIENT"
  echo "[*] Checking CRA artifacts for client: $CLIENT"
  local missing=0

  if [ -f "$dir/CONTRACT/ROOT-SP"* ]; then echo "  [OK] Proposta"; else echo "  [MISS] Proposta"; missing=$((missing+1)); fi
  if [ -f "$dir/CONTRACT/ROOT-CT"* ]; then echo "  [OK] Contrato"; else echo "  [MISS] Contrato"; missing=$((missing+1)); fi
  if [ -f "$dir/CONTRACT/ROOT-RC"* ]; then echo "  [OK] Recibo"; else echo "  [MISS] Recibo"; missing=$((missing+1)); fi
  if [ -f "$dir/wardex/wardex-config.yaml" ]; then echo "  [OK] Wardex config"; else echo "  [MISS] Wardex config"; missing=$((missing+1)); fi
  if [ -f "$dir/wardex/wardex-vulns.yaml" ]; then echo "  [OK] Wardex vulns"; else echo "  [MISS] Wardex vulns"; missing=$((missing+1)); fi
  if [ -f "$dir/compliance/annex-vii"* ]; then echo "  [OK] Annex VII"; else echo "  [MISS] Annex VII"; missing=$((missing+1)); fi

  if [ "$missing" -eq 0 ]; then
    echo "[+] All required CRA artifacts present."
  else
    echo "[!] $missing artifact(s) missing."
  fi
}

run_compliance_report() {
  require_client compliance-report
  local dir="./clients/$CLIENT"
  local report="$dir/reports/compliance-summary.md"
  mkdir -p "$dir/reports"
  chmod 777 "$dir/reports"

  cat > "$report" << EOF
# Compliance Summary — $CLIENT
**Generated:** $(date -u +%Y-%m-%dT%H:%M:%SZ)

## Artifact Inventory
EOF

  echo "  - Annex VII: $( [ -f "$dir/compliance/annex-vii"* ] && echo 'present' || echo 'missing' )" >> "$report"
  echo "  - Wardex config: $( [ -f "$dir/wardex/wardex-config.yaml" ] && echo 'present' || echo 'missing' )" >> "$report"
  echo "  - Wardex vulns: $( [ -f "$dir/wardex/wardex-vulns.yaml" ] && echo 'present' || echo 'missing' )" >> "$report"

  if [ -f "$dir/reports/wardex-gate-audit.log" ]; then
    local status
    status=$(python3 -c "
import json,sys
with open('$dir/reports/wardex-gate-audit.log') as f:
    last = f.readlines()[-1]
d=json.loads(last)
print(d.get('status', 'unknown'))
" 2>/dev/null || echo "parse-error")
    echo "  - Wardex gate status: $status" >> "$report"
  fi

  local art14_count
  art14_count=$(ls "$dir"/reports/wardex-art14-*.json 2>/dev/null | wc -l)
  echo "  - Article 14 artefacts: $art14_count" >> "$report"

  echo "[+] Compliance report written to $report"
}

case "${1:-help}" in
  all)
    run_sast
    run_sca
    run_iac
    print_report
    run_wardex
    ;;
  sast)    run_sast ;;
  sca)     run_sca ;;
  iac)     run_iac ;;
  wardex)  run_wardex ;;
  cra-check) run_cra_check ;;
  compliance-report) run_compliance_report ;;
  report)  print_report ;;
  down)    docker compose down ;;
  *)       usage ;;
esac
