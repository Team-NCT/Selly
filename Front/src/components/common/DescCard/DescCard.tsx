import style from "./DescCard.module.scss";
import { useState } from "react";
import { DescCardProps } from "./DescCard.types";
import sellyIcon from "@/assets/images/sellyLogo.svg";

const DescCard = ({ articleImgUrl, articleName, recentMarketPrice, rateChange }: DescCardProps) => {
  const [errorStatus, setErrorStatus] = useState(true);

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = sellyIcon;
    setErrorStatus(false);
  };

  return (
    <div className={style.card}>
      <figure>
        <img
          src={!articleImgUrl ? sellyIcon : articleImgUrl}
          alt={articleName}
          onError={handleImgError}
          className={!articleImgUrl || !errorStatus ? style.error_image : ""}></img>
      </figure>
      <div className={style.card_content}>
        <p className={style.card_content_title}>{articleName}</p>
        <div className={style.card_content_desc}>
          <p>{recentMarketPrice ? recentMarketPrice + "ETH" : "-"}</p>
          {rateChange && rateChange >= 0 && (
            <p className={style.red}> +{+rateChange.toFixed(2)}%</p>
          )}
          {rateChange && rateChange < 0 && (
            <p className={style.blue}> -{-rateChange.toFixed(2)}%</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default DescCard;
