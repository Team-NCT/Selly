import { ChangeEventHandler } from "react";

export interface NumberInputProps {
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
  handleValueChange: ChangeEventHandler<HTMLElement & { value: string }>;

  /**
   * Input 상태: true(정상), false(에러)
   */
  status: boolean;

  /**
   * Input 이름
   */
  name?: string;

  /**
   * 최대 값
   */
  max?: number;

  /**
   * 최소 값
   */
  min?: number;

  /**
   * 입력할 수 있는 숫자들 사이의 간격
   */
  step?: number;

  /**
   * Input이 비어있을 때 나타나는 내용
   */
  placeHolder?: string;

  /**
   * status가 false면 보여줄 에러 메시지
   */
  errorMessage?: string;

  /**
   * disabled 상태
   */
  disabled?: boolean;
}
