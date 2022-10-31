import { RadioProps } from "./Radio.types";
import style from "./Radio.module.scss";

const Radio = ({ bg = "primary", value = "라디오", category = "카테고리" }: RadioProps) => {
  const radioBg = style[["bg-", bg].join("")];

  return (
    <label className={style.opt}>
      <input className={style.radio} name={category} type="radio" value={value}></input>
      <span className={`${style.opt__label} ${style.radio__label} ${radioBg}`}>{value}</span>
    </label>
  );
};

export default Radio;
