#!/usr/bin/env bash
# Start one isolated Vite dev server for portfolio verification.
# Reads RUN_ID (default: default) and VERIFY_PORT (default: 5173).
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
RUN_ID="${RUN_ID:-default}"
PORT="${VERIFY_PORT:-5173}"
RUN_DIR="$SKILL_DIR/runs/$RUN_ID"
VITE_BIN="$ROOT/node_modules/vite/bin/vite.js"

mkdir -p "$RUN_DIR" "$SKILL_DIR/artifacts"
rm -f "$RUN_DIR/url" "$RUN_DIR/module"

if [[ ! -d "$ROOT/node_modules" || ! -f "$VITE_BIN" ]]; then
  echo "Dependencies are missing. Run pnpm install in $ROOT" >&2
  exit 1
fi

if [[ -f "$RUN_DIR/pid" ]]; then
  old="$(cat "$RUN_DIR/pid")"
  if kill -0 "$old" 2>/dev/null; then
    echo "Run $RUN_ID already has live pid $old. Run cleanup.sh $RUN_ID before launching again." >&2
    exit 1
  fi
fi

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use. Set VERIFY_PORT to a free port. Do not kill a server this run did not start." >&2
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >&2 || true
  exit 1
fi

nohup node "$VITE_BIN" --host 127.0.0.1 --port "$PORT" --strictPort \
  >"$RUN_DIR/vite.log" 2>&1 &
pid="$!"
echo "$pid" >"$RUN_DIR/pid"
echo "$PORT" >"$RUN_DIR/port"
echo "$ROOT" >"$RUN_DIR/root"

ready=0
for _ in $(seq 1 80); do
  if ! kill -0 "$pid" 2>/dev/null; then
    echo "Vite exited before it was usable. Log:" >&2
    cat "$RUN_DIR/vite.log" >&2
    exit 1
  fi
  html="$(curl -fsS "http://127.0.0.1:$PORT/portfolio/" 2>/dev/null || true)"
  if [[ "$html" == *"Sahasawat Uengwanitchaphan"* ]]; then
    script="$(printf '%s' "$html" | sed -n 's/.*src="\([^"]*main\.tsx[^"]*\)".*/\1/p' | head -1)"
    if [[ -n "$script" ]]; then
      case "$script" in
        http*) module_url="$script" ;;
        *) module_url="http://127.0.0.1:$PORT$script" ;;
      esac
      code="$(curl -s -o /dev/null -w "%{http_code}" "$module_url" || true)"
      if [[ "$code" == "200" ]]; then
        printf '%s\n' "$module_url" >"$RUN_DIR/module"
        ready=1
        break
      fi
    fi
  fi
  sleep 0.25
done

if [[ "$ready" != "1" ]]; then
  echo "Vite did not become usable on port $PORT. Log:" >&2
  cat "$RUN_DIR/vite.log" >&2
  exit 1
fi

url="http://127.0.0.1:$PORT/portfolio/?weather=clear&day=1"
printf '%s\n' "$url" >"$RUN_DIR/url"
echo "ready run=$RUN_ID pid=$pid port=$PORT url=$url"

# Stay attached so the server lives until cleanup kills it.
trap 'kill "$pid" 2>/dev/null || true; wait "$pid" 2>/dev/null || true' EXIT
wait "$pid"
