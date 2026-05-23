#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Start HTTP server serving the eatlist project on port 8080
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-/home/claude/repo}"

# Kill any existing server on port 8080
fuser -k 8080/tcp 2>/dev/null || true

# Start server in background
cd "$PROJECT_DIR/project"
nohup python3 -m http.server 8080 > /tmp/eatlist-server.log 2>&1 &

echo "eatlist preview server started on http://localhost:8080/eatlist.html"
