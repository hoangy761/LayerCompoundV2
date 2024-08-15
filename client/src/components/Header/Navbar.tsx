import Tippy from '@tippyjs/react';
import {
  // AnalysisTextLinkIcon,
  // Bitcoin03Icon,
  // PromotionIcon,
  // DataRecoveryIcon,
  Cancel01Icon,
  GameboyIcon,
  Menu01Icon,
} from 'hugeicons-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button';
interface routeNav {
  to: string;
  icon: React.ReactNode;
  name: string;
}
const Navbar = () => {
  const routesNavbar: routeNav[] = [
    // { to: '/vaults', name: 'Vault', icon: <DataRecoveryIcon /> },
    // { to: '/dao', name: 'Dao', icon: <PromotionIcon /> },
    // { to: '/staking', name: 'Staking', icon: <Bitcoin03Icon /> },
    // { to: '/stats', name: 'Stats', icon: <AnalysisTextLinkIcon /> },
    // { to: '/game', name: 'Game', icon: <GameboyIcon /> },
    { to: '/game', name: 'Game', icon: <GameboyIcon /> },
  ];
  const path = useLocation();
  const [openTippy, setOpenTippy] = useState<boolean>(false);
  const handleOpenTippy = () => {
    setOpenTippy(!openTippy);
  };
  return (
    <div className="flex justify-end">
      <nav className="hidden md:flex items-center justify-around space-x-10 ">
        <Button icon={<img src="logo-text.svg" width={200} alt="logo" />} to="/"></Button>
        <ul className="flex justify-around  space-x-10">
          {routesNavbar.map((route, index) => (
            <li key={index}>
              <Button
                text
                to={route.to}
                icon={route.icon}
                className={`${path.pathname === route.to ? 'underline' : ''}  `}
              >
                {route.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="flex md:hidden items-center justify-start">
        <Tippy
          delay={0}
          visible={openTippy}
          interactive
          onClickOutside={() => setOpenTippy(false)}
          content={
            <div className="box rounded-md min-w-32 bg-white">
              {routesNavbar.map((route, index) => (
                <Button text white large className="bg-white-3 " key={index} icon={route.icon} to={route.to}>
                  {route.name}
                </Button>
              ))}
            </div>
          }
        >
          <Button
            icon={openTippy ? <Cancel01Icon /> : <Menu01Icon />}
            onClick={handleOpenTippy}
            roundedMd
            className="relative"
          ></Button>
        </Tippy>
      </nav>
    </div>
  );
};

export default Navbar;
