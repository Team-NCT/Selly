import { Meta, Story } from "@storybook/react";
import RightArrowIcon from "./RightArrowIcon";

export default {
  title: "icon/RightArrowIcon",
  component: RightArrowIcon,
  parameters: {
    componentSubtitle: "오른쪽 화살표 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <RightArrowIcon />;
