import { Meta, Story } from "@storybook/react";
import { ArtistRankingProps } from "./AritstRankingItem.type";
import ArtistRankingItem from "./ArtistRankingItem";

export default {
  title: "Home/ArtistRanking/ArtistRankingItem",
  component: ArtistRankingItem,
  parameters: {
    componentSubtitle: "아티스트 랭킹 아이템 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<ArtistRankingProps> = (args) => <ArtistRankingItem {...args} />;

Default.args = {
  userId: 1,
  nickname: "RenJun",
  image:
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjVfMjM3%2FMDAxNjYxNDMxNzkyNDQ3.XFn0xxdsMX1bwa_aftpCDbB5bBk6N-5p-iLqalTFoKwg.1XuRs8gP33ATBAveQzrffmYBdjoVrMsbMyU3eeMfb6Eg.JPEG.lhm11o1%2FIMG_9841.JPG&type=a340",
  certification: true,
  wallet: "0xc42d1449259b62CB93a079658640ba7dB6AD0D13",
  followerCnt: 323,
  nftCnt: 825,
  rank: 1,
};
