import React from 'react';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

export const WalletError = () => {
  const { errorMessage, clearError } = useWalletProvider();
  const isError = !!errorMessage;

  return (
    <div style={isError ? { backgroundColor: 'brown' } : {}}>
      {isError && (
        <button onClick={clearError}>
          <strong>Error:</strong> {errorMessage}
        </button>
      )}
    </div>
  );
};
