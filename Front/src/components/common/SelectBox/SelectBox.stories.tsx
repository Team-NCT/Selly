import { Meta, Story } from "@storybook/react";
import SelectBox from "./SelectBox";
import { SelectBoxProps } from "./SelectBox.types";

export default {
  title: "Common/Input/SelectBox",
  component: SelectBox,
  parameters: {
    componentSubtitle: "SelectBox 컴포넌트",
  },
  argTypes: {
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<SelectBoxProps> = (args) => (
  <div style={{ width: "100px" }}>
    <SelectBox {...args} />
  </div>
);

Default.args = {
  list: ["옵션1", "옵션2", "옵션3", "옵션4"],
  category: "카테고리",
  bg: "primary",
  onChange: (event: React.FormEvent<Element>): void => {
    console.log((event.target as HTMLInputElement).value);
  },
};
