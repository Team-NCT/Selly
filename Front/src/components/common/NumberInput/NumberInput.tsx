import { NumberInputProps } from "./NumberInput.types";
import style from "./NumberInput.module.scss";

const NumberInput = (props: NumberInputProps) => {
  const { handleValueChange, status, errorMessage, value, placeHolder = "", ...attrs } = props;

  return (
    <>
      <input
        className={`${style.input_number} ${style[`input_${status}`]}`}
        value={value}
        type="number"
        placeholder={placeHolder}
        onChange={handleValueChange}
        {...attrs}></input>
      {!status && <p className={style.input_error}>{errorMessage}</p>}
    </>
  );
};

export default NumberInput;
