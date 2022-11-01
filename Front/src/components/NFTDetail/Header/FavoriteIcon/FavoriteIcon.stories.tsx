import { Meta, Story } from "@storybook/react";
import FavoriteIcon from "./FavoriteIcon";
import { FavoriteIconProps } from "./FavoriteIcon.types";

export default {
  title: "NFTDetail/Header/FavoriteIcon",
  component: FavoriteIcon,
  parameters: {
    componentSubtitle: "NFT 상세 페이지 헤더에 위치한 즐겨찾기 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<FavoriteIconProps> = (args) => <FavoriteIcon {...args} />;

Default.args = {
  favoriteStatus: true,
};
