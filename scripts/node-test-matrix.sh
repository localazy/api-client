#!/usr/bin/env bash
set -euo pipefail

# Build once under Node 22, then run tests under Node 20/22/24.
# Prerequisites:
#   - nvm installed: https://github.com/nvm-sh/nvm
#   - Node versions installed: nvm install 20 22 24

# Load nvm for non-interactive shells and verify it exists
if [ -z "${NVM_DIR:-}" ]; then
  export NVM_DIR="$HOME/.nvm"
fi
# Try to source nvm if available
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

# Prerequisite check: ensure nvm is available
if ! command -v nvm > /dev/null 2>&1; then
  echo "Error: nvm is not installed or not loaded in this shell." >&2
  echo "This script requires nvm to switch Node.js versions (20, 22, 24)." >&2
  echo "Install nvm and the required Node versions, then re-run:" >&2
  echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash" >&2
  echo "  export NVM_DIR=\"$HOME/.nvm\" && [ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"" >&2
  echo "  nvm install 20 22 24" >&2
  exit 1
fi

NODE_MATRIX=("20" "22" "24")
PM="npm"

echo "=== Test matrix - Node 20, 22 and 24 ==="
for v in "${NODE_MATRIX[@]}"; do
  echo -e "\n--- Node $v: install + test + build ---"
  nvm exec "$v" "$PM" ci
  nvm exec "$v" "$PM" run prettier
  nvm exec "$v" "$PM" run lint
  nvm exec "$v" "$PM" run typecheck
  nvm exec "$v" "$PM" run build
  nvm exec "$v" "$PM" run test
done

echo -e "\nAll done."
