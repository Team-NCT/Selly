import { DescCardProps } from "@/components/common/DescCard/DescCard.types";

export interface DescCardListItemProps extends DescCardProps {
  /**
   * 클릭 시, 이동할 url 정보를 위한 NFT id (required)
   */
  id: string;
}
