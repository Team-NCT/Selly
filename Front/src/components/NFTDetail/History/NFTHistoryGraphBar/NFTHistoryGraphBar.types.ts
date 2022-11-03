import { MouseEvent } from "react";
export interface NFTHistoryGraphBarProps {
  /**
   * 거래 내역 바 그래프의 높이
   */
  height: number;

  /**
   * 거래 내역 바를 마우스 호버 했을 때, 실행하는 함수
   */
  handleMouseOver: () => void;
}
