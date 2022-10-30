import { ButtonProps } from "./Button.types";
import style from "./Button.module.scss";

const Button = ({
  children = "button",
  bg = "primary",
  size = "default",
  color = "black",
  onClick,
}: ButtonProps) => {
  const buttonBg = style[["bg-", bg].join("")];

  return (
    <button
      className={`${style.button} ${buttonBg} ${style[size]} ${style[color]}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
