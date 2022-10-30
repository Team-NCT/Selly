import { Meta, Story } from "@storybook/react";
import Button from "./Button";
import { ButtonProps } from "./Button.types";

export default {
  title: "Common/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Button 컴포넌트",
  },
  argTypes: {
    children: { control: { type: "text" } },
    bg: { control: { type: "radio" } },
    size: { control: { type: "radio" } },
    fillContainer: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: "button",
  bg: "primary",
  size: "default",
  fillContainer: "false",
};
