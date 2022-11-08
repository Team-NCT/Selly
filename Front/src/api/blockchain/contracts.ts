import { testEventContract } from "./web3Config";

/**
 * 서명 박스에서 사용할 테스트 컨트랙트 함수
 */
export const testSign = async () => {
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
