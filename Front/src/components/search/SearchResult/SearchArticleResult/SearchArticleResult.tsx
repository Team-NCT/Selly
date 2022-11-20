import { Link } from "react-router-dom";
import { SearchArticleType } from "@/types/search.type";
import { ProfileImage } from "@/components/common";
import style from "./SearchArticleResult.module.scss";

const SearchArticleResult = (props: SearchArticleType) => {
  return (
    <li className={style.search_form_dialog_article}>
      <Link to={`/detail/${props.articleId}`}>
        <div className={style.search_form_dialog_article_content}>
          <ProfileImage size="xxs" profileStyle="square" url={props.articleImgUrl} />
          <p className={style.search_form_dialog_article_name}>{props.articleName}</p>
        </div>
        <p>{props.recentMarketPrice ? props.recentMarketPrice + " ETH" : "-"}</p>
      </Link>
    </li>
  );
};

export default SearchArticleResult;
