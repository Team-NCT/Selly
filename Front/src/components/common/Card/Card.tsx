import { CardProps } from "./Card.types";
import style from "./Card.module.scss";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const Card = ({ url, title, supply }: CardProps) => {
  let supplyCount;
  if (typeof supply == "number") {
    supplyCount = numberAddComma(supply);
  }
  return (
    <div className={style.card}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div>
        <p className={style.card_title}>{title}</p>
        {typeof supply == "number" && (
          <p className={style.card_supply}>남은 조각: {supplyCount} 개</p>
        )}
      </div>
    </div>
  );
};

export default Card;
