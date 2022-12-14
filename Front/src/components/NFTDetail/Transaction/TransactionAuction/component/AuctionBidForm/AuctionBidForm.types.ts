export interface AuctionBidFormProps {
  /**
   * 현재 입찰가
   */
  bidPrice: number;

  /**
   * 해당 유저가 조각을 50%이상 가지고 있는 지 여부
   */
  auctionStatus: boolean;

  /**
   * 경매 종료 시간
   */
  auctionEndTime: string;
}
