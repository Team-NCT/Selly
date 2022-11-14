import React, { useEffect, useState } from "react";
import { SelectCardList, SellInfoForm, SelectedCard } from "@/components/sell";
import style from "./SelectSection.module.scss";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { useAppSelector, useInfiniteScroll } from "@/hooks";
import { UpArrowIcon } from "@/components/icon";

const FETCH_SIZE = 3;

// TODO_YK: alchemy 깃헙에서 type 가져오기!!
function SelectSection({ datas, changeStep }: any) {
  const NFTValue = useAppSelector(selectNFTValue);
  const [items, setItems] = useState<Array<any>>([]);
  const { isFetching, setIsFetching, setIsFinished } = useInfiniteScroll(fetchMoreItems);
  const [page, setPage] = useState(1);

  function fetchMoreItems() {
    if (!datas) {
      setIsFetching(false);
      return;
    }
    const nextDatas = datas.slice((page - 1) * FETCH_SIZE, page * FETCH_SIZE);
    if (page * FETCH_SIZE >= datas.length) {
      setIsFinished(true);
    }
    setItems((pre) => [...pre, ...nextDatas]);
    setPage((pre) => pre + 1);
    setIsFetching(false);
  }

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  //* 처음 datas에서 초기값 받아오기
  useEffect(() => {
    if (!datas) return;
    const nextDatas = datas.slice((page - 1) * FETCH_SIZE, page * FETCH_SIZE);
    if (page * FETCH_SIZE >= datas.length) {
      setIsFinished(true);
    }
    setItems((pre) => [...pre, ...nextDatas]);
    setPage((pre) => pre + 1);
  }, [datas]);

  useEffect(() => {
    console.log("ffff", items);
  }, [items]);

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
      <section className={style.content}>
        <div className={style.select_card_list}>
          {items.length !== 0 ? (
            <SelectCardList data={items} defaultSelectedIdx={NFTValue.selectIdx} />
          ) : (
            <div></div>
          )}
        </div>
        <div className={style.sell_info}>
          <SellInfoForm changeStep={changeStep} />
        </div>
      </section>
      <button className={style.scroll_up_icon} onClick={scrollUp}>
        <UpArrowIcon />
      </button>
    </>
  );
}

export default SelectSection;
