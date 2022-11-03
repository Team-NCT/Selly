import { Meta, Story } from "@storybook/react";
import NFTDescription from "./NFTDescription";
import { NFTDescriptionProps } from "./NFTDescription.types";

export default {
  title: "NFTDetail/Description/NFTDescription",
  component: NFTDescription,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명: NFT 디스크립션 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDescriptionProps> = (args) => (
  <div style={{ width: "400px" }}>
    <NFTDescription {...args} />
  </div>
);

Default.args = {
  description:
    "좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.",
};
