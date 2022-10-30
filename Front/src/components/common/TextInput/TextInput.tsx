import { TextInputProps } from "./TextInput.types";
import style from "./TextInput.module.scss";

const TextInput = ({
  id,
  value,
  handleInputChange,
  status,
  maxLength,
  minLength = 0,
  placeHolder = "",
  errorMessage = "",
}: TextInputProps) => {
  return (
    <>
      <input
        className={`${style.input_text} ${style[`input_${status}`]}`}
        type="text"
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeHolder}
        value={value}
        onChange={handleInputChange}
      />
      {!status && <p className={style.input_error}>{errorMessage}</p>}
    </>
  );
};
export default TextInput;
