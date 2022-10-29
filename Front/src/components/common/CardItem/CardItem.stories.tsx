import { Meta, Story } from "@storybook/react";
import CardItem from "./CardItem";
import { CardItemProps } from "./CardItem.types";

export default {
  title: "Common/CardItem",
  component: CardItem,
  parameters: {
    componentSubtitle: "이미지 카드 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<CardItemProps> = (args) => <CardItem {...args} />;

Default.args = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
  href: "#",
  supply: 10000,
};
