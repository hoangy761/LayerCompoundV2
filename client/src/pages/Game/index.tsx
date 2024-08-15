import React, { useEffect, useState } from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import { IDataRealTime } from './interfaces';
import GameHome from './components/GameHome';
import { socket } from '~/services/socket';
import GamePlay from './components/GamePlay';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

const Game = () => {
  const [name, setName] = useState<string>('');
  const [isGameLive, setIsGameLive] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [gameData, setGameData] = useState<IDataRealTime | null>(null);
  const [angle, setAngle] = useState<number>(0);

  const { selectedAccount } = useWalletProvider();
  useEffect(() => {
    socket.connect();
    socket.on('data_game', (data) => {
      setGameData(data);
    });
    return () => {
      socket.off('data_game');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit('mouse_move', { angle, userId: selectedAccount });

    return () => {
      socket.off('mouse_move');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [angle]);

  useEffect(() => {
    socket.emit('speed_up', { isMouseDown, userId: selectedAccount });
  }, [isMouseDown, selectedAccount]);
  const handlePlayGame = () => {
    setIsGameLive(true);
    const userInfor = {
      userId: selectedAccount,
      name,
      roomId: '100',
    };
    socket.emit('join_game', userInfor);
  };
  return (
    <>
      <PageTitle title="LayerC | Game" />
      {!isGameLive ? (
        <GameHome handlePlayGame={handlePlayGame} name={name} setName={setName} />
      ) : (
        <GamePlay
          gameData={gameData}
          setAngle={setAngle}
          setIsGameLive={setIsGameLive}
          setIsMouseDown={setIsMouseDown}
        />
      )}
    </>
  );
};

export default Game;
