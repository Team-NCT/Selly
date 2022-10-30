import { RadioListProps } from "./RadioList.types";
import style from "./RadioList.module.scss";
import { Radio } from "@/components/common";
import React from "react";

const RadioList = ({ list, category, bg }: RadioListProps) => {
  const changeHandller = (event: React.FormEvent<Element>): void => {
    console.log((event.target as HTMLInputElement).value);
  };

  return (
    <ul className={style.radioList} onChange={changeHandller}>
      {list.map((item) => (
        <Radio key={item} value={item} category={category} bg={bg} />
      ))}
    </ul>
  );
};

export default RadioList;
