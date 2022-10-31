import { DropdownProps } from "./Dropdown.types";
import style from "./Dropdown.module.scss";
import { DropdownItem } from "@/components/common";

const Dropdown = ({ list, category, bg = "primary", onChange }: DropdownProps) => {
  return (
    <ul className={style.dropdown} onChange={onChange}>
      {list.map((item) => (
        <DropdownItem key={item} value={item} category={category} bg={bg} />
      ))}
    </ul>
  );
};

export default Dropdown;
