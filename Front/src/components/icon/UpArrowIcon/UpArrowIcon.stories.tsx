import { Meta, Story } from "@storybook/react";
import UpArrowIcon from "./UpArrowIcon";

export default {
  title: "icon/UpArrowIcon",
  component: UpArrowIcon,
  parameters: {
    componentSubtitle: "위쪽 화살표 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <UpArrowIcon />;
