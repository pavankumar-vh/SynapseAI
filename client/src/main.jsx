import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './index.css'

console.log('🚀 Main.jsx loading...');
console.log('📦 React version:', React.version);

try {
  const rootElement = document.getElementById('root');
  console.log('📍 Root element:', rootElement ? 'Found' : 'NOT FOUND');
  
  if (!rootElement) {
    document.body.innerHTML = '<div style="padding: 20px; color: red;">ERROR: Root element not found in index.html</div>';
  } else {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );
    console.log('✅ React app mounted successfully');
  }
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">
    <h1>Failed to start app</h1>
    <p>${error.message}</p>
    <pre>${error.stack}</pre>
  </div>`;
}


