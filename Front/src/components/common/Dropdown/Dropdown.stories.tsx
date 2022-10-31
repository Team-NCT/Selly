import { Meta, Story } from "@storybook/react";
import Dropdown from "./Dropdown";
import { DropdownProps } from "./Dropdown.types";

export default {
  title: "Common/Input/Dropdown",
  component: Dropdown,
  parameters: {
    componentSubtitle: "Dropdown 컴포넌트",
  },
  argTypes: {
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<DropdownProps> = (args) => <Dropdown {...args} />;

Default.args = {
  list: ["옵션1", "옵션2", "옵션3", "옵션4"],
  category: "카테고리",
  bg: "primary",
  onChange: (event: React.FormEvent<Element>): void => {
    console.log((event.target as HTMLInputElement).value);
  },
};
