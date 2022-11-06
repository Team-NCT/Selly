export interface inputType {
  value: string;
  status: boolean;
  buttonStatus: boolean;
  errorMessage: string;
}

export interface inputAction {
  type: "MAX_ERROR" | "ZERO_ERROR" | "DECIMAL_ERROR" | "DECIMAL_FOUR_ERROR" | "NORMAL" | "RESET";
  payload: string;
}
