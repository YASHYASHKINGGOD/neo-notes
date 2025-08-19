# Neo Notes Version Management Guide

✅ **Your Neo Notes app now has complete version management capabilities!**

## 🚀 Quick Commands

```bash
# Save current state as a version
./bin/save_version.sh notes-app 1.1 "Added new features"

# Fork from a saved version into a new dev branch + worktree
./bin/fork_version.sh notes-app 1.0 notes-v1.2-dev

# Run a saved version (or specify a command after --)
./bin/run_version.sh notes-app 1.0 -- pnpm run dev
./bin/run_version.sh notes-app 1.0  # Uses default: pnpm run dev
```

## 📦 What's Been Set Up

### 1. Version Management Scripts (`bin/`)
- `save_version.sh` - Creates git tags and archived snapshots
- `fork_version.sh` - Creates new development branches from saved versions
- `run_version.sh` - Runs any saved version in isolation

### 2. Current Status
- ✅ Git repository initialized
- ✅ v1.0 saved as `notes-app-v1.0` tag
- ✅ Snapshot archived: `~/.app_versions/notes-app-v1.0.tar.gz`
- ✅ Development worktree created: `.worktrees/notes-v1.1-dev/`

### 3. Desktop App Ready
- ✅ Production build created (`dist/`)
- ✅ Desktop wrapper created: `../neo-notes-desktop-v1.0/`

## 🔄 Typical Workflow

### Save Your Current Work
```bash
# Make sure all changes are committed
git add . && git commit -m "feat: new awesome feature"

# Save as version 1.1
./bin/save_version.sh notes-app 1.1 "stable: added theme customization"
```

### Start New Feature Development
```bash
# Fork from the stable v1.0 to work on v1.2
./bin/fork_version.sh notes-app 1.0 notes-v1.2-dev

# Work in the isolated environment
cd .worktrees/notes-v1.2-dev
# ... make changes, commit as usual
```

### Run Any Version
```bash
# Run the stable v1.0
./bin/run_version.sh notes-app 1.0

# Run with custom command
./bin/run_version.sh notes-app 1.0 -- pnpm run build

# Run different versions side by side (different ports)
./bin/run_version.sh notes-app 1.0 -- PORT=4000 pnpm run dev &
./bin/run_version.sh notes-app 1.1 -- PORT=4001 pnpm run dev &
```

## 🖥️ Desktop App Creation

### For Any Version
```bash
# 1. Build the web app
./bin/run_version.sh notes-app 1.0 -- pnpm run build

# 2. Create desktop wrapper
mkdir neo-notes-desktop-v1.0 && cd neo-notes-desktop-v1.0
pnpm init -y
pnpm i -D electron

# 3. Copy build files
mkdir -p web/dist
cp -r ../.worktrees/notes-app-v1.0/dist/* web/dist/

# 4. Create main.js (see ../neo-notes-desktop-v1.0/main.js)
# 5. Run: pnpm start
```

## 📋 Available Versions

| Version | Tag | Description | Location |
|---------|-----|-------------|----------|
| 1.0 | `notes-app-v1.0` | Working baseline with version scripts | `.worktrees/notes-app-v1.0/` |
| 1.1-dev | `notes-v1.1-dev` | Development branch from v1.0 | `.worktrees/notes-v1.1-dev/` |

## 🎯 Next Steps

1. **Continue Development**: Work in `.worktrees/notes-v1.1-dev/`
2. **Save Stable Versions**: Use `save_version.sh` when ready
3. **Create Desktop Apps**: Build and wrap any stable version
4. **Push to GitHub** (optional):
   ```bash
   git remote add origin git@github.com:yourusername/neo-notes.git
   git push -u origin main
   git push origin --tags
   ```

## 🛠️ Current Running Services

- **Web Dev Server**: http://localhost:4000 (main version)
- **Archived Versions**: `~/.app_versions/`
- **Worktrees**: `.worktrees/`

---

🎉 **You now have professional version management for Neo Notes!** Each version is isolated, reproducible, and can be turned into a desktop app instantly.