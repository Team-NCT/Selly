import { TransactionAuctionProps } from "@/components/NFTDetail/Transaction";

export type TabType = "AUCTION" | "FRACTION";
export interface NFTDetailTransactionProps {
  auction: TransactionAuctionProps;
}
