interface FollowItem {
  userId: number;
  wallet: string;
  image: string;
  nickname: string;
  myFollowing: boolean;
}

export interface FollowProps {
  data: FollowItem;
}
