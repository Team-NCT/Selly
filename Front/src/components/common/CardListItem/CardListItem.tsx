import { CardListItemProps } from "./CardListItem.types";
import style from "./CardListItem.module.scss";
import { Card } from "@/components/common";
import { Link } from "react-router-dom";

const CardListItem = ({ url, title, id, supply }: CardListItemProps) => {
  //TODO_JK: 상세 페이지 링크가 나오면 href 수정 (id를 받아서 링크로 수정)
  const href = `/${id}`;

  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <Card title={title} url={url} supply={supply} />
      </Link>
    </li>
  );
};

export default CardListItem;
