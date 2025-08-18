# Manual Desktop App Setup

## Option 1: Use Pre-built Web App as Desktop (Recommended)

The web app is fully functional and can be used as a desktop app:

1. **Open the web app in Chrome/Safari:**
   ```bash
   pnpm run dev
   # Open http://localhost:5175
   ```

2. **Install as PWA (Chrome):**
   - Click the install icon in the address bar
   - Or: Chrome menu → "Install Rob YYN Notes..."

3. **Create Desktop Shortcut (macOS):**
   ```bash
   # Create app shortcut
   open -a "Google Chrome" --args --app="http://localhost:5175" --new-window
   ```

## Option 2: Docker Desktop App

Run in Docker for a contained desktop experience:

```bash
# Build and run
docker-compose up --build

# Access at http://localhost:3000
# Use browser's "Install App" feature
```

## Option 3: Manual Electron Installation (If Needed)

If you want the native Electron app, try this manual approach:

```bash
# Clear npm/pnpm cache
npm cache clean --force
pnpm store prune

# Install with specific Node version
nvm use 18  # or install Node 18 if needed
npm install --save-dev electron@32.0.0 electron-builder

# Test electron
npm run electron

# Build desktop app
npm run dist
```

## Option 4: Alternative Electron Installation

```bash
# Install globally first
npm install -g electron

# Then install locally
npm install --save-dev electron-builder

# Test
npx electron .
```

## Desktop App Features (When Working)

- Native macOS app with menu bar
- File storage in `~/Desktop/rob-yyn-notes-data/`
- Keyboard shortcuts (⌘N, ⌘,)
- Import/Export functionality
- Auto-save to local files

## Current Working Solution

The web app at http://localhost:5175 has all the same features:
- ✅ Neo-brutalist theme customization
- ✅ Rich text editing
- ✅ Folder organization
- ✅ Search functionality
- ✅ Auto-save (to localStorage)
- ✅ Full responsive design

## File Storage Note

- **Web version**: Uses browser localStorage (persistent)
- **Desktop version**: Uses `~/Desktop/rob-yyn-notes-data/notes.json`

Both are fully functional for note-taking!