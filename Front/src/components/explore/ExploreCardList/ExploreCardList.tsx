import { useLazyFetchNFTListQuery } from "@/api/server/exploreAPI/exploreAPI";
import { DescCardList } from "@/components/common";
import { useCallback, useEffect, useState } from "react";
import { ExploreParamsType } from "./ExploreCardList.types";
import style from "./ExploreCardList.module.scss";
import { NFTDescCardDataType } from "@/types/NFTData.types";

const ExploreCardList = ({ category, sort, order }: ExploreParamsType) => {
  const [fetchNFTList] = useLazyFetchNFTListQuery();

  //* fetch된 cardlist data를 저장하는 변수
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<NFTDescCardDataType[]>([]);

  //@ description: cardList를 반환하는 함수
  const requestSortNFTList = useCallback(
    async (params: ExploreParamsType) => {
      try {
        const { data } = await fetchNFTList(params);
        if (!data) return;
        setData(data);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        console.error(err);
        //@ TodoJY: 404 페이지로 이동
      }
    },
    [fetchNFTList]
  );

  useEffect(() => {
    console.log("따란");
    requestSortNFTList({ category, sort, order });
  }, [category, order, requestSortNFTList, sort]);

  return (
    <section className={style.container}>
      {isLoading ? (
        "loading"
      ) : data.length === 0 ? (
        <div className={style.no_data}>현재 조건에 맞는 판매 등록된 NFT가 없어요!</div>
      ) : (
        <DescCardList data={data} />
      )}
    </section>
  );
};

export default ExploreCardList;
