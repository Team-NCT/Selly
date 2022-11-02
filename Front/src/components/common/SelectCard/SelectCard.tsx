import { Button } from "@/components/common/index";
import style from "./SelectCard.module.scss";
import { SelectCardProps } from "./SelectCard.types";

const SelectCard = ({ url, title }: SelectCardProps) => {
  return (
    <div className={style.card}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div className={style.card_content}>
        <p className={style.card_content_title}>{title}</p>
        <div className={style.card_content_desc}>
          <Button>Select</Button>
        </div>
      </div>
    </div>
  );
};
export default SelectCard;
