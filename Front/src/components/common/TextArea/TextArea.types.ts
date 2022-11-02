import { ChangeEventHandler } from "react";

export interface TextAreaProps {
  /**
   * Input을 식별하기 위한 고유한 ID  ex) profile-nickname-input
   */
  id: string;

  /**
   * const [value, handleInputChange] = useInputState()의 value를 넘기면 된다.
   */
  value: string;

  /**
   * const [value, handleInputChange] = useInputState()의 handleInputChange를 넘기면 된다.
   * 만약 유효성 검사를 한다면, useInputState("", 유효성 검사 함수)
   */
  handleInputChange: ChangeEventHandler<HTMLElement & { value: string }>;
  /**
   * 최대 글자 수
   */
  maxLength: number;
  /**
   * Input이 비어있을 때 나타나는 내용
   */
  placeHolder?: string;
}
