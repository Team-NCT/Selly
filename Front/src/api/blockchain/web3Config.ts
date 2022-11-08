import Web3 from "web3";
import { TEST_EVENT_ABI, TEST_EVENT_CA } from "@/constants/blockchain";

export const web3 = new Web3(window.ethereum);

export const testEventContract = new web3.eth.Contract(TEST_EVENT_ABI, TEST_EVENT_CA);
