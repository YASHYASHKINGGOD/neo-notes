# Quick Launch Guide - Neo Notes v1.0

## 🚀 Use Neo Notes Anytime - No Setup Required!

This guide shows you how to run Neo Notes instantly whenever you want, like any app on your computer.

## 🎯 Option 1: One-Click Desktop Launcher (Recommended)

### Create Desktop Launcher Script

```bash
# Create launcher script
cat > /Users/yash/notes-app-v1/launch-notes.sh << 'EOF'
#!/bin/bash

# Neo Notes v1.0 Quick Launcher
echo "🚀 Starting Neo Notes..."

# Navigate to app directory
cd "/Users/yash/notes-app-v1"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (one-time setup)..."
    pnpm install
fi

# Start the app
echo "✅ Opening Neo Notes in your browser..."
pnpm run dev

# Keep terminal open
read -p "Press Enter to close..."
EOF

# Make it executable
chmod +x /Users/yash/notes-app-v1/launch-notes.sh
```

### Add to Desktop for Easy Access
```bash
# Create desktop shortcut
ln -s "/Users/yash/notes-app-v1/launch-notes.sh" "/Users/yash/Desktop/Launch Neo Notes"

# Make it double-clickable
chmod +x "/Users/yash/Desktop/Launch Neo Notes"
```

### Usage
1. **Double-click** "Launch Neo Notes" on your desktop
2. Terminal opens and starts the app automatically
3. Browser opens to Neo Notes interface
4. Start taking notes immediately!

## 🎯 Option 2: Terminal Command (Power Users)

### Add to Shell Profile
```bash
# Add to ~/.zshrc or ~/.bashrc
echo 'alias notes="cd /Users/yash/notes-app-v1 && pnpm run dev"' >> ~/.zshrc

# Reload shell
source ~/.zshrc
```

### Usage
```bash
# From anywhere in terminal, just type:
notes

# App starts immediately!
```

## 🎯 Option 3: Menu Bar App (macOS)

### Create Automator App
1. Open **Automator** on macOS
2. Choose **Application**
3. Add **Run Shell Script** action
4. Paste this script:
```bash
cd /Users/yash/notes-app-v1
if [ ! -d "node_modules" ]; then
    /opt/homebrew/bin/pnpm install
fi
/opt/homebrew/bin/pnpm run dev
```
5. Save as "Neo Notes" in Applications folder
6. Set custom icon if desired

### Usage
- Launch from Applications folder
- Add to Dock for quick access
- Appears like any other Mac app

## 🎯 Option 4: Native Desktop App (No Browser)

### Build Once, Use Forever
```bash
# Navigate to app folder
cd /Users/yash/notes-app-v1

# Install Electron (one-time)
pnpm add -D electron electron-builder

# Build desktop app
pnpm run dist

# Install the built app
open dist-electron/
# Double-click the .dmg file and install to Applications
```

### Usage
- Native desktop app in Applications folder
- No browser required
- Works offline
- Data saved to desktop files

## 🌐 Option 5: Always-Running Web Version

### Local Server Setup
```bash
# Build production version
cd /Users/yash/notes-app-v1
pnpm run build

# Install simple HTTP server
npm install -g serve

# Create startup script
cat > /Users/yash/notes-app-v1/run-server.sh << 'EOF'
#!/bin/bash
cd "/Users/yash/notes-app-v1"
serve -s dist -l 3000
EOF

chmod +x /Users/yash/notes-app-v1/run-server.sh
```

### Auto-Start on Boot (macOS)
```bash
# Create launch agent
mkdir -p ~/Library/LaunchAgents

cat > ~/Library/LaunchAgents/com.notes.server.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.notes.server</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/yash/notes-app-v1/run-server.sh</string>
    </array>
    <key>KeepAlive</key>
    <true/>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

# Load the service
launchctl load ~/Library/LaunchAgents/com.notes.server.plist
```

### Usage
- App runs automatically when computer starts
- Always available at `http://localhost:3000`
- Bookmark for instant access

## 📱 Option 6: PWA (Progressive Web App)

### Make it Installable in Browser
1. Open Neo Notes in Chrome/Safari
2. Look for "Install" button in address bar
3. Click to install as desktop app
4. App appears in Applications folder

### Browser Installation
- **Chrome**: Install button in omnibox
- **Safari**: Share → Add to Dock
- **Edge**: Install app icon in address bar

## 🔧 Customize Your Launch Experience

### Custom Port (Avoid Conflicts)
Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 5555, // Your custom port
  }
})
```

### Custom Startup Message
Edit launch script:
```bash
#!/bin/bash
echo "🎨 Welcome to Neo Notes - Your Personal Knowledge Base!"
echo "📝 Ready to capture your thoughts..."
cd "/Users/yash/notes-app-v1"
pnpm run dev
```

### Auto-Open Browser
Add to launch script:
```bash
# Auto-open browser after 3 seconds
(sleep 3 && open http://localhost:4000) &
pnpm run dev
```

## 🆘 Troubleshooting Quick Launch

### Script Doesn't Work
```bash
# Check permissions
ls -la launch-notes.sh

# Should show: -rwxr-xr-x

# Fix permissions
chmod +x launch-notes.sh
```

### Port Already in Use
```bash
# Find what's using the port
lsof -ti:4000

# Kill the process
kill -9 $(lsof -ti:4000)

# Or change port in vite.config.ts
```

### Dependencies Issue
```bash
# Fresh install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Browser Doesn't Open
```bash
# Manually open after script starts
open http://localhost:4000
```

## 💡 Pro Tips

### 1. Multiple Instances
Run different versions on different ports:
```bash
# Development version
cd /Users/yash/notes-app-v1
PORT=4000 pnpm run dev

# Testing version  
cd /Users/yash/notes-app-v2
PORT=4001 pnpm run dev
```

### 2. Data Backup Automation
```bash
# Auto-backup script
cat > backup-notes.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp ~/.local/share/notes-app/notes.json ~/Dropbox/notes-backup-$DATE.json
echo "Notes backed up to Dropbox"
EOF
```

### 3. Theme Switching
Create shortcuts for different themes:
```bash
# Light theme version
THEME=light pnpm run dev

# Dark theme version  
THEME=dark pnpm run dev
```

## ✅ Success Checklist

Your Neo Notes is ready for daily use when:
- ✅ Double-click launcher opens the app instantly
- ✅ All your notes and folders are preserved
- ✅ Themes and settings persist between sessions
- ✅ App launches in under 10 seconds
- ✅ No technical setup required each time
- ✅ Accessible from desktop, dock, or command line

## 🎉 Enjoy Your Personal Notes App!

You now have Neo Notes v1.0 set up like any professional app:
- **Quick Access**: One-click launching
- **Reliable**: Always works the same way
- **Persistent**: Your data is always safe
- **Professional**: Looks and feels like a real app
- **Customizable**: Adapt to your workflow

**Your notes are now just one click away, anytime you need them!**