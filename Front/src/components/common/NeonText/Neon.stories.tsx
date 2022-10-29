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
  },
} as Meta;

export const Default: Story<NeonTextProps> = (args) => <NeonText {...args} />;

Default.args = {
  children: "Selly",
};
