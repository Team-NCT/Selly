import { SearchResultList, Header } from "@/components/searchResult";
import { useLocation } from "react-router-dom";
import { useFetchSearchResultQuery } from "@/api/server/searchAPI";
import style from "./SearchResult.module.scss";

const SearchResult = () => {
  const location = useLocation();

  //* /search?keyword=검색 키워드 (현재 url에서 가져온다)
  const keyword = location.search.split("=")[1];

  //* 검색 키워드에 따라 데이터를 요청한다.
  const { data, isSuccess } = useFetchSearchResultQuery(decodeURI(keyword));

  return (
    <>
      {/* data fetch가 성공하면 컴포넌트를 로딩한다. */}
      {isSuccess && (
        <main className={style.search_result}>
          <Header keyword={decodeURI(keyword)}></Header>
          <SearchResultList data={data?.article} />
        </main>
      )}
    </>
  );
};

export default SearchResult;
