import { FormEvent, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./SearchInput.module.scss";
import { SearchIcon } from "@/components/icon";
import { SearchResult } from "@/components/search";
import { useInputState, useClickOutSide } from "@/hooks";
import { getViewportSize } from "@/helpers/utils/getViewportSize";
import { useLazyFetchSearchResultQuery } from "@/api/server/searchAPI";
import { SearchResultType } from "@/types/search.type";
import { LAPTOP } from "@/constants/size";

const SearchInput = () => {
  const [resultStatus, setResultStatus] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResultType>({ user: [], article: [] });
  const [value, handleValueChange, setValue] = useInputState("");
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchSearchResult] = useLazyFetchSearchResultQuery();

  //@ description:검색 결과를 반환하는 함수
  const requestSearchKeyword = useCallback(
    async (keyword: string) => {
      try {
        const { data } = await fetchSearchResult(keyword);
        if (!data) return;
        setSearchResult(data);
      } catch (err) {
        console.error(err);
      }
    },
    [fetchSearchResult]
  );

  //* 외부 클릭시, 검색 자동완성 다이얼로그가 사라진다.
  useClickOutSide(formRef, () => setResultStatus(false));

  //* 검색 결과 창으로 이동한다.
  const submitSearchForm = (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const submitValue = (target[0] as HTMLInputElement).value;
    navigate(`/search?keyword=${submitValue}`);
  };

  //* 페이지 이동 시, 검색 자동완성 다이얼로그가 사라진다.
  useEffect(() => {
    setResultStatus(false);
    setValue("");
  }, [location, setValue]);

  //* 자동완성 기능
  useEffect(() => {
    if (!value) {
      return;
    }
    if (getViewportSize().width < LAPTOP) {
      return;
    }
    const timer = setTimeout(() => {
      requestSearchKeyword(value);
      setResultStatus(true);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [value, requestSearchKeyword]);

  return (
    <form className={style.search_form} onSubmit={submitSearchForm} ref={formRef}>
      <input
        type="search"
        placeholder="작품, 작가명을 검색하세요"
        value={value}
        onChange={handleValueChange}
        maxLength={20}
      />
      <SearchIcon />
      <SearchResult status={resultStatus} result={searchResult} />
    </form>
  );
};

export default SearchInput;
