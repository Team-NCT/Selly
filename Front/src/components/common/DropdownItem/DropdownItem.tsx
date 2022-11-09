import { DropdownItemProps } from "./DropdownItem.types";
import style from "./DropdownItem.module.scss";

const DropdownItem = ({ value, category, bg = "primary", defualtValue }: DropdownItemProps) => {
  const dropdownBG = style[["bg-", bg].join("")];
  const isSelect = defualtValue === value ? true : false;

  return (
    <label className={style.opt}>
      <div className={`${style.opt_hover} ${dropdownBG}`}>
        <input
          className={style.dropdown_item}
          name={category}
          type="radio"
          value={value}
          checked={isSelect}></input>
        <span>{value}</span>
      </div>
    </label>
  );
};

export default DropdownItem;
