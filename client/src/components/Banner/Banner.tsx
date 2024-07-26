import React, { useState } from 'react';
import Button from '../Button';
import { Cancel01Icon } from 'hugeicons-react';

const Banner = () => {
  const [closeBanner, setCloseBanner] = useState<boolean>(false);
  return (
    <>
      {!closeBanner && (
        <div className="w-full ">
          <div className="flex justify-between bg-black-2">
            <div className="text-center flex-1">
              <p className="py-1 text-sm md:text-lg">
                The first Yield Farming Optimizer on U2U. Please DYOR before participating with LayerCompound!
              </p>
            </div>
            <Button icon={<Cancel01Icon />} className="text-white-3" onClick={() => setCloseBanner(true)}></Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
