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

export interface NFTCardDataType {
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
   * 현재 구매할 수 있는 조각 개수
   */
  presentSalePieceCnt?: number;
}

export interface NFTFractionHistoryType {
  date: string;
  avgPrice: number;
  lowPrice: number;
  maxPrice: number;
}

export interface NFTFractionHistoryListType {
  historyList: NFTFractionHistoryType[];
  avgPrice: number;
}

export interface CardType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
}

export interface DescCardType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
  recentMarketPrice: number;
  articleMargin: number;
  pieceCnt: number;
}
