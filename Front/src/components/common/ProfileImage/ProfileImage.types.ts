export const size = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const;

export interface ProfileImageProps {
  /**
   * 프로필 이미지 url (이미지가 없으면 default 이미지가 적용된다)
   */
  url?: string;

  /**
   * 프로필 이미지 사이즈
   */
  size: typeof size[number];

  /**
   * 프로필 이미지 스타일
   */
  profileStyle: "round" | "square";
}
