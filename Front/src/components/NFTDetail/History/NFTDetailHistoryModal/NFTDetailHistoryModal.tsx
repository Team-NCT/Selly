import style from "./NFTDetailHistoryModal.module.scss";
import { NFTDetailHistoryModalProps } from "./NFTDetailHistoryModal.types";

const NFTDetailHistoryModal = ({ maxPrice, lowPrice, open }: NFTDetailHistoryModalProps) => {
  return (
    <dialog open={open} className={style.NFT_detail_history_modal}>
      <p>최고가: {maxPrice}</p>
      <p>최저가: {lowPrice}</p>
    </dialog>
  );
};

export default NFTDetailHistoryModal;
