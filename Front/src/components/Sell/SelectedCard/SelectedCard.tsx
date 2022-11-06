import { SelectedCardProps } from "./SelectedCard.types";
import style from "./SelectedCard.module.scss";
import { Card } from "@/components";

const SelectedCard = ({ url, title }: SelectedCardProps) => {
  return <Card url={url} title={title}></Card>;
};
export default SelectedCard;
