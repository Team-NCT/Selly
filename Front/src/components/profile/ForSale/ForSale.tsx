import style from "./ForSale.module.scss";
import { CardList, Spinner } from "@/components/common";
import { useFetchForSaleDataQuery } from "@/api/server/NFTTransactionAPI";
import { useParams } from "react-router-dom";
import { CardType } from "@/types/NFTData.types";
import { useInfiniteScroll } from "@/hooks";
import { useState, useEffect } from "react";

const FETCH_SIZE = 15;

const ForSale = () => {
  const { isFetching, setIsFetching, setIsFinished } = useInfiniteScroll(fetchMoreItems);
  const params = useParams();
  const { data, isError, isSuccess } = useFetchForSaleDataQuery(Number(params.id));

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<CardType[]>([]);

  function fetchMoreItems() {
    if (!data) {
      setIsFetching(false);
      return;
    }
    const nextDatas = data.slice((page - 1) * FETCH_SIZE, page * FETCH_SIZE);
    if (page * FETCH_SIZE >= data.length) {
      setIsFinished(true);
    }
    setItems((pre) => [...pre, ...nextDatas]);
    setPage((pre) => pre + 1);
    setIsFetching(false);
  }

  //* 처음 datas에서 초기값 받아오기
  useEffect(() => {
    if (!data) return;
    setIsFinished(false);
    const nextDatas = data.slice(0, FETCH_SIZE);
    if (FETCH_SIZE >= data.length) {
      setIsFinished(true);
    }
    setItems([...nextDatas]);
    setPage(2);
  }, [data]);

  if (isError) {
    return (
      <section className={style.forsale_section}>
        <div className={style.nft_none}>
          <p>에러가 발생했습니다 </p>
          <p> (っ °Д °;)っ </p>
        </div>
      </section>
    );
  }

  return (
    <section className={style.forsale_section}>
      {isSuccess ? (
        data.length !== 0 ? (
          <CardList data={items} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 조각 판매 중인 NFT가 없습니다</p>
            <p>(っ °Д °;)っ</p>
          </div>
        )
      ) : (
        <div className={style.spinner}>
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default ForSale;
