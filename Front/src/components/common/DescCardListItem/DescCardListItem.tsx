import style from "./DescCardListItem.module.scss";
import { DescCardListItemProps } from "./DescCardListItem.types";
import { DescCard } from "@/components/common";
import { Link } from "react-router-dom";

const DescCardListItem = ({ url, title, price, profit, id }: DescCardListItemProps) => {
  const href = `/detail/${id}`;
  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <DescCard url={url} title={title} price={price} profit={profit} />
      </Link>
    </li>
  );
};
export default DescCardListItem;
