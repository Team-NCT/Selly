import Web3 from "web3";
import {
  SELLY_ERC_721_ABI,
  SELLY_ERC_721_CA,
  F_NFT_FACTORY_ABI,
  F_NFT_FACTORY_CA,
  F_NFT_ABI,
  WEB3_INFURA_API_KEY,
} from "@/constants/blockchain";

export const InfuraWeb3 = new Web3(new Web3.providers.HttpProvider(WEB3_INFURA_API_KEY as string));
export const web3 = new Web3(window.ethereum);

export const sellyERC721Contract = new InfuraWeb3.eth.Contract(SELLY_ERC_721_ABI, SELLY_ERC_721_CA);

export const ERC721Contract = (ca: string) => {
  return new web3.eth.Contract(SELLY_ERC_721_ABI, ca);
};
export const F_NFTFactoryContract = new web3.eth.Contract(F_NFT_FACTORY_ABI, F_NFT_FACTORY_CA);

export const F_NFTContract = (ca: string) => {
  return new web3.eth.Contract(F_NFT_ABI, ca);
};
