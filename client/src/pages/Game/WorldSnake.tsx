/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef } from 'react';
import { Game } from './Objects/Game';

const WorldSnake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const game = new Game(canvas);
    }
  });
  return (
    <div className="overflow-y-hidden overflow-x-hidden">
      <canvas ref={canvasRef} className="bg-slate-500"></canvas>
    </div>
  );
};

export default WorldSnake;
