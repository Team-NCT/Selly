interface SelectCardItemProps {
  url: string;
  title: string;
}

export interface SelectCardListProps {
  /**
   * 사이트에서 SelectCard에 나타낼 때 필요한 NFT의 데이터 리스트
   */
  data: SelectCardItemProps[];

  /**
   * 클릭했을 때 클릭한 카드의 데이터를 받아올 함수
   */
  setNFTValue: (idx: number) => void;
}
