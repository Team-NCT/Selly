import { SearchResultProps } from "./SearchResult.types";
import { SearchArticleResult, SearchUserResult } from "../";
import style from "./SearchResult.module.scss";

const SearchResult = ({ result, status }: SearchResultProps) => {
  const articleLen = result.article.length;
  const userLen = result.user.length;

  return (
    <dialog open={status} className={style.search_form_dialog}>
      {articleLen === 0 && userLen === 0 && <div>검색 결과가 없습니다</div>}
      {userLen > 0 && (
        <ul>
          <h1>유저</h1>
          {result.user.map((item) => (
            <SearchUserResult key={item.userId} {...item} />
          ))}
        </ul>
      )}
      {articleLen > 0 && (
        <ul>
          <h1>작품</h1>
          {result.article.map((item) => (
            <SearchArticleResult key={item.articleId} {...item} />
          ))}
        </ul>
      )}
    </dialog>
  );
};

export default SearchResult;
