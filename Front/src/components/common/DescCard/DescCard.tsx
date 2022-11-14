import style from "./DescCard.module.scss";
import { DescCardProps } from "./DescCard.types";

const DescCard = ({
  articleImgUrl,
  articleName,
  recentMarketPrice,
  rateChange,
  pieceCnt,
}: DescCardProps) => {
  return (
    <div className={style.card}>
      <figure>
        <img src={articleImgUrl} alt={articleName}></img>
      </figure>
      <div className={style.card_content}>
        <p className={style.card_content_title}>{articleName}</p>
        <div className={style.card_content_desc}>
          <p>{recentMarketPrice ? recentMarketPrice + "ETH" : "-"}</p>
          {rateChange && rateChange >= 0 && (
            <p className={style.red}> +{Number(rateChange).toFixed(2)}%</p>
          )}
          {rateChange && rateChange < 0 && (
            <p className={style.blue}> -{Number(rateChange).toFixed(2)}%</p>
          )}
        </div>
        {pieceCnt && <p className={style.card_content_piece}>{pieceCnt} 조각</p>}
      </div>
    </div>
  );
};
export default DescCard;
