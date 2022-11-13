export interface NFTDetailHeaderProps {
  /**
   * NFT 제목
   */
  title: string;

  /**
   * NFT를 식별하기 위한 ID
   */
  id: number;

  /**
   * userId
   */
  userId: number | undefined | null;

  /**
   * NFT Image URL
   */
  imageUrl: string;

  /**
   * NFT 연결 링크 url
   */
  url?: string;
}
