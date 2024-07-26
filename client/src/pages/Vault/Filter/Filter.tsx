import React, { useState } from 'react';
import CheckBox from './CheckBox';
import Selected from './Selected';
import Button from '~/components/Button';

export interface Platform {
  id: string;
  name: string;
  checked: boolean;
}
const Filter = () => {
  const [depositVaults, setDepositVaults] = useState<boolean>(false);
  const [zeroBalance, setZeroBalance] = useState<boolean>(false);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: '111', name: 'Uniswap', checked: false },
    { id: '112', name: 'PancakeSwap', checked: false },
    { id: '113', name: 'SushiSwap', checked: false },
    { id: '114', name: 'GMX', checked: false },
    { id: '115', name: 'Kaidex', checked: false },
    { id: '116', name: 'Exodex', checked: false },
  ]);
  const [assets, setAssets] = useState<Platform[]>([
    { id: '111', name: 'ETHUSDC', checked: false },
    { id: '112', name: 'BNBUSDC', checked: false },
    { id: '113', name: 'SOLUSDC', checked: false },
    { id: '114', name: 'ADAUSDC', checked: false },
    { id: '115', name: 'XAIUSDC', checked: false },
    { id: '116', name: 'ZROUSDC', checked: false },
  ]);
  const handleSetValuePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      }),
    );
  };
  const handleSetValueAsset = (id: string) => {
    setAssets((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      }),
    );
  };
  const handleReset = () => {
    setPlatforms((prev) =>
      prev.map((item) => {
        return { ...item, checked: false };
      }),
    );
    setAssets((prev) =>
      prev.map((item) => {
        return { ...item, checked: false };
      }),
    );
  };

  return (
    <div>
      <div className="flex space-x-4">
        <CheckBox title="Deposited Vaults" checked={depositVaults} setChecked={setDepositVaults} />
        <CheckBox title="Hide Zero Balances" checked={zeroBalance} setChecked={setZeroBalance} />
      </div>
      <div className="flex space-x-1 justify-between flex-wrap">
        <Selected title="Platform:" setValue={handleSetValuePlatform} listValue={platforms} />
        <Selected title="Asset:" setValue={handleSetValueAsset} listValue={assets} />
        <Button text className="!p-0 !m-0" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Filter;
