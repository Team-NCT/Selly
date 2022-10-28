export const AlertStyles = ["success", "info", "error", "warning", "icon"] as const;
export type AlertStylesType = typeof AlertStyles[number];

export const AlertIconStyles = ["success", "info", "error", "warning", "none"] as const;
export type AlertIconStylesType = typeof AlertIconStyles[number];

export interface AlertProps {
  state: boolean;
  styles: AlertStylesType; //* default: "success"
  icon: AlertIconStylesType; //* default: "none"
  message: string;
}
