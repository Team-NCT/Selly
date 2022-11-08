import { FormEvent, useState, useCallback, useRef, useEffect } from "react";
import { SearchIcon } from "@/components/icon";
import { SearchResult } from "@/components/search";
import style from "./SearchInput.module.scss";
import { SearchResultType } from "@/types/search.type";
import { useInputState } from "@/hooks";
import { getViewportSize } from "@/helpers/utils/getViewportSize";

const result: SearchResultType = {
  user: [
    { userId: 1, nickname: "김김작가작가작가작가작가", img: "", certification: true },
    { userId: 2, nickname: "김김작가작가작가작가작가", img: "", certification: true },
    { userId: 3, nickname: "김김작가작가작가작가작가", img: "", certification: true },
    { userId: 4, nickname: "김김작가작가작가작가작가", img: "", certification: true },
  ],
  article: [
    {
      articleId: 1,
      articleName: "좀비와 함께 춤을",
      articleImgUrl:
        "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      recentMarketPrice: 0.0025,
    },

    {
      articleId: 2,
      articleName:
        "좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을",
      articleImgUrl:
        "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      recentMarketPrice: 0.0025,
    },
    {
      articleId: 3,
      articleName: "좀비와 함께 춤을",
      articleImgUrl:
        "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      recentMarketPrice: 0.0025,
    },
    {
      articleId: 4,
      articleName: "좀비와 함께 춤을",
      articleImgUrl:
        "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      recentMarketPrice: 0.0025,
    },
  ],
};
const SearchInput = () => {
  const [resultStatus, setResultStatus] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  //* 키워드 검색
  const requestSearchKeyword = useCallback(
    (value: string) => {
      if (getViewportSize().width < 1240) {
        alert("나 작아");
        return value;
      }
      setResultStatus(true);
      return value;
    },
    [setResultStatus]
  );
  const [value, handleValueChange] = useInputState("", requestSearchKeyword);

  //* 검색 제출
  const submitSearchForm = (event: FormEvent) => {
    event.preventDefault();
    console.dir(event);
    alert("검색");
  };

  const clickOutside = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (formRef.current && !formRef.current.contains(target as HTMLDivElement)) {
        setResultStatus(false);
      }
    },
    [setResultStatus]
  );

  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  });

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
      <SearchResult status={resultStatus} result={result} />
    </form>
  );
};

export default SearchInput;
