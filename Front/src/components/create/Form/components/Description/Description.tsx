import { Label, TextArea } from "@/components/common";
import { useInputState } from "@/hooks";

const Description = () => {
  const [value, handleInputChange] = useInputState();
  return (
    <>
      <Label id="create-description" color="lilac150" positionH="bottom" positionW="right">
        Descriptions
      </Label>
      <TextArea
        id="create-description"
        maxLength={1000}
        value={value}
        handleInputChange={handleInputChange}
        placeHolder="작품에 대한 설명을 입력해주세요."
      />
    </>
  );
};

export default Description;
