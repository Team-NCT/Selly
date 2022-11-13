import { Meta, Story } from "@storybook/react";
import XIcon from "./XIcon";

export default {
  title: "icon/XIcon",
  component: XIcon,
  parameters: {
    componentSubtitle: "X 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <XIcon />;
