import { Meta, Story } from "@storybook/react";
import Dropdown from "./Dropdown";
import { DropdownProps } from "./Dropdown.types";

export default {
  title: "Common/Dropdown",
  component: Dropdown,
  parameters: {
    componentSubtitle: "Dropdown 컴포넌트",
  },
  argTypes: {
    value: { control: { type: "text" } },
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<DropdownProps> = (args) => <Dropdown {...args} />;

Default.args = {
  value: "옵션",
  category: "카테고리",
  bg: "primary",
};
