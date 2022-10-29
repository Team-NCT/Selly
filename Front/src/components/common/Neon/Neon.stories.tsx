import { Meta, Story } from "@storybook/react";
import NeonText from "./Neon";
import { NeonTextProps } from "./Neon.types";

export default {
  title: "Common/NeonText",
  component: NeonText,
  parameters: {
    componentSubtitle: "NeonText 컴포넌트",
  },
  argTypes: {
    children: { control: { type: "text" } },
    width: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    height: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    vertical: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    horizontal: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    color: { control: { type: "select" } },
    positionH: { control: { type: "radio" } },
    positionW: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<NeonTextProps> = (args) => <NeonText {...args} />;

Default.args = {
  children: "Selly",
  width: 55,
  height: 60,
  vertical: 10,
  horizontal: 10,
  color: "muscat",
  positionH: "bottom",
  positionW: "right",
};
