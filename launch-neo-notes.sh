#!/bin/bash

echo "🚀 Launching Neo Notes..."

# Kill existing dev server if running
echo "Stopping any existing dev server..."
pkill -f "vite.*dev"

# Start dev server in background
echo "Starting Neo Notes dev server..."
pnpm run dev > /dev/null 2>&1 &

# Wait for server to start
echo "Waiting for server to start..."
sleep 3

# Open in browser with custom title
echo "Opening Neo Notes in browser..."
open -a "Google Chrome" --args --app="http://localhost:5175" --new-window --user-data-dir="/tmp/neo-notes-chrome" --app-name="Neo Notes"

echo ""
echo "✅ Neo Notes is now running!"
echo ""
echo "🌐 Access URLs:"
echo "   • http://localhost:5175"
echo "   • Custom Chrome app window opened"
echo ""
echo "To stop Neo Notes: pkill -f 'vite.*dev'"