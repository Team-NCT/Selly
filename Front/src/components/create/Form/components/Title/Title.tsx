import style from "./Title.module.scss";
import form_style from "../../Form.module.scss";
import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";
import { useEffect, useState } from "react";
import { TitleProps } from "../../Form.types";

const Title = ({ setIsTitleTrue }: TitleProps) => {
  const [value, handleInputChange] = useInputState();
  //* value가 빈 값이면 false
  const [isTrue, setIsTrue] = useState<boolean>(true);
  useEffect(() => {
    const debounce = setTimeout(async () => {
      setIsTrue(false);
      if (value.trim().length === 0) {
        setIsTrue(false);
      } else {
        setIsTrue(true);
        setIsTitleTrue(true);
      }
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [setIsTitleTrue, value]);
  return (
    <div className={form_style.form_item}>
      <Label color="sherbet" positionH="bottom" positionW="right" id="create-title">
        <h2 className={form_style.form_title}>Title</h2>
      </Label>
      <span className={style.caption_danger}>*</span>
      <TextInput
        id="create-title"
        value={value}
        handleInputChange={handleInputChange}
        maxLength={20}
        status={isTrue}
        placeHolder="작품명을 입력해주세요."
        errorMessage="작품명은 필수 항목입니다."></TextInput>
      <p className={style.input_desc}>최대 20글자까지 입력 가능합니다.</p>
    </div>
  );
};

export default Title;
