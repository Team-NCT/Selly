import { Meta, Story } from "@storybook/react";
import AddPhotoIcon from "./AddPhotoIcon";

export default {
  title: "icon/AddPhotoIcon",
  component: AddPhotoIcon,
  parameters: {
    componentSubtitle: "그림 추가 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <AddPhotoIcon />;
