import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";
import style from "./Link.module.scss";
import form_style from "../../Form.module.scss";

const Link = () => {
  const [value, handleInputChange] = useInputState();
  return (
    <div className={form_style.form_item}>
      <Label
        color="marmalade"
        positionH="bottom"
        positionW="right"
        id="create-link"
        width={25}
        horizontal={5}>
        <h2 className={form_style.form_title}>External Link</h2>
      </Label>
      <TextInput
        id="create-link"
        value={value}
        handleInputChange={handleInputChange}
        maxLength={100}
        status={true}
        placeHolder="해당 작품에 연결하고 싶은 사이트 링크를 입력해주세요."></TextInput>
      <p className={style.input_desc}>최대 100글자까지 입력 가능합니다.</p>
    </div>
  );
};

export default Link;
