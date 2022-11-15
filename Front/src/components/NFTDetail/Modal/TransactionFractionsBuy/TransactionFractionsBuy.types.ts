export interface TransactionFractionsBuyProps {
  /**
   * 작품 Id
   */
  articleId: number;

  /**
   * 유저 Id
   */
  userId: number | undefined | null;

  /**
   * wallet
   */
  address: string | null;
}
