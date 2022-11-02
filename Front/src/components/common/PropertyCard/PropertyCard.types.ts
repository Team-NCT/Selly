export interface PropertyCardProps {
  /**
   * property의 타입
   */
  type: string;
  /**
   * property의 이름
   */
  name: string;
  /**
   * PropertyCard가 사용되는 곳에 따른 height
   * create에선 80px, detail에선 60px
   */
  height?: "create" | "detail";
}
