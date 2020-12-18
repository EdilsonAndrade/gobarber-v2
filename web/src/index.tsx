import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthProvider } from './hooks/AuthContext';
import AppProvider from './hooks/index';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
