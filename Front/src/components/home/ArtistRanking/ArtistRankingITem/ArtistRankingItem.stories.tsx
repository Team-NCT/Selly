import { Meta, Story } from "@storybook/react";
import ArtistRankingItem from "./ArtistRankingItem";

export default {
  title: "Home/ArtistRanking/ArtistRankingItem",
  component: ArtistRankingItem,
  parameters: {
    componentSubtitle: "아티스트 랭킹 아이템 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <ArtistRankingItem />;

Default.args = {};
