import React from 'react';
import Navbar from './Navbar';
import User from './User';

const Header = () => {
  return (
    <div className="w-full sticky top-0 bg-black/50 backdrop-blur-md">
      <div className="flex justify-between container mx-auto p-2">
        <Navbar />
        <User />
      </div>
    </div>
  );
};
export default Header;
