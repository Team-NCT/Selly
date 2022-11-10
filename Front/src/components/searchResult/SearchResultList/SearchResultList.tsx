import { useEffect, useState } from "react";
import { SearchResultProps } from "./SearchResultList.types";
import style from "./SearchResultList.module.scss";
import { DescCardList } from "@/components/common";
import { sortSearchArticleResult } from "@/helpers/service/sortSearchResult";
import { SearchArticleType } from "@/types/search.type";
import { useInfiniteScroll } from "@/hooks";

const SIZE = 12;

const SearchResultList = ({ data }: SearchResultProps) => {
  const [sortedData, setSortedData] = useState<SearchArticleType[]>([]);
  const [fetchStatus, setFetStatus] = useState(false);
  const [currentData, setCurrentData] = useState<SearchArticleType[]>([]);
  const [page, setPage] = useState(1);

  //* 인피니티 스크롤 연결
  useInfiniteScroll(() => setPage((prev) => prev + 1));

  //* title 길이 순으로 정렬
  useEffect(() => {
    const sortedData = sortSearchArticleResult(data);
    setSortedData([...sortedData]);
    setFetStatus(true);
  }, [data]);

  //* 페이지가 증가하면 데이터를 더 불러온다
  useEffect(() => {
    const currentPage = page * SIZE;
    const searchResultData = sortedData.slice(0, currentPage);
    setCurrentData([...searchResultData]);
  }, [page, sortedData]);

  return (
    <>
      {fetchStatus && sortedData.length > 0 && <DescCardList data={currentData} />}
      {fetchStatus && sortedData.length <= 0 && (
        <div className={style.search_result_list_null}>검색 결과가 없습니다</div>
      )}
    </>
  );
};

export default SearchResultList;
