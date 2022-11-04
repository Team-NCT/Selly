import { useState } from "react";
import { NFTHistoryGraphBarProps } from "./NFTHistoryGraphBar.types";
import style from "./NFTHistoryGraphBar.module.scss";
import { convertYMDWithComma } from "@/helpers/utils/convertDate";
import { NFTHistoryModal } from "@/components/NFTDetail/History";

const NFTHistoryGraphBar = ({
  height,
  date,
  average,
  highest,
  lowest,
}: NFTHistoryGraphBarProps) => {
  const [modalStatus, setModalStatus] = useState(false);

  const handleMouseEnter = () => {
    setModalStatus(true);
  };

  const handleMouseLeave = () => {
    setModalStatus(false);
  };

  return (
    <li
      className={style.NFT_history_graph_item}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={style[`height-${height}`]}>
        <p className={style.NFT_history_graph_average}>{average}</p>
        <p className={style.NFT_history_graph_date}> {convertYMDWithComma(date)} </p>
        <NFTHistoryModal open={modalStatus} highest={highest} lowest={lowest} />
      </div>
    </li>
  );
};

export default NFTHistoryGraphBar;
