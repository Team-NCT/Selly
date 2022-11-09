import React, { useState, useEffect, useCallback } from "react";
import { SelectCardList } from "@/components/Sell";
import style from "./SelectSection.module.scss";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { useAppSelector, useInfiniteScroll } from "@/hooks";

// TODO_YK: alchemy 깃헙에서 type 가져오기!!
function SelectSection({ datas }: any) {
  const NFTValue = useAppSelector(selectNFTValue);
  const [items, setItems] = useState([]);
  const [isUpdateList, setIsUpdateList] = useState(true);

  const updateFunctionOnScroll = useCallback(() => {
    console.log("???", datas.length);
    if (datas.length > 0) {
      console.log("????????");
      const data = [].concat(items, datas);
      setItems(data);
    }
  }, [datas]);

  const infinityScroll = () => {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    const paddingBottom = 200;

    if (currentScroll + windowHeight + paddingBottom >= bodyHeight) {
      console.log(items);
      if (isUpdateList) {
        setIsUpdateList(false);

        updateFunctionOnScroll();

        setIsUpdateList(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", infinityScroll);
    return () => {
      window.removeEventListener("scroll", infinityScroll);
    };
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
      {datas && items.length !== 0 ? (
        <SelectCardList data={items} defaultSelectedIdx={NFTValue.selectIdx} />
      ) : (
        <></>
      )}
    </>
  );
}

export default SelectSection;
