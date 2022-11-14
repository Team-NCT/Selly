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
  recentMarketPrice: number;
  articleMargin: number;
  pieceCnt: number;
}
