#!/bin/bash

echo "Setting up Neo Notes with custom domain..."

# Add neo-notes.local to hosts file (requires sudo)
echo "Adding neo-notes.local to hosts file..."
echo "127.0.0.1 neo-notes.local" | sudo tee -a /etc/hosts

# Check if entry was added
if grep -q "neo-notes.local" /etc/hosts; then
    echo "✅ neo-notes.local added to hosts file"
else
    echo "❌ Failed to add neo-notes.local to hosts file"
    echo "You can manually add this line to /etc/hosts:"
    echo "127.0.0.1 neo-notes.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "You can now access Neo Notes at:"
echo "  🌐 http://neo-notes.local:5175"
echo "  🌐 http://localhost:5175 (still works)"
echo ""
echo "Starting Neo Notes..."