import { Meta, Story } from "@storybook/react";
import DescCard from "./DescCard";
import { DescCardProps } from "./DescCard.types";

export default {
  title: "Common/DescCard/DescCard",
  component: DescCard,
  parameters: {
    componentSubtitle: "NFT 설명 카드",
  },
  argTypes: {},
} as Meta;

export const Default: Story<DescCardProps> = (args) => <DescCard {...args} />;

Default.args = {
  articleImgUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  articleName: "좀비와 함께 춤을",
  recentMarketPrice: 12.0025,
  rateChange: 20.2525,
  pieceCnt: 17,
};
