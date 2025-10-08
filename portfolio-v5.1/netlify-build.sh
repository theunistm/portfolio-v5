#!/usr/bin/env bash
set -euo pipefail

# Install ffmpeg
apt-get update
apt-get install -y ffmpeg

# Now run your usual build
npm ci
npm run build
