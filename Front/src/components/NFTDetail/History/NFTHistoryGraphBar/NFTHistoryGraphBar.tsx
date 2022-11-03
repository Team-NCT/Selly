import { NFTHistoryGraphBarProps } from "./NFTHistoryGraphBar.types";
import style from "./NFTHistoryGraphBar.module.scss";
import { convertYMDWithComma } from "@/helpers/utils/convertDate";

const NFTHistoryGraphBar = ({
  height,
  date,
  average,
  handleMouseOver,
}: NFTHistoryGraphBarProps) => {
  return (
    <li
      className={style.NFT_history_graph_item}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}>
      <div className={style[`height-${height}`]}>
        <p className={style.NFT_history_graph_average}>{average}</p>
        <p className={style.NFT_history_graph_date}> {convertYMDWithComma(date)} </p>
      </div>
    </li>
  );
};

export default NFTHistoryGraphBar;
