export const RadioBG = ["primary", "ocean", "blackberry", "danger"] as const;
export type RadioBGType = typeof RadioBG[number];

export interface RadioProps {
  /**
   * value
   */
  value: string;

  /**
   * 카테고리
   */
  category: string;

  /**
   * Radio 배경색
   */
  bg?: RadioBGType;

  /**
   * checked 상태
   */
  isChecked?: boolean;
}
