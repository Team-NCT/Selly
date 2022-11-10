import { Meta, Story } from "@storybook/react";
import LeftArrowIcon from "./LeftArrowIcon";

export default {
  title: "icon/LeftArrowIcon",
  component: LeftArrowIcon,
  parameters: {
    componentSubtitle: "왼쪽 화살표 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <LeftArrowIcon />;
