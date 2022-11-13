export interface SignedTransactionType {
  nonce: number;
  from: string;
  to: string;
  data: string;
}

export interface PayableSignedTransactionType {
  nonce: number;
  from: string;
  to: string;
  data: string;
  value: string;
}
