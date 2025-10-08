#!/usr/bin/env bash
set -euo pipefail

# Standard build without ffmpeg
npm ci
npm run build
