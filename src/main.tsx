import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

console.log('🔧 main.tsx initializing...');

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  console.error('🚨 Promise:', event.promise);
});

// Global error handler for JavaScript errors
window.addEventListener('error', (event) => {
  console.error('🚨 Global JavaScript error:', event.error);
  console.error('🚨 Error message:', event.message);
  console.error('🚨 Source:', event.filename, 'Line:', event.lineno, 'Column:', event.colno);
});

console.log('🔧 Setting up React root...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in HTML');
  }
  
  console.log('🔧 Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  console.log('🔧 Rendering App with ErrorBoundary (StrictMode disabled for debugging)...');
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
  
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('🚨 Fatal error in main.tsx:', error);
  document.body.innerHTML = `
    <div style="background: #ff0000; color: #fff; padding: 20px; font-family: monospace;">
      <h1>🚨 Fatal Application Error</h1>
      <p>Failed to initialize React application</p>
      <pre>${error}</pre>
      <button onclick="window.location.reload()">🔄 Reload</button>
    </div>
  `;
}
