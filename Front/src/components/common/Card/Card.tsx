import { CardProps } from "./Card.types";
import { useState } from "react";
import style from "./Card.module.scss";
import { numberAddComma } from "@/helpers/utils/numberConversion";
import sellyIcon from "@/assets/images/sellyLogo.svg";

const Card = ({ url, title, supply }: CardProps) => {
  const [errorStatus, setErrorStatus] = useState(true);

  let supplyCount;
  if (typeof supply == "number") {
    supplyCount = numberAddComma(supply);
  }

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = sellyIcon;
    setErrorStatus(false);
  };

  return (
    <div className={style.card}>
      <figure>
        <img
          src={!url ? sellyIcon : url}
          alt={title}
          onError={handleImgError}
          className={!url || !errorStatus ? style.error_image : ""}></img>
      </figure>
      <div>
        <p className={style.card_title}>{title}</p>
        {typeof supply == "number" && (
          <p className={style.card_supply}>남은 조각: {supplyCount} 개</p>
        )}
      </div>
    </div>
  );
};

export default Card;
