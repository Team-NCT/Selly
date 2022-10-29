import { CardListItemProps } from "./CardListItem.types";
import style from "./CardListItem.module.scss";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const CardListItem = ({ url, title, href, supply }: CardListItemProps) => {
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
          <p>{title}</p>
          {supply && <p>남은 조각: {supplyCount} 개</p>}
        </div>
      </a>
    </li>
  );
};

export default CardListItem;
