import { Link } from "react-router-dom";
import { SearchUserType } from "@/types/search.type";
import { ProfileImage } from "@/components/common";
import style from "./SearchUserResult.module.scss";

const SearchUserResult = (props: SearchUserType) => {
  return (
    <li className={style.search_form_dialog_user}>
      <Link to={`/profile/${props.userId}`}>
        <ProfileImage size="xxs" profileStyle="square" url={props.image} />
        <p>{props.nickname}</p>
      </Link>
    </li>
  );
};

export default SearchUserResult;
