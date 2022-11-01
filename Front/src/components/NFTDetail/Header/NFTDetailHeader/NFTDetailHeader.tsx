import { NFTDetailHeaderProps } from "./NFTDetailHeader.types";
import style from "./NFTDetailHeader.module.scss";
import { BackArrowIcon, FavoriteIcon, ShareIcon } from "@/components";

const NFTDetailHeader = ({ title, imageUrl, favoriteStatus, url }: NFTDetailHeaderProps) => {
  return (
    <section className={style.NFT_detail_header}>
      <div className={style.NFT_detail_header_left_icon}>
        <BackArrowIcon />
      </div>
      <div className={style.NFT_detail_header_image}>
        <h1>{title}</h1>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={style.NFT_detail_header_right_icon}>
        <FavoriteIcon favoriteStatus={favoriteStatus} />
        <ShareIcon url={url} />
      </div>
    </section>
  );
};

export default NFTDetailHeader;
