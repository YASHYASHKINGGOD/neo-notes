#!/usr/bin/env bash
set -euo pipefail
APP="${1:-}"; VER="${2:-}"; 
shift 2 || true
# Skip "--" if present
if [[ "${1:-}" == "--" ]]; then shift; fi
if [[ -z "$APP" || -z "$VER" ]]; then
  echo "Usage: $0 <app-name> <version> [-- <command...>]"; exit 1; fi
TAG="${APP}-v${VER}"; WT_DIR=".worktrees/${TAG}"
git rev-parse "refs/tags/${TAG}" >/dev/null 2>&1 || { echo "Tag ${TAG} not found"; exit 1; }
[[ -d "$WT_DIR" ]] || { mkdir -p .worktrees; git worktree add "$WT_DIR" "refs/tags/${TAG}" --detach; }
cd "$WT_DIR"
if [[ $# -eq 0 ]]; then
  if [[ -f package.json ]]; then
    if command -v nvm >/dev/null 2>&1 && [[ -f ".nvmrc" ]]; then . ~/.nvm/nvm.sh; nvm use || true; fi
    pnpm i --silent || npm i --silent || true
    pnpm run dev || npm run dev
  elif [[ -f "pyproject.toml" || -f "requirements.txt" ]]; then
    python3 -m venv .venv && source .venv/bin/activate
    [[ -f requirements.txt ]] && pip install -r requirements.txt
    python app.py
  else
    echo "No default run cmd; provide one after '--'."; exit 1
  fi
else
  "$@"
fi