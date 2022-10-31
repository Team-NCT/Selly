import { DropdownItemProps } from "./DropdownItem.types";
import style from "./DropdownItem.module.scss";

const DropdownItem = ({ value, category, bg = "primary" }: DropdownItemProps) => {
  const dropdownBG = style[["bg-", bg].join("")];

  return (
    <label className={style.opt}>
      <div className={`${style.opt_hover} ${dropdownBG}`}>
        <input className={style.dropdown} name={category} type="radio" value={value}></input>
        <span>{value}</span>
      </div>
    </label>
  );
};

export default DropdownItem;
