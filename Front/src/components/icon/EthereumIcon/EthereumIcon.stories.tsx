import { Meta, Story } from "@storybook/react";
import EthereumIcon from "./EthereumIcon";

export default {
  title: "icon/EthereumIcon",
  component: EthereumIcon,
  parameters: {
    componentSubtitle: "이더리움 아이콘",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <EthereumIcon />;
