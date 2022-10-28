import { Meta, Story } from "@storybook/react";
import Card from "./Card";
import { CardProps } from "./Card.types";

export default {
  title: "Common/Card",
  component: Card,
  parameters: {
    componentSubtitle: "이미지 카드 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;
