import React from 'react';
import { useModalContext } from '~/hooks/Modal/useModalProvider';
import Button from '~/components/Button';
import { Cancel01Icon } from 'hugeicons-react';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

const ModalWalletConnect: React.FC = () => {
  const { wallets, connectWallet, isPending, errorMessage, selectedWallet, clearError } = useWalletProvider();
  const { showModal, closeModal } = useModalContext();

  if (!showModal) return null;

  return (
    <>
      {!selectedWallet && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black-50 z-20 mx-4">
          {/* <div className="modal absolute left-1/3 bg-black-4 border border-white-1 rounded-md"> */}
          <div className="modal-content flex flex-col-reverse md:flex-row md:flex  absolute  bg-black-2 border border-white-1 rounded-2xl">
            <div className="p-5 relative">
              <header className="md:mr-44 mb-5 md:flex items-center space-x-4 hidden">
                <img src="logo.svg" width={30} alt="logo" className="ml-3" />{' '}
                <p className="text-lg md:text-2xl">Connect</p>
              </header>
              <div className="mb-4">
                {Object.keys(wallets).length > 0 ? (
                  Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
                    <Button
                      text
                      key={provider.info.uuid}
                      onClick={() => connectWallet(provider.info.rdns)}
                      icon={<img src={provider.info.icon} alt={provider.info.name} width={50} />}
                      className="p-0 m-0"
                    >
                      {provider.info.name}
                    </Button>
                  ))
                ) : (
                  <div>there are no Announced Providers</div>
                )}
              </div>
              <footer className="absolute bottom-0 right-0 md:left-0">
                <Button
                  text
                  onClick={() => {
                    clearError();
                    closeModal();
                  }}
                >
                  Continue as Guest
                </Button>
              </footer>
            </div>
            <div className="border border-l-white-1 border-black p-5 rounded-2xl text-center max-w-xl">
              <div className="float-end ">
                <Button
                  icon={<Cancel01Icon />}
                  onClick={() => {
                    clearError();
                    closeModal();
                  }}
                />
              </div>
              <div className="flex justify-center w-full ">
                <img
                  src="earth-connect.png"
                  alt="earth-connect"
                  className={`${isPending ? 'animate-spin' : 'animate-pulse'} w-52  md:w-80 `}
                />
              </div>
              <p className="text-lg md:text-2xl p-5">Your gateway to the connect Web3</p>
              <div className="w-full flex justify-center">
                <p className=" text-sm md:text-md text-wrap max-w-sm text-error">{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWalletConnect;
