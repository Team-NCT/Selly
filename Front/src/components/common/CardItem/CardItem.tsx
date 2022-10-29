import { CardItemProps } from "./CardItem.types";
import style from "./CardItem.module.scss";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const Card = ({ url, title, href, supply }: CardItemProps) => {
  let supplyCount;
  if (supply) {
    supplyCount = numberAddComma(supply);
  }
  return (
    <li className={style.card}>
      <a href={href}>
        <figure>
          <img src={url} alt={title}></img>
        </figure>
        <div>
          <h1>{title}</h1>
          {supply && <h2>남은 조각: {supplyCount} 개</h2>}
        </div>
      </a>
    </li>
  );
};

export default Card;
