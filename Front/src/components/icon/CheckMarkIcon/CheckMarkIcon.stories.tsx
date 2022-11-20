import { Meta, Story } from "@storybook/react";
import CheckMarkIcon from "./CheckMarkIcon";

export default {
  title: "icon/CheckMarkIcon",
  component: CheckMarkIcon,
  parameters: {
    componentSubtitle: "체크 아이콘",
  },
  argTypes: {
    size: { control: { type: "range", min: 1, max: 100, step: 1 } },
  },
} as Meta;

export const Default: Story = () => <CheckMarkIcon />;
