export interface TextInputProps {
  /**
   * Input을 식별하기 위한 고유한 ID  ex) profile-nickname-input
   */
  id: string;

  /**
   * Input 상태: true(정상), false(에러)
   */
  status: boolean;

  /**
   * 최대 글자 수
   */
  maxLength: number;

  /**
   * 최소 글자 수
   */
  minLength?: number;

  /**
   * Input이 비어있을 때 나타나는 내용
   */
  placeHolder?: string;
}
