import { Meta, Story } from "@storybook/react";
import Card from "./Card";
import { CardProps } from "./Card.types";

export default {
  title: "Common/Card/Card",
  component: Card,
  parameters: {
    componentSubtitle: "이미지 카드 모양 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

Default.args = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
  supply: 10000,
};
