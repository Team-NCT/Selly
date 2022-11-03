interface NFTDetailHistoryType {
  date: string;
  average: number;
  lowest: number;
  highest: number;
}

export interface NFTDetailHistoryProps {
  /**
   * NFT 거래 내역 리스트
   */
  transactionHistory: NFTDetailHistoryType[];

  /**
   * 전체 기간의 평균 거래가
   */
  totalAverage: number;
}
