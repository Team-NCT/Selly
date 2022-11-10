import { DropdownListProps } from "./DropdownList.types";
import style from "./DropdownList.module.scss";
import { DropdownItem } from "@/components/common";

const Dropdown = ({
  list,
  category,
  bg = "primary",
  onChange,
  defaultValue,
}: DropdownListProps) => {
  return (
    <ul className={style.dropdown} onChange={onChange}>
      {list.map((item, idx) => (
        <DropdownItem
          key={idx}
          value={item}
          category={category}
          bg={bg}
          defaultValue={defaultValue}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
