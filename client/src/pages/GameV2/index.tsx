/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import { IDataRealTime, IPosition, ISnake } from './interfaces';
import GameHome from './components/GameHome';
import { socket } from '~/services/socket';
import GamePlay from './components/GamePlay';
import { v4 as uuidv4 } from 'uuid';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

const GameV2 = () => {
  const [name, setName] = useState<string>('');
  const [isGameLive, setIsGameLive] = useState<boolean>(false);
  const [gameData, setGameData] = useState<IDataRealTime | null>(null);
  const [angle, setAngle] = useState<number>(0);

  const { selectedAccount } = useWalletProvider();
  useEffect(() => {
    socket.connect();
    socket.on('data_game', (data) => {
      setGameData(data);
      console.log(data);
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

  const handlePlayGame = () => {
    setIsGameLive(true);
    const userInfor = {
      userId: selectedAccount,
      name,
      roomId: 100,
    };
    socket.emit('start_game', userInfor);
  };
  return (
    <>
      <PageTitle title="LayerC | GameV2" />
      {!isGameLive ? (
        <GameHome handlePlayGame={handlePlayGame} name={name} setName={setName} />
      ) : (
        <GamePlay gameData={gameData} setAngle={setAngle} />
      )}
    </>
  );
};

export default GameV2;
