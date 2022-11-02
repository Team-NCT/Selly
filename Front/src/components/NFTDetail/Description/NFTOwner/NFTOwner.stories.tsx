import { Meta, Story } from "@storybook/react";
import NFTOwner from "./NFTOwner";
import { NFTOwnerProps } from "./NFTOwner.types";

export default {
  title: "NFTDetail/Description/NFTOwner",
  component: NFTOwner,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: NFT 소유자 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTOwnerProps> = (args) => <NFTOwner {...args} />;

Default.args = {
  ownerName: "김김작가작가작가작가작가",
  ownerUid: 1,
};
