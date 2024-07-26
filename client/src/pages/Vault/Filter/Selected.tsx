import Tippy from '@tippyjs/react';
import { ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';
import React, { useState } from 'react';
import Button from '~/components/Button';
import { Platform } from './Filter';
import CheckBox from './CheckBox';
interface Pros {
  title: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
  listValue: Platform[];
}
const Selected: React.FC<Pros> = ({ title, listValue, setValue }) => {
  const [openTippy, setOpenTippy] = useState<boolean>(false);
  const handleOpenTippy = () => {
    setOpenTippy(!openTippy);
  };
  const selectedNumber = listValue.filter((platform) => platform.checked).length;

  return (
    <div className="flex space-x-2 items-center">
      <label className="text-white-1 md:text-xl sm:text-xs">{title}</label>
      <Tippy
        delay={0}
        visible={openTippy}
        interactive
        onClickOutside={() => setOpenTippy(false)}
        content={
          <div className="box rounded-md bg-white-1 p-2 min-w-max grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {listValue.map((item) => (
              <CheckBox key={item.id} title={item.name} checked={item.checked} setChecked={() => setValue(item.id)} />
            ))}
          </div>
        }
      >
        <Button
          iconRight={openTippy ? <ArrowUp01Icon className="" /> : <ArrowDown01Icon className="" />}
          onClick={handleOpenTippy}
          roundedMd
          className="relative sm:text-sm md:text-base"
        >
          {selectedNumber !== 0 ? `Custom (${selectedNumber})` : 'Default'}
        </Button>
      </Tippy>
    </div>
  );
};

export default Selected;
