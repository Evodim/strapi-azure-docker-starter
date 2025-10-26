#!/bin/bash
set -e

echo "Starting Strapi entrypoint..."

# Copy asset files to their destinations if they exist
if [ -d /srv/app/assets ]; then
  echo "Copying asset files to application directories..."

  # Copy all files recursively, preserving structure
  # This runs at container start, so it works with volumes
  cp -r /srv/app/assets/* /srv/app/ 2>/dev/null || true

  echo "Asset files copied successfully"
fi

# Execute the main command (yarn start, yarn develop, etc.)
exec "$@"
