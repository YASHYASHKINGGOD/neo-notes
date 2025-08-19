# Neo Notes - UI Design System & Component Instructions

## Design Philosophy: Neo-Brutalism

### Core Principles
1. **Bold, High-Contrast Design**: Sharp contrasts between elements for maximum visual impact
2. **Thick Borders & Heavy Shadows**: 2px borders and offset shadows (4px 4px) for depth
3. **Functional Aesthetics**: Every design element serves a purpose, no decoration for decoration's sake
4. **Lowercase Typography**: All text is forced to lowercase via CSS for consistency
5. **Monospace Fonts**: Mix of Space Grotesk and JetBrains Mono for character
6. **Interactive Feedback**: Strong hover/active states with transforms and color changes

## Typography System

### Font Hierarchy
```css
/* Primary Font */
font-family: 'Space Grotesk', 'JetBrains Mono', monospace, system-ui, -apple-system, sans-serif;

/* Code/Stats Font */  
font-family: 'JetBrains Mono', monospace;
```

### Font Weights
- **Light**: 300 (not commonly used)
- **Normal**: 400 (body text, editor content)
- **Medium**: 500 (default weight, UI elements)
- **Semi-Bold**: 600 (buttons, important text)
- **Bold**: 700 (headings, titles)

### Text Transforms
- **Global Rule**: All text is `text-transform: lowercase` 
- **Exception**: None - this is enforced across the entire application

## Color System (CSS Variables)

### Background Colors
- `--bg-main`: Primary background (#1a1a1a) - main editor area
- `--bg-secondary`: Secondary background (#2d2d2d) - sidebar, containers
- `--bg-tertiary`: Tertiary background (#404040) - buttons, hover states

### Text Colors
- `--text-main`: Primary text (#f5f5f5) - main content
- `--text-secondary`: Secondary text (#d1d1d1) - less important content
- `--text-muted`: Muted text (#a0a0a0) - stats, dates, placeholders

### Accent Colors
- `--accent`: Primary accent (#00ff88) - active states, highlights
- `--accent-secondary`: Danger/warning accent (#ff6b6b) - delete buttons, errors
- `--border-main`: Border color (#f5f5f5) - all borders

### Shadows & Effects
- `--shadow`: Main shadow (4px 4px 0 0 #000) - primary depth
- `--shadow-light`: Light shadow (2px 2px 0 0 #000) - subtle depth
- `--hover-translate`: Hover offset (-2px) - interaction feedback

## Component Classes

### Core Neo-Brutalist Components

#### `.neo-container`
```css
background: var(--bg-secondary);
border: 2px solid var(--border-main);
color: var(--text-main);
box-shadow: var(--shadow);
```
**Usage**: Main containers, modals, panels

#### `.neo-button`
```css
padding: 16px;
font-weight: 600;
background: var(--bg-tertiary);
border: 2px solid var(--border-main);
color: var(--text-main);
box-shadow: var(--shadow);
```
**Hover State**: Translates up-left (-2px, -2px), changes to accent color
**Active State**: Translates down-right (2px, 2px), reduces shadow
**Usage**: All interactive buttons

#### `.neo-input`
```css
padding: 12px;
background: var(--bg-main);
border: 2px solid var(--border-main);
color: var(--text-main);
box-shadow: inset 2px 2px 0 0 #000;
```
**Focus State**: Accent border and shadow
**Usage**: Text inputs, search fields

#### `.neo-card`
```css
padding: 16px;
background: var(--bg-secondary);
border: 2px solid var(--border-main);
color: var(--text-main);
box-shadow: var(--shadow);
```
**Hover State**: Slight lift animation
**Usage**: Note items, information displays

### Layout Components

#### `.neo-sidebar`
```css
background: var(--bg-secondary);
border-right: 2px solid var(--border-main);
```
**Usage**: Left sidebar containing navigation

#### `.neo-note-item`
```css
padding: 12px;
cursor: pointer;
transition: colors;
border-bottom: 1px solid var(--text-muted);
color: var(--text-secondary);
```
**States**:
- **Hover**: Background becomes `--bg-tertiary`, text becomes `--text-main`
- **Active**: Background becomes `--accent`, text becomes `--bg-main`, bold weight

### Editor Components

#### `.neo-editor`
```css
width: 100%;
height: 100%;
border: none;
padding: 24px;
resize: none;
background: var(--bg-main);
color: var(--text-main);
font-family: 'Space Grotesk', monospace;
line-height: 1.6;
```
**Usage**: Main text editor textarea

#### `.neo-title-input`
```css
width: 100%;
font-weight: 700;
font-size: 1.25rem;
background: transparent;
border: none;
outline: none;
color: var(--text-main);
```
**Usage**: Note title editing

### Utility Classes

#### `.stats-text`
```css
color: var(--text-muted);
font-family: 'JetBrains Mono', monospace;
font-weight: 400;
font-size: 0.75rem;
```
**Usage**: Word counts, dates, metadata

#### `.date-text`
```css
color: var(--text-muted);
font-family: 'JetBrains Mono', monospace;
font-weight: 400;
```
**Usage**: All date displays

## Component Architecture

### Main Application Components

#### 1. **App.tsx** - Root Component
- **Purpose**: Main application wrapper, theme initialization, keyboard shortcuts
- **Structure**: Horizontal flex layout with sidebar and editor
- **Key Features**: 
  - Loading state management
  - Global keyboard shortcuts (Cmd+N, Cmd+,)
  - Theme CSS variable application

#### 2. **NotesSidebar.tsx** - Navigation Sidebar
- **Width**: 320px (w-80)
- **Sections**:
  - **Header**: Title, action buttons (theme, create folder, create note)
  - **View Modes**: Folders/List/Graph toggle buttons
  - **Search**: Global search input
  - **Content**: Dynamic based on view mode
  - **Footer**: Stats display
- **States**: Three view modes (folders, list, graph)

#### 3. **NoteEditor.tsx** - Main Editor Area
- **Layout**: Vertical flex (header, editor, footer)
- **Sections**:
  - **Header**: Title input, last modified date, delete button
  - **Editor**: Rich text editor component
  - **Footer**: Word/character count, creation date
- **Features**: Auto-save with 500ms debounce

#### 4. **ThemeCustomizer.tsx** - Theme Configuration Panel
- **Type**: Modal overlay
- **Size**: 800x600px
- **Layout**: Three-column layout
- **Sections**:
  - **Presets**: Default theme buttons (25% width)
  - **Customization**: Color picker and swatches (50% width)
  - **Preview**: Live theme preview (25% width)
- **Features**: Real-time theme updates

### Theme System

#### Default Themes
1. **Dark Brutalist**: Default dark theme with green accent
2. **Neon Cyber**: Magenta/cyan cyberpunk theme  
3. **Forest Night**: Green/nature inspired dark theme
4. **Ocean Depth**: Blue/teal aquatic theme

#### Color Properties Per Theme
```typescript
interface Theme {
  name: string;
  bgMain: string;        // Main editor background
  bgSecondary: string;   // Sidebar/container background  
  bgTertiary: string;    // Button/hover background
  textMain: string;      // Primary text color
  textSecondary: string; // Secondary text color
  textMuted: string;     // Muted text (stats, dates)
  borderMain: string;    // All border colors
  accent: string;        // Active states, highlights
  accentSecondary: string; // Danger/warning color
}
```

## Interaction Patterns

### Button Interactions
1. **Default**: Offset shadow (4px 4px)
2. **Hover**: Translate up-left (-2px -2px), color change to accent
3. **Active**: Translate down-right (2px 2px), reduced shadow (2px 2px)
4. **Danger Variant**: Red accent color, hover becomes red background

### Input Interactions  
1. **Default**: Inset shadow (2px 2px inset)
2. **Focus**: Accent border color, accent inset shadow
3. **Placeholder**: Muted text color

### List Item Interactions
1. **Default**: Secondary text color, bottom border
2. **Hover**: Tertiary background, main text color
3. **Active/Selected**: Accent background, contrasting text, bold weight

## Layout Rules

### Grid System
- **Sidebar**: Fixed width (320px)
- **Editor**: Flex-grow to fill remaining space
- **Modal**: Fixed size (800x600px) centered

### Spacing Scale
- **xs**: 2px
- **sm**: 4px  
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **2xl**: 24px

### Border Rules
- **All components**: 2px solid borders
- **Exception**: List item separators use 1px borders

### Shadow Rules
- **Primary shadow**: 4px 4px 0 0 #000 (hard drop shadow)
- **Light shadow**: 2px 2px 0 0 #000 (pressed state)
- **Inset shadow**: 2px 2px 0 0 inset (input fields)

## Responsive Behavior

### Desktop First
- **Primary Target**: Desktop/laptop screens
- **Minimum Width**: 1024px recommended
- **Sidebar**: Always visible at 320px width

### Mobile Considerations (Future)
- Sidebar would collapse to overlay
- Single-column layout
- Touch-friendly button sizes

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Focus Indicators**: Accent color borders/shadows
- **Keyboard Shortcuts**: 
  - `Cmd/Ctrl + N`: New note
  - `Cmd/Ctrl + ,`: Theme customizer

### Color Contrast
- **High Contrast**: All text meets WCAG AA standards
- **Focus States**: Clear accent color indicators
- **Active States**: Strong color differentiation

### Screen Readers
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Interactive elements have descriptive labels
- **Alt Text**: Icons have title attributes

## Development Guidelines

### CSS Organization
1. **Variables**: All colors/measurements in CSS custom properties
2. **Components**: Individual class for each component type
3. **Utilities**: Shared classes for common patterns
4. **Layers**: Tailwind @layer structure (base, components, utilities)

### Component Patterns
1. **Single Responsibility**: Each component has one clear purpose
2. **Prop Interfaces**: TypeScript interfaces for all props
3. **State Management**: Zustand for global state, local for UI state
4. **Event Handling**: Clear, descriptive function names

### Naming Conventions
1. **CSS Classes**: kebab-case with "neo-" prefix
2. **Components**: PascalCase with descriptive names  
3. **Functions**: camelCase with verb prefixes (handle-, get-, set-)
4. **Variables**: camelCase for JavaScript, kebab-case for CSS

## Future Enhancement Areas

### Rich Text Editor
- **Toolbar**: Formatting buttons with neo-brutalist styling
- **Markdown Support**: Live preview with themed rendering
- **Code Blocks**: Syntax highlighting with JetBrains Mono

### Knowledge Graph
- **Nodes**: Circular elements with note titles
- **Connections**: Thick lines following border styling  
- **Interactions**: Hover/click with transform feedback

### Mobile Optimization
- **Collapsible Sidebar**: Overlay pattern for mobile
- **Touch Gestures**: Swipe navigation between notes
- **Responsive Grid**: Single-column layout under 768px

This design system ensures consistency across the application while maintaining the bold, functional aesthetic of neo-brutalism. All components follow these patterns for a cohesive user experience.