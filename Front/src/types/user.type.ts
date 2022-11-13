export interface UserProfileType {
  userId: number;
  wallet: string;
  nickname: string;
  introduction: string;
  image: string;
  banner: string;
  followerCnt: number;
  followingCnt: number;
  myFollowing?: boolean;
}
