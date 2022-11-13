import { makeVault, makeFraction, approveVault } from "@/api/blockchain";
import { useSaleNFTMutation } from "@/api/server/saleNFTAPI";
import { functionProps } from "@/components/Sell/SignBox/SignBox.types";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

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
    signFunction: async ({
      CA,
      tokenId,
      num,
      articleName,
      F_NFTCA,
      userWallet,
      userId,
      metaDataUrl,
      articleUrl,
      category,
      price,
    }: functionProps) => {
      const [createSale] = useSaleNFTMutation();
      const body = {
        contractAccress: CA,
        ownershipContractAddress: F_NFTCA,
        tokenId: tokenId,
        seller: userId,
        pieceCnt: num,
        tradePrice: Number(price),
        category: category,
        wallet: userWallet,
        articleUrl,
        articleName,
        metaDataUrl,
      };
      const response = await createSale(body).unwrap();
      const payload = {
        nonce: response.nonce,
        to: response.to,
        from: response.from,
        data: response.data,
      };
      try {
        const sendRes = await web3.eth.sendTransaction(payload);
        console.log(sendRes);
        return sendRes.status;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
];
