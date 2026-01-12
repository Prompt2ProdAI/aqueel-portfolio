#!/bin/bash
exec > push_log.txt 2>&1
echo "Starting git push workflow..."

echo "Updating package-lock.json..."
npm install
if [ $? -ne 0 ]; then
  echo "npm install failed"
  exit 1
fi

echo "Adding files..."
git add .

echo "Committing..."
git commit -m "chore: remove lovable branding and dependencies, configure cloudflare pages"

echo "Pushing..."
git push origin HEAD

echo "Workflow completed."
