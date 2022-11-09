export const DropdownBG = ["primary", "ocean", "danger"] as const;
export type DropdownBGType = typeof DropdownBG[number];

export interface DropdownListProps {
  /**
   * DropdownList 안에 들어갈 목록
   */
  list: Array<string>;

  /**
   * DropdownList 의 카테고리 명
   */
  category: string;

  /**
   * Dropdown 배경색
   */
  bg?: DropdownBGType;

  /**
   * onChange = (e) => {setState(e.target.value)}
   */
  onChange?: React.FormEventHandler;

  /**
   * 처음 선택될 옵션
   */
  defualtValue?: string;
}
