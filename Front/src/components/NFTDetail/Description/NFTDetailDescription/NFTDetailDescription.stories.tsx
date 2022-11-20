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
  user: { nickname: "김김작가작가작가작가작가", userId: 1, certification: false },
  contractAddress: "0xc23cC06e0FCF0382cCc7fe399a08E045de6925dF",
  tokenId: "9860",
  metaData: {
    name: "좀비와 함꼐 춤을",
    external_url: "www.naver.com",
    description:
      "좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.좀비와 함께 춤을 추면서, 취업을 기원하는 작품입니다.",
    attributes: [
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
  },
};
