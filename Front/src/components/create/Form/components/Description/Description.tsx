import { Label, TextArea } from "@/components/common";
import { useInputState } from "@/hooks";
import style_form from "../../Form.module.scss";

const Description = () => {
  const [value, handleInputChange] = useInputState();
  return (
    <div className={style_form.form_item}>
      <div className={style_form.form_margin}>
        <Label id="create-description" color="lilac150" positionH="bottom" positionW="right">
          <h2 className={style_form.form_title}>Descriptions</h2>
        </Label>
      </div>
      <TextArea
        id="create-description"
        maxLength={1000}
        value={value}
        handleInputChange={handleInputChange}
        placeHolder="작품에 대한 설명을 입력해주세요."
      />
    </div>
  );
};

export default Description;
