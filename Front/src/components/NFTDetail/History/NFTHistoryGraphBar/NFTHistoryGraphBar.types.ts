import { MouseEvent } from "react";
export interface NFTHistoryGraphBarProps {
  /**
   * 거래 내역 바 그래프의 높이
   */
  height: number;

  /**
   * 거래 발생 날짜
   */
  date: string;

  /**
   * 거래 내역 평균 값
   */
  average: number;

  /**
   * 최고가
   */
  highest: number;

  /**
   * 최저가
   */
  lowest: number;
}
