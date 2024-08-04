/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, INIT_SNAKE_SIZE, MINI_MAP_GAME_WIDTH, SNAKE_SPEED } from '../constants';
import { ISnake } from '../interfaces';
import { getRandomInteger } from '../ultis';

const snakeInitAttributes: ISnake = {
  isAlive: true,
  speed: SNAKE_SPEED,
  tailPositions: [],
  positionCollision: { x: 0, y: 0 },
  style: {
    borderColor: COLORS[getRandomInteger(0, COLORS.length - 1)],
    color: COLORS[getRandomInteger(0, COLORS.length - 1)],
    size: INIT_SNAKE_SIZE,
  },
  styleShadow: {
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(0,0,0,0.1)',
    size: INIT_SNAKE_SIZE + INIT_SNAKE_SIZE / 9,
  },
};

interface WorldSnakeProps {
  snakeAttributes: ISnake;
  setSnakeAttributes: (attributes: ISnake) => void;
}

const WorldSnake: React.FC<WorldSnakeProps> = ({ snakeAttributes, setSnakeAttributes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);
  const canvasRefMiniMap = useRef<HTMLCanvasElement>(null);

  console.log('re-render', snakeAttributes);

  return (
    <div className="relative">
      <div className="absolute z-50 right-0">
        <canvas ref={canvasRefMiniMap} width={MINI_MAP_GAME_WIDTH} height={MINI_MAP_GAME_WIDTH}></canvas>
      </div>
      <div className="overflow-y-hidden overflow-x-hidden">
        <canvas ref={canvasRef} className="bg-slate-500"></canvas>
      </div>
    </div>
  );
};

export default WorldSnake;
