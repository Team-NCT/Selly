import { Meta, Story } from "@storybook/react";
import DropdownItem from "./DropdownItem";
import { DropdownItemProps } from "./DropdownItem.types";

export default {
  title: "Common/DropdownItem",
  component: DropdownItem,
  parameters: {
    componentSubtitle: "Dropdown 컴포넌트",
  },
  argTypes: {
    value: { control: { type: "text" } },
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<DropdownItemProps> = (args) => <DropdownItem {...args} />;

Default.args = {
  value: "옵션",
  category: "카테고리",
  bg: "primary",
};
