#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

echo "Starting Basic Virtual Piano preview server on http://localhost:${PORT}"
echo "Open:"
echo "  - http://localhost:${PORT}/index.html"
echo "  - http://localhost:${PORT}/preview.html"

python3 -m http.server "${PORT}"
