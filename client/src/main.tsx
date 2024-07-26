import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletProvider } from './hooks/Wallet/WalletProvider';
import { ModalProvider } from './hooks/Modal/ModalProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </WalletProvider>
  </React.StrictMode>,
);
