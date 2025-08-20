import { useEffect, useState, Suspense, lazy } from 'react';
import NotesSidebar from './components/NotesSidebar';
import NoteEditor from './components/NoteEditor';
import { useStore } from './store';

// Lazy load heavy components
const ThemeCustomizer = lazy(() => import('./components/ThemeCustomizer'));

// Error logging utility
const logError = (context: string, error: any) => {
  console.error(`❌ [${context}] Error:`, error);
  console.error(`❌ [${context}] Stack:`, error?.stack);
  console.error(`❌ [${context}] Message:`, error?.message);
};

function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  console.log('🔧 App component initializing...');
  
  let storeData;
  try {
    console.log('🔧 Attempting to connect to store...');
    storeData = useStore();
    console.log('✅ Store connected successfully:', Object.keys(storeData));
  } catch (err) {
    logError('STORE_CONNECTION', err);
    setError(`Store connection failed: ${err}`);
    return (
      <div style={{ 
        background: '#ff0000', 
        color: '#fff', 
        padding: '20px',
        fontFamily: 'monospace'
      }}>
        <h1>❌ Store Connection Error</h1>
        <pre>{error}</pre>
        <p>Check console for details</p>
      </div>
    );
  }
  
  const { 
    currentTheme,
    isThemeCustomizerOpen,
    setTheme,
    toggleThemeCustomizer,
    applyThemeToCSS,
    addNote,
    initFromLocalStorage
  } = storeData;

  useEffect(() => {
    console.log('🚀 Neo Notes useEffect triggered - current isReady:', isReady);
    
    try {
      console.log('🔧 Initializing from localStorage...');
      // Initialize from localStorage first
      initFromLocalStorage();
      console.log('✅ localStorage initialized');
      
      console.log('🔧 Applying initial theme...', currentTheme);
      // Apply initial theme immediately
      applyThemeToCSS(currentTheme);
      console.log('✅ Theme applied');
      
      // Mark as ready after a short delay
      console.log('🔧 Setting up timeout for ready state...');
      const timeoutId = setTimeout(() => {
        console.log('🔧 Timeout fired - Setting ready state...');
        setIsReady(true);
        console.log('✅ Full interface ready - isReady set to true');
      }, 100);
      
      console.log('🔧 Timeout ID:', timeoutId);
      
      // Also try immediate backup in case timeout fails
      const backupTimeoutId = setTimeout(() => {
        console.log('🔧 Backup timeout - checking if still not ready...');
        setIsReady(prev => {
          console.log('🔧 Backup timeout - current isReady state:', prev);
          if (!prev) {
            console.log('🔧 Backup timeout - forcing ready state');
            return true;
          }
          return prev;
        });
      }, 500);
      
      // Cleanup function
      return () => {
        console.log('🔧 Cleaning up timeouts...');
        clearTimeout(timeoutId);
        clearTimeout(backupTimeoutId);
      };
    } catch (err) {
      logError('APP_INITIALIZATION', err);
      setError(`Initialization failed: ${err}`);
    }
  }, []); // Empty dependency array
  
  // Separate effect to monitor isReady changes
  useEffect(() => {
    console.log('🔧 isReady state changed to:', isReady);
  }, [isReady]);

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

  // Show any initialization errors
  if (error) {
    return (
      <div style={{ 
        background: '#ff0000', 
        color: '#fff', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1>❌ Neo Notes Error</h1>
          <pre style={{ background: '#000', padding: '10px', textAlign: 'left' }}>{error}</pre>
          <p>Check browser console (F12) for detailed logs</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            🔄 Reload App
          </button>
        </div>
      </div>
    );
  }

  // Show loading briefly, then full interface
  if (!isReady) {
    console.log('🔧 Rendering loading screen...');
    return (
      <div style={{ 
        background: '#1a1a1a', 
        color: '#f5f5f5', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>🚀 Neo Notes</h1>
          <p>Loading full interface...</p>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>Check console (F12) for loading details</p>
        </div>
      </div>
    );
  }

  console.log('🔧 Rendering main interface...');
  
  try {
    return (
      <div className="w-full h-screen flex" style={{ background: 'var(--bg-main)' }}>
        {(() => {
          try {
            console.log('🔧 Rendering NotesSidebar...');
            return <NotesSidebar />;
          } catch (err) {
            logError('NOTES_SIDEBAR_RENDER', err);
            return <div style={{ background: '#ff0000', color: '#fff', padding: '10px' }}>❌ Sidebar Error</div>;
          }
        })()}
        
        {(() => {
          try {
            console.log('🔧 Rendering NoteEditor...');
            return <NoteEditor />;
          } catch (err) {
            logError('NOTE_EDITOR_RENDER', err);
            return <div style={{ background: '#ff0000', color: '#fff', padding: '10px' }}>❌ Editor Error</div>;
          }
        })()}
        
        {(() => {
          try {
            console.log('🔧 Rendering ThemeCustomizer...');
            return (
              <Suspense fallback={
                <div style={{ 
                  position: 'fixed', 
                  top: '20px', 
                  right: '20px', 
                  background: 'var(--bg-secondary)', 
                  padding: '10px',
                  border: '2px solid var(--border-main)',
                  color: 'var(--text-main)',
                  fontSize: '12px'
                }}>
                  Loading theme customizer...
                </div>
              }>
                <ThemeCustomizer
                  isOpen={isThemeCustomizerOpen}
                  onClose={toggleThemeCustomizer}
                  currentTheme={currentTheme}
                  onThemeChange={setTheme}
                />
              </Suspense>
            );
          } catch (err) {
            logError('THEME_CUSTOMIZER_RENDER', err);
            return <div style={{ background: '#ff0000', color: '#fff', padding: '10px' }}>❌ Theme Error</div>;
          }
        })()}
      </div>
    );
  } catch (err) {
    logError('MAIN_RENDER', err);
    setError(`Render failed: ${err}`);
    return null;
  }
}

export default App;