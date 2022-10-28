import { Meta, Story } from "@storybook/react";
import NeonText from "./NeonText";
import { NeonTextProps } from "./NeonText.types";

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

const Template: Story<NeonTextProps> = (args) => <NeonText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Selly",
};
