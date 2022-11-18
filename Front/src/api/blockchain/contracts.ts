import { functionProps } from "@/components/sell/SignBox/SignBox.types";
import {
  sellyERC721Contract,
  ERC721Contract,
  F_NFTFactoryContract,
  F_NFTContract,
} from "./web3Config";
import { default as getNFTData } from "./getNFTData";
import { CollectedNFTType } from "@/types/NFTData.types";

export const getMySellyNfts = async ({ CA, userWallet }: { CA: string; userWallet: string }) => {
  const result = [];
  // TODO_YK: 컨트랙트에서 합쳐서 보내주는 함수 만들기
  try {
    const tokenURIs = await sellyERC721Contract.methods.tokenURIsofWallet(userWallet).call();
    const tokenIds = await sellyERC721Contract.methods.tokenIDsofWallet(userWallet).call();
    console.log(tokenURIs, tokenIds);
    for (let i = 0; i < tokenURIs.length; i++) {
      let metaData;
      const metadataURI = tokenURIs[i];
      try {
        metaData = await getNFTData(metadataURI);
        console.log("??", metaData);
        const NFTInfo: CollectedNFTType = {
          CA: CA,
          tokenId: tokenIds[i],
          metaDataUrl: metadataURI,
          articleName: metaData.name,
          articleImgUrl: metaData.image,
        };
        result.push(NFTInfo);
      } catch (error) {
        console.log(error);
      }
    }
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const makeVault = async ({
  CA,
  tokenId,
  num,
  articleName,
  code,
  setValue,
  userWallet,
}: functionProps) => {
  let response;
  try {
    response = await F_NFTFactoryContract.methods
      .Fractionalize(CA, parseInt(tokenId), parseInt(num), articleName, code)
      .send({ from: userWallet });
    console.log(response);

    response = await F_NFTFactoryContract.methods.CAOfNFTCAbyTokenId(CA, parseInt(tokenId)).call();
    console.log(response);

    setValue ? setValue(response) : null;
    if (response) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const approveVault = async ({ CA, F_NFTCA, userWallet }: functionProps) => {
  let response;
  console.log("ddd", CA);
  try {
    response = await ERC721Contract(CA)
      .methods.setApprovalForAll(F_NFTCA, true)
      .send({ from: userWallet });
    console.log(response);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const makeFraction = async ({ F_NFTCA, userWallet }: functionProps) => {
  let response;
  try {
    response = await F_NFTContract(F_NFTCA).methods.initialize().send({ from: userWallet });
    console.log(response);
    return response.status;
  } catch (e) {
    console.error(e);
    return false;
  }
};
