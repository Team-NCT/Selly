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

export interface RevenueType {
  marginRate: number;
  totalAssetValue: number;
  margin: number;
  principal: number;
}

export interface SettingsType {
  userId: number;
  wallet: string;
  nickname: string;
  image: string;
  banner: string;
  introduction: string;
}

export interface FetchSettingsType {
  data: {
    nickname: string;
    image: string;
    banner: string;
    introduction: string;
  };
  userId: number;
}
