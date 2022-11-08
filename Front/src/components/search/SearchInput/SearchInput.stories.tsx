import { Meta, Story } from "@storybook/react";
import SearchInput from "./SearchInput";

export default {
  title: "search/SearchInput",
  component: SearchInput,
  parameters: {
    componentSubtitle: "검색 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <SearchInput />;
