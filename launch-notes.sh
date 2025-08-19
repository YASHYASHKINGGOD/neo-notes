#!/bin/bash

# Neo Notes v1.0 Quick Launcher
# Double-click this file to start Neo Notes instantly!

echo "🚀 Starting Neo Notes v1.0..."
echo "📝 Your personal note-taking app"
echo ""

# Navigate to app directory
cd "$(dirname "$0")"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (one-time setup)..."
    echo "⏳ This may take a few minutes on first run..."
    pnpm install
    echo "✅ Dependencies installed!"
    echo ""
fi

# Check if port is available
if lsof -ti:4000 > /dev/null; then
    echo "⚠️  Port 4000 is in use. Trying port 4001..."
    export PORT=4001
else
    export PORT=4000
fi

# Start the app
echo "✅ Starting Neo Notes on port $PORT..."
echo "🌐 Opening in your browser..."
echo ""
echo "📌 Bookmark this URL: http://localhost:$PORT"
echo "⌨️  Press Ctrl+C to stop the app"
echo ""

# Auto-open browser after 3 seconds
(sleep 3 && open "http://localhost:$PORT") &

# Start the development server
pnpm run dev

echo ""
echo "👋 Neo Notes has been closed."
echo "💾 All your notes are saved safely."
echo ""
read -p "Press Enter to close this window..."