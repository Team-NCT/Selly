import { Meta, Story } from "@storybook/react";
import BackArrowIcon from "./BackArrowIcon";

export default {
  title: "icon/BackArrowIcon",
  component: BackArrowIcon,
  parameters: {
    componentSubtitle: "왼쪽 방향 화살표 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <BackArrowIcon />;
