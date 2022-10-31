export interface ImageInputProps {
  /**
   * Input을 식별하기 위한 고유한 ID  ex) profile-nickname-input
   */
  id: string;

  /**
   * 이미지 용량 제한 (mb기준)
   */
  limit: number;

  /**
   * 미리보기 이미지 url (보여줘야하는 이미지가 미리 있을 경우에 지정)
   */
  url?: string;
}
