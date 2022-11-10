import { Meta, Story } from "@storybook/react";
import SelectCardList from "./SelectCardList";
import { SelectCardListProps } from "./SelectCardList.types";

export default {
  title: "Sell/SelectCard/SelectCardList",
  component: SelectCardList,
  parameters: {
    componentSubtitle: "NFT 선택 카드 리스트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<SelectCardListProps> = (args) => <SelectCardList {...args} />;

const defaultProps = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
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
