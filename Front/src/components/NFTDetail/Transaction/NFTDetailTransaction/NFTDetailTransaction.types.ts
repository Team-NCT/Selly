import { TransactionAuctionProps } from "@/components/NFTDetail/Transaction";

export type tapType = "AUCTION" | "FRACTION";
export interface NFTDetailTransactionProps {
  auction: TransactionAuctionProps;
}
