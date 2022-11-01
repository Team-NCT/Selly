import { Meta, Story } from "@storybook/react";

import Navbar from "./Navbar";

export default {
  title: "Common/Navbar",
  component: Navbar,
  decorators: [],
  parameters: {
    componentSubtitle: "네비게이션바 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <Navbar />;
