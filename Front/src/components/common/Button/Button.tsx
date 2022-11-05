import { ButtonProps } from "./Button.types";
import style from "./Button.module.scss";

const Button = ({
  children = "button",
  bg = "primary",
  size = "default",
  color = "black",
  type = "submit",
  hidden = false,
  disabled = false,
  onClick,
}: ButtonProps) => {
  //* 버튼이 disabled 상태이면 버튼 색상을 disabled로 변경
  let buttonBg;
  if (!disabled) {
    buttonBg = style[["bg-", bg].join("")];
  } else {
    buttonBg = style["bg-disabled"];
  }

  return (
    <button
      className={`${style.button} ${buttonBg} ${style[size]} ${style[color]}`}
      type={type}
      hidden={hidden}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
