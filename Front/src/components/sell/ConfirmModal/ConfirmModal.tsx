import style from "./confirmModal.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Modal, Button } from "@/components/common";
import { resetNFTValue } from "@/store/selectNFTSlice";
import { resetSellInfo } from "@/store/sellInfoSlice";
import { selectModal, closeConfirm } from "@/store/modalSlice";
import { stepType } from "@/pages/Sell/Sell";

interface DialogBoxProps {
  cancelNavigation: () => void;
  confirmNavigation: () => void;
  changeStep: (step: stepType) => void;
}

const ConfirmModal = ({ confirmNavigation, cancelNavigation, changeStep }: DialogBoxProps) => {
  const dispatch = useAppDispatch();
  const { confirm } = useAppSelector(selectModal);

  const confirmHandler = () => {
    if (confirm) {
      changeStep("SELECT");
    }
    dispatch(resetNFTValue());
    dispatch(resetSellInfo());
    dispatch(closeConfirm());
    confirmNavigation();
  };

  const cancelHandler = () => {
    cancelNavigation();
    dispatch(closeConfirm());
  };

  return (
    <Modal close={cancelHandler}>
      <section className={style.confirm_modal}>
        <h1>정말 나가시겠습니까?</h1>
        <div className={style.button_section}>
          <Button onClick={confirmHandler}>확인</Button>
          <Button bg="blackberry" color="outline" onClick={cancelHandler}>
            취소
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default ConfirmModal;
