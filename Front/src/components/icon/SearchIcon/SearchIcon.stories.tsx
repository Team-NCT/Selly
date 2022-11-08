import { Meta, Story } from "@storybook/react";
import SearchIcon from "./SearchIcon";

export default {
  title: "icon/SearchIcon",
  component: SearchIcon,
  parameters: {
    componentSubtitle: "복사 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <SearchIcon />;
