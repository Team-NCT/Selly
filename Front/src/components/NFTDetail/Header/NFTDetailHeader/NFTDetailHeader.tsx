import { NFTDetailHeaderProps } from "./NFTDetailHeader.types";
import style from "./NFTDetailHeader.module.scss";
import { BackArrowIcon } from "@/components/icon";
import { FavoriteIcon, ShareIcon } from "../";

const NFTDetailHeader = ({ title, id, imageUrl, url, userId }: NFTDetailHeaderProps) => {
  return (
    <header className={style.NFT_detail_header}>
      <section>
        <div className={style.NFT_detail_header_image}>
          <h1>{title}</h1>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={style.NFT_detail_header_left_icon}>
          <BackArrowIcon />
        </div>
        <div className={style.NFT_detail_header_right_icon}>
          <FavoriteIcon articleId={id} userId={userId} />
          <ShareIcon id={id} title={title} imageUrl={imageUrl} url={url} />
        </div>
      </section>
    </header>
  );
};

export default NFTDetailHeader;
