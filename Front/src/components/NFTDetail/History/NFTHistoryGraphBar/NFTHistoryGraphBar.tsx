import { useState } from "react";
import style from "./NFTHistoryGraphBar.module.scss";
import { convertYMDWithComma } from "@/helpers/utils/convertDate";
import { calcNFTDetailHistoryType } from "@/helpers/service/calcGraph";
import { NFTHistoryModal } from "@/components/NFTDetail/History";

const NFTHistoryGraphBar = ({
  avgPrice,
  date,
  height,
  lowPrice,
  maxPrice,
}: calcNFTDetailHistoryType) => {
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
        <p className={style.NFT_history_graph_average}>{avgPrice}</p>
        <p className={style.NFT_history_graph_date}> {convertYMDWithComma(date)} </p>
        <NFTHistoryModal open={modalStatus} maxPrice={maxPrice} lowPrice={lowPrice} />
      </div>
    </li>
  );
};

export default NFTHistoryGraphBar;
