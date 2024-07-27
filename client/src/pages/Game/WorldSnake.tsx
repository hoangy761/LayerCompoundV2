/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef } from 'react';
import { Game } from './Game';

const WorldSnake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const game = new Game(canvas);
    }
  });
  // className="bg-[#f1f2f2]"
  return (
    <div>
      <canvas ref={canvasRef} className="bg-slate-500"></canvas>
    </div>
  );
};

export default WorldSnake;
