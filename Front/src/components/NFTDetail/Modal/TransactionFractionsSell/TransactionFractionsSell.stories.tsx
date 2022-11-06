import { Meta, Story } from "@storybook/react";
import TransactionFractionsSell from "./TransactionFractionsSell";

export default {
  title: "NFTDetail/Modal/TransactionFractionsSell",
  component: TransactionFractionsSell,
  parameters: {
    componentSubtitle: "NFT 조각 판매 모달",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <TransactionFractionsSell />;

Default.args = {};
