import { SelectCardProps } from "./SelectCard.types";
import style from "./SelectCard.module.scss";
import { Button } from "@/components";
import { useState, useCallback } from "react";
import { setNFTValue } from "@/store/selectNFTSlice";

const SelectCard = ({ url, title, isSelected, idx, setValue }: SelectCardProps) => {
  const [selectedText, setSelectedText] = useState("Selected");

  const buttonHover = useCallback(() => {
    setSelectedText("Remove");
  }, []);

  const buttonOut = useCallback(() => {
    setSelectedText("Selected");
  }, []);

  const onClickHandler = () => {
    if (isSelected) {
      setValue(-1);
    } else {
      setValue(idx);
    }
  };

  return (
    <div className={style.card}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div className={style.card_content}>
        <p className={style.card_content_title}>{title}</p>
        <div
          className={style.card_content_button}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonOut}>
          {isSelected ? (
            <Button bg="blackberry" color="outline" size="fillContainer" onClick={onClickHandler}>
              {selectedText}
            </Button>
          ) : (
            <Button bg="blackberry" color="white" size="fillContainer" onClick={onClickHandler}>
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SelectCard;
