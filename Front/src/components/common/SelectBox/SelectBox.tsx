import { SelectBoxProps } from "./SelectBox.types";
import style from "./SelectBox.module.scss";
import { DropdownList } from "@/components/common";
import { useState, useEffect } from "react";

const Dropdown = ({ list, category, bg = "primary" }: SelectBoxProps) => {
  const [selected, setSelected] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);

  const setData = (event: React.FormEvent<Element>): void =>
    setSelected((event.target as HTMLInputElement).value);

  useEffect(() => {
    setIsOpen(false);
  }, [selected]);

  return (
    <section onChange={(event: any) => event.target.value}>
      <option className={style.value} onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </option>
      {isOpen && <DropdownList list={list} category={category} bg={bg} onChange={setData} />}
    </section>
  );
};

export default Dropdown;
