import { CardProps } from "./Card.types";
import style from "./Card.module.scss";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const Card = ({ articleImgUrl, articleName, presentSalePieceCnt }: CardProps) => {
  let supplyCount;
  if (typeof presentSalePieceCnt == "number") {
    supplyCount = numberAddComma(presentSalePieceCnt);
  }
  return (
    <div className={style.card}>
      <figure>
        <img src={articleImgUrl} alt={articleName}></img>
      </figure>
      <div>
        <p className={style.card_title}>{articleName}</p>
        {typeof presentSalePieceCnt == "number" && (
          <p className={style.card_supply}>남은 조각: {supplyCount} 개</p>
        )}
      </div>
    </div>
  );
};

export default Card;
