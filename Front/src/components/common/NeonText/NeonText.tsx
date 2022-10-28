import { NeonTextProps } from "./NeonText.types";

const NeonText = ({ children = "", color = "muscat" }: NeonTextProps) => {
  return <h1 className={[color, "-bg"].join("")}>{children}</h1>;
};

export default NeonText;
