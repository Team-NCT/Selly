interface SelectCardItemProps {
  url: string;
  title: string;
}

export interface SelectCardListProps {
  /**
   * 사이트에서 SelectCard에 나타낼 때 필요한 NFT의 데이터 리스트
   */
  data: SelectCardItemProps[];
}
