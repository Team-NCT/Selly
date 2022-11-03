import style from "./Title.module.scss";
import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";

const Title = () => {
  const [value, handleInputChange] = useInputState();
  return (
    <>
      <h2 className={style.form_title}>
        <Label color="sherbet" positionH="bottom" positionW="right" id="create-title">
          Title
        </Label>
        <caption className={style.caption_danger}>*</caption>
      </h2>
      <TextInput
        id="create-title"
        value={value}
        handleInputChange={handleInputChange}
        maxLength={20}
        status={true}
        placeHolder="작품명을 입력해주세요."></TextInput>
      <p className={style.input_desc}>최대 20글자까지 입력 가능합니다.</p>
    </>
  );
};

export default Title;
