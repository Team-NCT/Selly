import { CardListItemProps } from "@/components/common/CardListItem/CardListItem.types";

export interface CardListProps {
  /**
   * NFT 카드 객체의 리스트: {url, title, id, supply}의 배열 (required)
   */
  data: CardListItemProps[];
}
