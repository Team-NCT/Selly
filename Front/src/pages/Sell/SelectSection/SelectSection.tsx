import React, { useEffect } from "react";
import { SelectCardList } from "@/components/Sell";
import style from "./SelectSection.module.scss";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { useAppSelector } from "@/hooks";

// TODO_YK: alchemy 깃헙에서 type 가져오기!!
function SelectSection({ datas }: any) {
  const NFTValue = useAppSelector(selectNFTValue);

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
      {datas ? <SelectCardList data={datas} defaultSelectedIdx={NFTValue.selectIdx} /> : <></>}
    </>
  );
}

export default SelectSection;
