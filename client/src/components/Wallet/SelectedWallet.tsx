import { formatAddress } from '~/utils';
import React from 'react';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

export const SelectedWallet = () => {
  const { selectedWallet, selectedAccount, disconnectWallet } = useWalletProvider();

  return (
    <>
      <h2>{selectedAccount ? '' : 'No '}Wallet Selected</h2>
      {selectedAccount && selectedWallet && (
        <>
          <div>
            <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
            <div>{selectedWallet.info.name}</div>
            <div>({formatAddress(selectedAccount)})</div>
            <div>
              <strong>uuid:</strong> {selectedWallet.info.uuid}
            </div>
            <div>
              <strong>rdns:</strong> {selectedWallet.info.rdns}
            </div>
          </div>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      )}
    </>
  );
};
