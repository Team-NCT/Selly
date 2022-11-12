import { useState, useEffect } from "react";
import { CollectedCardList } from "./CollectedCardList";
import { getNFTsForOwnerAPI } from "@/api/blockchain";
import { selectAccount } from "@/store/loginSlice";
import { useAppSelector } from "@/hooks/useStore";

const Collected = () => {
  const [NFTdatas, setNFTdatas] = useState<any>("");
  const { account } = useAppSelector(selectAccount);

  // TODO_YK: 내 계정 말고 프로필 유저 아이디로 인자 넣어주기
  const getOwnERC721NFTs = async () => {
    if (!account.address) return;
    const { ownedNfts } = await getNFTsForOwnerAPI(account.address);
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

  // TODO_YK: 10개 받고, 데이터 없어도 밑에 공간 살려주기 / 로딩 스피너
  return <>{NFTdatas ? <CollectedCardList data={NFTdatas} /> : <></>}</>;
};

export default Collected;
