#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RUNTIME="$ROOT/runtime"
KEY_FILE="$(mktemp "${TMPDIR:-/tmp}/tms-center-key.XXXXXX")"

cd "$ROOT"
mkdir -p "$RUNTIME/logs"
cleanup() {
  rm -f "$KEY_FILE"
}
trap cleanup EXIT INT TERM

if [ ! -f "$RUNTIME/lib/tmslib.so" ] || [ ! -f "$RUNTIME/lib/tmslib2.so" ]; then
  echo "Missing preload libraries in the bundled lib directory."
  exit 1
fi
if [ ! -x "$RUNTIME/tools/tms_make_credentials" ]; then
  echo "Missing credential helper tool."
  exit 1
fi

echo "Capturing Center credential key via preload library"
set +e
env \
  TMS_CENTER_KEY_CAPTURE=1 \
  TMS_CENTER_KEY_OUT="$KEY_FILE" \
  TMS_BINARY_TOUCH_LOG="$RUNTIME/logs/binary-touch-credentials.log" \
  TMS_REDIRECT_AUTH=1 \
  LD_PRELOAD="$RUNTIME/lib/tmslib.so:$RUNTIME/lib/tmslib2.so" \
  "$ROOT/bin/center" > "$RUNTIME/logs/center-key-capture.console.log" 2>&1
rc=$?
set -e

if [ "$rc" -ne 0 ]; then
  echo "Center key capture exited with code $rc."
  echo "See binary-touch-credentials.log in the bundled logs directory."
  exit "$rc"
fi
if [ ! -s "$KEY_FILE" ]; then
  echo "Center key capture did not produce $KEY_FILE."
  echo "See binary-touch-credentials.log in the bundled logs directory."
  exit 1
fi

"$RUNTIME/tools/tms_make_credentials" "$KEY_FILE" "$HOME/.credentials.dat"
chmod 600 "$HOME/.credentials.dat"
echo "Credentials ready for this WSL boot"
