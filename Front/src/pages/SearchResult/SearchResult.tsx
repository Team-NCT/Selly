import { SearchResultList, Header } from "@/components/searchResult";
import { useLocation } from "react-router-dom";
import { useFetchSearchResultQuery } from "@/api/server/searchAPI";
import style from "./SearchResult.module.scss";

const SearchResult = () => {
  const location = useLocation();

  //* /search?keyword=검색 키워드
  const keyword = location.search.split("=")[1];
  const { data, isSuccess } = useFetchSearchResultQuery(decodeURI(keyword));
  return (
    <>
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
