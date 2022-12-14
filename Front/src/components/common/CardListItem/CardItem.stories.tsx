import { Meta, Story } from "@storybook/react";
import CardListItem from "./CardListItem";
import { NFTCardDataType } from "@/types/NFTData.types";

export default {
  title: "Common/Card/CardListItem",
  component: CardListItem,
  parameters: {
    componentSubtitle: "카드 리스트에 사용되는 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTCardDataType> = (args) => <CardListItem {...args} />;

Default.args = {
  articleImgUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  articleName: "좀비와 함께 춤을",
  articleId: 1,
  presentSalePieceCnt: 10000,
};
