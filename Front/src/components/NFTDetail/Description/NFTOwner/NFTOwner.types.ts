export interface NFTOwnerProps {
  /**
   * NFT 소유자 uid
   */
  originalAuthor: number;

  /**
   * NFT 소유자 닉네임
   */
  nickname: string;

  /**
   * NFT 소유자 profileImage
   */
  image?: string;

  certification: boolean;
}
