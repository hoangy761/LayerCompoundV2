/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';
import PageTitle from '~/components/PageTitle/PageTitle';
import snakeNFT from '~/contracts/SnakeNFT';

const Home = () => {
  // Lấy địa chỉ và ABI của hợp đồng
  const contractAddress = snakeNFT.address;
  const contractABI = snakeNFT.abi;

  return (
    <div>
      <PageTitle title="LayerC | Home" />
      <Navigate to="/game-v2" />
      {/* <p>Contract Address: {contractAddress}</p>
      <p>Check console for Contract ABI</p> */}
    </div>
  );
};

export default Home;
