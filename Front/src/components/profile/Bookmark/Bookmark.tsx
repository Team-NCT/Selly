import style from "./Bookmark.module.scss";
import { CardList, Spinner } from "@/components/common";
import { useFetchBookmarkDataQuery } from "@/api/server/bookmarkAPI";
import { CardType } from "@/types/NFTData.types";
import { useParams } from "react-router-dom";
import { useInfiniteScroll } from "@/hooks";
import { useState, useEffect } from "react";

const FETCH_SIZE = 15;

const Bookmark = () => {
  const { isFetching, setIsFetching, setIsFinished } = useInfiniteScroll(fetchMoreItems);
  const params = useParams();
  const { data, isError, isSuccess } = useFetchBookmarkDataQuery(Number(params.id));

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
      <section className={style.bookmark_section}>
        <div className={style.nft_none}>
          <p>에러가 발생했습니다 </p>
          <p> (っ °Д °;)っ </p>
        </div>
      </section>
    );
  }

  return (
    <section className={style.bookmark_section}>
      {isSuccess ? (
        data.length !== 0 ? (
          <CardList data={items} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 즐겨찾기 중인 NFT가 없습니다</p>
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

export default Bookmark;
