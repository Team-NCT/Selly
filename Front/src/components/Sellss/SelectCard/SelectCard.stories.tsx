import { Meta, Story } from "@storybook/react";
import SelectCard from "./SelectCard";
import { SelectCardProps } from "./SelectCard.types";

export default {
  title: "Sell/SelectCard/SelectCard",
  component: SelectCard,
  parameters: {
    componentSubtitle: "NFT 선택 카드",
  },
  argTypes: {},
} as Meta;

export const Default: Story<SelectCardProps> = (args) => <SelectCard {...args} />;

Default.args = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
  isSelected: false,
};
