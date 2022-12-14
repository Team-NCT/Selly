export const RadioBG = ["primary", "ocean", "blackberry", "danger"] as const;
export type RadioBGType = typeof RadioBG[number];

export interface RadioListProps {
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
  bg?: RadioBGType;

  /**
   * 기본 checked로 넣을 default 값
   */
  defaultValue?: string;

  /**
   * onChange = (e) => {setState(e.target.value)}
   */
  onChange: React.FormEventHandler;
}
