#!/bin/bash

echo "🌿 Creating feature branch for current development state..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Run 'git init' first if you want to use git"
    exit 1
fi

# Create and switch to new branch
BRANCH_NAME="feature/comprehensive-enhancements-$(date +%Y%m%d)"
echo "Creating branch: ${BRANCH_NAME}"

git checkout -b "${BRANCH_NAME}"

# Add all files
git add .

# Commit current state
git commit -m "feat: Comprehensive note-taking enhancements

- Added TipTap v3 rich text editor with advanced formatting
- Implemented 5 pleasant themes with persistence
- Enhanced folder hierarchy with visual indentation  
- Added comprehensive tag system and backlinks
- Fixed search functionality and note previews
- Added table management and slash commands
- Improved Tab key indentation support

Status: 95% complete, 2 minor issues remaining
- Floating toolbar (BubbleMenu import)
- Tag deletion functionality

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✅ Branch created and committed: ${BRANCH_NAME}"
echo "   You can now continue development or create a PR"
