import { Meta, Story } from "@storybook/react";
import TextInput from "./TextInput";
import { TextInputProps } from "./TextInput.types";

export default {
  title: "Common/TextInput",
  component: TextInput,
  parameters: {
    componentSubtitle: "텍스트 Input 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<TextInputProps> = (args) => <TextInput {...args} />;

Default.args = {
  id: "input-text",
  status: true,
  maxLength: 10,
};
