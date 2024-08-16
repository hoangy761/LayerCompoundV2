/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { MINI_MAP_GAME_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { IDataRealTime, IPosition } from '../interfaces';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';
import { socket } from '~/services/socket';
import { Game } from '../objects';

interface WorldSnakeProps {
  setIsGameLive: (_parameter: boolean) => void;
  setIsMouseDown: (_parameter: boolean) => void;
  gameData: IDataRealTime | null;
  setAngle: (_prameter: number) => void;
}

const WorldSnake: React.FC<WorldSnakeProps> = ({ gameData, setAngle, setIsGameLive, setIsMouseDown }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefMiniMap = useRef<HTMLCanvasElement>(null);

  const { selectedAccount } = useWalletProvider();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasMiniMap = canvasRefMiniMap.current;
    const mySnake = gameData?.players.find((player) => player.id === selectedAccount);
    const otherSnakes = gameData?.players.filter((player) => player.id !== selectedAccount) || [];
    const foods = gameData?.foods || [];
    if (mySnake?.snake) {
      if (!mySnake?.snake.isAlive) {
        window.alert('You Die, New Game?');
        socket.emit('out_game', { roomId: '100', userId: selectedAccount });
        setIsGameLive(false);
      }
    }
    if (canvas && canvasMiniMap && gameData && mySnake) {
      const gameInstance = new Game(canvas, canvasMiniMap, foods, mySnake, otherSnakes);
      gameInstance.start();

      canvas.addEventListener('mousemove', (event: MouseEvent) => {
        const rect = canvas?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        processMouseMove({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      });

      canvas.addEventListener('mousedown', handleMouseDown.bind(this));
      canvas.addEventListener('mouseup', handleMouseUp.bind(this));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  document.addEventListener('keydown', handleKeyDown.bind(this));
  document.addEventListener('keyup', handleKeyUp.bind(this));

  function handleMouseDown() {
    setIsMouseDown(true);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      setIsMouseDown(true);
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      setIsMouseDown(false);
    }
  }

  function processMouseMove(mousePos: IPosition) {
    const angle = Math.atan2(mousePos.y - SCREEN_HEIGHT / 2, mousePos.x - SCREEN_WIDTH / 2);
    setAngle(angle);
  }

  return (
    <div className="relative">
      <div className="absolute z-50 right-0">
        <canvas ref={canvasRefMiniMap} width={MINI_MAP_GAME_WIDTH} height={MINI_MAP_GAME_WIDTH}></canvas>
      </div>
      <div className="overflow-y-hidden overflow-x-hidden">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default WorldSnake;
