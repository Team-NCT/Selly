import { Meta, Story } from "@storybook/react";
import CardList from "./CardList";
import { CardListProps } from "./CardList.types";

export default {
  title: "Common/Card/CardList",
  component: CardList,
  parameters: {
    componentSubtitle: "카드 리스트: CardListItem Props 참고",
  },
  argTypes: {},
} as Meta;

export const Default: Story<CardListProps> = (args) => (
  <main>
    <CardList {...args} />
  </main>
);

const defaultProps = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
  id: 1,
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
