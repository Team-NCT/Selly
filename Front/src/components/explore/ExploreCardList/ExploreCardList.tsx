import { useFetchNFTListQuery } from "@/api/server/exploreAPI/exploreAPI";
import { DescCardList, Spinner } from "@/components/common";
import { useEffect } from "react";
import { ExploreParamsType } from "./ExploreCardList.types";
import style from "./ExploreCardList.module.scss";

const ExploreCardList = ({ category, sort, order }: ExploreParamsType) => {
  const { data, isError } = useFetchNFTListQuery({ category, sort, order });

  useEffect(() => {
    if (!isError) return;
    alert("404로 이동"), [isError];
  }, [isError]);

  return (
    <section className={style.container}>
      {!data ? (
        <div className={style.loading}>
          <Spinner />
          Loading...
        </div>
      ) : data?.length === 0 ? (
        <div className={style.no_data}>현재 조건에 맞는 판매 등록된 NFT가 없어요!</div>
      ) : (
        <DescCardList data={data} />
      )}
    </section>
  );
};

export default ExploreCardList;
