import { Meta, Story } from "@storybook/react";
import ShareIcon from "./SharingIcon";

export default {
  title: "icon/ShareIcon",
  component: ShareIcon,
  parameters: {
    componentSubtitle: "공유하기 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <ShareIcon />;
