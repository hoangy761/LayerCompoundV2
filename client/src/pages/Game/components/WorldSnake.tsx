/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef } from 'react';
import { Game } from '../Objects/Game';
import { INIT_SNAKE_LENGTH, INIT_SNAKE_SIZE, MINI_MAP_GAME_WIDTH, SNAKE_SPEED } from '../constants';
import { ISnake } from '../interfaces';

const snakeInitAttributes: ISnake = {
  isAlive: true,
  speed: SNAKE_SPEED,
  tailPositions: [],
  length: INIT_SNAKE_LENGTH,
  positionCollision: { x: 0, y: 0 },
  style: {
    borderColor: 'green',
    color: 'green',
    size: INIT_SNAKE_SIZE,
  },
};
const WorldSnake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefMiniMap = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const canvasMiniMap = canvasRefMiniMap.current;
    if (canvas && canvasMiniMap) {
      const game = new Game(canvas, canvasMiniMap, snakeInitAttributes);
    }
  });
  return (
    <div className="relative">
      <div className={`absolute z-50 right-0`}>
        <canvas ref={canvasRefMiniMap} width={MINI_MAP_GAME_WIDTH} height={MINI_MAP_GAME_WIDTH}></canvas>
      </div>
      <div className="overflow-y-hidden overflow-x-hidden">
        <canvas ref={canvasRef} className="bg-slate-500"></canvas>
      </div>
    </div>
  );
};

export default WorldSnake;
