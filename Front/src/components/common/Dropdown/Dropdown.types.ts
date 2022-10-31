export const DropdownBG = ["primary", "ocean", "danger"] as const;
export type DropdownBGType = typeof DropdownBG[number];

export interface DropdownProps {
  /**
   * Radio List안에 들어갈 목록
   */
  list: Array<string>;

  /**
   * Radio List의 카테고리 명
   */
  category: string;

  /**
   * Radio 배경색
   */
  bg?: DropdownBGType;

  /**
   * onChange = (e) => {setState(e.target.value)}
   */
  onChange: React.FormEventHandler;
}
