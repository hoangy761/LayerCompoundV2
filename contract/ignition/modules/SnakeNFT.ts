const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m: any) => {
  const token = m.contract("SnakeNFT");

  return { token };
});

module.exports = TokenModule;
