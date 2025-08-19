#!/bin/bash

# Script for managing versions and releases
VERSION=$1
MESSAGE=$2

if [ -z "$VERSION" ]; then
    echo "Usage: ./bin/version-management.sh <version> [message]"
    exit 1
fi

# Update version in package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Create backup
BACKUP_DIR="neo-notes-backup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r * "$BACKUP_DIR"
zip -r "${BACKUP_DIR}.zip" "$BACKUP_DIR"

# Git operations
git add .
git commit -m "chore: release version $VERSION

$MESSAGE"
git tag -a "v$VERSION" -m "$MESSAGE"

echo "✅ Version $VERSION prepared for release"
echo "To push changes:"
echo "git push origin main --tags"
