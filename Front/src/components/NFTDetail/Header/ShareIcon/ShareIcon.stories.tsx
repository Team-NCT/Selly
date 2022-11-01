import { Meta, Story } from "@storybook/react";
import ShareIcon from "./ShareIcon";

export default {
  title: "NFTDetail/Header/ShareIcon",
  component: ShareIcon,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 헤더에 위치한 공유하기 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story = (args) => <ShareIcon {...args} />;

Default.args = {
  url: "https://naver.com/",
};
