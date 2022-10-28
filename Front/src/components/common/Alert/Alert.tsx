import { useEffect } from "react";
import { AlertProps } from "./Alert.types";
import "./Alert.module.scss";
import { useAlert } from "@/hooks/useAlert";

const Alert = ({
  style = "success",
  icon = "none",
  ...props
}: React.PropsWithChildren<AlertProps>) => {
  // const { closeAlertModal } = useAlert();

  // useEffect(() => {
  //   setTimeout(() => {
  //     closeAlertModal();
  //   }, 2500);
  // }, []);

  return (
    <dialog open className="">
      {props.children}
    </dialog>
  );
};

export default Alert;
