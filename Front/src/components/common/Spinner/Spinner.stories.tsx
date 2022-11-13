import { Meta, Story } from "@storybook/react";
import Spinner from "./Spinner";

export default {
  title: "Common/Spinner",
  component: Spinner,
  parameters: {
    componentSubtitle: "스피너",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => {
  return <Spinner />;
};
