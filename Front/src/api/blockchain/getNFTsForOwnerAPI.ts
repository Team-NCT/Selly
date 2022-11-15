import { Network, Alchemy } from "alchemy-sdk";
import { ALECHMY_API_KEY } from "@/constants/blockchain";

const settings = {
  apiKey: ALECHMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const getNFTsForOwnerAPI = async (owner: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(owner);

  console.log("엔에프티", nfts);

  let ERC721datas = [];
  ERC721datas = nfts.ownedNfts.filter((nft) => {
    return nft.tokenType === "ERC721" && nft.title !== "";
  });

  console.log("필터링", ERC721datas);

  return ERC721datas;
};

export default getNFTsForOwnerAPI;
