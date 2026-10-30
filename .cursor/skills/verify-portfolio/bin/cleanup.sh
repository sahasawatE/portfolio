#!/usr/bin/env bash
# Stop the Vite process this run started and delete that run's scratch files.
# Does not delete artifacts/.
# Usage: cleanup.sh [RUN_ID]
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUN_ID="${1:-${RUN_ID:-default}}"
RUN_DIR="$SKILL_DIR/runs/$RUN_ID"

if [[ ! -d "$RUN_DIR" ]]; then
  echo "cleaned run=$RUN_ID artifacts kept at $SKILL_DIR/artifacts"
  exit 0
fi

if [[ -f "$RUN_DIR/pid" ]]; then
  pid="$(cat "$RUN_DIR/pid")"
  port="$(cat "$RUN_DIR/port" 2>/dev/null || true)"
  cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
  if [[ -n "$cmd" ]]; then
    if [[ "$cmd" == *vite* && -n "$port" && "$cmd" == *"--port $port"* ]]; then
      kill "$pid" 2>/dev/null || true
      for _ in $(seq 1 15); do
        kill -0 "$pid" 2>/dev/null || break
        sleep 0.2
      done
      if kill -0 "$pid" 2>/dev/null; then
        kill -9 "$pid" 2>/dev/null || true
      fi
    else
      echo "Refusing to kill pid $pid because it is not this run's Vite server: $cmd" >&2
      exit 1
    fi
  fi
fi

rm -rf "$RUN_DIR"
echo "cleaned run=$RUN_ID artifacts kept at $SKILL_DIR/artifacts"
