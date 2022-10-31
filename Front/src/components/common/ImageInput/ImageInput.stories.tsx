import { Meta, Story } from "@storybook/react";
import ImageInput from "./ImageInput";
import { ImageInputProps, ImageInputStyleType } from "./ImageInput.types";

export default {
  title: "Common/Input/ImageInput",
  component: ImageInput,
  parameters: {
    componentSubtitle: "이미지 인풋: 부모의 너비, 폰트 사이즈에 크기가 수정된다.",
  },
  argTypes: {
    styles: {
      options: ImageInputStyleType,
      control: "radio",
    },
  },
} as Meta;

export const Default: Story<ImageInputProps> = (args) => (
  <div style={{ width: "240px", fontSize: "64px" }}>
    <ImageInput {...args} />
  </div>
);

Default.args = {
  id: "image-input",
  limit: 5,
  styles: "square",
  handleInputChange: (arg: File) => console.log(arg),
};
