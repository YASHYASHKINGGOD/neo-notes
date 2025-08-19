# 🚀 Neo Notes v1.0

> **Professional note-taking app with advanced version management and desktop support**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/neo-notes/releases)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-web%20%7C%20desktop-lightgrey.svg)](#installation)

Neo Notes is a modern, feature-rich note-taking application built with React, TypeScript, and Vite. It supports both web and native desktop experiences with professional version management capabilities.

## ✨ Features

### 📝 Core Features
- **Rich Text Editing** - TipTap-powered WYSIWYG editor
- **Folder Organization** - Hierarchical note structure
- **Theme Customization** - Real-time theme editor with live preview
- **Auto-save** - Automatic local storage persistence
- **Search & Filter** - Quick note discovery
- **Responsive Design** - Works on all screen sizes

### 🖥️ Desktop App
- **Native macOS App** - Packaged Electron application
- **Version Badge** - Shows v1.0 in app name and bundle
- **Desktop Integration** - Dock icon, menu bar, native window controls
- **Offline Ready** - Runs without internet connection
- **Multiple Launchers** - Various ways to start the app

### 🔄 Version Management
- **Git Tags & Branches** - Professional versioning workflow
- **Isolated Worktrees** - Run multiple versions simultaneously
- **Automated Scripts** - One-command version operations
- **Archive Snapshots** - Compressed backups of each version

## 🚀 Quick Start

### Web Version
```bash
# Clone and install
git clone https://github.com/yourusername/neo-notes.git
cd neo-notes
pnpm install

# Start development server
pnpm run dev
# Opens at http://localhost:4000
```

### Desktop App
The desktop app is already packaged and ready to use:

1. **From Desktop Icons:**
   - Double-click `"Neo Notes v1.0.app"` - Direct launch
   - Double-click `"🚀 Neo Notes v1.0 Desktop"` - Menu launcher

2. **Manual Launch:**
```bash
# Navigate to desktop app directory
cd ../neo-notes-desktop-v1.0

# Launch desktop app
npm start
```

## 📦 Installation Options

### Option 1: Ready-to-Use (Recommended)
The repository includes pre-built desktop apps:
- `Neo Notes v1.0.app` - Native macOS application
- Desktop launcher scripts with version info

### Option 2: Build from Source
```bash
# 1. Build web app
pnpm run build

# 2. Package desktop app
cd ../neo-notes-desktop-v1.0
npm install
node package-app.js

# 3. Copy to desktop
cp -r "dist/Neo Notes v1.0-darwin-arm64/Neo Notes v1.0.app" ~/Desktop/
```

## 🔄 Version Management System

Neo Notes includes a sophisticated version management system using Git tags, branches, and worktrees.

### Available Commands

```bash
# Save current state as a version
./bin/save_version.sh notes-app 1.1 "Added new features"

# Fork from a saved version into new development branch
./bin/fork_version.sh notes-app 1.0 notes-v1.2-dev

# Run any saved version
./bin/run_version.sh notes-app 1.0                    # Default: pnpm run dev
./bin/run_version.sh notes-app 1.0 -- pnpm run build # Custom command
```

### Current Versions

| Version | Status | Location | Description |
|---------|--------|----------|-------------|
| **v1.0** | ✅ Stable | Tag: `notes-app-v1.0` | Current stable release |
| **v1.1-dev** | 🔨 Development | `.worktrees/notes-v1.1-dev/` | Development branch |

### Version Archives
- Snapshots stored in `~/.app_versions/`
- Each version creates `notes-app-v{X.Y}.tar.gz`
- Fully portable and restorable

## 🛠️ Development Workflow

### 1. Working on Current Version
```bash
# Make changes in main directory
git add .
git commit -m "feat: add new feature"
```

### 2. Save Stable Version
```bash
# When ready to freeze current state
./bin/save_version.sh notes-app 1.1 "stable: notes v1.1"
```

### 3. Start New Development
```bash
# Fork from stable version for new features
./bin/fork_version.sh notes-app 1.1 notes-v1.2-dev

# Work in isolated environment
cd .worktrees/notes-v1.2-dev
# ... make changes, commit normally
```

### 4. Run Multiple Versions
```bash
# Run different versions simultaneously
./bin/run_version.sh notes-app 1.0 -- PORT=4000 pnpm run dev &
./bin/run_version.sh notes-app 1.1 -- PORT=4001 pnpm run dev &
```

## 📋 Project Structure

```
neo-notes/
├── 📁 src/                    # React source code
│   ├── components/            # React components
│   ├── store.ts              # Zustand state management
│   └── types/                # TypeScript definitions
├── 📁 bin/                    # Version management scripts
│   ├── save_version.sh       # Create tagged versions
│   ├── fork_version.sh       # Branch from versions
│   └── run_version.sh        # Run specific versions
├── 📁 public/                # Static assets
├── 📁 .worktrees/            # Isolated development environments
├── 📄 package.json           # Project configuration
├── 📄 vite.config.ts         # Build configuration
└── 📄 README.md              # This file

../neo-notes-desktop-v1.0/    # Desktop app wrapper
├── 📄 main.js                # Electron main process
├── 📄 package.json           # Desktop app config
├── 📁 web/dist/              # Built web app
├── 📁 dist/                  # Packaged desktop apps
└── 📁 assets/                # App icons and resources
```

## 🎨 Desktop App Details

### App Bundle Information
- **Bundle ID:** `com.neonotes.v1.0`
- **Version:** 1.0.0
- **Platform Support:** macOS (Intel + Apple Silicon)
- **Category:** Productivity

### Desktop Integration Features
- Native macOS app bundle (`.app`)
- Dock icon with version badge
- Standard menu bar integration
- Native window controls and behaviors
- Offline operation (no dev server required)

### Available Desktop Launchers
1. **"Neo Notes v1.0.app"** - Native macOS app
2. **"🚀 Neo Notes v1.0 Desktop"** - Interactive menu launcher
3. **"Neo Notes v1.0.command"** - Direct command launcher

## 🔧 Configuration

### Environment Variables
```bash
# Development server port
PORT=4000

# Node version (if using nvm)
# See .nvmrc file
```

### Vite Configuration
- **Base URL:** `"./"` (for Electron compatibility)
- **Build Output:** `dist/`
- **Assets:** `assets/`

## 🚀 Deployment

### GitHub Repository Setup
```bash
# Add GitHub remote
git remote add origin git@github.com:yourusername/neo-notes.git

# Push with tags
git push -u origin main
git push origin --tags

# Create GitHub release
gh release create notes-app-v1.0 --title "Neo Notes v1.0" --notes "Stable release with desktop app"
```

### Desktop App Distribution
The desktop app can be distributed via:
1. **Direct .app sharing** - Copy `Neo Notes v1.0.app` to others
2. **GitHub Releases** - Upload packaged apps as release assets
3. **App Store** - Future consideration for wider distribution

## 📱 Tech Stack

### Core Technologies
- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build Tool:** Vite 7.x
- **State Management:** Zustand
- **Rich Text:** TipTap with extensions
- **Desktop:** Electron 37.x

### Development Tools
- **Version Control:** Git with tags and worktrees
- **Package Manager:** pnpm (preferred) / npm
- **Linting:** ESLint
- **Bundling:** Vite + Rollup

## 🤝 Contributing

1. Fork from a stable version:
```bash
./bin/fork_version.sh notes-app 1.0 feature-branch
cd .worktrees/feature-branch
```

2. Make changes and commit
3. Test with version management tools
4. Create pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🎯 Roadmap

### v1.1 (In Development)
- [ ] Enhanced theme options
- [ ] Export functionality
- [ ] Plugin system architecture

### v1.2 (Planned)
- [ ] Cloud synchronization
- [ ] Collaborative editing
- [ ] Mobile app support

### Future Considerations
- [ ] Windows/Linux desktop apps
- [ ] Web extension
- [ ] API for integrations

---

## 💡 Quick Commands Reference

```bash
# Development
pnpm run dev              # Start web dev server
pnpm run build           # Build for production

# Desktop App
npm start                # Launch desktop app (from desktop-v1.0/)

# Version Management
./bin/save_version.sh notes-app 1.1 "message"
./bin/fork_version.sh notes-app 1.0 new-branch  
./bin/run_version.sh notes-app 1.0 -- command

# GitHub
git push origin main --tags
gh release create notes-app-v1.1
```

**🎉 Neo Notes v1.0 - Professional note-taking with enterprise-grade version management!**