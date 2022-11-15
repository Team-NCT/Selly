import { TransactionFractionsBuyProps } from "../";

export interface inputType {
  value: string;
  status: boolean;
  buttonStatus: boolean;
  errorMessage: string;
}

export interface inputAction {
  type: "MAX_ERROR" | "ZERO_ERROR" | "DECIMAL_ERROR" | "DECIMAL_FOUR_ERROR" | "NORMAL" | "RESET";
  payload: string;
}

export interface TransactionFractionsSellProps extends TransactionFractionsBuyProps {
  /**
   * 토큰 ID
   */
  tokenId: string;

  /**
   * 컨트랙트 어드레스
   */
  contractAddress: string;

  /**
   * 금고 컨트렉트 어드레스
   */
  ownershipContractAddress?: string;
}
