#!/bin/bash

echo "Adding neo-notes.local to hosts file..."
echo "This requires sudo access."

# Check if entry already exists
if grep -q "neo-notes.local" /etc/hosts; then
    echo "✅ neo-notes.local already exists in hosts file"
else
    echo "127.0.0.1 neo-notes.local" | sudo tee -a /etc/hosts
    echo "✅ Added neo-notes.local to hosts file"
fi

echo ""
echo "Neo Notes will be available at:"
echo "  🌐 http://neo-notes.local:5175"
echo "  🌐 http://localhost:5175"