import { useEffect } from "react";
import { useAlert } from "@/hooks/useAlert";
import { AlertProps } from "./Alert.types";
import styles from "./Alert.module.scss";

const Alert = ({
  style = "success",
  icon = false,
  ...props
}: React.PropsWithChildren<AlertProps>) => {
  //* alert 닫기
  const { closeAlertModal } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      closeAlertModal();
    }, 2500);
  }, [closeAlertModal]);

  const alertStyle = styles[["style-", style].join("")];
  const iconStyle = styles[["iconStyle"].join("")];
  const alertCenter = styles[["alertCenter"].join("")];

  let content;
  switch (style) {
    case "success":
      content = "✓";
      break;
    case "info":
      content = "i";
      break;
    case "error":
      content = "X";
      break;
    case "warning":
      content = "!";
  }

  if (icon) {
    return (
      <dialog open className={styles.dialog_alert}>
        <div className={`${alertStyle} ${iconStyle}`}>{content}</div>
        {props.children}
      </dialog>
    );
  } else {
    return (
      <dialog open className={`${alertStyle} ${alertCenter} ${styles.dialog_alert}`}>
        {props.children}
      </dialog>
    );
  }
};

export default Alert;
