import { Network, Alchemy } from "alchemy-sdk";
import { ALECHMY_API_KEY, SELLY_ERC_721_CA } from "@/constants/blockchain";
import { CollectedNFTType } from "@/types/NFTData.types";

const settings = {
  apiKey: ALECHMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const getNFTsForOwnerAPI = async (owner: string) => {
  try {
    const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner);
    console.log("엔에프티", ownedNfts);

    const ERC721datas = [];
    for (let i = 0; i < ownedNfts.length; i++) {
      if (
        ownedNfts[i].contract.address.toUpperCase() !== SELLY_ERC_721_CA?.toUpperCase() &&
        ownedNfts[i].title !== "" &&
        ownedNfts[i].tokenType === "ERC721"
      ) {
        const NFTInfo: CollectedNFTType = {
          CA: ownedNfts[i].contract.address,
          tokenId: ownedNfts[i].tokenId,
          metaDataUrl: ownedNfts[i].tokenUri?.gateway,
          articleName: ownedNfts[i].title,
          articleImgUrl: ownedNfts[i].rawMetadata?.image,
        };

        ERC721datas.push(NFTInfo);
      }
    }
    console.log("필터링", ERC721datas);

    return ERC721datas;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getNFTsForOwnerAPI;
