import { NumberInputProps } from "./NumberInput.types";
import style from "./NumberInput.module.scss";

const NumberInput = (props: NumberInputProps) => {
  const { handleInputChange, status, errorMessage, value, ...attrs } = props;

  return (
    <>
      <input
        className={`${style.input_number} ${style[`input_${status}`]}`}
        type="number"
        onChange={(event) => handleInputChange(event.target.value)}
        value={value}
        {...attrs}></input>
      {!status && <p className={style.input_error}>{errorMessage}</p>}
    </>
  );
};

export default NumberInput;
