export interface NFTDetailsProps {
  /**
   * NFT 컨트랙트 주소
   */
  contractAddress: string;

  /**
   * NFT초기 발행 조각 수
   */
  primaryCnt?: number;

  /**
   * NFT 토큰 아이디
   */
  tokenId: string;
}
