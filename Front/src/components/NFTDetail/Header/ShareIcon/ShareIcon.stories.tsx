import { Meta, Story } from "@storybook/react";
import ShareIcon from "./ShareIcon";
import { ShareDropDownProps } from "../ShareDropDown/ShareDropDown.types";

export default {
  title: "NFTDetail/Header/ShareIcon",
  component: ShareIcon,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 헤더에 위치한 공유하기 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<ShareDropDownProps> = (args) => <ShareIcon {...args} />;

Default.args = {
  id: 1,
  title: "좀비와 함께 춤을",
  url: "https://naver.com/",
  imageUrl:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
};
