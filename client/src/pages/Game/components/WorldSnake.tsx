/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef } from 'react';
import { Game } from '../Objects/Game';
import { MINI_MAP_GAME_WIDTH } from '../constants';

const WorldSnake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefMiniMap = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const canvasMiniMap = canvasRefMiniMap.current;
    if (canvas && canvasMiniMap) {
      const game = new Game(canvas, canvasMiniMap);
    }
  });
  return (
    <div className="relative">
      <div className={`absolute z-50 right-0`}>
        <canvas
          ref={canvasRefMiniMap}
          width={MINI_MAP_GAME_WIDTH}
          height={MINI_MAP_GAME_WIDTH}
          className="bg-orange-300"
        ></canvas>
      </div>
      <div className="overflow-y-hidden overflow-x-hidden">
        <canvas ref={canvasRef} className="bg-slate-500"></canvas>
      </div>
    </div>
  );
};

export default WorldSnake;
