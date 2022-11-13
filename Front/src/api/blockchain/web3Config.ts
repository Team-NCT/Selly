import Web3 from "web3";
import {
  TEST_EVENT_ABI,
  TEST_EVENT_CA,
  SELLY_ERC_721_ABI,
  SELLY_ERC_721_CA,
  F_NFT_FACTORY_ABI,
  F_NFT_FACTORY_CA,
  F_NFT_ABI,
  F_NFT_SALE_ABI,
} from "@/constants/blockchain";

export const web3 = new Web3(window.ethereum);

export const testEventContract = new web3.eth.Contract(TEST_EVENT_ABI, TEST_EVENT_CA);

export const sellyERC721Contract = (ca: string) => {
  console.log("???", ca);
  return new web3.eth.Contract(SELLY_ERC_721_ABI, ca);
};
export const F_NFTFactoryContract = new web3.eth.Contract(F_NFT_FACTORY_ABI, F_NFT_FACTORY_CA);

export const F_NFTContract = (ca: string) => {
  return new web3.eth.Contract(F_NFT_ABI, ca);
};

export const F_NFT_SaleContract = (ca: string) => {
  return new web3.eth.Contract(F_NFT_SALE_ABI, ca);
};
