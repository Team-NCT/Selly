import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.SELLY_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const getNFTsForOwnerAPI = async (owner: string) => {
  const nfts = await alchemy.nft.getNftsForOwner("0x4863d935Ce84bafFb20C6739Ee404f4406CF2831");

  return nfts;
};

export default getNFTsForOwnerAPI;
