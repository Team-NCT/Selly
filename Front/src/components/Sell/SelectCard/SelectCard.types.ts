// selectNFT의 필요한 정보를 저장할 타입
import { SelectNFTState } from "@/store/selectNFTSlice";

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
   * 클릭했을 때 클릭한 선택된 카드의 idx를 저장할 변수
   */
  setValue: (idx: number) => void;
}
