#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
AUTH_PID=""

cleanup() {
  if [ -n "$AUTH_PID" ]; then
    kill "$AUTH_PID" 2>/dev/null || true
    wait "$AUTH_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

cd "$ROOT"
mkdir -p logs runtime/logs

echo "Starting Auth Forge on 16400"
AUTH_FORGE_COUNT=0 AUTH_FORGE_LOG="$ROOT/runtime/logs/auth-forge.log" python3 "$ROOT/launcher/forge_auth_encrypted.py" &
AUTH_PID="$!"
sleep 0.5
if ! kill -0 "$AUTH_PID" 2>/dev/null; then
  echo "Auth Forge failed to start; check whether port 16400 is already in use"
  wait "$AUTH_PID"
fi

echo "Updating launcher/login.json to current WSL IP"
python3 "$ROOT/launcher/update_login_json.py"

echo "Starting Launcher Config Server"
cd "$ROOT/launcher"
python3 serve_loginconfig.py --port 8080 --api-port 5000 --config login.json
