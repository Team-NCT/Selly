import { Meta, Story } from "@storybook/react";
import RadioList from "./RadioList";
import { RadioListProps } from "./RadioList.types";

export default {
  title: "Common/RadioList",
  component: RadioList,
  parameters: {
    componentSubtitle: "RadioList 컴포넌트",
  },
  argTypes: {
    category: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<RadioListProps> = (args) => <RadioList {...args} />;

Default.args = {
  list: ["라디오1", "라디오2", "라디오3", "라디오4"],
  category: "카테고리",
  bg: "primary",
  onChange: (event: React.FormEvent<Element>): void => {
    console.log((event.target as HTMLInputElement).value);
  },
};
