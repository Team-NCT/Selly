import { stepType } from "@/pages/Sell/Sell";
import { CollectedNFTType } from "@/types/NFTData.types";

export interface SelectSectionProps {
  datas: CollectedNFTType[] | null;
  changeStep: (step: stepType) => void;
  userId: number | null | undefined;
}
