// interface SelectCardItemProps {
//   url: string;
//   title: string;
// }

// TODO_YK: alchemy 깃헙에서 type 가져오기
export interface SelectCardListProps {
  /**
   * 사이트에서 SelectCard에 나타낼 때 필요한 NFT의 데이터 리스트
   */
  data: any[];
  /**
   * 디폴트로 선택해놓고 싶은 idx 값
   */
  defaultSelectedIdx: number;
}
