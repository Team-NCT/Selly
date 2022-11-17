import { CollectedProps } from "./Collected.types";
import { useState, useEffect } from "react";
import { CollectedCardList } from "./CollectedCardList";
import { getNFTsForOwnerAPI } from "@/api/blockchain";
import { useInfiniteScroll } from "@/hooks";
import { Spinner } from "@/components/common";
import style from "./Collected.module.scss";

const FETCH_SIZE = 15;

const Collected = ({ wallet }: CollectedProps) => {
  const [NFTdatas, setNFTdatas] = useState<any>(null);
  const { isFetching, setIsFetching, setIsFinished } = useInfiniteScroll(fetchMoreItems);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Array<any>>([]);

  const getOwnERC721NFTs = async () => {
    if (!wallet) return;
    const datas = await getNFTsForOwnerAPI(wallet);
    setNFTdatas(datas);
  };

  function fetchMoreItems() {
    if (!NFTdatas) {
      setIsFetching(false);
      return;
    }
    const nextDatas = NFTdatas.slice((page - 1) * FETCH_SIZE, page * FETCH_SIZE);
    if (page * FETCH_SIZE >= NFTdatas.length) {
      setIsFinished(true);
    }
    setItems((pre) => [...pre, ...nextDatas]);
    setPage((pre) => pre + 1);
    setIsFetching(false);
  }

  //* 처음 datas에서 초기값 받아오기 및 state 초기화
  useEffect(() => {
    if (!NFTdatas) return;
    setIsFinished(false);
    const nextDatas = NFTdatas.slice(0, FETCH_SIZE);
    if (FETCH_SIZE >= NFTdatas.length) {
      setIsFinished(true);
    }
    setItems([...nextDatas]);
    setPage(2);
  }, [NFTdatas]);

  useEffect(() => {
    getOwnERC721NFTs();
  }, [wallet]);

  return (
    <section className={style.collected_section}>
      {NFTdatas ? (
        items.length !== 0 ? (
          <CollectedCardList data={items} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 보유 중인 NFT가 없습니다</p>
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

export default Collected;
