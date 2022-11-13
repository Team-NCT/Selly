import { useState } from "react";
import style from "./NFTDescription.module.scss";
import { NFTDescriptionProps } from "./NFTDescription.types";
import { Neon } from "@/components/common";

const NFTDescription = ({ description }: NFTDescriptionProps) => {
  const [className, setClassName] = useState(style.NFT_detail_description_DESC_show);
  const handleButtonClick = () => {
    setClassName("");
  };
  return (
    <div className={style.NFT_detail_description_DESC}>
      <Neon color="lilac" positionH="bottom" positionW="right">
        <h1>Description</h1>
      </Neon>
      <p className={className}>{description}</p>
      {description.length > 100 && (
        <button onClick={handleButtonClick} hidden={!className}>
          더보기
        </button>
      )}
    </div>
  );
};

export default NFTDescription;
