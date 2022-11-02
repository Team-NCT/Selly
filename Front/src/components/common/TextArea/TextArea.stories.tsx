import { Meta, Story } from "@storybook/react";
import TextArea from "./TextArea";
import { TextAreaProps } from "./TextArea.types";
import { useInputState } from "@/hooks";

export default {
  title: "Common/Input/TextArea",
  component: TextArea,
  parameters: {
    componentSubtitle: "TextArea 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<TextAreaProps> = (args) => {
  const [value, handleInputChange] = useInputState();
  return <TextArea {...args} value={value} handleInputChange={handleInputChange} />;
};

Default.args = {
  id: "text-area",
  maxLength: 1000,
  placeHolder: "작품에 대한 설명을 입력해주세요.",
};
