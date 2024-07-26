import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import ModalWalletConnect from '~/components/Modal/ModalWalletConnect';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-full">{children}</main>
      <ModalWalletConnect />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
