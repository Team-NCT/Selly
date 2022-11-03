import { Meta, Story } from "@storybook/react";
import NFTDetails from "./NFTDetails";
import { NFTDetailsProps } from "./NFTDetails.types";

export default {
  title: "NFTDetail/Description/NFTDetail",
  component: NFTDetails,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: NFT Details ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDetailsProps> = (args) => (
  <div style={{ width: "400px" }}>
    <NFTDetails {...args} />
  </div>
);

Default.args = {
  contractAddress: "0xc23cC06e0FCF0382cCc7fe399a08E045de6925dF",
  primaryCnt: 1,
  tokenId: "9860",
};
