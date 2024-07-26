import Tippy from '@tippyjs/react';
import { ArrowDown01Icon, ArrowUp01Icon, Copy01Icon, Logout04Icon, Search01Icon, Wallet01Icon } from 'hugeicons-react';
import React, { useState } from 'react';
import Button from '~/components/Button';
import { useModalContext } from '~/hooks/Modal/useModalProvider';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';
import { formatAddress } from '~/utils';

const User = () => {
  const { openModal } = useModalContext();
  const { selectedAccount, disconnectWallet } = useWalletProvider();
  const [openTippy, setOpenTippy] = useState<boolean>(false);
  const handleOpenTippy = () => {
    setOpenTippy(!openTippy);
  };
  const handleCopyAdress = () => {
    if (selectedAccount) {
      navigator.clipboard.writeText(selectedAccount);
    }
  };
  return (
    <>
      {selectedAccount ? (
        <Tippy
          delay={0}
          visible={openTippy}
          interactive
          onClickOutside={() => setOpenTippy(false)}
          content={
            <div className="box rounded-md z-200 bg-white">
              <Button icon={<Copy01Icon />} white onClick={handleCopyAdress} className="bg-white-3 rounded-t-md">
                Copy address
              </Button>
              <Button icon={<Search01Icon />} white onClick={handleCopyAdress} large className="bg-white-3">
                View explorer
              </Button>
              <Button icon={<Logout04Icon />} white onClick={disconnectWallet} className="bg-white-3 rounded-b-md">
                Disconnected
              </Button>
            </div>
          }
        >
          <Button
            white
            icon={<Wallet01Icon />}
            iconRight={
              openTippy ? (
                <ArrowUp01Icon className="absolute right-1 top-1/4" />
              ) : (
                <ArrowDown01Icon className="absolute right-1 top-1/4" />
              )
            }
            onClick={handleOpenTippy}
            roundedMd
            className="relative"
          >
            {formatAddress(selectedAccount)}
          </Button>
        </Tippy>
      ) : (
        <Button white icon={<Wallet01Icon />} onClick={openModal} roundedMd>
          Connect wallet
        </Button>
      )}
    </>
  );
};

export default User;
