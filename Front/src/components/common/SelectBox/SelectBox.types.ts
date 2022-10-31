export const SelectBoxBG = ["primary", "ocean", "danger"] as const;
export type SelectBoxBGType = typeof SelectBoxBG[number];

export interface SelectBoxProps {
  /**
   * SelectBox 안에 들어갈 목록
   */
  list: Array<string>;

  /**
   * SelectBox 의 카테고리 명
   */
  category: string;

  /**
   * SelectBox 배경색
   */
  bg?: SelectBoxBGType;

  /**
   * onChange = (e) => {setState(e.target.value)}
   */
  onChange: React.FormEventHandler;
}
