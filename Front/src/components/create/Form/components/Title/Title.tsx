import style from "./Title.module.scss";
import form_style from "../../Form.module.scss";
import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { TitleProps } from "../../Form.types";

const Title = ({ setIsTitleTrue }: TitleProps) => {
  //* input, button state
  const [inputStatus, setInputStatus] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  //* button의 state가 바뀔때마다 부모에 올려줌.
  useEffect(() => {
    setIsTitleTrue(buttonStatus);
  }, [buttonStatus, setIsTitleTrue]);

  //* input의 길이에 따라 input과 button의 state를 바꾸는 함수
  const isTitleTrue = useCallback((value: string) => {
    if (value.trim().length == 0) {
      setInputStatus(false);
      setButtonStatus(false);
      return value;
    } else {
      setInputStatus(true);
      setButtonStatus(true);
      return value;
    }
  }, []);

  const [value, handleInputChange] = useInputState("", isTitleTrue);
  return (
    <div className={form_style.form_item}>
      <Label color="sherbet" positionH="bottom" positionW="right" id="create-title">
        <h2 className={form_style.form_title}>Title</h2>
      </Label>
      <span className={style.caption_danger}>*</span>
      <p className={style.input_desc}>최대 20글자까지 입력 가능합니다.</p>
      <div className={style.input}>
        <TextInput
          id="create-title"
          value={value}
          handleInputChange={handleInputChange}
          maxLength={20}
          status={inputStatus}
          placeHolder="작품명을 입력해주세요."
          errorMessage="작품명은 필수 항목입니다."></TextInput>
      </div>
    </div>
  );
};

export default Title;
