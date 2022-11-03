export interface ShareDropDownProps {
  /**
   * NFT 제목
   */
  title: string;

  /**
   * NFT를 식별하기 위한 ID
   */
  id: number;

  /**
   * NFT Image URL
   */
  imageUrl: string;

  /**
   * 연결 링크로 이동 클릭 시, 이동 해야 하는 url
   */
  url?: string;
}
