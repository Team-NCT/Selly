import { TextInputProps } from "./TextInput.types";
import style from "./TextInput.module.scss";

const TextInput = ({ id, status, maxLength, minLength = 0, placeHolder = "" }: TextInputProps) => {
  return (
    <input
      className={`${style.input_text} ${style[`input_${status}`]}`}
      type="text"
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      placeholder={placeHolder}
    />
  );
};
export default TextInput;
