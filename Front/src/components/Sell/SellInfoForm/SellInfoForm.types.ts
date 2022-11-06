import { stepType } from "@/pages/SellPage/Sell";

export interface SellInfoFormProps {
  step: stepType;
  changeStep: (step: stepType) => void;
}
