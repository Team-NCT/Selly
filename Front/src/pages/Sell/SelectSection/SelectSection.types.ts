import { stepType } from "@/pages/Sell/Sell";

export interface SelectSectionProps {
  datas: Array<any> | null;
  changeStep: (step: stepType) => void;
}
// TODO_YK: alchemy 깃헙에서 type 가져오기!!
