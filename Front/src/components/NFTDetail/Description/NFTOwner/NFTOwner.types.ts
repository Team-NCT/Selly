export interface NFTOwnerProps {
  /**
   * NFT 소유자 uid
   */
  ownerUid: number;

  /**
   * NFT 소유자 닉네임
   */
  ownerName: string;

  /**
   * NFT 소유자 profileImage
   */
  ownerProfileUrl?: string;
}
