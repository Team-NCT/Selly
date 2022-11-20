export interface CardProps {
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
