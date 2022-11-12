import {
  testEventContract,
  sellyERC721Contract,
  F_NFTFactoryContract,
  F_NFTContract,
  F_NFT_SaleContract,
} from "./web3Config";
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

export const makeVault = async ({ CA, tokenId, num, articleName, code, setValue }: any) => {
  let response;
  try {
    response = await F_NFTFactoryContract.methods
      .Fractionalize(CA, parseInt(tokenId), parseInt(num), articleName, code)
      .send({ from: window.ethereum.selectedAddress });
    console.log(response);
    setValue(response.events.FractionalizeNFT.returnValues.F_CA);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const approveVault = async ({ CA, F_NFTCA }: any) => {
  let response;
  console.log("ddd", CA);
  try {
    response = await sellyERC721Contract(CA)
      .methods.setApprovalForAll(F_NFTCA, true)
      .send({ from: window.ethereum.selectedAddress });
    console.log(response);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const makeFraction = async ({ F_NFTCA }: any) => {
  let response;
  try {
    response = await F_NFTContract(F_NFTCA)
      .methods.initialize()
      .send({ from: window.ethereum.selectedAddress });
    console.log(response);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};
