import React, { useEffect, useState } from 'react';
import LeaderBoard from './LeaderBoard';
import WorldSnake from './WorldSnake';
import { IDataRealTime, IUserPoint } from '../interfaces';

interface IGamePlayPros {
  gameData: IDataRealTime | null;
  setAngle: (_prameter: number) => void;
}
const GamePlay: React.FC<IGamePlayPros> = ({ gameData, setAngle }) => {
  const [userPoints, setUserPoints] = useState<IUserPoint[] | null>(null);
  useEffect(() => {
    let dataPoints: IUserPoint[] = [];
    dataPoints =
      gameData?.players
        .filter((player) => player.snake.isAlive) // Filter first
        .map((player) => ({
          id: player.id,
          name: player.name,
          userScore: player.snake.tailPositions.length,
        })) || [];
    // Sort by userScore from high to low
    dataPoints.sort((a, b) => b.userScore - a.userScore);
    setUserPoints(dataPoints);
  }, [gameData]);
  return (
    <div className="relative">
      <div className="absolute z-40">
        <LeaderBoard userPoints={userPoints} />
      </div>
      <WorldSnake gameData={gameData} setAngle={setAngle} />
    </div>
  );
};

export default GamePlay;
