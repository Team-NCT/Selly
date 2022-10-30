import { DescCardListProps } from "./DescCardList.types";
import { DescCardListItem } from "@/components/common";
import style from "./DescCardList.module.scss";

const DescCardList = ({ data }: DescCardListProps) => {
  return (
    <ul className={style.card_list}>
      {data.map((item) => (
        <DescCardListItem
          key={item.id}
          id={item.id}
          url={item.url}
          title={item.title}
          price={item.price}
          profit={item.profit}
        />
      ))}
    </ul>
  );
};
export default DescCardList;
