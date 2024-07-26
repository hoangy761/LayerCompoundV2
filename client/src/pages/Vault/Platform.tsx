import React from 'react';

const Platform = () => {
  return (
    <div>
      <h1 className="text-lg md:text-2xl">Platform</h1>
      <div className="flex space-x-10">
        <div>
          <h6 className="text-white-1 text-sm md:text-base">Total value lock (TVL)</h6>
          <h3>$200,000,000.00</h3>
        </div>
        <div className="border border-white-1 "></div>
        <div>
          <h6 className="text-white-1 text-sm md:text-base">Vaults</h6>
          <h3>200</h3>
        </div>
      </div>
    </div>
  );
};

export default Platform;
