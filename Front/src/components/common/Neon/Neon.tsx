import { NeonTextProps } from "./Neon.types";
import style from "./Neon.module.scss";

const Neon = ({
  children = "",
  color = "muscat",
  positionH = "bottom",
  positionW = "right",
  width = 55,
  height = 60,
  vertical = 10,
  horizontal = 10,
}: NeonTextProps) => {
  const neonColor = style[[color, "-bg"].join("")];
  const neonWidth = style[["width-", width].join("")];
  const neonHeight = style[["height-", height].join("")];
  const neonVertical = style[["vertical-", vertical].join("")];
  const neonHorizontal = style[["horizontal-", horizontal].join("")];

  return (
    <p
      className={`${style.neonText} ${neonColor} ${style[positionH]} ${style[positionW]} ${neonWidth} ${neonHeight} ${neonVertical} ${neonHorizontal}`}>
      {children}
    </p>
  );
};

export default Neon;
