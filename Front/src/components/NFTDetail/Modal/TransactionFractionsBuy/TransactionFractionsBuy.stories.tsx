import { Meta, Story } from "@storybook/react";
import TransactionFractionsBuy from "./TransactionFractionsBuy";

export default {
  title: "NFTDetail/Modal/TransactionFractionsBuy",
  component: TransactionFractionsBuy,
  parameters: {
    componentSubtitle: "NFT 조각 구매 모달 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story = (args) => <TransactionFractionsBuy />;

Default.args = {};
