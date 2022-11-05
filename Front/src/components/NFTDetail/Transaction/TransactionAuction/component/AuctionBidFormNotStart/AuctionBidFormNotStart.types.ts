export interface AuctionBidFormNotStartProps {
  /**
   * 경매 최소 시작 가
   */
  lowPrice: number;

  /**
   * 해당 유저가 조각을 50%이상 가지고 있는 지 여부
   */
  auctionStatus: boolean;
}
