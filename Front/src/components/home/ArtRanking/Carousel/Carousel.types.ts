interface CarouselType {
  /**
   * 클릭 시, 이동할 url 정보를 위한 NFT id (required)
   */
  id: number;

  /**
   * NFT 이미지 URL
   */
  url: string;

  /**
   * NFT 제목
   */
  title: string;

  /**
   * NFT 판매 개수
   */
  supply: number;
}

export type CarouselProps = { data: CarouselType[] };
