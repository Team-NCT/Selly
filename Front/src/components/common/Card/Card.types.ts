import React from "react";

export interface CardProps {
  /**
   * NFT 이미지 URL
   */
  url: string;

  /**
   * NFT 제목
   */
  title: string;

  /**
   * NFT 판매 개수
   */
  supply?: number;

  /**
   * 클릭 이벤트 핸들러
   */
  clickHandler?: () => void;
}
