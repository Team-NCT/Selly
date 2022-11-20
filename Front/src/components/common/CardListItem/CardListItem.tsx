import style from "./CardListItem.module.scss";
import { Card } from "@/components/common";
import { Link } from "react-router-dom";
import { NFTCardDataType } from "@/types/NFTData.types";

const CardListItem = ({
  articleId,
  articleImgUrl,
  articleName,
  presentSalePieceCnt,
}: NFTCardDataType) => {
  const href = `/detail/${articleId}`;

  return (
    <li className={style.card_list_item}>
      <Link to={href}>
        <Card
          articleName={articleName}
          articleImgUrl={articleImgUrl}
          presentSalePieceCnt={presentSalePieceCnt}
        />
      </Link>
    </li>
  );
};

export default CardListItem;
