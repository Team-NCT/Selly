import { SearchIcon } from "@/components/icon";
import { FormEvent } from "react";
import style from "./SearchInput.module.scss";

const SearchInput = () => {
  const submitSearchForm = (event: FormEvent) => {
    event.preventDefault();
    alert("검색");
  };
  return (
    <form className={style.search_input} onSubmit={submitSearchForm}>
      <input type="search" placeholder="작품, 작가명을 검색하세요" />
      <SearchIcon />
    </form>
  );
};

export default SearchInput;
