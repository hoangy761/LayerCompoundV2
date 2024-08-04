/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import WorldSnake from './components/WorldSnake';
import LeaderBoard from './components/LeaderBoard';
import { ISnake } from './interfaces';
import { INIT_SNAKE_SIZE, SNAKE_SPEED } from './constants';
import GameHome from './components/GameHome';
import { socket } from '~/services/socket';

const GameV2 = () => {
  const [name, setName] = useState<string>('');
  const [isGameLive, setIsGameLive] = useState<boolean>(false);
  const [snakeAttributes, setSnakeAttributes] = useState<ISnake>({
    isAlive: true,
    speed: SNAKE_SPEED + 4,
    tailPositions: [],
    positionCollision: { x: 0, y: 0 },
    style: {
      borderColor: 'green',
      color: 'red',
      size: INIT_SNAKE_SIZE,
    },
    styleShadow: {
      borderColor: 'rgba(0,0,0,0.1)',
      color: 'rgba(0,0,0,0.1)',
      size: INIT_SNAKE_SIZE + INIT_SNAKE_SIZE / 9,
    },
  });

  useEffect(() => {
    socket.connect();
    socket.emit('online');

    // socket.on(socketMessages.RECEIVE_NOTIFY, (data) => {
    //     console.log('heloHeader', data);
    //     setNotifications((prev) => [data, ...prev]);
    //     setNotifying(true);
    //     toast(data.content || 'Có thông báo mới!');
    // });

    // Cleanup to avoid multiple connections and event listeners
    return () => {
      // socket.off(socketMessages.RECEIVE_MESSAGE);
      // socket.off(socketMessages.RECEIVE_NOTIFY);
      socket.disconnect();
    };
  }, []);

  const handlePlayGame = () => {
    setIsGameLive(true);
  };
  return (
    <>
      {!isGameLive ? (
        <GameHome handlePlayGame={handlePlayGame} name={name} setName={setName} />
      ) : (
        <div className="relative">
          <PageTitle title="LayerC | GameV2" />

          <div className="absolute z-40">
            <LeaderBoard />
          </div>
          <WorldSnake snakeAttributes={snakeAttributes} setSnakeAttributes={setSnakeAttributes} />
        </div>
      )}
    </>
  );
};

export default GameV2;
