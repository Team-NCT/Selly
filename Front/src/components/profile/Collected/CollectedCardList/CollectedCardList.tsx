import style from "./CollectedCardList.module.scss";
import { Card } from "@/components/common";
import { CollectedNFTType } from "@/types/NFTData.types";

interface CardListProps {
  data: CollectedNFTType[];
}
const CollectedCardList = ({ data }: CardListProps) => {
  console.log(data);
  return (
    <ul className={style.card_list}>
      {data.map((item, idx) => (
        <Card key={idx} articleImgUrl={item.articleImgUrl} articleName={item.articleName} />
      ))}
    </ul>
  );
};

export default CollectedCardList;
