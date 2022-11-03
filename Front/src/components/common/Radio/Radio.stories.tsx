import { Meta, Story } from "@storybook/react";
import Radio from "./Radio";
import { RadioProps } from "./Radio.types";

export default {
  title: "Common/Input/Radio",
  component: Radio,
  parameters: {
    componentSubtitle: "Radio 컴포넌트",
  },
  argTypes: {
    bg: { control: { type: "radio" } },
    value: { control: { type: "text" } },
    category: { control: { type: "text" } },
  },
} as Meta;

export const Default: Story<RadioProps> = (args) => <Radio {...args} />;

Default.args = {
  bg: "primary",
  value: "라디오",
  category: "카테고리",
};
