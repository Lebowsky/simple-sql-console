import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/Main/Main';
import { SimpleUIContextProvider } from './context/SimpleUIContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SimpleUIContextProvider>
      <Main />
    </SimpleUIContextProvider>
  </React.StrictMode>
);
