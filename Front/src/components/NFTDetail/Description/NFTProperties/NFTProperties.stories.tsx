import { Meta, Story } from "@storybook/react";
import NFTProperties from "./NFTProperties";
import { NFTPropertiesProps } from "./NFTProperties.types";

export default {
  title: "NFTDetail/Description/NFTProperties",
  component: NFTProperties,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: NFT 속성 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTPropertiesProps> = (args) => (
  <div style={{ width: "400px" }}>
    <NFTProperties {...args} />
  </div>
);

Default.args = {
  properties: [
    {
      value: "대머리",
      trait_type: "head",
    },
    {
      value: "대머리",
      trait_type: "head",
    },
    {
      value: "대머리",
      trait_type: "head",
    },
    {
      value: "대머리",
      trait_type: "head",
    },
    {
      value: "대머리",
      trait_type: "head",
    },
    {
      value: "대머리",
      trait_type: "head",
    },
  ],
};
