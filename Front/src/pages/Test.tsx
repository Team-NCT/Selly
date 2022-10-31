import { OpenAlertArg, useAlert } from "@/hooks/useAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { selectModal, openTest, closeTest } from "@/redux/slices/modalSlice";
import TestModal from "@/components/test/testModal";
import { createPortal } from "react-dom";

const Test = () => {
  const { openAlertModal } = useAlert();
  const openAlertHandler = () => {
    const data: OpenAlertArg = {
      content: "버튼을 클릭하였습니다.",
      style: "success",
      icon: true,
    };
    openAlertModal(data);
  };

  const { test } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(openTest());
  };
  const closeModal = () => {
    dispatch(closeTest());
  };
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  return (
    <>
      <button onClick={openAlertHandler}>알럿</button>
      <button onClick={openModal}>모달</button>
      {test && createPortal(<TestModal close={closeModal} />, el)}
    </>
  );
};
export default Test;
