# Contributing to Neo Notes

Thank you for your interest in contributing to Neo Notes! This guide will help you understand our development workflow and version management system.

## 🚀 Quick Start for Contributors

### 1. Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/neo-notes.git
cd neo-notes

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### 2. Understanding Our Version Management

Neo Notes uses a sophisticated version management system with:
- **Git tags** for stable releases (e.g., `notes-app-v1.0`)
- **Git worktrees** for isolated development environments
- **Automated scripts** for version operations

## 🔄 Development Workflow

### Starting New Features

1. **Fork from a stable version** (recommended):
```bash
# Create development branch from stable v1.0
./bin/fork_version.sh notes-app 1.0 feature-your-feature-name
cd .worktrees/feature-your-feature-name
```

2. **Or work in main branch**:
```bash
# Create feature branch normally
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes** in the appropriate directory
2. **Test thoroughly**:
```bash
# Test web version
pnpm run dev

# Test build process
pnpm run build

# Test desktop app (if applicable)
cd ../neo-notes-desktop-v1.0
npm start
```

3. **Commit with descriptive messages**:
```bash
git add .
git commit -m "feat: add user authentication system"
```

### Testing Your Changes

#### Web Application Testing
- Test in development mode: `pnpm run dev`
- Test production build: `pnpm run build && pnpm run preview`
- Test responsive design on different screen sizes
- Test theme customization features
- Test note creation, editing, and organization

#### Desktop Application Testing
- Build the app: `pnpm run build`
- Copy to desktop wrapper: `cp -r dist/* ../neo-notes-desktop-v1.0/web/dist/`
- Test desktop app: `cd ../neo-notes-desktop-v1.0 && npm start`
- Verify desktop integration (dock icon, menu bar, etc.)

### Submitting Changes

1. **Push your branch**:
```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request** with:
   - Clear description of changes
   - Screenshots/demos if UI changes
   - Testing checklist completed
   - Version compatibility notes

## 📋 Code Standards

### JavaScript/TypeScript
- Use TypeScript for type safety
- Follow existing code style (ESLint configuration)
- Use descriptive variable and function names
- Add comments for complex logic

### React Components
- Use functional components with hooks
- Follow existing component structure
- Use proper prop types
- Keep components focused and reusable

### CSS/Styling
- Use Tailwind CSS classes
- Follow existing design patterns
- Ensure responsive design
- Test dark/light theme compatibility

### Commit Messages
Follow conventional commits format:
```
feat: add new feature
fix: resolve bug issue
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Enhanced theme system
- [ ] Export functionality (PDF, HTML, Markdown)
- [ ] Plugin architecture
- [ ] Performance optimizations
- [ ] Mobile responsiveness improvements

### Desktop App Improvements
- [ ] Windows/Linux desktop support
- [ ] Better icon and branding
- [ ] Auto-updater system
- [ ] System tray integration
- [ ] Keyboard shortcuts

### Web Application Features
- [ ] Real-time collaboration
- [ ] Cloud synchronization
- [ ] Advanced search and filtering
- [ ] Note templates
- [ ] Tag system

### Developer Experience
- [ ] Testing framework setup
- [ ] CI/CD pipeline
- [ ] Documentation improvements
- [ ] Development tools

## 🐛 Bug Reports

When reporting bugs:

1. **Use the issue template**
2. **Provide clear reproduction steps**
3. **Include system information**:
   - OS and version
   - Browser (if web app)
   - Node.js version
   - Package manager version

4. **Add relevant details**:
   - Screenshots/videos
   - Console errors
   - Expected vs actual behavior

## 💡 Feature Requests

For new features:

1. **Check existing issues** first
2. **Describe the use case** clearly
3. **Explain the value** it would provide
4. **Consider implementation** complexity
5. **Discuss alternatives** if any

## 🔄 Version Management for Contributors

### Understanding Our System

```bash
# View all versions
git tag -l "notes-app-v*"

# See current development branches
git branch -a

# List worktrees
git worktree list
```

### Working with Versions

```bash
# Run a specific version
./bin/run_version.sh notes-app 1.0

# Test your changes against stable version
./bin/run_version.sh notes-app 1.0 -- PORT=4001 pnpm run dev &
pnpm run dev  # Your changes on port 4000

# Fork from specific version for testing
./bin/fork_version.sh notes-app 1.0 test-branch
```

### Creating New Versions (Maintainers Only)

```bash
# Save stable version
./bin/save_version.sh notes-app 1.1 "stable: added authentication system"

# Create GitHub release
gh release create notes-app-v1.1 --title "Neo Notes v1.1" --notes "Release notes..."
```

## 🏗️ Project Structure

```
neo-notes/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── NoteEditor.tsx  # Main editor component
│   │   ├── NotesSidebar.tsx # File browser
│   │   └── ThemeCustomizer.tsx
│   ├── store.ts            # Zustand state management
│   ├── types/              # TypeScript definitions
│   └── lib/                # Utility functions
├── bin/                    # Version management scripts
├── public/                 # Static assets
├── .worktrees/            # Isolated development environments
└── docs/                  # Documentation (if added)
```

## 🔧 Development Environment Setup

### Required Tools
- Node.js 18+ (check `.nvmrc`)
- pnpm (preferred) or npm
- Git
- Code editor (VS Code recommended)

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- GitLens
- Prettier

### Environment Configuration

1. **Node Version**:
```bash
# Use correct Node version
nvm use  # or manually install version from .nvmrc
```

2. **Editor Config**:
```bash
# VS Code settings (create .vscode/settings.json)
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and contribute
- Share knowledge and experiences
- Provide constructive feedback
- Follow the code of conduct

## 📞 Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Pull Requests**: Code review and collaboration

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for first-time contributors

---

**Thank you for contributing to Neo Notes!** 

Your contributions help make professional note-taking accessible to everyone with enterprise-grade version management capabilities.