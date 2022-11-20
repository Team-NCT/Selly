import { Meta, Story } from "@storybook/react";
import NFTDetailHistory from "./NFTDetailHistory";

export default {
  title: "NFTDetail/History/NFTDetailHistory",
  component: NFTDetailHistory,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 거래 기록 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<{ articleId: number }> = (args) => (
  <div style={{ maxWidth: "600px" }}>
    <NFTDetailHistory {...args} />
  </div>
);

Default.args = {
  articleId: 1,
};
