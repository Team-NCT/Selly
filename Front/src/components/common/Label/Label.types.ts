import { NeonProps } from "@/components/common/Neon/Neon.types";

export interface LabelProps extends NeonProps {
  /**
   * Input을 식별하기 위한 고유한 ID  ex) profile-nickname-input
   */
  id: string;
}
