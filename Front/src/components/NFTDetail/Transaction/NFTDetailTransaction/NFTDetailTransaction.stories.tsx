import { Meta, Story } from "@storybook/react";
import NFTDetailTransaction from "./NFTDetailTransaction";
import { NFTDetailTransactionProps } from "./NFTDetailTransaction.types";

export default {
  title: "NFTDetail/Transaction/NFTDetailTransaction",
  component: NFTDetailTransaction,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: 거래 Form ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDetailTransactionProps> = (args) => (
  <div style={{ maxWidth: "600px" }}>
    <NFTDetailTransaction />
  </div>
);

Default.args = {
  articleId: 1,
  userId: 1,
};
