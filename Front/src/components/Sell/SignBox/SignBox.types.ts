export interface SignBoxProps {
  /**
   * 서명 박스의 제목
   */
  title: string;

  /**
   * 서명 박스의 설명
   */
  desc: string;

  /**
   * 서명 박스 리스트의 순서
   */
  idx: number;
  
  /**
   * 서명 박스가 본인의 차례인지 나타내주는 상태
   */
  isActive: boolean;
}