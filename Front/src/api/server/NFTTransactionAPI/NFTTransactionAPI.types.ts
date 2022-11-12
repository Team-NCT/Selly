export interface NFTFractionRecordType {
  seller: number;
  saleContractAddress: string;
  tradePrice: number;
  pieceCnt: number;
}

export interface RequestDataType {
  articleId: number;
  userId: number;
}

export interface SellNFTFractionType {
  sellerId: number;
  buyerId: number;
}
