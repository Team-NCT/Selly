import { ButtonProps } from "./Button.types";
import style from "./Button.module.scss";

const Button = ({
  children = "button",
  bg = "primary",
  size = "default",
  color = "black",
  type = "submit",
  hidden = false,
  onClick,
}: ButtonProps) => {
  const buttonBg = style[["bg-", bg].join("")];

  return (
    <button
      className={`${style.button} ${buttonBg} ${style[size]} ${style[color]}`}
      type={type}
      hidden={hidden}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
