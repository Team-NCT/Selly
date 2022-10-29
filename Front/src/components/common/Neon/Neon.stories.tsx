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
  },
} as Meta;

export const Default: Story<NeonTextProps> = (args) => <NeonText {...args} />;

Default.args = {
  children: "Selly",
};
