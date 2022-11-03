import style from "./DescCardListItem.module.scss";
import { DescCardListItemProps } from "./DescCardListItem.types";
import { DescCard } from "@/components/common";
import { Link } from "react-router-dom";

const DescCardListItem = ({ url, title, price, profit, id }: DescCardListItemProps) => {
  //TODO_JK: 상세 페이지 링크가 나오면 href 수정 (id를 받아서 링크로 수정)
  const href = `/${id}`;
  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <DescCard url={url} title={title} price={price} profit={profit} />
      </Link>
    </li>
  );
};
export default DescCardListItem;
