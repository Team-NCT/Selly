export interface fetchUserProfileParamsData {
  profileId: number;
  userId: number;
}

export interface followDataType {
  followerId: number;
  followingId: number;
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

export interface ArtistRankingType {
  userId: number;
  nickname: string;
  image: string;
  certification: boolean;
  wallet: string;
  followerCnt: number;
  nftCnt: number;
}
