import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';

type SelectedAccountByWallet = Record<string, string | null>;

interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>; // Record of wallets by UUID
  selectedWallet: EIP6963ProviderDetail | null; // Currently selected wallet
  selectedAccount: string | null; // Account address of selected wallet
  errorMessage: string | null; // Error message
  isPending: boolean; //
  // eslint-disable-next-line no-unused-vars
  connectWallet: (walletUuid: string) => Promise<void>; // Function to trigger wallet connection
  disconnectWallet: () => void; // Function to trigger wallet disconnection
  clearError: () => void; // Function to clear error message
}

declare global {
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent;
  }
}
const defaultContextValue: WalletProviderContext = {
  wallets: {},
  selectedWallet: null,
  selectedAccount: null,
  errorMessage: null,
  isPending: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  clearError: () => {},
};

export const WalletProviderContext = createContext<WalletProviderContext>(defaultContextValue);

// eslint-disable-next-line react/prop-types
export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, EIP6963ProviderDetail>>({});
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedAccountByWalletRdns, setSelectedAccountByWalletRdns] = useState<SelectedAccountByWallet>({});

  const [errorMessage, setErrorMessage] = useState('');
  const clearError = () => setErrorMessage('');
  const setError = (error: string) => setErrorMessage(error);

  useEffect(() => {
    const savedSelectedWalletRdns = localStorage.getItem('selectedWalletRdns');
    const savedSelectedAccountByWalletRdns = localStorage.getItem('selectedAccountByWalletRdns');

    if (savedSelectedAccountByWalletRdns) {
      setSelectedAccountByWalletRdns(JSON.parse(savedSelectedAccountByWalletRdns));
    }

    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      setWallets((currentWallets) => ({
        ...currentWallets,
        [event.detail.info.rdns]: event.detail,
      }));

      if (savedSelectedWalletRdns && event.detail.info.rdns === savedSelectedWalletRdns) {
        setSelectedWalletRdns(savedSelectedWalletRdns);
      }
    }

    window.addEventListener('eip6963:announceProvider', onAnnouncement);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => window.removeEventListener('eip6963:announceProvider', onAnnouncement);
  }, []);

  const connectWallet = useCallback(
    async (walletRdns: string) => {
      try {
        clearError();
        setIsPending(true);
        const wallet = wallets[walletRdns];
        const accounts = (await wallet.provider.request({ method: 'eth_requestAccounts' })) as string[];

        if (accounts?.[0]) {
          setSelectedWalletRdns(wallet.info.rdns);
          setSelectedAccountByWalletRdns((currentAccounts) => ({
            ...currentAccounts,
            [wallet.info.rdns]: accounts[0],
          }));

          localStorage.setItem('selectedWalletRdns', wallet.info.rdns);
          localStorage.setItem(
            'selectedAccountByWalletRdns',
            JSON.stringify({
              ...selectedAccountByWalletRdns,
              [wallet.info.rdns]: accounts[0],
            }),
          );
        }
        setIsPending(false);
      } catch (error) {
        console.error('Failed to connect to provider:', error);
        const walletError: WalletError = error as WalletError;
        setError(`Code: ${walletError.code} \nError Message: ${walletError.message}`);
        setIsPending(false);
      }
    },
    [wallets, selectedAccountByWalletRdns],
  );

  const disconnectWallet = useCallback(async () => {
    if (selectedWalletRdns) {
      setIsPending(true);
      setSelectedAccountByWalletRdns((currentAccounts) => ({
        ...currentAccounts,
        [selectedWalletRdns]: null,
      }));

      const wallet = wallets[selectedWalletRdns];
      setSelectedWalletRdns(null);
      localStorage.removeItem('selectedWalletRdns');

      try {
        await wallet.provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
        setIsPending(false);
      } catch (error) {
        console.error('Failed to revoke permissions:', error);
        setIsPending(false);
      }
    }
  }, [selectedWalletRdns, wallets]);

  const contextValue: WalletProviderContext = {
    wallets,
    selectedWallet: selectedWalletRdns === null ? null : wallets[selectedWalletRdns],
    selectedAccount: selectedWalletRdns === null ? null : selectedAccountByWalletRdns[selectedWalletRdns],
    errorMessage,
    isPending,
    connectWallet,
    disconnectWallet,
    clearError,
  };

  return <WalletProviderContext.Provider value={contextValue}>{children}</WalletProviderContext.Provider>;
};
