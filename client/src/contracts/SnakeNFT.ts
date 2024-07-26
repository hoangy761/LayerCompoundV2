import SnakeNFTContractAddress from '../../../contract/ignition/deployments/chain-97/deployed_addresses.json';
import SnakeNFTContractABI from '../../../contract/ignition/deployments/chain-97/artifacts/TokenModule_SnakeNFT.json';

const snakeNFT = {
  address: SnakeNFTContractAddress['TokenModule#SnakeNFT'],
  abi: SnakeNFTContractABI.abi,
};

export default snakeNFT;
