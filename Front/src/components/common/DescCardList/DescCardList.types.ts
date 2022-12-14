import { NFTDescCardDataType } from "@/types/NFTData.types";

export interface DescCardListProps {
  /**
   * NFT 설명 카드 객체의 리스트: {url, title, price, profit, id}의 배열
   */
  data: NFTDescCardDataType[];
}
