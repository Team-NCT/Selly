import { SearchIcon } from "@/components/icon";
import style from "./SearchInput.module.scss";

const SearchInput = () => {
  return (
    <div className={style.search_input}>
      <input type="text" placeholder="작품, 작가명을 검색하세요" />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
