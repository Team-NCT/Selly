import { Meta, Story } from "@storybook/react";
import TransactionSellStatus from "./TransactionSellStatus";

export default {
  title: "NFTDetail/Modal/TransactionSellStatus",
  component: TransactionSellStatus,
  parameters: {
    componentSubtitle: "NFT 조각 판매 현황 모달 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <TransactionSellStatus />;

Default.args = {};
