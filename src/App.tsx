import { useEffect } from 'react';
import NotesSidebar from './components/NotesSidebar';
import NoteEditor from './components/NoteEditor';
import ThemeCustomizer from './components/ThemeCustomizer';
import { useStore } from './store';

function App() {
  const { 
    addNote, 
    currentTheme, 
    isThemeCustomizerOpen, 
    setTheme, 
    toggleThemeCustomizer,
    applyThemeToCSS,
    loadFromFile,
    isElectron,
    exportNotes,
    importNotes
  } = useStore();

  useEffect(() => {
    // Apply initial theme
    applyThemeToCSS(currentTheme);
    
    // Load notes from file system if running in Electron
    if (isElectron()) {
      loadFromFile();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + N for new note
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        addNote();
      }
      // Cmd/Ctrl + , for theme customizer
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        toggleThemeCustomizer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addNote, toggleThemeCustomizer]);

  // Electron menu event handlers
  useEffect(() => {
    if (!isElectron()) return;

    const handleMenuNewNote = () => addNote();
    const handleMenuPreferences = () => toggleThemeCustomizer();
    const handleMenuExport = async (_event: any, filePath: string) => {
      await exportNotes(filePath);
    };
    const handleMenuImport = async (_event: any, filePath: string) => {
      await importNotes(filePath);
    };

    // Register menu event listeners
    window.electronAPI.onMenuNewNote(handleMenuNewNote);
    window.electronAPI.onMenuPreferences(handleMenuPreferences);
    window.electronAPI.onMenuExport(handleMenuExport);
    window.electronAPI.onMenuImport(handleMenuImport);

    // Cleanup on unmount
    return () => {
      window.electronAPI.removeAllListeners('menu-new-note');
      window.electronAPI.removeAllListeners('menu-preferences');
      window.electronAPI.removeAllListeners('menu-export');
      window.electronAPI.removeAllListeners('menu-import');
    };
  }, [addNote, toggleThemeCustomizer, exportNotes, importNotes, isElectron]);

  return (
    <div className="w-full h-screen flex" style={{ background: 'var(--bg-main)' }}>
      <NotesSidebar />
      <NoteEditor />
      <ThemeCustomizer
        isOpen={isThemeCustomizerOpen}
        onClose={toggleThemeCustomizer}
        currentTheme={currentTheme}
        onThemeChange={setTheme}
      />
    </div>
  );
}

export default App
