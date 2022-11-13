export interface functionProps {
  CA: string;
  tokenId: string;
  num: string;
  articleName: string;
  code: string;
  F_NFTCA: string;
  setValue: ((value: string) => void) | undefined;
  userWallet: string;
}

export interface SignBoxProps {
  /**
   * 서명 박스의 제목
   */
  title: string;

  /**
   * 서명 박스의 설명
   */
  desc: string;

  /**
   * 서명 박스 리스트의 순서
   */
  idx: number;

  /**
   * 서명 박스가 본인의 차례인지 나타내주는 상태
   */
  isActive: boolean;

  /**
   * 각 서명 박스에 들어갈 함수
   */
  signFunction: ({}: functionProps) => Promise<boolean>;

  /**
   * 클릭했을 때 다음 박스로 넘어가도록 하는 함수
   */
  goNext: (idx: number) => void;
  setValue?: (value: string) => void;
}
