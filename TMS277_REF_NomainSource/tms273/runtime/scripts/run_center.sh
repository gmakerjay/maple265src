#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RUNTIME="$ROOT/runtime"

cd "$ROOT"
mkdir -p "$RUNTIME/logs"

if [ ! -s "$HOME/.credentials.dat" ]; then
  echo "Missing $HOME/.credentials.dat. Run 01_generate_credentials.bat first."
  exit 1
fi

echo "Starting Center Server"
exec env \
  TMS_BINARY_TOUCH_LOG="$RUNTIME/logs/binary-touch-center.log" \
  TMS_REDIRECT_AUTH=1 \
  LD_PRELOAD="$RUNTIME/lib/tmslib.so:$RUNTIME/lib/tmslib2.so" \
  "$ROOT/bin/center"
