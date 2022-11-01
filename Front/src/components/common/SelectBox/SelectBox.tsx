import { SelectBoxProps } from "./SelectBox.types";
import style from "./SelectBox.module.scss";
import { DropdownList } from "@/components/common";
import { useState, useEffect, useRef, useCallback } from "react";

const SelectBox = ({ list, category, bg = "primary", onChange }: SelectBoxProps) => {
  const valueBorder = style[["bg-", bg].join("")];
  const [selected, setSelected] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);
  const arrowStyle = isOpen ? style.arrowTop : style.arrowBottom;
  const selectRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const setData = (event: React.FormEvent<Element>): void => {
    setSelected((event.target as HTMLInputElement).value);
  };

  const clickOutside = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (
        selectRef.current &&
        valueRef.current &&
        !selectRef.current.contains(target as HTMLDivElement) &&
        !valueRef.current.contains(target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  useEffect(() => {
    setIsOpen(false);
  }, [selected]);

  return (
    <section onChange={onChange}>
      <div
        className={`${style.value} ${valueBorder}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={valueRef}
        aria-hidden="true">
        <span className={style.valueText}>{selected}</span>
        <figure className={`${style.arrow} ${arrowStyle}`} />
      </div>

      {isOpen && (
        <div ref={selectRef}>
          <DropdownList list={list} category={category} bg={bg} onChange={setData} />
        </div>
      )}
    </section>
  );
};

export default SelectBox;
