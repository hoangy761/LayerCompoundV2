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

  console.log('Contract Address:', contractAddress);
  console.log('Contract ABI:', contractABI);

  return (
    <div>
      <PageTitle title="LayerC | Home" />
      <Navigate to="/game" />
      {/* <p>Contract Address: {contractAddress}</p>
      <p>Check console for Contract ABI</p> */}
      <p>HÈ Lố</p>
    </div>
  );
};

export default Home;
