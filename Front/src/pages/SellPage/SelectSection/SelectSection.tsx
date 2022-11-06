import React, { useState, useEffect } from "react";
import { SelectCardList } from "@/components";
import style from "./SelectSection.module.scss";
import { getNFTsForOwnerAPI } from "@/api";

function SelectSection() {
  // TODO_YK: alchemy 깃헙에서 type 가져오기
  const [NFTdatas, setNFTdatas] = useState<any>("");

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

  return (
    <>
      <div className={style.step_title}>
        <h2>판매 정보 등록</h2>
        <p>{">"}</p>
        <h2>서명하기</h2>
      </div>
      <h3 className={style.desc}>판매할 NFT를 선택하고, 판매 정보를 입력해주세요.</h3>
      {NFTdatas ? <SelectCardList data={NFTdatas} /> : <></>}
    </>
  );
}

export default SelectSection;
