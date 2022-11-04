import { Meta, Story } from "@storybook/react";
import NFTDetailTransaction from "./NFTDetailTransaction";
import {} from "./NFTDetailTransaction.types";

export default {
  title: "NFTDetail/Transaction/NFTDetailTransaction",
  component: NFTDetailTransaction,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: 거래 Form ",
  },
  argTypes: {},
} as Meta;

export const Default: Story = (args) => (
  <div style={{ width: "400px" }}>
    <NFTDetailTransaction {...args} />
  </div>
);

Default.args = {};
