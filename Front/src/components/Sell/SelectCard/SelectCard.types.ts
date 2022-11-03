export interface SelectCardProps {
  /**
   * NFT 이미지 url
   */
  url: string;

  /**
   * NFT 제목
   */
  title: string;

  /**
   * 선택 상태
   */
  isSelected: boolean;

  /**
   * SelectCardList에 들어있는 인덱스 순서
   */
  idx: number;

  /**
   * 클릭했을 때 클릭한 카드의 데이터를 받아올 함수
   */
  setValue: (idx: number) => void;
}
