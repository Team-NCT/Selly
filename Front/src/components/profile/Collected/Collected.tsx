import { useState, useEffect } from "react";
import { CollectedCardList } from "./CollectedCardList";
import { getNFTsForOwnerAPI } from "@/api/blockchain";

const Collected = () => {
  const [NFTdatas, setNFTdatas] = useState<any>("");

  // TODO_YK: 프로필 유저 아이디로 인자 넣어주기
  const getOwnERC721NFTs = async () => {
    const { ownedNfts } = await getNFTsForOwnerAPI("sss");
    let datas = [];
    datas = ownedNfts.filter((nft) => {
      return nft.tokenType === "ERC721";
    });
    console.log(datas);
    setNFTdatas(datas);
  };

  useEffect(() => {
    getOwnERC721NFTs();
  }, []);

  return <>{NFTdatas ? <CollectedCardList data={NFTdatas} /> : <></>}</>;
};

export default Collected;
