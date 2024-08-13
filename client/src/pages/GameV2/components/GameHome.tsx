import { Wallet01Icon } from 'hugeicons-react';
import React, { useEffect, useRef } from 'react';
import Button from '~/components/Button';
import { useModalContext } from '~/hooks/Modal/useModalProvider';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

interface IGameHome {
  name: string;
  // eslint-disable-next-line no-unused-vars
  setName: (value: string) => void;
  handlePlayGame: () => void;
}

const GameHome: React.FC<IGameHome> = ({ name, setName, handlePlayGame }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { openModal } = useModalContext();
  const { selectedAccount } = useWalletProvider();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedAccount) {
      handlePlayGame();
    }
  }
  console.log(import.meta.env);
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-white py-2 justify-between">
          <input
            className="appearance-none bg-transparent border-none w-3/6 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Jane Doe"
            aria-label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
          {selectedAccount ? (
            <Button white roundedMd disable={!name}>
              Play Game
            </Button>
          ) : (
            <Button white icon={<Wallet01Icon />} onClick={openModal} roundedMd>
              Connect wallet
            </Button>
          )}
        </div>
        {JSON.stringify(import.meta.env.VITE_REACT_APP_SERVER_URL)}
        {JSON.stringify(import.meta.env)}
      </form>
    </div>
  );
};

export default GameHome;
