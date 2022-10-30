import style from "./DescCard.module.scss";
import { DescCardProps } from "./DescCard.types";

const DescCard = ({ url, title, price, profit }: DescCardProps) => {
  return (
    <div className={style.card}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div className={style.card_content}>
        <p className={style.card_content_title}>{title}</p>
        <div className={style.card_content_desc}>
          <p>{price} ETH</p>
          {profit > 0 && <p className={style.red}> +{+profit.toFixed(2)}%</p>}
          {profit <= 0 && <p className={style.blue}> -{-profit.toFixed(2)}%</p>}
        </div>
      </div>
    </div>
  );
};
export default DescCard;
