import style from "./FavoriteIcon.module.scss";
import { FavoriteIconProps } from "./FavoriteIcon.types";

const FavoriteIcon = ({ favoriteStatus }: FavoriteIconProps) => {
  const handleButtonClick = () => {
    //TODO_YK: 즐겨찾기 로직 추가
  };
  return (
    <button className={style.button_icon_favorite} onClick={handleButtonClick}>
      {/* 즐겨 찾기 했을 때 */}
      {favoriteStatus && <span className="material-icons-outlined">bookmark_remove</span>}

      {/* 즐겨 찾기 하지 않았을 때 */}
      {!favoriteStatus && <span className="material-icons-outlined">bookmark_add</span>}
    </button>
  );
};

export default FavoriteIcon;
