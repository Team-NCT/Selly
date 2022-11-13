import { Meta, Story } from "@storybook/react";
import BookmarkRemoveIcon from "./BookmarkRemoveIcon";

export default {
  title: "icon/BookmarkAddIcon",
  component: BookmarkRemoveIcon,
  parameters: {
    componentSubtitle: "북마크 제거 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <BookmarkRemoveIcon />;
