export type TabType = "AUCTION" | "FRACTION";
export interface NFTDetailTransactionProps {
  /**
   * 작품 Id
   */
  articleId: number;

  /**
   * 유저 Id
   */
  userId: number | undefined | null;
}
