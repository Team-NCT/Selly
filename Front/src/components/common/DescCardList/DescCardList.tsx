import { DescCardListProps } from "./DescCardList.types";
import { DescCardListItem } from "@/components/common";
import style from "./DescCardList.module.scss";

const DescCardList = ({ data }: DescCardListProps) => {
  return (
    <ul className={style.card_list}>
      {data.map((item) => (
        <DescCardListItem
          key={item.articleId}
          articleId={item.articleId}
          articleImgUrl={item.articleImgUrl}
          articleName={item.articleName}
          recentMarketPrice={item.recentMarketPrice}
          rateChange={item.rateChange}
          pieceCnt={item.pieceCnt}
        />
      ))}
    </ul>
  );
};
export default DescCardList;
