import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const INFURA_API_KEY = "c99fc56f661141508c2f4f39fd6754b9";
const SEPOLIA_PRIVATE_KEY =
  "9d1f87100b710371fcf1cb9aa4de9653d45c8b962e62d9a55c2ff5908a51eb51";
const BSCSCAN_API_KEY = "HY3M992BZEZNWEZW9DSQGHPH4JZBPYHXW5";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 97, // BSC Testnet chainId
    },
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
};

export default config;
