import { Modal } from "../common/index";
import styles from "./testModal.module.scss";

interface Props {
  close: () => void;
}

const TestModal = ({ close }: Props) => {
  return (
    <Modal close={close}>
      <div className={styles.test}>test</div>
    </Modal>
  );
};

export default TestModal;
