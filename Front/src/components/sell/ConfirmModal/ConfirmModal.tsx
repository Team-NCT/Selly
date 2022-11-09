import { Modal, Button } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/hooks";
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
      <div>
        <p>나가시겠습니까?</p>
        <Button onClick={confirmHandler}>확인</Button>
        <Button onClick={cancelHandler}>취소</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
