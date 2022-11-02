import { Meta, Story } from "@storybook/react";
import NFTDetailHeader from "./NFTDetailHeader";
import { NFTDetailHeaderProps } from "./NFTDetailHeader.types";

export default {
  title: "NFTDetail/Header/NFTDetailHeader",
  component: NFTDetailHeader,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 헤더",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDetailHeaderProps> = (args) => <NFTDetailHeader {...args} />;

Default.args = {
  title: "좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을",
  id: 1,
  imageUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  favoriteStatus: true,
  url: "https://www.naver.com",
};
