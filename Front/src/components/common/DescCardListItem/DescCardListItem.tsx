import style from "./DescCardListItem.module.scss";
import { DescCardListItemProps } from "./DescCardListItem.types";
import { DescCard } from "@/components/common";
import { Link } from "react-router-dom";

const DescCardListItem = ({
  articleImgUrl,
  articleName,
  recentMarketPrice,
  rateChange,
  articleId,
}: DescCardListItemProps) => {
  const href = `/detail/${articleId}`;
  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <DescCard
          articleImgUrl={articleImgUrl}
          articleName={articleName}
          recentMarketPrice={recentMarketPrice}
          rateChange={rateChange}
        />
      </Link>
    </li>
  );
};
export default DescCardListItem;
