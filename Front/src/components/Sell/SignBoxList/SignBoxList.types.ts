interface SignBoxItemProps {
  title: string;
  desc: string;
  // TODO_YK: 각 서명 박스에 해당하는 컨트랙트 함수의 타입으로 바꿀 것
  signFunction: () => void; // 각 서명 박스에 들어갈 함수
}

export interface SignBoxListProps {
  /**
   * 사이트에서 서명 박스를 나타낼 때 필요한 데이터 리스트
   */
  data: SignBoxItemProps[];
}
