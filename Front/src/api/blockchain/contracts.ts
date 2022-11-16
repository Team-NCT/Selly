import { functionProps } from "@/components/Sell/SignBox/SignBox.types";
import { sellyERC721Contract, F_NFTFactoryContract, F_NFTContract } from "./web3Config";

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
    response = await sellyERC721Contract(CA)
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
