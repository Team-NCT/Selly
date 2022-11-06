import style from "./Title.module.scss";
import form_style from "../../Form.module.scss";
import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";

const Title = () => {
  const [value, handleInputChange] = useInputState();
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
        status={true}
        placeHolder="작품명을 입력해주세요."></TextInput>
      <p className={style.input_desc}>최대 20글자까지 입력 가능합니다.</p>
    </div>
  );
};

export default Title;
