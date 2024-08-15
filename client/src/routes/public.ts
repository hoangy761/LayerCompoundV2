import React from 'react';
import GameLayout from '~/layouts/GameLayout';
import Game from '~/pages/Game';
import Home from '~/pages/Home';
import Vault from '~/pages/Vault';
type route = {
  path: string;
  component: React.ComponentType;
  layout?: React.ElementType | null;
};
const publicRoutes: route[] = [
  { path: '/', component: Home },
  { path: '/*', component: Home },
  { path: '/vaults', component: Vault },
  { path: '/game', component: Game, layout: GameLayout },
];

export default publicRoutes;
