export interface F_NFTSaleType {
  contractAddress: string;
  ownershipContractAddress: string;
  tokenId: string;
  seller: number;
  pieceCnt: string;
  tradePrice: number;
  category: string;
  wallet: string;
  metaDataUrl: string | undefined;
  articleImgUrl: string | undefined;
  articleName: string;
}
