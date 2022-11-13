import { UserType } from "@/types/user.type";

export interface NFTDetailDataType {
  user: UserType;
  article: {
    tokenId: number;
    ownershipContractAddress: string;
    metaDataUrl: string;
    articleImgUrl: string;
    contractAddress: string;
  };
}
