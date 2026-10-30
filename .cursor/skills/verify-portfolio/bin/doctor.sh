#!/usr/bin/env bash
# Read-only check that a verification server is the one this run started.
# Usage: doctor.sh [RUN_ID]
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUN_ID="${1:-${RUN_ID:-default}}"
RUN_DIR="$SKILL_DIR/runs/$RUN_ID"

if [[ ! -f "$RUN_DIR/pid" || ! -f "$RUN_DIR/port" ]]; then
  echo "No run $RUN_ID. Launch one with launch.sh before driving." >&2
  exit 1
fi

pid="$(cat "$RUN_DIR/pid")"
port="$(cat "$RUN_DIR/port")"
cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"

if [[ -z "$cmd" ]]; then
  echo "Run $RUN_ID pid $pid is not running." >&2
  exit 1
fi

if [[ "$cmd" != *vite* || "$cmd" != *"--port $port"* ]]; then
  echo "Pid $pid is not this run's Vite server: $cmd" >&2
  exit 1
fi

listener="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true)"
if [[ "$listener" != *"$pid"* ]]; then
  echo "Port $port is not owned by pid $pid (listener: ${listener:-none})." >&2
  exit 1
fi

html="$(curl -fsS "http://127.0.0.1:$port/portfolio/")"
if [[ "$html" != *"Sahasawat Uengwanitchaphan"* ]]; then
  echo "http://127.0.0.1:$port/portfolio/ did not serve the portfolio title." >&2
  exit 1
fi

if [[ -f "$RUN_DIR/module" ]]; then
  module_url="$(cat "$RUN_DIR/module")"
  code="$(curl -s -o /dev/null -w "%{http_code}" "$module_url")"
  if [[ "$code" != "200" ]]; then
    echo "App module $module_url returned $code." >&2
    exit 1
  fi
fi

echo "ok run=$RUN_ID pid=$pid port=$port url=http://127.0.0.1:$port/portfolio/ title=Sahasawat Uengwanitchaphan"
