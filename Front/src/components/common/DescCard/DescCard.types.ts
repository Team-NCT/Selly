export interface DescCardProps {
  /**
   * NFT 이미지 url
   */
  articleImgUrl: string;

  /**
   * NFT 제목
   */
  articleName: string;

  /**
   * NFT 최근 거래 가격
   */
  recentMarketPrice: number | null;

  /**
   * NFT 증감율
   */
  rateChange?: number | null;
}
