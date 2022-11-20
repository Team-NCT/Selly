import { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

const Modal = ({ children, close }: ModalProps) => {
  //* 모달이 켜졌을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <>
      <div
        className={styles.overlay}
        onClick={close}
        role="button"
        tabIndex={0}
        aria-hidden="true"></div>
      <dialog className={styles.dialog_modal}>{children}</dialog>
    </>
  );
};

export default Modal;
