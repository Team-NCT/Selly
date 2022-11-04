import style from "./NFTDetailHistoryModal.module.scss";
import { NFTDetailHistoryModalProps } from "./NFTDetailHistoryModal.types";

const NFTDetailHistoryModal = ({ highest, lowest, open }: NFTDetailHistoryModalProps) => {
  return (
    <dialog open={open} className={style.NFT_detail_history_modal}>
      <p>최고가: {highest}</p>
      <p>최저가: {lowest}</p>
    </dialog>
  );
};

export default NFTDetailHistoryModal;
