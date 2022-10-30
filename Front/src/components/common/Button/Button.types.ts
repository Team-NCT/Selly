export const ButtonBG = [
  "primary",
  "ocean",
  "navy",
  "danger",
  "white",
  "disabled",
  "none",
] as const;
export type ButtonBGType = typeof ButtonBG[number];

export type ButtonSizeType = "default" | "small" | "xsmall";

export type ButtonColorType = "black" | "white";

export type ButtonFillContainer = "true" | "false";

export interface ButtonProps {
  /**
   * 텍스트
   */
  children: React.ReactNode;

  /**
   * 버튼 배경색
   */
  bg: ButtonBGType;

  /**
   * 버튼 크기
   */
  size: ButtonSizeType;

  /**
   * 버튼 글씨 색
   */
  color: ButtonColorType;

  /**
   * 버튼 Fill Container
   */
  fillContainer: ButtonFillContainer;

  /**
   * 버튼 함수
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
