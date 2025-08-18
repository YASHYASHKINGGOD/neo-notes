# Rob YYN Notes - Deployment Guide v1.0

## Docker Web App

### Quick Start
```bash
# Build and run with docker-compose
docker-compose up --build

# Access at http://localhost:3000
```

### Manual Docker Build
```bash
# Build the Docker image
docker build -t rob-yyn-notes .

# Run the container
docker run -p 3000:80 rob-yyn-notes
```

### Development with Docker
```bash
# Run development environment
docker-compose --profile dev up
```

## Desktop App (Electron)

### Prerequisites
- Node.js 18+ installed
- pnpm package manager

### Setup
```bash
# Install dependencies (if electron-builder isn't installed)
pnpm add -D electron-builder

# Enable build scripts
pnpm approve-builds
```

### Development
```bash
# Run in development mode
pnpm run electron-dev
```

### Building for Production

#### Build for current platform
```bash
# Build web app and create desktop package
pnpm run dist
```

#### Platform-specific builds
```bash
# macOS (DMG and ZIP)
pnpm run electron-build -- --mac

# Windows (NSIS installer)
pnpm run electron-build -- --win

# Linux (AppImage)
pnpm run electron-build -- --linux
```

## Features

### Web Version
- Works in any modern browser
- Neo-brutalist dark theme
- Real-time note editing
- Folder organization
- Search functionality

### Desktop Version
- File system storage in `~/Desktop/rob-yyn-notes-data/`
- Native menu integration
- Auto-save functionality
- Import/Export capabilities
- Keyboard shortcuts:
  - `Cmd/Ctrl + N`: New note
  - `Cmd/Ctrl + ,`: Theme customizer

## File Storage

### Desktop App
Notes are automatically saved to:
- **macOS/Linux**: `~/Desktop/rob-yyn-notes-data/notes.json`
- **Windows**: `%USERPROFILE%\Desktop\rob-yyn-notes-data\notes.json`

### Data Format
```json
{
  "notes": [...],
  "folders": [...],
  "currentTheme": {...},
  "version": "1.0.0",
  "lastSaved": "2025-01-18T..."
}
```

## Version Information
- **Version**: 1.0.0
- **Release Date**: January 2025
- **Features**: Notes, Folders, Themes, Rich Text Editor
- **Platforms**: Web (Docker), macOS, Windows, Linux

## Next Steps for v2.0
- Knowledge graph visualization
- Wiki-style note linking `[[note]]`
- Drag & drop file organization
- Multimedia support
- Mobile responsive design