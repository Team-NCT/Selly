export const DropdownBG = ["primary", "ocean", "danger"] as const;
export type DropdownBGType = typeof DropdownBG[number];

export interface DropdownItemProps {
  /**
   * 텍스트
   */
  value: string;

  /**
   * 카테고리
   */
  category: string;

  /**
   * 호버 배경색
   */
  bg?: DropdownBGType;
}
