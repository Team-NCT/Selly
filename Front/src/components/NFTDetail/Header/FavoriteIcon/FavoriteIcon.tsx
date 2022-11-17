import style from "./FavoriteIcon.module.scss";
import { BookmarkAddIcon, BookmarkRemoveIcon } from "@/components/icon";
import { FavoriteIconProps } from "./FavoriteIcon.types";
import {
  useBookmarkNFTMutation,
  useCancleBookmarkNFTMutation,
  useCheckBookmarkStatusQuery,
} from "@/api/server/bookmarkAPI";

const FavoriteIcon = ({ articleId, userId }: FavoriteIconProps) => {
  const { data, isLoading } = useCheckBookmarkStatusQuery({ articleId, userId });
  const [bookmark] = useBookmarkNFTMutation();
  const [cancleBookmark] = useCancleBookmarkNFTMutation();

  const handleButtonClick = () => {
    if (!data) {
      bookmark({ articleId, userId });
      return;
    }
    cancleBookmark({ articleId, userId });
  };
  return (
    <button className={style.button_icon_favorite} onClick={handleButtonClick}>
      {/* 즐겨 찾기 했을 때 */}
      {!isLoading && data && <BookmarkRemoveIcon />}

      {/* 즐겨 찾기 하지 않았을 때 */}
      {!isLoading && !data && <BookmarkAddIcon />}
    </button>
  );
};

export default FavoriteIcon;
