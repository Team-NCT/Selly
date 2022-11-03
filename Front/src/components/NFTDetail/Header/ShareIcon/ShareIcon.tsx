import { useState } from "react";
import style from "./ShareIcon.module.scss";
import { ShareDropDown } from "@/components/NFTDetail/Header";
import { ShareDropDownProps } from "../ShareDropDown/ShareDropDown.types";

const ShareIcon = ({ title, id, imageUrl, url = "" }: ShareDropDownProps) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const handleButtonClick = () => {
    setDialogStatus((prev) => !prev);
  };
  return (
    <div>
      <button className={style.button_icon_share} onClick={handleButtonClick}>
        <span className="material-icons-outlined">share</span>
      </button>
      <dialog open={dialogStatus}>
        <ShareDropDown id={id} title={title} imageUrl={imageUrl} url={url} />
      </dialog>
    </div>
  );
};

export default ShareIcon;
