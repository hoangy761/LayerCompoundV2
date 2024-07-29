import React from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import WorldSnake from './components/WorldSnake';
import LeaderBoard from './components/LeaderBoard';

const Game = () => {
  return (
    <div className="relative">
      <PageTitle title="LayerC | Game" />
      <div className="absolute z-40">
        <LeaderBoard />
      </div>
      <WorldSnake />
    </div>
  );
};

export default Game;
