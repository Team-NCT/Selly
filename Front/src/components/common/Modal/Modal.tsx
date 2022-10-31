import { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";

const Modal = ({ children, close }: ModalProps) => {
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
