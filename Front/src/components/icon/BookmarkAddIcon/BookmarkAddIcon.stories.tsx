import { Meta, Story } from "@storybook/react";
import BookmarkAddIcon from "./BookmarkAddIcon";

export default {
  title: "icon/BookmarkAddIcon",
  component: BookmarkAddIcon,
  parameters: {
    componentSubtitle: "북마크 추가 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <BookmarkAddIcon />;
