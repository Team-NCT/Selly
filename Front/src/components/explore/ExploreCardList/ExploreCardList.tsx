import { useFetchNFTListQuery } from "@/api/server/exploreAPI/exploreAPI";
import { DescCardList, Spinner } from "@/components/common";
import { useEffect, useState } from "react";
import { ExploreParamsType } from "./ExploreCardList.types";
import style from "./ExploreCardList.module.scss";
import { useNavigate } from "react-router-dom";
import { useInfiniteScroll } from "@/hooks";
import { NFTDescCardDataType } from "@/types/NFTData.types";

const CATEGORY = ["all", "digital", "analog", "photography"];
const SORT = ["asc", "desc"];
const ORDER = ["sellRegist", "price"];
const SIZE = 15;

const ExploreCardList = ({ category, sort, order }: ExploreParamsType) => {
  const { data, isLoading } = useFetchNFTListQuery({ category, sort, order });
  const [currentData, setCurrentData] = useState<NFTDescCardDataType[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //* 인피니티 스크롤 연결
  const { setIsFetching } = useInfiniteScroll(() => setPage((prev) => prev + 1));

  //* 페이지가 증가하면 데이터를 더 불러온다.
  useEffect(() => {
    setIsFetching(false);
    if (!data) return;
    const currentPage = page * SIZE;
    const exploreResultData = data.slice(0, currentPage);
    setCurrentData([...exploreResultData]);
  }, [data, page, setIsFetching]);

  useEffect(() => {
    if (CATEGORY.includes(category) && SORT.includes(sort) && ORDER.includes(order)) return;
    navigate("/404", { replace: false });
  }, [category, navigate, order, sort]);

  return (
    <section className={style.container}>
      {isLoading ? (
        <div className={style.loading}>
          <Spinner />
          Loading...
        </div>
      ) : currentData?.length === 0 ? (
        <div className={style.no_data}>현재 조건에 맞는 판매 등록된 NFT가 없어요!</div>
      ) : (
        <DescCardList data={currentData} />
      )}
    </section>
  );
};

export default ExploreCardList;
