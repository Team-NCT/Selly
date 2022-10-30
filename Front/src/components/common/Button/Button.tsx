import { ButtonProps } from "./Button.types";
import style from "./Button.module.scss";

const Button = ({
  children = "button",
  bg = "danger",
  size = "default",
  color = "black",
  fillContainer = "false",
  onClick,
}: ButtonProps) => {
  const buttonBg = style[["bg-", bg].join("")];
  const fill = fillContainer === "true" ? style.fillContainer : "";

  return (
    <button
      className={`${style.button} ${buttonBg} ${style[size]} ${style[color]} ${fill}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
