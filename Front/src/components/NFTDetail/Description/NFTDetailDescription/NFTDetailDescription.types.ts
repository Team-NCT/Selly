import { UserType } from "@/types/user.type";
import { MetaDataType } from "@/types/metaData.types";

export interface NFTDetailDescriptionProps {
  user: UserType;
  tokenId: string;
  contractAddress: string;
  metaData: MetaDataType;
  primaryCnt?: number;
}
