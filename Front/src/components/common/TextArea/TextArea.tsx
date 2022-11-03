import style from "./TextArea.module.scss";
import { TextAreaProps } from "./TextArea.types";

const TextArea = ({
  id,
  value = "",
  handleInputChange,
  maxLength,
  placeHolder = "",
}: TextAreaProps) => {
  return (
    <>
      <textarea
        className={style.textarea}
        id={id}
        maxLength={maxLength}
        placeholder={placeHolder}
        value={value}
        onChange={handleInputChange}></textarea>
      <p className={style.textarea_desc}>
        {value.length}/{maxLength}
      </p>
    </>
  );
};

export default TextArea;
