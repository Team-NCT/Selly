import { Modal, Button } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { closeSellStatus } from "@/store/modalSlice";

interface DialogBoxProps {
  cancelNavigation: any;
  confirmNavigation: any;
}

const ConfirmModal = ({ confirmNavigation, cancelNavigation }: DialogBoxProps) => {
  const dispatch = useAppDispatch();

  const confirmHandler = () => {
    confirmNavigation();
    dispatch(closeSellStatus);
  };

  const cancelHandler = () => {
    cancelNavigation();
    dispatch(closeSellStatus);
  };

  return (
    <Modal close={() => dispatch(closeSellStatus)}>
      <div>
        <p>나가시겠습니까?</p>
        <Button onClick={confirmHandler}>확인</Button>
        <Button onClick={cancelHandler}>취소</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
