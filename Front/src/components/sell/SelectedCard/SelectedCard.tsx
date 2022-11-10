import { SelectedCardProps } from "./SelectedCard.types";
import style from "./SelectedCard.module.scss";
import { Card } from "@/components/common";

const SelectedCard = ({ url, title }: SelectedCardProps) => {
  return (
    <>
      {title ? (
        <Card url={url} title={title}></Card>
      ) : (
        <div className={style.emptyCard}>선택된 이미지가 없습니다</div>
      )}
    </>
  );
};

export default SelectedCard;
