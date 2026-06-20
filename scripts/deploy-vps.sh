#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${VPS_HOST:-}" || -z "${VPS_USER:-}" || -z "${VPS_PATH:-}" ]]; then
  echo "VPS_HOST, VPS_USER, and VPS_PATH are required."
  exit 1
fi

VPS_PORT="${VPS_PORT:-22}"
APP_PORT="${APP_PORT:-3000}"
PM2_NAME="${PM2_NAME:-portfolio}"
DIST_DIR="${DIST_DIR:-dist}"
SSH_TARGET="${VPS_USER}@${VPS_HOST}"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Build output directory not found: $DIST_DIR"
  exit 1
fi

ssh -p "$VPS_PORT" -o StrictHostKeyChecking=accept-new "$SSH_TARGET" "mkdir -p '$VPS_PATH'"

rsync -az --delete \
  -e "ssh -p $VPS_PORT -o StrictHostKeyChecking=accept-new" \
  "$DIST_DIR"/ \
  "$SSH_TARGET:$VPS_PATH/"

ssh -p "$VPS_PORT" -o StrictHostKeyChecking=accept-new "$SSH_TARGET" "\
  pm2 delete '$PM2_NAME' >/dev/null 2>&1 || true && \
  pm2 serve '$VPS_PATH' '$APP_PORT' --name '$PM2_NAME' --spa --time\
"
