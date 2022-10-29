import { CardListItemProps } from "./CardListItem.types";
import style from "./CardListItem.module.scss";
import { Card } from "@/components/common";

const CardListItem = ({ url, title, href, supply }: CardListItemProps) => {
  return (
    <li className={style.card_list_item}>
      <a href={href}>
        <Card title={title} url={url} supply={supply} />
      </a>
    </li>
  );
};

export default CardListItem;
