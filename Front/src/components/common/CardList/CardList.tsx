import { CardListProps } from "./CardList.types";
import style from "./CardList.module.scss";
import { CardListItem } from "@/components/common";

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className={style.card_list}>
      {data.map((item) => (
        <CardListItem
          key={item.articleId}
          articleId={item.articleId}
          articleImgUrl={item.articleImgUrl}
          articleName={item.articleName}
          presentSalePieceCnt={item.presentSalePieceCnt}
        />
      ))}
    </ul>
  );
};

export default CardList;
