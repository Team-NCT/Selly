import style from "./NeonText.module.scss";
import { NeonTextProps } from "./NeonText.types";

function NeonText({ children }: NeonTextProps) {
  return <h1 className={style.neonText}>{children}</h1>;
}

export default NeonText;
