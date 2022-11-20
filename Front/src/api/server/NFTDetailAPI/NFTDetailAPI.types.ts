import { UserType } from "@/types/user.type";

export interface NFTDetailDataType {
  user: UserType;
  article: {
    tokenId: string;
    metaDataUrl: string;
    articleImgUrl: string;
    contractAddress: string;
    primaryCnt?: number;
    ownershipContractAddress?: string;
  };
}
