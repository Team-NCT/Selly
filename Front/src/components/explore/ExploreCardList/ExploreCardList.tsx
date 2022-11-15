import { useFetchNFTListQuery } from "@/api/server/exploreAPI/exploreAPI";
import { DescCardList, Spinner } from "@/components/common";
import { useEffect } from "react";
import { ExploreParamsType } from "./ExploreCardList.types";
import style from "./ExploreCardList.module.scss";
import { useNavigate } from "react-router-dom";

const CATEGORY = ["all", "digital", "analog", "photography"];
const SORT = ["asc", "desc"];
const ORDER = ["sellRegist", "price"];

const ExploreCardList = ({ category, sort, order }: ExploreParamsType) => {
  const { data } = useFetchNFTListQuery({ category, sort, order });
  const navigate = useNavigate();

  useEffect(() => {
    if (CATEGORY.includes(category) && SORT.includes(sort) && ORDER.includes(order)) return;
    navigate("/404");
  }, [category, navigate, order, sort]);

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
