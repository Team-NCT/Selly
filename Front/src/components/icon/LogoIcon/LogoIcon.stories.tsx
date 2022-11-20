import { Meta, Story } from "@storybook/react";
import LogoIcon from "./LogoIcon";

export default {
  title: "icon/LogoIcon",
  component: LogoIcon,
  parameters: {
    componentSubtitle: "셀리 로고 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <LogoIcon />;
