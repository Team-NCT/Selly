import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.SELLY_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const getNFTsForOwnerAPI = async (owner: string) => {
  //TODO_YK: 로그인된 유저 지갑주소로 인자 바꾸기
  //TODO_YK: api로 페이징 처리가 가능하나, ERC721로만 필터링 하는 로직 추가 필요...ㅠㅠ
  const nfts = await alchemy.nft.getNftsForOwner(
    (owner = "0x4863d935Ce84bafFb20C6739Ee404f4406CF2831")
    // { pageSize: 3 }
  );

  console.log("엔에프티", nfts);

  return nfts;
};

export default getNFTsForOwnerAPI;
