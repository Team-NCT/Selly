import { makeVault, makeFraction, approveVault } from "@/api/blockchain";
import Web3 from "web3";

import { AbiItem } from "web3-utils";

export const web3 = new Web3(window.ethereum);
export const TEST_EVENT_CA = "0x88e4e1454A2e09B43824e64724576417FBe76909";
export const TEST_EVENT_ABI: AbiItem[] = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "AddTokenId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CurrentTokenId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "TestCall",
    type: "event",
  },
  {
    inputs: [],
    name: "addTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const testEventContract = new web3.eth.Contract(TEST_EVENT_ABI, TEST_EVENT_CA);

const testSign = async () => {
  let response;
  try {
    response = await testEventContract.methods
      .addTokenId()
      .send({ from: window.ethereum.selectedAddress });
    console.log(response);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const SIGN_DATAS = [
  {
    title: "금고 생성하기",
    desc: "NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성합니다.",
    signFunction: makeVault,
    // signFunction: testSign,
  },
  {
    title: "금고 승인하기",
    desc: "생성된 금고가 당신의 NFT를 보관할 수 있도록 승인합니다.",
    signFunction: approveVault,
    // signFunction: testSign,
  },
  {
    title: "조각 생성하기",
    desc: "준비된 금고에 NFT를 옮기고 조각을 생성합니다.",
    signFunction: makeFraction,
    // signFunction: testSign,
  },
  {
    title: "판매 등록하기",
    desc: "생성된 조각을 셀리에 판매 등록합니다.",
    signFunction: null,
    // signFunction: testSign,
  },
];
