import { stepType } from "@/pages/Sell/Sell";

export interface SellInfoFormProps {
  step: stepType;
  changeStep: (step: stepType) => void;
}
