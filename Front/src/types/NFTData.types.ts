export interface NFTDescCardDataType {
  /**
   * 클릭 시, 이동할 url 정보를 위한 NFT id (required)
   */
  articleId: number;

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
  recentMarketPrice: number;

  /**
   * NFT 증감율
   */
  rateChange?: number;

  /**
   * 조각 수
   */
  pieceCnt?: number;
}
