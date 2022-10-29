import { CardListProps } from "./CardList.types";
import style from "./CardList.module.scss";
import { CardListItem } from "@/components/common";

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className={style.card_list}>
      {data.map((item) => (
        <CardListItem
          key={item.id}
          id={item.id}
          url={item.url}
          title={item.title}
          supply={item.supply}
        />
      ))}
    </ul>
  );
};

export default CardList;
