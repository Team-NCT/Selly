import { Meta, Story } from "@storybook/react";
import DropdownList from "./DropdownList";
import { DropdownListProps } from "./DropdownList.types";

export default {
  title: "Common/Input/DropdownList",
  component: DropdownList,
  parameters: {
    componentSubtitle: "DropdownList 컴포넌트",
  },
  argTypes: {
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<DropdownListProps> = (args) => (
  <div style={{ width: "100px" }}>
    <DropdownList {...args} />
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
