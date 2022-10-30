import { Meta, Story } from "@storybook/react";
import ImageInput from "./ImageInput";
import { ImageInputProps } from "./ImageInput.types";

export default {
  title: "Common/ImageInput",
  component: ImageInput,
  parameters: {
    componentSubtitle: "이미지 인풋",
  },
  argTypes: {},
} as Meta;

export const Default: Story<ImageInputProps> = (args) => <ImageInput {...args} />;

Default.args = {
  id: "image-input",
  limit: 5,
};
