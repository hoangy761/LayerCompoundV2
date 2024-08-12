/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import WorldSnake from './components/WorldSnake';
import LeaderBoard from './components/LeaderBoard';
import { ISnake } from './interfaces';
import { INIT_SNAKE_SIZE, SNAKE_SPEED } from './constants';

const Game = () => {
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
  return (
    <div className="relative">
      <PageTitle title="LayerC | Game" />

      <div className="absolute z-40">
        <LeaderBoard />
      </div>
      <WorldSnake snakeAttributes={snakeAttributes} setSnakeAttributes={setSnakeAttributes} />
    </div>
  );
};

export default Game;
