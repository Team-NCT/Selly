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
  articleId: number;
  buyerId: number;
  wallet: string;
  sellerId: number;
  pieceCnt: number;
  tradePrice: number;
  saleContractAddress: string;
}

export interface RegisterSellNFTFractionType {
  seller: number;
  wallet: string;
  tokenId: string;
  contractAddress: string;
  tradePrice: number;
  pieceCnt: number;
  ownershipContractAddress: string;
}
