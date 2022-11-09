import { CardListItemProps } from "./CardListItem.types";
import style from "./CardListItem.module.scss";
import { Card } from "@/components/common";
import { Link } from "react-router-dom";

const CardListItem = ({ url, title, id, supply }: CardListItemProps) => {
  const href = `/detail/${id}`;

  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <Card title={title} url={url} supply={supply} />
      </Link>
    </li>
  );
};

export default CardListItem;
