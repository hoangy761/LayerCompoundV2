import React from 'react';
import Button from '~/components/Button';
import { useModalContext } from '~/hooks/Modal/useModalProvider';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

const Portfolio = () => {
  const { selectedAccount } = useWalletProvider();
  const { openModal } = useModalContext();
  return (
    <div className="">
      <h1 className="text-lg md:text-2xl  text-end">Portfolio</h1>
      <h6 className="text-white-1  text-end">Deposited:</h6>
      {selectedAccount ? (
        <h3 className="text-end text-sm md:text-base">$200,000.00</h3>
      ) : (
        <Button text className="p-0 m-0 text-end" onClick={openModal}>
          Connect wallet
        </Button>
      )}
    </div>
  );
};

export default Portfolio;
