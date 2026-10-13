#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <login|auction|shop|game> [args...]"
  exit 2
fi

SERVICE="$1"
shift

case "$SERVICE" in
  login|auction|shop|game) ;;
  *)
    echo "Unknown service: $SERVICE"
    exit 2
    ;;
esac

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RUNTIME="$ROOT/runtime"
LOG_NAME="$SERVICE"

if [ "$SERVICE" = "game" ]; then
  for arg in "$@"; do
    case "$arg" in
      *game0.properties*) LOG_NAME="game0" ;;
      *game1.properties*) LOG_NAME="game1" ;;
    esac
  done
fi

case "$LOG_NAME" in
  login) DISPLAY_NAME="Login Server" ;;
  auction) DISPLAY_NAME="Auction Server" ;;
  shop) DISPLAY_NAME="Shop Server" ;;
  game0) DISPLAY_NAME="Game0 Server" ;;
  game1) DISPLAY_NAME="Game1 Server" ;;
  game) DISPLAY_NAME="Game Server" ;;
  *) DISPLAY_NAME="$LOG_NAME" ;;
esac

cd "$ROOT"
mkdir -p "$RUNTIME/logs"

echo "Starting $DISPLAY_NAME"
exec env \
  TMS_BINARY_TOUCH_LOG="$RUNTIME/logs/binary-touch-$LOG_NAME.log" \
  TMS_REDIRECT_AUTH=1 \
  LD_PRELOAD="$RUNTIME/lib/tmslib.so:$RUNTIME/lib/tmslib2.so" \
  "$ROOT/bin/$SERVICE" "$@"
