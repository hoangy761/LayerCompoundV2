import React from 'react';
import Header from '~/components/Header';
import ModalWalletConnect from '~/components/Modal/ModalWalletConnect';

interface Props {
  children: React.ReactNode;
}

const GameLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="w-full h-screen overflow-hidden">{children}</main>
      <ModalWalletConnect />
    </div>
  );
};

export default GameLayout;
