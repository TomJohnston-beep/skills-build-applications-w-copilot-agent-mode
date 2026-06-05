import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
console.log('VITE_CODESPACE_NAME:', codespaceName);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
