import { SearchResultProps } from "./SearchResult.types";
import { SearchArticleResult, SearchUserResult } from "../";
import style from "./SearchResult.module.scss";
import { sortSearchArticleResult, sortSearchUserResult } from "@/helpers/service/sortSearchResult";

const SearchResult = ({ result, status }: SearchResultProps) => {
  const articleLen = result.article.length;
  const userLen = result.user.length;
  let articleResult;
  let userResult;

  if (articleLen) {
    articleResult = sortSearchArticleResult(result.article).slice(0, 4);
  }

  if (userLen) {
    userResult = sortSearchUserResult(result.user).slice(0, 4);
  }

  return (
    <dialog open={status} className={style.search_form_dialog}>
      {articleLen === 0 && userLen === 0 && <div>검색 결과가 없습니다</div>}
      {articleLen > 0 && (
        <ul>
          <h1>작품</h1>
          {articleResult?.map((item) => (
            <SearchArticleResult key={item.articleId} {...item} />
          ))}
        </ul>
      )}
      {userLen > 0 && (
        <ul>
          <h1>유저</h1>
          {userResult?.map((item) => (
            <SearchUserResult key={item.userId} {...item} />
          ))}
        </ul>
      )}
    </dialog>
  );
};

export default SearchResult;
