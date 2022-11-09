import { Meta, Story } from "@storybook/react";
import WalletIcon from "./WalletIcon";
import { WalletIconProps } from "./WalletIcon.types";

export default {
  title: "icon/WalletIcon",
  component: WalletIcon,
  parameters: {
    componentSubtitle: "지갑 아이콘",
  },
  argTypes: {
    color: { control: { type: "radio" } },
    size: { control: { type: "range", min: 1, max: 100, step: 1 } },
  },
} as Meta;

export const Default: Story<WalletIconProps> = (args) => <WalletIcon {...args} />;

Default.args = {
  color: "black",
  size: 24,
};
