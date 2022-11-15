import style from "./ConfirmModal.module.scss";
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
        <div className={style.text_section}>
          <h1>정말 나가시겠습니까?</h1>
          <h1 className={style.alert_text}>완료되지 않은 서명 단계는 저장되지 않습니다!</h1>
        </div>
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
