import { Meta, Story } from "@storybook/react";
import DescCardList from "./DescCardList";
import { DescCardListProps } from "./DescCardList.types";

export default {
  title: "Common/DescCard/DescCardList",
  component: DescCardList,
  parameters: {
    componentSubtitle: "NFT 설명 카드 리스트: DescCardListItem Props 참고",
  },
  argTypes: {},
} as Meta;

export const Default: Story<DescCardListProps> = (args) => (
  <main>
    <DescCardList {...args} />
  </main>
);

const defaultProps = {
  articleImgUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  articleName: "좀비와 함께 춤을",
  recentMarketPrice: 12.0025,
  rateChange: 20.2525,
  articleId: 1,
};

Default.args = {
  data: [
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
  ],
};
