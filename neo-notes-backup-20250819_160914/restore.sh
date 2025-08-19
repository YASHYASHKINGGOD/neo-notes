#!/bin/bash

echo "🔄 Restoring Neo-Notes development environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project directory?"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🧹 Clearing any previous builds..."
rm -rf dist/ 2>/dev/null || true
rm -rf node_modules/.vite/ 2>/dev/null || true

echo "🔨 Running type check..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript check passed"
    
    echo "🚀 Starting development server..."
    echo "   Access at: http://localhost:4001/"
    echo "   Press Ctrl+C to stop"
    
    npm run dev
else
    echo "⚠️ TypeScript errors found. Starting dev server anyway..."
    echo "   You may need to fix the BubbleMenu import issue"
    echo "   Check SESSION-HANDOVER.md for details"
    
    npm run dev
fi
