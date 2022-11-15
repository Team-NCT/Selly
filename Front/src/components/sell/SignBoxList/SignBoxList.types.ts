import { functionProps } from "../SignBox/SignBox.types";

interface SignBoxItemProps {
  title: string;
  desc: string;
  signFunction: (({}: functionProps) => Promise<boolean>) | null; // 각 서명 박스에 들어갈 함수
}

export interface SignBoxListProps {
  /**
   * 사이트에서 서명 박스를 나타낼 때 필요한 데이터 리스트
   */
  data: SignBoxItemProps[];
  setShowDialog: (status: boolean) => void;
}
