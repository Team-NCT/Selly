import { useState } from "react";
import { NFTDetailHeaderProps } from "./NFTDetailHeader.types";
import style from "./NFTDetailHeader.module.scss";
import { BackArrowIcon } from "@/components/icon";
import { FavoriteIcon, ShareIcon } from "../";
import sellyIcon from "@/assets/images/sellyLogo.svg";

const NFTDetailHeader = ({ title, id, imageUrl, url, userId }: NFTDetailHeaderProps) => {
  const [errorStatus, setErrorStatus] = useState(true);

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = sellyIcon;
    setErrorStatus(false);
  };

  return (
    <header className={style.NFT_detail_header}>
      <section>
        <div className={style.NFT_detail_header_image}>
          <h1>{title}</h1>
          <img
            src={imageUrl}
            alt={title}
            onError={handleImgError}
            className={!imageUrl || !errorStatus ? style.error_image : ""}></img>
        </div>
        <div className={style.NFT_detail_header_left_icon}>
          <BackArrowIcon />
        </div>
        <div className={style.NFT_detail_header_right_icon}>
          {userId && <FavoriteIcon articleId={id} userId={userId} />}
          <ShareIcon id={id} title={title} imageUrl={imageUrl} url={url} />
        </div>
      </section>
    </header>
  );
};

export default NFTDetailHeader;
