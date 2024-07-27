import React from 'react';
import PageTitle from '~/components/PageTitle/PageTitle';
import WorldSnake from './WorldSnake';

const Game = () => {
  return (
    <div>
      <PageTitle title="LayerC | Game" />
      <WorldSnake />
    </div>
  );
};

export default Game;
