import { Meta, Story } from "@storybook/react";
import TextInput from "./TextInput";
import { TextInputProps } from "./TextInput.types";
import { useInputState } from "@/hooks";

export default {
  title: "Common/Input/TextInput",
  component: TextInput,
  parameters: {
    componentSubtitle: "텍스트 Input 컴포넌트: TextInput.stories.tsx에 사용 예시가 있습니다.",
  },
  argTypes: {},
} as Meta;

export const Default: Story<TextInputProps> = (args) => {
  const [value, handleInputChange] = useInputState();
  return <TextInput {...args} value={value} handleInputChange={handleInputChange} />;
};

Default.args = {
  id: "input-text",
  status: true,
  maxLength: 10,
};
