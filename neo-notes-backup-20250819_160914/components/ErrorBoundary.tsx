import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('🚨 ErrorBoundary caught error:', error);
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 ErrorBoundary componentDidCatch:', error, errorInfo);
    console.error('🚨 Component stack:', errorInfo.componentStack);
    console.error('🚨 Error stack:', error.stack);
    
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
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
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <h1>🚨 React Error Boundary Triggered</h1>
            <h2>Something went wrong in the React component tree</h2>
            
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              <h3>Error Details:</h3>
              <pre style={{ 
                background: '#000', 
                padding: '10px', 
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {this.state.error && this.state.error.toString()}
              </pre>
              
              {this.state.errorInfo && (
                <>
                  <h3>Component Stack:</h3>
                  <pre style={{ 
                    background: '#000', 
                    padding: '10px', 
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
              
              {this.state.error?.stack && (
                <>
                  <h3>Full Stack Trace:</h3>
                  <pre style={{ 
                    background: '#000', 
                    padding: '10px', 
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    {this.state.error.stack}
                  </pre>
                </>
              )}
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                padding: '10px 20px', 
                marginTop: '20px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              🔄 Reload Application
            </button>
            
            <p style={{ marginTop: '20px', fontSize: '14px' }}>
              Open browser console (F12) for additional debugging information
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;