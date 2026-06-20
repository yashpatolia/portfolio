#!/usr/bin/env bash

set -euo pipefail

: "${VPS_HOST:?}" "${VPS_USER:?}" "${VPS_PATH:?}"

VPS_PORT="${VPS_PORT:-22}"
APP_PORT="${APP_PORT:-4000}"
PM2_NAME="${PM2_NAME:-portfolio}"
SSH="ssh -p $VPS_PORT -o StrictHostKeyChecking=accept-new"
TARGET="$VPS_USER@$VPS_HOST"

$SSH "$TARGET" "mkdir -p '$VPS_PATH'"

rsync -az --delete -e "$SSH" dist/ "$TARGET:$VPS_PATH/"

$SSH "$TARGET" "pm2 describe '$PM2_NAME' >/dev/null 2>&1 || pm2 serve '$VPS_PATH' '$APP_PORT' --name '$PM2_NAME' --spa --time"
