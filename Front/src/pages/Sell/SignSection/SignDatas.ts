import { testEventContract } from "@/api/blockchain";

//TODO_TK 실제 컨트랙트로 바꾸기
export const SIGN_DATAS = [
  {
    title: "금고 생성하기",
    desc: "NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성합니다.",
    signFunction: async () => {
      let response;
      try {
        response = await testEventContract.methods
          .addTokenId()
          .send({ from: window.ethereum.selectedAddress });
        console.log(response);
        return response.status;
      } catch (e) {
        return false;
      }
    },
  },
  {
    title: "금고 승인하기",
    desc: "생성된 금고가 당신의 NFT를 보관할 수 있도록 승인합니다.",
    signFunction: async () => {
      let response;
      try {
        response = await testEventContract.methods
          .addTokenId()
          .send({ from: window.ethereum.selectedAddress });
        console.log(response);
        return response.status;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  {
    title: "조각 생성하기",
    desc: "준비된 금고에 NFT를 옮기고 조각을 생성합니다.",
    signFunction: async () => {
      let response;
      try {
        response = await testEventContract.methods
          .addTokenId()
          .send({ from: window.ethereum.selectedAddress });
        console.log(response);
        return response.status;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  {
    title: "판매 등록하기",
    desc: "생성된 조각을 셀리에 판매 등록합니다.",
    signFunction: async () => {
      let response;
      try {
        response = await testEventContract.methods.currentTokenId().call();
        console.log(response);
        return response.status;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
];
