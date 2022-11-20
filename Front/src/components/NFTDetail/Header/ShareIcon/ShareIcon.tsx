import { useState, useRef } from "react";
import style from "./ShareIcon.module.scss";
import { ShareDropDown } from "@/components/NFTDetail/Header";
import { ShareDropDownProps } from "../ShareDropDown/ShareDropDown.types";
import { SharingIcon } from "@/components/icon";
import { useClickOutSide } from "@/hooks";

const ShareIcon = ({ title, id, imageUrl, url = "" }: ShareDropDownProps) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const dialogRef = useRef(null);
  const handleButtonClick = () => {
    setDialogStatus((prev) => !prev);
  };

  //* 외부 클릭 시, 공유 다이얼로그가 사라진다.
  useClickOutSide(dialogRef, () => setDialogStatus(false));
  return (
    <div ref={dialogRef}>
      <button className={style.button_icon_share} onClick={handleButtonClick}>
        <SharingIcon />
      </button>
      <dialog open={dialogStatus} className={style.button_share_dialog}>
        <ShareDropDown id={id} title={title} imageUrl={imageUrl} url={url} />
      </dialog>
    </div>
  );
};

export default ShareIcon;
