import { Meta, Story } from "@storybook/react";
import NFTDetailHistory from "./NFTDetailHistory";
import { NFTDetailHistoryProps } from "./NFTDetailHistory.types";

export default {
  title: "NFTDetail/History/NFTDetailHistory",
  component: NFTDetailHistory,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 거래 기록 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDetailHistoryProps> = (args) => (
  <div style={{ maxWidth: "600px" }}>
    <NFTDetailHistory {...args} />
  </div>
);

Default.args = {
  transactionHistory: [
    { date: "2022-10-31 14:51:24.585196", average: 0.0025, lowest: 0.0025, highest: 0.0025 },
    { date: "2022-10-30 14:51:24.585196", average: 0.001, lowest: 0.0025, highest: 0.0025 },
    { date: "2022-10-29 14:51:24.585196", average: 0.003, lowest: 0.0025, highest: 0.0025 },
    { date: "2022-10-28 14:51:24.585196", average: 0.0005, lowest: 0.0025, highest: 0.0025 },
    { date: "2022-10-27 14:51:24.585196", average: 0.005, lowest: 0.0025, highest: 0.0025 },
  ],
  totalAverage: 0.0025,
};
