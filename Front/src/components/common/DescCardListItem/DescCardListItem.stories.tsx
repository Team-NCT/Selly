import { Meta, Story } from "@storybook/react";
import DescCardListItem from "./DescCardListItem";
import { NFTDescCardDataType } from "@/types/NFTData.types";

export default {
  title: "Common/DescCard/DescCardListItem",
  component: DescCardListItem,
  parameters: {
    componentSubtitle: "NFT 설명 카드",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDescCardDataType> = (args) => <DescCardListItem {...args} />;

Default.args = {
  articleImgUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  articleName: "좀비와 함께 춤을",
  recentMarketPrice: 12.0025,
  rateChange: 20.2525,
  articleId: 1,
  pieceCnt: 17,
};
