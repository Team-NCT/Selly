import { web3, testEventAbi, testEventCA } from "@/api/blockchain/web3Config";

export const testEventContract = new web3.eth.Contract(testEventAbi, testEventCA);
