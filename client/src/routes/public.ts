import React from 'react';
import GameLayout from '~/layouts/GameLayout';
import GameV2 from '~/pages/GameV2';
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
  { path: '/game', component: GameV2, layout: GameLayout },
];

export default publicRoutes;
