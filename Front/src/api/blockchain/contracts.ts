import { testEventAbi, testEventCA, web3 } from "@/api/blockchain/web3Config";

export const testEventContract = new web3.eth.Contract(testEventAbi, testEventCA);
