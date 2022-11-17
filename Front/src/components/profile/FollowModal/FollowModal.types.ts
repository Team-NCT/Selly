export type TabType = "FOLLOWER" | "FOLLOWING";

export interface FollowModalProps {
  type: TabType;
  nickname: string | undefined;
  profilePageId: number;
}
