import style from "./CollectedCardList.module.scss";
import { Card } from "@/components/common";

// TODO_YK: alchemy에서 type가져오기
interface CardListProps {
  data: any[];
}

const CollectedCardList = ({ data }: CardListProps) => {
  console.log(data);
  return (
    <ul className={style.card_list}>
      {data.map((item, idx) => (
        <Card key={idx} url={item.rawMetadata.image} title={item.title} />
      ))}
    </ul>
  );
};

export default CollectedCardList;
