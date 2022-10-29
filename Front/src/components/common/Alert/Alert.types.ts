export const AlertStyles = ["success", "info", "error", "warning"] as const;
export type AlertStylesType = typeof AlertStyles[number];

export interface AlertProps {
  style?: AlertStylesType; //* default: "success"
  icon?: boolean; //* default: false
}
