import { Meta, Story } from "@storybook/react";
import NFTDetailDescription from "./NFTDetailDescription";
import { NFTDetailDescriptionProps } from "./NFTDetailDescription.types";

export default {
  title: "NFTDetail/Description/NFTDetailDescription",
  component: NFTDetailDescription,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 설명 ",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NFTDetailDescriptionProps> = (args) => (
  <main>
    <div style={{ width: "50%" }}>
      <NFTDetailDescription {...args} />
    </div>
  </main>
);

Default.args = {
  nickname: "김김작가작가작가작가작가",
  originalAuthor: 1,
  contractAddress: "0xc23cC06e0FCF0382cCc7fe399a08E045de6925dF",
  primaryCnt: 1,
  tokenId: "9860",
  description:
    "좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.",
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
