interface ArtistRankingItemProps {
  userId: number;
  nickname: string;
  image: string;
  isAuth: boolean;
  wallet: string;
  followerCnt: number;
  NFTCnt: number;
}

export interface ArtistRankingListProps {
  artistRankingList: ArtistRankingItemProps[];
}
