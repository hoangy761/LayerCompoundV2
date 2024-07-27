import React from 'react';
import Game from '~/pages/Game';
import Home from '~/pages/Home';
import Vault from '~/pages/Vault';
type route = {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType | null;
};
const publicRoutes: route[] = [
  { path: '/', component: Home },
  { path: '/*', component: Home },
  { path: '/vaults', component: Vault },
  { path: '/game', component: Game },
];

export default publicRoutes;
