import style from "./Fractions.module.scss";
import { DescCardList, Spinner } from "@/components/common";
import { useFetchFractionsDataQuery } from "@/api/server/NFTTransactionAPI";
import { useParams } from "react-router-dom";
import { useInfiniteScroll } from "@/hooks";
import { useState, useEffect } from "react";
import { NFTDescCardDataType } from "@/types/NFTData.types";

const FETCH_SIZE = 15;

const Fractions = () => {
  const { setIsFetching, setIsFinished } = useInfiniteScroll(fetchMoreItems);
  const params = useParams();
  const { data, isSuccess } = useFetchFractionsDataQuery(Number(params.id));

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<NFTDescCardDataType[]>([]);

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
  }, [data, setIsFinished]);

  return (
    <section className={style.fractions_section}>
      {isSuccess ? (
        data.length !== 0 ? (
          <DescCardList data={items} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 소유 중인 NFT 조각이 없습니다</p>
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

export default Fractions;
