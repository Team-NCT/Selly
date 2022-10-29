export interface CardListItemProps {
  /**
   * NFT 이미지 URL (required)
   */
  url: string;

  /**
   * NFT 제목 (required)
   */
  title: string;

  /**
   * 클릭 시, 이동할 url (required)
   */
  href: string;

  /**
   * NFT 판매 개수
   */
  supply?: number;
}
