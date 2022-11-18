export interface UserProfileType {
  userId: number;
  wallet: string;
  nickname: string;
  introduction: string;
  image: string;
  banner: string;
  followerCnt: number;
  followingCnt: number;
  certification: boolean;
  myFollowing?: boolean;
}

export interface UserType {
  userId: number;
  nickname: string;
  image?: string;
  certification: boolean;
}

export interface UserFollowType {
  userId: number;
  wallet: string;
  nickname: string;
  image: string;
  myFollowing: boolean;
  certification: boolean;
}
