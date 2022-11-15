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
  recentMarketPrice: number | null;

  /**
   * NFT 증감율
   */
  rateChange?: number | null;
}

export interface NFTFractionHistoryType {
  date: string;
  average: number;
  lowest: number;
  highest: number;
}

export interface NFTFractionHistoryListType {
  historyList: NFTFractionHistoryType[];
  avgPrice: number;
}
