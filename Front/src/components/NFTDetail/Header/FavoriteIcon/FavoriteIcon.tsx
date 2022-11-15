import style from "./FavoriteIcon.module.scss";
import { BookmarkAddIcon, BookmarkRemoveIcon } from "@/components/icon";
import { FavoriteIconProps } from "./FavoriteIcon.types";
const favoriteStatus = true;

const FavoriteIcon = ({ articleId, userId }: FavoriteIconProps) => {
  const handleButtonClick = () => {
    //TODO_YK: 즐겨찾기 로직 추가
  };
  return (
    <button className={style.button_icon_favorite} onClick={handleButtonClick}>
      {/* 즐겨 찾기 했을 때 */}
      {favoriteStatus && <BookmarkRemoveIcon />}

      {/* 즐겨 찾기 하지 않았을 때 */}
      {!favoriteStatus && <BookmarkAddIcon />}
    </button>
  );
};

export default FavoriteIcon;
