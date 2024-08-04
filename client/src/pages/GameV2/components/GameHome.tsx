import React from 'react';
import Button from '~/components/Button';

interface IGameHome {
  name: string;
  // eslint-disable-next-line no-unused-vars
  setName: (value: string) => void;
  handlePlayGame: () => void;
}

const GameHome: React.FC<IGameHome> = ({ name, setName, handlePlayGame }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-white py-2 justify-between">
          <input
            className="appearance-none bg-transparent border-none w-4/6 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Jane Doe"
            aria-label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button white roundedMd onClick={handlePlayGame} disable={!name}>
            Play Game
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GameHome;
