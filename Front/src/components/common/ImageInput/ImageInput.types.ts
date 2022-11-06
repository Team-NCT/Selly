export const ImageInputStyleType = ["round", "square"] as const;

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
   * 이미지 파일이 업로드 될때, 실행하는 함수
   */
  handleInputChange: (arg: File) => void;

  /**
   * 미리보기 이미지 url
   */
  imageUrl: string;

  /**
   * 이미지가 보이는 공간 스타일
   */
  styles?: typeof ImageInputStyleType[number];

  /**
   * Input 상태: true(정상), false(에러)
   */
  status?: boolean;

  /**
   * status가 false면 보여줄 에러 메시지
   */
  errorMessage?: string;
}
