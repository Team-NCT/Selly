import { Meta, Story } from "@storybook/react";
import PencilIcon from "./PencilIcon";

export default {
  title: "icon/PencilIcon",
  component: PencilIcon,
  parameters: {
    componentSubtitle: "연필 밑줄 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <PencilIcon />;
