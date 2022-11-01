export interface NFTDetailHeaderProps {
  /**
   * NFT 제목
   */
  title: string;

  /**
   * NFT Image URL
   */
  imageUrl: string;

  /**
   * NFT를 즐겨찾기 했는지 여부 (true: 즐겨찾기 , false: 즐겨찾기 하지 않았음)
   */
  favoriteStatus: boolean;

  /**
   * NFT 연결 링크 url
   */
  url?: string;
}
