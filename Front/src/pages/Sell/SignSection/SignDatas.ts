import { testSign, makeVault, makeFraction, approveVault } from "@/api/blockchain";
import {} from "@/api/server";

//TODO_YK: 실제 컨트랙트로 바꾸기
//TODO_YK: 마지막 함수에서는 서버API 불러오고(서버에서 트랜잭션 만들어줘야함) redux에 selectedNFT 정보 reset
export const SIGN_DATAS = [
  {
    title: "금고 생성하기",
    desc: "NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성합니다.",
    signFunction: makeVault,
  },
  {
    title: "금고 승인하기",
    desc: "생성된 금고가 당신의 NFT를 보관할 수 있도록 승인합니다.",
    signFunction: approveVault,
  },
  {
    title: "조각 생성하기",
    desc: "준비된 금고에 NFT를 옮기고 조각을 생성합니다.",
    signFunction: makeFraction,
  },
  {
    title: "판매 등록하기",
    desc: "생성된 조각을 셀리에 판매 등록합니다.",
    signFunction: testSign,
  },
];
