export interface CardProps {
  /**
   * NFT 이미지 URL (required)
   */
  url: string;

  /**
   * NFT 제목 (required)
   */
  title: string;

  /**
   * NFT 판매 개수
   */
  supply?: number;
}
