export interface fetchUserProfileParamsData {
  profileId: number;
  userId: number;
}

export interface followDataType {
  followerId: number;
  followingId: number;
}

export interface cardType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
}

export interface DescCardType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
  recentMarketPrice?: string;
  articleMargin?: string;
  pieceCnt?: number;
}

export interface ArtistRankingType {
  userId: number;
  nickname: string;
  image: string;
  certification: boolean;
  wallet: string;
  followerCnt: number;
  nftCnt: number;
}
