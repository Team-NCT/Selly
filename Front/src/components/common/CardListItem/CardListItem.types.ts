import { CardProps } from "@/components/common/Card/Card.types";

export interface CardListItemProps extends CardProps {
  /**
   * 클릭 시, 이동할 url 정보를 위한 NFT id (required)
   */
  id: number;
}
