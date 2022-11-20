import style from "./WalletIcon.module.scss";
import { WalletIconProps } from "./WalletIcon.types";

const WalletIcon = ({ color = "black", size = 24 }: WalletIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48">
      <path
        className={style[color]}
        d="M32.6 27.2q1.25 0 2.225-.975.975-.975.975-2.275 0-1.25-.975-2.2-.975-.95-2.225-.95t-2.225.95q-.975.95-.975 2.2 0 1.3.975 2.275.975.975 2.225.975ZM9.25 36.1v2.65-29.5V36.1Zm0 6.6q-1.55 0-2.75-1.175T5.3 38.75V9.25q0-1.6 1.2-2.8 1.2-1.2 2.75-1.2h29.5q1.65 0 2.825 1.2 1.175 1.2 1.175 2.8v6.45h-4V9.25H9.25v29.5h29.5v-6.4h4v6.4q0 1.6-1.175 2.775Q40.4 42.7 38.75 42.7Zm17.7-9.35q-1.65 0-2.7-1.025Q23.2 31.3 23.2 29.7V18.4q0-1.65 1.05-2.675t2.7-1.025H41.1q1.7 0 2.725 1.025Q44.85 16.75 44.85 18.4v11.3q0 1.6-1.025 2.625T41.1 33.35Zm14.9-3V17.7H26.2v12.65Z"
      />
    </svg>
  );
};
export default WalletIcon;
