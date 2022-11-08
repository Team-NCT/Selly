import React, { useState, useEffect } from "react";
import { SelectCardList } from "@/components/Sell";
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
    //* 다음 step으로 넘어갈 시 스크롤 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.step_title}>
          <h3 className={style.step_sell}>판매 정보 등록</h3>
          <div className={style.step_arrow}></div>
          <h3 className={style.step_sign}>서명하기</h3>
        </div>
        <h3 className={style.desc}>판매할 NFT를 선택하고, 판매 정보를 입력해주세요.</h3>
      </header>
      {NFTdatas ? <SelectCardList data={NFTdatas} /> : <></>}
    </>
  );
}

export default SelectSection;
