import { NeonNumberType } from "../Neon/Neon.types";

export interface DescCardProps {
  /**
   * NFT 이미지 url
   */
  articleImgUrl: string;

  /**
   * NFT 제목
   */
  articleName: string;

  /**
   * NFT 최근 거래 가격
   */
  recentMarketPrice: NeonNumberType;

  /**
   * NFT 증감율
   */
  rateChange?: number;

  /**
   * 조각 수
   */
  pieceCnt?: number;
}
