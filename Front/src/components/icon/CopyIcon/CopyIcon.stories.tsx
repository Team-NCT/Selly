import { Meta, Story } from "@storybook/react";
import CopyIcon from "./CopyIcon";

export default {
  title: "icon/CopyIcon",
  component: CopyIcon,
  parameters: {
    componentSubtitle: "복사 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <CopyIcon />;
