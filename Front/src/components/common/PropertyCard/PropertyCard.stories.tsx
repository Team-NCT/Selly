import { Meta, Story } from "@storybook/react";
import PropertyCard from "./PropertyCard";
import { PropertyCardProps } from "./PropertyCard.types";

export default {
  title: "Common/PropertyCard",
  component: PropertyCard,
  parameters: {
    componentSubtitle: "PropertyCard 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<PropertyCardProps> = (args) => <PropertyCard {...args} />;

Default.args = {
  type: "head",
  name: "대머리",
  height: "create",
};
