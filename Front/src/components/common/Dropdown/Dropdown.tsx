import { DropdownProps } from "./Dropdown.types";
import style from "./Dropdown.module.scss";

const Dropdown = ({ value, category, bg = "primary" }: DropdownProps) => {
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

export default Dropdown;
